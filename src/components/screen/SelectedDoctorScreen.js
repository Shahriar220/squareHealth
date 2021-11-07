import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { getDoctorById } from "../../redux/actions/doctorsAction";
import { postAppointment } from "../../redux/actions/usersAction";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import moment from "moment";
import Success from "../Utils/Success";
import Error from "../Utils/Error";
import Loading from "../Utils/Loading";

const SelectedDoctorScreen = (props) => {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [visitReason, setVisitReason] = useState("");
  const [visitReasonError, setVisitReasonError] = useState("");
  const [startDate, setStartDate] = useState(
    setHours(setMinutes(new Date(), 30), 16)
  );
  const [display, setDisplay] = useState(false);
  const doctorState = useSelector((state) => state.singleDoctorReducer);
  const dispatch = useDispatch();
  const appointState = useSelector((state) => state.userReducer);
  const { success, err } = appointState;

  const { doctor, error, loading } = doctorState;
  const id = props.match.params.id;
  useEffect(() => {
    dispatch(getDoctorById(id));
  }, [dispatch, id]);

  function Appointment() {
    const data = {
      selectedDoctorId: id,
      startDate: moment(startDate).format("YYYY-MM-DD HH:mm:ss"),
      name,
      phoneNumber,
      visitReason,
    };
    const isValid = formValidation();
    if (isValid) {
      dispatch(postAppointment(data));
      setDisplay(false);
      setName("");
      setPhoneNumber("");
      setVisitReason("");
    }
  }

  const formValidation = () => {
    const nameError = {};
    const phoneNumberError = {};
    const visitReasonError = {};
    let isValid = true;
    if (name.trim().length < 2) {
      nameError.nameShort = "Name is too Short";
      isValid = false;
    }
    if (phoneNumber.trim().length < 5) {
      phoneNumberError.phoneNumberError = "Enter valid Number";
      isValid = false;
    }
    if (visitReason.trim().length < 2) {
      visitReasonError.visitReasonError = "Too short reason";
      isValid = false;
    }

    setNameError(nameError);
    setVisitReasonError(visitReasonError);
    setPhoneNumberError(phoneNumberError);
    return isValid;
  };

  return (
    <div>
      <div className="row no-gutters">
        <div className="col-md-3 no-gutters">
          {loading && <Loading />}
          {error && <Error error={"something went wrong"} />}
          <div className="leftside">
            {doctor.map((i, j) => {
              return (
                <div key={j}>
                  <h1
                    style={{
                      height: "100px",
                      border: "10px",
                      marginLeft: "30px",
                    }}
                  >
                    {i.name}
                  </h1>
                  <img
                    src={i.imageUrl}
                    alt=""
                    style={{
                      borderRadius: "50%",
                      height: "150px",
                      width: "200px",
                      marginLeft: "25px",
                    }}
                  />
                  <p
                    style={{
                      marginTop: "20px",
                      marginLeft: "25px",
                      textShadow: "none",
                    }}
                  >
                    {i.description}
                  </p>

                  <p
                    style={{
                      marginLeft: "25px",
                      textShadow: "none",
                    }}
                  >
                    Visit Duration:{i.visitDurationInMin}minutes
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="col-md-7 no-gutter">
          <div className="rightside">
            <div id="datepicker-container">
              <div id="datepicker-center">
                <div id="datepicker" style={{ marginTop: "100px" }}>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    minDate={new Date()}
                    filterDate={(date) =>
                      date.getDay() !== 4 && date.getDay !== 5
                    }
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
              {startDate !== null && display && (
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
                      {Object.keys(nameError).map((key) => {
                        return (
                          <div style={{ color: "red" }}>{nameError[key]}</div>
                        );
                      })}
                      <input
                        required
                        type="text"
                        placeholder="Enter Phone Number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="mb-3 form-control"
                      />
                      {Object.keys(phoneNumberError).map((key) => {
                        return (
                          <div style={{ color: "red" }}>
                            {phoneNumberError[key]}
                          </div>
                        );
                      })}
                      <input
                        required
                        type="text"
                        placeholder="Visit Reason"
                        className="form-control mb-3"
                        value={visitReason}
                        onChange={(e) => setVisitReason(e.target.value)}
                      />
                      {Object.keys(visitReasonError).map((key) => {
                        return (
                          <div style={{ color: "red" }}>
                            {visitReasonError[key]}
                          </div>
                        );
                      })}
                      <button className="btn mt-3 mb-4" onClick={Appointment}>
                        Take Appointment
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {err && <Error error={"Something went wrong"} />}
              {success && (
                <Success success={"appointment successfully taken"} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectedDoctorScreen;
