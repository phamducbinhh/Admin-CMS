import { ActionType, ActionTypeDescriptions, RoleType } from '@/enums/enum'
import useColumnSearch from '@/hooks/useColumnSearch'
import { useQueryRequest } from '@/queries/request'
import { useLocalStorage } from '@/utils/localStorage/localStorageService'
import renderWithLoading from '@/utils/renderWithLoading'
import { PlusOutlined } from '@ant-design/icons'
import type { TableProps } from 'antd'
import { Button, Popconfirm, Space, Table } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

interface DataType {
  key: string
  id: string | number
  description: string
  note: string
  userName: number
  typeId: string | number
}

const RequestPage: React.FC = () => {
  const { data, isLoading } = useQueryRequest()
  const role = useLocalStorage.getLocalStorageData('role')

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
      width: '10%'
    },
    {
      title: 'Tên',
      dataIndex: 'userName',
      key: 'userName',
      align: 'center',
      width: '20%',
      ...useColumnSearch().getColumnSearchProps('userName')
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      align: 'center',
      ...useColumnSearch().getColumnSearchProps('description'),
      render: (text) => <a>{text}</a>,
      width: '25%'
    },
    {
      title: 'Trạng thái',
      dataIndex: 'note',
      key: 'note',
      align: 'center',
      width: '20%'
    },
    {
      title: 'Type',
      dataIndex: 'typeId',
      key: 'typeId',
      align: 'center',
      width: '20%',
      render: (type: ActionType) => <span>{ActionTypeDescriptions[type]}</span>,
      filters: Object.entries(ActionTypeDescriptions).map(([key, value]) => ({
        text: value,
        value: Number(key)
      })),
      onFilter: (value, record) => record.typeId === value
    },
    {
      title: <div style={{ textAlign: 'center' }}>Action</div>,
      key: 'action',
      render: (_, record) => (
        <Space size='middle'>
          {record.typeId !== 3 && (
            <Link to={`details?id=${record.id}`}>
              <Button type='primary'>Show</Button>
            </Link>
          )}
          <Popconfirm title='Bạn có chắc chắn muốn xóa yêu cầu này không?' okText='Yes' cancelText='No'>
            <Button type='primary' danger>
              Delete
            </Button>
          </Popconfirm>
          {record.typeId === 3 && (
            <Popconfirm title='Bạn có chắc chắn muốn hủy yêu cầu này không?' okText='Xác nhận' cancelText='Hủy'>
              <Button type='default'>Cancel</Button>
            </Popconfirm>
          )}
        </Space>
      )
    }
  ]
  // Add `key` to each record if not present
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
            {role && role === RoleType.DRIVER && (
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
                <Link to='add'>
                  <Button type='primary' icon={<PlusOutlined />} ghost>
                    Thuê xe
                  </Button>
                </Link>
              </div>
            )}
            <Table columns={columns} dataSource={dataSource} />
          </>
        )
      })}
    </>
  )
}
export default RequestPage
