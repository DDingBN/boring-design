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
    border-radius: var(--comp-button-radius, 6px);
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    /* Flex 布局保证图标和文字对齐 */
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem 1rem;
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
    background-color: var(--comp-button-bg-default, #1976d2);
    color: var(--comp-button-text-primary, #ffffff);
  }
  .button--primary:hover:not(:disabled) {
    background-color: var(--comp-button-bg-hover, #1565c0);
  }

  /* Default / Outline */
  .button--default {
    background-color: transparent;
    border-color: var(--comp-button-border-default, #ccc);
    color: var(--comp-button-text-default, #333);
  }
  .button--default:hover:not(:disabled) {
    border-color: var(--sys-color-primary, #1976d2);
    color: var(--sys-color-primary, #1976d2);
  }
`;
