import Head from "next/head";
import Script from "next/script";

export const DsfrLayout = ({ children }) => {
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="/_next/static/dsfr/node_modules/@gouvfr/dsfr/dist/dsfr.min.css"
        />
        <link
          rel="stylesheet"
          href="/_next/static/dsfr/node_modules/@gouvfr/dsfr/dist/utility/utility.min.css"
        />
      </Head>
      {children}
      <Script
        type="module"
        src="/_next/static/dsfr/node_modules/@gouvfr/dsfr/dist/dsfr.module.min.js"
      ></Script>
      <Script
        type="text/javascript"
        noModule
        src="/_next/static/dsfr/node_modules/@gouvfr/dsfr/dist/dsfr.nomodule.min.js"
      ></Script>
    </>
  );
};
