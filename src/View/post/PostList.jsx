import {
  ExclamationCircleOutlined,
  LoadingOutlined,
  PlusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Form, Input, message, Modal, Select, Tag, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Post from "../../components/Post";
import "../../css/PostList.scss";
import { getListPost, uploadImagePost, createPost } from "../../service/post";
import { getAllPostByTag } from "../../service/tags";
import { formItemLayout } from "../../configs/form";
import UploadImage from "../../components/UploadImage";

const { CheckableTag } = Tag;
const { Option } = Select;

const PostList = () => {
  const [form] = Form.useForm();
  const user = useSelector((state) => state.auth.data);
  const tags = useSelector((state) => state.tag.data);
  const [data, setData] = useState([]);
  const [dataTag, setDataTag] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [image, setImage] = useState("");

  useEffect(() => {
    getListPost({}, {}, {}, (res) => {
      if (res.status === 1) {
        setData(res.data.result);
      } else {
        message.error("Cannot get data!");
      }
    });
  }, [image]);

  const onFinishCreatePost = () => {
    createPost(form.getFieldValue(), (res) => {
      if (res.status === 1) {
        window.location.reload();
      } else {
        message.error("Cannot create post!");
      }
    });
  };

  const handleChangeTag = (tag, checked) => {
    let nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    setSelectedTags(nextSelectedTags);
    nextSelectedTags = nextSelectedTags.map((tag) => {
      return tag._id;
    });
    getAllPostByTag(nextSelectedTags, {}, {}, {}, (res) => {
      if (res.status === 1) {
        setData(res.data.result);
      } else {
        message.error(res.message);
      }
    });
  };

  const createNewPost = () => {
    Modal.confirm({
      width: "1000px",
      title: `New Post`,
      icon: <ExclamationCircleOutlined />,
      content: (
        <>
          <UploadImage form={form} />
          <Form {...formItemLayout} form={form} onFinish={onFinishCreatePost}>
            <Form.Item label={"Content"} labelAlign="left" name="content">
              <Input placeholder="Your content here" />
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
        onFinishCreatePost();
      },
      onCancel() {},
      centered: true,
    });
  };
  return (
    <div className="container">
      <div className="row-post">
        <div className="post-list">
          {data.map((post, index) => {
            return <Post post={post} tags={tags} key={index} auth={user} />;
          })}
        </div>

        <div className="side-part">
          <div className="new-post">
            <PlusCircleOutlined
              style={{
                fontSize: "30px",
                fontWeight: "700",
                color: "var(--light-black)",
                cursor: "pointer",
              }}
              onClick={createNewPost}
            />
            <span>New Post</span>
          </div>
          <div className="tags">
            {tags?.map((tag, index) => {
              return (
                <CheckableTag
                  className="tag"
                  key={index}
                  checked={selectedTags.indexOf(tag) > -1}
                  onChange={(checked) => handleChangeTag(tag, checked)}
                  style={{
                    padding: "3px 5px",
                    border: "1px solid var(--dark-grey)",
                    borderRadius: "5px",
                    cursor: "pointer",
                    margin: "3px 5px",
                  }}
                >
                  {tag.name}
                </CheckableTag>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostList;
