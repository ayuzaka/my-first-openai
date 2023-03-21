import { Form } from "./Form";
import styles from "./page.module.css";

const title = "Chat Completion";

export const metadata = {
  title,
};

export default function Page() {
  return (
    <div className={styles.page}>
      <h1>{title}</h1>
      <Form />
    </div>
  );
}
