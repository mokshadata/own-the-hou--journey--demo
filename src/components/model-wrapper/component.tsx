import {
    valuesByName, settersByName,
} from "../../store/navigation";


export default function ChangeListener({ storeName, children }) {
    function handleChange(formChangeEvent) {
        if (
            formChangeEvent.target.name && !['checkbox', 'radio'].includes(formChangeEvent.target.type)
        ) {
            settersByName(storeName)(formChangeEvent.target.name, formChangeEvent.target.value)
        }
    }
    return (
        <form onChange={handleChange}>{children}</form>
    )
}