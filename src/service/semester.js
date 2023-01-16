import { AxiosConfig } from "../configs/axiosConfig";
import { getToken } from "./auth";

export const getListSemester = (pagination, filter, sorter, callback) => {
  const axios = AxiosConfig();
  let api = "/semester";

  axios
    .get(api)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      if (err.response.status === 403) {
        getToken(() => getListSemester(pagination, filter, sorter, callback));
      } else {
        callback(err.response.data);
      }
    });
};

export const createSemester = (data, callback) => {
  const axios = AxiosConfig();
  let api = "/semester/create";

  axios
    .post(api, data)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      if (err.response.status === 403) {
        getToken(() => createSemester(data, callback));
      } else {
        callback(err.response.data);
      }
    });
};
