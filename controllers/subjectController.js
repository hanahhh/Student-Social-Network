import CONFIG_STATUS from "../config/status.json";
import School from "../models/School.js";
import { dataHandle } from "../middlewares/dataHandle.js";
import {
  checkExistSubject,
  createSubject,
  deleteSubject,
  getAllSubject,
  getSubjectByID,
  getTopSubject,
  updateSubjectByID,
} from "../service/subject.js";
import { checkExistSchool } from "../service/school.js";
import { checkExistDepartment } from "../service/department.js";
import { checkExistUser, getUserByID } from "../service/user.js";

export const getAllSubjectController = async (req, res) => {
  const subject_list = await getAllSubject();
  dataHandle(subject_list, req, res);
};

export const createSubjectController = async (req, res, next) => {
  const {
    school_id,
    department_id,
    category_id,
    name,
    code,
    credits,
    ratio,
    user_id,
  } = req.body;
  if (
    (school_id == null || department_id == null,
    name == null ||
      code == null ||
      credits == null ||
      ratio == null ||
      user_id == null)
  ) {
    res.status(400).send({
      status: CONFIG_STATUS.FAIL,
      message: "Request body is invalid. Please try again.",
    });
  } else {
    const checkSchool = await checkExistSchool(school_id);
    const checkDepartment = await checkExistDepartment(department_id);
    const checkUser = await checkExistUser(user_id);
    if (!checkSchool.isExist) {
      res.status(400).send({
        status: CONFIG_STATUS.FAIL,
        message: "School is not exist.",
      });
    } else if (!checkDepartment.isExist) {
      res.status(400).send({
        status: CONFIG_STATUS.FAIL,
        message: "Department is not exist.",
      });
    } else if (!checkUser.isExist) {
      res.status(400).send({
        status: CONFIG_STATUS.FAIL,
        message: "User is not exist.",
      });
    } else {
      const user = await getUserByID(user_id);
      if (user.user.school_id != school_id) {
        res.status(400).send({
          status: CONFIG_STATUS.FAIL,
          message: "Permission denied. You must be a student of this school !",
        });
      } else {
        const result = await createSubject(req.body);
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
  }
};

export const getSubjectByIDController = async (req, res) => {
  const { subject_id } = req.params;
  const { isExist } = await checkExistSubject(subject_id);
  if (isExist) {
    const subject = await getSubjectByID(subject_id);
    dataHandle(subject, req, res);
  } else {
    res.status(400).send({
      status: CONFIG_STATUS.FAIL,
      message: "Subject is not exist.",
    });
  }
};

export const updateSubjectByIdController = async (req, res) => {
  const { subject_id } = req.params;
  const { school_id, department_id, category_id, name, code, credits, ratio } =
    req.body;

  if (
    (school_id == null || department_id == null,
    name == null || code == null || credits == null || ratio == null)
  ) {
    res.status(400).send({
      status: CONFIG_STATUS.FAIL,
      message: "Request body is invalid.",
    });
  } else {
    let updates = {
      ...req.body,
      updated_at: Date.now(),
    };
    const result = await updateSubjectByID(updates, subject_id);
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

export const addCommentSubjectController = async (req, res) => {
  const { subject_id } = req.params;

  const comments = req.body;
  const { isExist } = await checkExistSubject(subject_id);
  if (isExist) {
    const subject = await getSubjectByID(subject_id);
    const updates = {
      ...subject.subject_detail,
      review: [...subject?.subject_detail.review, ...comments],
    };

    const result = await updateSubjectByID(updates, subject_id);
    if (result.status == 0) {
      res.status(500).send({
        ...result,
      });
    } else {
      res.send({
        ...result,
      });
    }
  } else {
    res.status(400).send({
      status: CONFIG_STATUS.FAIL,
      message: "Subject is not exist.",
    });
  }
};

export const deleteSubjectController = async (req, res) => {
  const { subject_id } = req.params;
  const { isExist } = await checkExistSubject(subject_id);
  if (isExist) {
    const subject = await deleteSubject(subject_id);
    res.send({
      status: CONFIG_STATUS.SUCCESS,
      message: "Delete subject successful.",
    });
  } else {
    res.status(400).send({
      status: CONFIG_STATUS.FAIL,
      message: "Subject is not exist.",
    });
  }
};

export const getTopSubjectController = async (req, res) => {
  const subject_list = await getTopSubject();
  dataHandle(subject_list, req, res);
};
