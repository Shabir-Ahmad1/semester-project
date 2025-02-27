import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Row, Col } from "antd";
import ProductImage from "./Sections/ProductImage";
import ProductInfo from "./Sections/ProductInfo";
import { addTofavorite } from "../../../_actions/user_actions";
import { useDispatch } from "react-redux";
function DetailProductPage(props) {
  const dispatch = useDispatch();
  const productId = props.match.params.productId;
  const [Product, setProduct] = useState([]);

  useEffect(() => {
    Axios.get(`/api/product/products_by_id?id=${productId}&type=single`).then(
      (response) => {
        setProduct(response.data[0]);
      }
    );
  }, []);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const addToFavorite = (productId) => {
    dispatch(addTofavorite(productId));
  };

  return (
    <React.Fragment>
      <div className="postPage" style={{ width: "100%", padding: "3rem 4rem" }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h1>{Product.title}</h1>
        </div>
        <br />
        <Row gutter={[16, 16]}>
          <Col lg={12} xs={24}>
            <ProductImage detail={Product} />
          </Col>
          <Col lg={12} xs={24}>
            <ProductInfo addTofavorite={addToFavorite} detail={Product} />
          </Col>

          <br />

        
        </Row>
      </div>

    </React.Fragment>
  );
}

export default DetailProductPage;
