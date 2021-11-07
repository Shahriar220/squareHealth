import axios from "axios";
import {
  APPOINTMENT_REQUEST,
  APPOINTMENT_REQUEST_SUCCESS,
  APPOINTMENT_REQUEST_FAILED,
} from "../types";
const URL_SERV = "http://localhost:3004";
export const postAppointment = (data) => async (dispatch) => {
  dispatch({ type: APPOINTMENT_REQUEST });
  try {
    const res = await axios.post(`${URL_SERV}/schedule`, {
      doctorId: data.selectedDoctorId,
      date: data.startDate,
      name: data.name,
      phone: data.phoneNumber,
      reason: data.visitReason,
    });
    dispatch({ type: APPOINTMENT_REQUEST_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: APPOINTMENT_REQUEST_FAILED, payload: error });
  }
};
