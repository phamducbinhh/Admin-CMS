import { Avatar, Button, Popconfirm, Space, Table, TableProps } from 'antd'
import React from 'react'
import { useQueryAccount } from '../../../queries/account'

interface DataType {
  key: string
  avatar: string
  email: string
  fullName: string
  numberPhone: string
  username: string
  status: boolean
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: 'Avatar',
    dataIndex: 'avatar',
    key: 'avatar',
    render: () => (
      <Avatar src={'https://statics.oeg.vn/storage/DEFAULT%20AVATAR%20PROFILE/akirov6.webp'} alt='Avatar' />
    ),
    width: '10%'
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    render: (text) => <a>{text}</a>,
    width: '20%'
  },
  {
    title: 'Tên',
    dataIndex: 'fullName',
    key: 'fullName',
    width: '20%'
  },
  {
    title: 'Số điện thoại',
    dataIndex: 'numberPhone',
    key: 'numberPhone',
    width: '20%'
  },
  {
    title: 'Tên đăng nhập',
    dataIndex: 'username',
    key: 'username',
    width: '20%'
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    key: 'status',
    render: (status) => <p>{status === true ? 'Khả dụng' : 'Không khả dụng'}</p>,
    width: '20%'
  },
  {
    title: 'Action',
    key: 'action',
    render: () => (
      <Space size='middle'>
        <Button type='primary'>Edit</Button>
        <Popconfirm title='Are you sure to delete this item?' okText='Yes' cancelText='No'>
          <Button type='primary' danger>
            Delete
          </Button>
        </Popconfirm>
      </Space>
    )
  }
]

const AccountPage: React.FC = () => {
  const { data } = useQueryAccount()

  const dataSource = data?.map((item: any) => ({
    ...item,
    key: item.id || item.someUniqueField
  }))

  return <Table<DataType> columns={columns} dataSource={dataSource} />
}

export default AccountPage
