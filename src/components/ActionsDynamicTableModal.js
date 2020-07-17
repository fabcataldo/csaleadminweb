import React, { useState, useEffect } from 'react';
import { Button, Input, Form, Select, Row,Col } from 'antd';
import Api from '../api/Api';

const { Option } = Select;

const ActionsDynamicTableModal = (
    props,
) => {
    let data = props.data
    let onChange = props.onChange
    let handleCancel = props.onCancel
    const [dataSource, setDataSource] = useState(null);
    const [roles, setRoles] = useState([]);
    const [role, setRole] = useState(null);
    const tokenInfo = JSON.parse(localStorage.getItem('token'))
    const configRequest = {
        headers: { Authorization: `${tokenInfo}` }
    }

    useEffect(() => {
        if (data) {
            setDataSource(data)
        }
    }, data)

    
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
    
    const renderFormItems = () => {
        
        return (
            <div>
                <Form.Item 
                    className="actionsDynamicTableStyleForm"
                    label="Nombre"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Nombre requerido.',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Apellido"
                    className="actionsDynamicTableStyleForm"
                    name="surname"
                    rules={[
                        {
                            required: true,
                            message: 'Apellido requerido.',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Email"
                    className="actionsDynamicTableStyleForm"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Email requerido.',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Rol"
                    className="actionsDynamicTableStyleForm"
                    name="role"
                    rules={[
                        {
                            required: true,
                            message: 'Rol requerido!',
                        },
                    ]}
                >
                    <Select style={{ width: 120 }}>
                        {
                            roles.map((item, index)=>{
                                return <Option key={index} value={item.name}>{item.name}</Option>
                            })
                        } 
                    </Select>
                </Form.Item>
            </div>
        )
    }
    
    const createEditingData = (values)=>{
        let formToSave = data;
        formToSave.name = values.name;
        formToSave.surname = values.surname;
        formToSave.role = values.role;
        formToSave.email = values.email;
        return formToSave;
    }

    const onFinish = (values) =>{
        let formToSave = values;
        if(data){
            formToSave = createEditingData(values);
        }
        
        let itemPrivileges= '';
        let roleFromForm = roles.find(role => role.name.includes(values.role));
        if (roleFromForm) {
            roleFromForm.privileges.forEach((privilege) => {
                itemPrivileges += privilege.description + ', '
            })
        }
        console.log(itemPrivileges)
        formToSave.privileges = itemPrivileges
        onChange(formToSave);
    }

    return (

        <div>
            <Form
                onFinish={onFinish}
                initialValues={{
                    name: data ? data.name : '',
                    surname: data ? data.surname : '',
                    email: data ? data.email : '',
                    role: data ? data.role: ''
                  }}
            >
                {renderFormItems()}
                        <Row>
                        <Col span={15} push={15}>
                        <Form.Item>
                            <Button type="default" onClick={(e)=>handleCancel()} >Cancelar</Button>
                        </Form.Item>
                        </Col>
                        <Col span={8} push={5}>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" >Guardar</Button>
                        </Form.Item>
                        </Col>
                        </Row>
            </Form>
            
        </div>
    );

}

export default ActionsDynamicTableModal;