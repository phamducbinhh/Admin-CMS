import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Card, Checkbox, Form, Input } from 'antd'
import './LoginPage.scss'

export default function LoginPage(): JSX.Element {
  const onFinish = (values: any) => {
    console.log('Success:', values)
  }

  return (
    <div className='login-container'>
      <Card
        className='login-card'
        title={<h2 style={{ textAlign: 'center', fontSize: '24px', padding: '20px' }}>Đăng nhập</h2>}
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
            name='username'
            rules={[
              {
                required: true,
                message: 'Please input your Username!'
              }
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder='Username' size='large' className='custom-input' />
          </Form.Item>
          <Form.Item
            name='password'
            rules={[
              {
                required: true,
                message: 'Please input your Password!'
              }
            ]}
          >
            <Input
              prefix={<LockOutlined />}
              type='password'
              placeholder='Password'
              size='large'
              className='custom-input'
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name='remember' valuePropName='checked' noStyle>
              <Checkbox>Remember</Checkbox>
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
