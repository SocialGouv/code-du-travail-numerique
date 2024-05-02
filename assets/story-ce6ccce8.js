import{j as u,s as N}from"./styled-components.browser.esm-525a869c.js";import{T as se}from"./index-e8966d81.js";import{P as v}from"./index-8d47fad6.js";import{r as b,R as $}from"./index-76fb7be0.js";import{S as ye}from"./index-824ca9d5.js";import{s as y,a as P,f as ie,b as x,c as ve}from"./theme-6bad1081.js";import"./_commonjsHelpers-de833af9.js";import"./index-db26d228.js";import"./TitleParagraph-7db5d8aa.js";import"./polished.esm-3b4f0385.js";function te(e){return function(t){return!!t.type&&t.type.tabsRole===e}}var R=te("Tab"),re=te("TabList"),S=te("TabPanel");function V(){return V=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e},V.apply(this,arguments)}function ge(e){return R(e)||re(e)||S(e)}function z(e,t){return b.Children.map(e,function(a){return a===null?null:ge(a)?t(a):a.props&&a.props.children&&typeof a.props.children=="object"?b.cloneElement(a,V({},a.props,{children:z(a.props.children,t)})):a})}function ne(e,t){return b.Children.forEach(e,function(a){a!==null&&(R(a)||S(a)?t(a):a.props&&a.props.children&&typeof a.props.children=="object"&&(re(a)&&t(a),ne(a.props.children,t)))})}function fe(e){var t,a,n="";if(typeof e=="string"||typeof e=="number")n+=e;else if(typeof e=="object")if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(a=fe(e[t]))&&(n&&(n+=" "),n+=a);else for(t in e)e[t]&&(n&&(n+=" "),n+=t);return n}function E(){for(var e,t,a=0,n="";a<arguments.length;)(e=arguments[a++])&&(t=fe(e))&&(n&&(n+=" "),n+=t);return n}var Te=0;function le(){return"react-tabs-"+Te++}function pe(e){var t=0;return ne(e,function(a){R(a)&&t++}),t}function _e(e){var t=0;return ne(e,function(a){S(a)&&t++}),t}var xe=["children","className","disabledTabClassName","domRef","focus","forceRenderTabPanel","onSelect","selectedIndex","selectedTabClassName","selectedTabPanelClassName","environment","disableUpDownKeys"];function B(){return B=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e},B.apply(this,arguments)}function $e(e,t){if(e==null)return{};var a={},n=Object.keys(e),r,o;for(o=0;o<n.length;o++)r=n[o],!(t.indexOf(r)>=0)&&(a[r]=e[r]);return a}function Pe(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,G(e,t)}function G(e,t){return G=Object.setPrototypeOf||function(n,r){return n.__proto__=r,n},G(e,t)}function be(e){return e&&"getAttribute"in e}function de(e){return be(e)&&e.getAttribute("data-rttab")}function g(e){return be(e)&&e.getAttribute("aria-disabled")==="true"}var I;function Ne(e){var t=e||(typeof window<"u"?window:void 0);try{I=!!(typeof t<"u"&&t.document&&t.document.activeElement)}catch{I=!1}}var ae=function(e){Pe(t,e);function t(){for(var n,r=arguments.length,o=new Array(r),s=0;s<r;s++)o[s]=arguments[s];return n=e.call.apply(e,[this].concat(o))||this,n.tabNodes=[],n.handleKeyDown=function(i){var l=n.props,d=l.direction,f=l.disableUpDownKeys;if(n.isTabFromContainer(i.target)){var c=n.props.selectedIndex,m=!1,p=!1;(i.keyCode===32||i.keyCode===13)&&(m=!0,p=!1,n.handleClick(i)),i.keyCode===37||!f&&i.keyCode===38?(d==="rtl"?c=n.getNextTab(c):c=n.getPrevTab(c),m=!0,p=!0):i.keyCode===39||!f&&i.keyCode===40?(d==="rtl"?c=n.getPrevTab(c):c=n.getNextTab(c),m=!0,p=!0):i.keyCode===35?(c=n.getLastTab(),m=!0,p=!0):i.keyCode===36&&(c=n.getFirstTab(),m=!0,p=!0),m&&i.preventDefault(),p&&n.setSelected(c,i)}},n.handleClick=function(i){var l=i.target;do if(n.isTabFromContainer(l)){if(g(l))return;var d=[].slice.call(l.parentNode.children).filter(de).indexOf(l);n.setSelected(d,i);return}while((l=l.parentNode)!=null)},n}var a=t.prototype;return a.setSelected=function(r,o){if(!(r<0||r>=this.getTabsCount())){var s=this.props,i=s.onSelect,l=s.selectedIndex;i(r,l,o)}},a.getNextTab=function(r){for(var o=this.getTabsCount(),s=r+1;s<o;s++)if(!g(this.getTab(s)))return s;for(var i=0;i<r;i++)if(!g(this.getTab(i)))return i;return r},a.getPrevTab=function(r){for(var o=r;o--;)if(!g(this.getTab(o)))return o;for(o=this.getTabsCount();o-- >r;)if(!g(this.getTab(o)))return o;return r},a.getFirstTab=function(){for(var r=this.getTabsCount(),o=0;o<r;o++)if(!g(this.getTab(o)))return o;return null},a.getLastTab=function(){for(var r=this.getTabsCount();r--;)if(!g(this.getTab(r)))return r;return null},a.getTabsCount=function(){var r=this.props.children;return pe(r)},a.getPanelsCount=function(){var r=this.props.children;return _e(r)},a.getTab=function(r){return this.tabNodes["tabs-"+r]},a.getChildren=function(){var r=this,o=0,s=this.props,i=s.children,l=s.disabledTabClassName,d=s.focus,f=s.forceRenderTabPanel,c=s.selectedIndex,m=s.selectedTabClassName,p=s.selectedTabPanelClassName,w=s.environment;this.tabIds=this.tabIds||[],this.panelIds=this.panelIds||[];for(var D=this.tabIds.length-this.getTabsCount();D++<0;)this.tabIds.push(le()),this.panelIds.push(le());return z(i,function(h){var C=h;if(re(h)){var _=0,O=!1;I==null&&Ne(w),I&&(O=$.Children.toArray(h.props.children).filter(R).some(function(oe,K){var j=w||(typeof window<"u"?window:void 0);return j&&j.document.activeElement===r.getTab(K)})),C=b.cloneElement(h,{children:z(h.props.children,function(oe){var K="tabs-"+_,j=c===_,q={tabRef:function(he){r.tabNodes[K]=he},id:r.tabIds[_],panelId:r.panelIds[_],selected:j,focus:j&&(d||O)};return m&&(q.selectedClassName=m),l&&(q.disabledClassName=l),_++,b.cloneElement(oe,q)})})}else if(S(h)){var U={id:r.panelIds[o],tabId:r.tabIds[o],selected:c===o};f&&(U.forceRender=f),p&&(U.selectedClassName=p),o++,C=b.cloneElement(h,U)}return C})},a.isTabFromContainer=function(r){if(!de(r))return!1;var o=r.parentElement;do{if(o===this.node)return!0;if(o.getAttribute("data-rttabs"))break;o=o.parentElement}while(o);return!1},a.render=function(){var r=this,o=this.props;o.children;var s=o.className;o.disabledTabClassName;var i=o.domRef;o.focus,o.forceRenderTabPanel,o.onSelect,o.selectedIndex,o.selectedTabClassName,o.selectedTabPanelClassName,o.environment,o.disableUpDownKeys;var l=$e(o,xe);return $.createElement("div",B({},l,{className:E(s),onClick:this.handleClick,onKeyDown:this.handleKeyDown,ref:function(f){r.node=f,i&&i(f)},"data-rttabs":!0}),this.getChildren())},t}(b.Component);ae.defaultProps={className:"react-tabs",focus:!1};ae.propTypes={};var Ce=["children","defaultIndex","defaultFocus"];function Oe(e,t){if(e==null)return{};var a={},n=Object.keys(e),r,o;for(o=0;o<n.length;o++)r=n[o],!(t.indexOf(r)>=0)&&(a[r]=e[r]);return a}function je(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,H(e,t)}function H(e,t){return H=Object.setPrototypeOf||function(n,r){return n.__proto__=r,n},H(e,t)}var we=0,M=1,L=function(e){je(t,e);function t(n){var r;return r=e.call(this,n)||this,r.handleSelected=function(o,s,i){var l=r.props.onSelect,d=r.state.mode;if(!(typeof l=="function"&&l(o,s,i)===!1)){var f={focus:i.type==="keydown"};d===M&&(f.selectedIndex=o),r.setState(f)}},r.state=t.copyPropsToState(r.props,{},n.defaultFocus),r}t.getDerivedStateFromProps=function(r,o){return t.copyPropsToState(r,o)},t.getModeFromProps=function(r){return r.selectedIndex===null?M:we},t.copyPropsToState=function(r,o,s){s===void 0&&(s=!1);var i={focus:s,mode:t.getModeFromProps(r)};if(i.mode===M){var l=Math.max(0,pe(r.children)-1),d=null;o.selectedIndex!=null?d=Math.min(o.selectedIndex,l):d=r.defaultIndex||0,i.selectedIndex=d}return i};var a=t.prototype;return a.render=function(){var r=this.props,o=r.children;r.defaultIndex,r.defaultFocus;var s=Oe(r,Ce),i=this.state,l=i.focus,d=i.selectedIndex;return s.focus=l,s.onSelect=this.handleSelected,d!=null&&(s.selectedIndex=d),$.createElement(ae,s,o)},t}(b.Component);L.defaultProps={defaultFocus:!1,forceRenderTabPanel:!1,selectedIndex:null,defaultIndex:null,environment:null,disableUpDownKeys:!1};L.propTypes={};L.tabsRole="Tabs";var Ie=["children","className"];function J(){return J=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e},J.apply(this,arguments)}function Re(e,t){if(e==null)return{};var a={},n=Object.keys(e),r,o;for(o=0;o<n.length;o++)r=n[o],!(t.indexOf(r)>=0)&&(a[r]=e[r]);return a}function Se(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,Q(e,t)}function Q(e,t){return Q=Object.setPrototypeOf||function(n,r){return n.__proto__=r,n},Q(e,t)}var F=function(e){Se(t,e);function t(){return e.apply(this,arguments)||this}var a=t.prototype;return a.render=function(){var r=this.props,o=r.children,s=r.className,i=Re(r,Ie);return $.createElement("ul",J({},i,{className:E(s),role:"tablist"}),o)},t}(b.Component);F.defaultProps={className:"react-tabs__tab-list"};F.propTypes={};F.tabsRole="TabList";var Ee=["children","className","disabled","disabledClassName","focus","id","panelId","selected","selectedClassName","tabIndex","tabRef"];function X(){return X=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e},X.apply(this,arguments)}function Le(e,t){if(e==null)return{};var a={},n=Object.keys(e),r,o;for(o=0;o<n.length;o++)r=n[o],!(t.indexOf(r)>=0)&&(a[r]=e[r]);return a}function Fe(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,Y(e,t)}function Y(e,t){return Y=Object.setPrototypeOf||function(n,r){return n.__proto__=r,n},Y(e,t)}var W="react-tabs__tab",k=function(e){Fe(t,e);function t(){return e.apply(this,arguments)||this}var a=t.prototype;return a.componentDidMount=function(){this.checkFocus()},a.componentDidUpdate=function(){this.checkFocus()},a.checkFocus=function(){var r=this.props,o=r.selected,s=r.focus;o&&s&&this.node.focus()},a.render=function(){var r,o=this,s=this.props,i=s.children,l=s.className,d=s.disabled,f=s.disabledClassName;s.focus;var c=s.id,m=s.panelId,p=s.selected,w=s.selectedClassName,D=s.tabIndex,h=s.tabRef,C=Le(s,Ee);return $.createElement("li",X({},C,{className:E(l,(r={},r[w]=p,r[f]=d,r)),ref:function(O){o.node=O,h&&h(O)},role:"tab",id:c,"aria-selected":p?"true":"false","aria-disabled":d?"true":"false","aria-controls":m,tabIndex:D||(p?"0":null),"data-rttab":!0}),i)},t}(b.Component);k.defaultProps={className:W,disabledClassName:W+"--disabled",focus:!1,id:null,panelId:null,selected:!1,selectedClassName:W+"--selected"};k.propTypes={};k.tabsRole="Tab";var ke=["children","className","forceRender","id","selected","selectedClassName","tabId"];function Z(){return Z=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e},Z.apply(this,arguments)}function Ae(e,t){if(e==null)return{};var a={},n=Object.keys(e),r,o;for(o=0;o<n.length;o++)r=n[o],!(t.indexOf(r)>=0)&&(a[r]=e[r]);return a}function De(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,ee(e,t)}function ee(e,t){return ee=Object.setPrototypeOf||function(n,r){return n.__proto__=r,n},ee(e,t)}var ce="react-tabs__tab-panel",A=function(e){De(t,e);function t(){return e.apply(this,arguments)||this}var a=t.prototype;return a.render=function(){var r,o=this.props,s=o.children,i=o.className,l=o.forceRender,d=o.id,f=o.selected,c=o.selectedClassName,m=o.tabId,p=Ae(o,ke);return $.createElement("div",Z({},p,{className:E(i,(r={},r[c]=f,r)),role:"tabpanel",id:d,"aria-labelledby":m}),l||f?s:null)},t}(b.Component);A.defaultProps={className:ce,forceRender:!1,selectedClassName:ce+"--selected"};A.propTypes={};A.tabsRole="TabPanel";const Ue=e=>b.isValidElement(e)&&!!e.props.children,ue=e=>typeof e=="string"?e:"",me=e=>!(e instanceof Array)&&!b.isValidElement(e)?ue(e):b.Children.toArray(e).reduce((t,a)=>{let n;return b.isValidElement(a)&&Ue(a)?n=me(a.props.children):n=ue(a),t.concat(n)},""),T=e=>{const{data:t,defaultIndex:a,onSelect:n,selectedIndex:r}=e,o={onSelect:n,...typeof r=="number"?{selectedIndex:r}:{defaultIndex:a}};return u.jsx(u.Fragment,{children:u.jsxs(Ke,{...o,children:[u.jsx(qe,{children:u.jsx(Me,{children:t.map(({tab:s},i)=>u.jsx(We,{"data-testid":e["data-testid"]?`${e["data-testid"]}-${i}`:void 0,children:me(s)},i))})}),t.map(({tab:s,panel:i},l)=>u.jsxs(Ve,{children:[u.jsx(ye,{children:s}),u.jsx(ze,{children:i})]},l))]})})};T.propTypes={data:v.arrayOf(v.shape({panel:v.node.isRequired,tab:v.node.isRequired})).isRequired,"data-testid":v.string,defaultIndex:v.number,onSelect:v.func,selectedIndex:v.number};T.defaultProps={defaultIndex:0,onSelect:()=>{}};const Ke=N(L)`
  margin-bottom: ${y.large};
  @media (max-width: ${P.mobile}) {
    margin-bottom: ${y.medium};
  }
`,qe=N.div`
  overflow-x: auto;
  margin-right: ${y.tiny};
`,Me=N(F)`
  display: flex;
  flex-wrap: nowrap;
  max-width: 100%;
  margin: 0;
  padding: 0 0 0 0;
  overflow: visible;
  list-style-type: none;
  @media (max-width: ${P.tablet}) {
    padding: 0;
  }
`,We=N(k)`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex: 1 0 auto;
  max-height: 11rem;
  margin-left: ${y.tiny};
  padding: ${y.small} ${y.base};
  color: ${({theme:e})=>e.altText};
  font-weight: 600;
  font-size: ${ie.sizes.headings.small};
  background-color: ${({theme:e})=>e.white};
  border: ${({theme:e})=>x.border(e.border)};
  border-bottom: 1px solid transparent;
  border-radius: ${x.borderRadius} ${x.borderRadius} 0 0;
  cursor: pointer;
  opacity: 1;
  transition: opacity ${ve.transitionTiming} linear;

  &[aria-selected="false"]:hover {
    opacity: 0.7;
  }

  &[aria-selected="true"] {
    color: ${({theme:e})=>e.white};
    background-color: ${({theme:e})=>e.secondary};
  }
  @media (max-width: ${P.tablet}) {
    margin: ${y.tiny};
    border-bottom: ${({theme:e})=>x.border(e.border)};
    border-radius: ${x.borderRadius};
  }
  @media (max-width: ${P.mobile}) {
    font-size: ${ie.sizes.default};
    max-width: 150px;
    flex: none !important;
  }
`,Ve=N(A)`
  color: ${({theme:e})=>e.paragraph};
  background-color: ${({theme:e})=>e.white};

  &.react-tabs__tab-panel--selected {
    padding: ${y.xmedium};
    border: 1px solid ${({theme:e})=>e.border};
    border-radius: ${x.borderRadius};
    @media (max-width: ${P.tablet}) {
      margin-top: ${y.tiny};
    }
    @media (max-width: ${P.mobile}) {
      padding: ${y.small};
    }
  }
`,ze=N.div`
  & > *:first-child {
    margin-top: 0;
  }
  & > *:last-child {
    margin-bottom: 0;
  }
`;T.__docgenInfo={description:"",methods:[],displayName:"Tabs",props:{defaultIndex:{defaultValue:{value:"0",computed:!1},type:{name:"number"},required:!1,description:""},onSelect:{defaultValue:{value:"() => {}",computed:!1},type:{name:"func"},required:!1,description:""},data:{type:{name:"arrayOf",value:{name:"shape",value:{panel:{name:"node",required:!0},tab:{name:"node",required:!0}}}},required:!0,description:""},"data-testid":{type:{name:"string"},required:!1,description:""},selectedIndex:{type:{name:"number"},required:!1,description:""}}};const at={argTypes:{handler:{action:"clicked"}},component:T,title:"Components/Tabs"},Be=({handler:e})=>u.jsxs(u.Fragment,{children:[u.jsx(T,{data:[{panel:"This panel can contain nodes",tab:u.jsx(se,{children:"This is a Title tab"})},{panel:"These tabs are not 'controlled', no onSelect is provided",tab:u.jsx(se,{children:"Title tabs render normally"})},{panel:"Content 3",tab:"Tab 3 (not a title)"},{panel:"Content 4",tab:u.jsx("h3",{children:"Tab 4 - h3"})},{panel:"Content 5",tab:"Tab 5 starts to be long"},{panel:"Content 6",tab:"Tab 6, how will render the mobile version ? "},{panel:"Content 7",tab:u.jsx("h2",{children:"This is a h2 tab"})}]}),u.jsx(T,{onSelect:t=>e(`Selected index is ${t}`)(),data:[{panel:"This panel can contain nodes",tab:"Tab 1"},{panel:"These tabs are not 'controlled'",tab:"Click here !"}]}),u.jsx(T,{selectedIndex:1,onSelect:t=>e(`Tab change request on index ${t}`)(),data:[{panel:":/",tab:"Clicking here won't do anything"},{panel:"These tabs are controlled, you won't be able to switch them manually.",tab:"Tab programmatically selected"}]})]});Be.__docgenInfo={description:"",methods:[],displayName:"base"};export{Be as base,at as default};
//# sourceMappingURL=story-ce6ccce8.js.map
