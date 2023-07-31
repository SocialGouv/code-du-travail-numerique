import{j as e,s as f}from"./styled-components.browser.esm-41178855.js";import{B as b}from"./index-8704e65b.js";import{S as u}from"./index-1ba24798.js";import{T as p}from"./index-35b06eed.js";import{P as s}from"./index-1fc0ca9a.js";import{R as y,r as x}from"./index-8db94870.js";import{F as $}from"./index-6f3f7744.js";import{a as j,s as S}from"./theme-2d6880ff.js";import"./_commonjsHelpers-042e6b4d.js";import"./polished.esm-d698528e.js";import"./ShareWhatsapp-86bedeb5.js";import"./index-5a013f77.js";import"./TitleParagraph-71649034.js";const r=({button:n,children:t,initialSize:a,tolerance:o,listContainer:C,query:g,stepSize:h})=>{const i=y.Children.count(t),[d,c]=x.useState(i);x.useEffect(()=>{const l=o?a+o:a*1.2+1;c(l>=i?i:a)},[i,a,o,g]);const k=x.useCallback(()=>{if(!h)return c(i);const l=d+h;return(o?l+o:l*1.2+1)>=i?c(i):c(l)},[h,o,d,i]),w=i>d;return e.jsxs(e.Fragment,{children:[e.jsx(C,{children:y.Children.toArray(t).slice(0,d)}),w&&e.jsx(z,{children:n(k)})]})};r.propTypes={button:s.func,children:s.node.isRequired,initialSize:s.number,listContainer:s.elementType,query:s.string,stepSize:s.number,tolerance:s.number};const q=n=>e.jsx(V,{type:"button",onClick:n,children:"Voir plus"});r.defaultProps={button:q,initialSize:7,listContainer:$,query:""};const z=f.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: ${j.mobile}) {
    justify-content: stretch;
  }
  margin-bottom: ${S.small};
`,V=f(b)`
  margin-top: ${S.xmedium};
  ${n=>n.styles&&n.styles}
  @media (max-width: ${j.mobile}) {
    flex: 1 0 auto;
  }
`;r.__docgenInfo={description:"",methods:[],displayName:"ViewMore",props:{button:{defaultValue:{value:`(onClick) => (
  <StyledButton type="button" onClick={onClick}>
    Voir plus
  </StyledButton>
)`,computed:!1},type:{name:"func"},required:!1,description:""},initialSize:{defaultValue:{value:"7",computed:!1},type:{name:"number"},required:!1,description:""},listContainer:{defaultValue:{value:`styled.ul\`
  margin: 0;
  padding: 0;
  list-style-type: none;
\``,computed:!1},type:{name:"elementType"},required:!1,description:""},query:{defaultValue:{value:'""',computed:!1},type:{name:"string"},required:!1,description:""},children:{type:{name:"node"},required:!0,description:""},stepSize:{type:{name:"number"},required:!1,description:""},tolerance:{type:{name:"number"},required:!1,description:""}}};const v=f.ul`
  border: 1px solid red;
`,B=f(b)`
  align-self: flex-start;
`,H={argTypes:{handler:{action:"clicked"}},component:r,title:"Components/ViewMore"},m=[1,2,3,4,5,6,7,8,9,10,11],T=({handler:n})=>e.jsxs(e.Fragment,{children:[e.jsxs(u,{children:[e.jsx(p,{subtitle:"By default, the show more button will display all the other results",children:"Default props"}),e.jsx(r,{children:m.map(t=>e.jsx("li",{children:e.jsx("a",{href:"/",children:`link-1-${t}`})},`example-1-${t}`))})]}),e.jsxs(u,{children:[e.jsx(p,{subtitle:"How many elements do you want to display before click ? On click ?",children:"With some other props"}),e.jsx(r,{initialSize:4,stepSize:2,children:m.map(t=>e.jsx("li",{children:e.jsx("a",{href:"/",children:`link-1-${t}`})},`example-2-${t}`))})]}),e.jsxs(u,{children:[e.jsx(p,{subtitle:"You can decide the tolerance to display or not the button according to the number of elements",children:"With some props"}),e.jsx(r,{initialSize:9,stepSize:4,children:m.map(t=>e.jsx("li",{children:e.jsx("a",{href:"/",children:`link-1-${t}`})},`example-3-${t}`))})]}),e.jsxs(u,{children:[e.jsx(p,{subtitle:"You can provide you own list wrapper and button",children:"Custom wrapper and button"}),e.jsx(r,{listContainer:v,button:t=>e.jsx(B,{variant:"flat",onClick:()=>{n("Nice click !"),t()},children:"Different button"}),children:m.map(t=>e.jsx("li",{children:e.jsx("a",{href:"/",children:`link-1-${t}`})},`example-4-${t}`))})]})]});T.__docgenInfo={description:"",methods:[],displayName:"base"};export{T as base,H as default};
//# sourceMappingURL=story-8a6dc44f.js.map
