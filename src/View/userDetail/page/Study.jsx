import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import {
  Button,
  Collapse,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Select,
  Table,
} from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import CreateSemester from "../../../components/CreateSemester";
import PredictResult from "../../../components/PredictResult";
import PredictSemester from "../../../components/PredictSemester";
import { formItemLayout } from "../../../configs/form";
import { getScoreNum, getScoreResult } from "../../../configs/score";
import { getScoreStatus } from "../../../configs/subject";
import "../../../css/Study.scss";
import { createSemester, getListSemester } from "../../../service/semester";
import {
  getAllSubjectScoreByUserID,
  getAllSubjectScoreSemesterByUser,
  updateSubjectScore,
} from "../../../service/subjectScore";

const { Panel } = Collapse;

const Study = ({ user }) => {
  const auth = useSelector((state) => state.auth.data);
  const path = useLocation().pathname;
  const [formSemester] = Form.useForm();
  const [formUpdateSubject] = Form.useForm();
  const [data, setData] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [semester, setSemester] = useState();
  const [semesterData, setSemesterData] = useState([]);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [predictResult, setPredictResult] = useState([]);
  const [gpa, setGpa] = useState(0);

  const handleDeleteSubject = (id) => {
    console.log("delete", id);
  };

  const onFinishUpdateSubjectScore = (id) => {
    const data = {
      ...formUpdateSubject.getFieldValue(),
      user_id: auth?._id,
    };
    updateSubjectScore(id, data, (res) => {
      if (res.status === 1) {
        window.location.reload();
        message.success(res.message);
      } else {
        message.error(res.message);
      }
    });
  };

  const handleEditSubject = (id) => {
    formUpdateSubject.resetFields();
    Modal.confirm({
      width: "1000px",
      title: `Edit subject`,
      icon: <ExclamationCircleOutlined />,
      content: (
        <>
          <Form
            form={formUpdateSubject}
            onFinish={onFinishUpdateSubjectScore(id)}
            layout="vertical"
          >
            <Form.Item label={"Semester"} labelAlign="left" name="semester_id">
              <Select
                style={{ width: "fit-content", marginBottom: "10px" }}
                placeholder={"Choose semester"}
                options={semesters}
              />
            </Form.Item>
            <Form.Item
              label={"Midterm score"}
              labelAlign="left"
              name="midterm_score"
            >
              <InputNumber placeholder="Midterm score" />
            </Form.Item>
            <Form.Item
              label={"Endterm score"}
              labelAlign="left"
              name="endterm_score"
            >
              <InputNumber placeholder="Endterm score" />
            </Form.Item>
          </Form>
        </>
      ),
      onOk() {
        onFinishUpdateSubjectScore(id);
      },
      onCancel() {},
      centered: true,
    });
  };

  useEffect(() => {
    getAllSubjectScoreByUserID(auth?._id, (res) => {
      if (res.status === 1) {
        const result = res.data.map((score, index) => {
          return { ...score, key: index + 1 };
        });
        setData(result);
      } else {
        message.error(res.message);
      }
    });

    getListSemester({}, {}, {}, (res) => {
      if (res.status === 1) {
        const semesterList = res.data.result.map((semester) => {
          return {
            value: `${semester._id}`,
            label: semester.name,
          };
        });
        setSemesters(semesterList);
      } else {
        message.error(res.message);
      }
    });
  }, [path]);

  const handleChange = (values) => {
    setSemester(values);
    getAllSubjectScoreSemesterByUser(auth?._id, values, (res) => {
      if (res.status === 1) {
        let credits = 0;
        let gpa = 0;
        const result = res.data.map((score, index) => {
          if (score.subject_status !== 2) {
            credits += score.credits;
            gpa += getScoreNum(score.final_score_char) * score.credits;
          }
          return { ...score, key: index + 1 };
        });
        setGpa(getScoreResult(gpa, credits));
        setButtonDisabled(false);
        setSemesterData(result);
      } else {
        setButtonDisabled(true);
        setSemesterData([]);
        setGpa(0);
        message.error(res.message);
      }
    });
  };

  const onFinishAddSemester = (values) => {
    createSemester(formSemester.getFieldValue(), (res) => {
      if (res.status === 1) {
        message.success(res.message);
        window.location.reload();
      } else {
        message.error(res.message);
      }
    });
  };

  const handleDeleteSemester = () => {};

  const addNewSemester = () => {
    formSemester.resetFields();
    Modal.confirm({
      width: "1000px",
      title: `New Semester`,
      icon: <ExclamationCircleOutlined />,
      content: (
        <>
          <Form
            {...formItemLayout}
            form={formSemester}
            onFinish={onFinishAddSemester}
          >
            <Form.Item name={"name"}>
              <Input style={{ width: "60vw" }} placeholder={"Input schedule"} />
            </Form.Item>
          </Form>
        </>
      ),
      onOk() {
        onFinishAddSemester();
      },
      onCancel() {},
      centered: true,
    });
  };

  const semesterColumn = [
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
    {
      title: "Action",
      dataIndex: "_id",
      render: (_id) => {
        return (
          <div>
            <DeleteOutlined
              style={{ cursor: "pointer", marginRight: "10px" }}
              onClick={(e) => {
                e.preventDefault();
                handleDeleteSubject(_id);
              }}
            />
            <EditOutlined
              style={{ cursor: "pointer" }}
              onClick={(e) => {
                e.preventDefault();
                handleEditSubject(_id);
              }}
            />
          </div>
        );
      },
    },
  ];

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
    {
      title: "Action",
      dataIndex: "_id",
      render: (_id) => {
        return (
          <div>
            <DeleteOutlined
              style={{ cursor: "pointer", marginRight: "10px" }}
              onClick={(e) => {
                e.preventDefault();
                handleDeleteSubject(_id);
              }}
            />
            <EditOutlined
              style={{ cursor: "pointer" }}
              onClick={(e) => {
                e.preventDefault();
                handleEditSubject(_id);
              }}
            />
          </div>
        );
      },
    },
  ];

  return (
    <div style={{ width: "100%", padding: "10px" }}>
      <Collapse
        defaultActiveKey={["0"]}
        style={{ width: "100%", overflowX: "auto", marginBottom: "20px" }}
      >
        <Panel header={`CPA: ${user?.cpa}`} key="1">
          <Table dataSource={data} columns={columns} />
        </Panel>
      </Collapse>

      <div className="semester">
        <div className="createSemester">
          <CreateSemester semesters={semesters} user={user} />
        </div>

        <div className="tab">
          <Select
            style={{ width: "fit-content", marginBottom: "10px" }}
            placeholder={"Choose semester"}
            onChange={handleChange}
            options={semesters}
          />
          <Button onClick={addNewSemester}>Add semester</Button>
          <Button disabled={buttonDisabled} onClick={handleDeleteSemester}>
            Delete semester
          </Button>
          <PredictSemester
            semester={semester}
            buttonDisabled={buttonDisabled}
            user={user}
            semesterData={semesterData}
            predictResult={predictResult}
            setPredictResult={setPredictResult}
          />
        </div>
        <div className="predict-result">
          {predictResult.length !== 0 && (
            <p style={{ textDecoration: "underline", fontSize: "18px" }}>
              Predict result
            </p>
          )}
          {predictResult.map((result, index) => {
            return <PredictResult key={index} result={result} />;
          })}
        </div>
        <div className="table">
          <div style={{ width: "fit-content", overflowX: "auto" }}>
            <Table
              dataSource={semesterData}
              columns={semesterColumn}
              footer={() => `GPA: ${gpa}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Study;
