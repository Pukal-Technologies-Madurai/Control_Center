// app/providers.js
"use client"
import { Provider } from 'react-redux';
import store from './store';  // Use default import

export default function Providers({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
