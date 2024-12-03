import { Typography } from 'antd'

const { Text, Link } = Typography

const Footer = ({ styles }: any) => (
  <div style={styles.footer}>
    <Text style={styles.text}>Don't have an account?</Text> <Link href=''>Sign up now</Link>
  </div>
)

export default Footer
