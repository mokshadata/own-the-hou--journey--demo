export default function BookDecisionOption({
  name,
  label,
  detail,
  option,
  modelValue,
  icon,
  optionType,
  setValue,
}) {
  const checked = () => (
      (optionType === 'radio' && modelValue() === option) ||
      (optionType === 'checkbox' && modelValue().includes(option)) ||
      false
  )

  const handleChange = (changeEvent) => {
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

  return (
    <div class="book--decision--option">
      <input type={optionType} id={option} value={option} name={name} checked={checked()} onChange={handleChange}/>
      <label class="book--decision--option--input" for={option}>
        <div class="book--decision--option--icon">{icon}</div>
        <div class="book--decision--option--label">
          <p><strong>{label}</strong></p>
          <p>{detail}</p>
        </div>
      </label>
    </div>
  );
}
