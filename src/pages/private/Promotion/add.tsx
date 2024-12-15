import UploadComponent from '@/components/upload'
// import { useAddPromotionMutation, useAddPromotionToAllUserMutation } from '@/queries/promotions'
import { DataTypeVehicle } from '@/types/DataType'
import { fieldModalTable } from '@/utils/fieldModalTable'
import { useLocalStorage } from '@/utils/localStorage/localStorageService'
import { PlusOutlined } from '@ant-design/icons'
import { Form, Button, message } from 'antd'
import { HttpStatusCode } from 'axios'
// import TextArea from 'antd/es/input/TextArea'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const AddPromotionPage: React.FC = () => {
  const [form] = Form.useForm()
  // const addMutation = useAddPromotionMutation()
  // const addAllMutation = useAddPromotionToAllUserMutation()
  const navigate = useNavigate()

  const filteredFields = fieldModalTable.filter(
    (field) =>
      field.name &&
      ['codePromotion', 'description', 'discount', 'exchangePoint', 'imagePromotion', 'startDate', 'endDate'].includes(
        field.name
      )
  )

  const handleFormSubmit = async (values: DataTypeVehicle) => {
    try {
      const token = useLocalStorage.getLocalStorageData('token')
      // Initialize FormData
      const formData = new FormData()

      Object.keys(values).forEach((key) => {
        formData.append(key, values[key])
      })

      // Append image file (if it exists)
      const imageFile = form.getFieldValue('imagePromotion') // Replace 'form' with the actual Form instance

      console.log(imageFile)

      if (imageFile) {
        formData.append('imageFile', imageFile) // Ensure 'imageFile' matches backend expectations
      }

      const response = await fetch(`https://boring-wiles.202-92-7-204.plesk.page/api/Promotion/CreatePromotion`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      if (response.status === HttpStatusCode.Created) {
        message.success('Create promotion success')
        navigate('/promotion')
      }
    } catch (error) {
      console.error('Error values:', error)
    }
  }

  const handleAddPromotionToAllUser = async () => {
    try {
      const values = form.getFieldsValue()

      const token = useLocalStorage.getLocalStorageData('token')
      // Initialize FormData
      const formData = new FormData()

      Object.keys(values).forEach((key) => {
        formData.append(key, values[key])
      })

      console.log(values)

      // Append image file (if it exists)
      const imageFile = form.getFieldValue('imagePromotion') // Replace 'form' with the actual Form instance

      if (imageFile) {
        formData.append('imageFile', imageFile) // Ensure 'imageFile' matches backend expectations
      }

      const response = await fetch(`https://boring-wiles.202-92-7-204.plesk.page/api/Promotion/givePromotionAllUser`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      // console.log(response)

      if (response.status === HttpStatusCode.Created) {
        message.success('Create promotion success')
        navigate('/promotion')
      }
    } catch (error) {
      console.error('Error values:', error)
    }
  }

  return (
    <Form onFinish={handleFormSubmit} form={form} layout='vertical'>
      {filteredFields.map((field) => (
        <Form.Item key={String(field.name)} name={field.name as string} label={field.label} rules={field.rules || []}>
          {field.name === 'imagePromotion' ? (
            <UploadComponent fieldName={'imagePromotion'} form={form} /> // Hiển thị component upload khi field là avatar
          ) : (
            field.component // Hiển thị component mặc định cho các field khác
          )}
        </Form.Item>
      ))}
      <Button type='primary' htmlType='submit'>
        Add
      </Button>
      <Button
        onClick={() => handleAddPromotionToAllUser()}
        style={{ marginLeft: 16 }}
        type='primary'
        icon={<PlusOutlined />}
        ghost
      >
        Thêm promotion cho tất cả user
      </Button>
    </Form>
  )
}

export default AddPromotionPage
