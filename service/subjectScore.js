import SubjectScore from "../models/SubjectScore.js";
import User from "../models/User.js";
import CONFIG_STATUS from "../config/status.json";
import Subject from "../models/Subject.js";

export const checkExistSubjectScore = async (subjectScore_id) => {
  let isExist = Boolean;
  const checkExist = await Subject.exists({ _id: subjectScore_id });
  if (!checkExist) {
    isExist = false;
  } else {
    isExist = true;
  }
  return { isExist };
};

export const getAllSubjectScore = async () => {
  const result = await SubjectScore.find();
  return {
    result,
  };
};

export const getAllSubjectScoreByUser = async (user_id) => {
  const subjectScoreList = await SubjectScore.find({ user_id: user_id });
  let subject_score_list = {
    onGoingSubject: [],
    passedSubject: [],
    failedSubject: [],
  };
  for (let i = 0; i < subjectScoreList.length; i++) {
    if (subjectScoreList[i].subject_status == 0) {
      subject_score_list.passedSubject.push(subjectScoreList[i]);
    } else if (subjectScoreList[i].subject_status == 1) {
      subject_score_list.failedSubject.push(subjectScoreList[i]);
    } else {
      subject_score_list.onGoingSubject.push(subjectScoreList[i]);
    }
  }
  return subject_score_list;
};

export const getAllSubjectScoreSemesterByUser = async (user_id, semester) => {
  const subjectScoreList = await SubjectScore.find({
    user_id: user_id,
    semester: semester,
  });
  return subjectScoreList;
};

export const createSubjectScore = async (req) => {
  const { user_id, subject_id, subject_status, semester, schedule } = req;
  const isExist = await SubjectScore.exists({ user_id, subject_id });
  if (isExist) {
    return {
      status: CONFIG_STATUS.FAIL,
      message: "The subject score is already existed.",
    };
  } else {
    await SubjectScore.create(req);
    return {
      status: CONFIG_STATUS.SUCCESS,
      message: "The subject score is created successful.",
    };
  }
};

export const getSubjectScoreByID = async (subjectScore_id) => {
  const subjectScore = await SubjectScore.findOne(
    { _id: subjectScore_id },
    "user_id subject_id midterm_score endterm_score final_score final_score_char subject_status semester schedule"
  );
  const subject_detail = await Subject.findOne({ id: subjectScore.subject_id });
  const subjectScore_detail = {
    _id: subjectScore._id,
    user_id: subjectScore.user_id,
    subject: subject_detail.name,
    midterm_score: subjectScore.midterm_score,
    endterm_score: subjectScore.endterm_score,
    final_score: subjectScore.final_score,
    final_score_char: subjectScore.final_score_char,
    subject_status: subjectScore.subject_status,
    semester: subjectScore.semester,
    schedule: subjectScore.schedule,
  };
  return {
    subjectScore_detail,
  };
};

export const updateSubjectScoreByID = async (form, subjectScore_id) => {
  const checkExist = await SubjectScore.exists({ _id: subjectScore_id });
  if (checkExist) {
    const update_result = await SubjectScore.findByIdAndUpdate(
      subjectScore_id,
      form,
      {
        new: true,
      }
    );
    return {
      status: CONFIG_STATUS.SUCCESS,
      message: "Update subject score successful",
      result: {
        update_result,
      },
    };
  } else {
    return {
      status: CONFIG_STATUS.FAIL,
      message:
        "Update subject score failed, subject score id is not exist. Please try again",
    };
  }
};

const getSubjectScoreByUser = async (user_id) => {
  let subjectScore_list = await SubjectScore.find({
    user_id,
  });
  return {
    subjectScore_list,
  };
};

export const deleteSubjectScore = async (subjectScore_id) => {
  const result = await SubjectScore.findByIdAndDelete(subjectScore_id);
  return {
    result,
  };
};
