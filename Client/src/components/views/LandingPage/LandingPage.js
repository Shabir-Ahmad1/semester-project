import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Icon, Col, Card, Row, Button } from "antd";
import ImageSlider from "../../utils/ImageSlider";
import logo from "./images/BazaarOnline.png";
import { Link } from "react-router-dom";
import Category from "./Category";
import Jumbotron from "react-bootstrap/Jumbotron";
import "bootstrap/dist/css/bootstrap.min.css";
import { useTranslation } from "react-i18next";
import moment from "moment";

const { Meta } = Card;

function LandingPage() {
  const { t } = useTranslation();
  const [Products, setProducts] = useState([]);
  const [Skip, setSkip] = useState(0);
  const [Limit, setLimit] = useState(8);
  const [PostSize, setPostSize] = useState();
  

  

  useEffect(() => {
    const variables = {
      skip: Skip,
      limit: Limit,
    };

    getProducts(variables);
  }, []);

  const getProducts = (variables) => {
    Axios.post("/api/product/getProducts", variables).then((response) => {
      if (response.data.success) {
        if (variables.loadMore) {
          setProducts([...Products, ...response.data.products]);
        } else {
          setProducts(response.data.products);
        }
        setPostSize(response.data.postSize);
      } else {
        alert("Failed to fectch product datas");
      }
    });
  };
  const displayCity = (val) => {
    switch (val) {
      case 1:
        return "Kabul";
      case 2:
        return "Mazar-e-sharef";
      case 3:
        return "Herat";
      case 7:
        return "Kandahar";
      case 9:
        return "Nangarhar";
      case 5:
        return "Panjsher";
      default:
        return "Undefined";
    }
  };

  const onLoadMore = () => {
    let skip = Skip + Limit;

    const variables = {
      skip: skip,
      limit: Limit,
      loadMore: true,
    };
    getProducts(variables);
    setSkip(skip);
  };
  const price1 = t("Price1.1");
  const renderCards = Products.map((product, index) => {
    return (
      <Col lg={6} md={8} xs={20}>
        <Card
          hoverable={true}
          cover={
            <a href={`/post/${product._id}`}>
              {" "}
              <ImageSlider images={product.images} />
            </a>
          }
        >
          <span className="cart-details" style={{ lineHeight: "80%" }}>
            <strong>{product.title}</strong>
          </span>
          <br />

          <div style={{ marginTop: 6 }}>
            <span>{` ${product.description.slice(0, 20) + "..."}`} </span>
            <br />
          </div>

          <div style={{ marginTop: 6 }}>
            <span>
              <strong>
                {t("Price1.1")} {`${product.price}`}
              </strong>
            </span>
            <br />
          </div>

          <div style={{ marginTop: 6 }}>
            <span>
              <i class="fa fa-map-marker"></i> <strong>{t("City1.1")}</strong>{" "}
              {displayCity(product.cities)}
            </span>
          </div>

          <div style={{ marginTop: 6 }}>
            <span>
              <i class="fas fa-calendar-alt"></i>{" "}
              {`${moment(product.createdAt).format("MMMM DD YYYY ")}`}
            </span>
          </div>
        </Card>
      </Col>
    );
  });

  const showFilteredResults = (filters) => {
    const variables = {
      skip: 0,
      limit: Limit,
      filters: filters,
    };
    getProducts(variables);
    setSkip(0);
  };


  return (
    <React.Fragment>
      <Jumbotron
        style={{
          marginLeft: "5%",
          backgroundColor: "white",
          height: "10px",
          width: "90%",
          marginTop: "-1%",
        }}
      >
        <span style={{ float: "right" }}>
          <Button
            style={{
              backgroundColor: "black",
              color: "white",
              borderRadius: "10px",
            }}
          >
            <Link to="/post/upload"> {t("SubmitFreeAd.1")} </Link>
          </Button>
        </span>
      </Jumbotron>
      <div
        style={{ marginLeft: "10%", marginRight: "10%", marginBottom: "5%" }}
      >
        <Category />
      </div>

      <div style={{ width: "75%", margin: "3rem auto" }}>
        <div style={{ textAlign: "center" }}>
          <h2>
            {" "}
            {"Search Facility is Coming Soon"} <Icon type="SlackOutlined" />{" "}
          </h2>
          <br />"{t("IfYouLike.1")}"
        </div>
        <br />
        {/* Filter  */}

        <Row gutter={[16, 16]}>
         
        </Row>

        {/* Search  */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            margin: "1rem auto",
          }}
        >
         
        </div>

        {Products.length === 0 ? (
          <div
            style={{
              display: "flex",
              height: "300px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h2>{t("NoPostYet.1")}</h2>
          </div>
        ) : (
          <div>
            <Row gutter={[16, 16]}>{renderCards}</Row>
          </div>
        )}
        <br />
        <br />

        {PostSize >= Limit && (
          <div style={{ display: "flex", justifyContent: "center" }}>
           
          </div>
        )}
      </div>
    </React.Fragment>
  );
}

export default LandingPage;
