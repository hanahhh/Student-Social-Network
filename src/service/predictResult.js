import { AxiosConfig } from "../configs/axiosConfig";
import { getToken } from "./auth";

export const createPredictResult = (data, callback) => {
  const axios = AxiosConfig();
  let api = "/predictResult/create";

  axios
    .post(api, data)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      if (err.response.status === 403) {
        getToken(() => createPredictResult(data, callback));
      } else {
        callback(err.response.data);
      }
    });
};

export const getPredictResultSemesterByUser = (
  user_id,
  semester_id,
  callback
) => {
  const axios = AxiosConfig();
  let api = `/predictResult/semesters?user_id=${user_id}&semester_id=${semester_id}`;

  axios
    .get(api)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      if (err.response.status === 403) {
        getToken(
          () =>
            (getPredictResultSemesterByUser = (user_id, semester_id, callback))
        );
      } else {
        callback(err.response.data);
      }
    });
};

export const deletePredictResult = (id, callback) => {
  const axios = AxiosConfig();
  let api = `/predictResult/${id}`;

  axios
    .delete(api)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      if (err.response.status === 403) {
        getToken(() => (deletePredictResult = (id, callback)));
      } else {
        callback(err.response.data);
      }
    });
};
