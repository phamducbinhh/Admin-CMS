import { HttpStatusCode } from '@/constants/httpStatusCode.enum'
import { useDebounce } from '@/hooks/useDebounce'
import { useCreateRequestDriverMutation } from '@/queries/request'
import { useQueryCheckPrice } from '@/queries/ticket'
import { useQueryGetEndPointVehicles, useQueryGetStartPointVehicles } from '@/queries/vehicle'
import { DataTypeCost } from '@/types/DataType'
import { Button, Form, InputNumber, message, Row, Select, Table, TableColumnsType } from 'antd'
import { useMemo, useState } from 'react'
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

  const typeOfPayment = [
    {
      id: 1,
      value: 'Tiền mặt'
    },
    {
      id: 2,
      value: 'Chuyển khoản'
    }
  ]

  const [selectedPoints, setSelectedPoints] = useState<{ startPoint: string | null; endPoint: string | null }>({
    startPoint: null,
    endPoint: null
  })

  const { data: startPoint, isLoading: loadingStartPoint } = useQueryGetStartPointVehicles()

  const { data: endPoint } = useQueryGetEndPointVehicles(
    { startPoint: selectedPoints.startPoint },
    {
      enabled: selectedPoints.startPoint !== null
    }
  )

  const {
    data: priceTicket,
    refetch,
    isLoading: loadingPrice
  } = useQueryCheckPrice(
    {
      pointStart: selectedPoints.startPoint,
      pointEnd: selectedPoints.endPoint
    },
    {
      enabled: false
    }
  )

  const handleChange = (field: 'startPoint' | 'endPoint') => (value: string) => {
    setSelectedPoints((prev) => ({ ...prev, [field]: value }))
  }

  const handleCheckPrice = useDebounce(() => {
    if (!selectedPoints.startPoint || !selectedPoints.endPoint) return
    refetch()
  }, 500)

  const tableData: TableData[] = useMemo(
    () => [
      {
        key: 'startPoint',
        label: 'Điểm bắt đầu',
        value: (
          <Form.Item name='startPoint' rules={[{ required: true, message: 'Vui lòng chọn điểm bắt đầu!' }]}>
            <Select
              placeholder='Chọn điểm bắt đầu'
              style={{ width: '30%' }}
              onChange={handleChange('startPoint')}
              loading={loadingStartPoint}
            >
              {startPoint?.map((item: any) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.pointStart}
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
            <Select placeholder='Chọn điểm kết thúc' style={{ width: '30%' }} onChange={handleChange('endPoint')}>
              {endPoint?.map((item: any) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.name}
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
          <>
            <span>{priceTicket || '(Không)'}</span>
            <Button
              type='default'
              danger
              style={{ marginLeft: '40px' }}
              onClick={handleCheckPrice}
              loading={loadingPrice}
              disabled={!selectedPoints.startPoint || !selectedPoints.endPoint}
            >
              Check giá vé
            </Button>
          </>
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
        key: 'typeOfPayment',
        label: 'Chọn phương thức thanh toán',
        value: (
          <Form.Item
            name='typeOfPayment'
            rules={[{ required: true, message: 'Vui lòng chọn phương thức thanh toán!' }]}
          >
            <Select placeholder='Chọn phương thức thanh toán' style={{ width: '30%' }}>
              {typeOfPayment.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.value}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        )
      }
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [startPoint, endPoint, priceTicket, loadingStartPoint, loadingPrice, selectedPoints]
  )

  const columns: TableColumnsType<TableData> = useMemo(
    () => [
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
    ],
    []
  )

  const handleFormSubmit = async (values: DataTypeCost) => {
    if (isLoading) return
    setIsLoading(true)
    try {
      const response = await addMutation.mutateAsync(values)
      if (response.status === HttpStatusCode.Ok) {
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
