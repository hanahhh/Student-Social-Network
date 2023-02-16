import React, { useState, useEffect } from "react";
import { Upload, message } from "antd";
import { uploadImagePost } from "../service/post";
import {
  ExclamationCircleOutlined,
  LoadingOutlined,
  PlusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const UploadImage = ({ form }) => {
  const imageUrl = form.getFieldValue().image;
  useEffect(() => {}, [form]);
  const [loading, setLoading] = useState(false);
  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        imageUrl = url;
      });
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  const uploadImage = (options) => {
    const { onSuccess, onError, file, onProgress } = options;

    const formData = new FormData();
    formData.append("post_image", file);

    uploadImagePost(formData, (res) => {
      if (res.status === 1) {
        setLoading(false);
        form.setFieldsValue({
          image: res.data.path,
        });
      } else {
        message.error("Upload image failed !");
      }
    });
  };
  return (
    <Upload
      accept="image/*"
      customRequest={uploadImage}
      onChange={handleChange}
      listType="picture-card"
      className="avatar-uploader"
      name="avatar"
      showUploadList={false}
      beforeUpload={beforeUpload}
    >
      {imageUrl ? (
        <img
          src={`${process.env.REACT_APP_IMAGE}/${imageUrl}`}
          alt="avatar"
          style={{
            width: "100%",
          }}
        />
      ) : (
        uploadButton
      )}
    </Upload>
  );
};

export default UploadImage;
