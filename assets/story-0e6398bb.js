import{s as d,j as e,A as f}from"./styled-components.browser.esm-41178855.js";import{T as c}from"./index-c9a43126.js";import{P as n}from"./index-1fc0ca9a.js";import{R as p,r as h}from"./index-8db94870.js";import{O as x}from"./index-36b81236.js";import{a,s}from"./theme-2d6880ff.js";import"./_commonjsHelpers-042e6b4d.js";import"./index-09a7853a.js";import"./ShareWhatsapp-cd9b0e81.js";import"./index-eb873494.js";import"./index-9e1330d0.js";import"./index-69cd3070.js";import"./polished.esm-d698528e.js";const u=p.createContext({columns:4}),l=({columns:r,...t})=>e.jsx(g,{mobileOnly:!0,children:e.jsx(u.Provider,{value:r,children:e.jsx(y,{...t})})});l.propTypes={columns:n.number};l.defaultProps={columns:4};const g=d(x)`
  @media (max-width: ${a.mobile}) {
    margin-bottom: ${s.base};
  }
`,y=d.div`
  display: flex;
  flex-wrap: wrap;
  align-content: stretch;
  align-items: stretch;
  justify-content: flex-start;
  /* Use negative margins on sides to create gutters that do not also
    create a gutter at the edges of the container. */
  margin-top: 0;
  margin-right: calc(-1 * ${s.small});
  margin-bottom: ${s.larger};
  margin-left: calc(-1 * ${s.small});
  padding: 0;
  list-style-type: none;
`;l.__docgenInfo={description:"",methods:[],displayName:"Grid",props:{columns:{defaultValue:{value:"4",computed:!1},type:{name:"number"},required:!1,description:""}}};const o=r=>{const t=h.useContext(u);return e.jsx(j,{...r,columns:t})},j=d.div`
  display: flex;
  flex-grow: 0;
  flex-shrink: 1;
  margin: ${s.small};
  padding: 0;
  ${({columns:r})=>f`
    width: calc(100% / ${r} - 2 * ${s.small} - 1px);
    @media (max-width: ${a.desktop}) {
      width: calc(
        100% / ${Math.max(r-1,2)} - 2 * ${s.small} - 1px
      );
    }
    @media (max-width: ${a.tablet}) {
      width: calc(
        100% / ${Math.max(r-2,1)} - 2 * ${s.small} - 1px
      );
    }
    @media (max-width: ${a.mobile}) {
      width: 100%;
    }
  `}
`;o.__docgenInfo={description:"",methods:[],displayName:"GridCell"};const i=({children:r,...t})=>e.jsx(l,{...t,children:Array.isArray(r)?p.Children.map(r,m=>e.jsx(o,{children:m},m.key)):e.jsx(o,{children:r})});i.propTypes={children:n.node.isRequired,columns:n.number};i.defaultProps={columns:4};o.__docgenInfo={description:"",methods:[],displayName:"GridCell"};i.__docgenInfo={description:"",methods:[],displayName:"Grid",props:{columns:{defaultValue:{value:"4",computed:!1},type:{name:"number"},required:!1,description:""}}};i.__docgenInfo={description:"",methods:[],displayName:"Grid",props:{columns:{defaultValue:{value:"4",computed:!1},type:{name:"number"},required:!1,description:""},children:{type:{name:"node"},required:!0,description:""}}};const L={component:i,title:"Components/Grid"},b=()=>e.jsxs(e.Fragment,{children:[e.jsx(i,{children:Array.from({length:10}).map((r,t)=>e.jsxs(c,{children:[e.jsxs("strong",{children:["Tile ",t]}),e.jsx("p",{children:"L’objectif du code du travail numérique est d’améliorer la connaissance du droit du travail"})]},t))}),e.jsx(i,{columns:3,children:Array.from({length:10}).map((r,t)=>e.jsxs(c,{children:[e.jsxs("strong",{children:["Tile ",t]}),e.jsx("p",{children:"du droit pour ceux qu’il concerne. L’objectif du code du travail numérique est d’améliorer la lisibilité"})]},t))})]});b.__docgenInfo={description:"",methods:[],displayName:"base"};export{b as base,L as default};
//# sourceMappingURL=story-0e6398bb.js.map
