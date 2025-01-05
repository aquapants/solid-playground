import { createSignal } from 'solid-js';

const EventHandlersExample = () => {
  const [name, setName] = createSignal('knuckles');
  const [age, setAge] = createSignal(25);

  // custom helper function to change the name whenever the function is called
  // used inline with the onClick function in the first button in the HTML
  const changeName = (name: string) => {
    setName(name);
  };

  // custom onClick function to increase the age by 1
  const increaseAge = () => {
    setAge((age) => age + 1);
  };

  return (
    <div class="flex w-[32rem] flex-col border-2 p-2">
      <h1 class="text-4xl">Event Handlers</h1>
      <p>
        This component is to showcase simple examples of handling events in
        SolidJS.
      </p>
      <div class="text bg-slate-400flex my-auto flex-col space-y-2 text-2xl font-bold">
        <p>
          The name is {name()} and the age is {age()}
        </p>
        <button class="border border-white" onClick={() => changeName('tails')}>
          Change the name to tails
        </button>
        <div>
          <label for="name">your name: </label>
          <input
            name="name"
            class="bg-white text-black"
            type="text"
            onInput={(e) => setName(e.target.value)}
          />
          {/* ^ use setter for name signal in input value to dynamically update the value as the user types*/}
        </div>
        <button onClick={increaseAge}>increase age</button>
      </div>
    </div>
  );
};

export default EventHandlersExample;
