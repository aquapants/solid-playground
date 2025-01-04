import { createSignal } from "solid-js"

// TODO
const EventHandlersExample = () => {
  const [name, setName] = createSignal('knuckles')
  const [age, setAge] = createSignal(25)

  const changeName = (name: string) => {
    setName(name)
  }

  return (
    <div class="flex flex-col border-2 p-2 w-[32rem]">
      <h1 class="text-4xl">Event Handlers</h1>
      <p>This component is to showcase simple examples of handling events in SolidJS.</p>
      <div class='my-auto text-2xl font-bold text bg-slate-400flex flex-col'>
        <p>The name is {name()} and the age is {age()}</p>
        <button class="border-white border"onClick={() => changeName('tails')}>Change the name</button>
        <input class="bg-white" type="text" onInput={(e) => setName(e.target.value)} />
      </div>
    </div>
  )
}

export default EventHandlersExample