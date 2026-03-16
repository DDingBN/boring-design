import { LitElement, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { alertStyles } from "./alert.styles";
import type { AlertCloseDetail, AlertTone, AlertVariant } from "./alert.types";

@customElement("bd-alert")
export class Alert extends LitElement {
  static styles = alertStyles;

  @property({ type: String, reflect: true }) variant: AlertVariant = "info";
  @property({ type: String, reflect: true }) tone: AlertTone = "soft";
  @property({ type: Boolean, reflect: true }) closable = false;
  @property({ type: Boolean, reflect: true }) open = true;

  close(reason: AlertCloseDetail["reason"] = "api") {
    if (!this.open) return;
    this.open = false;
    this.dispatchEvent(
      new CustomEvent<AlertCloseDetail>("bd-close", {
        detail: { reason },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private handleClose = () => this.close("close-button");

  render() {
    if (!this.open) return nothing;
    const classes = {
      alert: true,
      [`alert--${this.variant}`]: true,
      [`alert--${this.tone}`]: true,
    };
    return html`<div
      class=${classMap(classes)}
      role="status"
      aria-live="polite"
    >
      <slot name="icon"></slot>
      <div class="content">
        <div class="title"><slot name="title"></slot></div>
        <div><slot></slot></div>
      </div>
      ${this.closable
        ? html`<button
            class="close"
            type="button"
            aria-label="close"
            @click=${this.handleClose}
          >
            ×
          </button>`
        : nothing}
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "bd-alert": Alert;
  }
}
