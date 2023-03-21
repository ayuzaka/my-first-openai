import type { ComponentPropsWithRef, FC } from "react";
import styles from "./index.module.css";

type Props = ComponentPropsWithRef<"button">;

export const Button: FC<Props> = (props) => {
  return <button type="button" {...props} className={styles.button} />;
};
