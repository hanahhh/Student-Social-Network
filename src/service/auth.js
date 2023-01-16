import axios from "axios";
import { failTokens } from "./failToken";
import { logout } from "../redux/slice/auth";

export function getAllowedRoute(routes, role) {
  var allowedData = [];
  routes.forEach((route) => {
    if (route.permission) {
      if (route.permission.includes(role)) {
        allowedData.push(route);
      }
    } else {
      allowedData.push(route);
    }
  });

  return allowedData;
}

export function getAllowedNav(navigation, role) {
  var allowedData = [];
  navigation.forEach((nav) => {
    if (nav.permission) {
      if (nav.permission.includes(role)) {
        if (nav._children) {
          nav._children.forEach((child, index) => {
            if (child.permission && !child.permission.includes(role)) {
              nav._children.splice(index, 1);
            }
          });
        }

        allowedData.push(nav);
      }
    } else {
      if (nav._children) {
        nav._children.forEach((child, index) => {
          if (child.permission && !child.permission.includes(role)) {
            nav._children.splice(index, 1);
          }
        });
      }

      allowedData.push(nav);
    }
  });

  return allowedData;
}

export function getToken(callback) {
  axios
    .post(`${process.env.REACT_APP_API}/token/refresh`, {
      refresh_token: localStorage.getItem(
        `${process.env.REACT_APP_PREFIX_LOCAL}_refresh_token`
      ),
    })
    .then((res) => {
      localStorage.setItem(
        `${process.env.REACT_APP_PREFIX_LOCAL}_access_token`,
        res.data.data.access_token
      );
      callback();
    })
    .catch((err) => {
      if (err.response) {
        if (failTokens().includes(err.response.status)) {
          logout();
        }
      }
    });
}

export function logoutUser(callback) {
  axios
    .post(`${process.env.REACT_APP_API}/auth/logout`)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      if (err.response) {
        callback(err.response.data);
      }
    });
}
