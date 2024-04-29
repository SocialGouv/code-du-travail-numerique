import{s as l,A as n}from"./styled-components.browser.esm-525a869c.js";import{b as t}from"./theme-6bad1081.js";const r=l.span`
  position: absolute;
  background-color: ${({variant:e,theme:a})=>a[e??"secondary"]};
  border-radius: ${({rounded:e})=>e?t.borderRadius:"0"};
  ${({position:e="top",length:a="7rem"})=>n`
      top: ${e==="top"?"0":"50%"};
      left: ${e==="left"?"0":"50%"};
      width: ${e==="top"?a:"0.4rem"};
      height: ${e==="left"?a:"0.4rem"};
      transform: ${`translate${e==="top"?"X":"Y"}(-50%)`};
    `}
`;try{r.displayName="Stripe",r.__docgenInfo={description:"",displayName:"Stripe",props:{variant:{defaultValue:null,description:"",name:"variant",required:!1,type:{name:"enum",value:[{value:'"primary"'},{value:'"secondary"'}]}},ref:{defaultValue:null,description:"",name:"ref",required:!1,type:{name:"((instance: HTMLSpanElement | null) => void) | RefObject<HTMLSpanElement> | null"}},length:{defaultValue:null,description:"",name:"length",required:!1,type:{name:"string"}},rounded:{defaultValue:null,description:"",name:"rounded",required:!1,type:{name:"boolean"}},position:{defaultValue:null,description:"",name:"position",required:!1,type:{name:"enum",value:[{value:'"left"'},{value:'"top"'}]}},theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"any"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"undefined"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"undefined"}}}}}catch{}export{r as S};
//# sourceMappingURL=index-db26d228.js.map
