import UploadComponent from '@/components/upload'
import { useQueryPromotionDetails } from '@/queries/promotions'
import { DataType } from '@/types/DataType'
import { fieldModalTable } from '@/utils/fieldModalTable'
import { useLocalStorage } from '@/utils/localStorage/localStorageService'
import { Button, Form, message } from 'antd'
import { HttpStatusCode } from 'axios'
import dayjs from 'dayjs'
import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

const EditPromotionPage: React.FC = () => {
  const [searchParams] = useSearchParams()
  const promotionID = searchParams.get('id')
  const [form] = Form.useForm()
  const navigate = useNavigate()

  // const updateMutation = useUpdatePromotionMutation()

  const { data, refetch } = useQueryPromotionDetails({ id: promotionID })

  useEffect(() => {
    if (data) {
      const updatedFormData = {
        ...data,
        startDate: dayjs(data.startDate),
        endDate: dayjs(data.endDate)
      }

      form.setFieldsValue(updatedFormData)
    }
  }, [data, form])

  useEffect(() => {
    refetch()
  }, [promotionID, refetch])

  const filteredFields = fieldModalTable.filter(
    (field) =>
      field.name &&
      ['codePromotion', 'description', 'discount', 'exchangePoint', 'imagePromotion', 'startDate', 'endDate'].includes(
        field.name
      )
  )

  const handleSubmit = async (values: DataType) => {
    try {
      const token = useLocalStorage.getLocalStorageData('token')
      // Initialize FormData
      const formData = new FormData()

      Object.keys(values).forEach((key) => {
        formData.append(key, values[key])
      })

      // Append image file (if it exists)
      const imageFile = form.getFieldValue('imagePromotion') // Replace 'form' with the actual Form instance
      if (imageFile) {
        formData.append('imageFile', imageFile) // Ensure 'imageFile' matches backend expectations
      }

      const response = await fetch(
        `https://boring-wiles.202-92-7-204.plesk.page/api/Promotion/updatePromotion/id?id=${promotionID}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`
          },
          body: formData
        }
      )

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      if (response.status === HttpStatusCode.Ok) {
        message.success('Update successfully')

        navigate('/promotion')
      } else {
        message.error('Update failed')
      }
    } catch (error) {
      console.error('Error values:', error)
    }
  }

  return (
    <Form onFinish={handleSubmit} form={form} layout='vertical'>
      {filteredFields.map((field) => (
        <Form.Item key={String(field.name)} name={field.name as string} label={field.label} rules={field.rules || []}>
          {field.name === 'imagePromotion' ? (
            <UploadComponent initialImage={data?.imagePromotion} fieldName={'imagePromotion'} form={form} /> // Hiển thị component upload khi field là avatar
          ) : (
            field.component // Hiển thị component mặc định cho các field khác
          )}
        </Form.Item>
      ))}
      <Button type='primary' htmlType='submit'>
        Update
      </Button>
    </Form>
  )
}

export default EditPromotionPage
