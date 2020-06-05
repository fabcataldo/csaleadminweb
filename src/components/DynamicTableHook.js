import React, { useContext, useState, useEffect, useRef } from 'react';
import 'antd/dist/antd.css';
import { Table, Input, Button, InputNumber, Popconfirm, Form } from 'antd';

const EditableContext = React.createContext();

const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};

const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    inputType,
    editing,
    ...restProps
}) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0,
                    }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                    children
                )}
        </td>
    );
};

const DynamicTableHook = ({
    data,
    columns,
    ...restProps
}) => {
    const [dataSource, setDataSource] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [tableColumns, setTableColumns] = useState([]);
    const [components, setComponents] = useState(null);
    const [editingKey, setEditingKey] = useState('');
    const [form] = Form.useForm();

    const isEditing = record => record.key === editingKey;
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
                render: (text, record) => {
                    const editable = isEditing(record);
                    return editable ? (
                        <span>
                            <a
                                href="javascript:;"
                                onClick={() => handleSave(record.key)}
                                style={{
                                    marginRight: 8,
                                }}
                            >
                                Save
                            </a>
                            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                                <a>Cancel</a>
                            </Popconfirm>
                        </span>
                    ) : (
                            <a disabled={editingKey !== ''} onClick={() => edit(record)}>
                                Edit
                            </a>
                        );
                },
            })

            setTableColumns(newColumns);
        }
        console.log(tableColumns)
    }, [columns])

    const cancel = () => {
        setEditingKey('');
    }

    const edit = record => {
        form.setFieldsValue({
            name: '',
            age: '',
            address: '',
            ...record,
        });
        setEditingKey(record.key);
    };

    const handleDelete = () => {
        let newData = dataSource;
        selectedRowKeys.forEach(item2 => {
            let keyToDelete = newData.findIndex(data => data.key == item2);
            if (keyToDelete !== -1) {
                newData.splice(keyToDelete, 1)
            }
        })
        setDataSource([...newData])
        setSelectedRowKeys([])
    };

    const handleAdd = () => {
        const newData = {
            key: parseInt(Math.floor(Math.random() * 10000)),
            name: `Edward King`,
            age: 32,
            address: `London, Park Lane no.`,
        };

        setDataSource([...dataSource, newData])
    };

    const handleSave = row => {
        const newData = dataSource;
        const index = newData.findIndex(item => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        this.setState({
            dataSource: newData,
        });
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

    const mergedColumns = tableColumns.map(col => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: record => ({
                record,
                inputType: col.dataIndex === 'age' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    return (
        <div>
            <Button
                onClick={handleAdd}
                type="primary"
                style={{
                    marginBottom: 16,
                }}
            >
                Añadir
        </Button>
            <Form form={form} component={false}>
                <Table
                    rowSelection={rowSelection}
                    components={{
                        body: {
                            cell: EditableCell,
                        },

                    }}
                    rowClassName={() => 'editable-row'}
                    bordered
                    loading={!dataSource}
                    dataSource={dataSource}
                    columns={mergedColumns}
                    pagination={{
                        onChange: cancel,
                    }}
                />
            </Form>
        </div>
    );
}

export default DynamicTableHook;