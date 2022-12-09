import School from "../models/School.js";
import CONFIG_STATUS from "../config/status.json";
import { dataHandle } from "../middlewares/dataHandle.js";
import {
  createSchool,
  getAllSchool,
  checkExistSchool,
  getSchoolByID,
  updateSchoolByID,
  deleteSchool,
} from "../service/school.js";

export const getAllSchoolController = async (req, res) => {
  const school_list = await getAllSchool();
  dataHandle(school_list, req, res);
};

export const createSchoolController = async (req, res, next) => {
  const { name, school_code, student_amount } = req.body;
  if (name == null || school_code == null) {
    res.status(400).send({
      status: CONFIG_STATUS.FAIL,
      message: "Request body is invalid. Please try again.",
    });
  } else {
    const result = await createSchool(req.body);
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
};

export const getSchoolByIDController = async (req, res) => {
  const { school_id } = req.params;
  const { isExist } = await checkExistSchool(school_id);
  if (isExist) {
    const school = await getSchoolByID(school_id);
    dataHandle(school, req, res);
  } else {
    res.status(400).send({
      status: CONFIG_STATUS.FAIL,
      message: "School is not exist.",
    });
  }
};

export const updateSchoolByIdController = async (req, res) => {
  const { school_id } = req.params;
  const { name, school_code, student_amount } = req.body;

  if (school_code == null) {
    res.status(400).send({
      status: CONFIG_STATUS.FAIL,
      message: "Request body is invalid.",
    });
  } else {
    let updates = {
      ...req.body,
      updated_at: Date.now(),
    };
    const result = await updateSchoolByID(updates, school_id);
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

export const deleteSchoolController = async (req, res) => {
  const { school_id } = req.params;
  const { isExist } = await checkExistSchool(school_id);
  if (isExist) {
    const school = await deleteSchool(school_id);
    res.send({
      status: CONFIG_STATUS.SUCCESS,
      message: "Delete school successful.",
    });
  } else {
    res.status(400).send({
      status: CONFIG_STATUS.FAIL,
      message: "School is not exist.",
    });
  }
};
