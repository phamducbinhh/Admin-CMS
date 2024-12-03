import { useQueryTrips } from '../../../queries/trip'

export default function TripsPages(): JSX.Element {
  const { data } = useQueryTrips()

  console.log(data)

  return <div>Trips Pages</div>
}
