import { LitElement, PropertyValues, html } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { live } from "lit/directives/live.js";
import { HasSlotController } from "../../internal/controllers/hasSlotController";
import { checkboxStyles } from "./checkbox.styles";

let checkboxId = 0;

@customElement("bd-checkbox")
export class Checkbox extends LitElement {
  static styles = checkboxStyles;
  static formAssociated = true;
  static shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };

  @property({ type: Boolean, reflect: true }) checked = false;
  @property({ type: Boolean, reflect: true }) indeterminate = false;
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean }) required = false;
  @property({ type: String }) name = "";
  @property({ type: String }) value = "on";
  @property({ type: Boolean, reflect: true }) invalid = false;

  @state() private _formDisabled = false;
  @state() private _nativeInvalid = false;

  @query('input[type="checkbox"]') private _inputEl!: HTMLInputElement;

  private readonly _internals: ElementInternals;
  private readonly _hasSlotController = new HasSlotController(this, "[default]", "description", "error-text");
  private readonly _descriptionId = `bd-checkbox-description-${++checkboxId}`;
  private readonly _errorTextId = `bd-checkbox-error-text-${checkboxId}`;

  constructor() {
    super();
    this._internals = this.attachInternals();
  }

  protected firstUpdated() {
    this._applyInputState();
    this._syncFormValue();
    this._syncValidity();
  }

  protected updated(changedProperties: PropertyValues<this>) {
    if (changedProperties.has("checked") || changedProperties.has("indeterminate")) {
      this._applyInputState();
    }

    if (changedProperties.has("checked") || changedProperties.has("value")) {
      this._syncFormValue();
    }

    if (
      changedProperties.has("checked") ||
      changedProperties.has("required") ||
      changedProperties.has("invalid")
    ) {
      this._syncValidity();
    }
  }

  formResetCallback() {
    this.checked = this.hasAttribute("checked");
    this.indeterminate = this.hasAttribute("indeterminate");
    this.requestUpdate();
  }

  formStateRestoreCallback(state: string | File | FormData | null) {
    if (typeof state === "string") {
      this.checked = true;
      this.value = state;
    } else {
      this.checked = false;
    }
    this.indeterminate = false;
    this.requestUpdate();
  }

  formDisabledCallback(disabled: boolean) {
    this._formDisabled = disabled;
  }

  checkValidity() {
    this._syncValidity();
    return this._internals.checkValidity();
  }

  reportValidity() {
    this._syncValidity();
    return this._internals.reportValidity();
  }

  focus(options?: FocusOptions) {
    this._inputEl?.focus(options);
  }

  blur() {
    this._inputEl?.blur();
  }

  private _applyInputState() {
    if (!this._inputEl) {
      return;
    }

    this._inputEl.checked = this.checked;
    this._inputEl.indeterminate = this.indeterminate;
  }

  private _syncFormValue() {
    const formValue = this.checked ? this.value : null;
    this._internals.setFormValue(formValue, formValue);
  }

  private _syncValidity() {
    const isValueMissing = this.required && !this.checked;
    if (isValueMissing) {
      this._internals.setValidity({ valueMissing: true }, "请选择此项", this._inputEl ?? undefined);
    } else {
      this._internals.setValidity({});
    }

    this._nativeInvalid = !this._internals.validity.valid;
    this._internals.ariaInvalid = this.invalid || this._nativeInvalid ? "true" : "false";
  }

  private _emitStateEvent(name: "bd-input" | "bd-change") {
    this.dispatchEvent(
      new CustomEvent(name, {
        bubbles: true,
        composed: true,
        detail: {
          checked: this.checked,
          indeterminate: this.indeterminate,
          value: this.value,
        },
      })
    );
  }

  private _handleInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.checked = target.checked;
    this.indeterminate = target.indeterminate;

    if (this.indeterminate) {
      this.checked = true;
      this.indeterminate = false;
      target.checked = true;
      target.indeterminate = false;
    }

    this._syncFormValue();
    this._syncValidity();
    this._emitStateEvent("bd-input");
  }

  private _handleChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.checked = target.checked;
    this.indeterminate = target.indeterminate;

    if (this.indeterminate) {
      this.checked = true;
      this.indeterminate = false;
      target.checked = true;
      target.indeterminate = false;
    }

    this._syncFormValue();
    this._syncValidity();
    this._emitStateEvent("bd-change");
  }

  render() {
    const hasLabel = this._hasSlotController.test("[default]");
    const hasDescription = this._hasSlotController.test("description");
    const hasErrorText = this._hasSlotController.test("error-text");
    const isInvalid = this.invalid || this._nativeInvalid;
    const showErrorText = isInvalid && hasErrorText;
    const isDisabled = this.disabled || this._formDisabled;
    const describedBy = [hasDescription ? this._descriptionId : "", showErrorText ? this._errorTextId : ""]
      .filter(Boolean)
      .join(" ");

    const baseClass = {
      base: true,
      "base--disabled": isDisabled,
      "base--checked": this.checked,
      "base--indeterminate": this.indeterminate,
      "base--invalid": isInvalid,
      "base--has-label": hasLabel,
    };

    return html`
      <label class=${classMap(baseClass)} part="base">
        <span class="control" part="control">
          <input
            class="input"
            type="checkbox"
            .checked=${live(this.checked)}
            .indeterminate=${this.indeterminate}
            ?disabled=${isDisabled}
            ?required=${this.required}
            name=${ifDefined(this.name || undefined)}
            value=${this.value}
            aria-describedby=${ifDefined(describedBy || undefined)}
            aria-label=${ifDefined(this.getAttribute("aria-label") || undefined)}
            aria-labelledby=${ifDefined(this.getAttribute("aria-labelledby") || undefined)}
            @input=${this._handleInput}
            @change=${this._handleChange}
          />
          <span class="icon" part="icon" aria-hidden="true">
            <svg class="icon-check" viewBox="0 0 16 16">
              <path d="M13.2 4.4L6.6 11L2.8 7.2" />
            </svg>
            <svg class="icon-indeterminate" viewBox="0 0 16 16">
              <path d="M3.2 8h9.6" />
            </svg>
          </span>
        </span>
        ${hasLabel ? html`<span class="label" part="label"><slot></slot></span>` : ""}
      </label>
      ${hasDescription
        ? html`<div id=${this._descriptionId} class="description" part="description"><slot name="description"></slot></div>`
        : ""}
      ${showErrorText
        ? html`<div id=${this._errorTextId} class="error-text" part="error-text" role="alert"><slot name="error-text"></slot></div>`
        : ""}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "bd-checkbox": Checkbox;
  }
}
