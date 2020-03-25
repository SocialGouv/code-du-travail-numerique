import { LitElement, html, css } from "lit-element";
import { isOutOfViewport } from "./utils";

class WebComponentsTooltip extends LitElement {
  static get properties() {
    return {
      content: { type: String },
    };
  }

  get root() {
    return this.shadowRoot || this;
  }

  static get styles() {
    return css`
      :host {
        display: inline-block;
      }

      .tooltip {
        position: relative;
        display: inline;
        box-sizing: border-box;
        width: fit-content;
        height: auto;
        color: rgb(62, 72, 110);
        font-size: 16px;
        font-family: "Open Sans", sans-serif;
        line-height: 26px;
        border-bottom-color: rgb(121, 148, 212);
        border-bottom-width: 1px;
        border-bottom-style: dotted;
        text-rendering: optimizelegibility;
        text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;
      }

      .tooltip .content {
        position: absolute;
        z-index: 1;
        width: 300px;
        padding: 0em 1.5em;
        color: #3e486e;
        font-weight: normal;
        font-size: 1.6rem;
        background: #e4e8ef;
        border-radius: 0.8rem;
        box-shadow: 0 1rem 2rem rgba(121, 148, 212, 0.2);
        visibility: hidden;
        opacity: 0;
        transition: opacity 0.3s;
      }

      .tooltip:hover .content {
        visibility: visible;
        opacity: 1;
      }
    `;
  }

  updatePosition() {
    const thisRect = this.getBoundingClientRect();

    const target = this.root.querySelector(".content");
    const targetRect = target.getBoundingClientRect();

    target.style.left =
      -Math.round((targetRect.width - thisRect.width) / 2) + "px";

    const isOut = isOutOfViewport(target);
    if (isOut.left) {
      target.style.left = "0px";
      target.style.right = "auto";
    }

    if (isOut.right) {
      target.style.right = "0px";
      target.style.left = "auto";
    }

    if (isOut.bottom) {
      target.style.top = -Math.round(targetRect.height) + "px";
    }
  }

  render() {
    return html`<div
      tabindex="0"
      class="tooltip"
      @mouseenter="${this.handleMouseEnter}"
      @mouseleave="${this.handleMouseLeave}"
      aria-describedby="definition"
    >
      <slot></slot>
    </div>`;
  }

  handleMouseEnter() {
    const rootElement = this.root.querySelector(".tooltip");
    var tooltipWrap = document.createElement("div");
    tooltipWrap.id = "definition";
    tooltipWrap.className = "content";
    tooltipWrap.role = "tooltip";
    tooltipWrap.innerHTML = decodeURI(this.content).trim();
    rootElement.append(tooltipWrap);
    this.updatePosition();
  }
  handleMouseLeave() {
    const rootElement = this.root.querySelector(".tooltip");
    const [tooltipElement] = rootElement.parentNode.querySelectorAll(
      ".content"
    );
    tooltipElement.remove();
  }
}

customElements.define("webcomponent-tooltip", WebComponentsTooltip);
