import{j as e,s as n}from"./styled-components.browser.esm-41178855.js";import{S as p}from"./index-d3c25123.js";import{W as s}from"./index-add29217.js";import{P as a}from"./index-1fc0ca9a.js";import{R as c}from"./index-8db94870.js";import{D as f}from"./ShareWhatsapp-cd9b0e81.js";import{s as i,c as x,a as g}from"./theme-2d6880ff.js";import"./_commonjsHelpers-042e6b4d.js";import"./polished.esm-d698528e.js";const r=c.forwardRef(({arrowPosition:t,children:o,...m},h)=>e.jsxs(d,{ref:h,...m,children:[t==="left"&&e.jsx(l,{arrowPosition:t}),e.jsx(u,{children:o}),t==="right"&&e.jsx(l,{arrowPosition:t})]}));r.displayName="ArrowLink";r.propTypes={arrowPosition:a.oneOf(["left","right"]),children:a.node.isRequired};r.defaultProps={arrowPosition:"right"};const d=n.a`
  display: inline-flex;
  align-items: flex-start;
  text-decoration: none;
  cursor: pointer;
`,u=n.span`
  flex: 0 1 auto;
  width: auto;
  margin: 0;
`,l=n(({arrowPosition:t,...o})=>e.jsx(f,{...o}))`
  flex: 0 0 2.8rem;
  width: 2.8rem;
  height: 2.1rem;
  margin: ${({arrowPosition:t})=>t==="left"?`0 ${i.base} 0 0`:`0 ${i.tiny} 0 ${i.small}`};
  padding-top: 0.6rem;
  color: ${({theme:t})=>t.primary};
  transition: transform ${x.transitionTiming} linear;
  /* stylelint-disable-next-line */
  ${d}:hover & {
    transform: translateX(4px);
  }
  @media (max-width: ${g.mobile}) {
    flex: 0 0 2rem;
    width: 2rem;
    height: 1.7rem;
    margin: ${({arrowPosition:t})=>t==="left"?`0 ${i.small} 0 0`:`0 ${i.tiny} 0 ${i.tiny}`};
  }
`;r.__docgenInfo={description:"",methods:[],displayName:"ArrowLink",props:{arrowPosition:{defaultValue:{value:'"right"',computed:!1},type:{name:"enum",value:[{value:'"left"',computed:!1},{value:'"right"',computed:!1}]},required:!1,description:""},children:{type:{name:"node"},required:!0,description:""}}};const I={component:r,title:"Components/ArrowLink"},y=()=>e.jsx(e.Fragment,{children:e.jsxs(p,{children:[e.jsxs(s,{children:["I get some text in there and suddenly, I get a link !"," ",e.jsx(r,{href:"#",children:"Arrow is to the right by default"}),", and then everything gets back to normal"]}),e.jsxs(s,{style:{width:"30rem"},children:[e.jsx("div",{children:e.jsx(r,{arrowPosition:"left",href:"#",children:"But it can be on the left"})}),e.jsx("div",{children:e.jsx(r,{arrowPosition:"left",href:"#",children:"I should get back to line and don’t overflow. Is it the case ?"})}),e.jsx("div",{children:e.jsx(r,{arrowPosition:"left",href:"#",children:"But it can be on the left"})})]})]})});y.__docgenInfo={description:"",methods:[],displayName:"base"};export{y as base,I as default};
//# sourceMappingURL=story-9fb23bb3.js.map
