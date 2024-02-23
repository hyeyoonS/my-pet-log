import { style } from "@vanilla-extract/css";

export const container = style({
  width: "100%",

  display: "flex",
  flexDirection: "column",
  alignItems: "center",

  position: "relative",
});

export const bg = style({
  width: "100%",
  height: "auto",

  marginTop: "7.6rem",
});

export const header = style({
  width: "100%",
  height: "5.6rem",

  position: "fixed",
  marginTop: "-5.6rem",
  padding: "1.55rem 1.6rem",

  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  backgroundColor: "var(--White)",
});

export const backIcon = style({
  position: "absolute",
  top: "50%",
  left: "1.6rem",
  transform: "translateY(-50%)",

  cursor: "pointer",
});

export const backHomeWrapper = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",

  position: "absolute",
  top: "13.5rem",
  gap: "2rem",
});

export const backHomeText = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",

  fontSize: "2rem",
  fontWeight: "600",
  lineHeight: "2.8rem",
});

export const homeButton = style({
  width: "21.1rem",
  height: "4.5rem",

  borderRadius: "30px",
  background: "var(--MainOrange)",

  fontSize: "1.6rem",
  fontWeight: "600",
  color: "var(--White)",
});

export const titleWrapper = style({
  display: "flex",
  justifyContent: "space-between",
});
