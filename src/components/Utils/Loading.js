import React from "react";
export default function Loading() {
  return (
    <div className="text-center">
      <div
        className="spinner-border"
        role="status"
        style={{ height: "2000px", width: "200px", marginTop: "100px" }}
      ></div>
    </div>
  );
}
