import React, { Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Auth from "../hoc/auth";
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer";
import UploadProductPage from "./views/UploadProductPage/UploadProductPage";
import DetailProductPage from "./views/DetailProductPage/DetailProductPage";
import Dashboard from "./views/Dashboard/Dashboard";
import EditPostuser from "./views/Dashboard/EditPostUser";
import Admin from "./Admin/containers/Admin";


function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NavBar />
      <div style={{ paddingTop: "75px", minHeight: "calc(100vh - 80px)" }}>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route
            exact
            path="/admin/dashboard"
            component={Auth(Admin, false, true)}
          />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route
            exact
            path="/post/upload"
            component={Auth(UploadProductPage, true)}
          />
          <Route
            exact
            path="/post/:productId"
            component={Auth(DetailProductPage, null)}
          />
        
          <Route
            exact
            path="/users/Dashboard"
            component={Auth(Dashboard, true)}
          />
          <Route
            exact
            path="/post/update/:id"
            component={Auth(EditPostuser, true)}
          />
      
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
