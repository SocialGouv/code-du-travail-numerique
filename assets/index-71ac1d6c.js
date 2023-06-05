import{j as v,s as w,A as p}from"./styled-components.browser.esm-41178855.js";import{b as E}from"./polished.esm-d698528e.js";import{P as m}from"./index-1fc0ca9a.js";import{r as n}from"./index-8db94870.js";import{a as u}from"./theme-6e379713.js";const b=({children:e,mobileOnly:t=!1,shadowColor:y,...x})=>{const r=n.useRef(null),[o,l]=n.useState(!0),[i,a]=n.useState(!0);return n.useEffect(()=>{function d(){const{offsetWidth:c,scrollWidth:s}=r.current;s<=c?(o||l(!0),i||a(!0)):f()}function f(){const{offsetWidth:c,scrollLeft:s,scrollWidth:$}=r.current,g=s+c;s!==0?o&&l(!1):o||l(!0),g!==$?i&&a(!1):i||a(!0)}d();const h=r.current;return window.addEventListener("resize",d),h.addEventListener("scroll",f),()=>{window.removeEventListener("resize",d),h.removeEventListener("scroll",f)}}),v.jsx(L,{hasShadowLeft:!o,hasShadowRight:!i,mobileOnly:t,shadowColor:y,...x,children:v.jsx(S,{mobileOnly:t,ref:r,children:e})})};b.propTypes={children:m.node.isRequired,mobileOnly:m.bool,shadowColor:m.string};const L=w.div`
  position: relative;
  overflow: ${({mobileOnly:e})=>e?"visible":"hidden"};
  @media (max-width: ${u.mobile}) {
    overflow-x: hidden;
  }

  &:before,
  &:after {
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: 1;
    display: ${({mobileOnly:e})=>e?"none":"block"};
    width: 4rem;
    opacity: 0;
    transition: opacity 0.3s linear;
    content: "";
    pointer-events: none;
    ${({shadowColor:e,theme:t})=>p`
      background: radial-gradient(
        ellipse at center,
        ${e||t.white} 15%,
        ${E(1,e||t.white)} 80%
      );
    `}
    @media (max-width: ${u.mobile}) {
      display: block;
    }
  }
  &:before {
    left: -2rem;
    ${({hasShadowLeft:e})=>e&&p`
        opacity: 1;
      `}
  }
  &:after {
    right: -2rem;
    ${({hasShadowRight:e})=>e&&p`
        opacity: 1;
      `}
  }
`,S=w.div`
  overflow-x: ${({mobileOnly:e})=>e?"visible":"auto"};
  @media (max-width: ${u.mobile}) {
    overflow-x: auto;
  }
`;b.__docgenInfo={description:"",methods:[],displayName:"OverflowWrapper",props:{mobileOnly:{defaultValue:{value:"false",computed:!1},type:{name:"bool"},required:!1,description:""},children:{type:{name:"node"},required:!0,description:""},shadowColor:{type:{name:"string"},required:!1,description:""}}};export{b as O};
//# sourceMappingURL=index-71ac1d6c.js.map
