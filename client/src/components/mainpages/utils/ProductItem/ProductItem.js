import React from "react";
import Btnrender from "./BtnRender";
import Badge from "@mui/material/Badge";

export default function Productitem({
  product,
  isAdmin,
  handleCheck,
  deleteProduct,
}) {
  return (
    <>
      {product?.product_id === "prod07" || product?.product_id === "prod06" ? (
        <Badge badgeContent={"3D"} color="primary">
          <div className="product_card">
            {isAdmin && (
              <input
                type="checkbox"
                checked={product.checked}
                onChange={() => handleCheck(product._id)}
              />
            )}
            <img src={product.images.url} alt="" />

            <div className="product_box">
              <h2 title={product.title}>{product.title}</h2>
              <span>${product.price}</span>
              <p>{product.description}</p>
            </div>

            <Btnrender product={product} deleteProduct={deleteProduct} />
          </div>
        </Badge>
      ) : (
        <div className="product_card">
          {isAdmin && (
            <input
              type="checkbox"
              checked={product.checked}
              onChange={() => handleCheck(product._id)}
            />
          )}
          <img src={product.images.url} alt="" />

          <div className="product_box">
            <h2 title={product.title}>{product.title}</h2>
            <span>${product.price}</span>
            <p>{product.description}</p>
          </div>

          <Btnrender product={product} deleteProduct={deleteProduct} />
        </div>
      )}
    </>
  );
}
