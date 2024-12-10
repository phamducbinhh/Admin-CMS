import React from 'react'
import { Table } from 'antd'
import { useQueryRevenue } from '@/queries/revenue'
import useColumnSearch from '@/hooks/useColumnSearch'
import renderWithLoading from '@/utils/renderWithLoading'
import { generateColumn } from '@/utils/tableColumns'
import { formatDate, formatPrize } from '@/helpers'

const RevenuePage: React.FC = () => {
  const { data, isLoading } = useQueryRevenue()
  const { getColumnSearchProps } = useColumnSearch()

  const revenueTicketData = data?.revenueTicketDTOs[0]?.listTicket || []
  const totalLossCosts = data?.totalLossCosts[0]?.listLossCostVehicle || []

  const revenueTicketDataColumns = [
    generateColumn('pricePromotion', 'Price Promotion', {
      formatter: formatPrize,
      width: '10%'
    }),
    generateColumn('vehicleOwner', 'Vehicle Owner', { width: '25%' }),
    generateColumn('liscenseVehicle', 'Liscense Vehicle', {
      searchable: true,
      getColumnSearchProps,
      width: '25%'
    }),
    generateColumn('typeOfTicket', 'Type Of Ticket', { width: '25%' }),
    generateColumn('typeOfPayment', 'Type Of Payment', { width: '25%' })
  ]

  const lossCostDataColumns = [
    generateColumn('licensePlate', 'Liscense Vehicle', {
      searchable: true,
      getColumnSearchProps
    }),
    generateColumn('vehicleOwner', 'Vehicle Owner'),
    generateColumn('lossCostType', 'Lost Cost Type'),
    generateColumn('price', 'Price', { formatter: formatPrize }),
    generateColumn('dateIncurred', 'Date', { formatter: formatDate }),
    generateColumn('description', 'Description')
  ]

  const revenueTicketSource = revenueTicketData.map((item: any) => ({
    ...item,
    key: item.id || item.someUniqueField
  }))

  return (
    <>
      {renderWithLoading({
        isLoading,
        content: (
          <>
            <div>
              <h4 style={{ fontSize: 24, marginBottom: 30 }}>Ticket</h4>
              <Table columns={revenueTicketDataColumns} dataSource={revenueTicketSource} />
            </div>
            <div>
              <h4 style={{ fontSize: 24, marginBottom: 30 }}>Lost Cost</h4>
              <Table columns={lossCostDataColumns} dataSource={totalLossCosts} />
            </div>
          </>
        )
      })}
    </>
  )
}

export default RevenuePage
