import { LitElement, html, css } from "lit-element";
import { v4 as uuidv4 } from "uuid";
import { throttledDisplayInViewport } from "./utils";

class WebComponentsTooltipCC extends LitElement {
  static get properties() {
    return {
      id: { type: String },
      visible: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.id = uuidv4();
    this.visible = false;
  }

  static get styles() {
    return css`
      :host {
        display: inline-block;
      }

      .tooltip {
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
        text-decoration: underline;
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

      .tooltip .content.visible {
        display: block;
      }
    `;
  }

  render() {
    return html`<div
      tabindex="0"
      class="tooltip"
      aria-describedby="definition-${this.id}"
      @focus="${this.show}"
      @pointerenter="${this.show}"
      @pointerleave="${this.hide}"
    >
      <slot></slot>
      <div
        @blur="${this.hide}"
        id="definition-${this.id}"
        class="content${this.visible ? " visible" : ""}"
        role="tooltip"
        aria-hidden="${!this.visible}"
      >
        <a
          href="/convention-collective"
          @click="${this.showModal}"
          @blur="${this.hide}"
        >
          Cliquez ici pour rechercher votre convention collective
        </a>
      </div>
    </div>`;
  }

  show() {
    const rootBoundaries = this.getBoundingClientRect();
    const target = this.shadowRoot.querySelector(".content");
    throttledDisplayInViewport(target, rootBoundaries);
    this.visible = true;
  }
  hide() {
    this.visible = false;
    const target = this.shadowRoot.querySelector(".content");
    target.style.display = "none";
  }

  showModal(evt) {
    evt.preventDefault();
    this.dispatchEvent(
      new CustomEvent("tooltip-cc-event", {
        bubbles: true,
        composed: true,
      })
    );
  }
}

customElements.define("webcomponent-tooltip-cc", WebComponentsTooltipCC);
