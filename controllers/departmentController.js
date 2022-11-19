import CONFIG_STATUS from "../config/status.json";
import { dataHandle } from "../middlewares/dataHandle.js";
import {
  createDepartment,
  getAllDepartment,
  checkExistDepartment,
  getDepartmentByID,
  deleteDepartment,
  updateDepartmentByID,
} from "../service/department.js";
import { checkExistSchool } from "../service/school.js";

export const getAllDepartmentController = async (req, res) => {
  const department_list = await getAllDepartment();
  dataHandle(department_list, req, res);
};

export const createDepartmentController = async (req, res, next) => {
  const { name, school_id, global_name, sort_name, student_amount } = req.body;
  if (name == null || school_id == null) {
    res.status(400).send({
      status: CONFIG_STATUS.FAIL,
      message: "Request body is invalid. Please try again.",
    });
  } else {
    const checkSchool = await checkExistSchool(school_id);
    if (!checkSchool.isExist) {
      res.send({
        status: CONFIG_STATUS.FAIL,
        message: "School is not exist.",
      });
    } else {
      const result = await createDepartment(req.body);
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

export const getDepartmentByIDController = async (req, res) => {
  const { department_id } = req.params;
  const { isExist } = await checkExistDepartment(department_id);
  if (isExist) {
    const department = await getDepartmentByID(department_id);
    dataHandle(department, req, res);
  } else {
    res.status(400).send({
      status: CONFIG_STATUS.FAIL,
      message: "Department is not exist.",
    });
  }
};

export const updateDepartmentByIdController = async (req, res) => {
  const { department_id } = req.params;
  const { name, school_id, global_name, sort_name, student_amount } = req.body;

  if (name == null || school_id == null) {
    res.status(400).send({
      status: CONFIG_STATUS.FAIL,
      message: "Request body is invalid.",
    });
  } else {
    let updates = {
      ...req.body,
      updated_at: Date.now(),
    };
    const result = await updateDepartmentByID(updates, department_id);
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

export const deleteDepartmentController = async (req, res) => {
  const { department_id } = req.params;
  const { isExist } = await checkExistDepartment(department_id);
  if (isExist) {
    const department = await deleteDepartment(department_id);
    res.send({
      status: CONFIG_STATUS.SUCCESS,
      message: "Delete department successful.",
    });
  } else {
    res.status(400).send({
      status: CONFIG_STATUS.FAIL,
      message: "Department is not exist.",
    });
  }
};
