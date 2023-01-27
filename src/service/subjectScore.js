import { AxiosConfig } from "../configs/axiosConfig";
import { getToken } from "./auth";

export const getAllSubjectScoreByUserID = (user_id, callback) => {
  const axios = AxiosConfig();
  let api = `/subjectScore/user/${user_id}`;

  axios
    .get(api)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      if (err.response.status === 403) {
        getToken(() => getAllSubjectScoreByUserID(user_id, callback));
      } else {
        callback(err.response.data);
      }
    });
};

export const getAllSubjectScoreSemesterByUser = (
  user_id,
  semester_id,
  callback
) => {
  const axios = AxiosConfig();
  let api = `/subjectScore/semesters?user_id=${user_id}&semester_id=${semester_id}`;

  axios
    .get(api)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      if (err.response.status === 403) {
        getToken(() =>
          getAllSubjectScoreSemesterByUser(user_id, semester_id, callback)
        );
      } else {
        callback(err.response.data);
      }
    });
};

export const createSubjectScore = (data, callback) => {
  const axios = AxiosConfig();
  let api = `/subjectScore/create`;

  axios
    .post(api, data)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      if (err.response.status === 403) {
        getToken(() => getAllSubjectScoreSemesterByUser(data, callback));
      } else {
        callback(err.response.data);
      }
    });
};

export const updateSubjectScore = (id, data, callback) => {
  const axios = AxiosConfig();
  let api = `/subjectScore/detail/${id}`;

  axios
    .put(api, data)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      if (err.response.status === 403) {
        getToken(() => updateSubjectScore(data, callback));
      } else {
        callback(err.response.data);
      }
    });
};

export const getGPARecommendation = (user_id, semester, gpa, callback) => {
  const axios = AxiosConfig();
  let api = `/subjectScore/recommend/gpa?user_id=${user_id}&semester_id=${semester}&gpa=${gpa}`;

  axios
    .get(api)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      if (err.response.status === 403) {
        getToken(
          () => (getGPARecommendation = (user_id, semester, gpa, callback))
        );
      } else {
        callback(err.response.data);
      }
    });
};

export const getCPARecommendation = (user_id, credits, callback) => {
  const axios = AxiosConfig();
  let api = `/subjectScore/recommend/cpa?user_id=${user_id}&credits=${credits}`;

  axios
    .get(api)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      if (err.response.status === 403) {
        getToken(() => (getCPARecommendation = (user_id, credits, callback)));
      } else {
        callback(err.response.data);
      }
    });
};

export const deleteSubjectScore = (id, callback) => {
  const axios = AxiosConfig();
  let api = `/subjectScore/${id}`;

  axios
    .delete(api)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      if (err.response.status === 403) {
        getToken(() => (deleteSubjectScore = (id, callback)));
      } else {
        callback(err.response.data);
      }
    });
};
