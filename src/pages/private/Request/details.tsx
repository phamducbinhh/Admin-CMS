import { ModalFormProps } from '@/components/Modal/ModalForm'
import { useQueryRequestDetails } from '@/queries/request'
import { DataTypeRequest } from '@/types/DataType'
import { Button, Col, DatePicker, Form, Input, message, Row } from 'antd'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

const DetailsRequestPage: React.FC = () => {
  const [searchParams] = useSearchParams()

  const requestID = searchParams.get('id')

  const { data, refetch } = useQueryRequestDetails({ id: requestID })

  const [form] = Form.useForm()

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const fields: ModalFormProps<DataTypeRequest>['fields'] = [
    {
      name: 'driverId',
      label: 'Tài xế',
      component: <Input readOnly disabled />
    },
    {
      name: 'vehicleId',
      label: 'Xe',
      component: <Input readOnly disabled />
    },
    {
      name: 'seats',
      label: 'Số chỗ ngồi',
      component: <Input readOnly disabled />
    },
    {
      name: 'typeName',
      label: 'Loại xe',
      component: <Input readOnly disabled />
    },
    {
      name: 'price',
      label: 'Giá vé',
      component: <Input readOnly disabled />
    },
    {
      name: 'startTime',
      label: 'Ngày băt đầu',
      component: (
        <DatePicker
          showTime={{
            format: 'HH:mm:ss'
          }}
          format='YYYY-MM-DD HH:mm:ss'
          disabled
        />
      )
    },
    {
      name: 'endTime',
      label: 'Ngày kết thúc',
      component: (
        <DatePicker
          showTime={{
            format: 'HH:mm:ss'
          }}
          format='YYYY-MM-DD HH:mm:ss'
          disabled
        />
      )
    }
  ]

  useEffect(() => {
    refetch()
  }, [requestID, refetch])

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        driverId: data.driverId || 'N/A',
        vehicleId: data.vehicleId || 'N/A',
        startLocation: data.startLocation || 'N/A',
        endLocation: data.endLocation || 'N/A',
        startTime: data.startTime ? dayjs(data.startTime) : null,
        endTime: data.endTime ? dayjs(data.endTime) : null,
        seats: data.seats || 'N/A',
        typeName: data.typeName || 'N/A',
        price: data.price || 'N/A'
      })
    }
  }, [data, form])
  const handleFormSubmit = async (values: DataTypeRequest) => {
    setIsLoading(true)
    try {
      console.log(values)
    } catch (error) {
      console.error('Error values:', error)
      message.error('Add failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form onFinish={handleFormSubmit} form={form} layout='vertical'>
      <Row gutter={16}>
        {fields.map((field) => (
          <Col key={String(field.name)} span={12}>
            <Form.Item name={field.name as string} label={field.label} rules={field.rules || []}>
              {field.component}
            </Form.Item>
          </Col>
        ))}
      </Row>
      <Row justify='start' gutter={16}>
        <Col>
          <Button type='primary' htmlType='submit' loading={isLoading} style={{ marginRight: '10px' }}>
            Accept
          </Button>
        </Col>
        <Col>
          <Button
            type='primary'
            htmlType='button'
            loading={isLoading}
            danger
            style={{ backgroundColor: '#ff4d4f', borderColor: '#ff4d4f' }}
          >
            Deny
          </Button>
        </Col>
      </Row>
    </Form>
  )
}

export default DetailsRequestPage
