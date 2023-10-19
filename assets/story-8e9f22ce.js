import{j as e,s as n}from"./styled-components.browser.esm-41178855.js";import{S as g}from"./index-d3c25123.js";import{W as y}from"./index-add29217.js";import{P as t}from"./index-1fc0ca9a.js";import{R as s}from"./index-8db94870.js";import{V as j}from"./index-7dbc1378.js";import{B as b}from"./index-f7e231fc.js";import{s as v}from"./theme-2d6880ff.js";import"./_commonjsHelpers-042e6b4d.js";import"./index-23864a49.js";import"./index-9e1330d0.js";import"./index-eb873494.js";import"./keyframes-7e46d1e2.js";import"./polished.esm-d698528e.js";import"./ShareWhatsapp-cd9b0e81.js";const o=({title:r,children:p,onClickHandler:a,textProps:c,className:d,autoFocus:m=!1})=>{const[i,u]=s.useState(!1),[f,h]=s.useState("0px"),l=s.useRef(null);function x(){u(!i),h(i?"0":`${l.current.scrollHeight+5}px`),a&&a()}return e.jsxs("div",{className:d,children:[e.jsxs(q,{onClick:x,"aria-expanded":i,variant:"naked",narrow:!0,type:"button",autoFocus:m,tabIndex:1,children:[e.jsx(j,{"aria-hidden":"true"}),e.jsx(k,{noMargin:!0,fontSize:"hsmall",fontWeight:"600",...c,children:r})]}),e.jsx(S,{active:i,maxHeight:f,ref:l,children:p})]})},S=n.div`
  display: ${({active:r})=>r?"block":"none"};
`,q=n(b)`
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
    color: ${({theme:r})=>r.paragraph};
  }
  padding: 0;
`,k=n.span`
  margin-left: ${v.small};
  display: block;
`;o.propTypes={autoFocus:t.boolean,children:t.node.isRequired,className:t.string,onClickHandler:t.func,textProps:t.object,title:t.string};o.__docgenInfo={description:"",methods:[],displayName:"Collapse",props:{autoFocus:{defaultValue:{value:"false",computed:!1},type:{name:"custom",raw:"PropTypes.boolean"},required:!1,description:""},children:{type:{name:"node"},required:!0,description:""},className:{type:{name:"string"},required:!1,description:""},onClickHandler:{type:{name:"func"},required:!1,description:""},textProps:{type:{name:"object"},required:!1,description:""},title:{type:{name:"string"},required:!1,description:""}}};const Y={component:o,title:"Components/Collapse"},w=()=>e.jsx(e.Fragment,{children:e.jsx(g,{children:e.jsx(y,{style:{position:"relative"},variant:"light",children:e.jsx(o,{title:"Your title here",children:e.jsx("p",{children:"Your text here"})})})})});w.__docgenInfo={description:"",methods:[],displayName:"base"};export{w as base,Y as default};
//# sourceMappingURL=story-8e9f22ce.js.map
