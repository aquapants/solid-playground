import { createSignal } from 'solid-js'

const SimpleSignalsExample = () => {
  const [name, setName] = createSignal('knuckles')
  const [bool, setBool] = createSignal(false)
  const [age, setAge] = createSignal(25)

  // changes the name from knuckkles to sonic after 1 second
  setTimeout(() => {
    setName('sonic')
  }, 1000)

  // chnages value of bool after 2 seconds
  setTimeout(() => {
    // setBool(false)
    // setBool(!bool())
    setBool((prev) => !prev);
  }, 2000)

  // increments age by 1 every second
  setInterval(() => {
    setAge(age() + 1)
  }, 1000)

  const [person, setPerson] = createSignal({
    name: {
      first: 'brandon',
      last: 'sanderson'
    },
    age: 45
  })

  // for a nested object you must send the entire object again with the specific value(s) updated
  // this works but is not the optimal way to update nested objects/arrays createStore would be a better option
  // see `SimpleStoresExample for a better way to handle this nested object individual value changes
  setTimeout(() => {
    setPerson({
      name: {
        first: 'brandon',
        last: 'williams'
      },
      age: 45
    })
  }, 3000)
  
  // when calling for a signal value in SolidJS you invoke the getter function, not the value itself like in react.
  // for example:
  // const [name, setName] = createSignal('john')
  // CORRECT: <p> The name is: {name()} </p>
  // INCORRECT  <p> The name is: {name} </p> this is how its done in React but does not work in SolidJS. 
  // read more about SolidJS's reactivity model to understand the benefits (and potential risks) of this difference
  return ( 
    <div class="flex flex-col border-2 p-2 w-[32rem]">
      <h1 class="text-4xl">Simple Signals</h1>
      <p>This component is to showcase some very simple examples of signals in SolidJS.</p>
      <p>If you're coming from a React background you can think of `createSignal` as `useState` in React</p>
      <div class='my-auto text-2xl font-bold text bg-slate-400flex flex-col'>
        <p>The name is {name()} and the age is {age()}</p> 
        <p>The boolean is {bool().toString()}</p>
        <p>The person is {person().name.first} {person().name.last}</p>
      </div>
    </div>
  )
}

export default SimpleSignalsExample