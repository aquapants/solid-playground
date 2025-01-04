import { createSignal } from "solid-js";

const BasicFormExample = () => {
  const [name, setName] = createSignal("");

  return (
    <div class="flex flex-col border-2 p-2 w-[32rem]">
      <input
        class="bg-white text-black"
        type="text"
        value={name()} // reactive binding
        onInput={(e) => setName(e.target.value)} // updates the signal
      />
      <p>Hello, {name()}!</p> {/* updates when name changes */}
    </div>
  );
}

export default BasicFormExample