import * as React from "react";
import { memo } from "react";

const SvgDocument = (props) => (
  <svg
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 52 52"
    aria-hidden="true"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M26.567 3.89 32.544 8H42a1 1 0 0 1 1 1v6.188l6.566 4.514a1 1 0 0 1 .434.824V47a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V20.526a1 1 0 0 1 .433-.824L9 15.188V9a1 1 0 0 1 1-1h9.455l5.979-4.11a1 1 0 0 1 1.133 0zM22.985 8h6.03L26 5.927 22.985 8zM9 17.615l-5 3.437v.323l5 3.438v-7.198zm2 8.573 10.537 7.244 2.873-1.796a3 3 0 0 1 3.18 0l2.873 1.796L41 26.188V10H11v16.188zm32-1.375 5-3.438v-.323l-5-3.437v7.198zm5-1.01L32.313 34.586 48 44.392v-20.59zM4 44.391l15.687-9.805L4 23.802v20.59zm21.47-11.06L5.2 46h41.6L26.53 33.332a1 1 0 0 0-1.06 0z"
      fill="#4E6896"
    />
    <path
      d="M16 17c0-.552.471-1 1.053-1h17.894c.582 0 1.053.448 1.053 1s-.471 1-1.053 1H17.053C16.47 18 16 17.552 16 17zm1.053 5C16.47 22 16 22.448 16 23s.471 1 1.053 1h17.894C35.53 24 36 23.552 36 23s-.471-1-1.053-1H17.053z"
      fill="#FF7067"
    />
  </svg>
);

const Memo = memo(SvgDocument);
export default Memo;
