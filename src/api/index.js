import axios from "axios";

// Base URL for Backend Comm.
const API = axios.create({ baseURL: "http://localhost:5000/" });
API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

// Posts actions
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPostBySearch = ({ searchTerm, tags }) =>
  API.get(`/posts/search?searchQuery=${searchTerm || "none"}&tags=${tags}`);
export const createPost = (newPost) => API.post("/posts", newPost);
export const updatePost = (id, updatePost) =>
  API.patch(`/posts/${id}`, updatePost);
export const removePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const commentedPost = (comment, id) =>
  API.post(`/posts/${id}/commentPost`, { comment });

// User Actions
export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);
