import{s as a,j as o,A as m}from"./styled-components.browser.esm-beddb3d4.js";import{A as O,d as _,c as z,b as A,a as F}from"./index-78bf1ccb.js";import{P as n}from"./index-8d47fad6.js";import{H as Z}from"./index-e0aa44f4.js";import{f as M}from"./keyframes-dddb9d72.js";import{c as V,b as p,s as i,a as d,f as u}from"./theme-a9d9eda1.js";import{r as J,R as E}from"./index-76fb7be0.js";function v(){return v=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var s in r)Object.prototype.hasOwnProperty.call(r,s)&&(e[s]=r[s])}return e},v.apply(this,arguments)}function Q(e,t){if(e==null)return{};var r=Y(e,t),s,l;if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(l=0;l<c.length;l++)s=c[l],!(t.indexOf(s)>=0)&&Object.prototype.propertyIsEnumerable.call(e,s)&&(r[s]=e[s])}return r}function Y(e,t){if(e==null)return{};var r={},s=Object.keys(e),l,c;for(c=0;c<s.length;c++)l=s[c],!(t.indexOf(l)>=0)&&(r[l]=e[l]);return r}var q=J.forwardRef(function(e,t){var r=e.color,s=r===void 0?"currentColor":r,l=e.size,c=l===void 0?24:l,y=Q(e,["color","size"]);return E.createElement("svg",v({ref:t,xmlns:"http://www.w3.org/2000/svg",width:c,height:c,viewBox:"0 0 24 24",fill:"none",stroke:s,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},y),E.createElement("polyline",{points:"9 18 15 12 9 6"}))});q.propTypes={color:n.string,size:n.oneOfType([n.string,n.number])};q.displayName="ChevronRight";const K=q,D=a(K)`
  position: relative;
  flex: 0 0 auto;
  color: ${({theme:e})=>e.secondary};
  transform: rotate(0);
  transition: transform ${V.transitionTiming} linear;
  [aria-expanded="true"] &,
  [aria-selected="true"] & {
    transform: rotate(90deg);
  }
`,S=D,U=A,ee=a(({...e})=>{const{index:t,isLast:r,...s}=e;return o.jsx(O,{...s})})`
  ${({index:e,theme:t})=>e>0&&m`
      border-top: ${p.border(t.border)};
    `}
`,te=a(_)`
  padding: 0 ${i.base} ${i.base};
  animation: ${M} ${V.transitionTiming} ease-in;
  @media (max-width: ${d.mobile}) {
    padding: 0 0 ${i.small};
  }
`,P=({children:e,disableStyles:t=!1})=>o.jsxs(re,{children:[o.jsx(S,{"aria-hidden":"true"}),o.jsx(oe,{disableStyles:t,children:e})]});P.propTypes={children:n.node.isRequired,disableStyles:n.bool};const re=a(z)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
  cursor: pointer;
  &:hover,
  &:focus,
  &:focus-within,
  &[aria-expanded="true"] {
    color: ${({theme:e})=>e.paragraph};
  }
`,oe=a(({disableStyles:e,...t})=>o.jsx("div",{...t}))`
  margin: ${i.medium} 0 ${i.medium} ${i.small};
  color: ${({theme:e})=>e.title};
  ${({disableStyles:e})=>!e&&`
      font-weight: 600;
      font-size: ${u.sizes.headings.small};
  `}
  font-family: "Open Sans", sans-serif;
  line-height: ${u.lineHeightTitle};
  @media (max-width: ${d.mobile}) {
    font-size: ${u.sizes.default};
  }
