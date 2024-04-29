import{j as a,s as t}from"./styled-components.browser.esm-525a869c.js";import{R as w}from"./index-76fb7be0.js";import{B as v}from"./index-9ba9e563.js";import{S as T}from"./index-db26d228.js";import{s as i,f as m,b as d,a as j}from"./theme-6bad1081.js";import{H as q}from"./index-56bfcfc3.js";import{S as V}from"./index-15c0c8b4.js";const p=w.forwardRef(({children:e,custom:r=!1,icon:u,striped:g=!1,subtitle:l="",title:n="",href:s,wide:y=!1,titleTagType:$="p",centerTitle:h=!1,target:c,rel:f,disabled:o=!1,...x},b)=>a.jsxs(S,{ref:b,wide:y,disabled:o,...x,children:[r&&a.jsx(v,{}),a.jsxs(B,{children:[g&&a.jsx(T,{length:"5rem"}),u&&a.jsx(_,{children:a.jsx(u,{})}),a.jsxs(k,{custom:!0,centerTitle:h,children:[l&&a.jsx(z,{children:!o&&s&&!n?a.jsx("a",{href:s,target:c,rel:f,children:l}):l}),n&&a.jsx(R,{as:$,children:!o&&s?a.jsx("a",{href:s,target:c,rel:f,children:n}):n})]})]}),e&&a.jsx(E,{children:e})]}));p.displayName="Tile";const S=t.div`
  position: relative;
  display: inline-flex;
  flex: 1 1; /* adding auto here breaks IE11 on card list, beware */
  flex-direction: column;
  flex-wrap: wrap;
  align-items: stretch;
  ${({wide:e})=>e?"width: 100%":"max-width: 100%"};
  margin: 0;
  padding: ${({wide:e})=>e?`${i.medium} ${i.medium}`:`${i.large} ${i.medium}`};
  color: ${({disabled:e,theme:r})=>e?r.placeholder:r.paragraph};
  font-weight: normal;
  font-size: ${m.sizes.default};
  text-align: ${({wide:e})=>e?"left":"center"};
  text-decoration: none;
  background-color: ${({theme:e})=>e.white};
  border: none;
  border-radius: ${d.borderRadius};
  box-shadow: ${({theme:e})=>d.shadow.default(e.secondary)};
  cursor: ${({disabled:e})=>e?"auto":"pointer"};
  transition: ${({disabled:e})=>e?"none":"box-shadow ${animations.transitionTiming} linear, transform 100ms linear"};
  appearance: none;

  @media (max-width: ${j.mobile}) {
    padding: ${({wide:e})=>e?`${i.base} ${i.base}`:`${i.medium} ${i.base}`};
    font-size: ${m.sizes.small};
  }

  ${({disabled:e,theme:r})=>!e&&`&:hover,
  &:active,
  &:focus {
    color: ${r.paragraph};
    box-shadow: ${d.shadow.large(r.secondary)};
    transform: translateY(-2px);
  }`}
`,_=t.div`
  display: ${({theme:e})=>e.noColors?"none":"block"};
  width: 7.2rem;
  height: 7.2rem;
  margin: 0 auto ${i.tiny};
  padding: 1.4rem;
  background-color: ${({theme:e})=>e.bgSecondary};
  border-radius: 50%;
`,B=t.div`
  flex: 0 0 auto;
  width: 100%;
`,k=t.div`
  padding-right: ${({custom:e})=>e?i.small:"0"};
  min-height: ${({centerTitle:e})=>e?"5rem":"auto"};
  display: ${({centerTitle:e})=>e?"flex":"block"};
  align-items: ${({centerTitle:e})=>e?"center":"start"};
  justify-content: ${({centerTitle:e})=>e?"center":"start"};
  margin: ${({centerTitle:e})=>e?"0":"inherit"};

  a,
  a:hover {
    text-decoration: none;
  }
`,z=t(V)`
  &:last-child {
    margin-bottom: 0;
  }
`,R=t(q)`
  margin: 0;
  font-size: ${m.sizes.headings.small};
  font-family: "Open Sans", sans-serif;
  font-weight: 600;
`,E=t.div`
  flex: 1 1 auto;
  margin-top: ${i.small};
`;try{p.displayName="Tile",p.__docgenInfo={description:"",displayName:"Tile",props:{centerTitle:{defaultValue:{value:"false"},description:"",name:"centerTitle",required:!1,type:{name:"Boolean"}},custom:{defaultValue:{value:"false"},description:"",name:"custom",required:!1,type:{name:"Boolean"}},href:{defaultValue:null,description:"",name:"href",required:!1,type:{name:"string"}},icon:{defaultValue:null,description:"",name:"icon",required:!1,type:{name:"ElementType<any>"}},rel:{defaultValue:null,description:"",name:"rel",required:!1,type:{name:"string"}},striped:{defaultValue:{value:"false"},description:"",name:"striped",required:!1,type:{name:"Boolean"}},subtitle:{defaultValue:{value:""},description:"",name:"subtitle",required:!1,type:{name:"string"}},target:{defaultValue:null,description:"",name:"target",required:!1,type:{name:"string"}},title:{defaultValue:{value:""},description:"",name:"title",required:!1,type:{name:"string"}},titleTagType:{defaultValue:{value:"p"},description:"",name:"titleTagType",required:!1,type:{name:"ElementType<any>"}},wide:{defaultValue:{value:"false"},description:"",name:"wide",required:!1,type:{name:"Boolean"}},disabled:{defaultValue:{value:"false"},description:"",name:"disabled",required:!1,type:{name:"Boolean"}}}}}catch{}export{p as T};
//# sourceMappingURL=index-b3dcb09f.js.map
