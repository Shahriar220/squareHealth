import axios from "axios";
import {
  GET_DOCTOR_REQUEST,
  GET_DOCTORS_REQUEST_SUCCESS,
  GET_DOCTOR_REQUEST_FAILED,
  GET_SINGLE_DOCTOR_REQUEST,
  GET_SINGLE_DOCTOR_REQUEST_SUCCESS,
  GET_SINGLE_DOCTOR_REQUEST_FAILED,
} from "../types";
const URL_SERV = "http://localhost:3004";

export const getDoctor = () => async (dispatch) => {
  dispatch({ type: GET_DOCTOR_REQUEST });
  try {
    const response = await axios.get(`${URL_SERV}/doctors`);
    console.log(response);
    dispatch({ type: GET_DOCTORS_REQUEST_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: GET_DOCTOR_REQUEST_FAILED, payload: error });
  }
};

export const getDoctorById = (id) => async (dispatch) => {
  dispatch({ type: GET_SINGLE_DOCTOR_REQUEST });
  try {
    const response = await axios.get(`${URL_SERV}/doctors/${id}`);
    //console.log(response.data);

    dispatch({
      type: GET_SINGLE_DOCTOR_REQUEST_SUCCESS,
      payload: [response.data],
    });
  } catch (error) {
    dispatch({ type: GET_SINGLE_DOCTOR_REQUEST_FAILED, payload: error });
  }
};
