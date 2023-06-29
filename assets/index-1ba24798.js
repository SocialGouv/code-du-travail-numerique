import{s as r,A as l,j as d}from"./styled-components.browser.esm-41178855.js";import{P as o}from"./index-1fc0ca9a.js";import{s as i,a as n}from"./theme-2d6880ff.js";const b="124rem",u=r.div`
  max-width: ${b};
  margin: 0 auto;
  padding: 0 ${i.medium};
  ${({narrow:e,noPadding:a})=>{if(e)return l`
        ${a&&"padding: 0;"}
        max-width: 74rem;
      `}}
  @media (max-width: ${n.mobile}) {
    padding: ${({narrow:e,noPadding:a})=>e&&a?"0":`0 ${i.small}`};
  }
  @media print {
    max-width: 100%;
    padding: 0;
  }
`;u.propTypes={children:o.node.isRequired,narrow:o.bool,noPadding:o.bool};u.defaultProps={narrow:!1,noPadding:!1};const s="10rem",x=({variant:e,theme:a})=>{let t="transparent";return e==="white"&&(t=a.white),e==="light"&&(t=a.bgSecondary),e==="dark"&&(t=a.bgTertiary),l`
    background-color: ${t};
  `},c=({decorated:e,large:a,innerTopContent:t,innerBottomContent:p,variant:g,...h})=>e?d.jsxs(f,{large:a,decorated:!0,children:[d.jsx(I,{variant:g}),t&&d.jsx($,{children:t}),d.jsx(w,{...h}),p&&d.jsx($,{children:p})]}):d.jsx(f,{variant:g,...h}),f=r.div`
  ${({decorated:e,large:a,theme:t})=>{if(!e||t.noColors)return l`
        padding: ${i.large} 0;
        ${x};
        @media (max-width: ${n.mobile}) {
          padding: ${i.xmedium} 0;
        }
      `;if(e)return l`
        position: relative;
        margin: ${a?"6rem":"5rem"} 0;
        padding: ${a?"6rem":i.large} 0;
        min-height: ${s};
        ${a&&`
            @media (max-width: ${n.mobile}) {
              margin: ${i.large} 0 ${i.larger};
              padding: ${i.large} 0 ${i.larger};
            }
        `}
      `}}
  color: ${({theme:e})=>e.paragraph};
`,m="30%",T=i.medium,I=r.div`
  position: absolute;
  top: 0;
  right: ${m};
  bottom: 0;
  left: 0;
  z-index: -1;
  display: ${({theme:e})=>e.noColors?"none":"block"};
  ${x};
  border-radius: 0 ${s} ${s} 0;
  content: "";
  @media (max-width: ${n.mobile}) {
    right: ${T};
  }
`,$=r(u)`
  /*
    The issue here is that the container has a max width so the
    padding right cannot simply equals the SPACING_RIGHT of the section
    when the width is too big.
    To get the correct padding-right, we need some calculation:
      IF
        X = the missing padding-right to add to the container
        Y = margin-right of the container (which is dynamic, because auto)
      NOWING THAT
        Y = (100% - CONTAINER_MAX_WIDTH) / 2
        SPACING_RIGHT = X + Y
      THEN
        X = SPACING_RIGHT - (100% - CONTAINER_MAX_WIDTH) / 2
  */
  padding-right: calc(
    ${m} - (100% - ${b}) / 2 + ${i.medium}
  );
  @media (max-width: ${n.desktop}) {
    padding-right: calc(${m} + ${i.medium});
  }
  @media (max-width: ${n.mobile}) {
    padding-right: calc(${T} + ${i.small});
  }
`,w=r.div`
  position: relative;
  z-index: 0;
`;c.propTypes={children:o.node.isRequired,decorated:o.bool,innerBottomContent:o.node,innerTopContent:o.node,large:o.bool,variant:o.oneOf(["default","white","light","dark"])};c.defaultProps={decorated:!1,innerBottomContent:null,innerTopContent:null,large:!1,variant:"default"};c.__docgenInfo={description:"",methods:[],displayName:"Section",props:{decorated:{defaultValue:{value:"false",computed:!1},type:{name:"bool"},required:!1,description:""},innerBottomContent:{defaultValue:{value:"null",computed:!1},type:{name:"node"},required:!1,description:""},innerTopContent:{defaultValue:{value:"null",computed:!1},type:{name:"node"},required:!1,description:""},large:{defaultValue:{value:"false",computed:!1},type:{name:"bool"},required:!1,description:""},variant:{defaultValue:{value:'"default"',computed:!1},type:{name:"enum",value:[{value:'"default"',computed:!1},{value:'"white"',computed:!1},{value:'"light"',computed:!1},{value:'"dark"',computed:!1}]},required:!1,description:""},children:{type:{name:"node"},required:!0,description:""}}};export{u as C,c as S};
//# sourceMappingURL=index-1ba24798.js.map
