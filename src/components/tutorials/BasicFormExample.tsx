import SimpleCard from '@components/SimpleCard';
import { createSignal } from 'solid-js';

const BasicFormExample = () => {
  const [name, setName] = createSignal('');

  return (
    <SimpleCard>
      <h1 class="text-4xl">Basic Form Example</h1>
      <form action="" class="flex flex-row">
        <label for="name">Your name: </label>
        <input
          class="bg-white text-black"
          name="name"
          type="text"
          value={name()} // reactive binding
          onInput={(e) => setName(e.target.value)} // updates the signal !on input! (not on button press)
        />
      </form>
      <p>Hello, {name()}!</p> {/* updates when name changes */}
    </SimpleCard>
  );
};

export default BasicFormExample;
