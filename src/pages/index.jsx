import { useDispatch, useSelector } from "react-redux";
import ProductListing from "@/components/ProductListing";
import { setProducts } from "@/store/cartSlice";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";

async function fetchProducts() {
  const res = await fetch("http://localhost:3000/products.json"); // Replace with your API or JSON path
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  return res.json();
}

export async function getServerSideProps() {
  const queryClient = new QueryClient();
  // Pre-fetch products
  await queryClient.prefetchQuery(["products"], fetchProducts);

  return {
    props: {
      dehydratedState: dehydrate(queryClient), // Pass pre-fetched data
    },
  };
}
export default function Home({ dehydratedState }) {
  const dispatch = useDispatch();
  const { products: storedProducts } = useSelector((state) => state.cart);
 
  // React Query to fetch data (can fallback to SSR data)
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    initialData: dehydratedState?.queries[0]?.state?.data || [],
  });

  // Persist products in Redux (and localStorage) when the page loads
  useEffect(() => {
    if (products.length > 0 && storedProducts.length === 0) {
      dispatch(setProducts(products)); // Store products in Redux
    }
  }, [dispatch, products, storedProducts]);

  // Render loading state if products are still being fetched
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Handle error state for fetching products
  if (isError) {
    return <div>Error loading products</div>;
  }

  return (
    <div className="container">
      <div className="row">
        {isLoading
          ? "Loading..."
          : products.map((product, idx) => (
              <div
                className="col-xs-6 col-sm-4 col-md-3 col-lg-3 col-xl-2"
                key={idx}
              >
                <ProductListing product={product} />
              </div>
            ))}
      </div>
    </div>
  );
}
