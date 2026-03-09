import { createMemo, createSignal } from 'solid-js';

import Button from '@components/ui/Button';

const isBadNumber = (n: number) => {
  if (!Number.isFinite(n)) return true;
  const s = String(n);
  if (/[eE]/.test(s)) return true; // scientific notation
  return false;
};

const isPrime = (n: number) => {
  // only integers >= 2 can be prime
  if (!Number.isInteger(n) || n < 2) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;

  // trial division up to sqrt(n)
  const limit = Math.floor(Math.sqrt(n));
  for (let i = 3; i <= limit; i += 2) {
    if (n % i === 0) return false;
  }
  return true;
};

const Counter = () => {
  const [count, setCount] = createSignal(0);
  const [moves, setMoves] = createSignal(0);
  const [score, setScore] = createSignal(0);
  const [seenPrimes, setSeenPrimes] = createSignal<Set<number>>(new Set());
  const [lastGain, setLastGain] = createSignal<number | null>(null);
  const [primeBonus, setPrimeBonus] = createSignal(0);

  const isError = createMemo(() => isBadNumber(count()));

  /**
   * Multiplier decays as moves increase.
   * - Starts at 1.0
   * - Drops by 3% per move
   * - floor at .10
   * - 0.1-1.5 multiplier bonus for every prime
   */
  const multiplier = createMemo(() => {
    const decay = Math.max(0.1, 1 - moves() * 0.03);
    const bonus = 1 + primeBonus();
    return Math.min(2.5, decay * bonus);
  });

  const display = createMemo(() => {
    if (isError()) return 'ERROR';
    return Math.trunc(count()).toString().padStart(21, '0');
  });

  const scoreDisplay = createMemo(() => {
    // keep score as integer display
    return Math.trunc(score()).toString().padStart(21, '0');
  });

  const doMove = (op: (c: number) => number) => {
    if (isError()) return;

    // compute next value, integer-only for prime logic
    const next = Math.trunc(op(count()));

    setCount(next);
    setMoves((m) => m + 1);

    // evaluate if prime
    if (isPrime(next)) {
      const alreadySeen = seenPrimes().has(next);
      if (!alreadySeen) {
        // add to seen set
        const nextSet = new Set(seenPrimes());
        nextSet.add(next);
        setSeenPrimes(nextSet);
        setPrimeBonus((b) => Math.min(1.5, b + 0.1));

        const gained = Math.round(100 * multiplier());
        setScore((s) => s + gained);
        setLastGain(gained);
      } else {
        setLastGain(0);
      }
    } else {
      setLastGain(null);
    }
  };

  const resetRun = () => {
    setCount(0);
    setMoves(0);
    setScore(0);
    setSeenPrimes(new Set<number>());
    setLastGain(null);
    setPrimeBonus(0);
  };

  return (
    <div class="mx-auto w-fit rounded-lg border border-zinc-700/60 bg-zinc-950/40 px-6 py-4 shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_10px_30px_rgba(0,0,0,0.65)] backdrop-blur">
      <div class="grid grid-cols-[max-content_1fr] items-baseline gap-x-4 gap-y-1 text-right">
        <h1 class="text-right font-arcade text-3xl text-zinc-400">score: </h1>
        <div class="text-center font-arcade text-4xl text-cyan-200">
          {scoreDisplay()}
        </div>

        <h1 class="m-auto text-right font-arcade text-3xl text-zinc-400">
          counter:{' '}
        </h1>
        <div
          classList={{
            'font-arcade text-center text-4xl': true,
            'text-white': !isError(),
            'text-red-400 blink drop-shadow-[0_0_12px_rgba(248,113,113,0.9)]':
              isError(),
          }}
        >
          {display()}
        </div>
      </div>

      {/* stats display */}
      <div class="mx-auto mt-3 w-fit rounded-md border border-zinc-700/50 bg-black/30 px-4 py-2">
        <div class="grid grid-cols-2 gap-x-10 gap-y-2 font-arcade text-base text-zinc-400 sm:grid-cols-4">
          <div class="whitespace-nowrap">
            moves:{' '}
            <span class="ml-2 font-arcade text-white [font-variant-numeric:tabular-nums]">
              {moves().toString().padStart(3, '0')}
            </span>
          </div>

          <div class="whitespace-nowrap">
            mult:{' '}
            <span class="ml-2 font-arcade text-white [font-variant-numeric:tabular-nums]">
              {multiplier().toFixed(2)}x
            </span>
          </div>

          <div class="whitespace-nowrap">
            last:{' '}
            <span class="ml-2 font-arcade text-white [font-variant-numeric:tabular-nums]">
              {lastGain() === null
                ? '---'
                : lastGain() === 0
                  ? 'NOPE'
                  : `+${lastGain()}`}
            </span>
          </div>

          <div class="whitespace-nowrap">
            primes:{' '}
            <span class="ml-2 font-arcade text-white [font-variant-numeric:tabular-nums]">
              {seenPrimes().size.toString().padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>

      <div class="mx-auto mt-4 flex w-fit items-center justify-center gap-2">
        <Button onClick={() => doMove((c) => c + 1)}>add 1</Button>

        <Button onClick={() => doMove((c) => c - 1)}>minus 1</Button>

        <Button onClick={() => doMove((c) => c * 2)}>times 2</Button>

        <Button onClick={() => doMove((c) => Math.trunc(c / 2))}>
          divide 2
        </Button>

        <Button onClick={resetRun}>reset</Button>
      </div>
    </div>
  );
};

export default Counter;
