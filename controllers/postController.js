import CONFIG_STATUS from "../config/status.json";
import { deleteOldImagePostListener } from "../listener/imageListener.js";
import { dataHandle } from "../middlewares/dataHandle.js";
import {
  checkExistPost,
  createPost,
  deletePost,
  getAllPost,
  getAllPostByTagID,
  getAllPostByUserID,
  getPostByID,
  updatePostByID,
} from "../service/post.js";
import { checkExistTag, getTagByID, updateTagByID } from "../service/tag.js";
import { checkExistUser } from "../service/user.js";

export const getAllPostController = async (req, res) => {
  let post_list = await getAllPost();
  const list = post_list.result;
  for (let i = 0; i < list.length; i++) {
    let tags = list[i].tags;
    tags.forEach((tag) => {
      return getTagByID(tag);
    });
  }

  dataHandle(post_list, req, res);
};

export const createPostController = async (req, res, next) => {
  const { user_id, content, tags, image, user_avatar, user_name } = req.body;
  if (
    user_id == null ||
    content == null ||
    image == null ||
    user_avatar == null ||
    user_name == null
  ) {
    res.status(400).send({
      status: CONFIG_STATUS.FAIL,
      message: "Request body is invalid. Please try again.",
    });
  } else {
    const checkUser = checkExistUser(user_id);
    if (!checkUser) {
      res.status(400).send({
        status: CONFIG_STATUS.FAIL,
        message: "User is not exists. Please try again.",
      });
    }

    for (let i = 0; i < tags.length; i++) {
      const check = await checkExistTag(tags[i]);
      if (!check) {
        res.status(500).send({
          ...check,
        });
      } else {
        const tag = await getTagByID(tags[i]);
        await updateTagByID(
          {
            post_amount: tag.tag_detail.post_amount + 1,
          },
          tags[i]
        );
      }
    }
    const result = await createPost(req.body);
    if (result.status != 0) {
      res.status(200).send({
        ...result,
      });
    } else {
      res.status(500).send({
        ...result,
      });
    }
  }
};

export const uploadPostImageController = async (req, res) => {
  const image = req.file;
  if (!image) {
    res.status(400).send({
      status: CONFIG_STATUS.FAIL,
      message: "Upload failed. File is empty.",
    });
  } else {
    res.send({
      status: CONFIG_STATUS.SUCCESS,
      message: "Upload post image successful.",
      data: {
        path: image.path
          .substr(image.path.indexOf("/") + 1)
          .replaceAll("\\", "/"),
      },
    });
  }
};

export const uploadPostImageControllerByID = async (req, res) => {
  const { post_id } = req.params;
  const image = req.file;
  if (post_id == null) {
    res.status(400).send({
      status: CONFIG_STATUS.FAIL,
      message: "Please try again, supplier_id is null.",
    });
  } else {
    const { isExist } = await checkExistPost(post_id);
    if (!isExist) {
      res.status(400).send({
        status: CONFIG_STATUS.FAIL,
        message: "Please try again, post is not exists.",
      });
    } else if (!image) {
      res.status(400).send({
        status: CONFIG_STATUS.FAIL,
        message: "Upload failed. File is empty.",
      });
    } else {
      const { post } = await getPostByID(post_id);
      //Dispatch delete old file
      post.image && deleteOldImagePostListener(post.image);
      res.send({
        status: CONFIG_STATUS.SUCCESS,
        message: "Upload supplier avatar successful.",
        data: {
          path: image.path.substr(image.path.indexOf("/") + 1),
        },
      });
    }
  }
};

export const getPostByIDController = async (req, res) => {
  const { post_id } = req.params;
  const { isExist } = await checkExistPost(post_id);
  if (isExist) {
    const post = await getPostByID(post_id);
    dataHandle(post, req, res);
  } else {
    res.status(400).send({
      status: CONFIG_STATUS.FAIL,
      message: "Post is not exist.",
    });
  }
};

export const getAllPostByUserIDController = async (req, res) => {
  const { user_id } = req.params;
  const { isExist } = await checkExistUser(user_id);
  if (isExist) {
    const post = await getAllPostByUserID(user_id);
    dataHandle(post, req, res);
  } else {
    res.status(400).send({
      status: CONFIG_STATUS.FAIL,
      message: "User is not exist.",
    });
  }
};

export const getAllPostByTagIDController = async (req, res) => {
  const tagList = req.body;
  let postList = [];
  for (let i = 0; i < tagList.length; i++) {
    const { isExist } = await checkExistTag(tagList[i]);
    if (isExist) {
      const post = await getAllPostByTagID(tagList[i]);
      postList = postList.concat(post.result);
    } else {
      res.status(400).send({
        status: CONFIG_STATUS.FAIL,
        message: "Some tag is not exist.",
      });
    }
  }
  dataHandle(postList, req, res);
};

export const updatePostByIdController = async (req, res) => {
  const { post_id } = req.params;
  const { user_id, content, image, tags } = req.body;

  if (user_id == null) {
    res.status(400).send({
      status: CONFIG_STATUS.FAIL,
      message: "Request body is invalid.",
    });
  } else {
    let updates = {
      ...req.body,
      updated_at: Date.now(),
    };
    const result = await updatePostByID(updates, post_id);
    if (result.status == 0) {
      res.status(500).send({
        ...result,
      });
    } else {
      res.send({
        ...result,
      });
    }
  }
};

export const deletePostController = async (req, res) => {
  const { post_id } = req.params;
  const { isExist } = await checkExistPost(post_id);
  if (isExist) {
    const post = await deletePost(post_id);
    res.send({
      status: CONFIG_STATUS.SUCCESS,
      message: "Delete post successful.",
    });
  } else {
    res.status(400).send({
      status: CONFIG_STATUS.FAIL,
      message: "Post is not exist.",
    });
  }
};
