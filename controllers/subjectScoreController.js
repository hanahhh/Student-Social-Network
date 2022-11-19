import CONFIG_STATUS from "../config/status.json";
import { dataHandle } from "../middlewares/dataHandle.js";
import {
  createSubjectScore,
  getAllSubjectScore,
  checkExistSubjectScore,
  getSubjectScoreByID,
  updateSubjectScoreByID,
  getAllSubjectScoreByUser,
} from "../service/subjectScore.js";
import { checkExistSubject } from "../service/subject.js";
import { checkExistUser } from "../service/user.js";

export const getAllSubjectScoreController = async (req, res) => {
  const subjectScore_list = await getAllSubjectScore();
  dataHandle(subjectScore_list, req, res);
};

export const createSubjectScoreController = async (req, res, next) => {
  const { user_id, subject_id, subject_status, semester, schedule } = req.body;
  if (user_id == null || subject_id == null) {
    res.status(400).send({
      status: CONFIG_STATUS.FAIL,
      message: "Request body is invalid. Please try again.",
    });
  } else {
    const checkSubject = await checkExistSubject(subject_id);
    const checkUser = await checkExistUser(user_id);
    if (!checkSubject.isExist) {
      res.status(400).send({
        status: CONFIG_STATUS.FAIL,
        message: "Subject is not exists. Please try again.",
      });
    } else if (!checkUser.isExist) {
      res.status(400).send({
        status: CONFIG_STATUS.FAIL,
        message: "User is not exists. Please try again.",
      });
    } else {
      const result = await createSubjectScore(req.body);

      if (result.status != 0) {
        res.status(200).send({
          ...result,
        });
      } else {
        res.status(500).send({
          ...result,
        });
      }
    }
  }
};

export const getAllSubjectScoreByUserController = async (req, res) => {
  const { user_id } = req.params;
  const isExist = checkExistUser(user_id);
  if (isExist) {
    const subjectScoreList = await getAllSubjectScoreByUser(user_id);
    dataHandle(subjectScoreList, req, res);
  } else {
    res.status(400).send({
      status: CONFIG_STATUS.FAIL,
      message: "User is not exist.",
    });
  }
};

export const getSubjectScoreByIDController = async (req, res) => {
  const { subjectScore_id } = req.params;
  const isExist = checkExistSubjectScore(subjectScore_id);
  if (isExist) {
    const subjectScore = await getSubjectScoreByID(subjectScore_id);
    dataHandle(subjectScore, req, res);
  } else {
    res.status(400).send({
      status: CONFIG_STATUS.FAIL,
      message: "Subject score is not exist.",
    });
  }
};

export const updateSubjectScoreByIdController = async (req, res) => {
  const { subjectScore_id } = req.params;
  const { user_id, subject_id } = req.body;

  if (user_id == null || subject_id == null) {
    res.status(400).send({
      status: CONFIG_STATUS.FAIL,
      message: "Request body is invalid.",
    });
  } else {
    let updates = {
      ...req.body,
      updated_at: Date.now(),
    };
    const result = await updateSubjectScoreByID(updates, subjectScore_id);
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

export const deleteSubjectScoreController = async (req, res) => {
  const { subjectScore_id } = req.params;
  const { isExist } = checkExistSubjectScore(subjectScore_id);
  if (isExist) {
    const subjectScore = await deleteSubject(subjectScore_id);
    res.send({
      status: CONFIG_STATUS.SUCCESS,
      message: "Delete subject score successful.",
    });
  } else {
    res.status(400).send({
      status: CONFIG_STATUS.FAIL,
      message: "Subject score is not exist.",
    });
  }
};
