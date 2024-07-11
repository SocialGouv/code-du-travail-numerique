import{s as d,j as o,A as m}from"./styled-components.browser.esm-525a869c.js";import{A,d as q,c as P,b as T,a as X}from"./index-78bf1ccb.js";import{P as a}from"./index-8d47fad6.js";import{r as F,R as j}from"./index-76fb7be0.js";import{H as Z}from"./index-20fe2b6b.js";import{f as H}from"./keyframes-83470f70.js";import{c as N,b as p,s as n,a as s,f as u}from"./theme-664d9dda.js";function I(){return I=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var i in r)Object.prototype.hasOwnProperty.call(r,i)&&(e[i]=r[i])}return e},I.apply(this,arguments)}function J(e,t){if(e==null)return{};var r=Q(e,t),i,l;if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(l=0;l<c.length;l++)i=c[l],!(t.indexOf(i)>=0)&&Object.prototype.propertyIsEnumerable.call(e,i)&&(r[i]=e[i])}return r}function Q(e,t){if(e==null)return{};var r={},i=Object.keys(e),l,c;for(c=0;c<i.length;c++)l=i[c],!(t.indexOf(l)>=0)&&(r[l]=e[l]);return r}var S=F.forwardRef(function(e,t){var r=e.color,i=r===void 0?"currentColor":r,l=e.size,c=l===void 0?24:l,w=J(e,["color","size"]);return j.createElement("svg",I({ref:t,xmlns:"http://www.w3.org/2000/svg",width:c,height:c,viewBox:"0 0 24 24",fill:"none",stroke:i,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},w),j.createElement("polyline",{points:"9 18 15 12 9 6"}))});S.propTypes={color:a.string,size:a.oneOfType([a.string,a.number])};S.displayName="ChevronRight";const Y=S,K=d(Y)`
  position: relative;
  flex: 0 0 auto;
  color: ${({theme:e})=>e.secondary};
  transform: rotate(0);
  transition: transform ${N.transitionTiming} linear;
  [aria-expanded="true"] &,
  [aria-selected="true"] & {
    transform: rotate(90deg);
  }
`,R=K,D=T,U=d(({...e})=>{const{index:t,isLast:r,...i}=e;return o.jsx(A,{...i})})`
  ${({index:e,theme:t})=>e>0&&m`
      border-top: ${p.border(t.border)};
    `}
`,ee=d(q)`
  padding: 0 ${n.base} ${n.base};
  animation: ${H} ${N.transitionTiming} ease-in;
  @media (max-width: ${s.mobile}) {
    padding: 0 0 ${n.small};
  }
`,k=({children:e})=>o.jsxs(te,{children:[o.jsx(R,{"aria-hidden":"true"}),o.jsx(re,{children:e})]});k.propTypes={children:a.node.isRequired};const te=d(P)`
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
`,re=d(({disableStyles:e,...t})=>o.jsx("div",{...t}))`
  margin: ${n.medium} 0 ${n.medium} ${n.small};
  color: ${({theme:e})=>e.title};
  font-weight: 600;
  font-size: ${u.sizes.headings.small};
  font-family: "Open Sans", sans-serif;
  line-height: ${u.lineHeightTitle};
  @media (max-width: ${s.mobile}) {
    font-size: ${u.sizes.default};
  }
`;k.__docgenInfo={description:"",methods:[],displayName:"ItemButton",props:{children:{type:{name:"node"},required:!0,description:""}}};const oe=Object.freeze(Object.defineProperty({__proto__:null,Accordion:D,Item:U,ItemButton:k,ItemPanel:ee},Symbol.toStringTag,{value:"Module"})),O=n.base,_=n.tiny,B="8rem",E="4.6rem",b="4rem",ie="0.4rem",v="3rem",ne="0.3rem",f="0.3rem",z="0.1rem",ae=T,de=d(({index:e,isLast:t,...r})=>o.jsx(A,{...r}))`
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
  @media (max-width: ${s.mobile}) {
    ${({index:e})=>e>0&&m`
        margin-top: ${_};
      `}
    &:after {
      left: calc(50% + ${E} / 2);
    }
  }
`,se=d(q)`
  margin-left: ${B};
  padding: 0 ${n.base} ${n.base};
  background-color: ${({theme:e})=>e.bgSecondary};
  border: ${({theme:e})=>p.border(e.noColors?e.border:e.bgSecondary)};
  border-top: transparent;
  border-radius: 0 0 ${p.borderRadius} ${p.borderRadius};
  @media (max-width: ${s.mobile}) {
    margin-left: ${E};
  }
`,C=({children:e,icon:t,index:r,isLast:i})=>o.jsxs(le,{children:[o.jsxs(ce,{index:r,isLast:i,children:[o.jsx(me,{children:r+1}),o.jsx(pe,{})]}),o.jsxs(ue,{index:r,children:[t&&o.jsx(he,{children:o.jsx(t,{})}),o.jsx($e,{children:e}),o.jsx(R,{"aria-hidden":"true"})]})]});C.propTypes={children:a.node.isRequired,icon:a.elementType,index:a.number.isRequired,isLast:a.bool.isRequired};const le=d(P)`
  display: flex;
  align-items: stretch;
  justify-content: stretch;
  cursor: pointer;
`,ce=d.div`
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  &:before {
    position: absolute;
    top: -${O};
    left: calc(${b} / 2 - ${f} / 2);
    z-index: -1;
    width: ${f};
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
    left: calc(${b} / 2 - ${f} / 2);
    z-index: -1;
    width: ${f};
    height: calc(100% - 4rem);
    background-color: ${({theme:e})=>e.secondary};
    content: "";
    ${({isLast:e})=>e&&m`
        display: none;
      `}
  }
  @media (max-width: ${s.mobile}) {
    &:before {
      top: -${_};
      height: calc(${_} + 5rem);
    }
    ,
    &:before,
    &:after {
      left: calc(${v} / 2 - ${f} / 2);
    }
  }
`,me=d.div`
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
  @media (max-width: ${s.mobile}) {
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
`,pe=d.div`
  position: relative;
  height: ${z};
  background-color: ${({theme:e})=>e.secondary};
  ${V(B,b,ie)}
  &:before {
    position: absolute;
    z-index: -1;
    background-color: transparent;
    border: ${z} solid ${({theme:e})=>e.secondary};
    content: "";
  }
  @media (max-width: ${s.mobile}) {
    ${V(E,v,ne)}
  }
`,ue=d.div`
  position: relative;
  z-index: 0;
  display: flex;
  flex: 1 1 auto;
  align-items: center;
  padding: ${n.xmedium};
  background-color: ${({theme:e})=>e.bgSecondary};
  border: ${({theme:e})=>p.border(e.noColors?e.border:e.bgSecondary)};
  border-radius: ${p.borderRadius};
  [aria-expanded="true"] &,
  [aria-selected="true"] & {
    border-bottom: 1px solid transparent;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }
  @media (max-width: ${s.mobile}) {
    padding: ${n.base};
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
`,he=d.div`
  display: ${({theme:e})=>e.noColors?"none":"block"};
  flex: 0 0 auto;
  width: 5.2rem;
  height: 5.2rem;
  margin-right: ${n.medium};
  @media (max-width: ${s.mobile}) {
    width: 3rem;
    height: 3rem;
    margin-right: ${n.small};
  }
`,$e=d.div`
  flex: 1 1 auto;
  color: ${({theme:e})=>e.title};
  font-weight: 600;
  font-size: ${u.sizes.headings.small};
  font-family: "Open Sans", sans-serif;
  @media (max-width: ${s.mobile}) {
    font-size: ${u.sizes.default};
  }
`;C.__docgenInfo={description:"",methods:[],displayName:"ItemButton",props:{children:{type:{name:"node"},required:!0,description:""},icon:{type:{name:"elementType"},required:!1,description:""},index:{type:{name:"number"},required:!0,description:""},isLast:{type:{name:"bool"},required:!0,description:""}}};const fe=Object.freeze(Object.defineProperty({__proto__:null,Accordion:ae,Item:de,ItemButton:C,ItemPanel:se},Symbol.toStringTag,{value:"Module"})),be=d(T)`
  display: flex;
  flex-wrap: wrap;
  & > div {
    width: calc(50% - (${n.medium} / 2));
    &:nth-child(odd) {
      margin-right: ${n.medium};
    }
  }
  @media (max-width: ${s.tablet}) {
    & > div {
      width: 100%;
      &:nth-child(odd) {
        margin-right: 0;
      }
    }
  }
`,ge=d(({index:e,isLast:t,...r})=>o.jsx(A,{...r}))`
  position: relative;
  z-index: 1;
  background-color: ${({theme:e})=>e.white};
  border-radius: ${p.borderRadius};
  box-shadow: ${({theme:e})=>p.shadow.default(e.secondary)};
  ${({index:e})=>e>1&&m`
      margin-top: ${n.medium};
    `}
  @media (max-width: ${s.tablet}) {
    ${({index:e})=>e>0&&m`
        margin-top: ${n.medium};
      `}
  }
  @media (max-width: ${s.mobile}) {
    ${({index:e})=>e>0&&m`
        margin-top: ${n.small};
      `}
  }
`,xe=d(q)`
  padding: 0 ${n.base} ${n.base};
  animation: ${H} 0.35s ease-in;
  @media (max-width: ${s.mobile}) {
    padding: 0 ${n.small} ${n.small};
  }
`,L=({children:e,icon:t})=>o.jsxs(ye,{children:[o.jsxs(ve,{children:[t&&o.jsx(we,{children:o.jsx(t,{})}),o.jsx(je,{children:e})]}),o.jsx(R,{"aria-hidden":"true"})]});L.propTypes={children:a.node.isRequired,icon:a.elementType};const ye=d(P)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${n.xmedium};
  overflow: hidden;
  cursor: pointer;
  &:hover,
  &:focus,
  &:focus-within,
  &[aria-expanded="true"] {
    color: ${({theme:e})=>e.paragraph};
  }
  @media (max-width: ${s.mobile}) {
    padding: ${n.base};
  }
