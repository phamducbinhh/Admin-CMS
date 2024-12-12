import { formatPrize, formatTime } from '@/helpers'
import useColumnSearch from '@/hooks/useColumnSearch'
import { useQueryHistoryRentVehicle } from '@/queries/history'
import { handlingTsUndefined } from '@/utils/handlingTsUndefined'
import renderWithLoading from '@/utils/renderWithLoading'
import { Table, TableProps } from 'antd'
import React from 'react'

interface DataType {
  key: string
  vehiclePrice: number
  driverName: string
  timeStart: number
  timeEnd: number
  price: number
  carOwner: string
}

const HistoryRentVehiclePage: React.FC = () => {
  const { data, isLoading } = useQueryHistoryRentVehicle()

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Tên tài xế',
      dataIndex: 'driverName',
      key: 'driverName',
      align: 'center',
      ...useColumnSearch().getColumnSearchProps('driverName'),
      width: '20%'
    },
    {
      title: 'Giá xe',
      dataIndex: 'price',
      key: 'price',
      align: 'center',
      render: (text) => <span>{formatPrize(text)}</span>,
      sorter: (a, b) => handlingTsUndefined(a.price) - handlingTsUndefined(b.price),
      width: '20%'
    },
    {
      title: 'Chủ xe',
      dataIndex: 'carOwner',
      key: 'carOwner',
      align: 'center',
      ...useColumnSearch().getColumnSearchProps('carOwner'),
      render: (text) => <span>{text ?? 'null'}</span>,
      width: '20%'
    },
    {
      title: 'Thời gian bắt đầu',
      dataIndex: 'createdAt',
      key: 'createdAt',
      align: 'center',
      render: (date) => <span>{formatTime(date) ?? 'null'}</span>,
      width: '20%'
    },
    {
      title: 'Biển số xe',
      dataIndex: 'licenseVehicle',
      key: 'licenseVehicle',
      align: 'center',
      ...useColumnSearch().getColumnSearchProps('licenseVehicle'),
      width: '20%'
    }
  ]
  const dataSource = data?.paymentRentVehicelDTOs?.map((item: any) => ({
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
            <div>
              Total : <span style={{ fontSize: 20 }}>{formatPrize(data?.total)}</span>
            </div>
          </>
        )
      })}
    </>
  )
}

export default HistoryRentVehiclePage
