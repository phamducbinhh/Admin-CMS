import { ModalFormProps } from '@/components/Modal/ModalForm'
import { HttpStatusCode } from '@/constants/httpStatusCode.enum'
import { useAddCostTypeMutation } from '@/queries/cost-type'
import { DataTypeCost, DataTypeVehicle } from '@/types/DataType'
import { Button, Form, message } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { useNavigate } from 'react-router-dom'

const EditCostTypePage: React.FC = () => {
  const [form] = Form.useForm()

  const addMutation = useAddCostTypeMutation()

  const navigate = useNavigate()

  const fields: ModalFormProps<DataTypeCost>['fields'] = [
    {
      name: 'description',
      label: 'Mô tả',
      component: <TextArea />,
      rules: [{ required: true, message: 'Vui lòng nhập Mô tả!' }]
    }
  ]

  const handleFormSubmit = async (values: DataTypeVehicle) => {
    try {
      const response = await addMutation.mutateAsync(values)
      if (response.status === HttpStatusCode.Ok) {
        message.success(response.data.message)
        navigate('/vehicles')
      } else {
        message.error(response.message)
      }
    } catch (error) {
      console.error('Error values:', error)
    }
  }

  return (
    <Form onFinish={handleFormSubmit} form={form} layout='vertical'>
      {fields.map((field) => (
        <Form.Item key={String(field.name)} name={field.name as string} label={field.label} rules={field.rules || []}>
          {field.component}
        </Form.Item>
      ))}
      <Button type='primary' htmlType='submit'>
        Update
      </Button>
    </Form>
  )
}

export default EditCostTypePage
