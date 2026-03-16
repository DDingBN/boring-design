export type AlertVariant = "info" | "success" | "warning" | "error";
export type AlertTone = "solid" | "soft" | "outline";

export interface AlertCloseDetail {
  reason: "close-button" | "api";
}
