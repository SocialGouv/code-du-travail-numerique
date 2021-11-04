import * as React from "react";

function SvgOups(props) {
  return (
    <svg
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 57 57"
      aria-hidden="true"
      {...props}
    >
      <g clipPath="url(#oups_svg__clip0)">
        <path
          d="M18.031 37.17s4.008 5.343 10.688 5.343c6.68 0 10.687-5.343 10.687-5.343M12.942 26.228s1.527-2.036 4.071-2.036c2.545 0 4.072 2.036 4.072 2.036m-10.179-5.37s1.483.387 3.183-.48c1.7-.866 2.259-2.293 2.259-2.293m24.538 0s.558 1.427 2.259 2.293c1.7.866 3.183.48 3.183.48m-8.958 5.37s1.527-2.036 4.072-2.036 4.071 2.036 4.071 2.036"
          stroke="#4E6896"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M50.158 14.562a25.599 25.599 0 014.28 14.21c0 14.204-11.515 25.72-25.72 25.72C14.516 54.491 3 42.975 3 28.771 3 14.568 14.515 3.054 28.719 3.054c3.803 0 7.414.825 10.663 2.307l1.63-1.44a27.605 27.605 0 00-12.293-2.867C13.41 1.054 1 13.464 1 28.772c0 15.309 12.41 27.72 27.719 27.72 15.308 0 27.718-12.411 27.718-27.72a27.59 27.59 0 00-4.767-15.547l-1.512 1.337z"
          fill="#4E6896"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M44.623-.65l-5.346 10.962a4.5 4.5 0 008.918.699L44.623-.652zm2.566 11.587l-2.777-8.903-4.13 8.362a3.5 3.5 0 006.907.541z"
          fill="#FF7067"
        />
      </g>
      <defs>
        <clipPath id="oups_svg__clip0">
          <path fill="#fff" d="M0 0h57v57H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}

const MemoSvgOups = React.memo(SvgOups);
export default MemoSvgOups;
