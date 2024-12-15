import React, { useState, useEffect } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { Form, Upload, Image, message } from 'antd'
import type { GetProp, UploadFile, UploadProps } from 'antd'
import { addWebImageLink } from '@/utils/showImage'

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })

interface Props {
  fieldName: string
  initialImage?: string | null
  form: any
  addWebImageLink?: (url: string) => string
  setFileList?: (fileList: any[]) => void
}

const UploadComponent: React.FC<Props> = ({ initialImage, form, fieldName }) => {
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [fileList, setFileList] = useState<UploadFile[]>([])

  useEffect(() => {
    if (initialImage) {
      const fullImageUrl = addWebImageLink(initialImage)
      setFileList([
        {
          uid: '-1',
          name: 'Uploaded Image',
          status: 'done',
          url: fullImageUrl
        }
      ])
      form.setFieldsValue({ [fieldName]: fullImageUrl }) // Set initial value in parent form
    }
  }, [initialImage, form, fieldName])

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType)
    }
    setPreviewImage(file.url || (file.preview as string))
    setPreviewOpen(true)
  }

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList)

    const lastFile = newFileList[newFileList.length - 1]

    if (lastFile) {
      message.success('Image uploaded successfully')
      // Update the parent form field
      form.setFieldsValue({
        [fieldName]: lastFile?.originFileObj
      })
    }
  }

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type='button'>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  )

  return (
    <Form.Item
      name={fieldName}
      initialValue={initialImage}
      getValueFromEvent={({ fileList }: { fileList: UploadFile[] }) => fileList}
    >
      <div>
        <Upload
          listType='picture-card'
          fileList={fileList} // Manage fileList here
          beforeUpload={() => false} // Prevent automatic upload
          onPreview={handlePreview}
          onChange={handleChange}
        >
          {fileList.length >= 1 ? null : uploadButton}
        </Upload>

        {previewImage && (
          <Image
            wrapperStyle={{ display: 'none' }}
            preview={{
              visible: previewOpen,
              onVisibleChange: (visible) => setPreviewOpen(visible),
              afterOpenChange: (visible) => !visible && setPreviewImage('')
            }}
            src={previewImage}
          />
        )}
      </div>
    </Form.Item>
  )
}

export default UploadComponent
