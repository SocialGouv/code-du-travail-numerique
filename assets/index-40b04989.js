import{j as a,s as r}from"./styled-components.browser.esm-41178855.js";import{P as t}from"./index-1fc0ca9a.js";import{R as w}from"./index-8db94870.js";import{B as T}from"./index-b4642b16.js";import{S as v}from"./index-5a013f77.js";import{s as i,f as p,b as d,c as j,a as q}from"./theme-2d6880ff.js";import{H as S}from"./index-f869f23c.js";import{S as V}from"./index-69cd3070.js";const n=w.forwardRef(({children:e,custom:f,icon:m,striped:g,subtitle:l,title:s,href:o,wide:h,titleTagType:y,centerTitle:b,target:u,rel:c,...x},$)=>a.jsxs(k,{ref:$,wide:h,...x,children:[f&&a.jsx(T,{}),a.jsxs(R,{children:[g&&a.jsx(v,{length:"5rem"}),m&&a.jsx(z,{children:a.jsx(m,{})}),a.jsxs(H,{custom:!0,centerTitle:b,children:[l&&a.jsx(W,{children:o&&!s?a.jsx("a",{href:o,target:u,rel:c,children:l}):l}),s&&a.jsx(P,{as:y,children:o?a.jsx("a",{href:o,target:u,rel:c,children:s}):s})]})]}),e&&a.jsx(B,{children:e})]}));n.displayName="Tile";n.propTypes={centerTitle:t.bool,children:t.node,custom:t.bool,href:t.string,icon:t.elementType,rel:t.string,striped:t.bool,subtitle:t.string,target:t.string,title:t.string,titleTagType:t.string,wide:t.bool};n.defaultProps={centerTitle:!1,custom:!1,href:void 0,icon:null,striped:!1,subtitle:"",title:"",titleTagType:"p",wide:!1};const k=r.div`
  position: relative;
  display: inline-flex;
  flex: 1 1; /* adding auto here breaks IE11 on card list, beware */
  flex-direction: column;
  flex-wrap: wrap;
  align-items: stretch;
  ${({wide:e})=>e?"width: 100%":"max-width: 100%"};
  margin: 0;
  padding: ${({wide:e})=>e?`${i.medium} ${i.medium}`:`${i.large} ${i.medium}`};
  color: ${({theme:e})=>e.paragraph};
  font-weight: normal;
  font-size: ${p.sizes.default};
  text-align: ${({wide:e})=>e?"left":"center"};
  text-decoration: none;
  background-color: ${({theme:e})=>e.white};
  border: none;
  border-radius: ${d.borderRadius};
  box-shadow: ${({theme:e})=>d.shadow.default(e.secondary)};
  cursor: pointer;
  transition: box-shadow ${j.transitionTiming} linear,
    transform 100ms linear;
  appearance: none;

  &:hover,
  &:active,
  &:focus {
    color: ${({theme:e})=>e.paragraph};
    box-shadow: ${({theme:e})=>d.shadow.large(e.secondary)};
    transform: translateY(-2px);
  }

  @media (max-width: ${q.mobile}) {
    padding: ${({wide:e})=>e?`${i.base} ${i.base}`:`${i.medium} ${i.base}`};
    font-size: ${p.sizes.small};
  }
`,z=r.div`
  display: ${({theme:e})=>e.noColors?"none":"block"};
  width: 7.2rem;
  height: 7.2rem;
  margin: 0 auto ${i.tiny};
  padding: 1.4rem;
  background-color: ${({theme:e})=>e.bgSecondary};
  border-radius: 50%;
`,R=r.div`
  flex: 0 0 auto;
  width: 100%;
`,H=r.div`
  padding-right: ${({custom:e})=>e?i.small:"0"};
  height: ${({centerTitle:e})=>e?"45px":"auto"};
  display: ${({centerTitle:e})=>e?"flex":"block"};
  align-items: ${({centerTitle:e})=>e?"center":"start"};
  justify-content: ${({centerTitle:e})=>e?"center":"start"};
  margin: ${({centerTitle:e})=>e?"0":"inherit"};

  a,
  a:hover {
    text-decoration: none;
  }
`,W=r(V)`
  &:last-child {
    margin-bottom: 0;
  }
`,P=r(S)`
  margin: 0;
  font-size: ${p.sizes.headings.small};
  font-family: "Open Sans", sans-serif;
  font-weight: 600;
`,B=r.div`
  flex: 1 1 auto;
  margin-top: ${i.small};
`;n.__docgenInfo={description:"",methods:[],displayName:"Tile",props:{centerTitle:{defaultValue:{value:"false",computed:!1},type:{name:"bool"},required:!1,description:""},custom:{defaultValue:{value:"false",computed:!1},type:{name:"bool"},required:!1,description:""},href:{defaultValue:{value:"undefined",computed:!0},type:{name:"string"},required:!1,description:""},icon:{defaultValue:{value:"null",computed:!1},type:{name:"elementType"},required:!1,description:""},striped:{defaultValue:{value:"false",computed:!1},type:{name:"bool"},required:!1,description:""},subtitle:{defaultValue:{value:'""',computed:!1},type:{name:"string"},required:!1,description:""},title:{defaultValue:{value:'""',computed:!1},type:{name:"string"},required:!1,description:""},titleTagType:{defaultValue:{value:'"p"',computed:!1},type:{name:"string"},required:!1,description:""},wide:{defaultValue:{value:"false",computed:!1},type:{name:"bool"},required:!1,description:""},children:{type:{name:"node"},required:!1,description:""},rel:{type:{name:"string"},required:!1,description:""},target:{type:{name:"string"},required:!1,description:""}}};export{n as T};
//# sourceMappingURL=index-40b04989.js.map
