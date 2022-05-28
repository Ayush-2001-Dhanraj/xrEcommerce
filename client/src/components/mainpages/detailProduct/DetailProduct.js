import React, { useState, useEffect, useContext, Suspense, lazy } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { GlobalState } from "../../../GlobalState";
import ProductItem from "../utils/ProductItem/ProductItem";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Fab } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
const Iphone = lazy(() => import("../../models/Iphone"));
const Heeledboots = lazy(() => import("../../models/Heeledboots"));

export default function Detailproduct(props) {
  const params = useParams();
  const state = useContext(GlobalState);
  const [products] = state.ProductsAPI.products;
  const addCart = state.userAPI.addCart;
  const [detailProduct, setDetailProduct] = useState([]);

  const [openDrawer, setOpenDrawer] = useState(false);

  useEffect(() => {
    if (params.id) {
      const temp = products.filter((product) => product._id === params.id)[0];
      setDetailProduct(temp);
    }
  }, [params.id, products]);

  if (!detailProduct || detailProduct.length === 0) return null;

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpenDrawer(open);
  };

  return (
    <>
      <div className="details">
        <img src={detailProduct.images.url} alt="" />

        <div className="box_detail">
          <div className="row">
            <h2>{detailProduct.title}</h2>
            <h6>#id: {detailProduct.product_id}</h6>
          </div>
          <span>$ {detailProduct.price}</span>
          <p>{detailProduct.description}</p>
          <p>{detailProduct.content}</p>
          <p>Sold: {detailProduct.sold}</p>
          <Link
            to="/cart"
            className="cart"
            onClick={() => addCart(detailProduct)}
          >
            Buy now
          </Link>
          {(detailProduct?.product_id === "prod07" ||
            detailProduct?.product_id === "prod06") && (
            <div
              style={{ backgroundColor: "blue", cursor: "pointer" }}
              className="cart"
              onClick={toggleDrawer(true)}
            >
              View In 3D
            </div>
          )}
        </div>
      </div>
      <div>
        <h2>Related Products</h2>
        <div className="products">
          {products.map((product) => {
            return product.category === detailProduct.category ? (
              <ProductItem key={product._id} product={product} />
            ) : null;
          })}
        </div>
      </div>
      <SwipeableDrawer
        anchor={"bottom"}
        open={openDrawer}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <Fab
          color="primary"
          aria-label="add"
          style={{ position: "absolute", right: 12, top: 12 }}
          onClick={() => setOpenDrawer(false)}
        >
          <CloseIcon />
        </Fab>
        <Canvas style={{ height: "80vh" }}>
          <OrbitControls />
          <ambientLight intensity={0.4} />
          <directionalLight position={[-2, 5, 2]} />
          <Suspense fallback={null}>
            {detailProduct?.product_id === "prod06" && <Iphone />}
            {detailProduct?.product_id === "prod07" && <Heeledboots />}
          </Suspense>
        </Canvas>
      </SwipeableDrawer>
    </>
  );
}
