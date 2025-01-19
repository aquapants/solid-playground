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
  const [items, setItems] = createStore<CartItem[]>([]);

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
