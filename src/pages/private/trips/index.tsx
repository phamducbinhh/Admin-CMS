import type { TableProps } from 'antd'
import { Button, Popconfirm, Space, Table } from 'antd'
import React from 'react'
import { useQueryTrips } from '../../../queries/trip'

interface DataType {
  key: string
  name: string
  startTime: number
  price: number
  status: boolean
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: 'Tên chuyến đi',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
    width: '25%'
  },
  {
    title: 'Thời gian khởi hành',
    dataIndex: 'startTime',
    key: 'startTime',
    width: '25%'
  },
  {
    title: 'Giá vé',
    dataIndex: 'price',
    key: 'price',
    sorter: (a, b) => a.price - b.price,
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

const TripPage: React.FC = () => {
  const { data } = useQueryTrips()

  // Add `key` to each record if not present
  const dataSource = data?.map((item: any) => ({
    ...item,
    key: item.id || item.someUniqueField
  }))

  return <Table<DataType> columns={columns} dataSource={dataSource} />
}
export default TripPage
