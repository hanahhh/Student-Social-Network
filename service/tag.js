import Tag from "../models/Tag.js";
import CONFIG_STATUS from "../config/status.json";

export const checkExistTag = async (tag_id) => {
  let isExist = Boolean;
  const checkExist = await Tag.exists({ _id: tag_id });
  if (!checkExist) {
    isExist = false;
  } else {
    isExist = true;
  }
  return { isExist };
};

export const getAllTag = async () => {
  const result = await Tag.find();
  return {
    result,
  };
};

export const createTag = async ({ name }) => {
  const isExist = await Tag.exists({ name });
  if (isExist) {
    return {
      status: CONFIG_STATUS.FAIL,
      message: "The tag is already existed.",
    };
  } else {
    await Tag.create({
      name,
    });
    return {
      status: CONFIG_STATUS.SUCCESS,
      message: "The tag is created successful.",
    };
  }
};

export const getTagByID = async (tag_id) => {
  const tag_detail = await Tag.findOne({ _id: tag_id }, "name post_amount");
  return {
    tag_detail,
  };
};

export const updateTagByID = async (form, tag_id) => {
  const checkExist = await Tag.exists({ _id: tag_id });
  if (checkExist) {
    const update_result = await Tag.findByIdAndUpdate(tag_id, form, {
      new: true,
    });
    return {
      status: CONFIG_STATUS.SUCCESS,
      message: "Update tag successful",
      result: {
        update_result,
      },
    };
  } else {
    return {
      status: CONFIG_STATUS.FAIL,
      message: "Update tag failed, tag id is not exist. Please try again",
    };
  }
};

export const deleteTag = async (tag_id) => {
  const result = await Tag.findByIdAndDelete(tag_id);
  return {
    result,
  };
};
