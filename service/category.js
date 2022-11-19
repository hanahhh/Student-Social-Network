import Category from "../models/Category.js";
import CONFIG_STATUS from "../config/status.json";

export const checkExistCategory = async (category_id) => {
  let isExist = Boolean;
  const checkExist = await Category.exists({ _id: category_id });
  if (!checkExist) {
    isExist = false;
  } else {
    isExist = true;
  }
  return { isExist };
};

export const getAllCategory = async () => {
  const result = await Category.find();
  return {
    result,
  };
};

export const createCategory = async ({
  name,
  category_code,
  subject_amount,
}) => {
  const isExist = await Category.exists({ category_code });
  if (isExist) {
    return {
      status: CONFIG_STATUS.FAIL,
      message: "The category is already existed.",
    };
  } else {
    await Category.create({
      name,
      category_code,
      subject_amount,
    });
    return {
      status: CONFIG_STATUS.SUCCESS,
      message: "The category is created successful.",
    };
  }
};

export const getCategoryByID = async (category_id) => {
  const category = await Category.findOne(
    { _id: category_id },
    "name category_code category_codet"
  );
  return {
    category,
  };
};

export const updateCategoryByID = async (form, category_id) => {
  const checkExist = await Category.exists({ _id: category_id });
  if (checkExist) {
    const update_result = await Category.findByIdAndUpdate(category_id, form, {
      new: true,
    });
    return {
      status: CONFIG_STATUS.SUCCESS,
      message: "Update category successful",
      result: {
        update_result,
      },
    };
  } else {
    return {
      status: CONFIG_STATUS.FAIL,
      message:
        "Update category failed, category id is not exist. Please try again",
    };
  }
};

export const deleteCategory = async (category_id) => {
  const result = await Category.findByIdAndDelete(category_id);
  return {
    result,
  };
};
