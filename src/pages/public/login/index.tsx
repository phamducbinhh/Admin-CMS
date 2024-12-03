import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Card, Checkbox, Form, Input, message } from 'antd'
import './LoginPage.scss'

export default function LoginPage(): JSX.Element {
  const onFinish = (values: any) => {
    console.log('Success:', values)
    message.success('Đăng nhập thành công')
  }

  return (
    <div className='login-container'>
      <Card
        className='login-card'
        title={<h2 style={{ textAlign: 'center', fontSize: '24px', padding: '20px' }}>Đăng Nhập</h2>}
        bordered={false}
      >
        <Form
          name='normal_login'
          initialValues={{
            remember: true
          }}
          onFinish={onFinish}
        >
          <Form.Item
            className='form-item'
            name='username'
            rules={[
              {
                required: true,
                message: 'Bắt buộc nhập tài khoản !'
              }
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder='Tài khoản' size='large' className='custom-input' />
          </Form.Item>
          <Form.Item
            className='form-item'
            name='password'
            rules={[
              {
                required: true,
                message: 'Bắt buộc nhập mật khẩu !'
              }
            ]}
          >
            <Input
              prefix={<LockOutlined />}
              type='password'
              placeholder='Mật khẩu'
              size='large'
              className='custom-input'
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name='remember' valuePropName='checked' noStyle>
              <Checkbox>Nhớ đăng nhập</Checkbox>
            </Form.Item>
          </Form.Item>

          <Form.Item>
            <Button type='primary' htmlType='submit' block size='large'>
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
