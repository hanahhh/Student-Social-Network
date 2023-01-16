import { AxiosConfig } from "../configs/axiosConfig";
import { getToken } from "./auth";

export const getAllDepartmentBySchool = (school_id, callback) => {
  const axios = AxiosConfig();
  let api = `/department/school/${school_id}`;

  axios
    .get(api)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      if (err.response.status === 403) {
        getToken(() => getAllDepartmentBySchool(school_id, callback));
      } else {
        callback(err.response.data);
      }
    });
};
