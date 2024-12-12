import React, { useState } from 'react'
import { Button, message, Table } from 'antd'

// import { useAddVehiclesFromExcelMutation, useImportExcel } from '@/queries/vehicle'

import { HttpStatusCode } from 'axios'
// import { useNavigate } from 'react-router-dom'
import { useImportExcel } from '@/queries/trip'
import { processResponseData } from '@/utils/excelColumnDynamic'
import DownloadExcel from '@/components/Excel/DownloadExcel'

const ExcelTripPage = () => {
  const [selectedOption, setSelectedOption] = useState('1')
  const [exportedFile, setExportedFile] = useState(true)
  const [fileName, setFileName] = useState('')
  const [data, setData] = useState({
    showValidEntries: [],
    showInvalidEntries: [],
    hasData: false,
    validEntries: [],
    invalidEntries: []
  })
  const addMutation = useImportExcel()
  // const importVehicleFromExcelMutation = useAddVehiclesFromExcelMutation()
  // const navigate = useNavigate()

  const [columns, setColumns] = useState<any[]>([])

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    const formData = new FormData()
    formData.append('fileExcelTrip', file)

    event.target.value = ''

    setFileName(file.name)

    try {
      const response = await addMutation.mutateAsync({ id: selectedOption, body: formData })
      if (response.status === HttpStatusCode.Ok) {
        message.success('File uploaded successfully')

        const validData = processResponseData(response.data.validEntries)
        const inValidData = processResponseData(response.data.invalidEntries)

        setData({
          hasData: true,
          showValidEntries: validData.entries,
          showInvalidEntries: inValidData.entries,
          validEntries: response.data.validEntries,
          invalidEntries: response.data.invalidEntries
          // invalidEntries: response.data.invalidEntries.map((item: any, index: any) => ({
          //   ...item,
          //   key: index
          // }))
        })
        setColumns(validData.updatedColumns)
      } else {
        message.error(response)
      }
    } catch (error) {
      console.error('Error:', error)
      message.error('Upload failed')
    }
  }

  const handleImportToVehicleList = async () => {
    // console.log(data.validEntries)
    try {
      // const values = data.validEntries

      // const response = await importVehicleFromExcelMutation.mutateAsync(values)
      // if (response.status === HttpStatusCode.Ok) {
      //   message.success('Add successfully')
      //   navigate('/vehicles')
      // } else {
      //   message.error('Add failed')
      // }
      console.log('ok')
    } catch (error) {
      console.error('Error values:', error)
    }
  }

  console.log(data.invalidEntries)

  return (
    <div>
      <DownloadExcel
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        exportedFile={exportedFile}
        setExportedFile={setExportedFile}
      />
      {/* File Upload */}
      {exportedFile && (
        <>
          <input
            type='file'
            id='file-input'
            style={{ display: 'none' }} // Hide the input
            onChange={handleFileUpload}
            accept='.xlsx, .xls'
          />
          <label
            htmlFor='file-input'
            style={{
              cursor: 'pointer',
              padding: '10px',
              background: '#4CAF50',
              color: 'white',
              borderRadius: '5px',
              marginBottom: '10px',
              display: 'inline-block'
            }}
          >
            {fileName ? fileName : 'Choose a file'}
          </label>
        </>
      )}

      <div style={{ marginTop: 20 }}>
        {data.showValidEntries.length > 0 && (
          <>
            <h2 style={{ marginBottom: 20 }}>Valid Data</h2>
            <Table
              columns={columns}
              dataSource={data.showValidEntries}
              bordered
              pagination={{ pageSize: 5 }}
              scroll={{ x: 400 }}
            />
          </>
        )}

        {data.showInvalidEntries.length > 0 && (
          <>
            <h2 style={{ fontSize: 24, marginBottom: 20 }}>Invalid Data</h2>
            <Table columns={columns} dataSource={data.showInvalidEntries} bordered pagination={{ pageSize: 5 }} />
            <div>
              {data.invalidEntries.map((entry: any, index) =>
                entry.errorMessages.length > 0 ? (
                  <p style={{ marginBottom: 20 }} key={index}>
                    {entry.errorMessages}
                  </p>
                ) : null
              )}
            </div>
          </>
        )}
      </div>

      {data.hasData && data.invalidEntries.length === 0 && (
        <Button onClick={() => handleImportToVehicleList()}>Import to Trip List</Button>
      )}
    </div>
  )
}

export default ExcelTripPage
