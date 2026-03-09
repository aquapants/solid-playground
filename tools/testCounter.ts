type Op = {
  name: string;
  apply: (n: number) => number;
};

type State = {
  value: number;
  moves: number;
  score: number;
  primeBonus: number;
  seenPrimes: Set<number>;
  path?: string[];
};

type Mode = 'fast' | 'exact';

type Config = {
  start: number;
  depth: number;
  clamp: number;
  baseScore: number;
  decayPerMove: number;
  primeBonusStep: number;
  minMultiplier: number;
  maxMultiplier: number;
  top: number;
  allowNegative: boolean;
  ops: Op[];
  mode: Mode;
  trackPath: boolean;
  progressEvery: number;
};

const isPrime = (n: number) => {
  if (!Number.isInteger(n) || n < 2) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;

  const limit = Math.floor(Math.sqrt(n));
  for (let i = 3; i <= limit; i += 2) {
    if (n % i === 0) return false;
  }
  return true;
};

const isBadNumber = (n: number) => {
  if (!Number.isFinite(n)) return true;
  return /[eE]/.test(String(n));
};

const getMultiplier = (moves: number, primeBonus: number, config: Config) => {
  const decay = Math.max(config.minMultiplier, 1 - moves * config.decayPerMove);
  const bonus = 1 + primeBonus;
  return Math.min(config.maxMultiplier, decay * bonus);
};

const parseOps = (input: string): Op[] => {
  const tokens = input
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  return tokens.map((token) => {
    if (token.startsWith('+')) {
      const amount = Number(token.slice(1));
      if (Number.isNaN(amount)) {
        throw new Error(`Invalid add op: ${token}`);
      }
      return {
        name: token,
        apply: (n: number) => n + amount,
      };
    }

    if (token.startsWith('-')) {
      const amount = Number(token.slice(1));
      if (Number.isNaN(amount)) {
        throw new Error(`Invalid subtract op: ${token}`);
      }
      return {
        name: token,
        apply: (n: number) => n - amount,
      };
    }

    if (token.startsWith('*')) {
      const amount = Number(token.slice(1));
      if (Number.isNaN(amount)) {
        throw new Error(`Invalid multiply op: ${token}`);
      }
      return {
        name: token,
        apply: (n: number) => n * amount,
      };
    }

    if (token.startsWith('/')) {
      const amount = Number(token.slice(1));
      if (Number.isNaN(amount) || amount === 0) {
        throw new Error(`Invalid divide op: ${token}`);
      }
      return {
        name: token,
        apply: (n: number) => Math.trunc(n / amount),
      };
    }

    throw new Error(`Unsupported op token: ${token}`);
  });
};

const parseArgs = (): Config => {
  const args = process.argv.slice(2);

  const getArg = (name: string, fallback: string) => {
    const idx = args.indexOf(`--${name}`);
    return idx >= 0 && args[idx + 1] ? args[idx + 1] : fallback;
  };

  const start = Number(getArg('start', '0'));
  const depth = Number(getArg('depth', '10'));
  const clamp = Number(getArg('clamp', '100000'));
  const baseScore = Number(getArg('baseScore', '100'));
  const decayPerMove = Number(getArg('decay', '0.03'));
  const primeBonusStep = Number(getArg('primeBonus', '0.10'));
  const minMultiplier = Number(getArg('minMultiplier', '0.10'));
  const maxMultiplier = Number(getArg('maxMultiplier', '2.50'));
  const top = Number(getArg('top', '20'));
  const allowNegative = getArg('allowNegative', 'true') === 'true';
  const opsRaw = getArg('ops', '+1,-7,*3,/2');
  const modeRaw = getArg('mode', 'fast');
  const trackPath = getArg('trackPath', 'false') === 'true';
  const progressEvery = Number(getArg('progressEvery', '100000'));

  if (modeRaw !== 'fast' && modeRaw !== 'exact') {
    throw new Error(`Invalid mode "${modeRaw}". Use "fast" or "exact".`);
  }

  return {
    start,
    depth,
    clamp,
    baseScore,
    decayPerMove,
    primeBonusStep,
    minMultiplier,
    maxMultiplier,
    top,
    allowNegative,
    ops: parseOps(opsRaw),
    mode: modeRaw,
    trackPath,
    progressEvery,
  };
};

/**
 * exact mode:
 * - includes full seen-prime set in the key
 * - much slower but more precise
 *
 * fast mode:
 * - uses only summary data in the key
 * - dramatically faster, better for tuning/balancing
 */
const stateKey = (state: State, mode: Mode) => {
  if (mode === 'exact') {
    const primes = [...state.seenPrimes].sort((a, b) => a - b).join(',');
    return `${state.value}|${state.moves}|${state.primeBonus.toFixed(2)}|${primes}`;
  }

  return `${state.value}|${state.moves}|${state.primeBonus.toFixed(2)}|${state.seenPrimes.size}`;
};

