export const generateColumn = (
  field: string,
  title: string,
  options: {
    searchable?: boolean
    getColumnSearchProps?: (dataIndex: string) => any
    formatter?: (value: any) => any
    align?: string
    width?: string
  } = {}
) => {
  const { searchable, getColumnSearchProps, formatter, align = 'center', width = '20%' } = options

  return {
    title,
    dataIndex: field,
    key: field,
    align,
    width,
    ...(searchable && getColumnSearchProps ? getColumnSearchProps(field) : {}),
    render: (text: any) => {
      if (formatter) return <span>{formatter(text)}</span>
      return <span>{text === null || text === undefined ? '(Không)' : text}</span>
    }
  }
}
