import UploadComponent from '@/components/upload'
import { useQueryUserProfile } from '@/queries/user-profile'
import { fieldUser } from '@/utils/fieldModalTable'
import { useLocalStorage } from '@/utils/localStorage/localStorageService'
import renderWithLoading from '@/utils/renderWithLoading'
import { Form, Button, message } from 'antd'
import { HttpStatusCode } from 'axios'
import dayjs from 'dayjs'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const EditUserProfile = () => {
  const [form] = Form.useForm()
  const { data, isLoading, refetch } = useQueryUserProfile()
  const navigate = useNavigate()

  useEffect(() => {
    if (data) {
      const updatedFormData = {
        ...data,
        imageFile: data.avatar,
        dob: data.dob
          ? dayjs(data.dob) // Parse time-only format
          : null
      }

      form.setFieldsValue(updatedFormData)
    }
  }, [data, form])

  useEffect(() => {
    refetch()
  }, [refetch])

  const order = [
    'avatar',
    'fullName',
    'username',
    'email',
    'dob',
    'password',
    'address',
    'numberPhone',
    'activeCode',
    'role',
    'status'
  ]

  const filteredFields = fieldUser
    .filter((field) => field.name && order.includes(field.name))
    .sort((a, b) => order.indexOf(a.name as string) - order.indexOf(b.name as string))

  const handleFormSubmit = async (values: any) => {
    try {
      const token = useLocalStorage.getLocalStorageData('token')
      // Initialize FormData
      const formData = new FormData()

      Object.keys(values).forEach((key) => {
        if (key === 'dob' && dayjs.isDayjs(values[key])) {
          // Convert dayjs instance to desired format (e.g., ISO string)
          formData.append(key, values[key].format('YYYY-MM-DD')) // Adjust format as needed
        } else if (key !== 'avatar') {
          // Append other fields
          formData.append(key, values[key])
        }
      })

      formData.append('dob', values.dob)
      // Append image file (if it exists)
      const imageFile = form.getFieldValue('avatar') // Replace 'form' with the actual Form instance
      if (imageFile) {
        formData.append('imageFile', imageFile) // Ensure 'imageFile' matches backend expectations
      }

      console.log(values)

      const response = await fetch('https://boring-wiles.202-92-7-204.plesk.page/api/User/EditProfile', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      // Handle the response
      if (response.status === HttpStatusCode.Ok) {
        message.success('Update successfully')
        navigate('/user-profile')
      } else {
        message.error('Update failed')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      message.error('An error occurred while updating.')
    }
  }

  return (
    <>
      {renderWithLoading({
        isLoading,
        content: (
          <Form onFinish={handleFormSubmit} form={form} layout='vertical'>
            {filteredFields.map((field) => (
              <Form.Item
                key={String(field.name)}
                name={field.name as string}
                label={field.label}
                rules={field.rules || []}
              >
                {field.name === 'avatar' ? (
                  <UploadComponent initialImage={data?.avatar} fieldName={'avatar'} form={form} /> // Hiển thị component upload khi field là avatar
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
      })}
    </>
  )
}

export default EditUserProfile
