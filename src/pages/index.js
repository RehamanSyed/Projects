import Head from "next/head";
import Image from "next/image";

import styles from "@/styles/Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import ProductListing from "@/components/ProductListing";
import { setProducts } from "@/store/cartSlice";

export async function getServerSideProps() {
  const res = await fetch(`http:localhost:3000/products.json`);
  // console.log(res);
  const products = await res.json();
  return {
    props: {
      products,
    },
  };
}
export default function Home({ products }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  dispatch(setProducts(products));
  return (
    <>
      <div className={styles.page}>
        <main className={styles.main}>
          <div> Cart {cartItems && cartItems.length}</div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 10,
              width: "100%",
            }}
          >
            {products.map((product, idx) => {
              return <ProductListing key={idx} product={product} />;
            })}
          </div>
        </main>
      </div>
    </>
  );
}
