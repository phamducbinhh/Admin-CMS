import { theme, Grid } from 'antd'
import getStyles from '../../../components/auth/styles'
import Header from '../../../components/auth/Header'
import LoginForm from '../../../components/auth/LoginForm'
import Footer from '../../../components/auth/Footer'

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
        <Header styles={styles} />
        <LoginForm onFinish={onFinish} styles={styles} />
        <Footer styles={styles} />
      </div>
    </section>
  )
}
