import React from "react";

export default function Card({ children, ...props }) {
  return (
    <li className="card" {...props}>
      {children}
    </li>
  );
}
