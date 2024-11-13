import Head from "next/head";
import Image from "next/image";

import styles from "@/styles/Home.module.css";

import { useDispatch, useSelector } from "react-redux";
import ProductListing from "@/components/ProductListing";
import { setProducts } from "@/store/cartSlice";
import { useEffect } from "react";
import { useRouter } from "next/router";

export async function getServerSideProps() {
  const res = await fetch(`http:localhost:3001/products.json`);
  const products = await res.json();
  console.log(products);
  return {
    props: {
      products,
    },
  };
}
export default function Home({ products }) {
  const router = useRouter();
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
            {products.length < 0
              ? "Loading.."
              : products.map((product, idx) => {
                  return <ProductListing key={idx} product={product} />;
                })}
          </div>
        </main>
        <div className={styles.cartfixed}>
          
            {cartItems.map((item, idx) => {
              return (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    gap: 2,
                    justifyContent: "space-between",
                  }}
                >
                  <Image
                    src={"/no-img.png"}
                    alt={"image"}
                    width={50}
                    height={50}
                  />
                  <p style={{ fontSize: 10 }}>{item?.title}</p>
                  <p>{item.quantity}</p>
                </div>
              );
            })}
            <button onClick={() => router.push("/cart")}>View Cart</button>
          
          {/* <button>cart item</button> */}
        </div>
      </div>
    </>
  );
}
