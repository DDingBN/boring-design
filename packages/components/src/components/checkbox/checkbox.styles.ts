import { css } from "lit";

export const checkboxStyles = css`
  :host {
    display: inline-flex;
    flex-direction: column;
    align-items: flex-start;
    --_checkbox-control-size: var(--bd-checkbox-size, var(--bd-space-4));
    --_checkbox-label-font-size: var(--bd-text-sm);
  }

  .base {
    display: inline-flex;
    align-items: center;
    color: var(--bd-checkbox-text-color, var(--bd-text-primary));
    cursor: pointer;
    user-select: none;
  }

  .base.base--has-label {
    gap: var(--bd-space-2);
  }

  .base.base--disabled {
    cursor: not-allowed;
    opacity: var(--bd-opacity-disabled);
  }

  .control {
    position: relative;
    display: inline-flex;
    inline-size: var(--_checkbox-control-size);
    block-size: var(--_checkbox-control-size);
    flex: none;
    line-height: 0;
  }

  .input {
    position: absolute;
    inset: 0;
    margin: 0;
    opacity: 0;
    cursor: inherit;
  }

  .icon {
    position: relative;
    display: inline-flex;
    inline-size: 100%;
    block-size: 100%;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    border-radius: var(--bd-checkbox-radius, var(--bd-radius-sm));
    border: 1px solid var(--bd-checkbox-border-color, var(--bd-border-strong));
    background: var(--bd-checkbox-bg, var(--bd-bg-base));
    color: var(--bd-checkbox-icon-color, var(--bd-color-on-primary));
    outline: 0px solid var(--bd-focus-ring-color);
    outline-offset: var(--bd-focus-ring-offset);
    transition: outline-width 0.1s ease-out, border-color 0.2s ease, background-color 0.2s ease, color 0.2s ease;
  }

  .input:focus-visible + .icon {
    outline-width: var(--bd-focus-ring-width);
  }

  .icon-check,
  .icon-indeterminate {
    position: absolute;
    inset: 0;
    margin: auto;
    inline-size: 65%;
    block-size: 65%;
    fill: none;
    stroke: currentColor;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
    opacity: 0;
    pointer-events: none;
  }

  .base--checked .icon,
  .base--indeterminate .icon {
    border-color: var(--bd-checkbox-checked-border-color, var(--bd-color-primary));
    background: var(--bd-checkbox-checked-bg, var(--bd-color-primary));
  }

  .base--checked .icon-check {
    opacity: 1;
  }

  .base--indeterminate .icon-indeterminate {
    opacity: 1;
  }

  .base--invalid .icon {
    border-color: var(--bd-checkbox-invalid-border-color, var(--bd-color-error));
  }

  .label {
    display: inline-flex;
    align-items: center;
    min-block-size: var(--_checkbox-control-size);
    font-size: var(--_checkbox-label-font-size);
    line-height: var(--bd-leading-normal);
    color: var(--bd-checkbox-text-color, var(--bd-text-primary));
  }

  .description,
  .error-text {
    padding-inline-start: calc(var(--_checkbox-control-size) + var(--bd-space-2));
    font-size: var(--bd-text-xs);
    line-height: var(--bd-leading-normal);
  }

  .description {
    margin-top: var(--bd-space-1);
    color: var(--bd-checkbox-description-color, var(--bd-text-secondary));
  }

  .error-text {
    margin-top: var(--bd-space-1);
    color: var(--bd-checkbox-error-text-color, var(--bd-color-error-text));
  }
`;
