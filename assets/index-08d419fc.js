import{s as o,j as s}from"./styled-components.browser.esm-41178855.js";import{P as a}from"./index-1fc0ca9a.js";import{s as r,f as n,b as p}from"./theme-6e379713.js";import{A as u}from"./alert-circle-80f6de2c.js";const d=o.div`
  margin-bottom: ${r.base};
  padding: ${r.base} ${r.medium};
  color: ${({theme:e})=>e.paragraph};
  font-size: ${({size:e})=>e==="medium"?n.sizes.default:n.sizes.small};
  background-color: ${({theme:e})=>e.bgSecondary};
  border: 1px solid
    ${({theme:e,variant:i})=>i==="primary"?e.primary:e.bgSecondary};
  border-radius: ${p.borderRadius};
  & > *:first-child {
    margin-top: 0;
  }
  & > *:last-child {
    margin-bottom: 0;
  }
`;d.propTypes={children:a.node.isRequired,size:a.oneOf(["small","medium"]),variant:a.oneOf(["primary","secondary"])};d.defaultProps={size:"medium",variant:"secondary"};function t({variant:e,size:i,children:l,...m}){return s.jsxs(c,{variant:e,size:i,...m,children:[s.jsx(u,{"aria-hidden":"true"}),s.jsx(f,{children:l})]})}t.propTypes={children:a.node.isRequired,size:a.oneOf(["small","medium"]),variant:a.oneOf(["primary","secondary"])};t.defaultProps={size:"medium",variant:"secondary"};const c=o(d)`
  display: flex;
  align-items: center;
`,f=o.div`
  flex: 1;
  padding-left: ${r.medium};
  & > *:first-child {
    margin-top: 0;
  }
  & > *:last-child {
    margin-bottom: 0;
  }
`;t.__docgenInfo={description:"",methods:[],displayName:"AlertWithIcon",props:{size:{defaultValue:{value:'"medium"',computed:!1},type:{name:"enum",value:[{value:'"small"',computed:!1},{value:'"medium"',computed:!1}]},required:!1,description:""},variant:{defaultValue:{value:'"secondary"',computed:!1},type:{name:"enum",value:[{value:'"primary"',computed:!1},{value:'"secondary"',computed:!1}]},required:!1,description:""},children:{type:{name:"node"},required:!0,description:""}}};export{d as A,t as a};
//# sourceMappingURL=index-08d419fc.js.map
