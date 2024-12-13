import React from 'react'
import { fieldModalTable } from '@/utils/fieldModalTable'
import { Button, Form, message } from 'antd'
import { DataType } from '@/types/DataType'

const ListTripDetailAddPage: React.FC = () => {
  const [form] = Form.useForm()

  const order = ['pointStartDetails', 'timeStartDetils', 'pointEndDetails', 'timeEndDetails', 'status']

  const filteredFields = fieldModalTable
    .filter((field) => field.name && order.includes(field.name))
    .sort((a, b) => order.indexOf(a.name as string) - order.indexOf(b.name as string))

  const handleFormSubmit = async (values: DataType) => {
    try {
      //   const response = await addMutation.mutateAsync(values)
      //   if (response.status === HttpStatusCode.Ok) {
      //     message.success('Add successfully')
      //     refetch()
      //     navigate('/cost-type')
      //   } else {
      //     message.error('Add failed')
      //   }
    } catch (error) {
      console.error('Error values:', error)
    }
  }

  return (
    <Form onFinish={handleFormSubmit} form={form} layout='vertical'>
      {filteredFields.map((field) => (
        <Form.Item key={String(field.name)} name={field.name as string} label={field.label} rules={field.rules || []}>
          {field.component}
        </Form.Item>
      ))}
      <Button type='primary' htmlType='submit'>
        Add
      </Button>
    </Form>
  )
}

export default ListTripDetailAddPage
