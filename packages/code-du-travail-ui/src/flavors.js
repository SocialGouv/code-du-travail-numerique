import PropTypes from "prop-types";

export const flavors = [
  "primary",
  "secondary",
  "warning",
  "success",
  "info",
  "danger"
];

// return the 1st truthy prop that is one of an Button versions
export const getFlavor = (props, prefix = "btn") => {
  const versionProps = Object.keys(props).filter(
    // ensure value is truthy
    flavor => flavors.indexOf(flavor) > -1 && !!props[flavor]
  );
  return (versionProps.length && `${prefix}__${versionProps[0]}`) || "";
};

// remove falsy values
export const cleanProps = props =>
  Object.keys(props)
    .filter(key => flavors.indexOf(key) > -1)
    .reduce(
      (newProps, key) => ({
        ...newProps,
        [key]: props[key].toString() || undefined
      }),
      { ...props }
    );

export const propTypes = {
  /** use .btn.btn__primary */
  primary: PropTypes.bool,
  /** use .btn.btn__secondary */
  secondary: PropTypes.bool,
  /** use .btn.btn__warning */
  warning: PropTypes.bool,
  /** use .btn.btn__success */
  success: PropTypes.bool,
  /** use .btn.btnrt__info */
  info: PropTypes.bool,
  /** use .btn.btn__danger */
  danger: PropTypes.bool,
  style: PropTypes.object
};

export const defaultProps = {
  primary: false,
  secondary: false,
  warning: false,
  success: false,
  info: false,
  danger: false
};
