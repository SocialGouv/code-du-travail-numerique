import{s as r,A as d,j as n}from"./styled-components.browser.esm-525a869c.js";import{P as l}from"./index-8d47fad6.js";import{s as i,a as o}from"./theme-6bad1081.js";const x="124rem",c=r.div`
  max-width: ${x};
  margin: 0 auto;
  padding: 0 ${i.medium};
  ${({narrow:e,noPadding:a})=>{if(e)return d`
        ${a&&"padding: 0;"}
        max-width: 74rem;
      `}}
  @media (max-width: ${o.mobile}) {
    padding: ${({narrow:e,noPadding:a})=>e&&a?"0":`0 ${i.small}`};
  }
  @media print {
    max-width: 100%;
    padding: 0;
  }
`;c.propTypes={children:l.node.isRequired,narrow:l.bool,noPadding:l.bool};c.defaultProps={narrow:!1,noPadding:!1};const s="10rem",I=({variant:e,theme:a})=>{let t="transparent";return e==="white"&&(t=a.white),e==="light"&&(t=a.bgSecondary),e==="dark"&&(t=a.bgTertiary),d`
    background-color: ${t};
  `},h=({decorated:e=!1,large:a=!1,innerTopContent:t,innerBottomContent:p,variant:u="default",...g})=>e?n.jsxs($,{large:a,decorated:e,children:[n.jsx(T,{variant:u}),t&&n.jsx(f,{children:t}),n.jsx(w,{...g}),p&&n.jsx(f,{children:p})]}):n.jsx($,{variant:u,...g}),$=r.div`
  ${({decorated:e,large:a,theme:t})=>{if(!e||t.noColors)return d`
        padding: ${i.large} 0;
        ${I};
        @media (max-width: ${o.mobile}) {
          padding: ${i.xmedium} 0;
        }
      `;if(e)return d`
        position: relative;
        margin: ${a?"6rem":"5rem"} 0;
        padding: ${a?"6rem":i.large} 0;
        min-height: ${s};
        ${a&&`
            @media (max-width: ${o.mobile}) {
              margin: ${i.large} 0 ${i.larger};
              padding: ${i.large} 0 ${i.larger};
            }
        `}
      `}}
  color: ${({theme:e})=>e.paragraph};
`,m="30%",_=i.medium,T=r.div`
  position: absolute;
  top: 0;
  right: ${m};
  bottom: 0;
  left: 0;
  z-index: -1;
  display: ${({theme:e})=>e.noColors?"none":"block"};
  ${I};
  border-radius: 0 ${s} ${s} 0;
  content: "";
  @media (max-width: ${o.mobile}) {
    right: ${_};
  }
`,f=r(c)`
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
    ${m} - (100% - ${x}) / 2 + ${i.medium}
  );
  @media (max-width: ${o.desktop}) {
    padding-right: calc(${m} + ${i.medium});
  }
  @media (max-width: ${o.mobile}) {
    padding-right: calc(${_} + ${i.small});
  }
`,w=r.div`
  position: relative;
  z-index: 0;
`;try{h.displayName="Section",h.__docgenInfo={description:"",displayName:"Section",props:{decorated:{defaultValue:{value:"false"},description:"",name:"decorated",required:!1,type:{name:"Boolean"}},innerBottomContent:{defaultValue:null,description:"",name:"innerBottomContent",required:!1,type:{name:"ReactNode"}},innerTopContent:{defaultValue:null,description:"",name:"innerTopContent",required:!1,type:{name:"ReactNode"}},large:{defaultValue:{value:"false"},description:"",name:"large",required:!1,type:{name:"Boolean"}},variant:{defaultValue:{value:"default"},description:"",name:"variant",required:!1,type:{name:"enum",value:[{value:'"default"'},{value:'"white"'},{value:'"light"'},{value:'"dark"'}]}}}}}catch{}export{c as C,h as S};
//# sourceMappingURL=index-71eb6df6.js.map
