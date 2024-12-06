import useColumnSearch from '@/hooks/useColumnSearch'
import { useQueryPromotion } from '@/queries/promotions'
import renderWithLoading from '@/utils/renderWithLoading'
import { Button, Popconfirm, Space, Table, TableProps } from 'antd'
import React from 'react'

interface DataType {
  key: string
  description: string
  codePromotion: string
  discount: number
  exchangePoint: number
}

const PromotionPage: React.FC = () => {
  const { data, isLoading } = useQueryPromotion()

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Code',
      dataIndex: 'codePromotion',
      key: 'codePromotion',
      ...useColumnSearch().getColumnSearchProps('codePromotion'),
      sorter: (a, b) => a.codePromotion.localeCompare(b.codePromotion),
      width: '25%'
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      ...useColumnSearch().getColumnSearchProps('description'),
      render: (text) => <a>{text}</a>,
      width: '25%'
    },
    {
      title: 'Giá trị',
      dataIndex: 'discount',
      key: 'discount',
      sorter: (a, b) => a.discount - b.discount,
      width: '20%'
    },
    {
      title: 'Số điểm đổi',
      dataIndex: 'exchangePoint',
      key: 'exchangePoint',
      sorter: (a, b) => a.exchangePoint - b.exchangePoint,
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

export default PromotionPage
