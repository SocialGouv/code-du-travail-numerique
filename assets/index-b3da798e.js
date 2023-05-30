import{s as B,A as u,j as v}from"./styled-components.browser.esm-41178855.js";import{r as m,a as k}from"./polished.esm-d698528e.js";import{P as r}from"./index-1fc0ca9a.js";import{R as C}from"./index-8db94870.js";import{D as R}from"./ShareWhatsapp-86bedeb5.js";import{f as o,b as V,c as l,a as w,s as T}from"./theme-dc888197.js";const j=B.button`
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
  transition: background-color ${l.transitionTiming} linear,
    border-color ${l.transitionTiming} linear, transform 100ms linear;
  appearance: none;
  @media (max-width: ${w.mobile}) {
    font-size: ${o.sizes.small};
  }
  @media print {
    display: none;
  }
  ${({narrow:t,theme:e,small:n,variant:a,xsmall:b})=>{if(a==="link")return u`
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
          margin: ${({hasText:i})=>i?`0 ${T.tiny} 0 ${T.small}`:"0"};
          transition: transform ${l.transitionTiming} linear;
          /* stylelint-disable-next-line */
          fill: ${e.primary};
        }
      `;if(a==="navLink")return u`
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
        transition: color ${l.transitionTiming} linear,
          text-decoration ${l.transitionTiming} linear;

        &:focus {
          color: ${({theme:i})=>i.primary};
        }
      `;let $="5.2rem",s=e[a],d=e[a],c=e[a+"Text"];const y="0px 10px 20px",x="0px 5px 7px";let p=`${y} ${m(e.secondary,.26)}, ${x} ${m(e.secondary,.35)}`,h="1",f="0 4.4rem";return n&&($="4rem",f="0 3rem"),t&&(f=n?"0 1rem":"0 1.9rem"),b&&($="2.8rem",f="0 3rem"),a==="flat"&&(c=e.paragraph,s=e.white,d=e.border,p="none"),a==="naked"&&(c=e.paragraph,s="transparent",d="transparent",p="none",h="0.6"),a==="primary"&&(p=`${y} ${m(e.primary,.26)}, ${x} ${m(e.primary,.35)}`),u`
      height: ${$};
      padding: ${f};
      color: ${c};
      background: ${s};
      border-color: ${d};
      box-shadow: ${p};
      opacity: 1;
      will-change: transform;

      &:link,
      &:visited {
        text-decoration: none;
        color: ${c};
      }

      :not([disabled]) {
        &:hover {
          opacity: ${h};
          transform: translateY(-2px);
          background: ${k(.1,s)};
          border-color: ${k(.1,d)};
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

      ${({narrow:i,small:z,variant:q})=>{if(q!=="link"&&!z&&!i)return u`
            @media (max-width: ${w.mobile}) {
              padding: 0 3rem;
            }
          `}}
    `}}
`,g=C.forwardRef(({children:t,icon:e,...n},a)=>{const b=e||R;return v.jsxs(j,{...n,ref:a,children:[t,n.variant==="link"&&v.jsx(b,{hasText:!!t})]})});g.displayName="Button";g.propTypes={children:r.node,hasText:r.bool,icon:r.elementType,narrow:r.bool,onClick:r.func,small:r.bool,variant:r.oneOf(["link","navLink","flat","naked","primary","secondary"])};g.defaultProps={children:"",narrow:!1,onClick:()=>{},small:!1,variant:"secondary",xsmall:!1};g.__docgenInfo={description:"",methods:[],displayName:"Button",props:{children:{defaultValue:{value:'""',computed:!1},type:{name:"node"},required:!1,description:""},narrow:{defaultValue:{value:"false",computed:!1},type:{name:"bool"},required:!1,description:""},onClick:{defaultValue:{value:"() => {}",computed:!1},type:{name:"func"},required:!1,description:""},small:{defaultValue:{value:"false",computed:!1},type:{name:"bool"},required:!1,description:""},variant:{defaultValue:{value:'"secondary"',computed:!1},type:{name:"enum",value:[{value:'"link"',computed:!1},{value:'"navLink"',computed:!1},{value:'"flat"',computed:!1},{value:'"naked"',computed:!1},{value:'"primary"',computed:!1},{value:'"secondary"',computed:!1}]},required:!1,description:""},xsmall:{defaultValue:{value:"false",computed:!1},required:!1},hasText:{type:{name:"bool"},required:!1,description:""},icon:{type:{name:"elementType"},required:!1,description:""}}};export{g as B};
//# sourceMappingURL=index-b3da798e.js.map
