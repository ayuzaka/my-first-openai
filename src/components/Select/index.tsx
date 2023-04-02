import type { ComponentPropsWithRef, FC } from "react"

type Props = {
  options: { value: string, text: string }[]
} & ComponentPropsWithRef<'select'>

export const Select: FC<Props> = ({ options, ...props }) => {
  return (
    <select {...props}>
      {options.map((option) => (
        <option value={option.value} key={option.value}>{option.text}</option>
      ))}
    </select>
  )
}
