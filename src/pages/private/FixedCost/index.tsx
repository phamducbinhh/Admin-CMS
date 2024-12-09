import ModalForm, { ModalFormProps } from '@/components/Modal/ModalForm'
import { HttpStatusCode } from '@/constants/httpStatusCode.enum'
import { formatPrize, formatTime } from '@/helpers'
import useColumnSearch from '@/hooks/useColumnSearch'
import { useQueryCostType } from '@/queries/cost-type'
import {
  useAddLossCostMutation,
  useDeleteLossCostMutation,
  useQueryLossCost,
  useUpdatelossCostMutation
} from '@/queries/fixed-cost'
import { useQueryVehicles } from '@/queries/vehicle'
import { DataTypeFixedCost } from '@/types/DataType'
import renderWithLoading from '@/utils/renderWithLoading'
import { PlusOutlined } from '@ant-design/icons'
import type { TableProps } from 'antd'
import { Button, Form, InputNumber, message, Popconfirm, Select, Space, Table } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import React, { useEffect, useState } from 'react'

const FixedCostPage: React.FC = () => {
  const { Option } = Select

  const { data, isLoading, refetch } = useQueryLossCost()

  const { data: vehicleData } = useQueryVehicles()

  const { data: costTypeData } = useQueryCostType()

  const updateMutation = useUpdatelossCostMutation()

  const addMutation = useAddLossCostMutation()

  const deleteMutaion = useDeleteLossCostMutation()

  const [isModalOpen, setIsModalOpen] = useState(false)

  const [mode, setMode] = useState('add')

  const [selectedItem, setSelectedItem] = useState<DataTypeFixedCost | null>(null)

  const [form] = Form.useForm()

  const dataSource = data?.map((item: any) => ({
    ...item,
    key: item.id || `${item.description}-${item.licensePlate}-${item.dateIncurred}`
  }))

  const handleEdit = (item: DataTypeFixedCost) => {
    setMode('edit')
    setSelectedItem(item)
    setIsModalOpen(true)
    form.setFieldsValue(item)
  }

  const handleAsyncAdd = async (values: DataTypeFixedCost) => {
    return await addMutation.mutateAsync(values)
  }

  const handleAsyncEdit = async (values: DataTypeFixedCost) => {
    return await updateMutation.mutateAsync({ id: selectedItem?.id, body: values })
  }
  const openAddModal = () => {
    setMode('add')
    form.resetFields()
    setIsModalOpen(true)
  }

  const handleFormSubmit = async (values: DataTypeFixedCost) => {
    try {
      const response = mode === 'add' ? await handleAsyncAdd(values) : await handleAsyncEdit(values)

      if (response?.status === HttpStatusCode.Ok) {
        message.success(response?.message || `${mode === 'add' ? 'Added' : 'Updated'} successfully`)
        refetch()
      } else {
        message.error(`${mode === 'add' ? 'Add' : 'Update'} failed`)
      }
    } catch (error: any) {
      message.error('An unexpected error occurred.', error)
    } finally {
      setIsModalOpen(false)
      setSelectedItem(null)
    }
  }

  const handleFormDelete = async (id: number) => {
    try {
      const response = await deleteMutaion.mutateAsync({ id })
      if (response.status === HttpStatusCode.Ok) {
        message.success('Delete successfully')
        refetch()
      } else {
        message.error('Delete failed')
      }
    } catch (error) {
      console.error('Error deleting:', error)
    }
  }

  useEffect(() => {
    if (mode === 'add') {
      setSelectedItem(null)
    }
  }, [selectedItem, mode])

  const fields: ModalFormProps<DataTypeFixedCost>['fields'] = [
    {
      name: 'description',
      label: 'Mô tả',
      component: <TextArea />,
      rules: [{ required: true, message: 'Vui lòng nhập Mô tả!' }]
    },
    {
      name: 'price',
      label: 'Giá vé',
      component: <InputNumber style={{ width: '100%' }} />,
      rules: [{ required: true, message: 'Vui lòng nhập giá vé!' }]
    },
    {
      name: 'vehicleId',
      label: 'Biển số xe',
      component: (
        <Select placeholder='Chọn xe' style={{ width: '100%' }}>
          {vehicleData?.map((item: any) => (
            <Option key={item.id} value={item.id}>
              {item.licensePlate}
            </Option>
          ))}
        </Select>
      ),
      rules: [{ required: true, message: 'Vui lòng chọn xe!' }]
    },
    {
      name: 'lossCostTypeId',
      label: 'Loại chi phi',
      component: (
        <Select placeholder='Chọn loại chi phí' style={{ width: '100%' }}>
          {costTypeData?.map((item: any) => (
            <Option key={item.id} value={item.id}>
              {item.description}
            </Option>
          ))}
        </Select>
      ),
      rules: [{ required: true, message: 'Vui lòng chọn loại chi phí!' }]
    }
    // {
    //   name: 'dateIncurred',
    //   label: 'Ngày phát sinh',
    //   component: <DatePicker format='YYYY-MM-DD' />,
    //   rules: [{ required: true, message: 'Vui lòng chọn ngày phát sinh!' }]
    // }
  ]

  const columns: TableProps<DataTypeFixedCost>['columns'] = [
    {
      title: 'Tên chi phí',
      dataIndex: 'description',
      key: 'description',
      ...useColumnSearch().getColumnSearchProps('description'),
      render: (text) => <a>{text}</a>,
      align: 'center',
      width: '25%'
    },
    {
      title: 'Biển số xe',
      dataIndex: 'licensePlate',
      key: 'licensePlate',
      width: '25%',
      align: 'center',
      ...useColumnSearch().getColumnSearchProps('licensePlate')
    },
    {
      title: 'Chi phí',
      dataIndex: 'price',
      key: 'price',
      render: (text) => <span>{formatPrize(text)}</span>,
      sorter: (a, b) => a.price - b.price,
      align: 'center',
      width: '20%'
    },
    {
      title: 'Ngày phát sinh',
      dataIndex: 'dateIncurred',
      key: 'dateIncurred',
      align: 'center',
      sorter: (a, b) => Date.parse(a.dateIncurred) - Date.parse(b.dateIncurred),
      render: (date) => <span>{formatTime(date)}</span>,
      width: '20%'
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      render: (_, record) => (
        <Space size='middle'>
          <Button onClick={() => handleEdit(record)} type='primary'>
            Edit
          </Button>
          <Popconfirm
            title='Are you sure to delete this item?'
            okText='Yes'
            cancelText='No'
            onConfirm={() => handleFormDelete(record.id)}
          >
            <Button type='primary' danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      )
    }
  ]

  return (
    <>
      {renderWithLoading({
        isLoading,
        content: (
          <>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
              <Button onClick={() => openAddModal()} type='primary' icon={<PlusOutlined />} ghost>
                Thêm mới
              </Button>
            </div>
            <Table columns={columns} dataSource={dataSource} />
            <ModalForm
              form={form}
              isVisible={isModalOpen}
              onSubmit={handleFormSubmit}
              initialValues={selectedItem}
              fields={fields}
              setIsModalOpen={setIsModalOpen}
              setSelectedItem={setSelectedItem}
            />
          </>
        )
      })}
    </>
  )
}
export default FixedCostPage
