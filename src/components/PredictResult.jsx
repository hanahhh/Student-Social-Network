import React from "react";
import "../css/PredictResult.scss";
const PredictResult = ({ result }) => {
  const handleSavePrediction = () => {
    console.log(result);
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
