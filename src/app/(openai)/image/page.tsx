import { Form } from "./Form";

const title = "Generate Image";

export const metadata = { title };

export default function Page() {
  return (
    <div>
      <h1>{title}</h1>
      <Form />
    </div>
  );
}
