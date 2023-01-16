import Semester from "../models/Semester.js";
import CONFIG_STATUS from "../config/status.json";

export const checkExistSemester = async (semester_id) => {
  let isExist = Boolean;
  const checkExist = await Semester.exists({ _id: semester_id });
  if (!checkExist) {
    isExist = false;
  } else {
    isExist = true;
  }
  return { isExist };
};

export const getAllSemester = async () => {
  const result = await Semester.find();
  return {
    result,
  };
};

export const createSemester = async ({ name }) => {
  const isExist = await Semester.exists({ name });
  if (isExist) {
    return {
      status: CONFIG_STATUS.FAIL,
      message: "The semester is already existed.",
    };
  } else {
    await Semester.create({
      name,
    });
    return {
      status: CONFIG_STATUS.SUCCESS,
      message: "The Semester is created successful.",
    };
  }
};

export const updateSemesterByID = async (form, semester_id) => {
  const checkExist = await Semester.exists({ _id: semester_id });
  if (checkExist) {
    const update_result = await Semester.findByIdAndUpdate(semester_id, form, {
      new: true,
    });
    return {
      status: CONFIG_STATUS.SUCCESS,
      message: "Update semester successful",
      result: {
        update_result,
      },
    };
  } else {
    return {
      status: CONFIG_STATUS.FAIL,
      message:
        "Update semester failed, semester id is not exist. Please try again",
    };
  }
};

export const deleteSemester = async (semester_id) => {
  const result = await Semester.findByIdAndDelete(semester_id);
  return {
    result,
  };
};
