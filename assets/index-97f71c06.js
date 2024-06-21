import{s,j as o,A as m}from"./styled-components.browser.esm-525a869c.js";import{A,d as q,c as S,b as P,a as F}from"./index-78bf1ccb.js";import{P as a}from"./index-8d47fad6.js";import{r as Z,R as j}from"./index-76fb7be0.js";import{H as J}from"./index-20fe2b6b.js";import{f as H}from"./keyframes-83470f70.js";import{c as N,b as p,s as i,a as l,f as u}from"./theme-664d9dda.js";function I(){return I=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var d in r)Object.prototype.hasOwnProperty.call(r,d)&&(e[d]=r[d])}return e},I.apply(this,arguments)}function Q(e,t){if(e==null)return{};var r=Y(e,t),d,n;if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(n=0;n<c.length;n++)d=c[n],!(t.indexOf(d)>=0)&&Object.prototype.propertyIsEnumerable.call(e,d)&&(r[d]=e[d])}return r}function Y(e,t){if(e==null)return{};var r={},d=Object.keys(e),n,c;for(c=0;c<d.length;c++)n=d[c],!(t.indexOf(n)>=0)&&(r[n]=e[n]);return r}var T=Z.forwardRef(function(e,t){var r=e.color,d=r===void 0?"currentColor":r,n=e.size,c=n===void 0?24:n,w=Q(e,["color","size"]);return j.createElement("svg",I({ref:t,xmlns:"http://www.w3.org/2000/svg",width:c,height:c,viewBox:"0 0 24 24",fill:"none",stroke:d,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},w),j.createElement("polyline",{points:"9 18 15 12 9 6"}))});T.propTypes={color:a.string,size:a.oneOfType([a.string,a.number])};T.displayName="ChevronRight";const K=T,D=s(K)`
  position: relative;
  flex: 0 0 auto;
  color: ${({theme:e})=>e.secondary};
  transform: rotate(0);
  transition: transform ${N.transitionTiming} linear;
  [aria-expanded="true"] &,
  [aria-selected="true"] & {
    transform: rotate(90deg);
  }
`,R=D,U=P,ee=s(({...e})=>{const{index:t,isLast:r,...d}=e;return o.jsx(A,{...d})})`
  ${({index:e,theme:t})=>e>0&&m`
      border-top: ${p.border(t.border)};
    `}
`,te=s(q)`
  padding: 0 ${i.base} ${i.base};
  animation: ${H} ${N.transitionTiming} ease-in;
  @media (max-width: ${l.mobile}) {
    padding: 0 0 ${i.small};
  }
`,k=({children:e,disableStyles:t=!1})=>o.jsxs(re,{children:[o.jsx(R,{"aria-hidden":"true"}),o.jsx(oe,{disableStyles:t,children:e})]});k.propTypes={children:a.node.isRequired,disableStyles:a.bool};const re=s(S)`
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
`,oe=s(({disableStyles:e,...t})=>o.jsx("div",{...t}))`
  margin: ${i.medium} 0 ${i.medium} ${i.small};
  color: ${({theme:e})=>e.title};
  ${({disableStyles:e})=>!e&&`
      font-weight: 600;
      font-size: ${u.sizes.headings.small};
  `}
  font-family: "Open Sans", sans-serif;
  line-height: ${u.lineHeightTitle};
  @media (max-width: ${l.mobile}) {
    font-size: ${u.sizes.default};
  }
`;k.__docgenInfo={description:"",methods:[],displayName:"ItemButton",props:{disableStyles:{defaultValue:{value:"false",computed:!1},type:{name:"bool"},required:!1,description:""},children:{type:{name:"node"},required:!0,description:""}}};const ie=Object.freeze(Object.defineProperty({__proto__:null,Accordion:U,Item:ee,ItemButton:k,ItemPanel:te},Symbol.toStringTag,{value:"Module"})),O=i.base,_=i.tiny,B="8rem",E="4.6rem",b="4rem",ne="0.4rem",v="3rem",ae="0.3rem",$="0.3rem",z="0.1rem",de=P,se=s(({index:e,isLast:t,...r})=>o.jsx(A,{...r}))`
  position: relative;
  ${({index:e})=>e>0&&m`
      margin-top: ${O};
    `}
  &:after {
    position: absolute;
    bottom: -1.4rem;
    left: calc(50% + ${B} / 2);
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
  @media (max-width: ${l.mobile}) {
    ${({index:e})=>e>0&&m`
        margin-top: ${_};
      `}
    &:after {
      left: calc(50% + ${E} / 2);
    }
  }
`,le=s(q)`
  margin-left: ${B};
  padding: 0 ${i.base} ${i.base};
  background-color: ${({theme:e})=>e.bgSecondary};
  border: ${({theme:e})=>p.border(e.noColors?e.border:e.bgSecondary)};
  border-top: transparent;
  border-radius: 0 0 ${p.borderRadius} ${p.borderRadius};
  @media (max-width: ${l.mobile}) {
    margin-left: ${E};
  }
`,C=({children:e,icon:t,index:r,isLast:d})=>o.jsxs(ce,{children:[o.jsxs(me,{index:r,isLast:d,children:[o.jsx(pe,{children:r+1}),o.jsx(ue,{})]}),o.jsxs(he,{index:r,children:[t&&o.jsx(fe,{children:o.jsx(t,{})}),o.jsx($e,{children:e}),o.jsx(R,{"aria-hidden":"true"})]})]});C.propTypes={children:a.node.isRequired,icon:a.elementType,index:a.number.isRequired,isLast:a.bool.isRequired};const ce=s(S)`
  display: flex;
  align-items: stretch;
  justify-content: stretch;
  cursor: pointer;
`,me=s.div`
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  &:before {
    position: absolute;
    top: -${O};
    left: calc(${b} / 2 - ${$} / 2);
    z-index: -1;
    width: ${$};
    height: calc(${O} + 4.5rem);
    background-color: ${({theme:e})=>e.secondary};
    content: "";
    ${({index:e})=>e===0&&m`
        display: none;
      `}
  }
  &:after {
    position: absolute;
    top: 4rem;
    left: calc(${b} / 2 - ${$} / 2);
    z-index: -1;
    width: ${$};
    height: calc(100% - 4rem);
    background-color: ${({theme:e})=>e.secondary};
    content: "";
    ${({isLast:e})=>e&&m`
        display: none;
      `}
  }
  @media (max-width: ${l.mobile}) {
    &:before {
      top: -${_};
      height: calc(${_} + 5rem);
    }
    ,
    &:before,
    &:after {
      left: calc(${v} / 2 - ${$} / 2);
    }
  }
`,pe=s.div`
  position: relative;
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  width: ${b};
  height: ${b};
  color: ${({theme:e})=>e.white};
  font-weight: bold;
  font-size: ${u.sizes.headings.small};
  background-color: ${({theme:e})=>e.secondary};
  border-radius: 50%;
  @media (max-width: ${l.mobile}) {
    width: ${v};
    height: ${v};
  }
`,V=(e,t,r)=>m`
  width: calc(${e} - ${t} - ${r});
  margin-left: ${r};
  &:before {
    top: calc(
      (${r} + ${t}) / -2 - 1.5 * ${z}
    );
    left: calc(-1 * ${r} - ${t} / 2);
    width: calc(${r} + ${t} / 2);
    height: calc((${r}) * 2 + ${t});
    border-top-right-radius: ${t};
    border-bottom-right-radius: ${t};
  }
`,ue=s.div`
  position: relative;
  height: ${z};
  background-color: ${({theme:e})=>e.secondary};
  ${V(B,b,ne)}
  &:before {
    position: absolute;
    z-index: -1;
    background-color: transparent;
    border: ${z} solid ${({theme:e})=>e.secondary};
    content: "";
  }
  @media (max-width: ${l.mobile}) {
    ${V(E,v,ae)}
  }
`,he=s.div`
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
  @media (max-width: ${l.mobile}) {
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
`,fe=s.div`
  display: ${({theme:e})=>e.noColors?"none":"block"};
  flex: 0 0 auto;
  width: 5.2rem;
  height: 5.2rem;
  margin-right: ${i.medium};
  @media (max-width: ${l.mobile}) {
    width: 3rem;
    height: 3rem;
    margin-right: ${i.small};
  }
`,$e=s.div`
  flex: 1 1 auto;
  color: ${({theme:e})=>e.title};
  font-weight: 600;
  font-size: ${u.sizes.headings.small};
  font-family: "Open Sans", sans-serif;
  @media (max-width: ${l.mobile}) {
    font-size: ${u.sizes.default};
  }
`;C.__docgenInfo={description:"",methods:[],displayName:"ItemButton",props:{children:{type:{name:"node"},required:!0,description:""},icon:{type:{name:"elementType"},required:!1,description:""},index:{type:{name:"number"},required:!0,description:""},isLast:{type:{name:"bool"},required:!0,description:""}}};const be=Object.freeze(Object.defineProperty({__proto__:null,Accordion:de,Item:se,ItemButton:C,ItemPanel:le},Symbol.toStringTag,{value:"Module"})),ge=s(P)`
  display: flex;
  flex-wrap: wrap;
  & > div {
    width: calc(50% - (${i.medium} / 2));
    &:nth-child(odd) {
      margin-right: ${i.medium};
    }
  }
  @media (max-width: ${l.tablet}) {
    & > div {
      width: 100%;
      &:nth-child(odd) {
        margin-right: 0;
      }
    }
  }
`,ye=s(({index:e,isLast:t,...r})=>o.jsx(A,{...r}))`
  position: relative;
  z-index: 1;
  background-color: ${({theme:e})=>e.white};
  border-radius: ${p.borderRadius};
  box-shadow: ${({theme:e})=>p.shadow.default(e.secondary)};
  ${({index:e})=>e>1&&m`
      margin-top: ${i.medium};
    `}
  @media (max-width: ${l.tablet}) {
    ${({index:e})=>e>0&&m`
        margin-top: ${i.medium};
      `}
  }
  @media (max-width: ${l.mobile}) {
    ${({index:e})=>e>0&&m`
        margin-top: ${i.small};
      `}
  }
`,xe=s(q)`
  padding: 0 ${i.base} ${i.base};
  animation: ${H} 0.35s ease-in;
  @media (max-width: ${l.mobile}) {
    padding: 0 ${i.small} ${i.small};
  }
`,L=({children:e,icon:t})=>o.jsxs(ve,{children:[o.jsxs(we,{children:[t&&o.jsx(je,{children:o.jsx(t,{})}),o.jsx(Ie,{children:e})]}),o.jsx(R,{"aria-hidden":"true"})]});L.propTypes={children:a.node.isRequired,icon:a.elementType};const ve=s(S)`
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
  @media (max-width: ${l.mobile}) {
    padding: ${i.base};
  }
`,we=s.div`
  display: flex;
  align-items: center;
`,je=s.div`
  display: ${({theme:e})=>e.noColors?"none":"block"};
  flex: 0 0 auto;
  width: 7.2rem;
  height: 7.2rem;
  margin-right: ${i.medium};
  padding: 1rem;
  background-color: ${({theme:e})=>e.bgSecondary};
  border-radius: 50%;
`,Ie=s.div`
  color: ${({theme:e})=>e.title};
  font-weight: 600;
  font-size: ${u.sizes.headings.small};
  font-family: "Open Sans", sans-serif;
  @media (max-width: ${l.mobile}) {
    font-size: ${u.sizes.default};
  }
`;L.__docgenInfo={description:"",methods:[],displayName:"ItemButton",props:{children:{type:{name:"node"},required:!0,description:""},icon:{type:{name:"elementType"},required:!1,description:""}}};const Oe=Object.freeze(Object.defineProperty({__proto__:null,Accordion:ge,Item:ye,ItemButton:L,ItemPanel:xe},Symbol.toStringTag,{value:"Module"})),x=Object.freeze(Object.defineProperty({__proto__:null,base:ie,hierarchy:be,tile:Oe},Symbol.toStringTag,{value:"Module"})),W=({items:e,disableStyles:t,variant:r,titleLevel:d,...n})=>{const c=x[r].Accordion,w=x[r].Item,G=x[r].ItemButton,X=x[r].ItemPanel;return j.useEffect(()=>{var g,y;if((g=n==null?void 0:n.preExpanded)!=null&&g.length&&((y=n.preExpanded[0])!=null&&y.length))try{const h=document==null?void 0:document.querySelector(`#${n.preExpanded[0]}`);h&&h.scrollIntoView()}catch{n.preExpanded=[]}},[n.preExpanded]),o.jsx(c,{...n,allowZeroExpanded:!0,allowMultipleExpanded:!0,preExpanded:n.preExpanded??[],children:e.map(({body:g,icon:y,id:h,title:M},f)=>o.jsx("div",{id:h,children:o.jsxs(w,{index:f,uuid:h,isLast:f===e.length-1,children:[o.jsx(F,{children:o.jsx(G,{icon:y,index:f,isLast:f===e.length-1,disableStyles:t,children:d&&d<=6?o.jsx(J,{as:"h"+d,stripe:"none",style:{margin:0},dataTestid:n["data-testid"]?`${n["data-testid"]}-${f}`:void 0,children:M}):o.jsx("p",{children:M})})}),o.jsx(X,{children:o.jsx(_e,{children:g})})]})},`${h}-${f}`))})};W.propTypes={"data-testid":a.string,disableStyles:a.bool,items:a.arrayOf(a.shape({body:a.node.isRequired,icon:a.elementType,id:a.string,title:a.string.isRequired})).isRequired,preExpanded:a.arrayOf(a.string),titleLevel:a.number.isRequired,variant:a.oneOf(["base","tile","hierarchy"])};W.defaultProps={preExpanded:[],variant:"base"};const _e=s.div`
  & > div:first-child > *:first-child,
  & > *:first-child {
    margin-top: 0;
  }

  & > *:last-child {
    margin-bottom: 0;
  }
`;W.__docgenInfo={description:"",methods:[],displayName:"Accordion",props:{preExpanded:{defaultValue:{value:"[]",computed:!1},type:{name:"arrayOf",value:{name:"string"}},required:!1,description:""},variant:{defaultValue:{value:'"base"',computed:!1},type:{name:"enum",value:[{value:'"base"',computed:!1},{value:'"tile"',computed:!1},{value:'"hierarchy"',computed:!1}]},required:!1,description:""},"data-testid":{type:{name:"string"},required:!1,description:""},disableStyles:{type:{name:"bool"},required:!1,description:""},items:{type:{name:"arrayOf",value:{name:"shape",value:{body:{name:"node",required:!0},icon:{name:"elementType",required:!1},id:{name:"string",required:!1},title:{name:"string",required:!0}}}},required:!0,description:""},titleLevel:{type:{name:"number"},required:!0,description:""}}};export{W as A,R as V};
//# sourceMappingURL=index-97f71c06.js.map
