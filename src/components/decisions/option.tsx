// import { children } from "solid-js"

import Diagrams from '../diagrams/'

export default function BookDecisionOption(props) {
  const {
    name,
    label,
    detail,
    option,
    modelValue,
    optionType,
    setValue,
    readOnly,
  } = props

  const checked = () => (
      (optionType === 'radio' && modelValue() === option) ||
      (optionType === 'checkbox' && modelValue().includes(option)) ||
      false
  )

  const handleChange = (changeEvent) => {
    changeEvent.preventDefault()
    if (readOnly) {
      return
    }

    if (optionType === 'radio' && changeEvent.target.checked) {
        setValue(option)
    }

    if (optionType === 'checkbox' && changeEvent.target.checked) {
        setValue([...modelValue(), option])
    }

    if (optionType === 'checkbox' && !changeEvent.target.checked && modelValue().includes(option)) {
        setValue([...modelValue().filter((val) => (val !== option))])
    }
  }

  const Icon = Diagrams[props.icon]
  // const resolvedChildren = children(() => ([<props.icon/>]))
  console.log({ props, Icon })
  return (
    <div class="book--decision--option">
      <input type={optionType} id={option} value={option} name={name} checked={checked()} onChange={handleChange} disabled={readOnly}/>
      <label class="book--decision--option--input" for={option}>
        <div class="book--decision--option--icon"><Icon/></div>
        <div class="book--decision--option--label">
          <p><strong>{label}</strong></p>
          <p>{detail}</p>
        </div>
      </label>
    </div>
  );
}
