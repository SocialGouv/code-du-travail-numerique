import{j as e,s as n}from"./styled-components.browser.esm-41178855.js";import{S as s}from"./index-3a4716ad.js";import{A as m,a as p,b as f,c as u,d as h}from"./index-23864a49.js";import{P as i}from"./index-1fc0ca9a.js";import{M as g}from"./ShareWhatsapp-86bedeb5.js";import{f as x}from"./keyframes-7e46d1e2.js";import{s as r,c as d,a as y}from"./theme-dc888197.js";import"./index-8db94870.js";import"./_commonjsHelpers-042e6b4d.js";import"./polished.esm-d698528e.js";const o=({children:t,title:a,noLeftPadding:l,...c})=>e.jsx(j,{allowZeroExpanded:!0,...c,children:e.jsx(e.Fragment,{children:e.jsxs(m,{children:[e.jsx(p,{children:e.jsxs(w,{children:[e.jsx($,{}),e.jsx(b,{children:a})]})}),e.jsx(P,{noLeftPadding:l,children:e.jsx(v,{children:t})})]})})});o.propTypes={children:i.node.isRequired,noLeftPadding:i.bool,preExpanded:i.arrayOf(i.string),title:i.string.isRequired};o.defaultProps={noLeftPadding:!1,preExpanded:[]};const j=n(f)`
  margin-bottom: ${r.xmedium};
`,w=n(u)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
  cursor: pointer;
  &:hover,
  &:focus,
  &:focus-within,
  &[aria-expanded="true"] {
    color: ${({theme:t})=>t.paragraph};
  }
`,$=n(g)`
  position: relative;
  flex: 0 0 auto;
  width: 2.2rem;
  height: 2.2rem;
  color: ${({theme:t})=>t.primary};
  transform: rotate(0);
  transition: transform ${d.transitionTiming} linear;
  [aria-expanded="true"] &,
  [aria-selected="true"] & {
    transform: rotate(45deg);
  }
`,b=n.div`
  margin: ${r.small} 0 ${r.small} ${r.small};
`,v=n.div`
  & > *:first-child {
    margin-top: 0;
  }
  & > *:last-child {
    margin-bottom: 0;
  }
`,P=n(({noLeftPadding:t,...a})=>e.jsx(h,{...a}))`
  padding: ${r.small} 0 0 ${r.large};
  ${({noLeftPadding:t})=>t&&"padding-left: 0;"}
  animation: ${x} ${d.transitionTiming} ease-in;
  @media (max-width: ${y.mobile}) {
    padding: ${r.small} 0;
  }
`;o.__docgenInfo={description:"",methods:[],displayName:"MoreContent",props:{noLeftPadding:{defaultValue:{value:"false",computed:!1},type:{name:"bool"},required:!1,description:""},preExpanded:{defaultValue:{value:"[]",computed:!1},type:{name:"arrayOf",value:{name:"string"}},required:!1,description:""},children:{type:{name:"node"},required:!0,description:""},title:{type:{name:"string"},required:!0,description:""}}};const _={component:o,title:"Components/MoreContent"},I=()=>e.jsxs(e.Fragment,{children:[e.jsx(s,{children:e.jsx(o,{title:"Would you like to know more ?",children:e.jsx("a",{title:"then click here",href:"https://www.youtube.com/watch?v=RvPRrIOa8Nw",target:"_blank",rel:"noopener noreferrer",children:"https://www.youtube.com/watch?v=RvPRrIOa8Nw (nouvelle fenêtre)"})})}),e.jsx(s,{children:e.jsx(o,{noLeftPadding:!0,title:"Without left padding",children:"text is not aligned with title but full left"})})]});I.__docgenInfo={description:"",methods:[],displayName:"base"};export{I as base,_ as default};
//# sourceMappingURL=story-397f2b16.js.map
