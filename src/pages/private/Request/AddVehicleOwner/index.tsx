import { HttpStatusCode } from '@/constants/httpStatusCode.enum'
import { useCreateRequestOwnerMutation, useQueryRequest } from '@/queries/request'
import { DataTypeCost } from '@/types/DataType'
import { Button, DatePicker, Form, Input, InputNumber, message, Row, Select, Table, TableColumnsType } from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface TableData {
  key: string
  label: string
  value: string | number | JSX.Element | undefined
}

const AddRequestVehicleOwner: React.FC = () => {
  const [form] = Form.useForm()

  const navigate = useNavigate()

  const addMutation = useCreateRequestOwnerMutation()

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { refetch } = useQueryRequest()

  const tableData: TableData[] = [
    {
      key: 'price',
      label: 'Giá tiền',
      value: (
        <Form.Item name='price' rules={[{ required: true, message: 'Vui lòng nhập giá tiền!' }]}>
          <InputNumber style={{ width: '100%' }} placeholder='nhập giá tiền' />
        </Form.Item>
      )
    },
    {
      key: 'startLocation',
      label: 'Điểm đến',
      value: (
        <Form.Item name='startLocation' rules={[{ required: true, message: 'Vui lòng nhập điểm đến!' }]}>
          <Input placeholder='nhập điểm đến' />
        </Form.Item>
      )
    },
    {
      key: 'endLocation',
      label: 'Điểm đi',
      value: (
        <Form.Item name='endLocation' rules={[{ required: true, message: 'Vui lòng nhập điểm đi!' }]}>
          <Input placeholder='nhập điểm đi' />
        </Form.Item>
      )
    },
    {
      key: 'seats',
      label: 'Chọn số ghế',
      value: (
        <Form.Item name='seats' rules={[{ required: true, message: 'Vui lòng chọn xe!' }]}>
          <Select placeholder='Chọn xe' style={{ width: '100%' }}>
            {['5', '7', '29', '45'].map((item) => (
              <Select.Option key={item} value={item}>
                {item}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      )
    },
    {
      key: 'startTime',
      label: 'Ngày bắt đầu',
      value: (
        <Form.Item name='startTime' rules={[{ required: true, message: 'Vui lòng chọn ngày bắt đầu!' }]}>
          <DatePicker showTime={{ format: 'HH:mm:ss' }} style={{ width: '100%' }} format='YYYY-MM-DD HH:mm:ss' />
        </Form.Item>
      )
    },
    {
      key: 'endTime',
      label: 'Ngày kết thúc',
      value: (
        <Form.Item name='endTime' rules={[{ required: true, message: 'Vui lòng chọn ngày kết thúc!' }]}>
          <DatePicker showTime={{ format: 'HH:mm:ss' }} style={{ width: '100%' }} format='YYYY-MM-DD HH:mm:ss' />
        </Form.Item>
      )
    }
  ]

  const columns: TableColumnsType<TableData> = [
    {
      title: 'Key',
      dataIndex: 'label',
      key: 'label',
      width: '30%'
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
      width: '70%',
      render: (_, record) => <>{record.value}</>
    }
  ]
  const handleFormSubmit = async (values: DataTypeCost) => {
    if (isLoading) return
    setIsLoading(true)
    try {
      const response = await addMutation.mutateAsync(values)
      if (response.status === HttpStatusCode.Ok) {
        refetch()
        message.success('Accept successfully')
        navigate('/request')
      } else {
        message.error('Accept failed')
      }

      console.log(values)
    } catch (error) {
      console.error('Error values:', error)
      message.error('Accept failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Form form={form} onFinish={handleFormSubmit} layout='vertical'>
        <Table columns={columns} dataSource={tableData} pagination={false} bordered />
        <Row justify='start' gutter={16} style={{ marginTop: '16px' }}>
          <Button type='primary' htmlType='submit' loading={isLoading} disabled={isLoading} style={{ marginTop: 16 }}>
            Thuê tài xế
          </Button>
        </Row>
      </Form>
    </>
  )
}

export default AddRequestVehicleOwner
