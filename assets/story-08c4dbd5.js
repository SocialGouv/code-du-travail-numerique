import{j as e,s as l}from"./styled-components.browser.esm-525a869c.js";import{r as b,R as g}from"./index-76fb7be0.js";import{B as d}from"./index-6bdc1c60.js";import{S as c}from"./index-71eb6df6.js";import{T as m}from"./index-e8966d81.js";import{D as M,a as j}from"./reach-dialog.esm-70588ed6.js";import{P as r}from"./index-8d47fad6.js";import{S as w}from"./index-824ca9d5.js";import{b as C,a as n,s}from"./theme-6bad1081.js";import{X as $}from"./x-3aa1e984.js";import"./_commonjsHelpers-de833af9.js";import"./polished.esm-3b4f0385.js";import"./ShareWhatsapp-32297fb2.js";import"./index-db26d228.js";import"./TitleParagraph-7db5d8aa.js";import"./index-d3ea75b5.js";const a=({children:o,isOpen:t,onDismiss:i,ContentWrapper:u,title:f,...x})=>{const p=b.useRef(null),y=u||h;return e.jsx(v,{isOpen:t,initialFocusRef:p,onDismiss:i,...x,children:e.jsxs(y,{"aria-label":f,children:[o,e.jsxs(k,{variant:"naked",small:!0,narrow:!0,title:"fermer la modale",onClick:i,ref:p,children:[e.jsx(w,{children:"fermer la modale"}),e.jsx($,{"aria-hidden":"true"})]})]})})};a.propTypes={ContentWrapper:r.object,children:r.node.isRequired,isOpen:r.bool.isRequired,onDismiss:r.func.isRequired,title:r.string};const v=l(M)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 3;
  overflow: auto;
  background: rgba(0, 0, 0, 0.5);
`,h=l(j)`
  position: relative;
  width: 50vw;
  max-width: 74rem;
  max-height: calc(100vh - 2 * 10vh);
  margin: 10vh auto;
  padding: 2rem;
  overflow-y: auto;
  color: ${({theme:o})=>o.paragraph};
  background: ${({theme:o})=>o.white};
  border-radius: ${C.borderRadius};
  outline: none;
  @media (max-width: ${n.desktop}) {
    width: 60vw;
  }
  @media (max-width: ${n.tablet}) {
    width: 80vw;
  }
  @media (max-width: ${n.mobile}) {
    width: calc(100% - 2 * ${s.base});
    max-height: calc(100vh - 2 * ${s.base});
    margin: ${s.base};
  }
`,O=h,k=l(d)`
  position: absolute;
  top: 0;
  right: 0;
  color: ${({theme:o})=>o.secondary};
  @media (max-width: ${n.mobile}) {
    position: fixed;
    top: ${s.small};
    right: ${s.small};
  }
`;a.__docgenInfo={description:"",methods:[],displayName:"Modal",props:{ContentWrapper:{type:{name:"object"},required:!1,description:""},children:{type:{name:"node"},required:!0,description:""},isOpen:{type:{name:"bool"},required:!0,description:""},onDismiss:{type:{name:"func"},required:!0,description:""},title:{type:{name:"string"},required:!1,description:""}}};const K={component:a,title:"Components/Modal"},R=l(O)({backgroundColor:"fuchsia",height:"50%",textAlign:"center",width:"50%"});class S extends g.Component{constructor(t){super(t),this.state={defaultModalOpened:!1,styledModalOpened:!1},this.openModal=this.openModal.bind(this),this.closeModal=this.closeModal.bind(this)}openModal(t){this.setState(i=>({...i,[`${t}Opened`]:!0}))}closeModal(t){this.setState(i=>({...i,[`${t}Opened`]:!1}))}render(){const{defaultModalOpened:t,styledModalOpened:i}=this.state;return e.jsxs(e.Fragment,{children:[e.jsxs(c,{children:[e.jsx(m,{children:" Standard modal "}),e.jsx(d,{onClick:()=>this.openModal("defaultModal"),children:"Click me !"}),e.jsx(a,{title:"my modal title",isOpen:t,onDismiss:()=>this.closeModal("defaultModal"),children:e.jsx("p",{children:"It was worth the click right ?"})})]}),e.jsxs(c,{children:[e.jsx(m,{children:" Styled modal "}),e.jsx(d,{onClick:()=>this.openModal("styledModal"),children:"Click me I'm stylish !"}),e.jsx(a,{title:"my modal with custom wrapper",isOpen:i,onDismiss:()=>this.closeModal("styledModal"),ContentWrapper:R,children:e.jsx("p",{children:"Are you blind yet ?"})})]})]})}}const q=()=>e.jsx(S,{});q.__docgenInfo={description:"",methods:[],displayName:"base"};export{q as base,K as default};
//# sourceMappingURL=story-08c4dbd5.js.map