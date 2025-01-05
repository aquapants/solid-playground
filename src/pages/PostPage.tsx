import { useParams } from "@solidjs/router"
import { createResource, Show } from "solid-js"

const fetchPost = async (id: string) => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts/' + id)
  return res.json()
}

// individual page for a single post, linked to by the button on post's card
const PostPage = () => {
  const params = useParams()
  const [product] = createResource(params.id, fetchPost)

  return (
    <div class="my-4">
      <Show when={product()} fallback={<p>loading...</p>}>
        <h2 class="text-4xl font-bold">{product().title}</h2>
        <h3 class="text-2xl font-semibold">Post number: {product().id}</h3>
        <p class="text-xl">{product().body}</p>
      </Show>
    </div> 
  )
}

export default PostPage