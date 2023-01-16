import CONFIG_STATUS from "../config/status.json";
import { getSubjectScoreFinal } from "../config/subjectScore.js";
import { dataHandle } from "../middlewares/dataHandle.js";
import { checkExistSemester } from "../service/semester.js";
import { checkExistSubject } from "../service/subject.js";
import {
  checkExistSubjectScore,
  createSubjectScore,
  deleteSubjectScore,
  getAllSubjectScore,
  getAllSubjectScoreByUser,
  getAllSubjectScoreSemesterByUser,
  getCPAScoreRecommendation,
  getGPAScoreRecommendation,
  getSubjectScoreByID,
  updateSubjectScoreByID,
} from "../service/subjectScore.js";
import { checkExistUser, updateUserCPA } from "../service/user.js";

export const getAllSubjectScoreController = async (req, res) => {
  const subjectScore_list = await getAllSubjectScore();
  dataHandle(subjectScore_list, req, res);
};

export const createSubjectScoreController = async (req, res, next) => {
  const { user_id, subject_id, semester_id, schedule } = req.body;
  if (user_id == null || subject_id == null || semester_id == null) {
    res.status(400).send({
      status: CONFIG_STATUS.FAIL,
      message: "Request body is invalid. Please try again.",
    });
  } else {
    const checkSubject = await checkExistSubject(subject_id);
    const checkUser = await checkExistUser(user_id);
    const checkSemester = await checkExistSemester(semester_id);
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
    } else if (!checkSemester.isExist) {
      res.status(400).send({
        status: CONFIG_STATUS.FAIL,
        message: "Semester is not exists. Please try again.",
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
  const isExist = await checkExistUser(user_id);
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

export const getAllSubjectScoreSemesterByUserController = async (req, res) => {
  const { user_id, semester_id } = req.query;
  const existUser = await checkExistUser(user_id);
  const existSemester = await checkExistSemester(semester_id);
  if (existUser.isExist && existSemester.isExist) {
    const subjectScoreList = await getAllSubjectScoreSemesterByUser(
      user_id,
      semester_id
    );
    dataHandle(subjectScoreList, req, res);
  } else {
    res.status(400).send({
      status: CONFIG_STATUS.FAIL,
      message: "User is not exist.",
    });
  }
};

export const getGPAScoreRecommendationController = async (req, res) => {
  const { user_id, semester_id, gpa } = req.query;
  const isExist = await checkExistUser(user_id);
  if (isExist) {
    const recommendation = await getGPAScoreRecommendation(
      user_id,
      semester_id,
      gpa
    );
    dataHandle(recommendation, req, res);
  } else {
    res.status(400).send({
      status: CONFIG_STATUS.FAIL,
      message: "User is not exist.",
    });
  }
};

export const getCPAScoreRecommendationController = async (req, res) => {
  const { user_id, credits } = req.query;
  const isExist = await checkExistUser(user_id);
  if (isExist) {
    const recommendation = await getCPAScoreRecommendation(user_id, credits);
    dataHandle({ recommendation }, req, res);
  } else {
    res.status(400).send({
      status: CONFIG_STATUS.FAIL,
      message: "User is not exist.",
    });
  }
};

export const getSubjectScoreByIDController = async (req, res) => {
  const { subjectScore_id } = req.params;
  const isExist = await checkExistSubjectScore(subjectScore_id);
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
  const { midterm_score, endterm_score, user_id } = req.body;

  let updates = {
    ...req.body,
    updated_at: Date.now(),
  };

  const subjectScore = await getSubjectScoreByID(subjectScore_id);

  //update cpa
  let newCPACredits = {
    subject_status: subjectScore.subjectScore_detail.subject_status,
  };
  if (midterm_score && endterm_score) {
    newCPACredits = getSubjectScoreFinal(
      midterm_score,
      endterm_score,
      subjectScore.subjectScore_detail.ratio.split("-")[0] - "0"
    );
  }

  //update subject-score
  updates = {
    ...updates,
    subject_status: newCPACredits.subject_status,
    final_score: newCPACredits.final_score,
    final_score_char: newCPACredits.final_score_char,
    updated_at: Date.now(),
  };

  const result = await updateSubjectScoreByID(updates, subjectScore_id);
  await updateUserCPA(user_id);
  if (result.status == 0) {
    res.status(500).send({
      ...result,
    });
  } else {
    res.send({
      ...result,
    });
  }
};

export const deleteSubjectScoreController = async (req, res) => {
  const { subjectScore_id } = req.params;
  const { isExist } = await checkExistSubjectScore(subjectScore_id);
  if (isExist) {
    const subjectScore = await deleteSubjectScore(subjectScore_id);
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
