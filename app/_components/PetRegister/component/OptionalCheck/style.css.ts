import { style } from "@vanilla-extract/css";

export const container = style({
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
});

export const itemWrapper = style({
  cursor: "pointer",
});

export const checked = style({
  fontSize: "1.4rem",
  fontWeight: "500",
  color: "var(--Gray81)",
});

export const active = style({
  color: "var(--MainOrange)",
});
