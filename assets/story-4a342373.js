import{j as e,s as n}from"./styled-components.browser.esm-525a869c.js";import{S as u}from"./index-71eb6df6.js";import{W as x}from"./index-288b0a4d.js";import{P as r}from"./index-8d47fad6.js";import{R as o}from"./index-76fb7be0.js";import{V as g}from"./index-4f0bc8d9.js";import{B as y}from"./index-6bdc1c60.js";import{s as j}from"./theme-6bad1081.js";import"./_commonjsHelpers-de833af9.js";import"./index-78bf1ccb.js";import"./index-56bfcfc3.js";import"./index-db26d228.js";import"./keyframes-83470f70.js";import"./polished.esm-3b4f0385.js";import"./ShareWhatsapp-32297fb2.js";const s=({title:t,children:l,onClickHandler:a,className:c})=>{const[i,d]=o.useState(!1),[m,h]=o.useState("0px"),p=o.useRef(null);function f(){d(!i),h(i?"0":`${p.current.scrollHeight+5}px`),a&&a()}return e.jsxs("div",{className:c,children:[e.jsxs(S,{onClick:f,"aria-expanded":i,variant:"naked",narrow:!0,type:"button",children:[e.jsx(g,{"aria-hidden":"true"}),e.jsx(k,{children:t})]}),e.jsx(v,{active:i,maxHeight:m,ref:p,children:l})]})},v=n.div`
  display: ${({active:t})=>t?"block":"none"};
`,S=n(y)`
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
  margin-left: ${j.small};
  display: block;
`;s.propTypes={children:r.node.isRequired,className:r.string,onClickHandler:r.func,title:r.string};s.__docgenInfo={description:"",methods:[],displayName:"Collapse",props:{children:{type:{name:"node"},required:!0,description:""},className:{type:{name:"string"},required:!1,description:""},onClickHandler:{type:{name:"func"},required:!1,description:""},title:{type:{name:"string"},required:!1,description:""}}};const Y={component:s,title:"Components/Collapse"},C=()=>e.jsx(e.Fragment,{children:e.jsx(u,{children:e.jsx(x,{style:{position:"relative"},variant:"light",children:e.jsx(s,{title:"Your title here",children:e.jsx("p",{children:"Your text here"})})})})});C.__docgenInfo={description:"",methods:[],displayName:"base"};export{C as base,Y as default};
//# sourceMappingURL=story-4a342373.js.map
