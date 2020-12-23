import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./footer.css";
import { useTranslation } from "react-i18next";
import logo_footer from "./logo_footer.png";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer id="footer" className="footer-holder">
      <div className="container10 footer-holder-inner desktopHideOnMobile">
        <div className="row">
          <div className="col-sm-6 col-md-3">
            <div className="logo footer-logo">
              <Link to="/">
                {" "}
                <img src={logo_footer} />{" "}
              </Link>
            </div>
            <p className="footer-title">{t("ReadMoreParag.1")}</p>
            <div className="footer-readmore">
              <Link to="">{t("ReadMore.1")}</Link>
            </div>
          </div>
          <div className="col-sm-6 col-md-3">
            <span className="footerTitle">{t("About.1")}</span>
            <ul className="footer-nav">
              <li>
                <div className="footerlink">
                  <Link to="">{t("AboutUs.1")}</Link>
                </div>
              </li>
              <li>
                <div className="footerlink">
                  <Link to="">{t("PrivacyPolicy.1")}</Link>
                </div>
              </li>
              <li>
                <div className="footerlink">
                  <Link to="">{t("ReachUs.1")}</Link>
                </div>
              </li>
            </ul>
          </div>
          <div className="col-sm-6 col-md-3">
            <span className="footerTitle">{t("Information.1")}</span>
            <ul className="footer-nav">
              <li>
                <div className="footerlink">
                  <Link to="">{t("TermofUse.1")}</Link>
                </div>
              </li>
              <li>
                <div className="footerlink">
                  <Link to="">{t("Career.1")}</Link>
                </div>
              </li>
            </ul>
          </div>
          <div className="col-sm-6 col-md-3">
            <span className="footerTitle">{t("ContactUs.1")}</span>
            <ul className="footer-nav">
              <li>
                <div className="footerlink">
                  <i className="fa fa-envelope-o"></i>
                  <span to="/">bazaronline.afg@gmail.com</span>
                </div>
              </li>
              <li>
                <div className="footerlink">
                  <i className="fa fa-volume-control-phone"></i>
                  <span>(+93)794811385</span>
                </div>
              </li>
            </ul>

            <Link to="" className="btn btn-primary btn-msg">
              {t("Feedback.1")}
            </Link>
          </div>
        </div>
      </div>

      <div className="footer-outer">
        <div className="container">
          <div className="row">
            <div className="col-sm-6">
              <p className="allright text-center text-sm-left">
                {" "}
                ©BazarOnline.com &copy;{new Date().getFullYear()} All Rights
                Reserved.
              </p>
            </div>

            <div className="col-sm-6">
              <ul className="social-icone-footer">
                <li>
                  <span className="facebook footer-socail">
                    <a
                      href=""
                      target="_blank"
                    >
                      <i className="fa fa-facebook"></i>
                    </a>
                  </span>
                </li>
                <li>
                  <span className="instagram footer-socail">
                    <a
                      href=""
                      target="_blank"
                    >
                      <i className="fa fa-instagram"></i>
                    </a>
                  </span>
                </li>
                <li>
                  <span className="twitter footer-socail">
                    <a href="" target="_blank">
                      <i className=" fa fa-twitter"></i>
                    </a>
                  </span>
                </li>
                <li>
                  <span className="linkedin footer-socail">
                    <a
                      href=""
                      target="_blank"
                    >
                      <i className="fa fa-linkedin"></i>
                    </a>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
