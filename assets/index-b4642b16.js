import{j as t,s}from"./styled-components.browser.esm-41178855.js";import{P as i}from"./index-1fc0ca9a.js";import{c as n}from"./ShareWhatsapp-cd9b0e81.js";import{b as d}from"./theme-2d6880ff.js";const a=({icon:e,...o})=>t.jsx(p,{...o,children:t.jsx(l,{children:t.jsx(e,{})})});a.propTypes={icon:i.elementType,variant:i.oneOf(["primary","secondary"])};a.defaultProps={icon:n,variant:"primary"};const r="5rem",p=s.div`
  position: absolute;
  top: 0;
  right: 0;
  width: ${r};
  height: ${r};
  overflow: hidden;
  color: ${({variant:e,theme:o})=>o[e+"Text"]};
  border-radius: 0 ${d.borderRadius} 0 0;
  &:before {
    position: absolute;
    display: block;
    width: 0;
    height: 0;
    border-color: transparent ${({variant:e,theme:o})=>o[e]}
      transparent transparent;
    border-style: solid;
    border-width: 0 ${r} ${r} 0;
    content: "";
  }
`,l=s.div`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
  width: 3rem;
  height: 3rem;
`;a.__docgenInfo={description:"",methods:[],displayName:"Badge",props:{icon:{defaultValue:{value:"memo(SvgConfig)",computed:!0},type:{name:"elementType"},required:!1,description:""},variant:{defaultValue:{value:'"primary"',computed:!1},type:{name:"enum",value:[{value:'"primary"',computed:!1},{value:'"secondary"',computed:!1}]},required:!1,description:""}}};export{a as B};
//# sourceMappingURL=index-b4642b16.js.map
