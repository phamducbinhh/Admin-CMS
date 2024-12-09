import { useSearchParams } from 'react-router-dom'
import AddVehicleForm from './type_1'
import { useQueryRequestDetails } from '@/queries/request'

const DetailsRequestPage: React.FC = () => {
  const [searchParams] = useSearchParams()

  const requestID = searchParams.get('id')

  const { data, refetch } = useQueryRequestDetails({ id: requestID })

  return <AddVehicleForm data={data} refetch={refetch} typeId={requestID} />
}

export default DetailsRequestPage
