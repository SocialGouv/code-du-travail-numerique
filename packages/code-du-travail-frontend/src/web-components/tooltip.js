import { utils } from "@socialgouv/cdtn-ui";
import { css, html, LitElement } from "lit-element";

const { throttledDisplayInViewport } = utils;

class WebComponentsTooltip extends LitElement {
  static get properties() {
    return {
      content: { type: String },
      visible: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.visible = false;
  }

  static get styles() {
    return css`
      :host {
        display: inline-block;
      }

      .tooltip {
        display: inline;
        position: relative;
        border-bottom-color: #4d73b8;
        border-bottom-color: var(--color-altText);
        border-bottom-width: 1px;
        border-bottom-style: dotted;
      }

      .tooltip .content {
        position: absolute;
        z-index: 1;
        display: none;
        box-sizing: border-box;
        width: 300px;
        padding: 1rem 1.6rem;
        color: #3e486e;
        color: var(--color-paragraph);
        font-weight: normal;
        font-size: 1.6rem;
        font-family: "Open Sans", sans-serif;
        font-style: normal;
        line-height: 1.6;
        background-color: #e4e8ef;
        background-color: var(--color-bgTertiary);
        border: 1px solid #bbcadf;
        border: 1px solid var(--color-border);
        border-radius: 0.6rem;
        box-shadow: 0 1rem 2rem rgba(121, 148, 212, 0.4);
      }

      @media (max-width: 600px) {
        .tooltip .content {
          font-size: 1.4rem;
        }
      }

      .content.visible {
        display: block;
      }
    `;
  }

  render() {
    return html` <div
      tabindex="0"
      class="tooltip"
      aria-describedby="tooltip-definition"
      @focus="${this.show}"
      @mouseenter="${this.show}"
      @blur="${this.hide}"
      @mouseleave="${this.hide}"
    >
      <slot></slot>
      <div
        id="tooltip-definition"
        class="content${this.visible ? " visible" : ""}"
        role="tooltip"
        aria-hidden="${!this.visible}"
      >
        ${decodeURIComponent(this.content).trim()}
      </div>
    </div>`;
  }

  show() {
    const target = this.shadowRoot.querySelector(".content");
    throttledDisplayInViewport(target, this);
    this.visible = true;
  }

  hide() {
    this.visible = false;
    const target = this.shadowRoot.querySelector(".content");
    target.style.display = "none";
  }
}

export { WebComponentsTooltip };
