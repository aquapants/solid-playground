import { For } from 'solid-js';

import SimpleCard from '@components/SimpleCard';
import { useCartContext } from '@context/CartContext';
import { CartItem } from '@custom-types/types';
import Cart from '@components/Cart';

// basic useContext example using a shopping cart in an online store as the demonstration
const ContextExample = () => {
  // get global cart context from the dedicated context file: src/context/CartContext.tsx
  const context = useCartContext();
  if (!context) {
    throw new Error('useCartContext must be used within a CartContextProvider');
  }
  const { items, setItems } = context;

  const addProduct = (product: CartItem) => {
    // if the product exists in the cart already
    if (items.some((p) => p.id === product.id)) {
      setItems(
        (p) => p.id === product.id, // function to find the matching product
        'quantity', // property to update
        (q) => q + 1, // increment the quantity
      );
    } else {
      // if the product does not exist, add it to the cart
      setItems([...items, { ...product, quantity: 1 }]);
    }

    if (!items.some((p) => p.id === product.id)) {
    }
  };

  // list of dummy products
  const products: CartItem[] = [
    { id: 1, title: 'Product A', price: 29.99, quantity: 1 },
    { id: 2, title: 'Product B', price: 49.99, quantity: 1 },
    { id: 3, title: 'Product C', price: 19.99, quantity: 1 },
  ];

  return (
    <div class="flex flex-row items-start space-x-2">
      <Cart />

      {/* product section - loop through dummy products  */}
      <div>
        <For each={products}>
          {(product) => (
            <SimpleCard>
              <h1 class="text-xl">{product.title}</h1>
              <p>${product.price}</p>
              <button onClick={() => addProduct(product)}>Add to Cart</button>
            </SimpleCard>
          )}
        </For>
      </div>
    </div>
  );
};

export default ContextExample;
