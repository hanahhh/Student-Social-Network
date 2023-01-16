import { AxiosConfig } from "../configs/axiosConfig";
import { getToken } from "./auth";

export const getAllPostByTag = (data, pagination, filter, sorter, callback) => {
  const axios = AxiosConfig();
  let api = `/post/tag`;

  axios
    .post(api, data)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      if (err.response.status === 403) {
        getToken(() =>
          getAllPostByTag(data, pagination, filter, sorter, callback)
        );
      } else {
        callback(err.response.data);
      }
    });
};
