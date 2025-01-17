import { For } from 'solid-js';
import Cart from '@components/Cart';
import { useCartContext } from '@context/CartContext';
import { CartItem } from '@custom-types/types';

// basic useContext example using a shopping cart in an online store as the demonstration
const ContextExample = () => {
  const context = useCartContext();
  if (!context) {
    throw new Error('useCartContext must be used within a CartContextProvider');
  }
  const { items } = context;

  return (
    <div class="flex w-[32rem] flex-col border-2 p-2">
      <Cart>
        <h2 class="text-4xl">Your shopping Cart</h2>
        <For each={items}>
          {(item: CartItem) => (
            <p class="my-3">
              {item.title} - ${item.price} x {item.quantity}
            </p>
          )}
        </For>
      </Cart>
    </div>
  );
};

export default ContextExample;
