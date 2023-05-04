import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { UserList } from '../../model/userlist'
import { useNavigate } from 'react-router-dom'
import { RootState } from '../../app/store'
import { addData, updatedUser, userDataTable } from '../../Services/ApiService'
import { ReactComponent as CloseIcon } from '../icons/closeIcon.svg'
import { inisiData } from '../../features/userDataSlice'
import './RegFrom.css'
import { Input, Button, Form, Select, Radio, Checkbox, Tooltip } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { message } from 'antd'
import { useTranslation } from 'react-i18next'

interface IRegFrom {
    frmValues: UserList,
    isChecked: UserList | any,
    IsUpdate: boolean,
    frmNameShow: string,
    searchTearm: string,
    initialValues: UserList,
    setfrmModalShow: React.Dispatch<React.SetStateAction<boolean>>,
    setfrmValues: React.Dispatch<React.SetStateAction<UserList>>,
}
export const RegFrom = (props: IRegFrom) => {
    const { setfrmModalShow, frmNameShow, setfrmValues, initialValues, IsUpdate, searchTearm, frmValues, isChecked } = props
    const usersall = useSelector((state: RootState) => state.userdata.users);
    const currentPage = useSelector((state: RootState) => state.userdata.currentPage);
    const setperpage = useSelector((state: RootState) => state.userdata.setPerPage);
    const dispatch = useDispatch()
    const modalRef = useRef(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const { t } = useTranslation()

    const handalAddData = (values: any) => {
        console.log(values);
        if (IsUpdate) {
            const { id } = isChecked
            let user = ({ ...values, id: id })
            dispatch(updatedUser({ id, user }))
            message.success('Edit Successfully')
            setTimeout(() => {
                dispatch(userDataTable({ currentPage, setperpage, searchTearm, }))
                setfrmModalShow(false)
            }, 2000)

            uncheckbox()
        } else {
            let uid = uniqueId()
            let formData = ({ ...values, id: uid })
            dispatch(addData({ formData }))
            message.success('Add Successfully')
            setTimeout(() => {
                dispatch(userDataTable({ currentPage, setperpage, searchTearm }))
                setfrmModalShow(false)
            }, 2000)
            usenavigete('')
        }
    }
    const uniqueId = (length = 2) => {
        return parseInt(Math.ceil(Math.random() * Date.now()).toPrecision(length).toString().replace(".", ""))
    }

    const usenavigete = useNavigate()

    const handlefrmclose = (e: any) => {
        if (e.target === modalRef.current) {
            uncheckbox()
            setfrmModalShow(false)
        }
        if (e.key === 'Escape') {
            uncheckbox()
            setfrmModalShow(false)
        }
    }
    const uncheckbox = () => {
        let unchecked = usersall.data.map((x: any) => {
            if (x.isSelected === true) {
                x = { ...x, isSelected: false }
            }
            return x
        })
        dispatch(inisiData({ data: unchecked, total: usersall.total }))
        setfrmModalShow(false)
        setfrmValues({ ...initialValues })
        usenavigete('')
    }

    useEffect(() => {
        inputRef.current?.focus()
        document.addEventListener('keyup', handlefrmclose)
        document.removeEventListener('keyup', handlefrmclose)
    }, [])






    const [form] = useForm()
    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
        handalAddData(values)
    };
    const mobileRegex = /^(?:\+\d{1,3}[- ]?)?\d{10}$/;
    const { Option } = Select;
    return (
        <>
            <div className="frm_modal" ref={modalRef} onClick={handlefrmclose} >
                <div className="frm_wrap">

                    <div className="FCloseDiv">
                        <Tooltip title="Close">
                            <Button onClick={uncheckbox} className='Fclose'>
                                <CloseIcon />
                            </Button>
                        </Tooltip>
                    </div>

                    <h1>{frmNameShow}</h1>

                    <Form labelCol={{ span: 5 }}
                        wrapperCol={{ span: 19 }}
                        layout="horizontal" form={form} onFinish={onFinish} initialValues={frmValues}>
                        <Form.Item style={{ height: "0px" }}>
                            <Input
                                name='id'
                                type='hidden'
                            />
                        </Form.Item>
                        {/* ==UName== */}
                        <Form.Item
                            label={t('Name')}
                            name="uname"
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your name!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>


                        {/* ==UAddress== */}
                        <Form.Item
                            name="uaddress"
                            label={t('Address')}
                            hasFeedback
                            rules={[{ required: true, message: 'Please input address' }]}
                        >
                            <Input.TextArea showCount maxLength={100} />
                        </Form.Item>


                        {/* ==Mobile== */}
                        <Form.Item
                            label={t('Mobile')}
                            name="umobile"
                            hasFeedback
                            rules={[
                                { required: true, message: 'Please enter your mobile number!' },
                                { pattern: /^\d{10}$/, message: 'Mobile number must be 10 digits!' }
                            ]}
                        >
                            <Input />
                        </Form.Item>


                        {/* ==Email== */}
                        <Form.Item
                            label={t('Email')}
                            name="uemail"
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your email!',
                                },
                                {
                                    type: 'email',
                                    message: 'Invalid email!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>


                        {/* ==gender== */}
                        <Form.Item
                            label={t('Gender')}
                            hasFeedback
                            name="ugender"
                            rules={[{ required: true, message: 'Please select your gender' }]}
                        >
                            <Radio.Group
                                name="ugender"
                            >
                                <Radio.Button value="male">{t('Male')}</Radio.Button>
                                <Radio.Button value="female">{t('Female')}</Radio.Button>
                            </Radio.Group>
                        </Form.Item>


                        {/* ==UCity== */}
                        <Form.Item
                            label={t('City')}
                            name="ucity"
                            hasFeedback
                            rules={[{ required: true, message: 'Please select a city' }]}
                        >
                            <Select
                                placeholder="Please select a city"
                            >
                                <Option value="Rajkot">Rajkot</Option>
                                <Option value="Ahmedabad">Ahmedabad</Option>
                                <Option value="Surat">Surat</Option>
                                <Option value="vapi">vapi</Option>
                                <Option value="jamnagar">jamnagar</Option>
                                <Option value="Baroda">Baroda</Option>
                            </Select>
                        </Form.Item>

                        {/* ==UTerms== */}
                        <Form.Item
                            style={{ marginLeft: "20%" }}
                            name="ucheck"
                            valuePropName="checked"
                            rules={[
                                {
                                    validator: (_, value) => value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                                },
                            ]}
                        >
                            <Checkbox className='Tbox'>i have read and agree to the <a href="">terms</a> and <a href="">conditions</a>.</Checkbox>
                        </Form.Item>


                        {/* ==Submit & Reset Btn== */}
                        <div className="FromBtnDiv">
                            <div className='Fbtn'>
                                {IsUpdate !== true ? <Tooltip title="Submit"> <Button type="primary" htmlType="submit" className='Fbtn'> Submit </Button>  </Tooltip> : <Tooltip title="Save"> <Button type="primary" htmlType="submit" className='Fbtn' style={{ marginLeft: "100px" }}> Save </Button>  </Tooltip>}
                            </div>
                            <div className='Fbtn'>
                                {IsUpdate !== true ? <Tooltip title="Reset">    <Button htmlType="reset" className='Fbtn'>Reset</Button></Tooltip> : false}
                            </div>
                        </div>
                    </Form>

                </div>
            </div>
        </>
    )
}
