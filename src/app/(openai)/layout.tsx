import type { ReactNode } from "react";
import styles from "./layout.module.css";

export default function Layout({ children }: { children: ReactNode }) {
  return <main className={styles.main}>{children}</main>;
}
