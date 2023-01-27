import React, { useState } from "react";
import { Modal } from "antd";
import "../css/PostUser.scss";
import { useSelector } from "react-redux";

const PostUser = ({ post }) => {
  const tags = useSelector((state) => state.tag.data);
  const tagList = post.tags.map((tag, index) => {
    return tags?.find((element) => element._id === tag);
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleShowModal = () => {
    setIsModalOpen(true);
  };
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
