import {
  ExclamationCircleOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  Modal,
  Select,
  Space,
  Radio,
  message,
} from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { formItemLayout } from "../configs/form";
import { subject_status_option } from "../configs/subject";
import { createSubjectScore } from "../service/subjectScore";

const CreateSemester = ({ semesters, user }) => {
  const [form] = Form.useForm();
  const subjects = useSelector((state) => state.subject.data)?.map(
    (subject) => {
      return {
        value: subject._id,
        label: `${subject.name} - ${subject.code}`,
      };
    }
  );

  const onFinishCreateSemester = () => {
    const semesterCreate = form.getFieldValue();
    const subjects = semesterCreate.subjects;

    subjects.map((subject) => {
      const newSubject = {
        ...subject,
        semester_id: semesterCreate.semester_id,
        user_id: user._id,
      };
      createSubjectScore(newSubject, (res) => {
        if (res.status === 1) {
          message.success(res.message);
        } else {
          message.error(res.message);
        }
      });
      console.log(newSubject);
    });
  };
  const handleCreateSemester = () => {
    form.resetFields();
    Modal.confirm({
      width: "1000px",
      title: `New Semester`,
      icon: <ExclamationCircleOutlined />,
      content: (
        <>
          <Form
            {...formItemLayout}
            form={form}
            onFinish={onFinishCreateSemester}
            layout="vertical"
          >
            <Form.Item
              label="Semester"
              name={"semester_id"}
              rules={[
                {
                  required: true,
                  message: "This field is required !",
                },
              ]}
            >
              <Select
                style={{ width: "60vw" }}
                placeholder={"Choose semester"}
                options={semesters}
              />
            </Form.Item>
            <Form.List name="subjects">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space
                      key={key}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginBottom: 8,
                      }}
                      align="baseline"
                    >
                      <p style={{ color: "red" }}>Subject number {key + 1}</p>
                      <Form.Item
                        label="Subject"
                        {...restField}
                        name={[name, "subject_id"]}
                        rules={[
                          {
                            required: true,
                            message: "This field is required !",
                          },
                        ]}
                      >
                        <Select
                          style={{ width: "60vw" }}
                          placeholder={"Choose subject"}
                          options={subjects}
                        />
                      </Form.Item>
                      <Form.Item
                        label="Misterm score"
                        {...restField}
                        name={[name, "midterm_score"]}
                      >
                        <Input
                          style={{ width: "60vw" }}
                          placeholder={"Midterm score"}
                        />
                      </Form.Item>
                      <Form.Item
                        label="Endterm score"
                        {...restField}
                        name={[name, "endterm_score"]}
                      >
                        <Input
                          style={{ width: "60vw" }}
                          placeholder={"Endterm score"}
                        />
                      </Form.Item>
                      <Form.Item
                        label="Subject status"
                        {...restField}
                        name={[name, "subject_status"]}
                        rules={[
                          {
                            required: true,
                            message: "This field is required !",
                          },
                        ]}
                      >
                        <Radio.Group options={subject_status_option} />
                      </Form.Item>
                      <Form.Item
                        label="Schedule"
                        {...restField}
                        name={[name, "schedule"]}
                      >
                        <Input
                          style={{ width: "60vw" }}
                          placeholder={"Input schedule"}
                        />
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </Space>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      Create subject semester
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Form>
        </>
      ),
      onOk() {
        onFinishCreateSemester();
      },
      onCancel() {},
      centered: true,
    });
  };
  return (
    <div>
      <Button onClick={handleCreateSemester}>Create subject semester</Button>
    </div>
  );
};

export default CreateSemester;
