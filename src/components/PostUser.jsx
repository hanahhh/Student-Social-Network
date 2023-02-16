import React, { useEffect, useState } from "react";
import { Button, Dropdown, Form, Input, message, Modal, Select } from "antd";
import "../css/PostUser.scss";
import { useSelector } from "react-redux";
import {
  MoreOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { deletePost, updatePost } from "../service/post";
import { formItemLayout } from "../configs/form";
import UploadImage from "./UploadImage";

const { Option } = Select;

const PostUser = ({ post }) => {
  const [form] = Form.useForm();
  const tags = useSelector((state) => state.tag.data);
  const [image, setImage] = useState();
  const tagList = post.tags.map((tag, index) => {
    return tags?.find((element) => element._id === tag);
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleShowModal = () => {
    setIsModalOpen(true);
  };
  useEffect(() => {
    form.setFieldsValue(post);
  }, [image]);
  const onFinishUpdatePost = () => {
    updatePost(post._id, form.getFieldValue(), (res) => {
      if (res.status === 1) {
        message.success(res.message);
        window.location.reload();
      } else {
        message.error(res.message);
      }
    });
  };
  const handleEditPost = () => {
    Modal.confirm({
      width: "500px",
      title: `Edit your post`,
      icon: <ExclamationCircleOutlined />,
      content: (
        <>
          <UploadImage form={form} />
          <Form
            {...formItemLayout}
            form={form}
            onFinish={onFinishUpdatePost}
            layout="vertical"
          >
            <Form.Item label="Content" labelAlign="left" name={"content"}>
              <Input />
            </Form.Item>
            <Form.Item label={"Tags"} labelAlign="left" name="tags">
              <Select
                mode="multiple"
                style={{ width: "100%" }}
                placeholder="select tags"
              >
                {tags?.map((tag, index) => {
                  return (
                    <Option value={tag._id} key={index}>
                      {tag.name}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Form>
        </>
      ),
      onOk() {
        onFinishUpdatePost();
      },
      onCancel() {},
      centered: true,
    });
  };
  const onFinishDeletePost = () => {
    deletePost(post._id, (res) => {
      if (res.status === 1) {
        message.success(res.message);
        window.location.reload();
      } else {
        message.error(res.message);
      }
    });
  };
  const handleDeletePost = () => {
    Modal.confirm({
      width: "500px",
      title: `Delete subject`,
      icon: <ExclamationCircleOutlined />,
      content: (
        <>
          <p>Are you sure to delete this post ?</p>
        </>
      ),
      onOk() {
        onFinishDeletePost();
      },
      onCancel() {},
      centered: true,
    });
  };
  const items = [
    {
      key: "1",
      label: (
        <div className="icon-action" onClick={handleEditPost}>
          <EditOutlined />
          <p>Edit</p>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div className="icon-action" onClick={handleDeletePost}>
          <DeleteOutlined />
          <p>Delete</p>
        </div>
      ),
    },
  ];
  return (
    <>
      <img
        onClick={handleShowModal}
        className="post-user"
        src={`${process.env.REACT_APP_IMAGE}/${post.image}`}
        alt="post-image"
      />
      <Modal
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        centered={true}
        footer={null}
        closable={false}
        className="modal"
      >
        <div className="edit">
          <Dropdown
            menu={{ items }}
            placement="bottomRight"
            arrow
            trigger={["click"]}
          >
            <MoreOutlined style={{ fontSize: "20px" }} />
          </Dropdown>
        </div>

        <img
          onClick={handleShowModal}
          className="modal-image"
          src={`${process.env.REACT_APP_IMAGE}/${post.image}`}
          alt="post-image"
        />
        <p>{post.content}</p>
        <div className="tags">
          {tagList?.map((tag, index) => {
            return (
              <div className="tag" key={index}>
                <span>@{tag?.name}</span>
              </div>
            );
          })}
        </div>
      </Modal>
    </>
  );
};

export default PostUser;
