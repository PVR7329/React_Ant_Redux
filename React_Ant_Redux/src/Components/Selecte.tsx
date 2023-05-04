import { selectField } from '../model/inputState'
import { useTranslation } from 'react-i18next'
const Selecte = (props: selectField) => {
    const { onBlur, onChange, label, name, errors, values, touched, placeholder } = props
    const { t } = useTranslation()
    const cityData = [
        {
            key: `${t('Select')}`,
            value: ""
        },
        {
            key: "Surat",
            value: "surat"
        },
        {
            key: "Ahmedabad",
            value: "ahmedabad"
        },
        {
            key: "Ahmedabad",
            value: "ahmedabad"
        },
        {
            key: "Rajkot",
            value: "rajkot"
        },
        {
            key: "Vapi",
            value: "vapi"
        },
        {
            key: "Jamnagar",
            value: "jamnagar"
        },
        {
            key: "Baroda",
            value: "baroda"
        },
    ]
    return (
        <>
            <div className="frm_control">
                <label htmlFor={name}>{label} <sup>*</sup></label>
                <select className='inputbox' name={name} placeholder={placeholder} value={values} onChange={onChange} onBlur={onBlur}>
                    {cityData.map((opt: any, index: any) =>
                        <option key={index} value={opt.value}>{opt.key}</option>
                    )}
                </select>
                {errors && touched ? (<small>{errors}</small>) : null}
            </div>
        </>
    )
}

export default Selecte