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
import SavedPredictResult from "../../../components/SavedPredictResult";
import { formItemLayout } from "../../../configs/form";
import { getScoreNum, getScoreResult } from "../../../configs/score";
import { getScoreStatus } from "../../../configs/subject";
import { subjectStatus } from "../../../configs/systemStatus";
import "../../../css/Study.scss";
import { getPredictResultSemesterByUser } from "../../../service/predictResult";
import { createSemester, getListSemester } from "../../../service/semester";
import {
  deleteSubjectScore,
  getAllMySubject,
  getAllSubjectScoreByUserID,
  getAllSubjectScoreSemesterByUser,
  getCPARecommendation,
  updateSubjectScore,
} from "../../../service/subjectScore";

const { Panel } = Collapse;

const Study = ({ user }) => {
  const auth = useSelector((state) => state.auth.data);
  const path = useLocation().pathname;
  const [formSemester] = Form.useForm();
  const [formUpdateSubject] = Form.useForm();
  const [formRecommendCPA] = Form.useForm();
  const [data, setData] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [semester, setSemester] = useState();
  const [semesterData, setSemesterData] = useState([]);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [predictResult, setPredictResult] = useState([]);
  const [savedPredictResult, setSavedPredictResult] = useState([]);
  const [cpaRecommendation, setCpaRecommendation] = useState({});
  const [gpa, setGpa] = useState(0);

  const onFinishDeleteSubjectScore = (id) => {
    deleteSubjectScore(id, (res) => {
      if (res.status === 1) {
        window.location.reload();
        message.success(res.message);
      } else {
        message.error(res.message);
      }
    });
  };

  const handleDeleteSubject = (id) => {
    Modal.confirm({
      width: "1000px",
      title: `Delete subject`,
      icon: <ExclamationCircleOutlined />,
      content: (
        <>
          <p>Are you sure to delete this subject ?</p>
        </>
      ),
      onOk() {
        onFinishDeleteSubjectScore(id);
      },
      onCancel() {},
      centered: true,
    });
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
            onFinish={(e) => {
              e.preventDefault();
              onFinishUpdateSubjectScore(id);
            }}
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
    getAllMySubject((res) => {
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

    semester &&
      getPredictResultSemesterByUser(auth._id, semester, (res) => {
        if (res.status === 1) {
          setSavedPredictResult(res.data);
        }
      });
  }, [path, semester]);

  const handleChange = (values) => {
    setSemester(values);
    setPredictResult([]);
    getAllSubjectScoreSemesterByUser(auth?._id, values, (res) => {
      if (res.status === 1) {
        let credits = 0;
        let gpa = 0;
        const result = res.data.map((score, index) => {
          if (score.subject_status !== subjectStatus.ONGOING) {
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

  const onFinishRecommendCPA = () => {
    getCPARecommendation(
      auth._id,
      formRecommendCPA.getFieldValue().credits,
      (res) => {
        console.log(res);
        if (res.status === 1) {
          setCpaRecommendation(res.data.recommendation);
          message.success(res.message);
        } else {
          message.error(res.message);
        }
      }
    );
  };

  const handleRecommendCPA = () => {
    formRecommendCPA.resetFields();
    Modal.confirm({
      width: "1000px",
      title: `Improve CPA`,
      icon: <ExclamationCircleOutlined />,
      content: (
        <>
          <Form
            form={formRecommendCPA}
            onFinish={onFinishRecommendCPA}
            layout="vertical"
          >
            <Form.Item
              label="How many credits do you want to take ?"
              name={"credits"}
            >
              <Input
                style={{ maxWidth: "700px", width: "100%" }}
                placeholder={"Input credits"}
              />
            </Form.Item>
          </Form>
        </>
      ),
      onOk() {
        onFinishRecommendCPA();
      },
      onCancel() {},
      centered: true,
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
              <Input
                style={{ minWidth: "700px", width: "100%" }}
                placeholder={"Input schedule"}
              />
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
      <div className="cpa">
        <Button onClick={handleRecommendCPA}>CPA recommendation</Button>
        <div className="cpa-recommendation">
          {Object.keys(cpaRecommendation).length !== 0 && (
            <div className="title-recommend">
              <p>CPA recommendation</p>
            </div>
          )}

          {Object.keys(cpaRecommendation).length !== 0 && (
            <div className="recommend">
              <p>
                Your CPA will increase:{" "}
                <span style={{ fontWeight: "bold" }}>
                  {cpaRecommendation.maxValue}
                </span>
              </p>
              <p>Subjects needed to learn again and got an A:</p>
              <ul>
                {cpaRecommendation.subset.map((subject, index) => {
                  return <li>{subject.subject}</li>;
                })}
              </ul>
            </div>
          )}
        </div>
        <Collapse
          defaultActiveKey={["0"]}
          style={{ width: "100%", overflowX: "auto", marginBottom: "20px" }}
        >
          <Panel header={`CPA: ${user?.cpa}`} key="1">
            <Table dataSource={data} columns={columns} />
          </Panel>
        </Collapse>
      </div>

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

        <div className="table">
          <div style={{ width: "fit-content", overflowX: "auto" }}>
            <Table
              dataSource={semesterData}
              columns={semesterColumn}
              footer={() => `GPA: ${gpa}`}
            />
          </div>
        </div>
        <div className="predict-result">
          {predictResult.length !== 0 && (
            <div className="title-predict">
              <p>Predict result</p>
            </div>
          )}
          {predictResult.map((result, index) => {
            return (
              <PredictResult
                key={index}
                result={result}
                user_id={auth._id}
                semester_id={semester}
              />
            );
          })}
        </div>
        <div className="saved-predict-result">
          {savedPredictResult.length !== 0 && (
            <div className="title-predict">
              <p>Saved Predict Result</p>
            </div>
          )}

          {savedPredictResult.length !== 0 &&
            savedPredictResult.map((savedResult, index) => {
              return (
                <SavedPredictResult savedResult={savedResult} key={index} />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Study;
