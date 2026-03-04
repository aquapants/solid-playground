import { For } from 'solid-js';
import SimpleCard from '@components/SimpleCard';
import { useCartContext } from '@context/CartContext';
import { CartItem } from '@custom-types/types';

const Cart = () => {
  const context = useCartContext();
  if (!context) {
    throw new Error('useCartContext must be used within a CartContextProvider');
  }
  const { items } = context;

  return (
    <SimpleCard class="bg-zinc-800">
      <h2 class="mb-4 text-2xl font-bold">Your Shopping Cart</h2>
      <For each={items}>
        {(item: CartItem) => (
          <p class="my-2 text-lg">
            {item.title} - ${item.price} x {item.quantity}
          </p>
        )}
      </For>
      <button
        class="mt-4 rounded bg-blue-500 text-white hover:bg-blue-600"
        onClick={() => alert('Checkout process coming soon!')}
      >
        Checkout
      </button>
    </SimpleCard>
  );
};

export default Cart;
