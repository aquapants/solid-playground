import Button from "@components/ui/Button"

interface CardProps {
  title?: string; // optional title
  text?: string; // optional text content
  rounded?: boolean; // determines if the card should have rounded corners
  flat?: boolean; // determines if the card should have no shadow
  onClick?: () => void; // optional onClick handler for custom click events
  buttonTo?: string; // route to navigate to when the button is clicked
}

const defaultText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."

const Card = (props : CardProps) => {

  return (
    <div 
      class="max-w-sm p-6 border bg-gray-800 border-gray-700 hover:-translate-y-2 duration-300 ease-in-outjustify-between flex flex-col justify-between"
      classList={{"rounded-md": props.rounded, "shadow-lg": !props.flat}} // use classList to check for optional classes 
    >
      <h2 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {props.title || "Default Title"}
      </h2>
      <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
        {props.text || defaultText}
      </p>
      <Button extraClasses="mt-auto w-fit" to={props.buttonTo || "/"} onClick={props.onClick} >
        Click Me
      </Button>
    </div>
  )
}

export default Card