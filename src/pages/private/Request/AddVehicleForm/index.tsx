import { HttpStatusCode } from '@/constants/httpStatusCode.enum'
import { ActionType } from '@/enums/enum'
import { useAddVehicleByStaffMutation } from '@/queries/request'
import { useQueryVehiclesDetails } from '@/queries/vehicle'
import { DataTypeRequest } from '@/types/DataType'
import { Button, Col, Form, message, Row, Table } from 'antd'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AddVehicleForm = ({ data }: { data: DataTypeRequest | undefined }) => {
  const [form] = Form.useForm()

  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isLoadingDeny, setIsLoadingDeny] = useState<boolean>(false)

  const AddVehicleByStaff = useAddVehicleByStaffMutation()

  const { data: vehicleData, refetch: refetchVehicle } = useQueryVehiclesDetails(
    { id: data?.vehicleId },
    {
      enabled: data?.typeRequestId === ActionType.ADD_VEHICLE
    }
  )

  useEffect(() => {
    if (data?.vehicleId) refetchVehicle()
  }, [data?.vehicleId, refetchVehicle])

  const tableData = useMemo(
    () => [
      { key: 'driverName', label: 'Tài xế', value: vehicleData?.driverName || 'N/A' },
      { key: 'vehicleId', label: 'Xe', value: data?.vehicleId || 'N/A' },
      { key: 'numberSeat', label: 'Số ghế ngồi', value: vehicleData?.numberSeat || 'N/A' },
      { key: 'licensePlate', label: 'Biển số xe', value: vehicleData?.licensePlate || 'N/A' },
      { key: 'description', label: 'Mô tả', value: vehicleData?.description || 'N/A' }
    ],
    [vehicleData, data]
  )

  const columns = useMemo(
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
        width: '70%'
      }
    ],
    []
  )

  const handleFormAction = async (isApprove: boolean, successMessage: string, errorMessage: string) => {
    if (isLoading || isLoadingDeny) return

    if (isApprove) {
      setIsLoading(true)
    } else {
      setIsLoadingDeny(true)
    }

    try {
      const response = await AddVehicleByStaff.mutateAsync({
        id: data?.requestId ?? null,
        isApprove
      })

      if (response.status === HttpStatusCode.Ok) {
        message.success(successMessage)
        navigate('/ticket')
      } else {
        message.error(errorMessage)
      }
    } catch (error) {
      console.error('Error values:', error)
      message.error(errorMessage)
    } finally {
      if (isApprove) {
        setIsLoading(false)
      } else {
        setIsLoadingDeny(false)
      }
    }
  }

  return (
    <Form form={form} layout='vertical' onFinish={() => handleFormAction(true, 'Accept successfully', 'Accept failed')}>
      <Table columns={columns} dataSource={tableData} pagination={false} bordered />
      <Row justify='start' gutter={16} style={{ marginTop: '16px' }}>
        <Col>
          <Button type='primary' htmlType='submit' style={{ marginRight: '10px' }} loading={isLoading}>
            Accept
          </Button>
        </Col>
        <Col>
          <Button
            type='primary'
            htmlType='button'
            danger
            onClick={() => handleFormAction(false, 'Deny successfully', 'Deny failed')}
            loading={isLoadingDeny}
          >
            Deny
          </Button>
        </Col>
      </Row>
    </Form>
  )
}

export default AddVehicleForm
