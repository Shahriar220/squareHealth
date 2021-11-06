import {
  GET_DOCTOR_REQUEST,
  GET_DOCTORS_REQUEST_SUCCESS,
  GET_DOCTOR_REQUEST_FAILED,
  GET_SINGLE_DOCTOR_REQUEST,
  GET_SINGLE_DOCTOR_REQUEST_SUCCESS,
  GET_SINGLE_DOCTOR_REQUEST_FAILED,
} from "../types";
export const getDoctorReducer = (state = { doctors: [] }, action) => {
  switch (action.type) {
    case GET_DOCTOR_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case GET_DOCTORS_REQUEST_SUCCESS:
      return {
        loading: false,
        doctors: action.payload,
      };
    case GET_DOCTOR_REQUEST_FAILED:
      return {
        error: action.payload,
        loading: true,
      };
    default:
      return state;
  }
};

export const singleDoctorReducer = (state = { doctor: [] }, action) => {
  switch (action.type) {
    case GET_SINGLE_DOCTOR_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case GET_SINGLE_DOCTOR_REQUEST_SUCCESS:
      return {
        doctor: action.payload,
      };
    case GET_SINGLE_DOCTOR_REQUEST_FAILED:
      return {
        error: action.payload,
        loading: true,
      };
    default:
      return state;
  }
};
