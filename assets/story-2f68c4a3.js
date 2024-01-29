import{j as e,s as n}from"./styled-components.browser.esm-beddb3d4.js";import{S as x}from"./index-1f204f3d.js";import{W as g}from"./index-a87523af.js";import{P as i}from"./index-8d47fad6.js";import{R as s}from"./index-76fb7be0.js";import{V as y}from"./index-9c5b5adf.js";import{B as j}from"./index-36bb601e.js";import{s as v}from"./theme-a9d9eda1.js";import"./_commonjsHelpers-de833af9.js";import"./index-78bf1ccb.js";import"./index-e0aa44f4.js";import"./index-6b952e87.js";import"./keyframes-dddb9d72.js";import"./polished.esm-21626a5b.js";import"./ShareWhatsapp-5fd28490.js";const o=({title:t,children:l,onClickHandler:a,textProps:c,className:d})=>{const[r,m]=s.useState(!1),[h,f]=s.useState("0px"),p=s.useRef(null);function u(){m(!r),f(r?"0":`${p.current.scrollHeight+5}px`),a&&a()}return e.jsxs("div",{className:d,children:[e.jsxs(b,{onClick:u,"aria-expanded":r,variant:"naked",narrow:!0,type:"button",children:[e.jsx(y,{"aria-hidden":"true"}),e.jsx(k,{noMargin:!0,fontSize:"hsmall",fontWeight:"600",...c,children:t})]}),e.jsx(S,{active:r,maxHeight:h,ref:p,children:l})]})},S=n.div`
  display: ${({active:t})=>t?"block":"none"};
`,b=n(j)`
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
//# sourceMappingURL=story-2f68c4a3.js.map
