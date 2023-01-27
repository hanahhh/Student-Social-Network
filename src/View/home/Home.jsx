import { message, Select } from "antd";
import React, { useState, useEffect } from "react";
import { getAllSubject, getTopSubject } from "../../service/subject";
import { Column } from "@ant-design/plots";
import "../../css/home.scss";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const naviagate = useNavigate();
  let subjects = useSelector((state) => state.subject.data);
  subjects = subjects?.map((sub) => {
    return {
      value: sub._id,
      label: sub.name,
    };
  });
  const topSubject = useSelector((state) => state.subject.top);
  const [subject, setSubject] = useState(subjects && subjects[0].value);

  const config = {
    data: topSubject ? topSubject : [],
    xField: "name",
    yField: "average_score",
    label: {
      position: "middle",

      style: {
        fill: "#FFFFFF",
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      average_score: {
        alias: "Average score",
      },
      name: {
        alias: "Name",
      },
    },
  };

  return (
    <div className="home">
      <div className="content-manager">
        <div className="select-subject">
          <p>Choose a subject</p>
          <Select
            defaultValue={subjects && subjects[0]?.value}
            style={{ width: 150 }}
            options={subjects}
            onChange={(e) => {
              setSubject(e);
            }}
          />
          <button onClick={() => naviagate(`/subject/${subject}`)}>
            Subject detail
          </button>
        </div>
        <div className="statistic">
          <p>Top 5 highest average score subject</p>
          <Column {...config} />
        </div>
      </div>
    </div>
  );
};

export default Home;
