import React from "react";

export default function Card({ children, ...props }) {
  return (
    <ul className="card-wrapper" {...props}>
      {children}
    </ul>
  );
}
