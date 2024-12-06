import useColumnSearch from '@/hooks/useColumnSearch'
import { useQueryTicketNotPaid } from '@/queries/ticket'
import renderWithLoading from '@/utils/renderWithLoading'
import { Button, Popconfirm, Space, Table, TableProps } from 'antd'
import React from 'react'

interface DataType {
  key: string
  ticketId: number
  fullName: string
  typeOfPayment: string
  price: number
}

const TicketNotPaidPage: React.FC = () => {
  const { data, isLoading } = useQueryTicketNotPaid({ id: 1 })

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'ticketId',
      dataIndex: 'ticketId',
      align: 'center',
      key: 'ticketId',
      ...useColumnSearch().getColumnSearchProps('ticketId'),
      width: '20%'
    },
    {
      title: 'Tên người dùng',
      dataIndex: 'fullName',
      align: 'center',
      key: 'fullName',
      ...useColumnSearch().getColumnSearchProps('fullName'),
      render: (text) => <a>{text}</a>,
      width: '25%'
    },
    {
      title: 'Phương thức thanh toán',
      dataIndex: 'typeOfPayment',
      align: 'center',
      key: 'typeOfPayment',
      width: '20%'
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      align: 'center',
      key: 'price',
      width: '15%'
    },
    {
      title: 'Action',
      align: 'center',
      key: 'action',
      render: () => (
        <Space size='middle'>
          <Popconfirm title='Are you sure to Approve this item?' okText='Yes' cancelText='No'>
            <Button type='primary'>Approve</Button>
          </Popconfirm>
        </Space>
      ),
      width: '20%'
    }
  ]

  const dataSource = data?.tickets?.map((item: any) => ({
    ...item,
    key: item.ticketId || item.someUniqueField
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

export default TicketNotPaidPage
