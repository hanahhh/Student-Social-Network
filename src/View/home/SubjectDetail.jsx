import { Input, message } from "antd";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { addReviewSubject, getSubjectByID } from "../../service/subject";
import { SendOutlined } from "@ant-design/icons";
import "../../css/subjectDetail.scss";

const SubjectDetail = () => {
  const subject_id = useLocation().pathname.split("/")[2];
  const [subject, setSubject] = useState({});
  const [review, setReview] = useState("");
  let reviews = [];

  useEffect(() => {
    getSubjectByID(subject_id, (res) => {
      if (res.status === 1) {
        setSubject(res.data.subject_detail);
      } else {
        message.error(res.message);
      }
    });
  }, []);
  const handleReviewSubject = () => {
    reviews.push(review);
    addReviewSubject(subject_id, reviews, (res) => {
      if (res.status === 1) {
        message.success(res.message);
        window.location.reload();
      } else {
        message.error(res.message);
      }
    });
  };
  return (
    <div className="subject-detail">
      <div className="content">
        <div className="title">
          <p>
            {subject.name} - {subject.code}
          </p>
        </div>
        <div className="info">
          <p>School: {subject.school}</p>
          <p>Department: {subject.department}</p>
          <p>Category: {subject.category}</p>
          <p>Credits: {subject.credits}</p>
          <p>Ratio: {subject.ratio}</p>
          <div className="statistic">
            <p>Student ammount: {subject.student_amount}</p>
            <p>
              Passed: <span>{subject.student_passed_amount}</span>
            </p>
          </div>
        </div>
        <div className="comments">
          <p className="title">Comments</p>
          <div className="list-comment">
            {subject?.review?.map((rev, index) => {
              return (
                <div className="comment">
                  <p>{rev}</p>
                </div>
              );
            })}
          </div>
          <div className="add-comment">
            <Input
              type="text"
              name=""
              id=""
              placeholder="Comment here"
              onChange={(e) => setReview(e.target.value)}
              style={{ width: "80%", marginRight: "20px" }}
            />
            <SendOutlined
              onClick={handleReviewSubject}
              style={{ cursor: "pointer", fontSize: "20px" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubjectDetail;
