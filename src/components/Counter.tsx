import { createSignal } from 'solid-js';

import Button from '@components/ui/Button';
import '../index.css';

const Counter = () => {
  const [count, setCount] = createSignal(0);

  return (
    <div>
      <h1 class="text-center text-lg text-zinc-400">score</h1>
      <div class="font-arcade text-center text-5xl">
        {count().toString().padStart(21, '0')}
      </div>
      <div class="mx-auto mt-4 flex w-fit items-center justify-center gap-2">
        <Button onClick={() => setCount((count) => count + 1)}>add 1</Button>
        <Button onClick={() => setCount((count) => count * 5)}>times 5</Button>
        <Button onClick={() => setCount((count) => count / 2)}>divide 2</Button>
        <Button onClick={() => setCount(0)}>reset</Button>
      </div>
    </div>
  );
};

export default Counter;
