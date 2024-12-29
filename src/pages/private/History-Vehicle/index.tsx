import { formatPrize, formatTime } from '@/helpers'
import useColumnSearch from '@/hooks/useColumnSearch'
import { useTableWithTotal } from '@/hooks/useTableWithTotal'
import { useQueryHistoryRentVehicle } from '@/queries/history'
import { handlingTsUndefined } from '@/utils/handlingTsUndefined'
import renderWithLoading from '@/utils/renderWithLoading'
import { SearchOutlined } from '@ant-design/icons'
import { Button, DatePicker, Table, TableProps } from 'antd'
import dayjs from 'dayjs'

interface DataType {
  key: string
  vehiclevehiclePrice: number
  driverName: string
  timeEnd: number
  vehiclePrice: number
  vehicleOwner: string
  timeStart: string // ISO string for date-time
  endStart: string // ISO string for date-time
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
      sorter: (a, b) => new Date(a.timeStart).getTime() - new Date(b.timeStart).getTime(),
      filterDropdown: ({ setSelectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <DatePicker
            onChange={(date, dateString: any) => {
              if (date) {
                setSelectedKeys([dateString])
              } else {
                setSelectedKeys([])
              }
            }}
            format='YYYY-MM-DD'
            style={{ marginBottom: 8, display: 'block' }}
          />
          <div>
            <Button
              type='primary'
              onClick={confirm as any}
              icon={<SearchOutlined />}
              size='small'
              style={{ width: 90, marginRight: 8 }}
            >
              Search
            </Button>
            <Button onClick={clearFilters as any} size='small' style={{ width: 90 }}>
              Reset
            </Button>
          </div>
        </div>
      ),
      onFilter: (value, record) => {
        if (value) {
          const recordDate = dayjs(record.timeStart)
          return recordDate.isSame(dayjs(value as string), 'day')
        }
        return false
      },
      render: (text) => <span>{formatTime(text)}</span>
    },
    {
      title: 'Thời gian kết thúc',
      dataIndex: 'endStart',
      key: 'endStart',
      align: 'center',
      sorter: (a, b) => new Date(a.endStart).getTime() - new Date(b.endStart).getTime(),
      filterDropdown: ({ setSelectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <DatePicker
            onChange={(date, dateString: any) => {
              if (date) {
                setSelectedKeys([dateString])
              } else {
                setSelectedKeys([])
              }
            }}
            format='YYYY-MM-DD'
            style={{ marginBottom: 8, display: 'block' }}
          />
          <div>
            <Button
              type='primary'
              onClick={confirm as any}
              icon={<SearchOutlined />}
              size='small'
              style={{ width: 90, marginRight: 8 }}
            >
              Search
            </Button>
            <Button onClick={clearFilters as any} size='small' style={{ width: 90 }}>
              Reset
            </Button>
          </div>
        </div>
      ),
      onFilter: (value, record) => {
        if (value) {
          const recordDate = dayjs(record.endStart)
          return recordDate.isSame(dayjs(value as string), 'day')
        }
        return false
      },
      render: (text) => <span>{formatTime(text)}</span>
    }
  ]

  const { totalPrice, tableProps } = useTableWithTotal({
    data: data || [],
    columns,
    priceKey: 'vehiclePrice' // Specify the price key which is exist in columns table
  })

  return (
    <>
      {renderWithLoading({
        isLoading,
        content: (
          <>
            <Table {...tableProps} />
            <p>Total: {formatPrize(totalPrice)}</p>
          </>
        )
      })}
    </>
  )
}

export default HistoryRentVehiclePage
