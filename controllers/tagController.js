import CONFIG_STATUS from "../config/status.json";
import { dataHandle } from "../middlewares/dataHandle.js";
import {
  checkExistTag,
  createTag,
  deleteTag,
  getAllTag,
  getTagByID,
  updateTagByID,
} from "../service/tag.js";

export const getAllTagController = async (req, res) => {
  const tag_list = await getAllTag();
  dataHandle(tag_list, req, res);
};

export const createTagController = async (req, res, next) => {
  const { name } = req.body;
  if (name == null) {
    res.status(400).send({
      status: CONFIG_STATUS.FAIL,
      message: "Request body is invalid. Please try again.",
    });
  } else {
    const result = await createTag(req.body);
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

export const getTagByIDController = async (req, res) => {
  const { tag_id } = req.params;
  const { isExist } = await checkExistTag(tag_id);
  if (isExist) {
    const tag = await getTagByID(tag_id);
    dataHandle(tag, req, res);
  } else {
    res.status(400).send({
      status: CONFIG_STATUS.FAIL,
      message: "Tag is not exist.",
    });
  }
};

export const updateTagByIdController = async (req, res) => {
  const { tag_id } = req.params;
  if (tag_id == null) {
    res.status(400).send({
      status: CONFIG_STATUS.FAIL,
      message: "Request body is invalid.",
    });
  } else {
    let updates = {
      ...req.body,
      updated_at: Date.now(),
    };
    const result = await updateTagByID(updates, tag_id);
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

export const deleteTagController = async (req, res) => {
  const { tag_id } = req.params;
  const { isExist } = await checkExistTag(tag_id);
  if (isExist) {
    const tag = await deleteTag(tag_id);
    res.send({
      status: CONFIG_STATUS.SUCCESS,
      message: "Tag category successful.",
    });
  } else {
    res.status(400).send({
      status: CONFIG_STATUS.FAIL,
      message: "Tag is not exist.",
    });
  }
};
