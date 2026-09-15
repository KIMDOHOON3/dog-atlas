"use client";
import { useState } from "react";
import styles from "@/app/places/places.module.css";
export default function CopyAddress({ address }: { address: string }) {
  const [message, setMessage] = useState("");
  return (
    <span>
      <button
        type="button"
        className={styles.secondaryAction}
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(address);
            setMessage("주소를 복사했어요.");
          } catch {
            setMessage(
              "복사하지 못했어요. 아래 주소를 길게 눌러 복사해 주세요.",
            );
          }
        }}
      >
        주소 복사
      </button>
      <span role="status" className={styles.copyStatus}>
        {message}
      </span>
    </span>
  );
}
