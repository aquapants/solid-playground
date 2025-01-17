import { createSignal, For } from 'solid-js';

import SimpleSignalsEaxmple from '@components/tutorials/SimpleSignalsExample';
import BasicFormExample from '@components/tutorials/BasicFormExample';
import EventHandlersExample from '@components/tutorials/EventHandlersExample';
import SimpleStoresExample from '@components/tutorials/SimpleStoresExample';
import DataFetchingExample from '@components/tutorials/DataFetchingExample';
import SimpleEffectsExample from '@components/tutorials/SimpleEffectsExample';
import SimpleEffectsExample2 from '@components/tutorials/SimpleEffectsExample2';
import ContextExample from '@components/tutorials/ContextExample';

import Button from '@components/ui/Button';

const SolidConceptsExamplesPage = () => {
  const [currentPage, setCurrentPage] = createSignal('');

  const tutorials = [
    {
      id: 'simpleSignalsExample',
      label: 'Simple Signals Exmaple',
      component: <SimpleSignalsEaxmple />,
    },
    {
      id: 'basicFormExample',
      label: 'Basic Form Example',
      component: <BasicFormExample />,
    },
    {
      id: 'eventHandlersExample',
      label: 'Event Handlers Example',
      component: <EventHandlersExample />,
    },
    {
      id: 'simpleStoresExample',
      label: 'Simple Stores Example',
      component: <SimpleStoresExample />,
    },
    {
      id: 'simpleEffectsExample',
      label: 'Simple Effects Example',
      component: <SimpleEffectsExample />,
    },
    {
      id: 'simpleEffectsExample2',
      label: 'Simple Effects Example 2',
      component: <SimpleEffectsExample2 />,
    },
    {
      id: 'contextExample',
      label: 'Context Example',
      component: <ContextExample />,
    },
    {
      id: 'dataFetchingExample',
      label: 'Data Fetching Example',
      component: <DataFetchingExample />,
    },
  ];

  const renderComponent = () =>
    tutorials.find((tutorial) => tutorial.id === currentPage())?.component || (
      <div class="text-4xl font-bold">Select a Tutorial</div>
    );

  return (
    <>
      <div class="">
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
          <div></div>
        </div>
        <div class="mx-auto mt-8 w-max">{renderComponent()}</div>
      </div>
    </>
  );
};

export default SolidConceptsExamplesPage;
