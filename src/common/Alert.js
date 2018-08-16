import React from "react";

// Usage:
//   <Alert>
//     Text message.
//   </Alert>
//
// Or with a category:
//   <Alert category="primary">
//     Text message.
//   </Alert>
//
// The `category` value can be:
//
// - primary
// - secondary
// - warning
// - success
// - info
// - danger

const Alert = ({ category, children }) => {
  let className = category ? `alert alert__${category}` : "alert";
  return <div className={className}>{children}</div>;
};

export default Alert;
