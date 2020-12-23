import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { loginUser } from "../../../_actions/user_actions";
import { Formik } from "formik";
import * as Yup from "yup";
import { Form, Icon, Input, Button, Checkbox, Typography } from "antd";
import { useDispatch } from "react-redux";
import {useTranslation} from 'react-i18next';
import socialBtn from "./socialBtn.css";

const { Title } = Typography;

function LoginPage(props) {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const rememberMeChecked = localStorage.getItem("rememberMe") ? true : false;

  const [formErrorMessage, setFormErrorMessage] = useState("");
  const [rememberMe, setRememberMe] = useState(rememberMeChecked);

  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  const initialEmail = localStorage.getItem("rememberMe")
    ? localStorage.getItem("rememberMe")
    : "";

  const password = t('PasswordRequire.1');
  const email = t('EmailRequire.1');
  const invalidEmail = t('EmailIsInvalid.1');
  const passwordChar = t('PasswordCharacters.1');
  const emailPassword = t('CheckYourEmailPasswordAgain.1')
  return (
    <React.Fragment>
      <Formik
        initialValues={{
          email: initialEmail,
          password: ""
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email(invalidEmail)
            .required(email),
          password: Yup.string()
            .min(6, passwordChar)
            .required(password)
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            let dataToSubmit = {
              email: values.email,
              password: values.password
            };

            dispatch(loginUser(dataToSubmit))
              .then(response => {
                if (response.payload.loginSuccess) {
                  window.localStorage.setItem(
                    "userId",
                    response.payload.userId
                  );
                  if (rememberMe === true) {
                    window.localStorage.setItem("rememberMe", values.id);
                  } else {
                    localStorage.removeItem("rememberMe");
                  }
                  props.history.push("/");
                } else {
                  setFormErrorMessage(emailPassword);
                }
              })
              .catch(err => {
                setFormErrorMessage(emailPassword);
                setTimeout(() => {
                  setFormErrorMessage("");
                }, 3000);
              });
            setSubmitting(false);
          }, 500);
        }}
      >
        {props => {
          const {
            values,
            touched,
            errors,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit
          } = props;
          return (
            <div className="app">
              <Title level={2}>{t('LogIn.1')}</Title>
              <form onSubmit={handleSubmit} style={{ width: "350px" }}>
                <Form.Item required>
                  <Input
                    id="email"
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder={t('EnterYourEmail.1')}
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.email && touched.email
                        ? "text-input error"
                        : "text-input"
                    }
                  />
                  {errors.email && touched.email && (
                    <div className="input-feedback">{errors.email}</div>
                  )}
                </Form.Item>

                <Form.Item required>
                  <Input
                    id="password"
                    prefix={
                      <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder={t('EnterYourPassword.1')}
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.password && touched.password
                        ? "text-input error"
                        : "text-input"
                    }
                  />
                  {errors.password && touched.password && (
                    <div className="input-feedback">{errors.password}</div>
                  )}
                </Form.Item>

                {formErrorMessage && (
                  <label>
                    <p
                      style={{
                        color: "#ff0000bf",
                        fontSize: "0.7rem",
                        border: "1px solid",
                        padding: "1rem",
                        borderRadius: "10px"
                      }}
                    >
                      {formErrorMessage}
                    </p>
                  </label>
                )}

                <Form.Item>
                  <Checkbox
                    id="rememberMe"
                    onChange={handleRememberMe}
                    checked={rememberMe}
                  >
                    {t('RememberMe.1')}
                  </Checkbox>
                  <a
                    
                    className="login-form-forgot"
                    href="/reset_user"
                    style={{ float: "right", color:"maroon" }}
                  >
                    {t('ForgotPassword.1')}
                  </a>
                  <div>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="login-form-button"
                      style={{ minWidth: "100%" }}
                      disabled={isSubmitting}
                      onSubmit={handleSubmit}
                    >
                      {t('LogIn.1')}
                    </Button>
                  </div>
                  <a href="/register" style={{color:"blue"}}>{t('RegisterNow.1')}</a>
                </Form.Item>
                <hr />
                <h3 style={{ textAlign: "center" }}>
                  {t('LoginWithSocialAccounts.1')}
                </h3>
                <hr />
                <div className="row social-Btns">
                  <div className="col-sm-6">
                            
                  <a href="" className=" btn-social btn-facebook">
                  <i className="fa fa-facebook"></i> facebook
                  </a>
                    </div>

                    <div className="col-sm-6">
                        <a href="" className="  btn-social btn-google-plus">
                    <i className="fa fa-google"></i>Google
                        </a>
                    </div>
                </div>
              </form>
            </div>
          );
        }}
      </Formik>
    </React.Fragment>
  );
}

export default withRouter(LoginPage);
