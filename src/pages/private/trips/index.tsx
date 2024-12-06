import React, { useState } from 'react'
import { Table, Button, Space, Popconfirm, Input, InputNumber, Switch, Spin } from 'antd'
import { TableProps } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { LoadingOutlined } from '@ant-design/icons'
import { DataType } from '@/types/DataType'
import { useQueryTrips } from '@/queries/trip'
import { handlingTsUndefined } from '@/utils/handlingTsUndefined'
import ModalForm, { ModalFormProps } from '@/components/Modal/ModalForm'

const TripPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<DataType | null>(null)

  const { data, isLoading } = useQueryTrips()

  console.log(isLoading)

  // Transform data source to ensure each record has a `key`
  const dataSource = data?.map((item: any) => ({
    ...item,
    key: item.id || item.someUniqueField
  }))

  const handleEdit = (item: DataType) => {
    setSelectedItem(item)
    setIsModalOpen(true)
  }

  const handleDelete = (id: string) => {
    console.log(`Delete item with ID: ${id}`)
    // Implement delete logic
  }

  const handleFormSubmit = (values: DataType) => {
    console.log('Updated values:', values)
    setIsModalOpen(false)
    setSelectedItem(null)
    // Implement update logic
  }

  const fields: ModalFormProps<DataType>['fields'] = [
    {
      name: 'name',
      label: 'Tên chuyến đi',
      component: <Input />,
      rules: [{ required: true, message: 'Vui lòng nhập tên chuyến đi!' }]
    },
    {
      name: 'startTime',
      label: 'Thời gian khởi hành',
      component: <InputNumber style={{ width: '100%' }} />,
      rules: [{ required: true, message: 'Vui lòng nhập thời gian khởi hành!' }]
    },
    {
      name: 'price',
      label: 'Giá vé',
      component: <InputNumber style={{ width: '100%' }} />,
      rules: [{ required: true, message: 'Vui lòng nhập giá vé!' }]
    },
    {
      name: 'licensePlate',
      label: 'Biển số xe',
      component: <Input />,
      rules: [{ required: true, message: 'Vui lòng nhập Biển số xe!' }]
    },
    {
      name: 'pointStart',
      label: 'Điểm đến',
      component: <Input />,
      rules: [{ required: true, message: 'Vui lòng nhập điểm đến!' }]
    },
    {
      name: 'pointEnd',
      label: 'Điểm đi',
      component: <Input />,
      rules: [{ required: true, message: 'Vui lòng nhập điểm đi!' }]
    },
    {
      name: 'description',
      label: 'Mô tả',
      component: <TextArea />,
      rules: [{ required: true, message: 'Vui lòng nhập Mô tả!' }]
    },
    {
      name: 'status',
      label: 'Trạng thái',
      component: <Switch checkedChildren='Khả dụng' unCheckedChildren='Không khả dụng' />,
      valuePropName: 'checked'
    }
  ]

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Tên chuyến đi',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
      width: '25%'
    },
    {
      title: 'Thời gian khởi hành',
      dataIndex: 'startTime',
      key: 'startTime',
      width: '25%'
    },
    {
      title: 'Giá vé',
      dataIndex: 'price',
      key: 'price',
      sorter: (a, b) => handlingTsUndefined(a.price) - handlingTsUndefined(b.price),
      width: '20%'
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => <p>{status ? 'Khả dụng' : 'Không khả dụng'}</p>,
      width: '20%'
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size='middle'>
          <Button onClick={() => handleEdit(record)} type='primary'>
            Edit
          </Button>
          <Popconfirm
            title='Are you sure to delete this item?'
            onConfirm={() => handleDelete(record.key)}
            okText='Yes'
            cancelText='No'
          >
            <Button type='primary' danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      )
    }
  ]

  const renderWithLoading = (isLoading: boolean, content: React.ReactNode) => {
    return isLoading ? (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%' // Full viewport height
        }}
      >
        <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
      </div>
    ) : (
      content
    )
  }

  return (
    <>
      {renderWithLoading(
        isLoading,
        <>
          <Table columns={columns} dataSource={dataSource} />
          <ModalForm
            isVisible={isModalOpen}
            onSubmit={handleFormSubmit}
            initialValues={selectedItem}
            fields={fields}
            setIsModalOpen={setIsModalOpen}
          />
        </>
      )}
    </>
  )
}

export default TripPage
