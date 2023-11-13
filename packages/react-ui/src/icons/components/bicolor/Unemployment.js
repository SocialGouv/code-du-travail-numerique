import * as React from "react";
import { memo } from "react";

const SvgUnemployment = (props) => (
  <svg
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 52 52"
    aria-hidden="true"
    {...props}
  >
    <g
      clipPath="url(#unemployment_svg__a)"
      fillRule="evenodd"
      clipRule="evenodd"
    >
      <path
        d="M42.172 26.548H33.43a.5.5 0 0 0-.5.5v2.14h9.742v-2.14a.5.5 0 0 0-.5-.5zm-10.742.5v2.14h-6.08a1.75 1.75 0 0 0-1.75 1.75v14.507c0 .967.784 1.75 1.75 1.75h24.901a1.75 1.75 0 0 0 1.75-1.75V43.35a.75.75 0 0 0-1.5 0v2.095a.25.25 0 0 1-.25.25h-24.9a.25.25 0 0 1-.25-.25V35.151h7.293c.196-.358.427-.693.69-1h-7.983v-3.213a.25.25 0 0 1 .25-.25h6.079v.04h12.742v-.04h6.079a.25.25 0 0 1 .25.25v3.213h-8.58c.263.307.495.642.69 1h7.89v1.944a.75.75 0 0 0 1.5 0v-6.157a1.75 1.75 0 0 0-1.75-1.75h-6.079v-2.14a2 2 0 0 0-2-2H33.43a2 2 0 0 0-2 2zm19.82 12.587a.75.75 0 0 1 .75.75v.128a.75.75 0 0 1-1.5 0v-.128a.75.75 0 0 1 .75-.75z"
        fill="#FF7067"
      />
      <path
        d="M40.837 39.692a4.202 4.202 0 1 1 .567-.826l2.979 2.29a.5.5 0 1 1-.61.792l-2.936-2.256zm.043-2.772a3.202 3.202 0 1 1-6.403 0 3.202 3.202 0 0 1 6.403 0zM8.49 15.038a11.03 11.03 0 0 0 5.19 9.362C6.051 24.829 0 31.15 0 38.883v7.57h22.318v-1.675H1.674v-5.895c0-7.087 5.745-12.832 12.833-12.832h4.277a11.177 11.177 0 0 0 1.488 0h4.278c2 0 3.892.457 5.58 1.273v-1.835a14.43 14.43 0 0 0-4.753-1.089 11.03 11.03 0 0 0 5.189-9.362C30.566 8.942 25.624 4 19.528 4S8.49 8.942 8.49 15.038zm20.402 0c0 4.94-3.827 8.988-8.679 9.339h-1.37c-4.851-.351-8.679-4.398-8.679-9.34a9.364 9.364 0 0 1 18.728 0z"
        fill="#4E6896"
      />
    </g>
    <defs>
      <clipPath id="unemployment_svg__a">
        <path d="M0 0h52v52H0V0z" fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);

const Memo = memo(SvgUnemployment);
export default Memo;