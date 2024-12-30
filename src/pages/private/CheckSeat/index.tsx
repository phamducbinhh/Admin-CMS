import useColumnSearch from '@/hooks/useColumnSearch'
import { useQueryCheckSeatAvailable } from '@/queries/vehicle'
import renderWithLoading from '@/utils/renderWithLoading'
import { Button, Col, DatePicker, Form, Row, Table, TableProps } from 'antd'
import dayjs from 'dayjs'
import React from 'react'

const CheckSeatPage = () => {
  const [form] = Form.useForm()
  const [queryParams, setQueryParams] = React.useState({
    checkDate: ''
  })

  const { data, isLoading, refetch } = useQueryCheckSeatAvailable(queryParams)

  //   console.log(data)

  const dataSource = data?.map((item: any) => ({
    ...item,
    key: item.id || `${item.description}-${item.licensePlate}-${item.dateIncurred}`
  }))

  const columns: TableProps<any>['columns'] = [
    {
      title: 'Thời gian',
      dataIndex: 'dateTime',
      key: 'dateTime',
      align: 'center',
      sorter: (a, b) => Date.parse(a.dateTime) - Date.parse(b.dateTime),
      width: '20%'
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      ...useColumnSearch().getColumnSearchProps('description'),
      render: (text) => <a>{text}</a>,
      align: 'center',
      width: '20%'
    },
    {
      title: 'Biển số xe',
      dataIndex: 'licensePlate',
      key: 'licensePlate',
      ...useColumnSearch().getColumnSearchProps('licensePlate'),
      render: (text) => <a>{text}</a>,
      align: 'center',
      width: '20%'
    },
    {
      title: 'Số ghế ngồi',
      dataIndex: 'numberSeat',
      key: 'numberSeat',
      width: '15%',
      align: 'center'
    },
    {
      title: 'Số ghế ngồi khả dụng',
      dataIndex: 'numberAvaliable',
      key: 'numberAvaliable',
      width: '15%',
      align: 'center'
    },
    {
      title: 'Số ghế ngồi không khả dụng',
      dataIndex: 'numberInvaliable',
      key: 'numberInvaliable',
      width: '15%',
      align: 'center'
    }
  ]

  const onFinish = async (values: any) => {
    try {
      const formattedValues = {
        ...values,
        checkDate: values.checkDate === null ? '' : dayjs(values.checkDate).format('YYYY-MM-DD')
      }
      // Update the query parameters
      setQueryParams(formattedValues)

      // Refetch the query with updated parameters
      await refetch()

      console.log('Fetched Data:', data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  return (
    <>
      {renderWithLoading({
        isLoading,
        content: (
          <>
            <Form onFinish={onFinish} layout='horizontal' form={form}>
              <Row gutter={16}>
                <Col span={4}>
                  <Form.Item label='Date' name='checkDate'>
                    <DatePicker format='DD-MM-YYYY' />
                  </Form.Item>
                </Col>
                <Col span={1}>
                  <Button htmlType='submit' type='primary'>
                    Tìm
                  </Button>
                </Col>
              </Row>
            </Form>
            <Table columns={columns} dataSource={dataSource} />
          </>
        )
      })}
    </>
  )
}

export default CheckSeatPage
