import CONFIG_STATUS from "../config/status.json";
import { dataHandle } from "../middlewares/dataHandle.js";
import {
  checkExistPredictResult,
  createPredictResult,
  deletePredictResult,
  getAllPredictResult,
  getAllPredictResultSemesterByUser,
  updatePredictScoreByID,
} from "../service/predictResult.js";
import { checkExistSubjectScore } from "../service/subjectScore.js";
import { checkExistUser } from "../service/user.js";
import { checkExistSemester } from "../service/semester.js";

export const getAllPredictResultController = async (req, res) => {
  const predictResult_list = await getAllPredictResult();
  dataHandle(predictResult_list, req, res);
};

export const getAllPredictResultSemesterByUserController = async (req, res) => {
  const { user_id, semester_id } = req.query;
  const existUser = await checkExistUser(user_id);
  const existSemester = await checkExistSemester(semester_id);
  if (existUser.isExist && existSemester.isExist) {
    const predictResult_list = await getAllPredictResultSemesterByUser(
      user_id,
      semester_id
    );
    dataHandle(predictResult_list, req, res);
  } else {
    res.status(400).send({
      status: CONFIG_STATUS.FAIL,
      message: "User or semester are not existed. Please try again.",
    });
  }
};

export const createPredictResultController = async (req, res, next) => {
  const { user_id, semester_id, predictResult } = req.body;
  if (user_id == null || semester_id == null) {
    res.status(400).send({
      status: CONFIG_STATUS.FAIL,
      message: "Request body is invalid. Please try again.",
    });
  } else {
    const isExistUser = await checkExistUser(user_id);
    const isExistSemester = await checkExistSemester(semester_id);
    if (isExistUser.isExist && isExistSemester.isExist) {
      const result = await createPredictResult(req.body);
      if (result.status != 0) {
        res.status(200).send({
          ...result,
        });
      } else {
        res.status(500).send({
          ...result,
        });
      }
    } else {
      res.status(400).send({
        status: CONFIG_STATUS.FAIL,
        message: "User or semester are not existed. Please try again.",
      });
    }
  }
};

export const updatePredictResultByIdController = async (req, res) => {
  const { predictResult_id } = req.params;
  if (predictResult_id == null) {
    res.status(400).send({
      status: CONFIG_STATUS.FAIL,
      message: "Request body is invalid.",
    });
  } else {
    let updates = {
      ...req.body,
      updated_at: Date.now(),
    };
    const result = await updatePredictScoreByID(updates, predictResult_id);
    if (result.status == 0) {
      res.status(500).send({
        ...result,
      });
    } else {
      res.send({
        ...result,
      });
    }
  }
};

export const deletePredictResultController = async (req, res) => {
  const { predictResult_id } = req.params;
  const { isExist } = await checkExistPredictResult(predictResult_id);
  if (isExist) {
    const predictResult = await deletePredictResult(predictResult_id);
    res.send({
      status: CONFIG_STATUS.SUCCESS,
      message: "Predict result was deleted successfully.",
    });
  } else {
    res.status(400).send({
      status: CONFIG_STATUS.FAIL,
      message: "Predict result is not exist.",
    });
  }
};
