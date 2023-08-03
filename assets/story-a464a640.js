import{j as e,s as a}from"./styled-components.browser.esm-41178855.js";import{C as p,r as c}from"./ShareWhatsapp-cd9b0e81.js";import{S as r}from"./index-1ba24798.js";import{P as n}from"./index-1fc0ca9a.js";import{s as d,a as u}from"./theme-2d6880ff.js";import{A as x}from"./alert-circle-80f6de2c.js";import"./index-8db94870.js";import"./_commonjsHelpers-042e6b4d.js";import"./polished.esm-d698528e.js";const s="3.5rem",i="3rem",o=({children:t,icon:l,small:h,...m})=>e.jsxs(y,{...m,children:[e.jsx(f,{small:h,children:e.jsx(l,{"aria-hidden":"true"})}),e.jsx(j,{children:t})]}),y=a.div`
  display: flex;
  ${({centered:t})=>t&&"align-items: center;"}
  justify-content: stretch;
`,f=a.div`
  display: ${({theme:t})=>t.noColors?"none":"block"};
  flex-shrink: 0;
  width: ${({small:t})=>t?i:s};
  height: ${({small:t})=>t?i:s};
  margin-right: ${d.medium};
  svg {
    width: ${({small:t})=>t?i:s};
    height: ${({small:t})=>t?i:s};
  }
  @media (max-width: ${u.mobile}) {
    width: ${i};
    height: ${i};
    margin-right: ${d.small};
    svg {
      width: ${i};
      height: ${i};
    }
  }
`,j=a.div`
  flex: 1 1 auto;
`;o.propTypes={centered:n.bool,children:n.node.isRequired,icon:n.elementType.isRequired,small:n.bool};o.__docgenInfo={description:"",methods:[],displayName:"IconStripe",props:{centered:{type:{name:"bool"},required:!1,description:""},children:{type:{name:"node"},required:!0,description:""},icon:{type:{name:"elementType"},required:!0,description:""},small:{type:{name:"bool"},required:!1,description:""}}};const _={component:o,title:"Components/IconStripe"},g=()=>e.jsxs(e.Fragment,{children:[e.jsx(r,{children:e.jsx(o,{icon:p,children:"This is a very basic component that simply puts an icon on the left of the children"})}),e.jsx(r,{children:e.jsx(o,{icon:c,children:"Check how it fits with another icon"})}),e.jsx(r,{children:e.jsxs(o,{centered:!0,icon:c,children:["In some case, you may prefer that the icon gets centered with the text.",e.jsx("br",{}),"You can do that by providing a centered prop to the component.",e.jsx("br",{}),"Another line to be sure it is centered."]})}),e.jsx(r,{children:e.jsx(o,{small:!0,icon:c,children:"In some case, you may prefer that the icon gets smaller."})}),e.jsx(r,{children:e.jsx(o,{small:!0,centered:!0,icon:x,children:"You can also use feather icons"})})]});g.__docgenInfo={description:"",methods:[],displayName:"base"};export{g as base,_ as default};
//# sourceMappingURL=story-a464a640.js.map
