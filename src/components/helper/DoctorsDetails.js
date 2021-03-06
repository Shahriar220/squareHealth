import React, { useState } from "react";
import { Modal } from "react-bootstrap";

import { LinkContainer } from "react-router-bootstrap";
import { Button } from "react-bootstrap";
export default function DoctorsDetails({ doctor }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className="mb-8 p-3 shadow-sm p-3 mb-5 bg-white rounded">
      <div onClick={handleShow}>
        <h1 className="mb-1 mt-1">{doctor.name}</h1>
        <img
          src={doctor.imageUrl}
          style={{ height: "150px", width: "150px" }}
          alt="images"
          className="img-fluid"
        />
      </div>

      <div className="flex-container">
        <div className="w-1">
          <h4>{doctor.org}</h4>
        </div>
      </div>
      <div className="flex-container">
        <Button
          style={{ maxWidth: "100px", marginRight: "10px" }}
          variant="light"
          onClick={handleShow}
        >
          Show More
        </Button>
        <div className="flex-container">
          <LinkContainer to={`/${doctor.id}`} className="">
            <Button variant="light" style={{ maxWidth: "100px" }}>
              Take AppointMent
            </Button>
          </LinkContainer>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton onClick={() => setShow(false)}>
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
          <Button
            style={{ maxWidth: "100px", marginTop: "17px" }}
            variant="secondary"
            onClick={handleClose}
          >
            Close
          </Button>
          <LinkContainer to={`/${doctor.id}`} className="mt-3">
            <Button style={{ maxWidth: "100px" }} variant="light">
              Take AppointMent
            </Button>
          </LinkContainer>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
