import { Card, Grid, theme } from 'antd'
import Footer from '../../../components/auth/Footer'
import Header from '../../../components/auth/Header'
import LoginForm from '../../../components/auth/LoginForm'
import getStyles from '../../../components/auth/styles'

const { useToken } = theme
const { useBreakpoint } = Grid

export default function LoginPage() {
  const { token } = useToken()
  const screens = useBreakpoint()
  const styles = getStyles(token, screens)

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values)
  }

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <Card style={styles.card}>
          <Header styles={styles} />
          <LoginForm onFinish={onFinish} styles={styles} />
          <Footer styles={styles} />
        </Card>
      </div>
    </section>
  )
}
