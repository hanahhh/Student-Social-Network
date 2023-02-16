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

export const getSubjectByID = (subject_id, callback) => {
  const axios = AxiosConfig();
  let api = `/subject/detail/${subject_id}`;

  axios
    .get(api)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      if (err.response.status === 403) {
        getToken(() => (getSubjectByID = (subject_id, callback)));
      } else {
        callback(err.response.data);
      }
    });
};

export const addReviewSubject = (subject_id, data, callback) => {
  const axios = AxiosConfig();
  let api = `/subject/comments/${subject_id}`;

  axios
    .put(api, data)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      if (err.response.status === 403) {
        getToken(() => (addReviewSubject = (subject_id, data, callback)));
      } else {
        callback(err.response.data);
      }
    });
};