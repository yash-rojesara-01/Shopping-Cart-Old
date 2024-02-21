import React from "react";
import Product from "../components/Product";
import { products } from "../data";
import { useSelector } from "react-redux";
import Filter from "../components/Filter";

const Home = () => {
  const { searchTerm, selectedCategories, priceRange } = useSelector(
    (state) => state.filterData
  );

  const filteredProducts = products.filter((product) => {
    const matchesSearchTerm =
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategories =
      selectedCategories?.length === 0 ||
      selectedCategories?.includes(product.category);

    const matchesPriceRange =
      product.price >= priceRange[0] && product.price <= priceRange[1];

    return matchesSearchTerm && matchesCategories && matchesPriceRange;
  });

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <Filter />
      <div className="min-h-[80vh] grid sm:grid-cols-2 md:grid-cols-3 space-x-5 space-y-10 lg:grid-cols-4 max-w-6xl mx-auto p-2 ">
        {filteredProducts.map((item) => {
          return <Product key={item.id} item={item} />;
        })}
      </div>
    </div>
  );
};

export default Home;
