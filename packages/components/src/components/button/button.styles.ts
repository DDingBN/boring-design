import { css } from "lit";

export const buttonStyles = css`
  /* :host 代表组件标签本身 <bd-button> */
  :host {
    display: inline-block;
    vertical-align: middle;
  }

  /* 基础按钮样式 */
  .button {
    font-family: inherit;
    border: 1px solid transparent;
    border-radius: var(--bd-button-radius, var(--bd-radius-md, 4px));
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    
    /* 预设 outline 颜色以避免 focus 时产生黑色渐变闪烁 */
    outline: 0px solid var(--bd-focus-ring-color, rgba(59, 130, 246, 0.4));
    outline-offset: var(--bd-focus-ring-offset, 0px);

    /* Flex 布局保证图标和文字对齐 */
    display: inline-flex;
    align-items: center;
    justify-content: center;
    /* 移除全局 gap，改为条件应用 */
    box-sizing: border-box;
    white-space: nowrap;
    user-select: none;
  }

  /* 禁用与加载状态 */
  .button:disabled,
  .button[aria-disabled="true"],
  .button--loading {
    cursor: not-allowed;
    opacity: var(--bd-opacity-disabled, 0.6);
  }

  /* 焦点状态 (Focus) */
  .button:focus-visible {
    outline-width: var(--bd-focus-ring-width, 3px);
    transition: outline-width 0.1s ease-out, background-color 0.2s, border-color 0.2s, color 0.2s, transform 0.2s, opacity 0.2s;
  }

  /* 点击状态 (Active) - 统一增加缩放效果和透明度反馈 */
  .button:active:not(:disabled):not(.button--loading) {
    transform: scale(0.98);
    opacity: var(--bd-opacity-active, 0.8);
  }

  /* --- 尺寸 (Sizes) --- */
  /* 更紧凑的尺寸体系，字体稍微调小，减少臃肿感 */
  .button--small {
    font-size: var(--bd-text-xs, 0.75rem); /* 12px */
    height: var(--bd-space-5, 24px);
    padding: 0 var(--bd-button-px-sm, var(--bd-space-btn-px-sm, 7px));
    border-radius: var(--bd-button-radius-sm, var(--bd-radius-sm, 4px));
  }

  .button--medium {
    font-size: var(--bd-text-sm, 0.875rem); /* 14px */
    height: var(--bd-space-6, 32px);
    padding: 0 var(--bd-button-px-md, var(--bd-space-btn-px-md, 15px));
    border-radius: var(--bd-button-radius-md, var(--bd-radius-md, 6px));
  }

  .button--large {
    font-size: var(--bd-text-base, 1rem); /* 16px */
    height: var(--bd-space-7, 40px);
    padding: 0 var(--bd-button-px-lg, var(--bd-space-btn-px-lg, 23px));
    border-radius: var(--bd-button-radius-lg, var(--bd-radius-lg, 8px));
  }

  /* 只有当真的存在多个子元素时，才应用 gap，避免只有文本时首尾产生多余间隙 */
  .button--has-prefix.button--has-label,
  .button--has-suffix.button--has-label,
  .button--has-prefix.button--has-suffix,
  .button--loading.button--has-label {
    gap: var(--bd-space-2, 8px);
  }

  /* 仅包含图标时，调整 padding 使其呈正方形 */
  .button:not(.button--has-label) {
    padding: 0;
    width: var(--bd-space-6, 32px); /* 默认 medium 宽度等于高度 */
  }
  
  .button--small:not(.button--has-label) {
    width: var(--bd-space-5, 24px);
  }
  
  .button--large:not(.button--has-label) {
    width: var(--bd-space-7, 40px);
  }

  /* --- 变体 (Variants) --- */

  /* Primary */
  .button--primary {
    background-color: var(--bd-button-primary-bg, var(--bd-color-primary, #3b82f6));
    color: var(--bd-button-primary-text, var(--bd-color-on-primary, #ffffff));
  }
  .button--primary:hover:not(:disabled):not(.button--loading) {
    background-color: var(--bd-button-primary-bg-hover, var(--bd-color-primary-hover, #2563eb));
  }
  .button--primary:active:not(:disabled):not(.button--loading) {
    background-color: var(--bd-button-primary-bg-active, var(--bd-color-primary-active, #1d4ed8));
  }

  /* Default / Outline */
  .button--default {
    background-color: var(--bd-button-default-bg, var(--bd-bg-base, #ffffff));
    border-color: var(--bd-button-default-border, var(--bd-border-base, #d4d4d4));
    color: var(--bd-button-default-text, var(--bd-text-primary, #171717));
  }
  .button--default:hover:not(:disabled):not(.button--loading) {
    border-color: var(--bd-color-primary-hover, #2563eb);
    color: var(--bd-color-primary-hover, #2563eb);
  }
  .button--default:active:not(:disabled):not(.button--loading) {
    border-color: var(--bd-color-primary-active, #1d4ed8);
    color: var(--bd-color-primary-active, #1d4ed8);
  }

  /* Text */
  .button--text {
    background-color: transparent;
    border-color: transparent;
    color: var(--bd-button-text-color, var(--bd-text-primary, #171717));
  }
  .button--text:hover:not(:disabled):not(.button--loading) {
    background-color: var(--bd-button-text-bg-hover, var(--bd-bg-muted, #f5f5f5));
  }
  .button--text:active:not(:disabled):not(.button--loading) {
    background-color: var(--bd-button-text-bg-active, var(--bd-border-base, #e5e5e5));
  }

  /* Danger */
  .button--danger {
    background-color: var(--bd-button-danger-bg, var(--bd-color-error, #ef4444));
    color: var(--bd-button-danger-text, var(--bd-color-on-error, #ffffff));
  }
  .button--danger:hover:not(:disabled):not(.button--loading) {
    background-color: var(--bd-button-danger-bg-hover, var(--bd-color-error-hover, #dc2626));
  }
  .button--danger:active:not(:disabled):not(.button--loading) {
    background-color: var(--bd-button-danger-bg-active, var(--bd-color-error-active, #b91c1c));
  }

  /* --- 内部包裹层 --- */
  .prefix, 
  .suffix, 
  .label {
    display: inline-flex;
    align-items: center;
  }

  /* 限制 svg 等图标的默认尺寸，使其与文字比例更协调 */
  ::slotted(svg),
  .spinner svg {
    width: 1.2em;
    height: 1.2em;
    fill: currentColor;
    flex-shrink: 0; /* 防止在 flex 容器中被意外压缩变形 */
  }

  /* --- Loading Spinner --- */
  .spinner {
    display: inline-flex;
    align-items: center;
    animation: spin 1s linear infinite;
  }
  
  .default-spinner {
    width: 1em;
    height: 1em;
  }

  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
`;