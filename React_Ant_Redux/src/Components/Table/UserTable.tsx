import { useEffect, useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../app/store'
import { UserList } from '../../model/userlist'
import { ReactComponent as AddIcon } from '../icons/addUser.svg'
import debounce from 'lodash.debounce'
import { RegFrom } from '../From/RegFrom'
import DarkTheme from '../Theme/DarkTheme'
import { useLocation, useNavigate } from 'react-router-dom'
import { setCurrentPage } from '../../features/userDataSlice'
import { deleteUser, userDataTable } from '../../Services/ApiService'
import './UserTable.css'
import { Input, Modal, Pagination, Select, Table, Tooltip } from 'antd'
import { EditOutlined, DeleteOutlined } from "@ant-design/icons"
import { message } from 'antd'
import type { ColumnsType, TableProps } from 'antd/es/table'
import { Spin } from 'antd';
import { useTranslation } from 'react-i18next'

export const UserTable = () => {
    const { t, i18n } = useTranslation()
    const initialValues = {
        id: '',
        uname: '',
        uaddress: '',
        umobile: '',
        uemail: '',
        ucity: '',
        ugender: '',
        ucheck: false,
    }
    const usersall = useSelector((state: RootState) => state.userdata.users);
    const currentPage = useSelector((state: RootState) => state.userdata.currentPage);
    const setperpage = useSelector((state: RootState) => state.userdata.setPerPage);


    const loading = useSelector((state: RootState) => state.userdata.loading);
    const messageBrows = useSelector((state: RootState) => state.userdata.message);
    const dispatch = useDispatch()
    const [frmValues, setfrmValues] = useState<UserList>(initialValues)


    const [isChecked, setIsChecked] = useState<UserList | any>({})
    const [searchTearm, setSearchTearm] = useState('')
    const [frmModalShow, setfrmModalShow] = useState(false)
    const [IsUpdate, setIsUpdate] = useState(true)
    const [frmNameShow, setFrmNameShow] = useState(`${t('Registration')}`)
    const [selectedId, setSelectedId] = useState('');
    const location = useLocation()
    const navigete = useNavigate()

 


    const handlePageChange = (page: number) => {
        dispatch(userDataTable({ currentPage: page, setperpage: setperpage, searchTearm: "" }));
        dispatch(setCurrentPage(page))
    };

    const handlefromshow = () => {
        setfrmModalShow(true)
    }

    const handleSearch = (e: any) => {
        setSearchTearm(e.target.value)
        dispatch(setCurrentPage(1))
    }

    const debouncedChangeHandler = useCallback(
        debounce(handleSearch, 1000)
        , []);


    useEffect(() => {
        if (location.pathname === '/create' || location.pathname === '/edit') {
            setfrmModalShow(true)
        } else {
            setfrmModalShow(false)
        }
        dispatch(userDataTable({ currentPage, setperpage, searchTearm }))
    }, [currentPage, setperpage, searchTearm])

    if (messageBrows) {
        return (<h3>Something went to wrong. Please try again later.</h3>)
    }

    const { Option } = Select;
    const columns: ColumnsType<UserList> = [
        {
            title: `${t('Id')}`,
            dataIndex: 'id',

            sorter: {
                compare: (a: any, b: any) => a.id - b.id,
            },
        },
        {
            title: 'Name',
            dataIndex: 'uname',
            sorter: (a: any, b: any) => a.uname.localeCompare(b.uname)
        },
        {
            title: 'Address',
            dataIndex: 'uaddress',
            sorter: (a: any, b: any) => a.uaddress.localeCompare(b.uaddress)
        },
        {
            title: 'Mobile',
            dataIndex: 'umobile',
            sorter: (a: any, b: any) => a.umobile - b.umobile
        },
        {
            title: 'Email',
            dataIndex: 'uemail',
            sorter: (a: any, b: any) => a.uemail.localeCompare(b.uemail)
        },
        {
            title: 'City',
            dataIndex: 'ucity',
            sorter: (a: any, b: any) => a.ucity.localeCompare(b.ucity)
        },
        {
            title: 'Gender',
            dataIndex: 'ugender',
            sorter: (a: any, b: any) => a.ugender.localeCompare(b.ugenderFF)
        },
        {
            key: "5",
            title: "Actions",
            render: (values) => {
                return (
                    <>
                        <Tooltip title="Edit">
                            <EditOutlined onClick={() => { handlefromshow(); onEditStudent(values); setFrmNameShow(`${t("Update")}`); navigete(`/edit`) }} />
                        </Tooltip>

                        <Tooltip title="Delete">
                            <DeleteOutlined onClick={() => { onDeleteStudent(values); }} style={{ color: "red", marginLeft: 12 }} />
                        </Tooltip>
                    </>
                );
            },
        },
    ];

    const onChange: TableProps<UserList>['onChange'] = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };


    const onEditStudent = ({ id, uname, uaddress, umobile, uemail, ugender, ucheck, ucity }: any) => {
        let updateval: any = { id, uname, uaddress, umobile, uemail, ugender, ucheck, ucity }
        setIsChecked(updateval)
        console.log(id);
        setfrmValues(updateval)
        setIsUpdate(true)
    };


    const onDeleteStudent = (values: any) => {
        navigete(`/delete`)
        console.log(values);

        Modal.confirm({
            title: `Are you sure you want to delete this
             ${values.uname} record?`,
            okText: "Yes",
            okType: "danger",
            onOk: () => {
                setSelectedId(values.id);
                dispatch(deleteUser(values.id))
                message.success('Delete user Successfully')
                setTimeout(() => {
                    dispatch(userDataTable({ currentPage, setperpage, searchTearm }))
                }, 4000)
                console.log(selectedId);
            },
        });
    };


    console.log(currentPage);

    return (
        <>
            <div className="main_wrap">
                {frmModalShow === true ? <RegFrom frmNameShow={frmNameShow} initialValues={initialValues} setfrmValues={setfrmValues} searchTearm={searchTearm} IsUpdate={IsUpdate} isChecked={isChecked} frmValues={frmValues} setfrmModalShow={setfrmModalShow} /> : false}
                {loading !== true || <Spin style={{ display: "flex", justifyContent: "center", alignItems: "center", zIndex: "108888880" }} size="large" />}

                <div className="ThemDiv">

                    <Select value={i18n.language}>
                        <Option value="en">En</Option>
                        <Option value="gn">Gn</Option>
                    </Select>


                    <DarkTheme />
                </div>

                <div className="tbl_wrap">
                    <div className='tblheading_top'>
                        <h1>Users Details</h1>

                        <div className="search_wrap">
                            <Input onChange={debouncedChangeHandler} placeholder='Search...' className='SearchbarCls' />
                        </div>

                        <div className="adduser">
                            <Tooltip title="Add user">
                                <AddIcon onClick={() => { handlefromshow(); setIsUpdate(false); setFrmNameShow(`${t('Registration')}`); navigete(`/create`) }} />
                            </Tooltip>
                        </div>
                    </div>

                    <div className="tbl_scroll">
                        <div>
                            <Table columns={columns} dataSource={usersall.data} onChange={onChange} className='ant-table' pagination={false} />
                            <Pagination
                                current={currentPage}
                                pageSize={setperpage}
                                total={usersall.total}
                                onChange={handlePageChange}
                                showSizeChanger={false}
                            />

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
