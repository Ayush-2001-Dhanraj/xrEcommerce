import React, { useContext } from "react";
import { GlobalState } from "../../../GlobalState";

const Filters = () => {
  const state = useContext(GlobalState);
  const [categories] = state.CategoryAPI.categories;
  const [category, setCategory] = state.ProductsAPI.category;
  const [sort, setSort] = state.ProductsAPI.sort;
  const [search, setSearch] = state.ProductsAPI.search;

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  return (
    <div className="filter_menu">
      <div className="row">
        <span>Filter: </span>
        <select
          name="category"
          value={category}
          onChange={handleCategoryChange}
        >
          <option value="">All Products</option>
          {categories.map((c) => (
            <option value={"category=" + c._id} key={c._id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <input
        type="text"
        value={search}
        placeholder="Enter your Search Term!"
        onChange={(e) => setSearch(e.target.value.toLowerCase())}
      />

      <div className="row sort">
        <span>Sort By: </span>
        <select
          name="sort"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">Newest</option>
          <option value="sort=oldest">Oldest</option>
          <option value="sort=-sold">Best Selling</option>
          <option value="sort=-price">Price: High - Low</option>
          <option value="sort=price">Price: Low - High</option>
        </select>
      </div>
    </div>
  );
};
export default Filters;
