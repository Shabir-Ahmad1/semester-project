import React, { useEffect, useState, Component } from "react";
import { Button, Descriptions } from "antd";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { withRouter } from "react-router-dom";
import moment from "moment";
import 'antd/dist/antd.css';
import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
  ViberShareButton,
  WhatsappShareButton,
} from "react-share";
import {
  EmailIcon,
  FacebookIcon,
  TwitterIcon,
  ViberIcon,
  WhatsappIcon,
} from "react-share";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import ProductInfoHelper from "./ProductInfoHelper.css";

function ProductInfo(props) {
  const { t } = useTranslation();
  const user = useSelector((state) => state.user);
  const [Product, setProduct] = useState({});


  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => setShow(true);

  useEffect(() => {
    setProduct(props.detail);
  }, [props.detail]);




  return (
    <div>
      <div>
        <Descriptions bordered
          title={t("AdDetails.1")}
          style={{ textAlign: "center" }}
          column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
        >
          <Descriptions.Item label={t("Price.1")}>
            {Product.price}
          </Descriptions.Item>
          <Descriptions.Item label={t("Date.1")}>
            {moment(Product.createdAt).format("MMMM DD YYYY ")}
          </Descriptions.Item>
          <Descriptions.Item label={t("View.1")}>
            {Product.views + 23}
          </Descriptions.Item>
          <Descriptions.Item label={t("Phone.1")}>
            {"0" + Product.phone}
          </Descriptions.Item>
          <Descriptions.Item label={t("Category.1")}>
            {" "}
            {Product.Category}
          </Descriptions.Item>
          <Descriptions.Item label={t("Location.1")}>
            {Product.location}
          </Descriptions.Item>
          <Descriptions.Item label={t("Description.1")}>
            <br />
            {Product.description}
            <br />
          </Descriptions.Item>
        </Descriptions>
        <br />
        <br />
      </div>



      <div className="row">


        {user.userData && !user.userData.isAuth ? (
          ""
        ) : (

            <div className="col-md-10 col-lg-10 col-sm-12"
              style={{ textAlign: "right", marginBottom: 3, marginRight: -10 }}>
            </div>

          )}

        {user.userData && !user.userData.isAuth ? (
          ""
        ) : (


            <div className="col-md-2 col-lg-2 col-sm-12" style={{ textAlign: "right" }} >

              {" "}


            </div>
          )}

        <br /> <br />
      </div>


    </div>

  );
}

export default withRouter(ProductInfo);
