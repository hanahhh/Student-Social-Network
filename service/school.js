import School from "../models/School.js";
import CONFIG_STATUS from "../config/status.json";

export const checkExistSchool = async (school_id) => {
  let isExist = Boolean;
  const checkExist = await School.exists({ _id: school_id });
  if (!checkExist) {
    isExist = false;
  } else {
    isExist = true;
  }
  return { isExist };
};

export const getAllSchool = async () => {
  const result = await School.find();
  return {
    result,
  };
};

export const createSchool = async ({ name, school_code, student_amount }) => {
  const isExist = await School.exists({ school_code });
  if (isExist) {
    return {
      status: CONFIG_STATUS.FAIL,
      message: "The school is already existed.",
    };
  } else {
    await School.create({
      name,
      school_code,
      student_amount,
    });
    return {
      status: CONFIG_STATUS.SUCCESS,
      message: "The school is created successful.",
    };
  }
};

export const getSchoolByID = async (school_id) => {
  const school = await School.findOne(
    { _id: school_id },
    "name school_code student_amount"
  );
  return {
    school,
  };
};

export const updateSchoolByID = async (form, school_id) => {
  const checkExist = await School.exists({ _id: school_id });
  if (checkExist) {
    const update_result = await School.findByIdAndUpdate(school_id, form, {
      new: true,
    });
    return {
      status: CONFIG_STATUS.SUCCESS,
      message: "Update school successful",
      result: {
        name: update_result.name,
        school_code: update_result.school_code,
        student_amount: update_result.student_amount,
      },
    };
  } else {
    return {
      status: CONFIG_STATUS.FAIL,
      message: "Update school failed, school id is not exist. Please try again",
    };
  }
};

export const deleteSchool = async (school_id) => {
  const result = await School.findByIdAndDelete(school_id);
  return {
    result,
  };
};
