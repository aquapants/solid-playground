import { splitProps } from 'solid-js';
import { JSX } from 'solid-js';
import { useNavigate } from '@solidjs/router';

interface ButtonProps {
  children?: JSX.Element | JSX.Element[] | string; // pass a custom name for the button as a child element
  color?: string; // optional custom color defintion (include bg & border, see default value in class for reference)
  extraClasses?: string; // option addtional classes for styling the button
  onClick?: () => void; // optional onClick handler for custom click events
  to?: string; // optional route for navigation
}

const Button = (props: ButtonProps) => {
  const [local, others] = splitProps(props, [
    'children',
    'color',
    'extraClasses',
    'onClick',
    'to',
  ]);
  const navigate = useNavigate();

  // handleClick function determines whether a route and/or a custom onClick function was passed to the button
  const handleClick = () => {
    if (local.to) {
      navigate(local.to); // navigate to the provided route
    }
    if (local.onClick) {
      local.onClick(); // call the provided custom onClick handler
    }
  };

  return (
    <button
      class={`active relative rounded border-b-4 px-4 py-2 text-white shadow transition-all duration-100 ease-in-out active:translate-y-0.5 active:border-b-transparent ${local.color || 'border-red-700 bg-red-500'} ${local.extraClasses || ''}`}
      onClick={handleClick}
      {...others}
    >
      {local.children}
    </button>
  );
};

export default Button;
