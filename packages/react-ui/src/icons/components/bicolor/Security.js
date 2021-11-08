import * as React from "react";

function SvgSecurity(props) {
  return (
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
        d="M16.728 3c-1.303 0-2.36 1.072-2.36 2.394v7.98c0 1.322 1.057 2.394 2.36 2.394h1.573c1.303 0 2.359-1.072 2.359-2.394v-7.98C20.66 4.072 19.604 3 18.3 3h-1.572zm1.573 1.596h-1.573a.792.792 0 00-.786.798v7.98c0 .44.352.798.786.798h1.573a.792.792 0 00.786-.798v-7.98a.792.792 0 00-.786-.798z"
        fill="#FF7067"
      />
      <path
        d="M13.337 6.783c-2.934 1.231-5.009 4.063-5.238 7.374l-.719-.014a1.584 1.584 0 00-1.603 1.596v1.763c0 .882.705 1.596 1.573 1.596h20.44c.868 0 1.572-.714 1.572-1.596v-1.779c0-.881-.704-1.596-1.573-1.596h-.858c-.224-3.267-2.252-6.067-5.128-7.315v1.774a7.031 7.031 0 013.575 6.144c0 .549.439.993.98.993h1.431v1.78H7.35v-1.764l1.302.025a.987.987 0 00.998-.994 7.063 7.063 0 013.687-6.225V6.783zm23.155 17.763c.225 0 .435.121.558.321l3.398 5.547c.2.327.113.764-.195.976a.643.643 0 01-.92-.207l-2.841-4.636-12.368 20.185H48.86l-5.606-9.149a.732.732 0 01.196-.976.643.643 0 01.92.207l6.274 10.24a.743.743 0 01.027.721.66.66 0 01-.585.37H22.898a.66.66 0 01-.585-.37.743.743 0 01.027-.721l13.594-22.187a.657.657 0 01.558-.32z"
        fill="#FF7067"
      />
      <path
        d="M41.815 34.933c.368 0 .666-.316.666-.706 0-.39-.298-.706-.666-.706-.367 0-.665.316-.665.706 0 .39.298.706.665.706z"
        fill="#FF7067"
      />
      <path
        d="M26.165 22.15a8.814 8.814 0 01-2.713 6.385 8.66 8.66 0 01-2.329 1.596h2.683a10.083 10.083 0 016.198 2.123l-.846 1.355a8.644 8.644 0 00-1.318-.871 8.51 8.51 0 00-4.034-1.011H11.223c-4.777 0-8.65 3.93-8.65 8.778v6.384H20.87l-.232.371a.806.806 0 00.232 1.095.77.77 0 00.432.13H1v-7.98c0-5.649 4.45-10.243 9.985-10.371l.238-.003h2.683a8.68 8.68 0 01-2.328-1.596 8.814 8.814 0 01-2.712-6.558 8.894 8.894 0 01.324-2.22h1.65a7.232 7.232 0 00-.403 2.394c0 .37.027.734.08 1.09.518 3.45 3.454 6.092 6.997 6.092 3.553 0 6.494-2.656 7-6.117a7.348 7.348 0 00-.325-3.46h1.65a8.895 8.895 0 01.326 2.395zm9.437 10.686c0-.612.468-1.11 1.045-1.11.578 0 1.046.498 1.046 1.11v6.656c0 .613-.468 1.11-1.046 1.11-.577 0-1.045-.497-1.045-1.11v-6.656zm0 9.984c0-.612.468-1.109 1.045-1.109.578 0 1.046.497 1.046 1.11 0 .612-.468 1.109-1.046 1.109-.577 0-1.045-.497-1.045-1.11z"
        fill="#4E6896"
      />
    </svg>
  );
}

const MemoSvgSecurity = React.memo(SvgSecurity);
export default MemoSvgSecurity;
