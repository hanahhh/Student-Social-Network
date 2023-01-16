import Department from "../models/Department.js";
import School from "../models/School.js";
import CONFIG_STATUS from "../config/status.json";

export const checkExistDepartment = async (department_id) => {
  let isExist = Boolean;
  const checkExist = await Department.exists({ _id: department_id });
  if (!checkExist) {
    isExist = false;
  } else {
    isExist = true;
  }
  return { isExist };
};

export const getAllDepartment = async () => {
  const result = await Department.find();
  let department_list = [];
  for (let i = 0; i < result.length; i++) {
    const school_detail = await School.findOne({ id: result[i].school_id });
    department_list.push({
      _id: result[i]._id,
      name: result[i].name,
      school_id: result[i].school_id,
      global_name: result[i].global_name,
      sort_name: result[i].sort_name,
      student_amount: result[i].student_amount,
      school_name: school_detail.name,
      school_code: school_detail.school_code,
    });
  }
  return {
    department_list,
  };
};

export const getAllDepartmentBySchool = async (school_id) => {
  const result = await Department.find(
    { school_id },
    "_id name school_id global_name sort_name student_amount"
  );
  return {
    result,
  };
};

export const createDepartment = async ({
  name,
  school_id,
  global_name,
  sort_name,
  student_amount,
}) => {
  const isExist = await Department.exists({ school_id, name });
  if (isExist) {
    return {
      status: CONFIG_STATUS.FAIL,
      message: "The department is already existed.",
    };
  } else {
    await Department.create({
      name,
      school_id,
      global_name,
      sort_name,
      student_amount,
    });
    return {
      status: CONFIG_STATUS.SUCCESS,
      message: "The department is created successful.",
    };
  }
};

export const getDepartmentByID = async (department_id) => {
  const department = await Department.findOne(
    { _id: department_id },
    "name school_id global_name sort_name student_amount"
  );
  const school_detail = await School.findOne({ id: department.school_id });
  const department_detail = {
    _id: department._id,
    name: department.name,
    school_id: department.school_id,
    global_name: department?.global_name,
    sort_name: department?.sort_name,
    student_amount: department.student_amount,
    school_name: school_detail.name,
    school_code: school_detail.school_code,
  };
  return {
    department_detail,
  };
};

export const updateDepartmentByID = async (form, department_id) => {
  const checkExist = await Department.exists({ _id: department_id });
  if (checkExist) {
    const update_result = await Department.findByIdAndUpdate(
      department_id,
      form,
      {
        new: true,
      }
    );
    return {
      status: CONFIG_STATUS.SUCCESS,
      message: "Update department successful",
      result: {
        name: update_result.name,
        school_id: update_result.school_id,
        global_name: update_result.global_name,
        sort_name: update_result.sort_name,
        student_amount: update_result.student_amount,
      },
    };
  } else {
    return {
      status: CONFIG_STATUS.FAIL,
      message:
        "Update department failed, department id is not exist. Please try again",
    };
  }
};

export const deleteDepartment = async (department_id) => {
  const result = await Department.findByIdAndDelete(department_id);
  return {
    result,
  };
};
