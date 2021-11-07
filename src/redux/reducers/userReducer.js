import {
  APPOINTMENT_REQUEST,
  APPOINTMENT_REQUEST_SUCCESS,
  APPOINTMENT_REQUEST_FAILED,
} from "../types";
export const userReducer = (state = { reason: [] }, action) => {
  switch (action.type) {
    case APPOINTMENT_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case APPOINTMENT_REQUEST_SUCCESS:
      return {
        loading: false,
        reason: action.payload,
      };
    case APPOINTMENT_REQUEST_FAILED:
      return {
        success: false,
        err: action.payload,
      };
    default:
      return state;
  }
};
