import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useDispatch, useSelector } from "react-redux";
import Error from "../Utils/Error";
import { getDoctorById } from "../../redux/actions/doctorsAction";
import Loading from "../Utils/Loading";
const SelectedDoctorScreen = (props) => {
  const [date, setDate] = useState(null);
  const doctorState = useSelector((state) => state.singleDoctorReducer);
  const dispatch = useDispatch();
  const { doctor, error, loading } = doctorState;
  useEffect(() => {
    dispatch(getDoctorById(props.match.params.id));
  }, [dispatch, props.match.params.id]);
  return (
    <div>
      <Calendar onChange={setDate} defaultActiveStartDate date={date} />
    </div>
  );
};

export default SelectedDoctorScreen;
