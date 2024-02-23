import { style } from "@vanilla-extract/css";

export const search = style({
  width: "100%",
  height: "4rem",

  borderRadius: "20px",
  border: "none",
  background: "var(--GrayE8)",

  padding: "0.8rem 8rem 0.8rem 1.4rem",
});

export const deleteIcon = style({
  width: "2rem",
  height: "2rem",

  color: "var(--Gray9f)",
});

export const searchIcon = style({
  display: "flex",
  gap: "1rem",
  position: "absolute",

  right: 0,
  top: "50%",
  transform: "translate(-50%,-50%)",
});

export const searchIntroWrapper = style({
  display: "flex",
  flexDirection: "row",
  gap: "2rem",

  flexWrap: "wrap",

  fontSize: "1.3rem",
});

export const recommendKey = style({
  padding: "0.8rem 1.1rem",

  borderRadius: "12px",
  border: "1px solid var(--GrayE8)",

  cursor: "pointer",
});
