import { signIn, signUp } from "../api";

import { AUTH } from "../constants/actionTypes";

export const signup = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await signUp(formData);
    dispatch({ type: AUTH, data });

    navigate("/");
  } catch (error) {
    console.log(error);
  }
};

export const signin = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await signIn(formData);
    dispatch({ type: AUTH, data });

    navigate("/");
  } catch (error) {
    console.log(error);
  }
};
