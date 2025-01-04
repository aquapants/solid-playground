// src/layouts/MainLayout.tsx
import { ParentProps } from "solid-js";
import Navbar from "../components/Navbar";

const MainLayout = (props: ParentProps) => (
  <div>
    <Navbar />
    <main class="container mx-auto">
      {props.children}
    </main>
  </div>
);

export default MainLayout;