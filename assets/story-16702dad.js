import{s as d,j as n,A as R}from"./styled-components.browser.esm-525a869c.js";import{A as D,S as C,E}from"./ShareWhatsapp-32297fb2.js";import{S as o}from"./index-feda07e2.js";import{P as i}from"./index-8d47fad6.js";import{b as p,s as a,a as _,f as w,c as P}from"./theme-664d9dda.js";import{r as g}from"./index-76fb7be0.js";import{S as V}from"./index-bf4410fe.js";import{T as H}from"./index-9f058b14.js";import"./_commonjsHelpers-de833af9.js";import"./polished.esm-ee8b58af.js";const x=({label:e,name:r,id:t,size:s,checked:m,...u})=>n.jsxs(A,{htmlFor:t,size:s,children:[n.jsx(L,{type:"checkbox",name:r,id:t,size:s,checked:m,...u}),e]});x.propTypes={checked:i.bool,id:i.string.isRequired,label:i.oneOfType([i.string,i.node]).isRequired,name:i.string.isRequired,size:i.string};x.defaultProps={size:"1.6rem"};const A=d.label`
  display: flex;
  font-size: ${e=>e.size};
  cursor: pointer;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
`,L=d.input`
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
`;x.__docgenInfo={description:"",methods:[],displayName:"InputCheckbox",props:{size:{defaultValue:{value:'"1.6rem"',computed:!1},type:{name:"string"},required:!1,description:""},checked:{type:{name:"bool"},required:!1,description:""},id:{type:{name:"string"},required:!0,description:""},label:{type:{name:"union",value:[{name:"string"},{name:"node"}]},required:!0,description:""},name:{type:{name:"string"},required:!0,description:""}}};const v=({children:e,...r})=>n.jsxs(W,{...r,children:[" ",e]});v.propTypes={children:i.node.isRequired};const W=d.fieldset`
  border: 0;
  margin: 0;
  padding: 0;
`;v.__docgenInfo={description:"",methods:[],displayName:"Fieldset",props:{children:{type:{name:"node"},required:!0,description:""}}};const h=({icon:e,text:r,className:t,updateOnScrollDisabled:s,ref:m,...u})=>{const f=s?{onWheel:q=>q.target.blur()}:{};return n.jsxs(B,{className:t,children:[n.jsx(U,{hasIcon:!!e,text:r,...f,...u,ref:m}),e&&n.jsx(F,{text:r,children:n.jsx(e,{})}),r&&n.jsx(F,{text:r,children:n.jsx("span",{children:r})})]})},O={className:i.string,icon:i.elementType,id:i.string,invalid:i.bool,name:i.string.isRequired,onBlur:i.func,onChange:i.func,placeholder:i.string,ref:i.any,text:i.string,title:i.string,type:i.string,updateOnScrollDisabled:i.bool,value:i.any};h.propTypes=O;h.defaultProps={icon:null};const T="5.4rem",B=d.div`
  position: relative;
  display: inline-block;
  @media (max-width: ${_.mobile}) {
    width: 100%;
  }
`,U=d.input`
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
  ${({text:e})=>e&&R`
      display: flex;
      align-items: center;
      justify-content: center;
      right: ${a.medium};
      top: ${a.small};
      user-select: none;
    `};
`;h.__docgenInfo={description:"",methods:[],displayName:"Input",props:{icon:{defaultValue:{value:"null",computed:!1},type:{name:"elementType"},required:!1,description:""},className:{type:{name:"string"},required:!1,description:""},id:{type:{name:"string"},required:!1,description:""},invalid:{type:{name:"bool"},required:!1,description:""},name:{type:{name:"string"},required:!0,description:""},onBlur:{type:{name:"func"},required:!1,description:""},onChange:{type:{name:"func"},required:!1,description:""},placeholder:{type:{name:"string"},required:!1,description:""},ref:{type:{name:"any"},required:!1,description:""},text:{type:{name:"string"},required:!1,description:""},title:{type:{name:"string"},required:!1,description:""},type:{type:{name:"string"},required:!1,description:""},updateOnScrollDisabled:{type:{name:"bool"},required:!1,description:""},value:{type:{name:"any"},required:!1,description:""}}};function G(e){if(!e)return e;const[r,t,s]=e.split("-");return`${s}/${t}/${r}`}function M(e){if(!e)return e;const[r,t,s]=e.split("/");return`${s}-${t}-${r}`}const y=({value:e,onChange:r,invalid:t,ref:s,...m})=>{const u=f=>{r&&r(G(f.target.value))};return n.jsx(J,{...m,isValid:!t,onChange:u,type:"date",ref:s,"data-input":"true",defaultValue:M(e)})};y.propTypes=O;const J=d.input`
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
`;try{y.displayName="InputDate",y.__docgenInfo={description:"",displayName:"InputDate",props:{}}}catch{}const l=({children:e,...r})=>n.jsx(K,{...r,children:e});l.propTypes={children:i.node.isRequired,htmlFor:i.string};const K=d.label`
  display: flex;
  padding-bottom: ${a.tiny};
  font-weight: 600;
  font-size: ${w.sizes.small};
  font-family: "Open Sans", sans-serif;
  font-style: normal;
  line-height: 1.6;
  cursor: pointer;
`;l.__docgenInfo={description:"",methods:[],displayName:"Label",props:{children:{type:{name:"node"},required:!0,description:""},htmlFor:{type:{name:"string"},required:!1,description:""}}};const j=({isHidden:e,...r})=>n.jsx(Q,{...r,isHidden:e});j.propTypes={children:i.node.isRequired,isHidden:i.bool};j.defaultProps={isHidden:!1};const Q=d.legend`
  padding: 0;
  margin: 0;
  border: 0;
  ${({isHidden:e})=>e&&"display: none"};
`;j.__docgenInfo={description:"",methods:[],displayName:"Legend",props:{isHidden:{defaultValue:{value:"false",computed:!1},type:{name:"bool"},required:!1,description:""},children:{type:{name:"node"},required:!0,description:""}}};const c=({label:e,name:r,id:t,size:s,onChange:m,className:u,...f})=>n.jsxs(Y,{className:u,children:[n.jsx(Z,{type:"radio",name:r,id:t,size:s,onChange:m,...f}),n.jsx(X,{htmlFor:t,size:s,children:e})]});c.propTypes={checked:i.bool,className:i.string,id:i.string.isRequired,label:i.oneOfType([i.string,i.node]).isRequired,name:i.string.isRequired,onChange:i.func,size:i.string.isRequired,value:i.string};c.defaultProps={size:"1.6rem"};const X=d.label`
  display: flex;
  font-size: ${({size:e})=>e};
  cursor: pointer;
`,Y=d.div`
  display: flex;
  flex-direction: row;
`,Z=d.input`
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
`;c.__docgenInfo={description:"",methods:[],displayName:"InputRadio",props:{size:{defaultValue:{value:'"1.6rem"',computed:!1},type:{name:"string"},required:!1,description:""},checked:{type:{name:"bool"},required:!1,description:""},className:{type:{name:"string"},required:!1,description:""},id:{type:{name:"string"},required:!0,description:""},label:{type:{name:"union",value:[{name:"string"},{name:"node"}]},required:!0,description:""},name:{type:{name:"string"},required:!0,description:""},onChange:{type:{name:"func"},required:!1,description:""},value:{type:{name:"string"},required:!1,description:""}}};const b=({children:e,disabled:r,className:t,...s})=>n.jsxs(ne,{className:t,children:[n.jsx(re,{disabled:r,...s,children:e}),n.jsx(ie,{"aria-hidden":"true",isDisabled:r,children:n.jsx(D,{})})]});b.propTypes={children:i.node.isRequired,className:i.string,disabled:i.bool};b.defaultProps={disabled:!1};const ee="5.4rem",ne=d.div`
  position: relative;
  display: inline-flex;
  flex: 1 1 auto;
  align-items: center;
  justify-content: flex-start;
  text-align: center;
  @media (max-width: ${_.mobile}) {
    width: 100%;
  }
`,ie=d.div`
  position: absolute;
  top: ${a.base};
  right: ${a.base};
  width: 1.6rem;
  height: 1.6rem;
  color: ${({isDisabled:e,theme:r})=>e?r.placeholder:r.primary};
  pointer-events: none;
`,re=d.select`
  width: 100%;
  height: ${ee};
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
`;b.__docgenInfo={description:"",methods:[],displayName:"Select",props:{disabled:{defaultValue:{value:"false",computed:!1},type:{name:"bool"},required:!1,description:""},children:{type:{name:"node"},required:!0,description:""},className:{type:{name:"string"},required:!1,description:""}}};function te(e,r=300){let t;return(...s)=>{clearTimeout(t),t=setTimeout(()=>{e.apply(this,s)},r)}}const $=({name:e,maxLength:r,onChange:t,showCounter:s,...m})=>{const[u,f]=g.useState(""),[q,z]=g.useState(r),S=r?r-u.length<=0:!1,k=g.useMemo(()=>te(z,500),[z]);g.useEffect(()=>()=>{S&&k.cancel()},[]);const N=g.useCallback(I=>{f(I.target.value),t&&t(I),k(r-I.target.value.length)},[k]);return n.jsxs(n.Fragment,{children:[n.jsx(oe,{name:e,onChange:N,maxLength:r,...m}),r&&s&&n.jsxs("div",{children:[n.jsxs(H,{fontSize:"tiny",variant:S?"error":"placeholder",children:[Math.max(0,r-u.length)," caractères restants"]}),n.jsxs(V,{role:"status",children:[q," caractères restants"]})]})]})};$.propTypes={maxLength:i.number,name:i.string.isRequired,onChange:i.func,showCounter:i.bool};const oe=d.textarea`
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
`;$.__docgenInfo={description:"",methods:[],displayName:"Textarea",props:{maxLength:{type:{name:"number"},required:!1,description:""},name:{type:{name:"string"},required:!0,description:""},onChange:{type:{name:"func"},required:!1,description:""},showCounter:{type:{name:"bool"},required:!1,description:""}}};const ke={component:b,title:"Field/Components"},se=d(h)`
  width: 40rem;
`,ae=d(b)`
  width: 100%;
`,de=()=>n.jsxs(n.Fragment,{children:[n.jsxs(o,{children:[n.jsx(l,{htmlFor:"input",children:"Input"}),n.jsx(h,{name:"input",id:"input"})]}),n.jsxs(o,{children:[n.jsx(l,{htmlFor:"input_date",children:"Input Date"}),n.jsx(y,{name:"input_date",id:"input_date"})]}),n.jsxs(o,{children:[n.jsx(l,{htmlFor:"select",children:"Select"}),n.jsxs(b,{id:"select",children:[n.jsx("option",{}),n.jsx("option",{children:"Option 1"}),n.jsx("option",{children:"Option 2"}),n.jsx("option",{children:"Option 3"})]})]}),n.jsxs(o,{children:[n.jsx(l,{htmlFor:"textarea",children:"Textarea"}),n.jsx($,{name:"textarea",id:"textarea"})]}),n.jsxs(o,{children:[n.jsx(x,{label:"Option 1",name:"checkbox",id:"option_checkbox_1",value:"option_1"}),n.jsx(x,{label:"Option 2 (3rem)",name:"checkbox",id:"option_checkbox_2",value:"option_2",size:"3rem"}),n.jsx(x,{label:"Option 3 (4rem)",name:"checkbox",id:"option_checkbox_3",value:"option_3",size:"4rem"})]}),n.jsxs(o,{children:[n.jsx(c,{label:"Option 1",name:"radio",id:"option_radio_1",value:"option_radio_1"}),n.jsx(c,{label:"Option 2 (3rem)",name:"radio",id:"option_2",value:"option_2",size:"3rem"}),n.jsx(c,{label:"Option 3 (4rem)",name:"radio",id:"option_3",value:"option_3",size:"4rem"})]})]}),le=()=>n.jsx(n.Fragment,{children:n.jsxs(o,{children:[n.jsx(x,{label:"Option 1 with a very long label so you get what happens when it is on 2 lines",name:"checkbox",id:"option_1",value:"option_1"}),n.jsx(x,{label:"Option 2 (3rem)",name:"checkbox",id:"option_2",value:"option_2",size:"3rem"}),n.jsx(x,{label:"Option 3 (4rem)",name:"checkbox",id:"option_3",value:"option_3",size:"4rem"})]})}),ce=()=>n.jsxs(n.Fragment,{children:[n.jsxs(o,{children:[n.jsx(l,{htmlFor:"input",children:"Input normal"}),n.jsx(h,{id:"input",name:"input",placeholder:"Rechercher (Ex : Durée du préavis...)"})]}),n.jsxs(o,{children:[n.jsx(l,{htmlFor:"input",children:"Input avec picto 32"}),n.jsx(h,{id:"input",name:"input",icon:C,placeholder:"Rechercher (Ex : Durée du préavis...)"})]}),n.jsxs(o,{children:[n.jsx(l,{htmlFor:"input",children:"Input avec picto currency"}),n.jsx(se,{id:"input",name:"input",type:"number",icon:E})]}),n.jsxs(o,{children:[n.jsx(l,{htmlFor:"input",children:"Input avec texte"}),n.jsx(h,{id:"input",name:"input",value:"Avec texte",placeholder:"Rechercher (Ex : Durée du préavis...)"})]}),n.jsxs(o,{children:[n.jsx(l,{htmlFor:"input",autofocus:!0,children:"Input Focus"}),n.jsx(h,{id:"input",name:"input",placeholder:"Rechercher (Ex : Durée du préavis...)"})]}),n.jsxs(o,{children:[n.jsx(l,{htmlFor:"input",children:"Input erreur"}),n.jsx(h,{name:"input",id:"input",value:"Avec texte",invalid:!0})]})]}),pe=()=>n.jsx(n.Fragment,{children:n.jsxs(o,{children:[n.jsx(l,{htmlFor:"input_date",children:"Input Date"}),n.jsx(y,{name:"input_date",id:"input_date"})]})}),ue=()=>n.jsx(n.Fragment,{children:n.jsxs(o,{children:[n.jsxs(v,{children:[n.jsx(j,{children:"This is a legend like john"}),n.jsx(c,{label:"Option 1 in a fieldset with a legend",name:"radio",id:"option_1",value:"option_1"})]}),n.jsx("br",{}),n.jsxs(v,{children:[n.jsx(j,{isHidden:!0,children:"This is an hidden legend unlike john"}),n.jsx(c,{label:"Option 1 with an hidden legend",name:"radio",id:"option_1",value:"option_1"})]})]})}),he=()=>n.jsx(n.Fragment,{children:n.jsxs(o,{children:[n.jsx(c,{label:"Option 1 with a very long label so you get what happens when it is on 2 lines",name:"radio",id:"option_1",value:"option_1"}),n.jsx(c,{label:"Option 2 (3rem)",name:"radio",id:"option_2",value:"option_2",size:"3rem"}),n.jsx(c,{label:"Option 3 (4rem)",name:"radio",id:"option_3",value:"option_3",size:"4rem"})]})}),me=()=>n.jsxs(n.Fragment,{children:[n.jsxs(o,{children:[n.jsx(l,{htmlFor:"select",children:"Select"}),n.jsxs(ae,{id:"select",children:[n.jsx("option",{children:"..."}),n.jsx("option",{children:"Option 1"}),n.jsx("option",{children:"Option 2"}),n.jsx("option",{children:"Option 3"})]})]}),n.jsxs(o,{children:[n.jsx(l,{htmlFor:"select_disabled",children:"Select disabled"}),n.jsxs(b,{id:"select_disabled",disabled:!0,children:[n.jsx("option",{children:"..."}),n.jsx("option",{children:"Option 1"}),n.jsx("option",{children:"Option 2"}),n.jsx("option",{children:"Option 3"})]})]})]}),xe=()=>n.jsxs(n.Fragment,{children:[n.jsxs(o,{children:[n.jsx(l,{htmlFor:"textarea",children:"Textarea"}),n.jsx($,{name:"textarea",id:"textarea"})]}),n.jsxs(o,{children:[n.jsx(l,{htmlFor:"textarea2",children:"Textarea"}),n.jsx($,{name:"textarea2",id:"textarea2",maxLength:40,showCounter:!0})]})]});de.__docgenInfo={description:"",methods:[],displayName:"base"};le.__docgenInfo={description:"",methods:[],displayName:"checkbox"};ce.__docgenInfo={description:"",methods:[],displayName:"input"};pe.__docgenInfo={description:"",methods:[],displayName:"inputDate"};ue.__docgenInfo={description:"",methods:[],displayName:"fieldsetLegend"};he.__docgenInfo={description:"",methods:[],displayName:"radio"};me.__docgenInfo={description:"",methods:[],displayName:"select"};xe.__docgenInfo={description:"",methods:[],displayName:"textarea"};export{de as base,le as checkbox,ke as default,ue as fieldsetLegend,ce as input,pe as inputDate,he as radio,me as select,xe as textarea};
//# sourceMappingURL=story-16702dad.js.map
