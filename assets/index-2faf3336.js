import{j as l,s as r,A as d}from"./styled-components.browser.esm-41178855.js";import{S as u}from"./index-5a013f77.js";import{s as a,f as t,a as s}from"./theme-2d6880ff.js";const n=e=>l.jsxs(m,{as:e.as,stripe:e.stripe,shift:e.shift,isFirst:e.isFirst,style:e.style,role:e.role,"aria-level":e.ariaLevel,id:e.id,"data-testid":e.dataTestid??"heading",children:[e.stripe!=="none"&&l.jsx(u,{"data-testid":"stripe",rounded:e.variant!=="primary",variant:e.variant??"primary",position:e.stripe??"top",length:"100%"}),e.children]});n.defaultProps={isFirst:!1,stripe:"none",variant:"secondary"};const m=r.h3`
  position: relative;
  display: block;
  margin: ${({isFirst:e})=>e?0:a.large} 0
    ${a.medium} 0;
  color: ${({theme:e})=>e.title};
  font-weight: 600;
  font-size: ${t.sizes.headings.small};
  font-family: "Open Sans", sans-serif;
  line-height: ${t.lineHeight};
  ${({stripe:e,shift:i})=>{if(e==="left")return d`
        margin-left: ${i?`-${i}`:"0"};
        padding-left: ${i||a.base};
        @media (max-width: ${s.mobile}) {
          margin-left: -${a.small};
          padding-left: ${a.base};
        }
      `}};
  @media (max-width: ${s.mobile}) {
    font-size: ${t.sizes.default};
  }
`;try{n.displayName="Heading",n.__docgenInfo={description:"",displayName:"Heading",props:{stripe:{defaultValue:{value:"none"},description:"",name:"stripe",required:!1,type:{name:"enum",value:[{value:'"none"'},{value:'"left"'}]}},variant:{defaultValue:{value:"secondary"},description:"",name:"variant",required:!1,type:{name:"enum",value:[{value:'"secondary"'},{value:'"primary"'}]}},isFirst:{defaultValue:{value:"false"},description:"",name:"isFirst",required:!1,type:{name:"boolean"}},shift:{defaultValue:null,description:"",name:"shift",required:!1,type:{name:"string"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"ElementType<any>"}},style:{defaultValue:null,description:"",name:"style",required:!1,type:{name:"CSSProperties"}},role:{defaultValue:null,description:"",name:"role",required:!1,type:{name:"string"}},ariaLevel:{defaultValue:null,description:"",name:"ariaLevel",required:!1,type:{name:"string | number"}},id:{defaultValue:null,description:"",name:"id",required:!1,type:{name:"string"}},dataTestid:{defaultValue:null,description:"",name:"dataTestid",required:!1,type:{name:"string"}}}}}catch{}export{n as H};
//# sourceMappingURL=index-2faf3336.js.map
