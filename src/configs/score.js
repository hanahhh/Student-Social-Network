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

export const getScoreResult = (cpa, credits) => {
  return Math.floor((cpa / credits) * 10) / 10;
};
