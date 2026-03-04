import { createResource, Show, For } from 'solid-js';

import Card from '@components/Card';

interface post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

const fetchPosts = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  return res.json();
};

const DataFetchingExample = () => {
  const [posts] = createResource(fetchPosts);

  return (
    // solid's specialized Show element wrapper to conditionally render elements within it
    // the fallback={} parameter will be loaded if the when={} paramater is not true
    <Show when={posts()} fallback={<p>loading...</p>}>
      {/* responsive grid styling  */}
      <div class="mx-auto grid w-max grid-cols-1 gap-5 md:grid-cols-2">
        <For each={posts()}>
          {(post: post) => (
            <Card
              title={post.title}
              text={post.body}
              rounded={true}
              flat={false}
              buttonTo={'/post/' + post.id}
            ></Card>
          )}
        </For>
      </div>
    </Show>
  );
};

export default DataFetchingExample;
