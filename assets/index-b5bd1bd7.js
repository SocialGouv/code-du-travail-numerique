import{j as r,s as v,A as p}from"./styled-components.browser.esm-beddb3d4.js";import{P as e}from"./index-8d47fad6.js";import{r as x}from"./index-76fb7be0.js";import{S as q}from"./index-0e646697.js";import{f as s,s as o,a as f}from"./theme-6bad1081.js";import{H as b,T}from"./TitleParagraph-436c075c.js";const l=x.forwardRef(({as:i,children:t,isFirst:u,shift:n="",subtitle:d,stripe:a,variant:m,isHeader:c,size:g,...y},h)=>r.jsxs(b,{as:c?"header":"div",isFirst:u,stripe:a,shift:n,...y,ref:h,children:[r.jsxs($,{stripe:a,as:i,shift:n,size:g,children:[a!=="none"&&r.jsx(q,{rounded:m!=="primary",variant:m,...a==="left"&&{length:"100%",position:"left"}}),t]}),d&&r.jsx(T,{stripe:a,shift:n,children:d})]}));l.displayName="Title";l.propTypes={as:e.string,children:e.node,id:e.string,isFirst:e.bool,isHeader:e.bool,role:e.string,shift:e.string,size:e.oneOf(["small","medium"]),stripe:e.oneOf(["left","top","none"]),subtitle:e.node,variant:e.string};l.defaultProps={isFirst:!1,isHeader:!1,stripe:"left",variant:"secondary"};const $=v.h2`
  position: relative;
  margin: 0;
  color: ${({theme:i})=>i.title};
  font-weight: normal;
  font-size: ${({size:i})=>i==="small"?s.sizes.headings.xmedium:s.sizes.headings.medium};
  font-family: "Merriweather", serif;
  line-height: ${s.lineHeightTitle};
  ${({stripe:i,shift:t})=>{if(i==="left")return p`
        padding-left: ${t||o.large};
        text-align: left;
        @media (max-width: ${f.mobile}) {
          padding-left: ${o.base};
        }
      `;if(i==="top")return p`
        padding-top: ${o.base};
        text-align: center;
      `}}
  @media (max-width: ${f.mobile}) {
    font-size: ${({size:i})=>i==="small"?s.sizes.headings.small:s.sizes.headings.xmedium};
  }
`;l.__docgenInfo={description:"",methods:[],displayName:"Title",props:{shift:{defaultValue:{value:'""',computed:!1},type:{name:"string"},required:!1,description:""},isFirst:{defaultValue:{value:"false",computed:!1},type:{name:"bool"},required:!1,description:""},isHeader:{defaultValue:{value:"false",computed:!1},type:{name:"bool"},required:!1,description:""},stripe:{defaultValue:{value:'"left"',computed:!1},type:{name:"enum",value:[{value:'"left"',computed:!1},{value:'"top"',computed:!1},{value:'"none"',computed:!1}]},required:!1,description:""},variant:{defaultValue:{value:'"secondary"',computed:!1},type:{name:"string"},required:!1,description:""},as:{type:{name:"string"},required:!1,description:""},children:{type:{name:"node"},required:!1,description:""},id:{type:{name:"string"},required:!1,description:""},role:{type:{name:"string"},required:!1,description:""},size:{type:{name:"enum",value:[{value:'"small"',computed:!1},{value:'"medium"',computed:!1}]},required:!1,description:""},subtitle:{type:{name:"node"},required:!1,description:""}}};export{l as T};
//# sourceMappingURL=index-b5bd1bd7.js.map
