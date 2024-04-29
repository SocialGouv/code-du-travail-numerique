import{s as p,j as e,A as x}from"./styled-components.browser.esm-525a869c.js";import{T as m}from"./index-b3dcb09f.js";import{P as n}from"./index-8d47fad6.js";import{R as c,r as f}from"./index-76fb7be0.js";import{s as i,a as d}from"./theme-6bad1081.js";import"./_commonjsHelpers-de833af9.js";import"./index-9ba9e563.js";import"./ShareWhatsapp-32297fb2.js";import"./index-db26d228.js";import"./index-56bfcfc3.js";import"./index-15c0c8b4.js";import"./polished.esm-3b4f0385.js";const u=c.createContext({columns:4}),a=({columns:r,...s})=>e.jsx(u.Provider,{value:r,children:e.jsx(h,{...s})});a.propTypes={columns:n.number};a.defaultProps={columns:4};const h=p.div`
  display: flex;
  flex-wrap: wrap;
  align-content: stretch;
  align-items: stretch;
  justify-content: flex-start;
  margin-top: 0;
  margin-bottom: ${i.larger};
  padding: 0;
  list-style-type: none;
`;a.__docgenInfo={description:"",methods:[],displayName:"Grid",props:{columns:{defaultValue:{value:"4",computed:!1},type:{name:"number"},required:!1,description:""}}};const o=r=>{const s=f.useContext(u);return e.jsx(y,{...r,columns:s})},y=p.div`
  display: flex;
  flex-grow: 0;
  flex-shrink: 1;
  margin: ${i.small};
  padding: 0;
  ${({columns:r})=>x`
    width: calc(100% / ${r} - 2 * ${i.small} - 1px);
    @media (max-width: ${d.desktop}) {
      width: calc(
        100% / ${Math.max(r-1,2)} - 2 * ${i.small} - 1px
      );
    }
    @media (max-width: ${d.tablet}) {
      width: calc(
        100% / ${Math.max(r-2,1)} - 2 * ${i.small} - 1px
      );
    }
    @media (max-width: ${d.mobile}) {
      width: 100%;
    }
  `}
`;o.__docgenInfo={description:"",methods:[],displayName:"GridCell"};const t=({children:r,...s})=>e.jsx(a,{...s,children:Array.isArray(r)?c.Children.map(r,l=>e.jsx(o,{children:l},l.key)):e.jsx(o,{children:r})});t.propTypes={children:n.node.isRequired,columns:n.number};t.defaultProps={columns:4};o.__docgenInfo={description:"",methods:[],displayName:"GridCell"};t.__docgenInfo={description:"",methods:[],displayName:"Grid",props:{columns:{defaultValue:{value:"4",computed:!1},type:{name:"number"},required:!1,description:""}}};t.__docgenInfo={description:"",methods:[],displayName:"Grid",props:{columns:{defaultValue:{value:"4",computed:!1},type:{name:"number"},required:!1,description:""},children:{type:{name:"node"},required:!0,description:""}}};const N={component:t,title:"Components/Grid"},g=()=>e.jsxs(e.Fragment,{children:[e.jsx(t,{children:Array.from({length:10}).map((r,s)=>e.jsxs(m,{children:[e.jsxs("strong",{children:["Tile ",s]}),e.jsx("p",{children:"L’objectif du code du travail numérique est d’améliorer la connaissance du droit du travail"})]},s))}),e.jsx(t,{columns:3,children:Array.from({length:10}).map((r,s)=>e.jsxs(m,{children:[e.jsxs("strong",{children:["Tile ",s]}),e.jsx("p",{children:"du droit pour ceux qu’il concerne. L’objectif du code du travail numérique est d’améliorer la lisibilité"})]},s))})]});g.__docgenInfo={description:"",methods:[],displayName:"base"};export{g as base,N as default};
//# sourceMappingURL=story-a9d40429.js.map
