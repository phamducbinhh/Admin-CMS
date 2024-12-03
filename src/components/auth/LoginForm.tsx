import { Button, Checkbox, Form, Input } from 'antd'
import { LockOutlined, MailOutlined } from '@ant-design/icons'

const LoginForm = ({ onFinish, styles }: any) => (
  <Form
    name='normal_login'
    initialValues={{ remember: true }}
    onFinish={onFinish}
    layout='vertical'
    requiredMark='optional'
  >
    <Form.Item
      name='email'
      rules={[
        {
          type: 'email',
          required: true,
          message: 'Please input your Email!'
        }
      ]}
    >
      <Input prefix={<MailOutlined />} placeholder='Email' />
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
      <Input.Password prefix={<LockOutlined />} type='password' placeholder='Password' />
    </Form.Item>
    <Form.Item>
      <Form.Item name='remember' valuePropName='checked' noStyle>
        <Checkbox>Remember me</Checkbox>
      </Form.Item>
      <a style={styles.forgotPassword} href=''>
        Forgot password?
      </a>
    </Form.Item>
    <Form.Item style={{ marginBottom: '0px' }}>
      <Button block type='primary' htmlType='submit'>
        Log in
      </Button>
    </Form.Item>
  </Form>
)

export default LoginForm
