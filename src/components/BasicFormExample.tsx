import { createSignal } from "solid-js";

const BasicFormExample = () => {
  const [name, setName] = createSignal("");

  return (
    <div class="flex flex-col border-2 p-2 w-[32rem]">
      <form action="" class="flex flex-row">
        <label for="name">Your name: </label>
        <input
          class="bg-white text-black"
          name="name"
          type="text"
          value={name()} // reactive binding
          onInput={(e) => setName(e.target.value)} // updates the signal
        />
      </form>
      <p>Hello, {name()}!</p> {/* updates when name changes */}
    </div>
  );
}

export default BasicFormExample