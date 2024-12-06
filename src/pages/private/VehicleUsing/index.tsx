import React, { useState } from 'react'
import { Button, Space, Popconfirm, Spin, Table } from 'antd'
import type { TableProps } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { DataType } from '@/types/DataType'
import { useQueryVehiclesUsing } from '@/queries/vehicle-using'
import { handlingTsUndefined } from '@/utils/handlingTsUndefined'
import { fieldModalTable } from '@/utils/fieldModalTable'
import ModalForm from '@/components/Modal/ModalForm'

const VehicleUsingPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<DataType | null>(null)

  const { data, isLoading } = useQueryVehiclesUsing()

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

  const filteredFields = fieldModalTable.filter(
    (field) => field.name && ['name', 'licensePlate', 'price'].includes(field.name)
  )

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
            fields={filteredFields}
            setIsModalOpen={setIsModalOpen}
          />
        </>
      )}
    </>
  )
}

export default VehicleUsingPage
