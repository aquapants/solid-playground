import { ParentProps, Show, createSignal } from 'solid-js';

import Navbar from '@components/Navbar';
import SunIcon from '@components/ui/SunIcon';
import CartIcon from '@components/ui/CartIcon';
import Cart from '@components/Cart';

const MainLayout = (props: ParentProps) => {
  const [darkTheme, setDarkTheme] = createSignal(false);
  const [cartOpen, setCartOpen] = createSignal(false);

  // fucntion to toggle light or dark theme *on header component only*
  // tailwind has light & dark theme functionality built in
  // this is just meant to serve as a simple event handler example
  function toggleTheme() {
    setDarkTheme(!darkTheme());
  }

  // fucntion to toggle visibility of cart
  const toggleCart = () => setCartOpen(!cartOpen());

  return (
    <div>
      <div
        // header component above 'main', exists outside the 'container' class so it spreads across the entire screen width
        class="sticky top-0 z-10 flex flex-row border-b-[1px] border-b-zinc-800"
        classList={{
          'bg-zinc-200': darkTheme(),
          'text-black': darkTheme(),
          'bg-zinc-950': !darkTheme(), // change the text back to light color if dark mode is off
        }} // styles depending on darkTheme() value
      >
        {/* sun icon - toggle light & dark theme on the navbar element */}
        <span onClick={toggleTheme} class="cursor-pointer hover:scale-110">
          <SunIcon class="ml-4 mr-8 size-8 h-full" />
        </span>

        <Navbar />

        {/* shopping cart icon - toggle visibilty of a site-wide shopping cart*/}
        <div class="relative my-auto ml-auto mr-4">
          <button
            onClick={toggleCart}
            class="relative ml-auto flex items-center justify-center rounded-2xl bg-gray-500 p-2 text-white hover:bg-gray-600"
          >
            <CartIcon />
          </button>
          <Show when={cartOpen()}>
            <div class="absolute right-0 mt-2 shadow-lg">
              <Cart />
            </div>
          </Show>
        </div>
      </div>

      {/* main website content */}
      <main class="container mx-auto" classList={{ light: darkTheme() }}>
        {props.children}
      </main>
    </div>
  );
};

export default MainLayout;