`;P.__docgenInfo={description:"",methods:[],displayName:"ItemButton",props:{disableStyles:{defaultValue:{value:"false",computed:!1},type:{name:"bool"},required:!1,description:""},children:{type:{name:"node"},required:!0,description:""}}};const ie=Object.freeze(Object.defineProperty({__proto__:null,Accordion:U,Item:ee,ItemButton:P,ItemPanel:te},Symbol.toStringTag,{value:"Module"})),w=i.base,j=i.tiny,T="8rem",R="4.6rem",f="4rem",ne="0.4rem",g="3rem",ae="0.3rem",h="0.3rem",I="0.1rem",se=A,de=a(({index:e,isLast:t,...r})=>o.jsx(O,{...r}))`
  position: relative;
  ${({index:e})=>e>0&&m`
      margin-top: ${w};
    `}
  &:after {
    position: absolute;
    bottom: -1.4rem;
    left: calc(50% + ${T} / 2);
    z-index: 1;
    display: ${({theme:e})=>e.noColors?"none":"block"};
    width: 0;
    height: 0;
    border-top: 1.5rem solid ${({theme:e})=>e.bgSecondary};
    border-right: 2.5rem solid transparent;
    border-bottom: 0 solid transparent;
    border-left: 2.5rem solid transparent;
    transform: translateX(-1.5rem);
    content: "";
    user-select: none;
    ${({isLast:e})=>e&&m`
        display: none;
      `}
  }
  @media (max-width: ${d.mobile}) {
    ${({index:e})=>e>0&&m`
        margin-top: ${j};
      `}
    &:after {
      left: calc(50% + ${R} / 2);
    }
  }
`,le=a(_)`
  margin-left: ${T};
  padding: 0 ${i.base} ${i.base};
  background-color: ${({theme:e})=>e.bgSecondary};
  border: ${({theme:e})=>p.border(e.noColors?e.border:e.bgSecondary)};
  border-top: transparent;
  border-radius: 0 0 ${p.borderRadius} ${p.borderRadius};
  @media (max-width: ${d.mobile}) {
    margin-left: ${R};
  }
`,k=({children:e,icon:t,index:r,isLast:s})=>o.jsxs(ce,{children:[o.jsxs(me,{index:r,isLast:s,children:[o.jsx(pe,{children:r+1}),o.jsx(ue,{})]}),o.jsxs($e,{index:r,children:[t&&o.jsx(he,{children:o.jsx(t,{})}),o.jsx(fe,{children:e}),o.jsx(S,{"aria-hidden":"true"})]})]});k.propTypes={children:n.node.isRequired,icon:n.elementType,index:n.number.isRequired,isLast:n.bool.isRequired};const ce=a(z)`
  display: flex;
  align-items: stretch;
  justify-content: stretch;
  cursor: pointer;
`,me=a.div`
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  &:before {
    position: absolute;
    top: -${w};
    left: calc(${f} / 2 - ${h} / 2);
    z-index: -1;
    width: ${h};
    height: calc(${w} + 4.5rem);
    background-color: ${({theme:e})=>e.secondary};
    content: "";
    ${({index:e})=>e===0&&m`
        display: none;
      `}
  }
  &:after {
    position: absolute;
    top: 4rem;
    left: calc(${f} / 2 - ${h} / 2);
    z-index: -1;
    width: ${h};
    height: calc(100% - 4rem);
    background-color: ${({theme:e})=>e.secondary};
    content: "";
    ${({isLast:e})=>e&&m`
        display: none;
      `}
  }
  @media (max-width: ${d.mobile}) {
    &:before {
      top: -${j};
      height: calc(${j} + 5rem);
    }
    ,
    &:before,
    &:after {
      left: calc(${g} / 2 - ${h} / 2);
    }
  }
`,pe=a.div`
  position: relative;
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  width: ${f};
  height: ${f};
  color: ${({theme:e})=>e.white};
  font-weight: bold;
  font-size: ${u.sizes.headings.small};
  background-color: ${({theme:e})=>e.secondary};
  border-radius: 50%;
  @media (max-width: ${d.mobile}) {
    width: ${g};
    height: ${g};
  }
`,W=(e,t,r)=>m`
  width: calc(${e} - ${t} - ${r});
  margin-left: ${r};
  &:before {
    top: calc(
      (${r} + ${t}) / -2 - 1.5 * ${I}
    );
    left: calc(-1 * ${r} - ${t} / 2);
    width: calc(${r} + ${t} / 2);
    height: calc((${r}) * 2 + ${t});
    border-top-right-radius: ${t};
    border-bottom-right-radius: ${t};
  }
