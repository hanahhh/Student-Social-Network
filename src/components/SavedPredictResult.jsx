import { message } from "antd";
import React from "react";
import { deletePredictResult } from "../service/predictResult";

const SavedPredictResult = ({ savedResult }) => {
  console.log(savedResult);
  const result = savedResult.predictResult;
  const handleDeletePrediction = () => {
    deletePredictResult(savedResult._id, (res) => {
      if (res.status === 1) {
        window.location.reload();
        message.success(res.message);
      } else {
        message.error(res.message);
      }
    });
  };
  return (
    <div>
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
          <button onClick={handleDeletePrediction}>
            Delete predict result
          </button>
        </div>
      </div>
    </div>
  );
};

export default SavedPredictResult;
