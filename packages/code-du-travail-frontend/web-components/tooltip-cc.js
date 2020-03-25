import { LitElement, html, css } from "lit-element";
import { isOutOfViewport } from "./utils";

class WebComponentsTooltipCC extends LitElement {
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
        box-sizing: border-box;
        width: auto;
        height: auto;
        color: rgb(62, 72, 110);
        font-size: 16px;
        font-family: "Open Sans", sans-serif;
        line-height: 26px;
        border-bottom-color: rgb(246, 102, 99);
        border-bottom-width: 1px;
        border-bottom-style: dotted;
        text-rendering: optimizelegibility;
        text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;
      }

      .tooltip .content {
        position: absolute;
        top: 110%;
        left: 50%;
        z-index: 1;
        width: 300px;
        margin-left: -150px;
        padding: 1em 1.5em;
        color: #3e486e;
        font-weight: normal;
        font-size: 1.6rem;
        background: #e4e8ef;
        border-radius: 0.8rem;
        box-shadow: 0 1rem 2rem rgba(121, 148, 212, 0.2);
        visibility: hidden;
        cursor: pointer;
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
    return html`<div tabindex="0" class="tooltip" aria-describedby="definition">
      <slot></slot>
      <div
        @click="${this.handleClick}"
        class="content"
        id="definition"
        role="tooltip"
      >
        Cliquez pour rechercher votre convention collective
      </div>
    </div>`;
  }

  handleClick() {
    this.dispatchEvent(
      new CustomEvent("tooltip-cc-event", {
        bubbles: true,
        composed: true,
      })
    );
  }
}

customElements.define("webcomponent-tooltip-cc", WebComponentsTooltipCC);
