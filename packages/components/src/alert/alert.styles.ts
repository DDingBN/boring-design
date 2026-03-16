import { css } from "lit";

export const alertStyles = css`
  :host {
    display: block;
  }
  .alert {
    display: flex;
    gap: 8px;
    align-items: flex-start;
    border: 1px solid transparent;
    border-radius: var(--comp-alert-radius, 6px);
    padding: 10px 12px;
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
  }
  .alert--info.alert--soft {
    background: var(--comp-alert-bg-info-soft, #eaf3ff);
    color: var(--comp-alert-text-info-soft, #1d4ed8);
    border-color: var(--comp-alert-border-info-soft, #bfdbfe);
  }
  .alert--success.alert--soft {
    background: var(--comp-alert-bg-success-soft, #ecfdf3);
    color: var(--comp-alert-text-success-soft, #047857);
    border-color: var(--comp-alert-border-success-soft, #a7f3d0);
  }
  .alert--warning.alert--soft {
    background: var(--comp-alert-bg-warning-soft, #fffbeb);
    color: var(--comp-alert-text-warning-soft, #b45309);
    border-color: var(--comp-alert-border-warning-soft, #fde68a);
  }
  .alert--error.alert--soft {
    background: var(--comp-alert-bg-error-soft, #fef2f2);
    color: var(--comp-alert-text-error-soft, #b91c1c);
    border-color: var(--comp-alert-border-error-soft, #fecaca);
  }
`;
