import{s as d,j as e,A as h}from"./styled-components.browser.esm-41178855.js";import{T as p}from"./index-f61b4156.js";import{P as n}from"./index-1fc0ca9a.js";import{R as c,r as f}from"./index-8db94870.js";import{O as x}from"./index-36b81236.js";import{a as s,s as i}from"./theme-2d6880ff.js";import"./_commonjsHelpers-042e6b4d.js";import"./index-09a7853a.js";import"./ShareWhatsapp-cd9b0e81.js";import"./index-eb873494.js";import"./index-9e1330d0.js";import"./index-69cd3070.js";import"./polished.esm-d698528e.js";const u=c.createContext({columns:4}),l=({columns:t,...r})=>e.jsx(g,{mobileOnly:!0,children:e.jsx(u.Provider,{value:t,children:e.jsx(y,{...r})})});l.propTypes={columns:n.number};l.defaultProps={columns:4};const g=d(x)`
  @media (max-width: ${s.mobile}) {
    margin-bottom: ${i.base};
  }
`,y=d.div`
  display: flex; /* Flex layout so items have equal height. */
  flex-wrap: wrap;
  align-content: stretch;
  align-items: stretch;
  justify-content: flex-start;
  /* Use negative margins on sides to create gutters that do not also
    create a gutter at the edges of the container. */
  margin-top: 0;
  margin-right: calc(-1 * ${i.small});
  margin-bottom: ${i.larger};
  margin-left: calc(-1 * ${i.small});
  padding: 0;
  list-style-type: none;
  @media (max-width: ${s.mobile}) {
    flex-wrap: nowrap;
    margin-right: 0;
    margin-bottom: ${i.medium};
    margin-left: 0;
  }
`;l.__docgenInfo={description:"",methods:[],displayName:"Grid",props:{columns:{defaultValue:{value:"4",computed:!1},type:{name:"number"},required:!1,description:""}}};const o=t=>{const r=f.useContext(u);return e.jsx(b,{...t,columns:r})},b=d.div`
  display: flex;
  flex-grow: 0;
  flex-shrink: 1;
  margin: ${i.small};
  padding: 0;
  @media (max-width: ${s.mobile}) {
    flex-shrink: 0;
    min-width: 23rem;
    &:first-of-type {
      margin-left: ${i.medium};
    }
    &:last-of-type:after {
      display: block;
      width: ${i.medium};
      height: 100%;
      background-color: transparent;
      content: "";
    }
  }
  ${({columns:t})=>h`
    width: calc(100% / ${t} - 2 * ${i.small} - 1px);
    @media (max-width: ${s.desktop}) {
      width: calc(
        100% / ${Math.max(t-1,2)} - 2 * ${i.small} - 1px
      );
    }
    @media (max-width: ${s.tablet}) {
      width: calc(
        100% / ${Math.max(t-2,1)} - 2 * ${i.small} - 1px
      );
    }
    @media (max-width: ${s.mobile}) {
      width: ${Math.max(t-2,1)<2?"80%":"60%"};
    }
  `}
`;o.__docgenInfo={description:"",methods:[],displayName:"GridCell"};const a=({children:t,...r})=>e.jsx(l,{...r,children:Array.isArray(t)?c.Children.map(t,m=>e.jsx(o,{children:m},m.key)):e.jsx(o,{children:t})});a.propTypes={children:n.node.isRequired,columns:n.number};a.defaultProps={columns:4};o.__docgenInfo={description:"",methods:[],displayName:"GridCell"};a.__docgenInfo={description:"",methods:[],displayName:"Grid",props:{columns:{defaultValue:{value:"4",computed:!1},type:{name:"number"},required:!1,description:""}}};a.__docgenInfo={description:"",methods:[],displayName:"Grid",props:{columns:{defaultValue:{value:"4",computed:!1},type:{name:"number"},required:!1,description:""},children:{type:{name:"node"},required:!0,description:""}}};const L={component:a,title:"Components/Grid"},$=()=>e.jsxs(e.Fragment,{children:[e.jsx(a,{children:Array.from({length:10}).map((t,r)=>e.jsxs(p,{children:[e.jsxs("strong",{children:["Tile ",r]}),e.jsx("p",{children:"L’objectif du code du travail numérique est d’améliorer la connaissance du droit du travail"})]},r))}),e.jsx(a,{columns:3,children:Array.from({length:10}).map((t,r)=>e.jsxs(p,{children:[e.jsxs("strong",{children:["Tile ",r]}),e.jsx("p",{children:"du droit pour ceux qu’il concerne. L’objectif du code du travail numérique est d’améliorer la lisibilité"})]},r))})]});$.__docgenInfo={description:"",methods:[],displayName:"base"};export{$ as base,L as default};
//# sourceMappingURL=story-97c4cb2a.js.map
