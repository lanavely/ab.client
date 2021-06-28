import React from 'react'
import DatePicker from "react-datepicker";

export default function DateEditableCell(item) {
    const {
        value: initialValue,
        row: { index },
        column,
        updateMyData,
    } = item
    const [value, setValue] = React.useState(initialValue)

    const onChange = (newValue) => {
        updateMyData(index, column.FieldName, newValue)
    }

    React.useEffect(() => {
        setValue(initialValue)
    }, [initialValue])

    return <DatePicker selected={value} onChange={onChange} />
}
