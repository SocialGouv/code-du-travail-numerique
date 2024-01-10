import{j as e,s as o}from"./styled-components.browser.esm-41178855.js";import{S as u}from"./index-d3c25123.js";import{T as h}from"./index-253e4bfc.js";import{P as i}from"./index-1fc0ca9a.js";import{A as f}from"./index-8e1fa4cb.js";import{B as g}from"./index-a3fd5ee3.js";import{f as y,s as n}from"./theme-2d6880ff.js";import{H as b}from"./help-circle-e583dab7.js";import"./index-8db94870.js";import"./_commonjsHelpers-042e6b4d.js";import"./alert-circle-80f6de2c.js";import"./polished.esm-d698528e.js";import"./ShareWhatsapp-cd9b0e81.js";const r=({icon:t,iconTitle:s,children:a,onVisibilityChange:l,isTooltipOpen:d,className:p,dataTestid:c,isDisabled:m})=>e.jsxs(e.Fragment,{children:[e.jsx(x,{title:s,"aria-label":s,variant:"navLink",size:"small",type:"button",onClick:l,className:p,"data-testid":c,disabled:m,children:t}),d&&e.jsx(q,{size:"small",variant:"secondary",children:a})]}),x=o(g)`
  display: inline-block;
  font-weight: 700;
  font-size: ${y.sizes.small};
  color: ${({theme:t,disabled:s})=>s?t.placeholder:t.secondary};
  margin-left: ${n.tiny};
  padding: 0.5rem;
  height: 2rem;
  width: 2rem;
  position: relative;
  bottom: -0.5rem;
`,q=o(f)`
  margin-top: ${n.base};
  font-weight: normal;
`;r.propTypes={children:i.node.isRequired,className:i.string,dataTestid:i.string,icon:i.node.isRequired,iconTitle:i.string.isRequired,isDisabled:i.bool,isTooltipOpen:i.bool.isRequired,onVisibilityChange:i.func.isRequired};r.__docgenInfo={description:"",methods:[],displayName:"DisclosureIcon",props:{children:{type:{name:"node"},required:!0,description:""},className:{type:{name:"string"},required:!1,description:""},dataTestid:{type:{name:"string"},required:!1,description:""},icon:{type:{name:"node"},required:!0,description:""},iconTitle:{type:{name:"string"},required:!0,description:""},isDisabled:{type:{name:"bool"},required:!1,description:""},isTooltipOpen:{type:{name:"bool"},required:!0,description:""},onVisibilityChange:{type:{name:"func"},required:!0,description:""}}};const B={component:r,title:"Components/DisclosureIcon"},j=()=>e.jsx(e.Fragment,{children:e.jsxs(u,{children:[e.jsx("p",{children:e.jsx(h,{fontSize:"hsmall",fontWeight:"700",children:"Example:"})}),e.jsxs("p",{children:["Info button",e.jsx(r,{iconTitle:"Find out what lies beneath",icon:e.jsx(b,{size:"20","aria-label":"?"}),onVisibilityChange:()=>{},isTooltipOpen:!0,children:"Here I am! I am the buried treasure!"})]})]})});j.__docgenInfo={description:"",methods:[],displayName:"base"};export{j as base,B as default};
//# sourceMappingURL=story-ec4fe35e.js.map
