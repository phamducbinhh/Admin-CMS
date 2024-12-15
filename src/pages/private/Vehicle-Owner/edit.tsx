import UploadComponent from '@/components/upload'
import { useQueryVehiclesOwner, useUpdateVehiclesOwnerMutation } from '@/queries/vehicle'
import { DataTypeUser } from '@/types/DataType'
import { useLocalStorage } from '@/utils/localStorage/localStorageService'
import { Button, Col, DatePicker, Form, Input, message, Row, Switch, Table, TableColumnsType } from 'antd'
import { HttpStatusCode } from 'axios'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

interface TableData {
  key: string
  label: string
  value: JSX.Element | string | undefined
}

const EditVehicleOwnerPage: React.FC = () => {
  const [searchParams] = useSearchParams()

  const navigate = useNavigate()

  const route_id: string | number | null = searchParams.get('id')

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { data, refetch } = useQueryVehiclesOwner()

  const updateMutation = useUpdateVehiclesOwnerMutation()

  if (route_id === null) {
    throw new Error('Invalid cost type ID')
  }

  const [form] = Form.useForm()

  useEffect(() => {
    if (data && Array.isArray(data)) {
      const selectedItem = data.find((item) => item.id === Number(route_id))
      if (selectedItem) {
        const updatedFormData = {
          ...selectedItem,
          dob: dayjs(selectedItem.dob)
        }
        form.setFieldsValue(updatedFormData)
      }
    }
  }, [data, route_id, form])

  const tableData: TableData[] = [
    {
      key: 'username',
      label: 'Tên đăng nhập',
      value: (
        <Form.Item name='username' rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}>
          <Input placeholder='Nhập tên đăng nhập' style={{ width: '30%' }} />
        </Form.Item>
      )
    },
    {
      key: 'fullName',
      label: 'Tên đầy đủ',
      value: (
        <Form.Item name='fullName' rules={[{ required: true, message: 'Vui lòng nhập tên đầy đủ!' }]}>
          <Input placeholder='Nhập tên đầy đủ' style={{ width: '30%' }} />
        </Form.Item>
      )
    },
    {
      key: 'email',
      label: 'Email',
      value: (
        <Form.Item name='email' rules={[{ required: true, message: 'Vui lòng nhập email!' }]}>
          <Input placeholder='Nhập email' style={{ width: '30%' }} type='email' />
        </Form.Item>
      )
    },
    {
      key: 'numberPhone',
      label: 'Số điện thoại',
      value: (
        <Form.Item
          name='numberPhone'
          rules={[
            { required: true, message: 'Vui lòng nhập số điện thoại!' },
            {
              pattern: /^(?:\+84|0)(?:3[2-9]|5[6|8|9]|7[0|6-9]|8[1-5]|9[0-9])[0-9]{7}$/,
              message: 'Số điện thoại không hợp lệ!'
            }
          ]}
        >
          <Input placeholder='Nhập số điện thoại' style={{ width: '30%' }} />
        </Form.Item>
      )
    },
    {
      key: 'avatar',
      label: 'Hình ảnh',
      value: <UploadComponent initialImage={data?.avatar} fieldName={'avatar'} form={form} />
    },
    {
      key: 'address',
      label: 'Địa chỉ',
      value: (
        <Form.Item name='address' rules={[{ required: true, message: 'Vui lòng nhập điểm địa chỉ!' }]}>
          <Input placeholder='Nhập điểm địa chỉ' style={{ width: '30%' }} />
        </Form.Item>
      )
    },
    {
      key: 'dob',
      label: 'Ngày sinh',
      value: (
        <Form.Item name='dob' rules={[{ required: true, message: 'Vui lòng nhập ngày sinh!' }]}>
          <DatePicker
            showTime={{
              format: 'HH:mm:ss'
            }}
            format='YYYY-MM-DD HH:mm:ss'
            onChange={(date) => console.log(date?.toISOString())}
          />
        </Form.Item>
      )
    },
    {
      key: 'status',
      label: 'Trạng thái',
      value: (
        <Form.Item name='status' rules={[{ required: true, message: 'Vui lòng nhập trạng thái!' }]}>
          <Switch checkedChildren='Khả dụng' unCheckedChildren='Không khả dụng' />
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

  const handleFormSubmit = async (values: DataTypeUser) => {
    setIsLoading(true)
    try {
      // https://boring-wiles.202-92-7-204.plesk.page/api/Account/updateVehicleOwner/route_id
      // const response = await updateMutation.mutateAsync({ id: route_id, body: values })
      const token = useLocalStorage.getLocalStorageData('token')
      // Initialize FormData
      const formData = new FormData()

      Object.keys(values).forEach((key) => {
        formData.append(key, values[key])
      })

      // Append image file (if it exists)
      const imageFile = form.getFieldValue('avatar') // Replace 'form' with the actual Form instance

      if (imageFile) {
        formData.append('imageFile', imageFile) // Ensure 'imageFile' matches backend expectations
      }

      const response = await fetch(
        `https://boring-wiles.202-92-7-204.plesk.page/api/Account/updateVehicleOwner/${route_id}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`
          },
          body: formData
        }
      )

      if (!response.ok) {
        // throw new Error(`HTTP error! status: ${response.status}`)
        const errorData = await response.json(); // or response.text() to inspect the raw error
        console.log(errorData);
      }

      if (response.status === HttpStatusCode.Ok) {
        message.success('Update successfully')
        navigate('/vehicles-owner')
      } else {
        message.error('Update failed')
      }
    } catch (error) {
      console.error('Error values:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form onFinish={handleFormSubmit} form={form} layout='vertical'>
      <Table columns={columns} dataSource={tableData} pagination={false} bordered rowKey='key' />
      <Row justify='start' gutter={16} style={{ marginTop: '16px' }}>
        <Col>
          <Button
            type='primary'
            htmlType='submit'
            style={{ marginRight: '10px' }}
            loading={isLoading}
            disabled={isLoading}
          >
            Update
          </Button>
        </Col>
      </Row>
    </Form>
  )
}

export default EditVehicleOwnerPage
