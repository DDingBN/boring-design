import { css } from 'lit';

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
    border-radius: 4px; /* 以后可以用 var(--bd-sys-radius-md) */
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
    /* 这里的变量对应你 Token 系统生成的变量，后面是兜底颜色 */
    background-color: var(--bd-sys-color-primary, #1976d2);
    color: #ffffff;
  }
  .button--primary:hover:not(:disabled) {
    background-color: var(--bd-sys-color-primary-dark, #1565c0);
  }

  /* Default / Outline */
  .button--default {
    background-color: transparent;
    border-color: #ccc;
    color: #333;
  }
  .button--default:hover:not(:disabled) {
    border-color: var(--bd-sys-color-primary, #1976d2);
    color: var(--bd-sys-color-primary, #1976d2);
  }
`;