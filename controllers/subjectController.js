import CONFIG_STATUS from "../config/status.json";
import School from "../models/School.js";
import { dataHandle } from "../middlewares/dataHandle.js";
import {
  checkExistSubject,
  createSubject,
  deleteSubject,
  getAllSubject,
  getSubjectByID,
  updateSubjectByID,
} from "../service/subject.js";
import { checkExistSchool } from "../service/school.js";
import { checkExistDepartment } from "../service/department.js";

export const getAllSubjectController = async (req, res) => {
  const subject_list = await getAllSubject();
  dataHandle(subject_list, req, res);
};

export const createSubjectController = async (req, res, next) => {
  const { school_id, department_id, category_id, name, code, credits, ratio } =
    req.body;
  if (
    (school_id == null || department_id == null,
    name == null || code == null || credits == null || ratio == null)
  ) {
    res.status(400).send({
      status: CONFIG_STATUS.FAIL,
      message: "Request body is invalid. Please try again.",
    });
  } else {
    const checkSchool = await checkExistSchool(school_id);
    const checkDepartment = await checkExistDepartment(department_id);
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
