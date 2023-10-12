import{j as t,s as i}from"./styled-components.browser.esm-41178855.js";import{c as s}from"./ShareWhatsapp-cd9b0e81.js";import{b as d}from"./theme-2d6880ff.js";const a=({icon:e=s,variant:r="primary",...n})=>t.jsx(p,{variant:r,...n,children:t.jsx(l,{children:t.jsx(e,{})})}),o="5rem",p=i.div`
  position: absolute;
  top: 0;
  right: 0;
  width: ${o};
  height: ${o};
  overflow: hidden;
  color: ${({variant:e,theme:r})=>r[e+"Text"]};
  border-radius: 0 ${d.borderRadius} 0 0;

  &:before {
    position: absolute;
    display: block;
    width: 0;
    height: 0;
    border-color: transparent ${({variant:e,theme:r})=>r[e]}
      transparent transparent;
    border-style: solid;
    border-width: 0 ${o} ${o} 0;
    content: "";
  }
`,l=i.div`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
  width: 3rem;
  height: 3rem;
`;try{a.displayName="Badge",a.__docgenInfo={description:"",displayName:"Badge",props:{icon:{defaultValue:null,description:"",name:"icon",required:!1,type:{name:"ElementType<any>"}},variant:{defaultValue:{value:"primary"},description:"",name:"variant",required:!1,type:{name:"enum",value:[{value:'"primary"'},{value:'"secondary"'}]}}}}}catch{}export{a as B};
//# sourceMappingURL=index-09a7853a.js.map
