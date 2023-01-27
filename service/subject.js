import Subject from "../models/Subject.js";
import School from "../models/School.js";
import Department from "../models/Department.js";
import Category from "../models/Category.js";
import CONFIG_STATUS from "../config/status.json";
import SubjectScore from "../models/SubjectScore.js";
import { subjectStatus } from "../config/systemStatus.js";

export const checkExistSubject = async (subject_id) => {
  let isExist = Boolean;
  const checkExist = await Subject.exists({ _id: subject_id });
  if (!checkExist) {
    isExist = false;
  } else {
    isExist = true;
  }
  return { isExist };
};

export const getAllSubject = async () => {
  const result = await Subject.find();
  return {
    result,
  };
};

export const createSubject = async ({
  school_id,
  department_id,
  category_id,
  name,
  code,
  credits,
  ratio,
}) => {
  const isExist = await Subject.exists({ code });
  if (isExist) {
    return {
      status: CONFIG_STATUS.FAIL,
      message: "The subject is already existed.",
    };
  } else {
    await Subject.create({
      school_id,
      department_id,
      category_id,
      name,
      code,
      credits,
      ratio,
    });
    return {
      status: CONFIG_STATUS.SUCCESS,
      message: "The subject is created successful.",
    };
  }
};

export const getSubjectAverage = async (_id) => {
  let subject_id = _id;
  if (typeof _id !== "string") {
    subject_id = _id.toHexString();
  }
  const average = await SubjectScore.aggregate(
    [
      // match condition to match for specific
      {
        $match: {
          subject_id: { $eq: subject_id },
          subject_status: { $in: [subjectStatus.PASSED, subjectStatus.FAILED] },
        },
      },
      {
        $group: {
          _id: null,
          average_score: { $avg: "$final_score" },
        },
      },
    ],
    { allowDiskUse: true }
  );

  return average;
};

export const getSubjectByID = async (subject_id) => {
  const subject = await Subject.findOne(
    { _id: subject_id },
    "school_id department_id category_id name code credits ratio average_score review"
  );

  const average = await getSubjectAverage(subject_id);
  const school_detail = await School.findOne({ id: subject.school_id });
  const department_detail = await Department.findOne({
    id: subject.department_id,
  });
  const category_detail = await Category.findOne({ id: subject.category_id });

  const student_amount = await SubjectScore.countDocuments({
    subject_id: subject._id,
  });
  const student_passed_amount = await SubjectScore.countDocuments({
    subject_id: subject._id,
    subject_status: subjectStatus.PASSED,
  });

  const subject_detail = {
    _id: subject._id,
    school: school_detail.name,
    department: department_detail.name,
    category: category_detail.name,
    name: subject.name,
    code: subject.code,
    credits: subject.credits,
    ratio: subject.ratio,
    student_amount: student_amount,
    student_passed_amount: student_passed_amount,
    average_score: average[0]?.average_score,
    review: subject.review,
  };
  await updateSubjectByID(subject_detail, subject_id);

  return {
    subject_detail,
  };
};

export const updateSubjectByID = async (form, subject_id) => {
  const checkExist = await Subject.exists({ _id: subject_id });
  if (checkExist) {
    const update_result = await Subject.findByIdAndUpdate(subject_id, form, {
      new: true,
    });
    return {
      status: CONFIG_STATUS.SUCCESS,
      message: "Update subject successful",
      result: {
        update_result,
      },
    };
  } else {
    return {
      status: CONFIG_STATUS.FAIL,
      message:
        "Update subject failed, subject id is not exist. Please try again",
    };
  }
};

export const deleteSubject = async (subject_id) => {
  const result = await Subject.findByIdAndDelete(subject_id);
  return {
    result,
  };
};

export const getTopSubject = async () => {
  const result = await Subject.find().sort({ average_score: -1 }).limit(5);
  return {
    result,
  };
};
