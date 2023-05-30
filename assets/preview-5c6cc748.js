import{$ as s,j as t,L as d}from"./styled-components.browser.esm-41178855.js";import{s as o,f as i,a as n,c as a,d as g}from"./theme-dc888197.js";import{W as c}from"./index-168363df.js";import"./index-8db94870.js";import"./_commonjsHelpers-042e6b4d.js";import"./polished.esm-d698528e.js";import"./index-1fc0ca9a.js";const f=s`
  button {
    font-family: 'Open Sans', sans-serif;
  }
`,p=s`
  figure {
    margin: 0;
  }
  figcaption {
    margin-top: ${o.base}
  }
`,x=s`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: ${o.large};
    margin-bottom: ${o.medium};
    color: ${({theme:e})=>e.title};
    line-height: ${i.lineHeightTitle};
    @media (max-width: ${n.mobile}) {
      margin-top: ${o.medium};
      margin-bottom: ${o.small};
    }
  }

  h1, h2 {
    font-weight: normal;
    font-family: 'Merriweather', serif;
  }

  h1 {
    margin-top: 0;
    margin-bottom: ${o.xmedium};
    font-size: ${i.sizes.headings.large};
    @media (max-width: ${n.mobile}) {
      margin-bottom: ${o.base};
      font-size: ${i.sizes.headings.mobileMedium};
    }
  }

  h2 {
    font-size: ${i.sizes.headings.medium};
    @media (max-width: ${n.mobile}) {
      font-size: ${i.sizes.headings.xmedium};
    }
  }

  h3, h4, h5, h6 {
    font-family: "Open Sans", sans-serif;
  }

  h3 {
    font-weight: 600;
    font-size: ${i.sizes.headings.small};
    @media (max-width: ${n.mobile}) {
      font-size: ${i.sizes.default};
    }
  }

  h4 {
    font-weight: normal;
    font-size: ${i.sizes.headings.small};
    @media (max-width: ${n.mobile}) {
      font-size: ${i.sizes.default};
    }
  }
  h5, h6 {
    font-weight: 600;
    font-size: ${i.sizes.small};
  }
`,$=s`
  a {
    color: ${({theme:e})=>e.paragraph};
    font-weight: 600;
    font-family: 'Open Sans', sans-serif;
    text-decoration: underline;
    text-decoration-color: ${({theme:e})=>e.primary};
    transition: color ${a.transitionTiming} linear, text-decoration ${a.transitionTiming} linear;
    @media print {
      text-decoration: none;
    }
  }

  a:focus,
  a:hover,
  a:active {
    color: ${({theme:e})=>e.primary};
  }

  a:visited {
    text-decoration-color: ${({theme:e})=>e.secondary};
  }
  a[target="_blank"]:not(.no-after):after,
  a[href^="http://"]:not(.no-after):not([href*="social.gouv.fr"]):after,
  a[href^="https://"]:not(.no-after):not([href*="social.gouv.fr"]):after{
    position: relative;
    top: 2px;
    width: 16px;
    height: 23px;
    margin-left: 5px;
    content: url("/static/assets/icons/external.svg");
    @media print {
      margin-left: 0;
      content: " (" attr(href) ") ";
    }
  }
  :target::before {
    position: relative;
    z-index: -1;
    display: block;
    height: 14rem; /* Fixed header's height */
    margin-top: -14rem; /* Fixed header's negative height */
    visibility: hidden;
    content: "";
    pointer-events: none;
    @media (max-width: ${n.mobile}) {
      height: 12rem;
      margin-top: -12rem;
    }
  }
`,b=s`
  ul, ol {
    display: block;
    margin: ${o.small} 0;
    padding: 0 0 0 2rem;
  }
  ul {
    list-style-type: disc;
    ul {
      list-style-type: circle;
    }
  }
  ol {
    list-style-type: decimal;
    ol {
      list-style-type: upper-latin;
    }
  }
`,u=s`
  p {
    margin: ${o.base} 0;
  }
`,z=s`
  *,
  *:after,
  *:before {
    box-sizing: border-box;
  }
`,y=s`
  html {
    font-size: 62.5%;
    /* http://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/ */
    line-height: ${i.lineHeight};
    text-size-adjust: 100%; /* Prevent font scaling in landscape while allowing user zoom. */
    -webkit-font-smoothing: antialiased;
  }

  body {
    margin: 0;
    color: ${({theme:e})=>e.paragraph};
    font-size: ${i.sizes.default};
    font-family: 'Open Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    background-color: ${({theme:e})=>e.white};
    @media (max-width: ${n.mobile}) {
      font-size: ${i.sizes.small};
    }
    @media print {
      font-size: 10pt;
    }
  }

  main {
    /* https://stackoverflow.com/questions/35820429/main-element-not-working-in-internet-explorer-11 */
    display: block;
  }
  :root {
    ${({theme:e})=>Object.entries(e).reduce((l,[m,h])=>l+=`--color-${m}: ${h};
      `,"")};
  }
`,r=()=>t.jsxs(t.Fragment,{children:[t.jsx(f,{}),t.jsx(p,{}),t.jsx(x,{}),t.jsx($,{}),t.jsx(b,{}),t.jsx(u,{}),t.jsx(z,{}),t.jsx(y,{})]});r.__docgenInfo={description:"",methods:[],displayName:"GlobalStyles"};const w=e=>t.jsxs(d,{theme:g,children:[t.jsx(r,{}),t.jsx(c,{children:t.jsx(e,{})})]}),j=[w],R={decorators:j,parameters:{actions:{argTypesRegex:"^on[A-Z].*"},controls:{matchers:{color:/(background|color)$/i,date:/Date$/}}}};export{R as default};
//# sourceMappingURL=preview-5c6cc748.js.map
