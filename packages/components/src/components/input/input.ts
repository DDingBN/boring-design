import { LitElement, html, PropertyValues, ReactiveController, ReactiveControllerHost } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { live } from 'lit/directives/live.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { inputStyles } from './input.styles';

/**
 * Slot 监听控制器：用于动态检测插槽内容并触发 Host 更新
 */
export class HasSlotController implements ReactiveController {
  private host: ReactiveControllerHost & Element;

  constructor(host: ReactiveControllerHost & Element) {
    this.host = host;
    this.host.addController(this);
  }

  hostConnected() {
    this.host.shadowRoot?.addEventListener('slotchange', this._handleSlotChange);
  }

  hostDisconnected() {
    this.host.shadowRoot?.removeEventListener('slotchange', this._handleSlotChange);
  }

  private _handleSlotChange = () => {
    this.host.requestUpdate();
  };

  /** 判断指定 name 的 slot 是否有分配的节点 */
  hasSlot(name: string): boolean {
    const slot = this.host.shadowRoot?.querySelector(`slot[name="${name}"]`) as HTMLSlotElement;
    if (!slot) return false;
    // 过滤掉纯空白的文本节点
    const nodes = slot.assignedNodes({ flatten: true });
    return nodes.some(node => node.nodeType === Node.ELEMENT_NODE || (node.nodeType === Node.TEXT_NODE && node.textContent?.trim() !== ''));
  }
}

@customElement('bd-input')
export class Input extends LitElement {
  static styles = [inputStyles];
  
  // 1. 接入原生表单
  static formAssociated = true;
  
  // 2. 开启焦点委托
  static shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };

  private _internals: ElementInternals;
  private _slotController = new HasSlotController(this);

  @query('.input') private _inputEl!: HTMLInputElement;

  // --- 原生属性映射 ---
  @property({ type: String }) type = 'text';
  @property({ type: String }) value = '';
  @property({ type: String }) placeholder = '';
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true }) readonly = false;
  @property({ type: Boolean }) required = false;
  @property({ type: String }) pattern?: string;
  @property({ type: Number }) minlength?: number;
  @property({ type: Number }) maxlength?: number;
  @property({ type: Boolean }) autofocus = false;
  @property({ type: String }) autocomplete?: string;

  // --- 增强属性 ---
  @property({ type: String, reflect: true }) size: 'small' | 'medium' | 'large' = 'medium';
  @property({ type: Boolean }) clearable = false;
  @property({ type: Boolean, attribute: 'password-toggle' }) passwordToggle = false;

  // --- 内部状态 ---
  @state() private _isPasswordVisible = false;

  constructor() {
    super();
    this._internals = this.attachInternals();
  }

  // 处理原生表单重置
  formResetCallback() {
    this.value = this.getAttribute('value') || '';
    // 强制触发一次更新以保证 live 指令能正确反映新值
    this.requestUpdate();
    this._internals.setFormValue(this.value);
  }

  // 同步 value 到原生 Form
  protected updated(changedProperties: PropertyValues) {
    if (changedProperties.has('value')) {
      this._internals.setFormValue(this.value);
    }
  }

  private _handleInput(e: Event) {
    this.value = (e.target as HTMLInputElement).value;
    // 抛出业务态 input 事件 (原生 input 事件自然冒泡，不阻断)
    this.dispatchEvent(new CustomEvent('bd-input', { 
      detail: { value: this.value },
      bubbles: true, 
      composed: true 
    }));
  }

  private _handleChange(e: Event) {
    // 抛出业务态 change 事件
    this.dispatchEvent(new CustomEvent('bd-change', { 
      detail: { value: this.value },
      bubbles: true, 
      composed: true 
    }));
  }

  private _handleClear(e: MouseEvent) {
    e.preventDefault();
    if (this.disabled || this.readonly) return;

    this.value = '';
    this._inputEl.focus();

    // 连续抛出规范要求的三个事件
    this.dispatchEvent(new CustomEvent('bd-clear', { detail: { value: this.value }, bubbles: true, composed: true }));
    this.dispatchEvent(new CustomEvent('bd-input', { detail: { value: this.value }, bubbles: true, composed: true }));
    this.dispatchEvent(new CustomEvent('bd-change', { detail: { value: this.value }, bubbles: true, composed: true }));
  }

  private _togglePassword(e: MouseEvent) {
    e.preventDefault();
    if (this.disabled || this.readonly) return;
    this._isPasswordVisible = !this._isPasswordVisible;
  }

  render() {
    const hasPrefix = this._slotController.hasSlot('prefix');
    const hasSuffix = this._slotController.hasSlot('suffix');
    const isPassword = this.type === 'password';
    const currentType = isPassword ? (this._isPasswordVisible ? 'text' : 'password') : this.type;
    const showClear = this.clearable && this.value.length > 0 && !this.disabled && !this.readonly;
    const showPasswordToggle = this.passwordToggle && isPassword && !this.disabled && !this.readonly;

    const baseClasses = {
      base: true,
      'bd-input--has-prefix': hasPrefix,
      'bd-input--has-suffix': hasSuffix,
    };

    return html`
      <div class=${classMap(baseClasses)} part="base">
        <!-- Prefix Slot -->
        <div class="prefix" part="prefix" ?hidden=${!hasPrefix}>
          <slot name="prefix"></slot>
        </div>

        <!-- 核心 Input (强制使用 live 指令) -->
        <input
          class="input"
          part="input"
          type=${currentType}
          .value=${live(this.value)}
          placeholder=${ifDefined(this.placeholder || undefined)}
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          ?required=${this.required}
          pattern=${ifDefined(this.pattern)}
          minlength=${ifDefined(this.minlength)}
          maxlength=${ifDefined(this.maxlength)}
          ?autofocus=${this.autofocus}
          autocomplete=${ifDefined(this.autocomplete)}
          @input=${this._handleInput}
          @change=${this._handleChange}
        />

        <!-- 清除按钮 -->
        ${showClear ? html`
          <button
            type="button"
            class="clear-button"
            part="clear-button"
            @click=${this._handleClear}
            aria-label="Clear input"
          >
            <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
            </svg>
          </button>
        ` : ''}

        <!-- 密码切换按钮 -->
        ${showPasswordToggle ? html`
          <button
            type="button"
            class="password-toggle-button"
            part="password-toggle-button"
            @click=${this._togglePassword}
            aria-label=${this._isPasswordVisible ? 'Hide password' : 'Show password'}
          >
            ${this._isPasswordVisible 
              ? html`<svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor"><path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/><path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/></svg>`
              : html`<svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor"><path d="M10.79 12.912l-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z"/><path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708l-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6l-12-12 .708-.708 12 12-.708.708z"/></svg>`
            }
          </button>
        ` : ''}

        <!-- Suffix Slot -->
        <div class="suffix" part="suffix" ?hidden=${!hasSuffix}>
          <slot name="suffix"></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bd-input': Input;
  }
}