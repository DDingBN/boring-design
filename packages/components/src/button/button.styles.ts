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
    font-size: 1rem;
    line-height: 1.5;
    border: 1px solid transparent;
    border-radius: var(--bd-button-radius, var(--bd-radius-md));
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    /* Flex 布局保证图标和文字对齐 */
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: var(--bd-space-2) var(--bd-space-4);
  }

  /* 禁用状态 */
  .button:disabled,
  .button[aria-disabled="true"] {
    cursor: not-allowed;
    opacity: 0.6;
  }

  /* --- 变体 (Variants) --- */

  /* Primary */
  .button--primary {
    background-color: var(--bd-button-primary-bg, var(--bd-color-primary));
    color: var(--bd-button-primary-text, var(--bd-color-on-primary));
  }
  .button--primary:hover:not(:disabled) {
    background-color: var(--bd-button-primary-bg-hover, var(--bd-color-primary-hover));
  }

  /* Default / Outline */
  .button--default {
    background-color: transparent;
    border-color: var(--bd-button-default-border, var(--bd-border-base));
    color: var(--bd-button-default-text, var(--bd-text-primary));
  }
  .button--default:hover:not(:disabled) {
    border-color: var(--bd-color-primary);
    color: var(--bd-color-primary);
  }
`;
