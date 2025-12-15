import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('boring-button')
export class BoringButton extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
    }
    button {
      /* 使用我们在 tokens 包里定义的变量 */
      background-color: var(--color-primary, blue);
      color: white;
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button:hover {
      opacity: 0.8;
    }
  `;

  @property()
  label = 'Button';

  render() {
    return html`
      <button type="button">
        ${this.label}
        <slot></slot>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'boring-button': BoringButton;
  }
}