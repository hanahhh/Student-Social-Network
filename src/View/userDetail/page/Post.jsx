import React, { useEffect, useState } from "react";
import PostUser from "../../../components/PostUser";
import { List, message } from "antd";
import { getMyPost } from "../../../service/post";
import { useSelector } from "react-redux";

const Post = () => {
  const [myPost, setMyPost] = useState([]);
  const info = useSelector((state) => state.auth.data);

  useEffect(() => {
    getMyPost(info._id, {}, {}, {}, (res) => {
      if (res.status === 1) {
        setMyPost(res.data.result);
      } else {
        message.error("You have no post.");
      }
    });
  }, []);
  return (
    <div className="post-list">
      <List
        grid={{
          gutter: 16,
          column: 3,
        }}
        dataSource={myPost}
        renderItem={(item, index) => (
          <List.Item>
            <PostUser post={item} key={index} />
          </List.Item>
        )}
      />
    </div>
  );
};

export default Post;
