import{j as e,s as r}from"./styled-components.browser.esm-beddb3d4.js";import{S as y}from"./index-1f204f3d.js";import{s as h,d as j,f as b,a as d}from"./theme-a9d9eda1.js";import{P as i}from"./index-8d47fad6.js";import{r as p}from"./index-76fb7be0.js";import"./_commonjsHelpers-de833af9.js";import"./polished.esm-21626a5b.js";const T=(t,n)=>{switch(n.type){case"setTitles":return{titles:n.payload.map(a=>({...a}))};case"setActive":return{titles:t.titles.map(a=>({...a,active:a.id===n.payload}))}}},w=t=>{const[n,a]=p.useReducer(T,t),v=p.useCallback(u=>{u.forEach(m=>{m.intersectionRatio===1&&a({payload:m.target.id,type:"setActive"})})},[]),g=p.useCallback(u=>{a({payload:u,type:"setTitles"})},[]);return{observerCallback:v,setTitles:g,titles:n.titles}},$={titles:[]},f=({contents:t,observerArea:n,threshold:a,ids:v,...g})=>{const{observerCallback:u,setTitles:m,titles:x}=w($);return p.useEffect(()=>{const o=[];t&&t.length&&t.map(({label:l,id:s})=>{if(l&&!s)return o.push({isSection:!0,label:l});if(s){const c=document.getElementById(s);c&&o.push({active:!1,element:c,id:s})}}),m(o)},[t,m]),p.useEffect(()=>{let o=!1;return"IntersectionObserver"in window&&(o=new IntersectionObserver(u,{rootMargin:`-${n.top} 0px -${n.bottom} 0px`,threshold:a}),x.forEach(l=>{l.element&&o.observe(l.element)})),()=>{o&&o.disconnect()}},[x,n,u,a]),e.jsx("div",{...g,children:x.map(({isSection:o,active:l,element:s,label:c,id:q})=>o?e.jsx(E,{children:c},`menu-${c}`):e.jsx(k,{active:l,href:`#${s.id}`,children:s.getAttribute("data-short-title")||s.textContent},`menu-${q}`))})};f.propTypes={contents:i.arrayOf(i.shape({id:i.string,label:i.string})),ids:i.arrayOf(i.string),observerArea:i.shape({bottom:i.string,top:i.string}),threshold:i.arrayOf(i.string)};f.defaultProps={ids:[],observerArea:{bottom:"70%",top:"0px"},threshold:["1"]};const E=r.span`
  display: block;
  padding: ${h.base} 0 ${h.small} 0;
  color: ${j.altText};
  font-weight: bold;
  font-size: ${b.sizes.small};
  font-family: "Open Sans", sans-serif;
  text-transform: uppercase;
`,k=r.a`
  display: block;
  padding: ${h.tiny} 0;
  font-weight: ${({active:t})=>t?"bold":"normal"};
  text-decoration: none;
  @media (max-width: ${d.tablet}) {
    font-weight: normal;
  }
  @media (max-width: ${d.mobile}) {
    font-size: ${b.sizes.default};
  }
`;f.__docgenInfo={description:"",methods:[],displayName:"TableOfContent",props:{ids:{defaultValue:{value:"[]",computed:!1},type:{name:"arrayOf",value:{name:"string"}},required:!1,description:""},observerArea:{defaultValue:{value:'{ bottom: "70%", top: "0px" }',computed:!1},type:{name:"shape",value:{bottom:{name:"string",required:!1},top:{name:"string",required:!1}}},required:!1,description:""},threshold:{defaultValue:{value:'["1"]',computed:!1},type:{name:"arrayOf",value:{name:"string"}},required:!1,description:""},contents:{type:{name:"arrayOf",value:{name:"shape",value:{id:{name:"string",required:!1},label:{name:"string",required:!1}}}},required:!1,description:""}}};const F={component:f,title:"Components/TableOfContent"},O=()=>e.jsx(e.Fragment,{children:e.jsxs(y,{children:[e.jsx(C,{children:"This is the main fixed header / heading / title"}),e.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}),e.jsxs(L,{children:[e.jsx(z,{children:"Sommaire"}),e.jsx(D,{contents:[{id:"menu1"},{id:"menu2"},{label:"some delimiter"},{id:"non-existing-id"},{id:"menu3"},{id:"menu4"},{id:"menu5"}]}),e.jsxs(S,{children:[e.jsx("h2",{id:"menu1",children:"This should trigger menu 1"}),e.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}),e.jsx("h2",{id:"menu2",children:"This should trigger menu 2"}),e.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}),e.jsx("h2",{id:"menu3",children:"This should trigger menu 3"}),e.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}),e.jsx("h2",{children:"This triggers nothing !"}),e.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}),e.jsx("h2",{id:"menu4","data-short-title":"menu 4",children:"This should trigger menu 4 which should have a shorter title"}),e.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}),e.jsx("h2",{id:"menu5",children:"This should trigger menu 5"}),e.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."})]})]}),e.jsx(U,{children:"This is a laaarge footer to make sure we have no issues with the observer api"})]})}),C=r.h1`
  position: sticky;
  top: 0;
  z-index: 2;
  margin: 0;
  padding: 2rem;
  background-color: white;
`,L=r.div`
  display: flex;
  align-items: flex-start;
  @media (max-width: ${d.tablet}) {
    display: block;
  }
`,z=r.strong`
  display: none;
  @media (max-width: ${d.tablet}) {
    display: block;
    margin-bottom: ${h.small};
    font-size: ${b.sizes.headings.small};
  }
`,D=r(f)`
  position: sticky;
  top: 110px;
  z-index: 1;
  width: 25%;
  padding-right: 20px;
  @media (max-width: ${d.tablet}) {
    position: static;
    width: 100%;
    margin-bottom: ${h.large};
  }
`,S=r.div`
  width: 75%;
  @media (max-width: ${d.tablet}) {
    width: 100%;
  }
`,U=r.footer`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50rem;
  border: 1px solid black;
`;O.__docgenInfo={description:"",methods:[],displayName:"base"};export{O as base,F as default};
//# sourceMappingURL=story-6b4f433c.js.map
