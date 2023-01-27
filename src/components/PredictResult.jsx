import { message } from "antd";
import React from "react";
import "../css/PredictResult.scss";
import { createPredictResult } from "../service/predictResult";
const PredictResult = ({ result, user_id, semester_id }) => {
  const handleSavePrediction = () => {
    const data = {
      predictResult: result,
      user_id: user_id,
      semester_id: semester_id,
    };
    createPredictResult(data, (res) => {
      if (res.status === 1) {
        window.location.reload();
        message.success(res.message);
      } else {
        message.error(res.message);
      }
    });
  };
  return (
    <div className="predict">
      <p className="score">GPA: {result.score}</p>
      {result.subjectList.map((subject, index) => {
        return (
          <div key={index} className="body">
            <p>
              <span>{subject.subject}</span>
              <span className="score"> - {subject.score}</span>
            </p>
          </div>
        );
      })}
      <div className="button">
        <button onClick={handleSavePrediction}>Save predict result</button>
      </div>
    </div>
  );
};

export default PredictResult;
