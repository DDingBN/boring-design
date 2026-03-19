import { css } from "lit";

export const alertStyles = css`
  :host {
    display: block;
  }
  .alert {
    display: flex;
    gap: var(--bd-space-2);
    align-items: flex-start;
    border: 1px solid transparent;
    border-radius: var(--bd-alert-radius, var(--bd-radius-md));
    padding: var(--bd-space-3);
    font-size: 14px;
    line-height: 1.5;
  }
  .content {
    flex: 1;
    min-width: 0;
  }
  .title {
    font-weight: 600;
    margin-bottom: 2px;
  }
  .close {
    appearance: none;
    border: none;
    background: transparent;
    cursor: pointer;
    line-height: 1;
    padding: 2px;
    color: inherit;
    border-radius: var(--bd-radius-sm);
    transition: all 0.2s ease-in-out;
    
    /* 预设 outline 颜色以避免 focus 时产生黑色渐变闪烁 */
    outline: 0px solid var(--bd-focus-ring-color, rgba(59, 130, 246, 0.4));
    outline-offset: var(--bd-focus-ring-offset, 0px);
  }
  .close:hover {
    opacity: var(--bd-opacity-hover, 0.8);
    background: rgba(0, 0, 0, 0.05);
  }
  .close:active {
    opacity: var(--bd-opacity-active, 0.6);
    transform: scale(0.95);
  }
  .close:focus-visible {
    outline-width: var(--bd-focus-ring-width, 3px);
    transition: outline-width 0.1s ease-out, opacity 0.2s, background-color 0.2s, transform 0.2s;
  }
  .alert--info.alert--soft {
    background: var(--bd-alert-info-bg, var(--bd-color-info-bg));
    color: var(--bd-alert-info-text, var(--bd-color-info-text));
    border-color: var(--bd-alert-info-border, var(--bd-color-info-border));
  }
  .alert--success.alert--soft {
    background: var(--bd-alert-success-bg, var(--bd-color-success-bg));
    color: var(--bd-alert-success-text, var(--bd-color-success-text));
    border-color: var(--bd-alert-success-border, var(--bd-color-success-border));
  }
  .alert--warning.alert--soft {
    background: var(--bd-alert-warning-bg, var(--bd-color-warning-bg));
    color: var(--bd-alert-warning-text, var(--bd-color-warning-text));
    border-color: var(--bd-alert-warning-border, var(--bd-color-warning-border));
  }
  .alert--error.alert--soft {
    background: var(--bd-alert-error-bg, var(--bd-color-error-bg));
    color: var(--bd-alert-error-text, var(--bd-color-error-text));
    border-color: var(--bd-alert-error-border, var(--bd-color-error-border));
  }
`;
