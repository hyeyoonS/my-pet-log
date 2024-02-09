import { useState } from "react";
import * as styles from "./style.css";
import CheckIcon from "@/public/icons/confirm.svg";
import Image from "next/image";

interface OptionalMessageProps {
  message?: string;
  onClearDate: () => void;
}

const OptionalMessage = ({ message, onClearDate }: OptionalMessageProps) => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    onClearDate();
    setIsActive(!isActive);
  };

  return (
    <section className={styles.container} onClick={handleClick}>
      <CheckIcon width={12} height={12} style={{ color: isActive ? "var(--MainOrange)" : "var(--Gray81)" }} />
      <span className={`${styles.checked} ${isActive ? styles.active : ""}`}>{message}</span>
    </section>
  );
};

export default OptionalMessage;