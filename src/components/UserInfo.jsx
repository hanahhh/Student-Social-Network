import React, { useState, useEffect } from "react";
import { Table, message } from "antd";
import { getAllSubjectScoreByUserID } from "../service/subjectScore";
import { getScoreStatus } from "../configs/subject";
import { educationStatus } from "../configs/systemStatus";

const UserInfo = ({ user, user_id }) => {
  const [data, setData] = useState([]);
  const columns = [
    {
      title: "ID",
      dataIndex: "key",
      render: (key) => <>{key}</>,
      responsive: ["lg"],
    },
    {
      title: "Subject",
      dataIndex: "subject",
      render: (subject) => <>{subject}</>,
    },
    {
      title: "Credits",
      dataIndex: "credits",
      render: (credits) => <>{credits}</>,
      responsive: ["lg"],
    },
    {
      title: "Ratio",
      dataIndex: "ratio",
      render: (ratio) => <>{ratio}</>,
      responsive: ["lg"],
    },
    {
      title: "Midterm",
      dataIndex: "midterm_score",
      render: (midterm_score) => <>{midterm_score}</>,
    },
    {
      title: "Endterm",
      dataIndex: "endterm_score",
      render: (endterm_score) => <>{endterm_score}</>,
    },
    {
      title: "Final",
      dataIndex: "final_score",
      render: (final_score) => <>{final_score}</>,
      responsive: ["lg"],
    },
    {
      title: "Final in char",
      dataIndex: "final_score_char",
      render: (final_score_char) => <>{final_score_char}</>,
    },
    {
      title: "Semester",
      dataIndex: "semester",
      render: (semester) => <>{semester}</>,
      responsive: ["lg"],
    },
    {
      title: "Schedule",
      dataIndex: "schedule",
      render: (schedule) => <>{schedule ? schedule : "NULL"}</>,
      responsive: ["lg"],
    },
    {
      title: "Status",
      dataIndex: "subject_status",
      render: (subject_status) => getScoreStatus(subject_status),
    },
  ];

  useEffect(() => {
    user.educationStatus === educationStatus.ENABLE &&
      getAllSubjectScoreByUserID(user_id, (res) => {
        if (res.status === 1) {
          const result = res.data.map((score, index) => {
            return { ...score, key: index + 1 };
          });
          setData(result);
        }
      });
  }, []);
  return (
    <div style={{ width: "100%", overflowX: "auto", padding: "10px" }}>
      <div style={{ width: "fit-content" }}>
        <Table dataSource={data} columns={columns} />
      </div>
    </div>
  );
};

export default UserInfo;
