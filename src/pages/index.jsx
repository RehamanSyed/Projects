import { useDispatch, useSelector } from "react-redux";
import ProductListing from "@/components/ProductListing";
import { setProducts } from "@/store/cartSlice";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export async function getStaticProps() {
  const res = await fetch(`http://localhost:3000/products.json`);
  const products = await res.json();
  return {
    props: { products },
  };
}
export default function Home({ products }) {
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.cart.products);

  useEffect(() => {
    dispatch(setProducts(products));
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-xs-12 col-xl-12"></div>
        {productData.length < 0
          ? "Loading..."
          : productData.map((product, idx) => (
              <div className="col-xs-6 col-sm-4 col-md-3 col-lg-3 col-xl-2">
                <ProductListing product={product} key={idx} />
              </div>
            ))}
      </div>
    </div>
  );
}
