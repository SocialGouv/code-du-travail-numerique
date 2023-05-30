import{j as t,s,A as r,W as j}from"./styled-components.browser.esm-41178855.js";import{i as T}from"./ShareWhatsapp-86bedeb5.js";import{S as y}from"./index-3a4716ad.js";import{P as i}from"./index-1fc0ca9a.js";import{r as l}from"./index-8db94870.js";import"./_commonjsHelpers-042e6b4d.js";import"./theme-dc888197.js";import"./polished.esm-d698528e.js";const o=({background:e="FFFFFF",children:n,position:p="top",text:x,textColor:f="3e486e"})=>{const[h,c]=l.useState(!1),[d,u]=l.useState(!1),a=l.useRef(null),m=h||d,g=b=>{b.preventDefault(),a.current&&a.current.blur()};return t.jsxs(w,{children:[t.jsx(v,{onMouseEnter:()=>c(!0),onMouseLeave:()=>c(!1),onFocus:()=>u(!0),onBlur:()=>u(!1),onClick:g,ref:a,showOnFocus:d,children:n}),m&&t.jsx(F,{position:p,children:t.jsx(C,{background:e,textColor:f,position:p,children:x})})]})};o.propTypes={background:i.string,children:i.node.isRequired,position:i.oneOf(["top","right","left","bottom"]),text:i.node.isRequired,textColor:i.string};const w=s.div`
  position: relative;
  display: inline-flex;
`,v=s.button`
  border: none;
  background: inherit;
  font-size: inherit;
  color: inherit;
  cursor: inherit;
  display: flex;
  ${({showOnFocus:e})=>!e&&r`
      outline: none;
    `};
`,F=s.div`
  position: absolute;
  width: 200px;
  z-index: 1;
  margin-left: -100px;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 50%;
  bottom: calc(100% + 5px);
  pointer-events: none;
  ${({position:e})=>{switch(e){case"bottom":return r`
          bottom: unset !important;
          top: calc(100% + 5px);
        `;case"left":return r`
          margin-right: 0;
          left: unset;
          top: 50%;
          right: calc(100% + 5px);
          width: max-content;
        `;case"right":return r`
          margin-left: 0;
          top: 50%;
          left: calc(100% + 5px);
          width: max-content;
        `;default:return r`
          bottom: calc(100% + 5px);
        `}}}
`,k=j`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`,C=s.span`
  position: relative;
  background-color: #${e=>e.background};
  color: #${e=>e.textColor};
  text-align: center;
  border-radius: 5px;
  padding: 10px 8px;
  font-size: 1.25rem;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.2);

  animation: ${k} 100ms linear;

  &:after {
    content: "";
    position: absolute;
    width: 1px;
    height: 1px;
    border-width: 5px;
    border-style: solid;
    border-color: #${e=>e.background} transparent transparent transparent;
    left: calc(50% - 4.5px);
    top: 100%;
  }

  ${({position:e})=>{switch(e){case"bottom":return r`
          &:after {
            border-color: transparent transparent #${n=>n.background} transparent;
            top: unset;
            width: 1px;
            bottom: 100%;
            left: calc(50% - 5px);
          }
        `;case"left":return r`
          &:after {
            border-color: transparent transparent transparent #${n=>n.background};
            left: 100%;
            top: calc(50% - 5px);
          }
        `;case"right":return r`
          &:after {
            border-color: transparent #${n=>n.background} transparent
              transparent;
            right: 100%;
            left: unset;
            top: calc(50% - 5px);
          }
        `;default:return r``}}}
`;o.__docgenInfo={description:"",methods:[],displayName:"Tooltip",props:{background:{defaultValue:{value:'"FFFFFF"',computed:!1},type:{name:"string"},required:!1,description:""},position:{defaultValue:{value:'"top"',computed:!1},type:{name:"enum",value:[{value:'"top"',computed:!1},{value:'"right"',computed:!1},{value:'"left"',computed:!1},{value:'"bottom"',computed:!1}]},required:!1,description:""},textColor:{defaultValue:{value:'"3e486e"',computed:!1},type:{name:"string"},required:!1,description:""},children:{type:{name:"node"},required:!0,description:""},text:{type:{name:"node"},required:!0,description:""}}};const W={component:o,title:"Components/Tooltip"},$=()=>t.jsx(t.Fragment,{children:t.jsxs(y,{children:[t.jsx("p",{children:t.jsx(o,{text:"Tooltip content",children:"Tooltip will show on mouse enter."})}),t.jsxs("p",{children:["This is a text with a tooltip on a",t.jsx(o,{text:"Tooltip content",children:t.jsx("strong",{children:"single"})}),"world"]}),t.jsxs("p",{children:["Tooltip can be used with any content:",t.jsx(o,{text:"Tooltip content",children:t.jsx(T,{width:"2rem"})})]}),t.jsx("p",{children:t.jsx(o,{text:"Tooltip content",position:"left",children:"Tooltip on the left"})}),t.jsx("p",{children:t.jsx(o,{text:"Tooltip content",position:"right",children:"Tooltip on the right"})}),t.jsx("p",{children:t.jsx(o,{text:"Tooltip content",position:"bottom",children:"Tooltip on the bottom"})}),t.jsx("p",{children:t.jsx(o,{text:"Tooltip content",background:"f5f9fc",textColor:"000000",children:"Tooltip with custom background color"})})]})});$.__docgenInfo={description:"",methods:[],displayName:"base"};export{$ as base,W as default};
//# sourceMappingURL=story-a8515fdb.js.map
