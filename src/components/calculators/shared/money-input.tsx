import {
  NumberField,
  NumberFieldDecrementTrigger,
  NumberFieldErrorMessage,
  NumberFieldGroup,
  NumberFieldIncrementTrigger,
  NumberFieldInput
} from "~/components/ui/number-field"

export function valAsNum(value) {
  return value.replace(/\D/g,'') * 1
}

export const moneyMask = (value: string, sel: Selection): [string, Selection] => {
  const valAsCurrency = (new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'}).format(valAsNum(`${value}`))).replace(/\.00$/, '')

  return [`${valAsCurrency}`, [value.length + 1, value.length + 1]]
};

export default function MoneyInput({ item, prefix, step }) {
  return (
    <NumberField
      class="flex w-full flex-col gap-2 money--input"
      onRawValueChange={item.setter}
      formatOptions={{ style: "currency", currency: "USD" }}
      rawValue={item.rate()}
      changeOnWheel={true}
      id={`${prefix}--${item.setting.key}`}
      name={`${prefix}--${item.setting.key}`}
      step={step}
    >
      <NumberFieldGroup>
        <NumberFieldInput />
        <NumberFieldIncrementTrigger />
        <NumberFieldDecrementTrigger />
      </NumberFieldGroup>
    </NumberField>
  )

}
