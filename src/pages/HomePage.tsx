import solidLogo from '@assets/solid.svg'

import Card from '@components/Card'
import Counter from "@components/Counter"
import ColorChanger from "@components/ColorChanger"

const cardData = [
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
]

const HomePage = () => {
  return ( 
    <div>
      <div class="items-center justify-center flex flex-col section-min-height">
        <div class='flex flex-row'>
          <h1 class="text-4xl">Solid Playground</h1>
          <img src={solidLogo} alt="SolidJS Logo" class='h-10'/>
        </div>
        <Counter />
        <div class="mt-2">
          <ColorChanger />
        </div>
      </div>
      <div class='grid grid-cols-4 gap-10 my py-2'> 
        <Card // special home page card, button returns window to top of page
          title="Home Page"
          text="Displays a hero section with counter widget and color chnaging button. Below are these cards that reprent various pages and experiments available in this application"
          rounded={true}
          flat={false}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        />
        {cardData.map((card) => ( // rest of the cards mapped from cardData array defined above
          <Card
            title={card.title}
            text={card.text}
            rounded={card.rounded}
            flat={card.flat}
            buttonTo={card.buttonTo}
          />
        ))}
        <Card/>
        <Card/>
      </div>
    </div>
  )
}

export default HomePage