`,ue=a.div`
  position: relative;
  height: ${I};
  background-color: ${({theme:e})=>e.secondary};
  ${W(T,f,ne)}
  &:before {
    position: absolute;
    z-index: -1;
    background-color: transparent;
    border: ${I} solid ${({theme:e})=>e.secondary};
    content: "";
  }
  @media (max-width: ${d.mobile}) {
    ${W(R,g,ae)}
  }
`,$e=a.div`
  position: relative;
  z-index: 0;
  display: flex;
  flex: 1 1 auto;
  align-items: center;
  padding: ${i.xmedium};
  background-color: ${({theme:e})=>e.bgSecondary};
  border: ${({theme:e})=>p.border(e.noColors?e.border:e.bgSecondary)};
  border-radius: ${p.borderRadius};
  [aria-expanded="true"] &,
  [aria-selected="true"] & {
    border-bottom: 1px solid transparent;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }
  @media (max-width: ${d.mobile}) {
    padding: ${i.base};
  }
  &:before {
    position: absolute;
    top: -1px;
    left: 50%;
    z-index: 1;
    display: ${({theme:e})=>e.noColors?"none":"block"};
    width: 0;
    height: 0;
    border-top: 1.5rem solid ${({theme:e})=>e.white};
    border-right: 2.5rem solid transparent;
    border-bottom: 0 solid transparent;
    border-left: 2.5rem solid transparent;
    transform: translateX(-1.5rem);
    content: "";
    ${({index:e})=>e===0&&m`
        display: none;
      `}
  }
`,he=a.div`
  display: ${({theme:e})=>e.noColors?"none":"block"};
  flex: 0 0 auto;
  width: 5.2rem;
  height: 5.2rem;
  margin-right: ${i.medium};
  @media (max-width: ${d.mobile}) {
    width: 3rem;
    height: 3rem;
    margin-right: ${i.small};
  }
`,fe=a.div`
  flex: 1 1 auto;
  color: ${({theme:e})=>e.title};
  font-weight: 600;
  font-size: ${u.sizes.headings.small};
  font-family: "Open Sans", sans-serif;
  @media (max-width: ${d.mobile}) {
    font-size: ${u.sizes.default};
  }
`;k.__docgenInfo={description:"",methods:[],displayName:"ItemButton",props:{children:{type:{name:"node"},required:!0,description:""},icon:{type:{name:"elementType"},required:!1,description:""},index:{type:{name:"number"},required:!0,description:""},isLast:{type:{name:"bool"},required:!0,description:""}}};const be=Object.freeze(Object.defineProperty({__proto__:null,Accordion:se,Item:de,ItemButton:k,ItemPanel:le},Symbol.toStringTag,{value:"Module"})),ge=a(A)`
  display: flex;
  flex-wrap: wrap;
  & > div {
    width: calc(50% - (${i.medium} / 2));
    &:nth-child(odd) {
      margin-right: ${i.medium};
    }
  }
  @media (max-width: ${d.tablet}) {
    & > div {
      width: 100%;
      &:nth-child(odd) {
        margin-right: 0;
      }
    }
  }
`,ye=a(({index:e,isLast:t,...r})=>o.jsx(O,{...r}))`
  position: relative;
  z-index: 1;
  background-color: ${({theme:e})=>e.white};
  border-radius: ${p.borderRadius};
  box-shadow: ${({theme:e})=>p.shadow.default(e.secondary)};
  ${({index:e})=>e>1&&m`
      margin-top: ${i.medium};
    `}
  @media (max-width: ${d.tablet}) {
    ${({index:e})=>e>0&&m`
        margin-top: ${i.medium};
      `}
  }
  @media (max-width: ${d.mobile}) {
    ${({index:e})=>e>0&&m`
        margin-top: ${i.small};
      `}
  }
`,xe=a(_)`
  padding: 0 ${i.base} ${i.base};
  animation: ${M} 0.35s ease-in;
  @media (max-width: ${d.mobile}) {
    padding: 0 ${i.small} ${i.small};
  }
