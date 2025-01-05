/* @refresh reload */
import { render } from 'solid-js/web';
import './index.css';
import App from './App.tsx';

// index.tsx reserved as singular entry point of the application
const root = document.getElementById('root');

render(() => <App />, root!);
