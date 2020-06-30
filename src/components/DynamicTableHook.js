import React, { useState, useEffect } from 'react';
import { Table, Button,  Modal, Row, Col } from 'antd';
import Api from '../api/Api';
import ActionsDynamicTableModal from './ActionsDynamicTableModal';
import { EditOutlined } from "@ant-design/icons";

const tokenInfo = JSON.parse(localStorage.getItem('token'))
const configRequest = {
    headers: { Authorization: `${tokenInfo}` }
}

const DynamicTableHook = ({
    data,
    columns,
    customStyle,
    ...restProps
}) => {
    const [dataSource, setDataSource] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [tableColumns, setTableColumns] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [roles, setRoles] = useState([]);
    const [recordToEdit, setRecordToEdit] = useState(null);

    
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
                let rolesFromAPI = await Api.getRoles(configRequest);
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
            console.log(keyToDelete)

            if (keyToDelete !== -1) {
                itemToDelete = newData.find(data => data.key == item2);
                console.log(itemToDelete)
                newData.splice(keyToDelete, 1)

            }
        })
        setDataSource([...newData])
        await Api.removeUser(itemToDelete._id, configRequest)
        setSelectedRowKeys([])
    };

    const handleSave = async (record) => {
        let requestBody = {_id: record._id ? record._id : '', name: record.name, surname: record.surname,
        email: record.email, password: record.password ? record.password : '123456', role: roles.find(role=>role.name.includes(record.role)),
        tickets: record.tickets ? record.tickets : [], comments: record.comments ? record.comments : []}
        
        let newRecord = {key: record.key, name: record.name, surname: record.surname, email: record.email,
        role: record.role, privileges: record.itemPrivileges, _id: record._id, password: record.password,
        tickets: record.tickets, comments: record.comments}

        const newData = dataSource;
        if(recordToEdit){
            const index = newData.findIndex(item => newRecord.key === item.key);
            const item = newData[index];
            newData.splice(index, 1, { ...item, ...newRecord }); 
            await Api.updateUser(requestBody, configRequest)   
        }
        else{
            newData.push(newRecord)
            await Api.addUser(requestBody, configRequest)
        }
        
        setModalVisible(false);
        setDataSource(newData);
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
            </Modal>
            }
        </div>
    );
}

export default DynamicTableHook;