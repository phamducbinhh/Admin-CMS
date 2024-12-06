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
  vehicleOwner: string
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
      dataIndex: 'vehiclePrice',
      key: 'vehiclePrice',
      align: 'center',
      render: (text) => <span>{formatPrize(text)}</span>,
      sorter: (a, b) => handlingTsUndefined(a.vehiclePrice) - handlingTsUndefined(b.vehiclePrice),
      width: '20%'
    },
    {
      title: 'Chủ xe',
      dataIndex: 'vehicleOwner',
      key: 'vehicleOwner',
      align: 'center',
      ...useColumnSearch().getColumnSearchProps('vehicleOwner'),
      render: (text) => <span>{text ?? 'null'}</span>,
      width: '20%'
    },
    {
      title: 'Thời gian bắt đầu',
      dataIndex: 'timeStart',
      key: 'timeStart',
      align: 'center',
      render: (date) => <span>{formatTime(date) ?? 'null'}</span>,
      width: '20%'
    },
    {
      title: 'Thời gian kết thúc',
      dataIndex: 'endStart',
      key: 'endStart',
      align: 'center',
      render: (date) => <span>{formatTime(date) ?? 'null'}</span>,
      width: '20%'
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

export default HistoryRentVehiclePage
