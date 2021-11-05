import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDoctor } from "../../redux/actions/doctorsAction";
import Loading from "../Utils/Loading";
import Error from "../Utils/Error";
import DoctorsDetails from "../helper/DoctorsDetails";
const DoctorsScreen = () => {
  const dispatch = useDispatch();
  const doctorState = useSelector((state) => state.getDoctorReducer);
  const { doctors, error, loading } = doctorState;
  useEffect(() => {
    dispatch(getDoctor());
  }, [dispatch]);
  return (
    <div>
      <div className="row justify-content-center">
        {loading ? (
          <Loading />
        ) : error ? (
          <Error error="Something went wrong" />
        ) : (
          doctors.map((doctor) => {
            return (
              <div
                className="pizza col-3 m-3"
                key={doctor.id}
                style={{ height: "400px", width: "400px" }}
              >
                <div key={doctor.id}>
                  <DoctorsDetails doctor={doctor} />
                </div>
              </div>
            );
          })
        )}
      </div>
      <br />
    </div>
  );
};

export default DoctorsScreen;
