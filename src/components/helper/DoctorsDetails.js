import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Button } from "react-bootstrap";
export default function DoctorsDetails({ doctor }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className="mb-8 p-3 shadow-sm p-3 mb-5 bg-white rounded">
      <div onClick={handleShow}>
        <img
          src={doctor.imageUrl}
          style={{ height: "150px", width: "150px" }}
          alt=""
          className="img-fluid"
        />
        <h1 className="mb-1 mt-1">Doctors Name: {doctor.name}</h1>
      </div>
      <div className="flex-container"></div>
      <div className="flex-container">
        <div className="w-1">
          <h4>Doctors Organization: {doctor.org}</h4>
        </div>
      </div>
      <div className="flex-container">
        <Button variant="primary" onClick={handleShow}>
          Show More
        </Button>
        <div className="w-1">
          <LinkContainer to={`/${doctor.id}`} className="mt-3">
            <Button variant="light">Take AppointMent</Button>
          </LinkContainer>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton onClick={handleClose}>
          <Modal.Title>{doctor.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={doctor.imageUrl}
            style={{ height: "150px", width: "150px" }}
            alt=""
            className="img-fluid"
          />
          <p>{doctor.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <LinkContainer to={`/${doctor.id}`} className="mt-3">
            <Button variant="light">Take AppointMent</Button>
          </LinkContainer>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
