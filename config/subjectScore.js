export const getScoreChar = (score) => {
  if (score >= 9) {
    return "A+";
  } else if (score >= 8.5) {
    return "A";
  } else if (score >= 8) {
    return "B+";
  } else if (score >= 7) {
    return "B";
  } else if (score >= 6.5) {
    return "C+";
  } else if (score >= 5.5) {
    return "C";
  } else if (score >= 5) {
    return "D+";
  } else if (score >= 4) {
    return "D";
  } else return "F";
};

export const getScoreNum = (score) => {
  if (score == "A" || score == "A+") {
    return 4;
  } else if (score == "B+") {
    return 3.5;
  } else if (score == "B") {
    return 3;
  } else if (score == "C+") {
    return 2.5;
  } else if (score == "C") {
    return 2;
  } else if (score == "D+") {
    return 1.5;
  } else if (score == "D") {
    return 1;
  } else if (score == "F") {
    return 0;
  }
};

const getSubjectScoreStatus = (score) => {
  if (score == "F") return 1;
  else return 0;
};

export const getSubjectScoreFinal = (midterm_score, endterm_score, credits) => {
  const final_score = Number(
    ((midterm_score * credits + endterm_score * (10 - credits)) / 10).toFixed(1)
  );
  if (midterm_score !== 0 && endterm_score !== 0) {
    return {
      final_score: final_score,
      final_score_char: getScoreChar(final_score),
      final_score_four: getScoreNum(getScoreChar(final_score)),
      subject_status: getSubjectScoreStatus(getScoreChar(final_score)),
    };
  } else {
    return {
      final_score: 0,
      final_score_char: 0,
      final_score_char: 0,
      subject_status: getSubjectScoreStatus(getScoreChar(final_score)),
    };
  }
};

export const roundNumber = (number) => {
  return Math.floor(number * 100) / 100;
};
