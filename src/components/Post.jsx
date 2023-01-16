import React from "react";
import "../css/Post.scss";
import { getAllPostByTag } from "../service/tags";

const Post = ({ post, tags }) => {
  const tagList = post.tags.map((tag, index) => {
    return tags?.find((element) => element._id === tag);
  });
  const handleGetAllPostByTag = (id) => {
    const posts = getAllPostByTag(id);
    console.log(posts);
  };
  return (
    <div className="post">
      <div className="avatar">
        <img
          src={`${process.env.REACT_APP_IMAGE}/${post?.user_avatar}`}
          alt="avatar"
          className="avatar-image"
        />
        <span>{post?.user_name}</span>
      </div>

      <img
        src={`${process.env.REACT_APP_IMAGE}/${post.image}`}
        alt="post-image"
      />
      <div className="content">
        <span>{post?.content}</span>
        <div className="tags">
          {tagList?.map((tag, index) => {
            return (
              <div
                className="tag"
                key={index}
                onClick={(e) => {
                  e.preventDefault();
                  handleGetAllPostByTag(tag._id);
                }}
              >
                <span>@{tag?.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Post;
