import { AxiosConfig } from "../configs/axiosConfig";
import { getToken } from "./auth";

export const getListPost = (pagination, filter, sorter, callback) => {
  const axios = AxiosConfig();
  let api = "/post";

  axios
    .get(api)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      if (err.response.status === 403) {
        getToken(() => getListPost(pagination, filter, sorter, callback));
      } else {
        callback(err.response.data);
      }
    });
};

export const getMyPost = (user_id, pagination, filter, sorter, callback) => {
  const axios = AxiosConfig();
  let api = `/post/user/${user_id}`;

  axios
    .get(api)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      if (err.response.status === 403) {
        getToken(() =>
          getMyPost(user_id, pagination, filter, sorter, callback)
        );
      } else {
        callback(err.response.data);
      }
    });
};

export const createPost = (data, callback) => {
  const axios = AxiosConfig();
  let api = `/post/create`;

  axios
    .post(api, data)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      if (err.response.status === 403) {
        getToken(() => createPost(data, callback));
      } else {
        callback(err.response.data);
      }
    });
};

export const uploadImagePost = (image, callback) => {
  const axios = AxiosConfig();
  let api = `/post/upload`;
  axios
    .post(api, image)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      if (err.response.status === 403) {
        getToken(() => uploadImagePost(image, callback));
      } else {
        callback(err.response.data);
      }
    });
};
