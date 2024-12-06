import { useQueryDriver } from '@/queries/driver'
import renderWithLoading from '@/utils/renderWithLoading'
import { Avatar, Button, Popconfirm, Space, Table, TableProps } from 'antd'
import React from 'react'

interface DataType {
  key: string
  name: string
  numberPhone: string
  avatar?: string
  discount: number
  status: boolean
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: 'Tên tài xế',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
    sorter: (a, b) => a.name.localeCompare(b.name),
    width: '25%'
  },
  {
    title: 'Số điện thoại',
    dataIndex: 'numberPhone',
    key: 'numberPhone',
    width: '25%'
  },
  {
    title: 'Avatar',
    dataIndex: 'avatar',
    key: 'avatar',
    render: () => (
      <Avatar src={'https://statics.oeg.vn/storage/DEFAULT%20AVATAR%20PROFILE/akirov6.webp'} alt='Avatar' />
    ),
    width: '15%'
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
        <Button type='default'>Block</Button>
      </Space>
    )
  }
]

const DriverPage: React.FC = () => {
  const { data, isLoading } = useQueryDriver()

  const dataSource = data?.map((item: any) => ({
    ...item,
    key: item.id || item.someUniqueField
  }))

  return (
    <>
      {renderWithLoading({
        isLoading,
        content: (
          <>
            <Table columns={columns} dataSource={dataSource} />
          </>
        )
      })}
    </>
  )
}

export default DriverPage
