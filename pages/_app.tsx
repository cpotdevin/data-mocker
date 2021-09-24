import type { AppProps } from 'next/app';
import 'tailwindcss/tailwind.css';

function App({ Component, pageProps }: AppProps) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Component {...pageProps} />;
}

export default App;
