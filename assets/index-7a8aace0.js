import{j as s,s as g,A as f}from"./styled-components.browser.esm-beddb3d4.js";import{P as t}from"./index-8d47fad6.js";import{S as c}from"./index-0e646697.js";import{f as o,s as n,a as m}from"./theme-6bad1081.js";import{H as h,T as y}from"./TitleParagraph-436c075c.js";const l=({as:e,children:i,stripe:a,shift:r="",subtitle:d,variant:p,...u})=>s.jsxs(h,{pageTitle:!0,stripe:a,shift:r,...u,children:[s.jsxs($,{stripe:a,as:e,shift:r,children:[s.jsx(c,{rounded:p!=="primary",variant:p,...a==="left"&&{length:"100%",position:"left"}}),i]}),d&&s.jsx(y,{stripe:a,shift:r,children:d})]});l.propTypes={as:t.string,children:t.node,shift:t.string,stripe:t.oneOf(["left","top"]),subtitle:t.node,variant:t.string};l.defaultProps={stripe:"top",variant:"secondary"};const $=g.h1`
  position: relative;
  margin: 0;
  color: ${({theme:e})=>e.title};
  font-weight: normal;
  font-size: ${o.sizes.headings.large};
  font-family: "Merriweather", serif;
  line-height: ${o.lineHeightTitle};
  ${({stripe:e,shift:i})=>{if(e==="left")return f`
        padding-left: ${i||n.large};
        @media (max-width: ${m.mobile}) {
          padding-left: ${n.base};
        }
      `;if(e==="top")return f`
        padding-top: ${n.base};
      `}};
  @media (max-width: ${m.mobile}) {
    font-size: ${o.sizes.headings.mobileMedium};
  }
`;l.__docgenInfo={description:"",methods:[],displayName:"PageTitle",props:{shift:{defaultValue:{value:'""',computed:!1},type:{name:"string"},required:!1,description:""},stripe:{defaultValue:{value:'"top"',computed:!1},type:{name:"enum",value:[{value:'"left"',computed:!1},{value:'"top"',computed:!1}]},required:!1,description:""},variant:{defaultValue:{value:'"secondary"',computed:!1},type:{name:"string"},required:!1,description:""},as:{type:{name:"string"},required:!1,description:""},children:{type:{name:"node"},required:!1,description:""},subtitle:{type:{name:"node"},required:!1,description:""}}};export{l as P};
//# sourceMappingURL=index-7a8aace0.js.map
