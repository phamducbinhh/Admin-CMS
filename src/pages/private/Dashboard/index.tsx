import { formatPrize } from '@/helpers'
import { useQueryRevenue } from '@/queries/revenue'
import renderWithLoading from '@/utils/renderWithLoading'
import React from 'react'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const DashBoardChartPage: React.FC = () => {
  const { data, isLoading } = useQueryRevenue()

  const revenueTicketData = data?.revenueTicketDTOs[0]?.listTicket || []
  const totalLossCosts = data?.totalLossCosts[0]?.listLossCostVehicle || []
  const rentDriverData = data?.totalPayementRentDrivers[0]?.paymentRentDriverDTOs || []
  const rentVehicleData = data?.totalPaymentRentVehicleDTOs[0]?.paymentRentVehicelDTOs || []

  const revenueTicketChartData: { name: string; price: number }[] = revenueTicketData
    .map((item: any) => ({
      name: item.vehicleOwner || 'Unknown',
      price: item.pricePromotion || 0
    }))
    .sort((a: any, b: any) => b.price - a.price)
    .slice(0, 10)

  const totalLossCostsData = totalLossCosts.map((item: any) => ({
    name: item.vehicleOwner || 'Unknown',
    price: item.price || 0
  }))

  const rentDriverChartData = rentDriverData.map((item: any) => ({
    name: item.driverName || 'Unknown',
    price: item.price || 0
  }))

  const rentVehicleChartData = rentVehicleData.map((item: any) => ({
    name: item.driverName || 'Unknown',
    price: item.price || 0
  }))

  const chartStyle = {
    marginBottom: 40
  }

  const renderChart = (data: any[], barColor: string, title: string) => (
    <div style={chartStyle}>
      <h4 style={{ textAlign: 'center', fontSize: 20, marginBottom: 20 }}>{title}</h4>
      <ResponsiveContainer width='100%' height={400}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis
            dataKey='name'
            tick={{ fontSize: 12 }}
            label={{ position: 'insideBottom', offset: -10, fontSize: 14 }}
          />
          <YAxis
            tick={{ fontSize: 12 }}
            label={{
              angle: -90,
              position: 'insideLeft',
              offset: 0,
              fontSize: 14
            }}
          />
          <Tooltip
            formatter={(value: number) => formatPrize(value)}
            contentStyle={{
              backgroundColor: '#f4f4f4',
              border: '1px solid #ddd',
              borderRadius: 8,
              fontSize: 12
            }}
          />
          <Legend
            wrapperStyle={{
              paddingTop: 10,
              fontSize: 12
            }}
          />
          <Bar dataKey='price' fill={barColor} barSize={40} radius={[10, 10, 0, 0]} name='Price' />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )

  return (
    <>
      {renderWithLoading({
        isLoading,
        content: (
          <div style={{ padding: 20, backgroundColor: '#f9f9f9', borderRadius: 10 }}>
            <h2
              style={{
                textAlign: 'center',
                fontSize: 28,
                marginBottom: 50,
                fontWeight: 'bold',
                color: '#333'
              }}
            >
              Dashboard
            </h2>
            {renderChart(revenueTicketChartData, '#4A90E2', 'Revenue Ticket')}
            {renderChart(rentDriverChartData, '#50C878', 'Rent Driver')}
            {renderChart(rentVehicleChartData, '#FF7F50', 'Rent Vehicle')}
            {renderChart(totalLossCostsData, '#FF4500', 'Total Loss Costs')}
          </div>
        )
      })}
    </>
  )
}

export default DashBoardChartPage
