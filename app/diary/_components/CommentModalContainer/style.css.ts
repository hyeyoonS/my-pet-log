import { keyframes, style } from "@vanilla-extract/css";
import { Z_INDEX } from "@/styles/zindex.css";

const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

export const slideUp = keyframes({
  "0%": { transform: "translateX(-50%) translateY(100%)" },
  "100%": { transform: "translateX(-50%) translateY(0)" },
});

export const overlay = style({
  animation: `${fadeIn} 0.2s ease-out forwards`,
  width: "100%",
  height: "100%",

  position: "fixed",
  top: "0",
  left: "0",

  backgroundColor: "rgba(0, 0, 0, 0.5)",
  touchAction: "none",
  overflow: "hidden",
  zIndex: Z_INDEX.Modal,
});

export const container = style({
  width: "100%",
  height: "90%",

  borderTopLeftRadius: "20px",
  borderTopRightRadius: "20px",

  backgroundColor: "var(--White)",

  position: "fixed",
  left: "50%",
  bottom: "0",
  overflowY: "auto",
});

export const commentTitle = style({
  fontSize: "1.6rem",
  fontWeight: "500",
});

export const header = style({
  padding: "1.8rem",

  display: "flex",
  justifyContent: "space-between",

  position: "sticky",
  top: "0",

  backgroundColor: "var(--White)",
  borderBottom: "1px solid var(--GrayE8)",
  zIndex: Z_INDEX.CommentModalContainer_header,
});
