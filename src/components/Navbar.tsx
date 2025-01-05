import { A } from '@solidjs/router';

// use the A tag provide by solid's router to ensure proper rendering of new pages rather than making HTTP requests
const Navbar = () => (
  <nav class="flex h-nav flex-row items-center">
    <A href="/" class="mr-6">
      Home
    </A>
    <A href="/solid-concepts-examples" class="mr-6">
      Solid Concepts Exmaples
    </A>
    <A href="/map" class="mr-6">
      Map
    </A>
    <A href="/about" class="mr-6">
      About
    </A>
  </nav>
);

export default Navbar;
