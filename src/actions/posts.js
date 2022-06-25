import {
  fetchPosts,
  fetchPost,
  fetchPostBySearch,
  createPost,
  updatePost,
  removePost,
  likePost,
  commentedPost,
} from "../api";

import {
  FETCH_ALL,
  FETCH_BY_SEARCH,
  FETCH_POST,
  COMMENT,
  CREATE,
  UPDATE,
  DELETE,
  LIKE,
  LOADING,
  LOADED,
} from "../constants/actionTypes";

export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({ type: LOADING });
    const { data } = await fetchPosts(page);

    await dispatch({ type: FETCH_ALL, payload: data });
    dispatch({ type: LOADED });
  } catch (error) {
    console.warn(error);
  }
};

export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: LOADING });
    const { data } = await fetchPost(id);

    await dispatch({ type: FETCH_POST, payload: data });
    dispatch({ type: LOADED });
  } catch (error) {
    console.warn(error);
  }
};

export const getPostBySearch =
  ({ searchTerm, tags }) =>
  async (dispatch) => {
    console.log(searchTerm, tags);
    try {
      dispatch({ type: LOADING });
      const {
        data: { data },
      } = await fetchPostBySearch({ searchTerm, tags });
      console.log(data);
      await dispatch({ type: FETCH_BY_SEARCH, payload: data });
      dispatch({ type: LOADED });
    } catch (error) {
      console.error(error);
    }
  };

export const createNewPost = (post, navigate) => async (dispatch) => {
  try {
    dispatch({ type: LOADING });
    const { data } = await createPost(post);
    navigate(`/posts/${data._id}`);
    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updatedPost = (id, post) => async (dispatch) => {
  try {
    const { data } = await updatePost(id, post);
    await dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.warn(error);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await removePost(id);
    await dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.warn(error);
  }
};

export const likedPost = (id) => async (dispatch) => {
  try {
    const { data } = await likePost(id);
    console.log("Liked");
    await dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.warn(error);
  }
};

export const commentPost = (comment, id) => async (dispatch) => {
  try {
    const { data } = await commentedPost(comment, id);

    dispatch({ type: COMMENT, payload: data });

    return data.comments;
  } catch (error) {
    console.warn(error);
  }
};
