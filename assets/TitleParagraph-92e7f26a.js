import{P as e}from"./index-8d47fad6.js";import{s as i,A as n}from"./styled-components.browser.esm-525a869c.js";import{s as t,a as l}from"./theme-664d9dda.js";const p=i.header`
  ${({isFirst:r,stripe:a,pageTitle:o,shift:s})=>n`
      margin-top: ${o||r?"0":t.large};
      margin-bottom: ${o?t.larger:t.medium};
      margin-left: ${s?`-${s}}`:"auto"};
      text-align: ${a==="top"?"center":"left"};
      @media (max-width: ${l.mobile}) {
        margin-bottom: ${o?t.large:t.small};
        margin-left: ${s?`-${t.small}}`:"auto"};
      }
    `};
`;p.propTypes={isFirst:e.bool,pageTitle:e.bool,shift:e.string,stripe:e.oneOf(["left","top","none"])};p.defaultProps={isFirst:!1,pageTitle:!1,shift:"",stripe:"left"};const m=i.p`
  margin-top: ${t.small};
  margin-bottom: 0;
  padding-left: ${({stripe:r,shift:a})=>r==="left"?a||t.large:"0"};
  @media (max-width: ${l.mobile}) {
    padding-left: ${({stripe:r})=>r==="left"?t.base:"0"};
  }
`;m.propTypes={shift:e.string,stripe:e.oneOf(["left","top","none"])};m.defaultProps={shift:"",stripe:"left"};export{p as H,m as T};
//# sourceMappingURL=TitleParagraph-92e7f26a.js.map
