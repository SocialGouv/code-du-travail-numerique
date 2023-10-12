import{j as s,s as g,A as o}from"./styled-components.browser.esm-41178855.js";import{P as a}from"./index-1fc0ca9a.js";import{S as h}from"./index-559740d3.js";import{f as r,s as n,a as f}from"./theme-2d6880ff.js";import{H as y,T as $}from"./TitleParagraph-71649034.js";const d=({as:e,children:t,stripe:i,shift:l="",subtitle:p,variant:m,small:u,...c})=>s.jsxs(y,{pageTitle:!0,stripe:i,shift:l,...c,children:[s.jsxs(v,{stripe:i,as:e,shift:l,small:u,children:[s.jsx(h,{rounded:m!=="primary",variant:m,...i==="left"&&{length:"100%",position:"left"}}),t]}),p&&s.jsx($,{stripe:i,shift:l,children:p})]});d.propTypes={as:a.string,children:a.node,shift:a.string,small:a.boolean,stripe:a.oneOf(["left","top"]),subtitle:a.node,variant:a.string};d.defaultProps={small:!1,stripe:"top",variant:"secondary"};const v=g.h1`
  position: relative;
  margin: 0;
  color: ${({theme:e})=>e.title};
  font-weight: normal;
  ${({small:e})=>o`
      font-size: ${e?r.sizes.headings.xmedium:r.sizes.headings.large};
    `}
  font-family: "Merriweather", serif;
  line-height: ${r.lineHeightTitle};
  ${({stripe:e,shift:t})=>{if(e==="left")return o`
        padding-left: ${t||n.large};
        @media (max-width: ${f.mobile}) {
          padding-left: ${n.base};
        }
      `;if(e==="top")return o`
        padding-top: ${n.base};
      `}};
  @media (max-width: ${f.mobile}) {
    font-size: ${r.sizes.headings.mobileMedium};
  }
`;d.__docgenInfo={description:"",methods:[],displayName:"PageTitle",props:{shift:{defaultValue:{value:'""',computed:!1},type:{name:"string"},required:!1,description:""},small:{defaultValue:{value:"false",computed:!1},type:{name:"custom",raw:"PropTypes.boolean"},required:!1,description:""},stripe:{defaultValue:{value:'"top"',computed:!1},type:{name:"enum",value:[{value:'"left"',computed:!1},{value:'"top"',computed:!1}]},required:!1,description:""},variant:{defaultValue:{value:'"secondary"',computed:!1},type:{name:"string"},required:!1,description:""},as:{type:{name:"string"},required:!1,description:""},children:{type:{name:"node"},required:!1,description:""},subtitle:{type:{name:"node"},required:!1,description:""}}};export{d as P};
//# sourceMappingURL=index-8004049a.js.map
