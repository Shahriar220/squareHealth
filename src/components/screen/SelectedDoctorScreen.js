import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";

import { getDoctorById } from "../../redux/actions/doctorsAction";
import { postAppointment } from "../../redux/actions/usersAction";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import moment from "moment";

const SelectedDoctorScreen = (props) => {
  const formik = useFormik({
    initialValues: { name: "", phoneNumber: "", visitReason: "" },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      phoneNumber: Yup.number().required("Phone number is required"),
      visitReason: Yup.string().required("Visit Reason is Required"),
    }),
    onSubmit: (values, { resetForm }) => {
      handleSubmit(values);
    },
  });
  const handleSubmit = (values, startDate) => {
    const date = startDate;
    const format1 = "YYYY-MM-DD HH:mm:ss";
    const data = {
      date: moment(date).format(format1),
      name: values.name,
      phoneNumber: values.phoneNumber,
      visitReason: values.visitReason,
    };
    dispatch(postAppointment(data));
  };
  // const [name, setName] = useState("");
  // const [phoneNumber, setPhoneNumber] = useState();
  // const [visitReason, setVisitReason] = useState("");
  const [startDate, setStartDate] = useState(
    setHours(setMinutes(new Date(), 30), 16)
  );
  const [display, setDisplay] = useState(false);
  const doctorState = useSelector((state) => state.singleDoctorReducer);
  const dispatch = useDispatch();
  const { doctor, error, loading } = doctorState;
  const id = props.match.params.id;
  useEffect(() => {
    dispatch(getDoctorById(id));
  }, [dispatch, id]);
  const errorHelper = (formik, values) => ({
    error: formik.errors[values] && formik.touched[values] ? true : false,
    helperText:
      formik.errors[values] && formik.touched[values]
        ? formik.errors[values]
        : null,
  });
  // function Appointment() {
  //   const data = {
  //     startDate,
  //     name,
  //     phoneNumber,
  //     visitReason,
  //   };
  //   if(data.name===""){
  //     console.log(error)
  //   }
  //   dispatch(postAppointment(data));
  //   setDisplay(false);
  //   setName("");
  //   setPhoneNumber("");
  //   setVisitReason("");
  // }
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
      <div id="datepicker-container">
        <div id="datepicker-center">
          <div id="datepicker">
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
            <button
              style={{ marginTop: "20px" }}
              onClick={() => setDisplay(true)}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <div>
        {startDate && display && (
          <div className="row justify-content-center mt-5">
            <div className="col-md-5 mt-5 mb-4 text-left shadow p-3 mb-5 bg-white rounded">
              <div>
                <input
                  required
                  type="text"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mb-3 form-control"
                />
                <input
                  required
                  type="text"
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
