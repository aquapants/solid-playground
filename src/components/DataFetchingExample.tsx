import { createResource, Show, For } from "solid-js";
import Card from "./Card";

interface post {
  id: number,
  userId: number,
  title: string,
  body: string,

}

const fetchPosts = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts')
  return res.json()
}

const DataFetchingExample = () => {
  const [posts] = createResource(fetchPosts)

  return (
    // solid's specialized Show element wrapper to conditionally render elements within it
    <Show when={posts()} fallback={<p>loading...</p>}> 
      <div class="grid grid-cols-4 gap-5">
        <For each={posts()}>
          {(post: post) => (
            <Card
              title={post.title}
              text={post.body}
              rounded={true}
              flat={false}
              buttonTo={"/post/" + post.id}
            >
            </Card>
          )}
        </For>
      </div>
    </Show>
  )
};

export default DataFetchingExample