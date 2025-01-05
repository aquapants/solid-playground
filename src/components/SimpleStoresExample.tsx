import { For } from "solid-js"
import { createStore } from "solid-js/store"

const SimpleStoresExample = () => {
  // stores are helpful and can be more optimized for arrays and nested object objects
  // because in a store each object or array element gets its own signal so its easier to mutate individual values
  const [person, setPerson] = createStore({
    name: {
      first: 'brandon',
      last: 'sanderson',
    },
    age: 45
  })

  // updated first name in person Store
  const changeFirstName = () => {
    setPerson("name", "first", "john") // traverse the object tree in arguments, last argument is the new value
  }

  // updated last name in person Store
  const changeLastName = () => {
    setPerson("name", "last", "halo") // traverse the object tree in arguments, last argument is the new value
  }

  // createStore with an array will work slightly differently when updating, see changePost function 
  const [posts, setPosts] = createStore([
    {id: 1, title: "post 1", body:"Lorem ipsum dolor sit amet, consectetur adipiscing elit."},
    {id: 2, title: "post 2", body:"Lorem ipsum dolor sit amet, consectetur adipiscing elit."},
  ])
  
  // update name of post 1
  const changePost = () => {
    setPosts(0, "title", "cooler name for post 1") // pass array index, then property you want to change, then the new value
  }

  // you can also pass a function to deremine what postion or property we want to update
  const chnagePost2 = (id: number) => {
    // first argument is a function which fires for each item in the array
    // if we return true for a particular item, then it will select the item in the array

    // here we first pass a function where the argument p represents the posts in the Store `posts` created above
    // if a post's id matches the number that was passed to this changePost2 function
    // then the value will be updated to whatever is provided
    // after passing the function as the first argument, pass the property to change, then the new value
    setPosts((p) => p.id === id, "title", "functional name for post 2")
    // TODO: experiment with passing a function as the second argument for a store as well
  }

  return (
    <div class="flex flex-col border-2 p-2 w-[32rem] space-y-2">
      <h1 class="text-4xl">Simple Stores</h1>
      <p>The first name is {person.name.first}</p>
      <p>The last name is {person.name.last}</p>

      <div class="flex flex-row justify-center space-x-2">
        <button onClick={changeFirstName}>change the first name</button>
        <button onClick={changeLastName}>change the last name</button>
      </div>

      <For each={posts}>
        {(post) => (
          <div class="border my-1 px-1">
            <h2 class="text-xl font-bold">
              {post.title}
            </h2>
            <p>
              {post.body}
            </p>
          </div>
        )}
      </For>

      <button onClick={changePost}>change title on post 1</button>
      <button onClick={() => chnagePost2(2)}>change title on post 2</button>
    </div>
  )
}

export default SimpleStoresExample