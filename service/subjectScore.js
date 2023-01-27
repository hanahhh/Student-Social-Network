import CONFIG_STATUS from "../config/status.json";
import {
  getScoreNum,
  getSubjectScoreFinal,
  roundNumber,
} from "../config/subjectScore.js";
import { subjectStatus } from "../config/systemStatus.js";
import {
  recommendCPAScore,
  recommendGPAScore,
} from "../middlewares/recommend.js";
import Semester from "../models/Semester.js";
import Subject from "../models/Subject.js";
import SubjectScore from "../models/SubjectScore.js";
import {
  getSubjectAverage,
  getSubjectByID,
  updateSubjectByID,
} from "./subject.js";

export const checkExistSubjectScore = async (subjectScore_id) => {
  let isExist = Boolean;
  const checkExist = await SubjectScore.exists({ _id: subjectScore_id });
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
  const subjectScoreList = await SubjectScore.find({
    user_id: user_id,
  });
  let subject_score_list = [];
  for (let i = 0; i < subjectScoreList.length; i++) {
    const subject_id = subjectScoreList[i].subject_id;
    const semester_id = subjectScoreList[i].semester_id;
    const subject = await Subject.findOne({ _id: subject_id });
    const semester = await Semester.findOne({ _id: semester_id });
    const subjectScore = {
      _id: subjectScoreList[i]._id,
      user_id: subjectScoreList[i].user_id,
      subject_id: subject._id,
      subject: subject.name,
      credits: subject.credits,
      ratio: subject.ratio,
      midterm_score: subjectScoreList[i].midterm_score,
      endterm_score: subjectScoreList[i].endterm_score,
      final_score: subjectScoreList[i].final_score,
      final_score_char: subjectScoreList[i].final_score_char,
      subject_status: subjectScoreList[i].subject_status,
      semester: semester?.name,
      schedule: subjectScoreList[i].schedule,
    };

    subject_score_list.push(subjectScore);
  }
  return subject_score_list;
};

export const getAllSubjectScoreSemesterByUser = async (
  user_id,
  semester_id
) => {
  let subjectScoreList = await SubjectScore.find({
    user_id: user_id,
    semester_id: semester_id,
  });
  let subject_score_list = [];
  for (let i = 0; i < subjectScoreList.length; i++) {
    const subject_id = subjectScoreList[i].subject_id;
    const subject = await Subject.findOne({ _id: subject_id });
    const subjectScore = {
      _id: subjectScoreList[i]._id,
      user_id: subjectScoreList[i].user_id,
      subject: subject.name,
      credits: subject.credits,
      ratio: subject.ratio,
      midterm_score: subjectScoreList[i].midterm_score,
      endterm_score: subjectScoreList[i].endterm_score,
      final_score: subjectScoreList[i].final_score,
      final_score_char: subjectScoreList[i].final_score_char,
      subject_status: subjectScoreList[i].subject_status,
      schedule: subjectScoreList[i].schedule,
    };
    subject_score_list.push(subjectScore);
  }
  return subject_score_list;
};

export const getGPAScoreRecommendation = async (user_id, semester_id, gpa) => {
  const subjectScoreList = await getAllSubjectScoreSemesterByUser(
    user_id,
    semester_id
  );
  let credits = 0;
  let mutableCredits = 0;
  let immutableSubject = 0;
  let creditsList = [];
  const subjectPredictedList = [];
  for (let i = 0; i < subjectScoreList.length; i++) {
    credits += subjectScoreList[i].credits;
    if (subjectScoreList[i].subject_status == subjectStatus.ONGOING) {
      mutableCredits += subjectScoreList[i].credits;
      creditsList.push(subjectScoreList[i].credits);
      subjectPredictedList.push(subjectScoreList[i]);
    } else {
      immutableSubject +=
        subjectScoreList[i].credits *
        getScoreNum(subjectScoreList[i].final_score_char);
    }
  }

  const newGPAPredict =
    ((gpa - immutableSubject / credits) * credits) / mutableCredits;
  const immutableGPA = immutableSubject / credits;

  const result = recommendGPAScore(
    newGPAPredict,
    creditsList,
    subjectPredictedList,
    immutableGPA,
    mutableCredits,
    credits
  );
  return result;
};

