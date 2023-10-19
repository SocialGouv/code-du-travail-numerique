import{s as B,A as t,j as v}from"./styled-components.browser.esm-41178855.js";import{r as m,a as k}from"./polished.esm-d698528e.js";import{P as a}from"./index-1fc0ca9a.js";import{R as C}from"./index-8db94870.js";import{D as R}from"./ShareWhatsapp-cd9b0e81.js";import{f as o,b as V,c as i,a as w,s as T}from"./theme-2d6880ff.js";const j=B.button`
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
  transition: background-color ${i.transitionTiming} linear,
    border-color ${i.transitionTiming} linear, transform 100ms linear;
  appearance: none;
  @media (max-width: ${w.mobile}) {
    font-size: ${o.sizes.small};
  }
  @media print {
    display: none;
  }
  ${({narrow:s,theme:e,small:n,variant:r,xsmall:b})=>{if(r==="link")return t`
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
          margin: ${({hasText:l})=>l?`0 ${T.tiny} 0 ${T.small}`:"0"};
          transition: transform ${i.transitionTiming} linear;
          /* stylelint-disable-next-line */
          fill: ${e.primary};
        }
      `;if(r==="navLink")return t`
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
        transition: color ${i.transitionTiming} linear,
          text-decoration ${i.transitionTiming} linear;

        &:focus {
          color: ${({theme:l})=>l.primary};
        }
      `;if(r==="light")return t`
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
        transition: color ${i.transitionTiming} linear,
          text-decoration ${i.transitionTiming} linear;
      `;let $="5.2rem",d=e[r],c=e[r],p=e[r+"Text"];const y="0px 10px 20px",x="0px 5px 7px";let f=`${y} ${m(e.secondary,.26)}, ${x} ${m(e.secondary,.35)}`,h="1",u="0 4.4rem";return n&&($="4rem",u="0 3rem"),s&&(u=n?"0 1rem":"0 1.9rem"),b&&($="2.8rem",u="0 3rem"),r==="flat"&&(p=e.paragraph,d=e.white,c=e.border,f="none"),r==="naked"&&(p=e.paragraph,d="transparent",c="transparent",f="none",h="0.6"),(r==="primary"||r==="light")&&(f=`${y} ${m(e.primary,.26)}, ${x} ${m(e.primary,.35)}`),t`
      height: ${$};
      padding: ${u};
      color: ${p};
      background: ${d};
      border-color: ${c};
      box-shadow: ${f};
      opacity: 1;
      will-change: transform;

      &:link,
      &:visited {
        text-decoration: none;
        color: ${p};
      }

      :not([disabled]) {
        &:hover {
          opacity: ${h};
          transform: translateY(-2px);
          background: ${k(.1,d)};
          border-color: ${k(.1,c)};
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

      ${({narrow:l,small:z,variant:q})=>{if(q!=="link"&&!z&&!l)return t`
            @media (max-width: ${w.mobile}) {
              padding: 0 3rem;
            }
          `}}
    `}}
`,g=C.forwardRef(({children:s,icon:e,...n},r)=>{const b=e||R;return v.jsxs(j,{...n,ref:r,children:[s,n.variant==="link"&&v.jsx(b,{hasText:!!s})]})});g.displayName="Button";g.propTypes={children:a.node,hasText:a.bool,icon:a.elementType,narrow:a.bool,onClick:a.func,small:a.bool,variant:a.oneOf(["link","navLink","flat","naked","primary","secondary","light"])};g.defaultProps={children:"",narrow:!1,onClick:()=>{},small:!1,variant:"secondary",xsmall:!1};g.__docgenInfo={description:"",methods:[],displayName:"Button",props:{children:{defaultValue:{value:'""',computed:!1},type:{name:"node"},required:!1,description:""},narrow:{defaultValue:{value:"false",computed:!1},type:{name:"bool"},required:!1,description:""},onClick:{defaultValue:{value:"() => {}",computed:!1},type:{name:"func"},required:!1,description:""},small:{defaultValue:{value:"false",computed:!1},type:{name:"bool"},required:!1,description:""},variant:{defaultValue:{value:'"secondary"',computed:!1},type:{name:"enum",value:[{value:'"link"',computed:!1},{value:'"navLink"',computed:!1},{value:'"flat"',computed:!1},{value:'"naked"',computed:!1},{value:'"primary"',computed:!1},{value:'"secondary"',computed:!1},{value:'"light"',computed:!1}]},required:!1,description:""},xsmall:{defaultValue:{value:"false",computed:!1},required:!1},hasText:{type:{name:"bool"},required:!1,description:""},icon:{type:{name:"elementType"},required:!1,description:""}}};export{g as B};
//# sourceMappingURL=index-f7e231fc.js.map
