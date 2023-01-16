import CONFIG_STATUS from "../config/status.json";
import { dataHandle } from "../middlewares/dataHandle.js";
import {
  checkExistSemester,
  createSemester,
  deleteSemester,
  getAllSemester,
  updateSemesterByID,
} from "../service/semester.js";

export const getAllSemesterController = async (req, res) => {
  const semester_list = await getAllSemester();
  dataHandle(semester_list, req, res);
};

export const createSemesterController = async (req, res, next) => {
  const { name } = req.body;
  if (name == null) {
    res.status(400).send({
      status: CONFIG_STATUS.FAIL,
      message: "Request body is invalid. Please try again.",
    });
  } else {
    const result = await createSemester(req.body);
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

export const updateSemesterByIdController = async (req, res) => {
  const { semester_id } = req.params;
  if (semester_id == null) {
    res.status(400).send({
      status: CONFIG_STATUS.FAIL,
      message: "Request body is invalid.",
    });
  } else {
    let updates = {
      ...req.body,
      updated_at: Date.now(),
    };
    const result = await updateSemesterByID(updates, semester_id);
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

export const deleteSemesterController = async (req, res) => {
  const { semester_id } = req.params;
  const { isExist } = await checkExistSemester(semester_id);
  if (isExist) {
    const tag = await deleteSemester(semester_id);
    res.send({
      status: CONFIG_STATUS.SUCCESS,
      message: "Tag semester successful.",
    });
  } else {
    res.status(400).send({
      status: CONFIG_STATUS.FAIL,
      message: "Semester is not exist.",
    });
  }
};
