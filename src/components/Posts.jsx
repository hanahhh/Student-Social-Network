import { List } from "antd";
import React, { useEffect, useState } from "react";
import "../css/PostList.scss";
import { getPostByUserID } from "../service/post";
import PostNeighbor from "./PostNeighbor";

const Post = ({ user_id }) => {
  const [myPost, setMyPost] = useState([]);

  useEffect(() => {
    getPostByUserID(user_id, {}, {}, {}, (res) => {
      if (res.status === 1) {
        setMyPost(res.data.result);
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
            <PostNeighbor post={item} key={index} />
          </List.Item>
        )}
      />
    </div>
  );
};

export default Post;