const analyze = (config: Config) => {
  const initial: State = {
    value: config.start,
    moves: 0,
    score: 0,
    primeBonus: 0,
    seenPrimes: new Set<number>(),
    path: config.trackPath ? [] : undefined,
  };

  const queue: State[] = [initial];
  let queueIndex = 0;

  const visited = new Map<string, number>();

  let totalStatesExplored = 0;
  let maxQueueSize = 1;

  const allReachableValues = new Set<number>();
  const primeReachDepth = new Map<number, number>();
  const bestPrimeScore = new Map<number, number>();
  const bestStates: State[] = [];

  // cache primality checks because values repeat a lot
  const primeCache = new Map<number, boolean>();
  const isPrimeCached = (n: number) => {
    const cached = primeCache.get(n);
    if (cached !== undefined) return cached;
    const result = isPrime(n);
    primeCache.set(n, result);
    return result;
  };

  while (queueIndex < queue.length) {
    const current = queue[queueIndex++]!;
    totalStatesExplored++;
    allReachableValues.add(current.value);

    if (totalStatesExplored % config.progressEvery === 0) {
      console.log(
        `[progress] explored=${totalStatesExplored} queueRemaining=${queue.length - queueIndex} reachable=${allReachableValues.size} bestStates=${bestStates.length}`,
      );
    }

    if (current.moves >= config.depth) {
      bestStates.push(current);
      continue;
    }

    for (const op of config.ops) {
      const nextValue = Math.trunc(op.apply(current.value));

      if (isBadNumber(nextValue)) continue;
      if (!config.allowNegative && nextValue < 0) continue;
      if (Math.abs(nextValue) > config.clamp) continue;

      const nextMoves = current.moves + 1;
      let nextScore = current.score;
      let nextPrimeBonus = current.primeBonus;
      const nextSeenPrimes = new Set(current.seenPrimes);

      if (isPrimeCached(nextValue) && !nextSeenPrimes.has(nextValue)) {
        const mult = getMultiplier(current.moves, current.primeBonus, config);
        const gained = Math.round(config.baseScore * mult);

        nextScore += gained;
        nextPrimeBonus = Math.min(
          config.maxMultiplier - 1,
          current.primeBonus + config.primeBonusStep,
        );
        nextSeenPrimes.add(nextValue);

        const prevDepth = primeReachDepth.get(nextValue);
        if (prevDepth === undefined || nextMoves < prevDepth) {
          primeReachDepth.set(nextValue, nextMoves);
        }

        const prevBestScore = bestPrimeScore.get(nextValue);
        if (prevBestScore === undefined || nextScore > prevBestScore) {
          bestPrimeScore.set(nextValue, nextScore);
        }
      }

      const nextState: State = {
        value: nextValue,
        moves: nextMoves,
        score: nextScore,
        primeBonus: nextPrimeBonus,
        seenPrimes: nextSeenPrimes,
        path: config.trackPath ? [...(current.path ?? []), op.name] : undefined,
      };

      const key = stateKey(nextState, config.mode);
      const prevBest = visited.get(key);

      // if we've already seen an equivalent state with a better or equal score, prune it
      if (prevBest !== undefined && prevBest >= nextState.score) {
        continue;
      }

      visited.set(key, nextState.score);
      queue.push(nextState);

      if (queue.length - queueIndex > maxQueueSize) {
        maxQueueSize = queue.length - queueIndex;
      }
    }
  }

  bestStates.sort((a, b) => b.score - a.score);

  const topStates = bestStates.slice(0, config.top);

  const easiestPrimes = [...primeReachDepth.entries()]
    .sort((a, b) => a[1] - b[1] || a[0] - b[0])
    .slice(0, config.top);

  const highestValuePrimes = [...bestPrimeScore.entries()]
    .sort((a, b) => b[0] - a[0])
    .slice(0, config.top);

  return {
    config,
    totalStatesExplored,
    reachableValues: allReachableValues.size,
    uniquePrimesFound: primeReachDepth.size,
    easiestPrimes,
    highestValuePrimes,
    topStates,
    maxQueueSize,
    primeCacheSize: primeCache.size,
  };
};

const printResults = (result: ReturnType<typeof analyze>) => {
  console.log('\n=== Counter Balance Analysis ===');
  console.log('ops:', result.config.ops.map((o) => o.name).join(', '));
  console.log('start:', result.config.start);
  console.log('depth:', result.config.depth);
  console.log('clamp:', result.config.clamp);
  console.log('baseScore:', result.config.baseScore);
  console.log('decayPerMove:', result.config.decayPerMove);
  console.log('primeBonusStep:', result.config.primeBonusStep);
  console.log('minMultiplier:', result.config.minMultiplier);
  console.log('maxMultiplier:', result.config.maxMultiplier);
  console.log('mode:', result.config.mode);
  console.log('trackPath:', result.config.trackPath);

  console.log('\n--- Summary ---');
  console.log('states explored:', result.totalStatesExplored);
  console.log('reachable values:', result.reachableValues);
  console.log('unique primes found:', result.uniquePrimesFound);
  console.log('max queue size:', result.maxQueueSize);
  console.log('prime cache size:', result.primeCacheSize);

  console.log('\n--- Easiest primes (prime -> min moves) ---');
  for (const [prime, moves] of result.easiestPrimes) {
    console.log(`${prime} -> ${moves}`);
  }

  console.log(
    '\n--- Highest value primes encountered (prime -> best score) ---',
  );
  for (const [prime, score] of result.highestValuePrimes) {
    console.log(`${prime} -> ${score}`);
  }

  console.log('\n--- Top scoring end states ---');
  for (const state of result.topStates) {
    const pathText =
      result.config.trackPath && state.path
        ? `, path=${state.path.join(' ')}`
        : '';

    console.log(
      `score=${state.score}, value=${state.value}, moves=${state.moves}, primes=${state.seenPrimes.size}, bonus=${state.primeBonus.toFixed(2)}${pathText}`,
    );
  }
};

const main = () => {
  const config = parseArgs();
  const startedAt = Date.now();
  const result = analyze(config);
  const elapsedMs = Date.now() - startedAt;

  printResults(result);
  console.log(`\ncompleted in ${(elapsedMs / 1000).toFixed(2)}s`);
};

main();
