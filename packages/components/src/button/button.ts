import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { buttonStyles } from "./button.styles";
import { HasSlotController } from "../internal/controllers/hasSlotController";

export type ButtonVariant = "primary" | "default" | "text" | "danger";
export type ButtonSize = "small" | "medium" | "large";
export type ButtonType = "button" | "submit" | "reset";

/**
 * Button 组件
 * @slot - 默认插槽，用于放置按钮文字
 * @slot prefix - 前缀插槽，用于放置前置图标
 * @slot suffix - 后缀插槽，用于放置后置图标
 * @slot spinner - 自定义加载图标
 */
@customElement("bd-button")
export class Button extends LitElement {
  static styles = buttonStyles;
  
  // 引入插槽控制器，监听 prefix, suffix 和默认插槽
  private readonly hasSlotController = new HasSlotController(this, "[default]", "prefix", "suffix");

  // 开启表单关联
  static formAssociated = true;
  private _internals: ElementInternals;

  constructor() {
    super();
    this._internals = this.attachInternals();
  }

  @property({ type: String, reflect: true })
  variant: ButtonVariant = "default";

  @property({ type: String, reflect: true })
  size: ButtonSize = "medium";

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  loading = false;

  @property({ type: String })
  type: ButtonType = "button";

  private _handleClick(e: MouseEvent) {
    if (this.disabled || this.loading) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    // 处理表单提交/重置
    if (this.type === "submit" || this.type === "reset") {
      const form = this._internals.form;
      if (form) {
        if (this.type === "submit") {
          // 在原生 form 中触发 submit
          form.requestSubmit();
        } else if (this.type === "reset") {
          form.reset();
        }
      }
    }
  }

  render() {
    const hasPrefix = this.hasSlotController.test("prefix");
    const hasSuffix = this.hasSlotController.test("suffix");
    // 如果是 loading 状态，或者有默认插槽内容，才渲染 label 容器
    const hasLabel = this.hasSlotController.test("[default]");

    const classes = {
      button: true,
      [`button--${this.variant}`]: true,
      [`button--${this.size}`]: true,
      "button--loading": this.loading,
      "button--has-prefix": hasPrefix,
      "button--has-suffix": hasSuffix,
      "button--has-label": hasLabel,
    };

    return html`
      <button
        part="base"
        class=${classMap(classes)}
        ?disabled=${this.disabled || this.loading}
        type=${this.type}
        @click=${this._handleClick}
      >
        ${this.loading
          ? html`
              <span part="spinner" class="spinner">
                <slot name="spinner">
                  <svg class="default-spinner" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
                  </svg>
                </slot>
              </span>
            `
          : ""}
        
        ${hasPrefix
          ? html`<span part="prefix" class="prefix"><slot name="prefix"></slot></span>`
          : ""}
          
        ${hasLabel || this.loading
          ? html`<span part="label" class="label"><slot></slot></span>`
          : ""}
          
        ${hasSuffix
          ? html`<span part="suffix" class="suffix"><slot name="suffix"></slot></span>`
          : ""}
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "bd-button": Button;
  }
}
