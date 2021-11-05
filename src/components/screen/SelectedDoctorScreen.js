import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Error from "../Utils/Error";
import { getDoctorById } from "../../redux/actions/doctorsAction";
import Loading from "../Utils/Loading";
const SelectedDoctorScreen = (props) => {
  const doctorState = useSelector((state) => state.singleDoctorReducer);
  const dispatch = useDispatch();
  const { doctor, error, loading } = doctorState;
  useEffect(() => {
    dispatch(getDoctorById(props.match.params.id));
  }, [dispatch, props.match.params.id]);
  return (
    <div>
      {doctor.map((item) => {
        return <h1>{item.name}</h1>;
      })}
    </div>
  );
};

export default SelectedDoctorScreen;
