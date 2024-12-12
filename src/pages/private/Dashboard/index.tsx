import { formatPrize } from '@/helpers'
import { useQueryRevenue } from '@/queries/revenue'
import renderWithLoading from '@/utils/renderWithLoading'
import React from 'react'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const DashBoardChartPage: React.FC = () => {
  const { data, isLoading } = useQueryRevenue()

  const revenueTicketData = data?.revenueTicketDTOs[0]?.listTicket || []

  // Chuyển đổi dữ liệu để phù hợp với biểu đồ
  const revenueTicketChartData = revenueTicketData.map((item: any) => ({
    name: item.vehicleOwner || 'Unknown',
    price: item.pricePromotion || 0
  }))

  return (
    <>
      {renderWithLoading({
        isLoading,
        content: (
          <div>
            <h4 style={{ fontSize: 24, marginBottom: 30 }}>Dashboard</h4>
            <ResponsiveContainer width='100%' height={400}>
              <BarChart data={revenueTicketChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='name' />
                <YAxis />
                <Tooltip formatter={(value: number) => formatPrize(value)} />
                <Legend />
                <Bar dataKey='price' fill='#82ca9d' name='Price Promotion' />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )
      })}
    </>
  )
}

export default DashBoardChartPage
