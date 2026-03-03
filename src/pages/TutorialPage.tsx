import { createMemo, createSignal, For, lazy, Suspense } from 'solid-js';
import Button from '@components/ui/Button';
import CodeSnippet from '@components/CodeSnippet';

type RawModule = { default: string };

type Tutorial = {
  id: string;
  label: string;
  Component: ReturnType<typeof lazy>;
  loadCode: () => Promise<string>;
};

const tutorials: Tutorial[] = [
  {
    id: 'simpleSignalsExample',
    label: 'Simple Signals Example',
    Component: lazy(() => import('@components/tutorials/SimpleSignalsExample')),
    loadCode: async () => {
      const mod = (await import(
        '@components/tutorials/SimpleSignalsExample.tsx?raw'
      )) as RawModule;
      return mod.default;
    },
  },
  {
    id: 'basicFormExample',
    label: 'Basic Form Example',
    Component: lazy(() => import('@components/tutorials/BasicFormExample')),
    loadCode: async () => {
      const mod = (await import(
        '@components/tutorials/BasicFormExample.tsx?raw'
      )) as RawModule;
      return mod.default;
    },
  },
  {
    id: 'eventHandlersExample',
    label: 'Event Handlers Example',
    Component: lazy(() => import('@components/tutorials/EventHandlersExample')),
    loadCode: async () => {
      const mod = (await import(
        '@components/tutorials/EventHandlersExample.tsx?raw'
      )) as RawModule;
      return mod.default;
    },
  },
  {
    id: 'simpleStoresExample',
    label: 'Simple Stores Example',
    Component: lazy(() => import('@components/tutorials/SimpleStoresExample')),
    loadCode: async () => {
      const mod = (await import(
        '@components/tutorials/SimpleStoresExample.tsx?raw'
      )) as RawModule;
      return mod.default;
    },
  },
  {
    id: 'simpleEffectsExample',
    label: 'Simple Effects Example',
    Component: lazy(() => import('@components/tutorials/SimpleEffectsExample')),
    loadCode: async () => {
      const mod = (await import(
        '@components/tutorials/SimpleEffectsExample.tsx?raw'
      )) as RawModule;
      return mod.default;
    },
  },
  {
    id: 'simpleEffectsExample2',
    label: 'Simple Effects Example 2',
    Component: lazy(
      () => import('@components/tutorials/SimpleEffectsExample2'),
    ),
    loadCode: async () => {
      const mod = (await import(
        '@components/tutorials/SimpleEffectsExample2.tsx?raw'
      )) as RawModule;
      return mod.default;
    },
  },
  {
    id: 'contextExample',
    label: 'Context Example',
    Component: lazy(() => import('@components/tutorials/ContextExample')),
    loadCode: async () => {
      const mod = (await import(
        '@components/tutorials/ContextExample.tsx?raw'
      )) as RawModule;
      return mod.default;
    },
  },
  {
    id: 'dataFetchingExample',
    label: 'Data Fetching Example',
    Component: lazy(() => import('@components/tutorials/DataFetchingExample')),
    loadCode: async () => {
      const mod = (await import(
        '@components/tutorials/DataFetchingExample.tsx?raw'
      )) as RawModule;
      return mod.default;
    },
  },
];

const SolidConceptsExamplesPage = () => {
  const [currentId, setCurrentId] = createSignal<string | null>(null);
  const [code, setCode] = createSignal<string>('');

  const selected = createMemo(
    () => tutorials.find((t) => t.id === currentId()) ?? null,
  );

  const loadTutorial = async (t: Tutorial) => {
    setCurrentId(t.id);
    setCode(''); // clear while loading

    try {
      const source = await t.loadCode();
      setCode(source);
      console.log(source);
    } catch (err) {
      console.error('Failed to load code:', err);
      setCode('// Failed to load code');
    }
  };

  return (
    <div class="mx-auto mt-4">
      <div class="grid grid-cols-2 gap-4">
        <For each={tutorials}>
          {(t) => (
            <Button
              extraClasses="mx-auto w-64"
              onClick={() => void loadTutorial(t)}
            >
              {t.label}
            </Button>
          )}
        </For>
      </div>

      <div class="mx-auto mb-4 mt-8 flex w-max flex-row gap-6">
        <div class="min-w-[480px]">
          <Suspense fallback={<div>Loading tutorial…</div>}>
            {(() => {
              const tutorial = selected();
              if (!tutorial) return <div>Select a Tutorial</div>;

              const Component = tutorial.Component;
              return <Component />;
            })()}
          </Suspense>
        </div>

        <div class="min-w-[480px]">
          <CodeSnippet
            code={code() || '// select a tutorial to view its code'}
            //code={code()}
          />
        </div>
      </div>
    </div>
  );
};

export default SolidConceptsExamplesPage;
