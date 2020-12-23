import axios from "axios";
import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT_USER,
  ADD_TO_favorite_USER,
  GET_favorite_ITEMS_USER,
  REMOVE_favorite_ITEM_USER,
  ON_SUCCESS_BUY_USER,
} from "./types";
import { USER_SERVER } from "../components/Config.js";

export function registerUser(dataToSubmit) {
  const request = axios
    .post(`${USER_SERVER}/register`, dataToSubmit)
    .then((response) => response.data);

  return {
    type: REGISTER_USER,
    payload: request,
  };
}

export function loginUser(dataToSubmit) {
  const request = axios
    .post(`${USER_SERVER}/login`, dataToSubmit)
    .then((response) => response.data);

  return {
    type: LOGIN_USER,
    payload: request,
  };
}

export function auth() {
  const request = axios
    .get(`${USER_SERVER}/auth`)
    .then((response) => response.data);

  return {
    type: AUTH_USER,
    payload: request,
  };
}

export function logoutUser() {
  const request = axios
    .get(`${USER_SERVER}/logout`)
    .then((response) => response.data);

  return {
    type: LOGOUT_USER,
    payload: request,
  };
}

export function addTofavorite(_id) {
  const request = axios
    .get(`${USER_SERVER}/addTofavorite?productId=${_id}`)
    .then((response) => response.data);

  return {
    type: ADD_TO_favorite_USER,
    payload: request,
  };
}

export function getfavoriteItems(favoriteItems, userfavorite) {
  const request = axios
    .get(`/api/product/products_by_id?id=${favoriteItems}&type=array`)
    .then((response) => {
      //Make favoriteDetail inside Redux Store
      // We need to add quantity data to Product Information that come from Product Collection.

      userfavorite.forEach((favoriteItem) => {
        response.data.forEach((productDetail, i) => {
          if (favoriteItem.id === productDetail._id) {
            response.data[i].quantity = favoriteItem.quantity;
          }
        });
      });
      return response.data;
    });

  return {
    type: GET_favorite_ITEMS_USER,
    payload: request,
  };
}

export function removefavoriteItem(id) {
  const request = axios
    .get(`/api/users/removeFromfavorite?_id=${id}`)
    .then((response) => {
      response.data.favorite.forEach((item) => {
        response.data.favoriteDetail.forEach((k, i) => {
          if (item.id === k._id) {
            response.data.favoriteDetail[i].quantity = item.quantity;
          }
        });
      });
      return response.data;
    });

  return {
    type: REMOVE_favorite_ITEM_USER,
    payload: request,
  };
}

export function onSuccessBuy(data) {
  return {
    type: ON_SUCCESS_BUY_USER,
    payload: data,
  };
}
