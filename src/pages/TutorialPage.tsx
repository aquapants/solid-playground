import { createSignal, For, lazy } from 'solid-js';

import Button from '@components/ui/Button';
import CodeSnippet from '@components/CodeSnippet';

const SolidConceptsExamplesPage = () => {
  const [currentPage, setCurrentPage] = createSignal('');

  // lazy load components so that reactive events only start when user selects the tutorial
  const tutorials = [
    {
      id: 'simpleSignalsExample',
      label: 'Simple Signals Example',
      component: lazy(
        () => import('@components/tutorials/SimpleSignalsExample'),
      ),
    },
    {
      id: 'basicFormExample',
      label: 'Basic Form Example',
      component: lazy(() => import('@components/tutorials/BasicFormExample')),
    },
    {
      id: 'eventHandlersExample',
      label: 'Event Handlers Example',
      component: lazy(
        () => import('@components/tutorials/EventHandlersExample'),
      ),
    },
    {
      id: 'simpleStoresExample',
      label: 'Simple Stores Example',
      component: lazy(
        () => import('@components/tutorials/SimpleStoresExample'),
      ),
    },
    {
      id: 'simpleEffectsExample',
      label: 'Simple Effects Example',
      component: lazy(
        () => import('@components/tutorials/SimpleEffectsExample'),
      ),
    },
    {
      id: 'simpleEffectsExample2',
      label: 'Simple Effects Example 2',
      component: lazy(
        () => import('@components/tutorials/SimpleEffectsExample2'),
      ),
    },
    {
      id: 'contextExample',
      label: 'Context Example',
      component: lazy(() => import('@components/tutorials/ContextExample')),
    },
    {
      id: 'dataFetchingExample',
      label: 'Data Fetching Example',
      component: lazy(
        () => import('@components/tutorials/DataFetchingExample'),
      ),
    },
  ];

  const renderComponent = () => {
    const selectedTutorial = tutorials.find(
      (tutorial) => tutorial.id === currentPage(),
    );
    if (selectedTutorial?.component) {
      const Component = selectedTutorial.component; // call lazy-loaded component
      return <Component />; // must be returned as TSX element
    }
    return <div class="text-4xl font-bold">Select a Tutorial</div>;
  };

  return (
    <>
      {/* button selector for tutorial */}
      <div class="">
        <div class="mx-auto mt-4 grid grid-cols-2 gap-4">
          <For each={tutorials}>
            {(tutorial) => (
              <Button
                extraClasses="mx-auto w-64"
                onClick={() => setCurrentPage(tutorial.id)}
              >
                {tutorial.label}
              </Button>
            )}
          </For>
        </div>

        {/* tutorial section */}
        <div class="mx-auto mt-8 flex w-max flex-row">
          <div>{renderComponent()}</div>
          <div>
            <CodeSnippet code="{var hello world}" />
          </div>
        </div>
      </div>
    </>
  );
};

export default SolidConceptsExamplesPage;
