import{s as d,j as n,A as N}from"./styled-components.browser.esm-525a869c.js";import{A as D,S as C,E}from"./ShareWhatsapp-32297fb2.js";import{S as o}from"./index-feda07e2.js";import{P as i}from"./index-8d47fad6.js";import{b as p,s as a,a as _,f as w,c as P}from"./theme-664d9dda.js";import{R as V,r as g}from"./index-76fb7be0.js";import{S as H}from"./index-bf4410fe.js";import{T as A}from"./index-9f058b14.js";import"./_commonjsHelpers-de833af9.js";import"./polished.esm-ee8b58af.js";const x=({label:e,name:r,id:t,size:s,checked:m,...u})=>n.jsxs(L,{htmlFor:t,size:s,children:[n.jsx(W,{type:"checkbox",name:r,id:t,size:s,checked:m,...u}),e]});x.propTypes={checked:i.bool,id:i.string.isRequired,label:i.oneOfType([i.string,i.node]).isRequired,name:i.string.isRequired,size:i.string};x.defaultProps={size:"1.6rem"};const L=d.label`
  display: flex;
  font-size: ${e=>e.size};
  cursor: pointer;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
`,W=d.input`
  position: relative;
  display: block;
  flex-shrink: 0;
  width: calc(${e=>e.size} * 1.25);
  height: calc(${e=>e.size} * 1.25);
  margin: calc(${e=>e.size} / 5)
    calc(2 * ${e=>e.size} / 3) 0 0;
  background: ${({theme:e})=>e.white};
  border: ${({theme:e})=>p.border(e.border)};
  border-radius: ${a.tiny};
  cursor: pointer;
  appearance: none;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  &:before {
    position: absolute;
    top: 50%;
    left: 50%;
    display: none;
    width: calc(${e=>e.size} / 3);
    height: calc(${e=>e.size} / 1.7);
    border: ${({theme:e})=>p.border(e.white)};
    border-width: 0 calc(${e=>e.size} / 10)
      calc(${e=>e.size} / 10) 0;
    transform: translate(-50%, -60%) rotate(45deg);
    content: "";
  }
  &:checked {
    background-color: ${({theme:e})=>e.primary};
    &:before {
      display: block;
    }
  }
`;x.__docgenInfo={description:"",methods:[],displayName:"InputCheckbox",props:{size:{defaultValue:{value:'"1.6rem"',computed:!1},type:{name:"string"},required:!1,description:""},checked:{type:{name:"bool"},required:!1,description:""},id:{type:{name:"string"},required:!0,description:""},label:{type:{name:"union",value:[{name:"string"},{name:"node"}]},required:!0,description:""},name:{type:{name:"string"},required:!0,description:""}}};const q=({children:e,...r})=>n.jsxs(B,{...r,children:[" ",e]});q.propTypes={children:i.node.isRequired};const B=d.fieldset`
  border: 0;
  margin: 0;
  padding: 0;
`;q.__docgenInfo={description:"",methods:[],displayName:"Fieldset",props:{children:{type:{name:"node"},required:!0,description:""}}};const h=V.forwardRef(function({icon:r,text:t,className:s,updateOnScrollDisabled:m,...u},f){const k=m?{onWheel:v=>v.target.blur()}:{};return n.jsxs(U,{className:s,children:[n.jsx(G,{ref:f,hasIcon:!!r,text:t,...k,...u}),r&&n.jsx(F,{text:t,children:n.jsx(r,{})}),t&&n.jsx(F,{text:t,children:n.jsx("span",{children:t})})]})}),O={className:i.string,icon:i.elementType,id:i.string,invalid:i.bool,name:i.string.isRequired,onBlur:i.func,onChange:i.func,placeholder:i.string,ref:i.any,text:i.string,title:i.string,type:i.string,updateOnScrollDisabled:i.bool,value:i.any};h.propTypes=O;h.defaultProps={icon:null};const T="5.4rem",U=d.div`
  position: relative;
  display: inline-block;
  @media (max-width: ${_.mobile}) {
    width: 100%;
  }
`,G=d.input`
  width: 100%;
  height: ${T};
  padding: 0 ${a.medium};
  padding-right: ${e=>e.hasIcon?"5rem":e.text?"6rem":a.medium};
  color: ${({theme:e})=>e.paragraph};
  font-weight: normal;
  font-size: ${w.sizes.default};
  font-family: "Open Sans", sans-serif;
  font-style: normal;
  line-height: inherit;
  text-align: ${e=>e.type==="number"?"right":"left"};
  background: ${({theme:e})=>e.white};
  border: 1px solid;
  border-color: ${({invalid:e,theme:r})=>e?r.error:"transparent"};
  border-radius: ${p.borderRadius};
  box-shadow: ${({theme:e})=>p.shadow.default(e.secondary)};
  outline: none;

  /* stylelint-disable */
  &[type="number"] {
    -moz-appearance: textfield;
  }
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  /* stylelint-enable */

  &:invalid {
    border-color: ${({theme:e})=>e.error};
  }

  &::placeholder {
    color: ${({theme:e})=>e.placeholder};
  }

  &:focus {
    border-color: ${({theme:e})=>e.secondary};
  }

  &:focus::placeholder {
    color: transparent;
  }

  appearance: none;
  @media (max-width: ${_.mobile}) {
    padding: 0 ${a.small};
    padding-right: ${e=>e.text?"6rem":e.hasIcon?"5rem":a.medium};
  }
`,F=d.div`
  position: absolute;
  top: 1rem;
  right: ${a.small};
  width: 100%;
  max-width: ${({text:e})=>e?a.base:a.large};
  height: 100%;
  max-height: ${a.large};
  color: ${({theme:e})=>e.placeholder};
  font-size: 1.6rem;
  ${({text:e})=>e&&N`
      display: flex;
      align-items: center;
      justify-content: center;
      right: ${a.medium};
      top: ${a.small};
      user-select: none;
    `};
`;h.__docgenInfo={description:"",methods:[],displayName:"Input",props:{icon:{defaultValue:{value:"null",computed:!1},type:{name:"elementType"},required:!1,description:""},className:{type:{name:"string"},required:!1,description:""},id:{type:{name:"string"},required:!1,description:""},invalid:{type:{name:"bool"},required:!1,description:""},name:{type:{name:"string"},required:!0,description:""},onBlur:{type:{name:"func"},required:!1,description:""},onChange:{type:{name:"func"},required:!1,description:""},placeholder:{type:{name:"string"},required:!1,description:""},ref:{type:{name:"any"},required:!1,description:""},text:{type:{name:"string"},required:!1,description:""},title:{type:{name:"string"},required:!1,description:""},type:{type:{name:"string"},required:!1,description:""},updateOnScrollDisabled:{type:{name:"bool"},required:!1,description:""},value:{type:{name:"any"},required:!1,description:""}}};function M(e){if(!e)return e;const[r,t,s]=e.split("-");return`${s}/${t}/${r}`}function J(e){if(!e)return e;const[r,t,s]=e.split("/");return`${s}-${t}-${r}`}const y=({value:e,onChange:r,invalid:t,ref:s,...m})=>{const u=f=>{r&&r(M(f.target.value))};return n.jsx(K,{...m,isValid:!t,onChange:u,type:"date",ref:s,"data-input":"true",defaultValue:J(e)})};y.propTypes=O;const K=d.input`
  padding: 0 ${a.medium};
  color: ${({theme:e})=>e.paragraph};
  font-size: ${w.sizes.default};
  font-family: "Open Sans", sans-serif;
  box-shadow: ${({theme:e})=>p.shadow.default(e.secondary)};
  border: 1px solid
    ${({isFocus:e,isValid:r,theme:t})=>e?t.secondary:r?"transparent":t.error};
  border-radius: ${p.borderRadius};
  outline: none;
  width: 192px;
  height: ${T};
  @media (max-width: ${_.mobile}) {
    width: 100%;
  }
`;try{y.displayName="InputDate",y.__docgenInfo={description:"",displayName:"InputDate",props:{}}}catch{}const l=({children:e,...r})=>n.jsx(Q,{...r,children:e});l.propTypes={children:i.node.isRequired,htmlFor:i.string};const Q=d.label`
  display: flex;
  padding-bottom: ${a.tiny};
  font-weight: 600;
  font-size: ${w.sizes.small};
  font-family: "Open Sans", sans-serif;
  font-style: normal;
  line-height: 1.6;
  cursor: pointer;
`;l.__docgenInfo={description:"",methods:[],displayName:"Label",props:{children:{type:{name:"node"},required:!0,description:""},htmlFor:{type:{name:"string"},required:!1,description:""}}};const j=({isHidden:e,...r})=>n.jsx(X,{...r,isHidden:e});j.propTypes={children:i.node.isRequired,isHidden:i.bool};j.defaultProps={isHidden:!1};const X=d.legend`
  padding: 0;
  margin: 0;
  border: 0;
  ${({isHidden:e})=>e&&"display: none"};
`;j.__docgenInfo={description:"",methods:[],displayName:"Legend",props:{isHidden:{defaultValue:{value:"false",computed:!1},type:{name:"bool"},required:!1,description:""},children:{type:{name:"node"},required:!0,description:""}}};const c=({label:e,name:r,id:t,size:s,onChange:m,className:u,...f})=>n.jsxs(Z,{className:u,children:[n.jsx(ee,{type:"radio",name:r,id:t,size:s,onChange:m,...f}),n.jsx(Y,{htmlFor:t,size:s,children:e})]});c.propTypes={checked:i.bool,className:i.string,id:i.string.isRequired,label:i.oneOfType([i.string,i.node]).isRequired,name:i.string.isRequired,onChange:i.func,size:i.string.isRequired,value:i.string};c.defaultProps={size:"1.6rem"};const Y=d.label`
  display: flex;
  font-size: ${({size:e})=>e};
  cursor: pointer;
`,Z=d.div`
  display: flex;
  flex-direction: row;
`,ee=d.input`
  position: relative;
  display: inline-block;
  flex-shrink: 0;
  width: calc(${e=>e.size} * 1.25);
  height: calc(${e=>e.size} * 1.25);
  margin: calc(${e=>e.size} / 5)
    calc(2 * ${e=>e.size} / 3) 0 0;
  padding: 0;
  line-height: inherit;
  background: ${({theme:e})=>e.white};
  border: ${({theme:e})=>p.border(e.border)};
  border-radius: 50%;
  box-shadow: none;
  cursor: pointer;
  appearance: none;
  &:before {
    position: absolute;
    top: 50%;
    left: 50%;
    display: none;
    width: calc(${e=>e.size} / 1.5);
    height: calc(${e=>e.size} / 1.5);
    background-color: ${({theme:e})=>e.primary};
    border-radius: 50%;
    transform: translate(-50%, -50%);
    content: "";
  }
  &:checked {
    background-color: ${({theme:e})=>e.white};
    border-color: ${({theme:e})=>e.primary};
    &:before {
      display: block;
    }
  }
`;c.__docgenInfo={description:"",methods:[],displayName:"InputRadio",props:{size:{defaultValue:{value:'"1.6rem"',computed:!1},type:{name:"string"},required:!1,description:""},checked:{type:{name:"bool"},required:!1,description:""},className:{type:{name:"string"},required:!1,description:""},id:{type:{name:"string"},required:!0,description:""},label:{type:{name:"union",value:[{name:"string"},{name:"node"}]},required:!0,description:""},name:{type:{name:"string"},required:!0,description:""},onChange:{type:{name:"func"},required:!1,description:""},value:{type:{name:"string"},required:!1,description:""}}};const b=({children:e,disabled:r,className:t,...s})=>n.jsxs(ie,{className:t,children:[n.jsx(te,{disabled:r,...s,children:e}),n.jsx(re,{"aria-hidden":"true",isDisabled:r,children:n.jsx(D,{})})]});b.propTypes={children:i.node.isRequired,className:i.string,disabled:i.bool};b.defaultProps={disabled:!1};const ne="5.4rem",ie=d.div`
  position: relative;
  display: inline-flex;
  flex: 1 1 auto;
  align-items: center;
  justify-content: flex-start;
  text-align: center;
  @media (max-width: ${_.mobile}) {
    width: 100%;
  }
`,re=d.div`
  position: absolute;
  top: ${a.base};
  right: ${a.base};
  width: 1.6rem;
  height: 1.6rem;
  color: ${({isDisabled:e,theme:r})=>e?r.placeholder:r.primary};
  pointer-events: none;
`,te=d.select`
  width: 100%;
  height: ${ne};
  padding: 0 ${a.medium} 0;
  color: ${({theme:e})=>e.paragraph};
  font-size: ${w.sizes.default};
  font-family: "Open Sans", sans-serif;
  vertical-align: middle;
  background-color: ${({theme:e})=>e.white};
  border: none;
  border-radius: ${p.borderRadius};
  box-shadow: ${({theme:e})=>p.shadow.default(e.secondary)};
  cursor: pointer;
  transition: border-color ${P.transitionTiming} ease;
  appearance: none;
  /* Internet Explorer 11 specifics rules */
  &::-ms-expand {
    background-color: transparent;
    border: 0 transparent;
  }
  *::-ms-backdrop,
  & {
    padding-right: ${a.base};
  }
  &:invalid {
    border-color: ${({theme:e})=>e.error};
  }
  &:disabled {
    background-color: ${({theme:e})=>e.bgTertiary};
  }
`;b.__docgenInfo={description:"",methods:[],displayName:"Select",props:{disabled:{defaultValue:{value:"false",computed:!1},type:{name:"bool"},required:!1,description:""},children:{type:{name:"node"},required:!0,description:""},className:{type:{name:"string"},required:!1,description:""}}};function oe(e,r=300){let t;return(...s)=>{clearTimeout(t),t=setTimeout(()=>{e.apply(this,s)},r)}}const $=({name:e,maxLength:r,onChange:t,showCounter:s,...m})=>{const[u,f]=g.useState(""),[k,v]=g.useState(r),S=r?r-u.length<=0:!1,I=g.useMemo(()=>oe(v,500),[v]);g.useEffect(()=>()=>{S&&I.cancel()},[]);const R=g.useCallback(z=>{f(z.target.value),t&&t(z),I(r-z.target.value.length)},[I]);return n.jsxs(n.Fragment,{children:[n.jsx(se,{name:e,onChange:R,maxLength:r,...m}),r&&s&&n.jsxs("div",{children:[n.jsxs(A,{fontSize:"tiny",variant:S?"error":"placeholder",children:[Math.max(0,r-u.length)," caractères restants"]}),n.jsxs(H,{role:"status",children:[k," caractères restants"]})]})]})};$.propTypes={maxLength:i.number,name:i.string.isRequired,onChange:i.func,showCounter:i.bool};const se=d.textarea`
  width: 100%;
  min-height: 12rem;
  padding: ${a.medium};
  color: ${({theme:e})=>e.paragraph};
  font-size: ${w.sizes.default};
  font-family: "Open Sans", sans-serif;
  line-height: inherit;
  background: ${({theme:e})=>e.white};
  border: 1px solid transparent;
  border-radius: ${p.borderRadius};
  box-shadow: ${({theme:e})=>p.shadow.default(e.secondary)};
  appearance: none;

  &::placeholder {
    color: ${({theme:e})=>e.placeholder};
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    margin: 0;
    appearance: none;
  }

  &:focus {
    border-color: ${({theme:e})=>e.secondary};
  }

  &:focus::placeholder {
    color: transparent;
  }

  @media (max-width: ${_.mobile}) {
    width: 100%;
  }
`;$.__docgenInfo={description:"",methods:[],displayName:"Textarea",props:{maxLength:{type:{name:"number"},required:!1,description:""},name:{type:{name:"string"},required:!0,description:""},onChange:{type:{name:"func"},required:!1,description:""},showCounter:{type:{name:"bool"},required:!1,description:""}}};const Ie={component:b,title:"Field/Components"},ae=d(h)`
  width: 40rem;
`,de=d(b)`
  width: 100%;
`,le=()=>n.jsxs(n.Fragment,{children:[n.jsxs(o,{children:[n.jsx(l,{htmlFor:"input",children:"Input"}),n.jsx(h,{name:"input",id:"input"})]}),n.jsxs(o,{children:[n.jsx(l,{htmlFor:"input_date",children:"Input Date"}),n.jsx(y,{name:"input_date",id:"input_date"})]}),n.jsxs(o,{children:[n.jsx(l,{htmlFor:"select",children:"Select"}),n.jsxs(b,{id:"select",children:[n.jsx("option",{}),n.jsx("option",{children:"Option 1"}),n.jsx("option",{children:"Option 2"}),n.jsx("option",{children:"Option 3"})]})]}),n.jsxs(o,{children:[n.jsx(l,{htmlFor:"textarea",children:"Textarea"}),n.jsx($,{name:"textarea",id:"textarea"})]}),n.jsxs(o,{children:[n.jsx(x,{label:"Option 1",name:"checkbox",id:"option_checkbox_1",value:"option_1"}),n.jsx(x,{label:"Option 2 (3rem)",name:"checkbox",id:"option_checkbox_2",value:"option_2",size:"3rem"}),n.jsx(x,{label:"Option 3 (4rem)",name:"checkbox",id:"option_checkbox_3",value:"option_3",size:"4rem"})]}),n.jsxs(o,{children:[n.jsx(c,{label:"Option 1",name:"radio",id:"option_radio_1",value:"option_radio_1"}),n.jsx(c,{label:"Option 2 (3rem)",name:"radio",id:"option_2",value:"option_2",size:"3rem"}),n.jsx(c,{label:"Option 3 (4rem)",name:"radio",id:"option_3",value:"option_3",size:"4rem"})]})]}),ce=()=>n.jsx(n.Fragment,{children:n.jsxs(o,{children:[n.jsx(x,{label:"Option 1 with a very long label so you get what happens when it is on 2 lines",name:"checkbox",id:"option_1",value:"option_1"}),n.jsx(x,{label:"Option 2 (3rem)",name:"checkbox",id:"option_2",value:"option_2",size:"3rem"}),n.jsx(x,{label:"Option 3 (4rem)",name:"checkbox",id:"option_3",value:"option_3",size:"4rem"})]})}),pe=()=>n.jsxs(n.Fragment,{children:[n.jsxs(o,{children:[n.jsx(l,{htmlFor:"input",children:"Input normal"}),n.jsx(h,{id:"input",name:"input",placeholder:"Rechercher (Ex : Durée du préavis...)"})]}),n.jsxs(o,{children:[n.jsx(l,{htmlFor:"input",children:"Input avec picto 32"}),n.jsx(h,{id:"input",name:"input",icon:C,placeholder:"Rechercher (Ex : Durée du préavis...)"})]}),n.jsxs(o,{children:[n.jsx(l,{htmlFor:"input",children:"Input avec picto currency"}),n.jsx(ae,{id:"input",name:"input",type:"number",icon:E})]}),n.jsxs(o,{children:[n.jsx(l,{htmlFor:"input",children:"Input avec texte"}),n.jsx(h,{id:"input",name:"input",value:"Avec texte",placeholder:"Rechercher (Ex : Durée du préavis...)"})]}),n.jsxs(o,{children:[n.jsx(l,{htmlFor:"input",autofocus:!0,children:"Input Focus"}),n.jsx(h,{id:"input",name:"input",placeholder:"Rechercher (Ex : Durée du préavis...)"})]}),n.jsxs(o,{children:[n.jsx(l,{htmlFor:"input",children:"Input erreur"}),n.jsx(h,{name:"input",id:"input",value:"Avec texte",invalid:!0})]})]}),ue=()=>n.jsx(n.Fragment,{children:n.jsxs(o,{children:[n.jsx(l,{htmlFor:"input_date",children:"Input Date"}),n.jsx(y,{name:"input_date",id:"input_date"})]})}),he=()=>n.jsx(n.Fragment,{children:n.jsxs(o,{children:[n.jsxs(q,{children:[n.jsx(j,{children:"This is a legend like john"}),n.jsx(c,{label:"Option 1 in a fieldset with a legend",name:"radio",id:"option_1",value:"option_1"})]}),n.jsx("br",{}),n.jsxs(q,{children:[n.jsx(j,{isHidden:!0,children:"This is an hidden legend unlike john"}),n.jsx(c,{label:"Option 1 with an hidden legend",name:"radio",id:"option_1",value:"option_1"})]})]})}),me=()=>n.jsx(n.Fragment,{children:n.jsxs(o,{children:[n.jsx(c,{label:"Option 1 with a very long label so you get what happens when it is on 2 lines",name:"radio",id:"option_1",value:"option_1"}),n.jsx(c,{label:"Option 2 (3rem)",name:"radio",id:"option_2",value:"option_2",size:"3rem"}),n.jsx(c,{label:"Option 3 (4rem)",name:"radio",id:"option_3",value:"option_3",size:"4rem"})]})}),xe=()=>n.jsxs(n.Fragment,{children:[n.jsxs(o,{children:[n.jsx(l,{htmlFor:"select",children:"Select"}),n.jsxs(de,{id:"select",children:[n.jsx("option",{children:"..."}),n.jsx("option",{children:"Option 1"}),n.jsx("option",{children:"Option 2"}),n.jsx("option",{children:"Option 3"})]})]}),n.jsxs(o,{children:[n.jsx(l,{htmlFor:"select_disabled",children:"Select disabled"}),n.jsxs(b,{id:"select_disabled",disabled:!0,children:[n.jsx("option",{children:"..."}),n.jsx("option",{children:"Option 1"}),n.jsx("option",{children:"Option 2"}),n.jsx("option",{children:"Option 3"})]})]})]}),fe=()=>n.jsxs(n.Fragment,{children:[n.jsxs(o,{children:[n.jsx(l,{htmlFor:"textarea",children:"Textarea"}),n.jsx($,{name:"textarea",id:"textarea"})]}),n.jsxs(o,{children:[n.jsx(l,{htmlFor:"textarea2",children:"Textarea"}),n.jsx($,{name:"textarea2",id:"textarea2",maxLength:40,showCounter:!0})]})]});le.__docgenInfo={description:"",methods:[],displayName:"base"};ce.__docgenInfo={description:"",methods:[],displayName:"checkbox"};pe.__docgenInfo={description:"",methods:[],displayName:"input"};ue.__docgenInfo={description:"",methods:[],displayName:"inputDate"};he.__docgenInfo={description:"",methods:[],displayName:"fieldsetLegend"};me.__docgenInfo={description:"",methods:[],displayName:"radio"};xe.__docgenInfo={description:"",methods:[],displayName:"select"};fe.__docgenInfo={description:"",methods:[],displayName:"textarea"};export{le as base,ce as checkbox,Ie as default,he as fieldsetLegend,pe as input,ue as inputDate,me as radio,xe as select,fe as textarea};
//# sourceMappingURL=story-b9f80b05.js.map