export const getCPAScoreRecommendation = async (user_id, credits) => {
  const subjectScoreList = await getAllSubjectScoreByUser(user_id);

  let subjectList = [];
  for (let i = 0; i < subjectScoreList.length; i++) {
    if (subjectScoreList[i].subject_status !== subjectStatus.ONGOING)
      subjectList.push({
        w: subjectScoreList[i].credits,
        v: getScoreNum(subjectScoreList[i].final_score_char),
      });
  }
  let result = recommendCPAScore(subjectList, credits);
  const maxValue = result.maxValue;
  result = result.subset.map((sub) => {
    return subjectScoreList[sub.id];
  });
  return {
    maxValue: roundNumber(maxValue),
    subset: result,
  };
};

export const createSubjectScore = async (req) => {
  const {
    user_id,
    subject_id,
    subject_status,
    semester_id,
    schedule,
    midterm_score,
    endterm_score,
    credits,
  } = req;
  const subject = await getSubjectByID(subject_id);
  const score = getSubjectScoreFinal(
    midterm_score ? midterm_score : 0,
    endterm_score ? endterm_score : 0,
    subject.subject_detail.ratio.split("-")[0] - "0"
  );
  const isExist = await SubjectScore.exists({
    user_id,
    subject_id,
    semester_id,
  });
  if (isExist) {
    return {
      status: CONFIG_STATUS.FAIL,
      message: "The subject score is already existed.",
    };
  } else {
    await SubjectScore.create({
      ...req,
      final_score: score.final_score,
      final_score_char: score.final_score_char,
    });
    return {
      status: CONFIG_STATUS.SUCCESS,
      message: "The subject score is created successful.",
    };
  }
};

export const getSubjectScoreByID = async (subjectScore_id) => {
  const subjectScore = await SubjectScore.findOne(
    { _id: subjectScore_id },
    "user_id subject_id midterm_score endterm_score final_score final_score_char subject_status semester_id schedule"
  );
  const subject_detail = await Subject.findOne({ id: subjectScore.subject_id });
  const subjectScore_detail = {
    _id: subjectScore._id,
    user_id: subjectScore.user_id,
    subject_id: subject_detail._id,
    subject: subject_detail.name,
    credits: subject_detail.credits,
    ratio: subject_detail.ratio,
    midterm_score: subjectScore.midterm_score,
    endterm_score: subjectScore.endterm_score,
    final_score: subjectScore.final_score,
    final_score_char: subjectScore.final_score_char,
    subject_status: subjectScore.subject_status,
    semester_id: subjectScore.semester_id,
    schedule: subjectScore.schedule,
  };
  return {
    subjectScore_detail,
  };
};

export const updateSubjectScoreByID = async (form, subjectScore_id) => {
  const checkExist = await SubjectScore.exists({ _id: subjectScore_id });
  const updateSubjectScore = await getSubjectScoreByID({
    _id: subjectScore_id,
  });
  const subject = await getSubjectByID(
    updateSubjectScore?.subjectScore_detail.subject_id
  );
  const score = getSubjectScoreFinal(
    form.midterm_score
      ? form.midterm_score
      : updateSubjectScore.subjectScore_detail.midterm_score,
    form.endterm_score
      ? form.endterm_score
      : updateSubjectScore.subjectScore_detail.endterm_score,
    subject.subject_detail.ratio.split("-")[0] - "0"
  );
  if (checkExist) {
    const update_result = await SubjectScore.findByIdAndUpdate(
      subjectScore_id,
      {
        ...form,
        final_score: score.final_score,
        final_score_char: score.final_score_char,
        subject_status: score.subject_status,
      },
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

export const deleteSubjectScore = async (subjectScore_id) => {
  const result = await SubjectScore.findByIdAndDelete(subjectScore_id);
  return {
    result,
  };
};
