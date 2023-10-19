import{j as e,s as m,A as n}from"./styled-components.browser.esm-41178855.js";import{S as i}from"./index-d3c25123.js";import{P as s}from"./index-1fc0ca9a.js";import{r as p}from"./index-8db94870.js";import{B as h}from"./index-f7e231fc.js";import{a as x,b as j,c as y,d as b}from"./keyframes-7e46d1e2.js";import{b as f,s as l}from"./theme-2d6880ff.js";import{X as g}from"./x-59731629.js";import"./_commonjsHelpers-042e6b4d.js";import"./polished.esm-d698528e.js";import"./ShareWhatsapp-cd9b0e81.js";const o=({children:r,onRemove:a,timeout:t,variant:c,...u})=>(p.useEffect(()=>{let d;return t&&a&&(d=setTimeout(a,t)),()=>{d&&clearTimeout(d)}},[a,t]),e.jsxs(v,{variant:c,...u,children:[e.jsx(w,{role:"alert",children:r}),a&&e.jsx(h,{variant:"naked",narrow:!0,small:!0,"aria-label":"Fermer",onClick:a,tabIndex:u.tabIndex,children:e.jsx(q,{"aria-hidden":"true",variant:c})})]}));o.propTypes={animate:s.oneOf(["from-top","from-right","from-bottom","from-left"]),children:s.node.isRequired,onRemove:s.func,shadow:s.bool,squared:s.bool,tabIndex:s.number,timeout:s.number,variant:s.oneOf(["primary","secondary"]),wide:s.bool};o.defaultProps={animate:null,onRemove:null,squared:!1,variant:"secondary",wide:!1};const v=m.div`
  position: relative;
  display: inline-flex;
  justify-content: space-between;
  width: ${r=>r.wide?"100%":"auto"};
  min-height: 48px;
  color: ${({theme:r})=>r.paragraph};
  background-color: ${({theme:r})=>r.white};
  border-color: ${({theme:r,variant:a})=>r[a]};
  border-style: solid;
  border-width: 2px;
  border-radius: ${({squared:r})=>r?"0":f.borderRadius};
  box-shadow: ${({shadow:r,theme:a,variant:t})=>r?f.shadow.large(a[t]):"none"};
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
  padding: ${l.small} ${l.base};
  text-align: left;
`,q=m(g)`
  margin-top: ${l.tiny};
  color: ${({theme:r,variant:a})=>r[a]};
`;o.__docgenInfo={description:"",methods:[],displayName:"Toast",props:{animate:{defaultValue:{value:"null",computed:!1},type:{name:"enum",value:[{value:'"from-top"',computed:!1},{value:'"from-right"',computed:!1},{value:'"from-bottom"',computed:!1},{value:'"from-left"',computed:!1}]},required:!1,description:""},onRemove:{defaultValue:{value:"null",computed:!1},type:{name:"func"},required:!1,description:""},squared:{defaultValue:{value:"false",computed:!1},type:{name:"bool"},required:!1,description:""},variant:{defaultValue:{value:'"secondary"',computed:!1},type:{name:"enum",value:[{value:'"primary"',computed:!1},{value:'"secondary"',computed:!1}]},required:!1,description:""},wide:{defaultValue:{value:"false",computed:!1},type:{name:"bool"},required:!1,description:""},children:{type:{name:"node"},required:!0,description:""},shadow:{type:{name:"bool"},required:!1,description:""},tabIndex:{type:{name:"number"},required:!1,description:""},timeout:{type:{name:"number"},required:!1,description:""}}};const N={argTypes:{handler:{action:"clicked"}},component:o,title:"Components/Toast"},$=({handler:r})=>e.jsxs(e.Fragment,{children:[e.jsx(i,{children:e.jsx(o,{variant:"primary",children:"Here is an primary info."})}),e.jsx(i,{children:e.jsx(o,{variant:"primary",shadow:!0,children:"Here is an primary info with shadow."})}),e.jsx(i,{children:e.jsx(o,{variant:"secondary",children:"Here is a secondary info."})}),e.jsx(i,{children:e.jsx(o,{shadow:!0,children:"Here is a toast with a shadow."})}),e.jsx(i,{children:e.jsx(o,{squared:!0,children:"Here is a squared toast"})}),e.jsx(i,{children:e.jsx(o,{onRemove:()=>r("remove button clicked"),children:"Here is a removable info"})}),e.jsx(i,{children:e.jsx(o,{wide:!0,children:"Here is a wide info."})}),e.jsx(i,{children:e.jsx(o,{onRemove:()=>r("remove button clicked"),children:e.jsxs("div",{children:["This is a crazy long removable toast,",e.jsx("br",{}),"more than you would ever expect",e.jsx("br",{}),"They could be like anything you want inside, from link to lists and even more !",e.jsx("br",{}),e.jsxs("ul",{children:[e.jsx("li",{children:"Look"}),e.jsx("li",{children:"at"}),e.jsx("li",{children:"this"}),e.jsx("li",{children:"list"}),e.jsx("li",{children:"!!!"})]}),e.jsx("strong",{children:"ok"})]})})})]}),T=()=>e.jsxs(e.Fragment,{children:[e.jsx(i,{children:e.jsx(o,{animate:"from-top",children:"Here is an info coming from the sky"})}),e.jsx(i,{children:e.jsx(o,{animate:"from-right",children:"Here is an info coming from the sea"})}),e.jsx(i,{children:e.jsx(o,{animate:"from-left",shadow:!0,children:"Here is an success coming from the woods with a shadow"})}),e.jsx(i,{children:e.jsx(o,{animate:"from-bottom",children:"Here is an warning coming from the ground"})})]});$.__docgenInfo={description:"",methods:[],displayName:"base"};T.__docgenInfo={description:"",methods:[],displayName:"animated"};export{T as animated,$ as base,N as default};
//# sourceMappingURL=story-f4606a33.js.map
