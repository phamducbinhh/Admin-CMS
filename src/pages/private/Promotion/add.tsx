import { useAddPromotionMutation } from '@/queries/promotions'
import { DataTypeVehicle } from '@/types/DataType'
import { fieldModalTable } from '@/utils/fieldModalTable'
import { Button, Form, message } from 'antd'
import { HttpStatusCode } from 'axios'
// import TextArea from 'antd/es/input/TextArea'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const AddPromotionPage: React.FC = () => {
  const [form] = Form.useForm()
  const addMutation = useAddPromotionMutation()
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
      const response = await addMutation.mutateAsync(values)
      if (response.status === HttpStatusCode.Ok) {
        message.success('Add successfully')
        navigate('/promotion')
      } else {
        message.error('Add failed')
      }
    } catch (error) {
      console.error('Error values:', error)
    }
  }

  return (
    <Form onFinish={handleFormSubmit} form={form} layout='vertical'>
      {filteredFields.map((field) => (
        <Form.Item
          key={String(field.name)} // Ensure key is a string
          name={field.name as string} // Ensure name is always a string
          label={field.label}
          rules={field.rules || []}
        >
          {field.component}
        </Form.Item>
      ))}
      <Button type='primary' htmlType='submit'>
        Add
      </Button>
    </Form>
  )
}

export default AddPromotionPage
