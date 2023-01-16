import axios from "axios";
import { AxiosConfig } from "../configs/axiosConfig";
import { getToken } from "./auth";

export function register(data, callback) {
  axios
    .post(`${process.env.REACT_APP_API}/auth/register`, data)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      if (err.response) {
        callback(err.response.data);
      }
    });
}

export const storeUserData = (data) => {
  const user = {
    name: data.name,
    role: data.role,
    email: data.phone,
    avatar: data.avatar,
    educationStatus: data.educationStatus,
    _id: data._id,
    cpa: data.cpa,
  };

  localStorage.setItem(
    `${process.env.REACT_APP_PREFIX_LOCAL}_user`,
    JSON.stringify(user)
  );
};

export function getUserByID(user_id, callback) {
  const axios = AxiosConfig();

  axios
    .get(`/user/detail/${user_id}`)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      if (err.response) {
        if (err.response.status === 403) {
          getToken(() => getUserByID(user_id, callback));
        } else {
          callback(err.response.data);
        }
      }
    });
}

export function getUserInfo(callback) {
  const axios = AxiosConfig();

  axios
    .get(`/user/info`)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      if (err.response) {
        if (err.response.status === 403) {
          getToken(() => getUserInfo(callback));
        } else {
          callback(err.response.data);
        }
      }
    });
}

export function updateUserByID(user_id, data, callback) {
  const axios = AxiosConfig();
  console.log(data);
  axios
    .put(`/user/detail/${user_id}`, data)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      if (err.response) {
        if (err.response.status === 403) {
          getToken(() => updateUserByID(user_id, callback));
        } else {
          callback(err.response.data);
        }
      }
    });
}
