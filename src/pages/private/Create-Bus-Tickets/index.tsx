import { HttpStatusCode } from '@/constants/httpStatusCode.enum'
import { useCreateRequestDriverMutation, useQueryRequest } from '@/queries/request'
import { DataTypeCost } from '@/types/DataType'
import { Button, Form, InputNumber, message, Row, Select, Table, TableColumnsType } from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface TableData {
  key: string
  label: string
  value: string | number | JSX.Element | undefined
}
const CreateBusTickets: React.FC = () => {
  const [form] = Form.useForm()

  const navigate = useNavigate()

  const addMutation = useCreateRequestDriverMutation()

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { refetch } = useQueryRequest()

  const tableData: TableData[] = [
    {
      key: 'startPoint',
      label: 'Điểm bắt đầu',
      value: (
        <Form.Item name='startPoint' rules={[{ required: true, message: 'Vui lòng chọn điểm bắt đầu!' }]}>
          <Select placeholder='Chọn điểm bắt đầu' style={{ width: '30%' }}>
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
      key: 'endPoint',
      label: 'Điểm kết thúc',
      value: (
        <Form.Item name='endPoint' rules={[{ required: true, message: 'Vui lòng chọn điểm kết thúc!' }]}>
          <Select placeholder='Chọn điểm kết thúc' style={{ width: '30%' }}>
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
      key: 'price',
      label: 'Giá tiền',
      value: (
        <Form.Item name='price' rules={[{ required: true, message: 'Vui lòng nhập giá tiền!' }]}>
          <InputNumber style={{ width: '30%' }} placeholder='nhập giá tiền' />
        </Form.Item>
      )
    },
    {
      key: 'numberTicket',
      label: 'Số vé',
      value: (
        <Form.Item name='numberTicket' rules={[{ required: true, message: 'Vui lòng nhập số vé!' }]}>
          <InputNumber style={{ width: '30%' }} placeholder='nhập số vé' />
        </Form.Item>
      )
    },
    {
      key: 'seats',
      label: 'Chọn số ghế',
      value: (
        <Form.Item name='seats' rules={[{ required: true, message: 'Vui lòng chọn xe!' }]}>
          <Select placeholder='Chọn xe' style={{ width: '30%' }}>
            {['5', '7', '29', '45'].map((item) => (
              <Select.Option key={item} value={item}>
                {item}
              </Select.Option>
            ))}
          </Select>
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
            Tạo vé
          </Button>
        </Row>
      </Form>
    </>
  )
}

export default CreateBusTickets
