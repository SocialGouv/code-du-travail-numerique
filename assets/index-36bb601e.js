import{s as q,A as l,j as v}from"./styled-components.browser.esm-beddb3d4.js";import{r as f,a as k}from"./polished.esm-21626a5b.js";import{P as i}from"./index-8d47fad6.js";import{R as C}from"./index-76fb7be0.js";import{D as R}from"./ShareWhatsapp-5fd28490.js";import{f as o,b as V,c as a,a as w,s as j}from"./theme-a9d9eda1.js";const B=q.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: content-box;
  font-weight: 500;
  font-size: ${o.sizes.default};
  line-height: 1.125em;
  text-align: center;
  vertical-align: middle;
  border: 1px solid;
  border-radius: ${V.borderRadius};
  cursor: pointer;
  transition: background-color ${a.transitionTiming} linear,
    border-color ${a.transitionTiming} linear, transform 100ms linear;
  appearance: none;
  @media (max-width: ${w.mobile}) {
    font-size: ${o.sizes.small};
  }
  @media print {
    display: none;
  }
  ${({narrow:m,theme:e,small:n,variant:r,xsmall:g})=>{if(r==="link")return l`
        padding: 0;
        color: ${e.primary};
        font-weight: 600;
        font-size: ${o.sizes.default};
        line-height: ${o.lineHeight};
        vertical-align: baseline;
        text-align: left;
        background: none;
        border: none;
        border-radius: 0;
        overflow: visible;

        &:hover {
          text-decoration: underline;

          svg {
            transform: translateX(4px);
          }
        }

        svg {
          width: 2.6rem;
          height: 1.4rem;
          margin: 0 ${j.small};
          transition: transform ${a.transitionTiming} linear;
          /* stylelint-disable-next-line */
          fill: ${e.primary};
        }
      `;if(r==="navLink")return l`
        padding: 0;
        color: ${e.paragraph};
        font-weight: normal;
        font-size: ${o.sizes.default};
        line-height: ${o.lineHeight};
        vertical-align: baseline;
        text-decoration: none;
        text-align: left;
        background: none;
        border: none;
        border-radius: 0;
        overflow: visible;
        transition: color ${a.transitionTiming} linear,
          text-decoration ${a.transitionTiming} linear;

        &:focus {
          color: ${({theme:$})=>$.primary};
        }
      `;if(r==="light")return l`
        padding: 0;
        color: ${e.paragraph};
        font-weight: normal;
        font-size: ${o.sizes.default};
        line-height: ${o.lineHeight};
        vertical-align: baseline;
        text-decoration: none;
        text-align: left;
        background-color: rgba(${e.secondary}, 0.26);
        border: none;
        border-radius: 0;
        overflow: visible;
        transition: color ${a.transitionTiming} linear,
          text-decoration ${a.transitionTiming} linear;
      `;let b="5.2rem",t=e[r],s=e[r],d=e[r+"Text"];const y="0px 10px 20px",x="0px 5px 7px";let c=`${y} ${f(e.secondary,.26)}, ${x} ${f(e.secondary,.35)}`,h="1",p="0 4.4rem";return n&&(b="4rem",p="0 3rem"),m&&(p=n?"0 1rem":"0 1.9rem"),g&&(b="2.8rem",p="0 3rem"),r==="flat"&&(d=e.paragraph,t=e.white,s=e.border,c="none"),r==="naked"&&(d=e.paragraph,t="transparent",s="transparent",c="none",h="0.6"),(r==="primary"||r==="light")&&(c=`${y} ${f(e.primary,.26)}, ${x} ${f(e.primary,.35)}`),l`
      height: ${b};
      padding: ${p};
      color: ${d};
      background: ${t};
      border-color: ${s};
      box-shadow: ${c};
      opacity: 1;
      will-change: transform;

      &:link,
      &:visited {
        text-decoration: none;
        color: ${d};
      }

      :not([disabled]) {
        &:hover {
          opacity: ${h};
          transform: translateY(-2px);
          background: ${k(.1,t)};
          border-color: ${k(.1,s)};
        }
      }

      /* keep it last so it overrides other styles */

      &[disabled] {
        background-color: ${e.bgTertiary};
        border-color: ${e.bgTertiary};
        color: ${e.placeholder};
        box-shadow: none;
        cursor: not-allowed;
      }

      ${({narrow:$,small:T,variant:z})=>{if(z!=="link"&&!T&&!$)return l`
            @media (max-width: ${w.mobile}) {
              padding: 0 3rem;
            }
          `}}
    `}}
`,u=C.forwardRef(({children:m,icon:e,...n},r)=>{const g=e||R;return v.jsxs(B,{...n,ref:r,children:[m,n.variant==="link"&&v.jsx(g,{})]})});u.displayName="Button";u.propTypes={children:i.node,icon:i.elementType,narrow:i.bool,onClick:i.func,small:i.bool,variant:i.oneOf(["link","navLink","flat","naked","primary","secondary","light"])};u.defaultProps={children:"",narrow:!1,onClick:()=>{},small:!1,variant:"secondary",xsmall:!1};u.__docgenInfo={description:"",methods:[],displayName:"Button",props:{children:{defaultValue:{value:'""',computed:!1},type:{name:"node"},required:!1,description:""},narrow:{defaultValue:{value:"false",computed:!1},type:{name:"bool"},required:!1,description:""},onClick:{defaultValue:{value:"() => {}",computed:!1},type:{name:"func"},required:!1,description:""},small:{defaultValue:{value:"false",computed:!1},type:{name:"bool"},required:!1,description:""},variant:{defaultValue:{value:'"secondary"',computed:!1},type:{name:"enum",value:[{value:'"link"',computed:!1},{value:'"navLink"',computed:!1},{value:'"flat"',computed:!1},{value:'"naked"',computed:!1},{value:'"primary"',computed:!1},{value:'"secondary"',computed:!1},{value:'"light"',computed:!1}]},required:!1,description:""},xsmall:{defaultValue:{value:"false",computed:!1},required:!1},icon:{type:{name:"elementType"},required:!1,description:""}}};export{u as B};
//# sourceMappingURL=index-36bb601e.js.map
