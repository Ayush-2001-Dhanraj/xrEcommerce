import React, { useContext, useState } from "react";
import { GlobalState } from "../../../GlobalState";
import Loading from "../utils/loading/Loading";
import Productitem from "../utils/ProductItem/ProductItem";
import axios from "axios";
import Filters from "./Filter";
import LoadMore from "./LoadMore";

export default function Products(props) {
  const state = useContext(GlobalState);
  const [products, setProducts] = state.ProductsAPI.products;
  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;
  const [callback, setCallback] = state.ProductsAPI.callback;
  const [isAllCheck, setISAllCheck] = useState(false);

  const [loading, setLoading] = useState(false);

  const deleteProduct = async (id, public_id) => {
    console.log({ id, public_id });

    try {
      setLoading(true);
      const destroyImage = axios.post(
        "/api/destroy",
        { public_id: public_id },
        {
          headers: { Authorization: token },
        }
      );

      const destroyProduct = axios.delete(`/api/products/${id}`, {
        headers: { Authorization: token },
      });

      await destroyProduct;
      await destroyImage;

      setLoading(false);
      setCallback(!callback);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const handleCheck = (id) => {
    products.forEach((prod) => {
      if (prod._id === id) prod.checked = !prod.checked;
    });
    setProducts([...products]);
  };

  const handleCheckAll = () => {
    products.forEach((prod) => {
      prod.checked = !isAllCheck;
    });
    setProducts([...products]);
    setISAllCheck(!isAllCheck);
  };

  if (loading) return <Loading />;

  const deleteAll = () => {
    products.forEach((prod) => {
      if (prod.checked) deleteProduct(prod._id, prod.images.public_id);
    });
  };

  return (
    <>
      <Filters />
      {isAdmin && (
        <div className="delete-all">
          <label>
            Select All&nbsp;
            <input
              type="checkbox"
              value={isAllCheck}
              onChange={handleCheckAll}
            />
          </label>
          <button onClick={deleteAll}>Delete All</button>
        </div>
      )}
      <div className="products">
        {products.map((product) => {
          return (
            <Productitem
              key={product._id}
              product={product}
              isAdmin={isAdmin}
              handleCheck={handleCheck}
              deleteProduct={deleteProduct}
            />
          );
        })}
      </div>
      <LoadMore />
      {products.length === 0 && <Loading />}
    </>
  );
}
