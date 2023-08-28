import{j as l,s as y,A as p}from"./styled-components.browser.esm-41178855.js";import{P as e}from"./index-1fc0ca9a.js";import{S as v}from"./index-557d8fd6.js";import{f as a,s as n,a as f}from"./theme-2d6880ff.js";import{H as x,T as q}from"./TitleParagraph-71649034.js";const d=({as:i,children:t,isFirst:u,shift:r="",subtitle:o,stripe:s,variant:m,isHeader:c,size:g,...h})=>l.jsxs(x,{as:c?"header":"div",isFirst:u,stripe:s,shift:r,...h,children:[l.jsxs(b,{stripe:s,as:i,shift:r,size:g,children:[s!=="none"&&l.jsx(v,{rounded:m!=="primary",variant:m,...s==="left"&&{length:"100%",position:"left"}}),t]}),o&&l.jsx(q,{stripe:s,shift:r,children:o})]});d.propTypes={as:e.string,children:e.node,id:e.string,isFirst:e.bool,isHeader:e.bool,role:e.string,shift:e.string,size:e.oneOf(["small","medium"]),stripe:e.oneOf(["left","top","none"]),subtitle:e.node,variant:e.string};d.defaultProps={isFirst:!1,isHeader:!1,stripe:"left",variant:"secondary"};const b=y.h2`
  position: relative;
  margin: 0;
  color: ${({theme:i})=>i.title};
  font-weight: normal;
  font-size: ${({size:i})=>i==="small"?a.sizes.headings.xmedium:a.sizes.headings.medium};
  font-family: "Merriweather", serif;
  line-height: ${a.lineHeightTitle};
  ${({stripe:i,shift:t})=>{if(i==="left")return p`
        padding-left: ${t||n.large};
        text-align: left;
        @media (max-width: ${f.mobile}) {
          padding-left: ${n.base};
        }
      `;if(i==="top")return p`
        padding-top: ${n.base};
        text-align: center;
      `}}
  @media (max-width: ${f.mobile}) {
    font-size: ${({size:i})=>i==="small"?a.sizes.headings.small:a.sizes.headings.xmedium};
  }
`;d.__docgenInfo={description:"",methods:[],displayName:"Title",props:{shift:{defaultValue:{value:'""',computed:!1},type:{name:"string"},required:!1,description:""},isFirst:{defaultValue:{value:"false",computed:!1},type:{name:"bool"},required:!1,description:""},isHeader:{defaultValue:{value:"false",computed:!1},type:{name:"bool"},required:!1,description:""},stripe:{defaultValue:{value:'"left"',computed:!1},type:{name:"enum",value:[{value:'"left"',computed:!1},{value:'"top"',computed:!1},{value:'"none"',computed:!1}]},required:!1,description:""},variant:{defaultValue:{value:'"secondary"',computed:!1},type:{name:"string"},required:!1,description:""},as:{type:{name:"string"},required:!1,description:""},children:{type:{name:"node"},required:!1,description:""},id:{type:{name:"string"},required:!1,description:""},role:{type:{name:"string"},required:!1,description:""},size:{type:{name:"enum",value:[{value:'"small"',computed:!1},{value:'"medium"',computed:!1}]},required:!1,description:""},subtitle:{type:{name:"node"},required:!1,description:""}}};export{d as T};
//# sourceMappingURL=index-82544152.js.map
