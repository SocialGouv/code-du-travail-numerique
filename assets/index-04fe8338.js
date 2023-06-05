import{s as t,A as n}from"./styled-components.browser.esm-41178855.js";import{b as l}from"./theme-6e379713.js";const r=t.span`
  position: absolute;
  background-color: ${({variant:e,theme:a})=>a[e]};
  border-radius: ${({rounded:e})=>e?l.borderRadius:"0"};
  ${({position:e,length:a})=>n`
      top: ${e==="top"?"0":"50%"};
      left: ${e==="left"?"0":"50%"};
      width: ${e==="top"?a:"0.4rem"};
      height: ${e==="left"?a:"0.4rem"};
      transform: ${`translate${e==="top"?"X":"Y"}(-50%)`};
    `}
`;r.defaultProps={length:"7rem",position:"top",rounded:!1,variant:"secondary"};try{r.displayName="Stripe",r.__docgenInfo={description:"",displayName:"Stripe",props:{ref:{defaultValue:null,description:"",name:"ref",required:!1,type:{name:"((instance: HTMLSpanElement | null) => void) | RefObject<HTMLSpanElement> | null"}},length:{defaultValue:{value:"7rem"},description:"",name:"length",required:!1,type:{name:"string"}},variant:{defaultValue:{value:"secondary"},description:"",name:"variant",required:!1,type:{name:"enum",value:[{value:'"secondary"'},{value:'"primary"'}]}},rounded:{defaultValue:{value:"false"},description:"",name:"rounded",required:!1,type:{name:"boolean"}},position:{defaultValue:{value:"top"},description:"",name:"position",required:!1,type:{name:"enum",value:[{value:'"left"'},{value:'"top"'}]}},theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"any"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"undefined"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"undefined"}}}}}catch{}export{r as S};
//# sourceMappingURL=index-04fe8338.js.map
