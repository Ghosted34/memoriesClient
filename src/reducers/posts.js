import {
  CREATE,
  FETCH_ALL,
  FETCH_BY_SEARCH,
  FETCH_POST,
  COMMENT,
  UPDATE,
  DELETE,
  LIKE,
  LOADING,
  LOADED,
} from "../constants/actionTypes";

const reducer = (state = { isLoading: true, posts: [] }, action) => {
  switch (action.type) {
    case LOADING:
      return { ...state, isLoading: true };
    case LOADED:
      return { ...state, isLoading: false };
    case FETCH_ALL:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberofPages: action.payload.numberofPages,
      };
    case FETCH_BY_SEARCH:
      return { ...state, posts: action.payload.data };
    case FETCH_POST:
      return { ...state, post: action.payload };
    case CREATE:
      return { ...state, posts: [...state.posts, action.payload] };
    case COMMENT:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post._id === action.payload.id) return action.payload;
          return post;
        }),
      };
    case UPDATE:
    case LIKE:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case DELETE:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload._id),
      };

    default:
      return state;
  }
};

export default reducer;
