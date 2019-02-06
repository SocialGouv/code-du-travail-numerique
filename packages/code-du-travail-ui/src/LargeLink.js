import React from "react";

export default function LargeLink(props) {
  return (
    //eslint-disable-next-line jsx-a11y/anchor-has-content
    <a className="btn-large" {...props} />
  );
}
