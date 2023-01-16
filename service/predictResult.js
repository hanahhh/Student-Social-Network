import PredictResult from "../models/PredictResult.js";
import CONFIG_STATUS from "../config/status.json";

export const checkExistPredictResult = async (predictResult_id) => {
  let isExist = Boolean;
  const checkExist = await PredictResult.exists({ _id: predictResult_id });
  if (!checkExist) {
    isExist = false;
  } else {
    isExist = true;
  }
  return { isExist };
};

export const getAllPredictResult = async () => {
  const result = await PredictResult.find();
  return {
    result,
  };
};

export const getAllPredictResultSemesterByUser = async (
  user_id,
  semester_id
) => {
  let predictResultList = await PredictResult.find({
    user_id: user_id,
    semester_id: semester_id,
  });
  return predictResultList;
};

export const createPredictResult = async ({
  user_id,
  semester_id,
  predictResult,
}) => {
  await PredictResult.create({
    user_id,
    semester_id,
    predictResult,
  });
  return {
    status: CONFIG_STATUS.SUCCESS,
    message: "The predict result is created successful.",
  };
};

export const updatePredictScoreByID = async (form, predictResult_id) => {
  const checkExist = await PredictResult.exists({ _id: predictResult_id });
  if (checkExist) {
    const update_result = await PredictResult.findByIdAndUpdate(
      predictResult_id,
      form,
      {
        new: true,
      }
    );
    return {
      status: CONFIG_STATUS.SUCCESS,
      message: "Update predict result successful",
      result: {
        update_result,
      },
    };
  } else {
    return {
      status: CONFIG_STATUS.FAIL,
      message:
        "Update predict result failed, predict result id is not exist. Please try again",
    };
  }
};

export const deletePredictResult = async (predictResult_id) => {
  const result = await PredictResult.findByIdAndDelete(predictResult_id);
  return {
    result,
  };
};
