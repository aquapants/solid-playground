import { ParentProps, createSignal } from "solid-js";

import Navbar from "@components/Navbar";
import SunIcon from "@components/ui/SunIcon";

const MainLayout = (props: ParentProps) => {
  const [darkTheme, setDarkTheme] = createSignal(false)
  
  // fucntion to toggle light or dark theme *on header component only*
  // tailwind has light & dark theme functionality built in
  // this is just meant to serve as a simple but practical event handler example
  function toggleTheme() {
    setDarkTheme(!darkTheme())
  }

  return (
  <div>
    <div 
      class="flex flex-row sticky top-0 z-10 border-b-zinc-800 border-b-[1px]"
      classList={{"bg-zinc-200": darkTheme(), "text-black": darkTheme(), 
                  "bg-zinc-950": !darkTheme()}}  // styles depending on darkTheme() value
    >
      <span
        onClick={toggleTheme} 
        class="cursor-pointer hover:scale-110"
      >
        <SunIcon class="size-8 ml-4 mr-8 h-full"/>
      </span>
      <Navbar />
    </div>
    <main 
      class="container mx-auto"
      classList={{'light': darkTheme()}}  
    >
      {props.children}
    </main>
  </div>
  )
};


export default MainLayout;