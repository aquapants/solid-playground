import { ParentProps, createSignal } from 'solid-js';

import Navbar from '@components/Navbar';
import SunIcon from '@components/ui/SunIcon';

const MainLayout = (props: ParentProps) => {
  const [darkTheme, setDarkTheme] = createSignal(false);

  // fucntion to toggle light or dark theme *on header component only*
  // tailwind has light & dark theme functionality built in
  // this is just meant to serve as a simple but practical event handler example
  function toggleTheme() {
    setDarkTheme(!darkTheme());
  }

  return (
    <div>
      <div
        // header component above 'main', exists outside the 'container' class so it spreads across the entire screen width
        class="sticky top-0 z-10 flex flex-row border-b-[1px] border-b-zinc-800"
        classList={{
          'bg-zinc-200': darkTheme(),
          'text-black': darkTheme(),
          'bg-zinc-950': !darkTheme(),
        }} // styles depending on darkTheme() value
      >
        <span onClick={toggleTheme} class="cursor-pointer hover:scale-110">
          <SunIcon class="ml-4 mr-8 size-8 h-full" />
        </span>
        <Navbar />
      </div>
      <main class="container mx-auto" classList={{ light: darkTheme() }}>
        {props.children}
      </main>
    </div>
  );
};

export default MainLayout;
