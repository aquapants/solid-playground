import solidLogo from '@assets/solid.svg';

import Card from '@components/Card';
import Counter from '@components/Counter';
import ColorChanger from '@components/ColorChanger';
import { For } from 'solid-js';

const cards = [
  {
    title: 'SolidJS Concepts Examples',
    text: "This page is to showcase some very simple examples of signals in SolidJS If you're coming from a React background you can think of `createSignal` as `useState` in React",
    rounded: true,
    flat: false,
    buttonTo: '/solid-concepts-examples',
  },
  {
    title: 'Map Page',
    text: 'Experimenting with interactive mapping of locations using Leaflet and OpenStreetMap for landlord tenant union project',
    rounded: true,
    flat: false,
    buttonTo: '/map',
  },
  {
    title: 'About',
    text: 'Learn more about me, my organization and this project.',
    rounded: false,
    flat: true,
    buttonTo: '/about',
  },
];

const HomePage = () => {
  return (
    <div>
      <div class="section-min-height flex flex-col items-center justify-center">
        <div class="flex flex-row space-x-2">
          <h1 class="text-4xl font-bold">Solid Playground</h1>
          <img src={solidLogo} alt="SolidJS Logo" class="h-10" />
        </div>
        <Counter />
        <div class="mt-2">
          <ColorChanger />
        </div>
      </div>
      <div class="my grid grid-cols-4 gap-10 py-2">
        <Card // special home page card, button returns window to top of page
          title="Home Page"
          text="Displays a hero section with counter widget and color chnaging button. Below are these cards that reprent various pages and experiments available in this application"
          rounded={true}
          flat={false}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        />
        {/* loop over the array of cards to get the rest of the cards */}
        {/* instead of using JavaScript's map funciton, we can use SolidJS's For tag to loop over an array */}
        <For each={cards}>
          {(card) => (
            <Card
              title={card.title}
              text={card.text}
              rounded={card.rounded}
              flat={card.flat}
              buttonTo={card.buttonTo}
            />
          )}
        </For>
        <Card />
        <Card />
      </div>
    </div>
  );
};

export default HomePage;
