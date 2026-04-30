import { createInputMask, createMaskPattern } from "@solid-primitives/input-mask";

export function valAsNum(value) {
  return value.replace(/\D/g,'') * 1
}

export const moneyMask = (value: string, sel: Selection): [string, Selection] => {
  const valAsCurrency = (new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'}).format(valAsNum(`${value}`))).replace(/\.00$/, '')

  return [`${valAsCurrency}`, [value.length + 1, value.length + 1]]
};

const moneyInputHandler = createInputMask(moneyMask);

export default function MoneyInput({ item, prefix }) {
  const handleChange = (setter) => {
    return (changeEvent) => {
      return setter(valAsNum(changeEvent.target.value))
    }
  }

  return (<div>
    <label for={`${prefix}--${item.setting.key}`} id={`${prefix}--${item.setting.key}--pattern-view`}></label>
    <input
      id={`${prefix}--${item.setting.key}`}
      name={`${prefix}--${item.setting.key}`}
      type="text"
      placeholder="$"
      value={moneyMask(`${item.rate()}`)[0]}
      onChange={handleChange(item.setter)}
      onInput={createMaskPattern(moneyInputHandler, () => "$")}
    />
  </div>)
}
