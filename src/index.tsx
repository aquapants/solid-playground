/* @refresh reload */
import { render } from 'solid-js/web';
import './index.css';
import App from './App';
import { CartContextProvider } from '@context/CartContext'; // Import the context provider

// index.tsx reserved as singular entry point of the application
const root = document.getElementById('root');

const faviconLink = document.createElement('link');
faviconLink.rel = 'icon';
faviconLink.type = 'image/svg+xml';
faviconLink.href = '/solid.svg';
document.head.appendChild(faviconLink);

render(
  () => (
    <CartContextProvider>
      <App />
    </CartContextProvider>
  ),
  root!,
);
