import { HttpStatusCode } from '@/constants/httpStatusCode.enum'
import { useAddCostTypeMutation, useQueryCostType } from '@/queries/cost-type'
import { DataTypeCost } from '@/types/DataType'
import { fieldModalTable } from '@/utils/fieldModalTable'
import { Button, Form, message } from 'antd'
import { useNavigate } from 'react-router-dom'

const AddCostTypePage: React.FC = () => {
  const [form] = Form.useForm()

  const addMutation = useAddCostTypeMutation()

  const navigate = useNavigate()

  const { refetch } = useQueryCostType()

  const filteredFields = fieldModalTable.filter((field) => field.name && ['description'].includes(field.name))

  const handleFormSubmit = async (values: DataTypeCost) => {
    try {
      const response = await addMutation.mutateAsync(values)
      if (response.status === HttpStatusCode.Ok) {
        message.success('Add successfully')
        refetch()
        navigate('/cost-type')
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

export default AddCostTypePage
