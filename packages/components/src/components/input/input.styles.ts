import { css } from 'lit';

export const inputStyles = css`
  :host {
    display: inline-block;
    width: 100%;
  }

  /* 禁用状态：整体透明度控制，鼠标禁用样式 */
  :host([disabled]) {
    opacity: var(--bd-opacity-disabled, 0.5);
    cursor: not-allowed;
  }

  /* 基础包裹层 */
  .base {
    display: flex;
    align-items: center;
    width: 100%;
    background-color: var(--bd-input-bg, var(--bd-bg-base));
    border: 1px solid var(--bd-input-border, var(--bd-border-base));
    border-radius: var(--bd-radius-md, 4px);
    outline: 0 solid var(--bd-focus-ring-color, rgba(0, 112, 243, 0.5));
    transition: outline-width 0.1s ease-out, border-color 0.2s ease, background-color 0.2s ease;
    box-sizing: border-box;
    overflow: hidden;
  }

  /* 悬停状态：不包括被禁用的状态 */
  :host(:not([disabled])) .base:hover {
    border-color: var(--bd-color-primary-hover, #2563eb);
  }

  /* 焦点状态：通过 focus-within 响应内部原生 input 的聚焦 */
  .base:focus-within {
    outline-width: var(--bd-focus-ring-width, 3px);
    border-color: var(--bd-color-primary, #0070f3);
  }

  /* 尺寸控制 (Size) */
  :host([size='small']) .base {
    height: var(--bd-size-small, 32px);
    padding: 0 var(--bd-space-2, 8px);
    font-size: var(--bd-font-size-sm, 12px);
  }

  :host([size='medium']) .base {
    height: var(--bd-size-medium, 40px);
    padding: 0 var(--bd-space-3, 12px);
    font-size: var(--bd-font-size-md, 14px);
  }

  :host([size='large']) .base {
    height: var(--bd-size-large, 48px);
    padding: 0 var(--bd-space-4, 16px);
    font-size: var(--bd-font-size-lg, 16px);
  }

  /* 插槽布局控制 */
  .prefix,
  .suffix {
    display: flex;
    align-items: center;
    color: var(--bd-text-muted, #888);
    flex-shrink: 0;
  }

  .base.bd-input--has-prefix {
    gap: var(--bd-space-2, 8px);
  }

  .base.bd-input--has-suffix {
    gap: var(--bd-space-2, 8px);
  }

  /* 原生 Input 元素 */
  .input {
    flex: 1;
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    background: transparent;
    color: var(--bd-text-primary, #333);
    font-family: inherit;
    font-size: inherit;
    padding: 0;
  }

  .input::placeholder {
    color: var(--bd-text-muted, #888);
  }

  .input:disabled {
    cursor: not-allowed;
  }

  /* 增强功能按钮 */
  .clear-button,
  .password-toggle-button {
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    padding: 0;
    margin-left: var(--bd-space-1, 4px);
    color: var(--bd-text-muted, #888);
    cursor: pointer;
    transition: color 0.2s ease;
    flex-shrink: 0;
  }

  .clear-button:hover,
  .password-toggle-button:hover {
    color: var(--bd-text-primary, #333);
  }

  /* 按钮自身的焦点使用 focus-visible */
  .clear-button:focus-visible,
  .password-toggle-button:focus-visible {
    outline: 2px solid var(--bd-focus-ring-color, rgba(0, 112, 243, 0.5));
    outline-offset: 2px;
    border-radius: var(--bd-radius-sm, 2px);
  }
`;