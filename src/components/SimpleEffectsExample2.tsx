import { createEffect } from 'solid-js';
import { createStore } from 'solid-js/store';

const SimpleEffectsExample2 = () => {
  const [person, setPerson] = createStore({
    name: {
      first: 'brandon',
      last: 'sanderson',
    },
    age: 45,
  });

  // function to change last name of person, used in onClick of button
  const changeName = () => {
    setPerson('name', 'last', 'finch');
  };

  // second example in video shows limitations of stores and why you must be more granular and precise in solid
  // this is an area solid greatly differs from react. Solid will not rerender the entire component tree
  // only the specific part of the DOM that was change
  createEffect(() => {
    console.log(person); // this will NOT run the effect function
    console.log(person.name.last); // use must call the exact depency that changed for the createEffect() to execute
  });

  return (
    <div class="flex w-[32rem] flex-col border-2 p-2">
      <h1 class="text-4xl">Simple Effects 2</h1>
      <p>
        My name is {person.name.first} {person.name.last}
      </p>
      <button onClick={changeName}>update the name</button>
    </div>
  );
};

export default SimpleEffectsExample2;
