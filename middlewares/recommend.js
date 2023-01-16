import { roundNumber } from "../config/subjectScore.js";

export const recommendGPAScore = (M, b, subjectList) => {
  const scores = [1, 1.5, 2, 2.5, 3, 3.5, 4];
  const scoreA = ["D", "D+", "C", "C+", "B", "B+", "A"];
  let result = [];

  const n = b.length;
  let T = 0,
    sum = 0;
  let x;

  const solution = (T, x) => {
    const subjects = x.map((score, index) => {
      return {
        subjectScore_id: subjectList[index]._id,
        score: score,
        subject: subjectList[index].subject,
      };
    });
    result.push({ subjectList: subjects.slice(), score: roundNumber(T) });
  };

  const check = (v, k) => {
    if (k < n - 1) return true;
    return (scores[v] * b[k]) / sum + T >= M;
  };

  const Try = (k) => {
    for (let v = 0; v < 7; v++) {
      if (check(v, k)) {
        x[k] = scoreA[v];
        T = T + (scores[v] * b[k]) / sum;
        if (k == n - 1) solution(T, x);
        else Try(k + 1);
        T = T - (scores[v] * b[k]) / sum;
      }
    }
  };

  const solve = () => {
    for (let i = 0; i < n; i++) {
      sum += b[i];
    }
    x = new Array(n);
    T = 0;
    Try(0);
  };
  solve();
  result.sort((a, b) => a.score - b.score);
  return result;
};

export const recommendCPAScore = (items, capacity) => {
  let sum = 0;
  items.forEach((item) => {
    sum += item.w;
  });

  items = items.map((item, index) => {
    return {
      w: item.w,
      v: ((4 - item.v) * item.w) / sum,
      id: index,
    };
  });
  var memo = [];

  //dien vao ma tran ket qua
  for (var i = 0; i < items.length; i++) {
    var row = [];
    //cung cap 1 hang ket qua
    for (var cap = 1; cap <= capacity; cap++) {
      row.push(getSolution(i, cap));
    }
    memo.push(row);
  }
  return getLast();

  //lay ket qua cuoi cung la phan tu ben phai duoi cung trong ma tran
  function getLast() {
    var lastRow = memo[memo.length - 1];
    return lastRow[lastRow.length - 1];
  }

  function getSolution(row, cap) {
    const NO_SOLUTION = { maxValue: 0, subset: [] };
    //bat dau tu cot 0
    var col = cap - 1;
    var lastItem = items[row];
    //luong hang con lai co the chua trong tui
    var remaining = cap - lastItem.w;
    var lastSolution =
      row > 0 ? memo[row - 1][col] || NO_SOLUTION : NO_SOLUTION;
    var lastSubSolution =
      row > 0 ? memo[row - 1][remaining - 1] || NO_SOLUTION : NO_SOLUTION;
    if (remaining < 0) {
      return lastSolution;
    }

    //thuc hien so sanh ket qua tim ra phuong an tot nhat
    var lastValue = lastSolution.maxValue;
    var lastSubValue = lastSubSolution.maxValue;

    var newValue = lastSubValue + lastItem.v;
    if (newValue >= lastValue) {
      var _lastSubSet = lastSubSolution.subset.slice();
      _lastSubSet.push(lastItem);
      return { maxValue: newValue, subset: _lastSubSet };
    } else {
      return lastSolution;
    }
  }
};

var items = [
  { w: 3, v: 3.5 },
  { w: 2, v: 3.5 },
  { w: 3, v: 3 },
  { w: 1.5, v: 3 },
  { w: 2, v: 1.5 },
  { w: 3, v: 2 },
  { w: 2, v: 4 },
  { w: 3, v: 2 },
  { w: 4, v: 4 },
  { w: 1, v: 4 },
  { w: 3, v: 3.5 },
  { w: 4, v: 3 },
  { w: 3, v: 2 },
  { w: 2, v: 2.5 },
  { w: 2.5, v: 3 },
];
