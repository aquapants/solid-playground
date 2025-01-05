import SimpleSignalsEaxmple from '@components/SimpleSignalsExample';
import BasicFormExample from '@components/BasicFormExample';
import EventHandlersExample from '@components/EventHandlersExample';
import SimpleStoresExample from '@components/SimpleStoresExample';
import DataFetchingExample from '@components/DataFetchingExample';
import CodeSnippet from '@components/CodeSnippet';

// TODO: move this content out of component and tutorialize the rest of the examples on individual pages
const codeExample = `
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
`;

const SolidConceptsExamplesPage = () => {
  return (
    <>
      <div class="section-min-height grid grid-cols-2 items-center">
        <div class="mt-4 flex flex-col items-center space-y-4">
          <SimpleSignalsEaxmple />
          <BasicFormExample />
          <EventHandlersExample />
          <SimpleStoresExample />
        </div>
        <div>
          <h2 class="text-center text-4xl font-bold">
            Code for Data Fetching Example
          </h2>
          <p class="text-center text-xl font-semibold">
            (actual implementation in website located below this section)
          </p>
          <CodeSnippet code={codeExample} />
        </div>
      </div>
      <div class="mt-4">
        <h1 class="mb-2 text-center text-4xl font-bold">
          Data fetching posts from jsonPlaceholder.typicode.com{' '}
        </h1>
        <DataFetchingExample />
      </div>
    </>
  );
};

export default SolidConceptsExamplesPage;
