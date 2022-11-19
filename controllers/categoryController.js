import CONFIG_STATUS from "../config/status.json";
import { dataHandle } from "../middlewares/dataHandle.js";
import {
  checkExistCategory,
  createCategory,
  deleteCategory,
  getAllCategory,
  getCategoryByID,
  updateCategoryByID,
} from "../service/category.js";

export const getAllCategoryController = async (req, res) => {
  const category_list = await getAllCategory();
  dataHandle(category_list, req, res);
};

export const createCategoryController = async (req, res, next) => {
  const { name, category_code, subject_amount } = req.body;
  if (name == null || category_code == null) {
    res.status(400).send({
      status: CONFIG_STATUS.FAIL,
      message: "Request body is invalid. Please try again.",
    });
  } else {
    const result = await createCategory(req.body);
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

export const getCategoryByIDController = async (req, res) => {
  const { category_id } = req.params;
  const { isExist } = await checkExistCategory(category_id);
  if (isExist) {
    const category = await getCategoryByID(category_id);
    dataHandle(category, req, res);
  } else {
    res.status(400).send({
      status: CONFIG_STATUS.FAIL,
      message: "Category is not exist.",
    });
  }
};

export const updateCategoryByIdController = async (req, res) => {
  const { category_id } = req.params;
  const { name, category_code, subject_amount } = req.body;

  if (name == null || category_code == null) {
    res.status(400).send({
      status: CONFIG_STATUS.FAIL,
      message: "Request body is invalid.",
    });
  } else {
    let updates = {
      ...req.body,
      updated_at: Date.now(),
    };
    const result = await updateCategoryByID(updates, category_id);
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

export const deleteCategoryController = async (req, res) => {
  const { category_id } = req.params;
  const { isExist } = await checkExistCategory(category_id);
  if (isExist) {
    const category = await deleteCategory(category_id);
    res.send({
      status: CONFIG_STATUS.SUCCESS,
      message: "Delete category successful.",
    });
  } else {
    res.status(400).send({
      status: CONFIG_STATUS.FAIL,
      message: "category is not exist.",
    });
  }
};
