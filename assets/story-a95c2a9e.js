import{j as e,s as n,A as l}from"./styled-components.browser.esm-525a869c.js";import{S as a}from"./index-71eb6df6.js";import{P as o}from"./index-8d47fad6.js";import{b as i,s as t}from"./theme-6bad1081.js";import"./index-76fb7be0.js";import"./_commonjsHelpers-de833af9.js";import"./polished.esm-3b4f0385.js";const s=({children:d,...r})=>e.jsx(h,{...r,children:d});s.propTypes={children:o.node.isRequired};const h=n.table`
  text-align: left;
  empty-cells: show;
  background-color: ${({theme:d})=>d.white};
  border: ${({theme:d})=>i.border(d.border)};
  border-collapse: collapse;
  border-spacing: 0;

  caption {
    padding: ${t.small} 0;
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
    padding: ${t.small} ${t.base};
    border: ${({theme:d})=>i.border(d.border)};
  }

  th {
    color: ${({theme:d})=>d.title};
    font-weight: 600;
    background: ${({theme:d})=>d.bgTertiary};
  }

  thead,
  tfoot {
    padding: ${t.small} ${t.base};
    vertical-align: bottom;
    background: ${({theme:d})=>d.bgSecondary};
  }

  tfoot {
    vertical-align: top;
  }
`;s.__docgenInfo={description:"",methods:[],displayName:"Table",props:{children:{type:{name:"node"},required:!0,description:""}}};const y={component:s,title:"Components/Table"},c=()=>e.jsxs(e.Fragment,{children:[e.jsx(a,{children:e.jsxs(s,{children:[e.jsx("caption",{children:"Some caption"}),e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Table header 1"}),e.jsx("th",{children:"Table header 2"}),e.jsx("th",{children:"Table header 3"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("th",{children:"Line 1"}),e.jsx("td",{children:"some data"}),e.jsx("td",{children:"some data"})]}),e.jsxs("tr",{children:[e.jsx("th",{children:"Line 2"}),e.jsx("td",{children:"some data"}),e.jsx("td",{children:"some data"})]})]})]})}),e.jsx(a,{children:e.jsxs(s,{stripes:!0,children:[e.jsx("caption",{children:"Table with stripes"}),e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Table header 1"}),e.jsx("th",{children:"Table header 2"}),e.jsx("th",{children:"Table header 3"}),e.jsx("th",{children:"Table header 4"}),e.jsx("th",{children:"Table header 5"}),e.jsx("th",{children:"Table header 6"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("th",{children:"Line 1"}),e.jsx("td",{children:"some data"}),e.jsx("td",{children:"some data"}),e.jsx("td",{children:"some data"}),e.jsx("td",{children:"some data"}),e.jsx("td",{children:"some data"})]}),e.jsxs("tr",{children:[e.jsx("th",{children:"Line 2"}),e.jsx("td",{children:"some data"}),e.jsx("td",{children:"some data"}),e.jsx("td",{children:"some data"}),e.jsx("td",{children:"some data"}),e.jsx("td",{children:"some data"})]}),e.jsxs("tr",{children:[e.jsx("th",{children:"Line 3"}),e.jsx("td",{children:"some data"}),e.jsx("td",{children:"some data"}),e.jsx("td",{children:"some data"}),e.jsx("td",{children:"some data"}),e.jsx("td",{children:"some data"})]}),e.jsxs("tr",{children:[e.jsx("th",{children:"Line 4"}),e.jsx("td",{children:"some data"}),e.jsx("td",{children:"some data"}),e.jsx("td",{children:"some data"}),e.jsx("td",{children:"some data"}),e.jsx("td",{children:"some data"})]}),e.jsxs("tr",{children:[e.jsx("th",{children:"Line 2"}),e.jsx("td",{children:"some data"}),e.jsx("td",{children:"some data"}),e.jsx("td",{children:"some data"}),e.jsx("td",{children:"some data"}),e.jsx("td",{children:"some data"})]})]})]})})]});c.__docgenInfo={description:"",methods:[],displayName:"base"};export{c as base,y as default};
//# sourceMappingURL=story-a95c2a9e.js.map
