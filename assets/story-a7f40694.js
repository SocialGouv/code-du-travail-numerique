import{j as e,s as n}from"./styled-components.browser.esm-41178855.js";import{S as x}from"./index-2bbfe91f.js";import{W as g}from"./index-e0f19bae.js";import{P as i}from"./index-1fc0ca9a.js";import{R as s}from"./index-8db94870.js";import{V as y}from"./index-e2bac56e.js";import{B as j}from"./index-9aa3fa9d.js";import{s as v}from"./theme-6e379713.js";import"./_commonjsHelpers-042e6b4d.js";import"./index-23864a49.js";import"./index-274e6d5d.js";import"./index-cd9a2f7b.js";import"./keyframes-7e46d1e2.js";import"./polished.esm-d698528e.js";import"./ShareWhatsapp-86bedeb5.js";const o=({title:t,children:l,onClickHandler:a,textProps:c,className:d})=>{const[r,m]=s.useState(!1),[h,f]=s.useState("0px"),p=s.useRef(null);function u(){m(!r),f(r?"0":`${p.current.scrollHeight+5}px`),a&&a()}return e.jsxs("div",{className:d,children:[e.jsxs(S,{onClick:u,"aria-expanded":r,tabindex:"0",variant:"naked",narrow:!0,type:"button",children:[e.jsx(y,{"aria-hidden":"true"}),e.jsx(k,{noMargin:!0,fontSize:"hsmall",fontWeight:"600",...c,children:t})]}),e.jsx(b,{active:r,maxHeight:h,ref:p,children:l})]})},b=n.div`
  display: ${({active:t})=>t?"block":"none"};
`,S=n(j)`
  align-items: stretch;
  cursor: pointer;
  display: flex;
  justify-content: flex-start;
  overflow: hidden;
  height: 100%;
  line-height: inherit;
  font-weight: 600;
  font-size: 18px;

  &:hover,
  &:focus,
  &:focus-within,
  &[aria-expanded="true"] {
    color: ${({theme:t})=>t.paragraph};
  }
  padding: 0;
`,k=n.span`
  margin-left: ${v.small};
  display: block;
`;o.propTypes={children:i.node.isRequired,className:i.string,onClickHandler:i.func,textProps:i.object,title:i.string};o.__docgenInfo={description:"",methods:[],displayName:"Collapse",props:{children:{type:{name:"node"},required:!0,description:""},className:{type:{name:"string"},required:!1,description:""},onClickHandler:{type:{name:"func"},required:!1,description:""},textProps:{type:{name:"object"},required:!1,description:""},title:{type:{name:"string"},required:!1,description:""}}};const Y={component:o,title:"Components/Collapse"},q=()=>e.jsx(e.Fragment,{children:e.jsx(x,{children:e.jsx(g,{style:{position:"relative"},variant:"light",children:e.jsx(o,{title:"Your title here",children:e.jsx("p",{children:"Your text here"})})})})});q.__docgenInfo={description:"",methods:[],displayName:"base"};export{q as base,Y as default};
//# sourceMappingURL=story-a7f40694.js.map
