import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import getDay from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import Error from "../Utils/Error";
import { getDoctorById } from "../../redux/actions/doctorsAction";
import { postAppointment } from "../../redux/actions/usersAction";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import Loading from "../Utils/Loading";

const SelectedDoctorScreen = (props) => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState();
  const [visitReason, setVisitReason] = useState("");
  const [startDate, setStartDate] = useState(
    setHours(setMinutes(new Date(), 30), 16)
  );
  const doctorState = useSelector((state) => state.singleDoctorReducer);
  const dispatch = useDispatch();
  const { doctor, error, loading } = doctorState;
  const id = props.match.params.id;
  useEffect(() => {
    dispatch(getDoctorById(id));
  }, [dispatch, id]);

  function Appointment() {
    const data = {
      startDate,
      name,
      phoneNumber,
      visitReason,
    };
    dispatch(postAppointment(data));
    setName("");
    setPhoneNumber();
    setVisitReason("");
  }
  //sunday=0,monday=1,tuesday=2,wednesday=3,thursday=4,friday=5,saturday=6
  // const filterDay = (date) => {
  //   const day = getDay(date);
  //   return day !== 2 && day !== 5 && day !== 6;
  // const i = id;
  // if (i === 1) {
  //   return day !== 1 && day !== 2 && day !== 4 && day !== 5 && day !== 6;
  // } else {
  //   return day !== 3 && day !== 4 && day !== 5 && day !== 6;
  // }
  return (
    <div>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        minDate={new Date()}
        filterDate={(date) => date.getDay() !== 4 && date.getDay !== 5}
        showTimeSelect
        timeFormat="p"
        timeIntervals={15}
        placeholderText="Select a date and time"
      />
      <div>
        {startDate && (
          <div className="row justify-content-center mt-5">
            <div className="col-md-5 mt-5 mb-4 text-left shadow p-3 mb-5 bg-white rounded">
              <div>
                <input
                  required
                  type="text"
                  placeholder="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mb-3 form-control"
                />
                <input
                  required
                  type="number"
                  placeholder="Enter Phone Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="mb-3 form-control"
                />
                <input
                  required
                  type="text"
                  placeholder="Visit Reason"
                  className="form-control mb-3"
                  value={visitReason}
                  onChange={(e) => setVisitReason(e.target.value)}
                />

                <button className="btn mt-3 mb-4" onClick={Appointment}>
                  Take Appointment
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectedDoctorScreen;