`,ve=d.div`
  display: flex;
  align-items: center;
`,we=d.div`
  display: ${({theme:e})=>e.noColors?"none":"block"};
  flex: 0 0 auto;
  width: 7.2rem;
  height: 7.2rem;
  margin-right: ${n.medium};
  padding: 1rem;
  background-color: ${({theme:e})=>e.bgSecondary};
  border-radius: 50%;
`,je=d.div`
  color: ${({theme:e})=>e.title};
  font-weight: 600;
  font-size: ${u.sizes.headings.small};
  font-family: "Open Sans", sans-serif;
  @media (max-width: ${s.mobile}) {
    font-size: ${u.sizes.default};
  }
`;L.__docgenInfo={description:"",methods:[],displayName:"ItemButton",props:{children:{type:{name:"node"},required:!0,description:""},icon:{type:{name:"elementType"},required:!1,description:""}}};const Ie=Object.freeze(Object.defineProperty({__proto__:null,Accordion:be,Item:ge,ItemButton:L,ItemPanel:xe},Symbol.toStringTag,{value:"Module"})),y=Object.freeze(Object.defineProperty({__proto__:null,base:oe,hierarchy:fe,tile:Ie},Symbol.toStringTag,{value:"Module"})),W=({items:e,variant:t,titleLevel:r,...i})=>{const l=y[t].Accordion,c=y[t].Item,w=y[t].ItemButton,G=y[t].ItemPanel;return j.useEffect(()=>{var g,x;if((g=i==null?void 0:i.preExpanded)!=null&&g.length&&((x=i.preExpanded[0])!=null&&x.length))try{const h=document==null?void 0:document.querySelector(`#${i.preExpanded[0]}`);h&&h.scrollIntoView()}catch{i.preExpanded=[]}},[i.preExpanded]),o.jsx(l,{...i,allowZeroExpanded:!0,allowMultipleExpanded:!0,preExpanded:i.preExpanded??[],children:e.map(({body:g,icon:x,id:h,title:M},$)=>o.jsx("div",{id:h,children:o.jsxs(c,{index:$,uuid:h,isLast:$===e.length-1,children:[o.jsx(X,{children:o.jsx(w,{icon:x,index:$,isLast:$===e.length-1,children:r&&r<=6?o.jsx(Z,{as:"h"+r,stripe:"none",style:{margin:0},dataTestid:i["data-testid"]?`${i["data-testid"]}-${$}`:void 0,children:M}):o.jsx("p",{children:M})})}),o.jsx(G,{children:o.jsx(Oe,{children:g})})]})},`${h}-${$}`))})};W.propTypes={"data-testid":a.string,items:a.arrayOf(a.shape({body:a.node.isRequired,icon:a.elementType,id:a.string,title:a.string.isRequired})).isRequired,preExpanded:a.arrayOf(a.string),titleLevel:a.number.isRequired,variant:a.oneOf(["base","tile","hierarchy"])};W.defaultProps={preExpanded:[],variant:"base"};const Oe=d.div`
  & > div:first-child > *:first-child,
  & > *:first-child {
    margin-top: 0;
  }

  & > *:last-child {
    margin-bottom: 0;
  }
`;W.__docgenInfo={description:"",methods:[],displayName:"Accordion",props:{preExpanded:{defaultValue:{value:"[]",computed:!1},type:{name:"arrayOf",value:{name:"string"}},required:!1,description:""},variant:{defaultValue:{value:'"base"',computed:!1},type:{name:"enum",value:[{value:'"base"',computed:!1},{value:'"tile"',computed:!1},{value:'"hierarchy"',computed:!1}]},required:!1,description:""},"data-testid":{type:{name:"string"},required:!1,description:""},items:{type:{name:"arrayOf",value:{name:"shape",value:{body:{name:"node",required:!0},icon:{name:"elementType",required:!1},id:{name:"string",required:!1},title:{name:"string",required:!0}}}},required:!0,description:""},titleLevel:{type:{name:"number"},required:!0,description:""}}};export{W as A,R as V};
//# sourceMappingURL=index-db57b051.js.map
