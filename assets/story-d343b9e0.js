import{j as e,s as m,A as n}from"./styled-components.browser.esm-41178855.js";import{S as i}from"./index-d3c25123.js";import{P as a}from"./index-1fc0ca9a.js";import{r as p}from"./index-8db94870.js";import{B as h}from"./index-f7e231fc.js";import{a as x,b as j,c as y,d as b}from"./keyframes-7e46d1e2.js";import{b as u,s as d}from"./theme-2d6880ff.js";import{X as g}from"./x-59731629.js";import"./_commonjsHelpers-042e6b4d.js";import"./polished.esm-d698528e.js";import"./ShareWhatsapp-cd9b0e81.js";const o=({children:r,onRemove:s,timeout:t,variant:c,...f})=>(p.useEffect(()=>{let l;return t&&s&&(l=setTimeout(s,t)),()=>{l&&clearTimeout(l)}},[s,t]),e.jsxs(v,{variant:c,...f,children:[e.jsx(w,{role:"alert",children:r}),s&&e.jsx(h,{variant:"naked",narrow:!0,small:!0,"aria-label":"Fermer",onClick:s,children:e.jsx($,{"aria-hidden":"true",variant:c})})]}));o.propTypes={animate:a.oneOf(["from-top","from-right","from-bottom","from-left"]),children:a.node.isRequired,onRemove:a.func,shadow:a.bool,squared:a.bool,timeout:a.number,variant:a.oneOf(["primary","secondary"]),wide:a.bool};o.defaultProps={animate:null,onRemove:null,squared:!1,variant:"secondary",wide:!1};const v=m.div`
  position: relative;
  display: inline-flex;
  justify-content: space-between;
  width: ${r=>r.wide?"100%":"auto"};
  min-height: 48px;
  color: ${({theme:r})=>r.paragraph};
  background-color: ${({theme:r})=>r.white};
  border-color: ${({theme:r,variant:s})=>r[s]};
  border-style: solid;
  border-width: 2px;
  border-radius: ${({squared:r})=>r?"0":u.borderRadius};
  box-shadow: ${({shadow:r,theme:s,variant:t})=>r?u.shadow.large(s[t]):"none"};
  animation: ${({animate:r})=>{if(!r)return"none";if(r==="from-top")return n`
        ${x} 0.3s ease-out
      `;if(r==="from-right")return n`
        ${j} 500ms ease-out
      `;if(r==="from-bottom")return n`
        ${y} 300ms ease-out
      `;if(r==="from-left")return n`
        ${b} 500ms ease-out
      `}};
  @media print {
    display: none;
  }
`,w=m.div`
  flex-grow: 1;
  align-self: center;
  padding: ${d.small} ${d.base};
  text-align: left;
`,$=m(g)`
  margin-top: ${d.tiny};
  color: ${({theme:r,variant:s})=>r[s]};
`;o.__docgenInfo={description:"",methods:[],displayName:"Toast",props:{animate:{defaultValue:{value:"null",computed:!1},type:{name:"enum",value:[{value:'"from-top"',computed:!1},{value:'"from-right"',computed:!1},{value:'"from-bottom"',computed:!1},{value:'"from-left"',computed:!1}]},required:!1,description:""},onRemove:{defaultValue:{value:"null",computed:!1},type:{name:"func"},required:!1,description:""},squared:{defaultValue:{value:"false",computed:!1},type:{name:"bool"},required:!1,description:""},variant:{defaultValue:{value:'"secondary"',computed:!1},type:{name:"enum",value:[{value:'"primary"',computed:!1},{value:'"secondary"',computed:!1}]},required:!1,description:""},wide:{defaultValue:{value:"false",computed:!1},type:{name:"bool"},required:!1,description:""},children:{type:{name:"node"},required:!0,description:""},shadow:{type:{name:"bool"},required:!1,description:""},timeout:{type:{name:"number"},required:!1,description:""}}};const N={argTypes:{handler:{action:"clicked"}},component:o,title:"Components/Toast"},q=({handler:r})=>e.jsxs(e.Fragment,{children:[e.jsx(i,{children:e.jsx(o,{variant:"primary",children:"Here is an primary info."})}),e.jsx(i,{children:e.jsx(o,{variant:"primary",shadow:!0,children:"Here is an primary info with shadow."})}),e.jsx(i,{children:e.jsx(o,{variant:"secondary",children:"Here is a secondary info."})}),e.jsx(i,{children:e.jsx(o,{shadow:!0,children:"Here is a toast with a shadow."})}),e.jsx(i,{children:e.jsx(o,{squared:!0,children:"Here is a squared toast"})}),e.jsx(i,{children:e.jsx(o,{onRemove:()=>r("remove button clicked"),children:"Here is a removable info"})}),e.jsx(i,{children:e.jsx(o,{wide:!0,children:"Here is a wide info."})}),e.jsx(i,{children:e.jsx(o,{onRemove:()=>r("remove button clicked"),children:e.jsxs("div",{children:["This is a crazy long removable toast,",e.jsx("br",{}),"more than you would ever expect",e.jsx("br",{}),"They could be like anything you want inside, from link to lists and even more !",e.jsx("br",{}),e.jsxs("ul",{children:[e.jsx("li",{children:"Look"}),e.jsx("li",{children:"at"}),e.jsx("li",{children:"this"}),e.jsx("li",{children:"list"}),e.jsx("li",{children:"!!!"})]}),e.jsx("strong",{children:"ok"})]})})})]}),T=()=>e.jsxs(e.Fragment,{children:[e.jsx(i,{children:e.jsx(o,{animate:"from-top",children:"Here is an info coming from the sky"})}),e.jsx(i,{children:e.jsx(o,{animate:"from-right",children:"Here is an info coming from the sea"})}),e.jsx(i,{children:e.jsx(o,{animate:"from-left",shadow:!0,children:"Here is an success coming from the woods with a shadow"})}),e.jsx(i,{children:e.jsx(o,{animate:"from-bottom",children:"Here is an warning coming from the ground"})})]});q.__docgenInfo={description:"",methods:[],displayName:"base"};T.__docgenInfo={description:"",methods:[],displayName:"animated"};export{T as animated,q as base,N as default};
//# sourceMappingURL=story-d343b9e0.js.map
