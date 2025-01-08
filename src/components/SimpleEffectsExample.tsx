import { createEffect, createSignal } from 'solid-js';

const SimpleEffectsExample = () => {
  const [count, setCount] = createSignal(0);

  // how to use createEffect
  // pass function as an argument, and it will run when of the functions dependencies change
  // this function runs everytime count changes
  createEffect(() => {
    console.log(count()); // since count() called inside this createEffect, it is considered a dependency

    // once the count reaches 10 clear the interval that's running to stop the count
    if (count() === 10) {
      clearInterval(int);
    }
  }); // no need to add a dependency array like in React,

  const int = setInterval(() => setCount(count() + 1), 1000);

  return (
    <div class="flex w-[32rem] flex-col border-2 p-2">
      <h1 class="text-4xl">Simple Effects</h1>
      <p>The count is {count()}</p>
      <p>My name is static sanderson</p>
    </div>
  );
};

export default SimpleEffectsExample;
