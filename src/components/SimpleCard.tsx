import { JSX } from 'solid-js';

interface SimpleCardProps {
  children?: JSX.Element | JSX.Element[]; // optional child html elements
  class?: string; // optional additional classes
}

const SimpleCard = (props: SimpleCardProps) => {
  return (
    <div
      class={`flex w-[32rem] flex-col rounded-md border-2 p-4 ${props.class || ''}`}
    >
      {props.children}
    </div>
  );
};

export default SimpleCard;
