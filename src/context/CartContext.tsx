import { createStore, SetStoreFunction } from 'solid-js/store';
import { createContext, ParentProps, useContext } from 'solid-js';
import type { CartItem } from '@custom-types/types';

interface CartContextType {
  items: CartItem[];
  setItems: SetStoreFunction<CartItem[]>; // Add setItems to the interface
}

export const CartContext = createContext<CartContextType>({
  items: [],
  setItems: () => {},
});

export const CartContextProvider = (props: ParentProps) => {
  const [items, setItems] = createStore<CartItem[]>([
    { id: 100, title: 'test product', quantity: 2, price: 15 },
    { id: 101, title: 'test product 2', quantity: 1, price: 20 },
  ]);

  return (
    <CartContext.Provider value={{ items, setItems }}>
      {props.children}
    </CartContext.Provider>
  );
};

// optionally undefined means CartContext is not required
export const useCartContext = (): CartContextType | undefined => {
  return useContext(CartContext);
};
