import { AxiosConfig } from "../configs/axiosConfig";
import { getToken } from "./auth";

export const createSubject = (data, callback) => {
  const axios = AxiosConfig();
  let api = `/subject/create`;

  axios
    .post(api, data)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      if (err.response.status === 403) {
        getToken(() => createSubject(data, callback));
      } else {
        callback(err.response.data);
      }
    });
};
