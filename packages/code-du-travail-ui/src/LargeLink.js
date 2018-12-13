import React from "react";

export default function LargeLink({ children, ...props }) {
  return (
    <a className="btn-large" {...props}>
      {children}
    </a>
  );
}