`,B=({children:e,icon:t})=>o.jsxs(ve,{children:[o.jsxs(we,{children:[t&&o.jsx(je,{children:o.jsx(t,{})}),o.jsx(Ie,{children:e})]}),o.jsx(S,{"aria-hidden":"true"})]});B.propTypes={children:n.node.isRequired,icon:n.elementType};const ve=a(z)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${i.xmedium};
  overflow: hidden;
  cursor: pointer;
  &:hover,
  &:focus,
  &:focus-within,
  &[aria-expanded="true"] {
    color: ${({theme:e})=>e.paragraph};
  }
  @media (max-width: ${d.mobile}) {
    padding: ${i.base};
  }
`,we=a.div`
  display: flex;
  align-items: center;
`,je=a.div`
  display: ${({theme:e})=>e.noColors?"none":"block"};
  flex: 0 0 auto;
  width: 7.2rem;
  height: 7.2rem;
  margin-right: ${i.medium};
  padding: 1rem;
  background-color: ${({theme:e})=>e.bgSecondary};
  border-radius: 50%;
`,Ie=a.div`
  color: ${({theme:e})=>e.title};
  font-weight: 600;
  font-size: ${u.sizes.headings.small};
  font-family: "Open Sans", sans-serif;
  @media (max-width: ${d.mobile}) {
    font-size: ${u.sizes.default};
  }
`;B.__docgenInfo={description:"",methods:[],displayName:"ItemButton",props:{children:{type:{name:"node"},required:!0,description:""},icon:{type:{name:"elementType"},required:!1,description:""}}};const Oe=Object.freeze(Object.defineProperty({__proto__:null,Accordion:ge,Item:ye,ItemButton:B,ItemPanel:xe},Symbol.toStringTag,{value:"Module"})),b=Object.freeze(Object.defineProperty({__proto__:null,base:ie,hierarchy:be,tile:Oe},Symbol.toStringTag,{value:"Module"})),L=({items:e,disableStyles:t,variant:r,titleLevel:s,...l})=>{const c=b[r].Accordion,y=b[r].Item,H=b[r].ItemButton,N=b[r].ItemPanel;return o.jsx(c,{allowZeroExpanded:!0,allowMultipleExpanded:!0,...l,children:e.map(({body:G,icon:X,id:x,title:C},$)=>o.jsx("div",{id:x,children:o.jsxs(y,{index:$,uuid:x,isLast:$===e.length-1,children:[o.jsx(F,{children:o.jsx(H,{icon:X,index:$,isLast:$===e.length-1,disableStyles:t,children:s?o.jsx(Z,{as:"h"+s,stripe:"none",style:{margin:0},dataTestid:`${l["data-testid"]}-${$}`,children:C}):o.jsx("p",{children:C})})}),o.jsx(N,{children:o.jsx(_e,{children:G})})]})},`${x}-${$}`))})};L.propTypes={"data-testid":n.string,disableStyles:n.bool,items:n.arrayOf(n.shape({body:n.node.isRequired,icon:n.elementType,id:n.string,title:n.string.isRequired})).isRequired,preExpanded:n.arrayOf(n.string),titleLevel:n.number.isRequired,variant:n.oneOf(["base","tile","hierarchy"])};L.defaultProps={preExpanded:[],variant:"base"};const _e=a.div`
  & > div:first-child > *:first-child,
  & > *:first-child {
    margin-top: 0;
  }

  & > *:last-child {
    margin-bottom: 0;
  }
`;L.__docgenInfo={description:"",methods:[],displayName:"Accordion",props:{preExpanded:{defaultValue:{value:"[]",computed:!1},type:{name:"arrayOf",value:{name:"string"}},required:!1,description:""},variant:{defaultValue:{value:'"base"',computed:!1},type:{name:"enum",value:[{value:'"base"',computed:!1},{value:'"tile"',computed:!1},{value:'"hierarchy"',computed:!1}]},required:!1,description:""},"data-testid":{type:{name:"string"},required:!1,description:""},disableStyles:{type:{name:"bool"},required:!1,description:""},items:{type:{name:"arrayOf",value:{name:"shape",value:{body:{name:"node",required:!0},icon:{name:"elementType",required:!1},id:{name:"string",required:!1},title:{name:"string",required:!0}}}},required:!0,description:""},titleLevel:{type:{name:"number"},required:!0,description:""}}};export{L as A,S as V};
//# sourceMappingURL=index-9c5b5adf.js.map
