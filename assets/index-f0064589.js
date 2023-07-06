import{j as s,s as y,A as f}from"./styled-components.browser.esm-41178855.js";import{P as e}from"./index-1fc0ca9a.js";import{S as h}from"./index-5a013f77.js";import{f as l,s as n,a as m}from"./theme-2d6880ff.js";import{H as v,T as x}from"./TitleParagraph-71649034.js";const o=({as:i,children:a,isFirst:u,shift:r="",subtitle:d,stripe:t,variant:p,isHeader:c,...g})=>s.jsxs(v,{as:c?"header":"div",isFirst:u,stripe:t,shift:r,...g,children:[s.jsxs(b,{stripe:t,as:i,shift:r,children:[t!=="none"&&s.jsx(h,{rounded:p!=="primary",variant:p,...t==="left"&&{length:"100%",position:"left"}}),a]}),d&&s.jsx(x,{stripe:t,shift:r,children:d})]});o.propTypes={as:e.string,children:e.node,id:e.string,isFirst:e.bool,isHeader:e.bool,role:e.string,shift:e.string,stripe:e.oneOf(["left","top","none"]),subtitle:e.node,variant:e.string};o.defaultProps={isFirst:!1,isHeader:!1,stripe:"left",variant:"secondary"};const b=y.h2`
  position: relative;
  margin: 0;
  color: ${({theme:i})=>i.title};
  font-weight: normal;
  font-size: ${l.sizes.headings.medium};
  font-family: "Merriweather", serif;
  line-height: ${l.lineHeightTitle};
  ${({stripe:i,shift:a})=>{if(i==="left")return f`
        padding-left: ${a||n.large};
        text-align: left;
        @media (max-width: ${m.mobile}) {
          padding-left: ${n.base};
        }
      `;if(i==="top")return f`
        padding-top: ${n.base};
        text-align: center;
      `}}
  @media (max-width: ${m.mobile}) {
    font-size: ${l.sizes.headings.xmedium};
  }
`;o.__docgenInfo={description:"",methods:[],displayName:"Title",props:{shift:{defaultValue:{value:'""',computed:!1},type:{name:"string"},required:!1,description:""},isFirst:{defaultValue:{value:"false",computed:!1},type:{name:"bool"},required:!1,description:""},isHeader:{defaultValue:{value:"false",computed:!1},type:{name:"bool"},required:!1,description:""},stripe:{defaultValue:{value:'"left"',computed:!1},type:{name:"enum",value:[{value:'"left"',computed:!1},{value:'"top"',computed:!1},{value:'"none"',computed:!1}]},required:!1,description:""},variant:{defaultValue:{value:'"secondary"',computed:!1},type:{name:"string"},required:!1,description:""},as:{type:{name:"string"},required:!1,description:""},children:{type:{name:"node"},required:!1,description:""},id:{type:{name:"string"},required:!1,description:""},role:{type:{name:"string"},required:!1,description:""},subtitle:{type:{name:"node"},required:!1,description:""}}};export{o as T};
//# sourceMappingURL=index-f0064589.js.map
