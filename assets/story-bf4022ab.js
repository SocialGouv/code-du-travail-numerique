import{j as e,s as i}from"./styled-components.browser.esm-525a869c.js";import{S as f}from"./index-feda07e2.js";import{W as v}from"./index-19e322d7.js";import{D as w,a as y}from"./reach-dialog.esm-05643297.js";import{P as m}from"./index-8d47fad6.js";import{r as l}from"./index-76fb7be0.js";import{B as h}from"./index-d4731c88.js";import{B as j}from"./ShareWhatsapp-32297fb2.js";import{S as $}from"./index-bf4410fe.js";import{a as r,s as a,b,f as g}from"./theme-664d9dda.js";import{X as k}from"./x-3aa1e984.js";import"./_commonjsHelpers-de833af9.js";import"./index-d3ea75b5.js";import"./polished.esm-ee8b58af.js";const B=parseInt(r.tablet.replace("px",""),10),n=({children:t,...u})=>{const[o,p]=l.useState(!0),[x,s]=l.useState(!1);return l.useEffect(()=>{function d(){document&&document.documentElement&&document.documentElement.clientWidth>B?o||p(!0):o&&p(!1)}return d(),window.addEventListener("resize",d),()=>{window.removeEventListener("resize",d)}}),o?e.jsx(N,{...u,children:t}):e.jsxs(e.Fragment,{children:[e.jsx(S,{variant:"naked","aria-label":"menu principal",onClick:()=>s(!0),...u,children:e.jsx(C,{})}),e.jsx(D,{isOpen:x,onDismiss:()=>s(!1),children:e.jsxs(z,{"aria-label":"Main navigation menu",children:[t,e.jsxs(O,{variant:"naked",small:!0,narrow:!0,title:"fermer la fenêtre modale",onClick:()=>s(!1),children:[e.jsx($,{children:"fermer la modal"}),e.jsx(k,{"aria-hidden":"true"})]})]})})]})};n.propTypes={children:m.node.isRequired};const N=i.div`
  display: flex;
  height: 100%;
  @media (max-width: ${r.tablet}) {
    display: none;
  }
`,S=i(h)`
  height: auto;
  padding: 0;
`,C=i(j)`
  width: 5.4rem;
  height: 5.4rem;
  color: ${({theme:t})=>t.secondary};
  @media (max-width: ${r.mobile}) {
    width: 4.2rem;
    height: 4.2rem;
  }
`,D=i(w)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 3;
  background: rgba(0, 0, 0, 0.5);
`,z=i(y)`
  @media (max-width: ${r.tablet}) {
    position: relative;
    width: 50vw;
    height: auto;
    left: 50%;
    transform: translateX(-50%);
    margin: ${a.base};
    padding: ${a.larger} 0 ${a.base};
    overflow-y: auto;
    background: ${({theme:t})=>t.white};
    border-radius: ${b.borderRadius};
    outline: none;
  }
  @media (max-width: ${r.mobile}) {
    width: calc(100% - 2 * ${a.base});
    height: auto;
    margin: ${a.base};
    left: initial;
    transform: initial;
  }
`,O=i(h)`
  @media (max-width: ${r.tablet}) {
    position: absolute;
    top: 0;
    right: 0;
    color: ${({theme:t})=>t.secondary};
  }
`;n.__docgenInfo={description:"",methods:[],displayName:"BurgerNav",props:{children:{type:{name:"node"},required:!0,description:""}}};const c=i(h).attrs(()=>({variant:"navLink"}))`
  position: relative;
  display: flex !important;
  align-items: center;
  height: 100%;
  padding: 0 ${a.medium};
  font-weight: normal;
  font-size: ${g.sizes.default};
  font-family: "Open Sans", sans-serif;
  border: none;
  @media (max-width: ${r.tablet}) {
    justify-content: center;
    width: 100%;
    height: 5.4rem;
    padding: 0;
    font-weight: 600;
    font-size: ${g.sizes.headings.small};
  }
`;m.node.isRequired,m.bool;const E=i(c).attrs(()=>({as:"a"}))`
  text-decoration: none;
`,R=i(c).attrs(()=>({as:"span"}))`
  cursor: inherit;

  &:after {
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 90%;
    height: 3px;
    background-color: ${({theme:t})=>t.primary};
    border-radius: ${b.borderRadius};
    transform: translateX(-50%);
    content: "";
  }

  @media (max-width: ${r.tablet}) {
    &:after {
      bottom: auto;
      left: 0;
      width: 3px;
      height: 100%;
      transform: none;
    }
  }
`,K={component:n,title:"Components/BurgerNav"},I=()=>e.jsxs(e.Fragment,{children:[e.jsxs(f,{children:[e.jsx("p",{children:"The burger nav is only a burger on tablet / mobile. Otherwise it’s nothing else than a div taking all the height of its container."}),e.jsx("p",{children:"You should use the provided nav items, even if you could do without (but that would be hard)."})]}),e.jsx(f,{children:e.jsx(v,{variant:"dark",style:{height:"10rem",padding:0},children:e.jsxs(n,{children:[e.jsx(c,{children:"NavButton"}),e.jsx(E,{href:"https://www.youtube.com/watch?v=8xTqP58o1iw&feature=youtu.be&t=20",children:"NavLink"}),e.jsx(R,{children:"NavCurrent"})]})})})]});I.__docgenInfo={description:"",methods:[],displayName:"base"};export{I as base,K as default};
//# sourceMappingURL=story-bf4022ab.js.map
