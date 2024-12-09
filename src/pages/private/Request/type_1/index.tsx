import { DataTypeRequest } from '@/types/DataType'
import { Button, Col, Form, Row, Table } from 'antd'
import dayjs from 'dayjs'
import { useEffect } from 'react'

const AddVehicleForm = ({
  data,
  refetch,
  typeId
}: {
  data: DataTypeRequest | undefined
  refetch: () => void
  typeId: string | number | undefined | null
}) => {
  const [form] = Form.useForm()

  const tableData = [
    { key: 'driverId', label: 'Tài xế', value: data?.driverId || 'N/A' },
    { key: 'vehicleId', label: 'Xe', value: data?.vehicleId || 'N/A' },
    { key: 'seats', label: 'Số chỗ ngồi', value: data?.seats || 'N/A' },
    { key: 'typeName', label: 'Loại xe', value: data?.typeName || 'N/A' },
    { key: 'price', label: 'Giá vé', value: data?.price || 'N/A' },
    {
      key: 'startTime',
      label: 'Ngày bắt đầu',
      value: data?.startTime ? dayjs(data.startTime).format('YYYY-MM-DD HH:mm:ss') : 'N/A'
    },
    {
      key: 'endTime',
      label: 'Ngày kết thúc',
      value: data?.endTime ? dayjs(data.endTime).format('YYYY-MM-DD HH:mm:ss') : 'N/A'
    }
  ]

  const columns = [
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
      width: '70%'
    }
  ]

  useEffect(() => {
    refetch()
  }, [typeId, refetch])

  return (
    <Form form={form} layout='vertical'>
      <Table columns={columns} dataSource={tableData} pagination={false} bordered />
      <Row justify='start' gutter={16} style={{ marginTop: '16px' }}>
        <Col>
          <Button type='primary' htmlType='submit' style={{ marginRight: '10px' }}>
            Accept
          </Button>
        </Col>
        <Col>
          <Button
            type='primary'
            htmlType='button'
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

export default AddVehicleForm
