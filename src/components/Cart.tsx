import { JSX } from 'solid-js';

interface CartProps {
  children?: JSX.Element | JSX.Element[];
}

const Cart = (props: CartProps) => {
  return (
    <div class="rounded-md p-4 text-center shadow-md">{props.children}</div>
  );
};

export default Cart;
