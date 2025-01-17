import { JSX } from 'solid-js';

interface CartProps {
  children?: JSX.Element | JSX.Element[];
}

const SimpleCard = (props: CartProps) => {
  return (
    <div class="flex w-[32rem] flex-col rounded-md border-2 p-4">
      {props.children}
    </div>
  );
};

export default SimpleCard;
