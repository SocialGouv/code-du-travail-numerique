import{j as e,s as n,A as l}from"./styled-components.browser.esm-41178855.js";import{S as a}from"./index-d3c25123.js";import{P as o}from"./index-1fc0ca9a.js";import{O as h}from"./index-36b81236.js";import{b as i,s}from"./theme-2d6880ff.js";import"./index-8db94870.js";import"./_commonjsHelpers-042e6b4d.js";import"./polished.esm-d698528e.js";const t=({children:d,...r})=>e.jsx(h,{children:e.jsx(c,{...r,children:d})});t.propTypes={children:o.node.isRequired};const c=n.table`
  text-align: left;
  empty-cells: show;
  background-color: ${({theme:d})=>d.white};
  border: ${({theme:d})=>i.border(d.border)};
  border-collapse: collapse;
  border-spacing: 0;

  caption {
    padding: ${s.small} 0;
    font-style: italic;
    text-align: center;
  }

  ${({theme:d,stripes:r})=>{if(r)return l`
        tr:nth-child(even) {
          background-color: ${d.bgSecondary};
        }
      `}}

  td,
  th {
    padding: ${s.small} ${s.base};
    border: ${({theme:d})=>i.border(d.border)};
  }

  th {
    color: ${({theme:d})=>d.title};
    font-weight: 600;
    background: ${({theme:d})=>d.bgTertiary};
  }

  thead,
  tfoot {
    padding: ${s.small} ${s.base};
    vertical-align: bottom;
    background: ${({theme:d})=>d.bgSecondary};
  }

  tfoot {
    vertical-align: top;
  }
`;t.__docgenInfo={description:"",methods:[],displayName:"Table",props:{children:{type:{name:"node"},required:!0,description:""}}};const $={component:t,title:"Components/Table"},x=()=>e.jsxs(e.Fragment,{children:[e.jsx(a,{children:e.jsxs(t,{children:[e.jsx("caption",{children:"Some caption"}),e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Table header 1"}),e.jsx("th",{children:"Table header 2"}),e.jsx("th",{children:"Table header 3"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("th",{children:"Line 1"}),e.jsx("td",{children:"some data"}),e.jsx("td",{children:"some data"})]}),e.jsxs("tr",{children:[e.jsx("th",{children:"Line 2"}),e.jsx("td",{children:"some data"}),e.jsx("td",{children:"some data"})]})]})]})}),e.jsx(a,{children:e.jsxs(t,{stripes:!0,children:[e.jsx("caption",{children:"Table with stripes"}),e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Table header 1"}),e.jsx("th",{children:"Table header 2"}),e.jsx("th",{children:"Table header 3"}),e.jsx("th",{children:"Table header 4"}),e.jsx("th",{children:"Table header 5"}),e.jsx("th",{children:"Table header 6"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("th",{children:"Line 1"}),e.jsx("td",{children:"some data"}),e.jsx("td",{children:"some data"}),e.jsx("td",{children:"some data"}),e.jsx("td",{children:"some data"}),e.jsx("td",{children:"some data"})]}),e.jsxs("tr",{children:[e.jsx("th",{children:"Line 2"}),e.jsx("td",{children:"some data"}),e.jsx("td",{children:"some data"}),e.jsx("td",{children:"some data"}),e.jsx("td",{children:"some data"}),e.jsx("td",{children:"some data"})]}),e.jsxs("tr",{children:[e.jsx("th",{children:"Line 3"}),e.jsx("td",{children:"some data"}),e.jsx("td",{children:"some data"}),e.jsx("td",{children:"some data"}),e.jsx("td",{children:"some data"}),e.jsx("td",{children:"some data"})]}),e.jsxs("tr",{children:[e.jsx("th",{children:"Line 4"}),e.jsx("td",{children:"some data"}),e.jsx("td",{children:"some data"}),e.jsx("td",{children:"some data"}),e.jsx("td",{children:"some data"}),e.jsx("td",{children:"some data"})]}),e.jsxs("tr",{children:[e.jsx("th",{children:"Line 2"}),e.jsx("td",{children:"some data"}),e.jsx("td",{children:"some data"}),e.jsx("td",{children:"some data"}),e.jsx("td",{children:"some data"}),e.jsx("td",{children:"some data"})]})]})]})})]});x.__docgenInfo={description:"",methods:[],displayName:"base"};export{x as base,$ as default};
//# sourceMappingURL=story-2c254f6e.js.map
