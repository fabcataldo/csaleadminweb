import React, { useState, useEffect } from 'react';
import { Table, Button,  Modal, Row, Col } from 'antd';
import Api from '../api/Api';
import ActionsDynamicTableModal from './ActionsDynamicTableModal';
import LoadingComponent from '../components/LoadingComponent';
import { EditOutlined } from "@ant-design/icons";


const DynamicTableHook = ({
    data,
    columns,
    customStyle,
    ...restProps
}) => {
    const tokenInfo = JSON.parse(localStorage.getItem('token'))
    const configRequest = {
        headers: { Authorization: `${tokenInfo}` }
    }
    const [dataSource, setDataSource] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [tableColumns, setTableColumns] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [roles, setRoles] = useState([]);
    const [recordToEdit, setRecordToEdit] = useState(null);
    const [showLoading, setShowLoading] = useState(false);

    
   
    
    useEffect(() => {
        if (data) {
            setDataSource(data);
        }
    }, [data])

    useEffect(() => {
        if (columns) {
            let newColumns = columns
            newColumns.push({
                title: 'Acciones',
                dataIndex: 'operations',
                render: (_, record) => {
                    return (
                        <div style={{textAlign:'center'}}>
                            <a onClick={() => edit(record)}>
                                <EditOutlined />
                            </a>
                        </div>
                    )
                },
                fixed: 'right'
            })
            setTableColumns(newColumns);
        }
    }, [])

    useEffect(()=>{
        const getRoles = async ()=>{
            try{
                setShowLoading(true);
                let rolesFromAPI = await Api.getRoles(configRequest);
                setShowLoading(false);
                setRoles(rolesFromAPI)    
            }catch(err){
                console.log(err);
            }
        }
        getRoles();
    },[])


    const edit = (record) => {
        setRecordToEdit(record);
        setModalVisible(true);
    }

    const handleCancel = ()=>{
        setModalVisible(false);
        setRecordToEdit(null);
    }

    const handleDelete = async () => {
        let newData = dataSource;
        let itemToDelete = {};
        console.log(newData)
        selectedRowKeys.forEach(item2 => {
            let keyToDelete = newData.findIndex(data => data.key == item2);
            if (keyToDelete !== -1) {
                itemToDelete = newData.find(data => data.key == item2);
                console.log(itemToDelete)
                newData.splice(keyToDelete, 1)
            }
        })
        setDataSource([...newData])
        setShowLoading(true);
        await Api.removeUser(itemToDelete._id, configRequest)
        setShowLoading(false);
        setSelectedRowKeys([])
    };

    const handleSave = async (record) => {
        let requestBody = {_id: record._id ? record._id : '', name: record.name, surname: record.surname,
        email: record.email, password: record.password ? record.password : '123456', role: roles.find(role=>role.name.includes(record.role)),
        tickets: record.tickets ? record.tickets : [], comments: record.comments ? record.comments : [], loggedWithOAuth2: record.loggedWithOAuth2 ? record.loggedWithOAuth2 : false}
        
        let newRecord = {key: record.key ? record.key : (parseInt(dataSource[dataSource.length-1].key)+1).toString(), name: record.name, surname: record.surname, email: record.email,
        role: record.role, privileges: record.privileges, _id: record._id, password: record.password ? record.password : '123456',
        tickets: record.tickets ? record.tickets : [], comments: record.comments ? record.comments : [], loggedWithOAuth2: record.loggedWithOAuth2 ? record.loggedWithOAuth2 : false}

        const newData = dataSource;
        if(recordToEdit){
            const index = newData.findIndex(item => newRecord.key === item.key);
            const item = newData[index];
            newData.splice(index, 1, { ...item, ...newRecord }); 
            setShowLoading(true);
            await Api.updateUser(requestBody, configRequest);
            setShowLoading(false);

            setRecordToEdit(null);
            setDataSource(newData);
        }
        else{
            setShowLoading(true);
            const response = await Api.addUser(requestBody, configRequest);
            setShowLoading(false);
            newRecord._id = response.user._id;
            newRecord.password = response.user.password;
            newData.push(newRecord)
            setDataSource([...newData]);
        }

        setModalVisible(false);
    };

    const onRowSelectionChange = (selectedRowKeys) => {
        setSelectedRowKeys(selectedRowKeys)
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onRowSelectionChange,
        selections: [
            Table.SELECTION_ALL,
            Table.SELECTION_INVERT,
            {
                key: 'deleteAll',
                text: 'Borrar seleccionaados',
                onSelect: () => handleDelete()
            },
        ]
    };


    return (
        
        <div>
            <Row>
                <Col span={2}>
                    <Button
                        onClick={()=>{setModalVisible(true)}}
                        type="primary"
                        style={{
                            marginBottom: 16,
                        }}
                    >
                        Añadir
                    </Button>                
                </Col>
            </Row>

            <Table
                rowSelection={rowSelection}
                rowClassName={() => 'editable-row'}
                bordered
                loading={!dataSource}
                dataSource={dataSource}
                columns={tableColumns}
                className={customStyle ? customStyle : ''}
                pagination = {{
                    pageSize: 6
                }}
            />
 
            {modalVisible && 
            <Modal
            title={"Nuevo usuario"}
            visible={modalVisible}
            onOk={handleSave}
            onCancel={handleCancel}
            footer={null}
            >
                <ActionsDynamicTableModal
                    data={recordToEdit}
                    onChange={handleSave}
                    onCancel={handleCancel}
                >
                </ActionsDynamicTableModal>

                {
                showLoading ?
                <div>
                    <LoadingComponent delay={2000}></LoadingComponent>
                </div>
            :<div></div>}

            </Modal>
            }

            
        </div>
    );
}

export default DynamicTableHook;