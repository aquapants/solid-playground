import { A } from "@solidjs/router";

const Navbar = () => (
  <nav class="flex flex-row items-center h-nav">
    <A href="/" class="mr-6">Home</A>
    <A href="/solid-concepts-examples" class="mr-6">Solid Concepts Exmaples</A>
    <A href="/map" class="mr-6">Map</A>
    <A href="/about" class="mr-6">About</A>
  </nav>
);

export default Navbar