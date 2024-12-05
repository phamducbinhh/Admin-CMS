import React from 'react'
import { useNavigate } from 'react-router-dom'

const UnauthorizedPage: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>401 - Unauthorized</h1>
      <p>Bạn không có quyền truy cập vào trang này.</p>
      <button
        onClick={() => navigate('/login')}
        style={{
          padding: '10px 20px',
          backgroundColor: '#007BFF',
          color: '#FFF',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          margin: '10px'
        }}
      >
        Quay lại Đăng nhập
      </button>
      <button
        onClick={() => navigate('/')}
        style={{
          padding: '10px 20px',
          backgroundColor: '#28A745',
          color: '#FFF',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Về Trang chủ
      </button>
    </div>
  )
}

export default UnauthorizedPage
