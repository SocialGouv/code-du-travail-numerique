import{P as d}from"./index-1fc0ca9a.js";import{s as n,A as o}from"./styled-components.browser.esm-41178855.js";import{s as e,b as i,a as s}from"./theme-2d6880ff.js";const t=n.div`
  padding: ${e.medium} ${e.xmedium};
  color: ${({theme:r})=>r.paragraph};
  border-radius: ${i.borderRadius};
  ${r=>{if(r.size==="large")return o`
        padding: ${e.larger};
      `}}
  ${r=>{if(r.variant==="light")return o`
        border: ${({theme:a})=>i.border(a.border)};
        background-color: ${r.theme.white};
      `;if(r.variant==="dark")return o`
        background-color: ${({theme:a})=>a.bgSecondary};
        border: ${({theme:a})=>i.border(a.noColors?a.border:a.bgSecondary)};
      `;if(r.variant==="main")return o`
        position: relative;
        padding: ${e.larger};
        background-color: ${r.theme.white};
        &:before {
          position: absolute;
          top: 0;
          left: 0;
          z-index: -1;
          width: 100%;
          height: 100%;
          max-height: 30rem;
          border: none;
          border-radius: ${i.borderRadius};
          box-shadow: ${({theme:a})=>i.shadow.default(a.secondary)};
          content: "";
          @media print {
            display: none;
          }
        }
      `}}
  & > *:first-child {
    margin-top: 0;
  }
  & > *:last-child {
    margin-bottom: 0;
  }
  @media (max-width: ${s.mobile}) {
    padding: ${e.base} ${e.small};
  }
  @media print {
    padding: 0 5pt;
    border: none;
  }
`;t.propTypes={children:d.node.isRequired,size:d.oneOf(["default","large"]),variant:d.oneOf(["dark","default","light","main","shadow"])};t.defaultProps={size:"default",variant:"default"};export{t as W};
//# sourceMappingURL=index-add29217.js.map
