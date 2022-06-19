import "../styles/globals.css";
import configureStore from "../redux/store/store";
import { Provider } from "react-redux";
const store = configureStore();
function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
