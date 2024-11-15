import Layout from "@/layout/Root.layout";
import store from "@/store";
import "@/styles/globals.scss";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
        <ToastContainer
          position="bottom-center"
          limit={1}
          autoClose={600}
          closeOnClick
          pauseOnHover
          draggable
        />
      </Layout>
    </Provider>
  );
}
