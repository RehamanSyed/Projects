import Layout from "@/layout/Root.layout";
import store from "@/store";
import "@/styles/globals.scss";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const queryClient = new QueryClient()

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Component {...pageProps} />
          <ToastContainer
            position="top-center"
            limit={1}
            autoClose={600}
            closeOnClick
            pauseOnHover
            draggable
          />
        </Layout>
      </QueryClientProvider>
    </Provider>
  );
}
