import type { WeatherData } from '@/api/types'
import { Compass, Gauge, Sunrise, Sunset } from 'lucide-react'
import moment from 'moment'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

const WeatherDetails = ({ data }: { data: WeatherData }) => {
  const { wind, main, sys } = data

  const formatTime = (timestamp: number) => {
    return moment(new Date(timestamp * 1000)).format('HH:mm')
  }

  const getWindDirection = (degree: number) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
    const index =
      Math.round(((degree %= 360) < 0 ? degree + 360 : degree) / 45) % 8
    return directions[index]
  }

  const details = [
    {
      title: 'Sunrise',
      value: formatTime(sys.sunrise),
      icon: Sunrise,
      color: 'text-yellow-500'
    },
    {
      title: 'Sunset',
      value: formatTime(sys.sunset),
      icon: Sunset,
      color: 'text-orange-500'
    },
    {
      title: 'Wind Direction',
      value: `${getWindDirection(wind.deg)} (${wind.deg}°)`,
      icon: Compass,
      color: 'text-blue-500'
    },
    {
      title: 'Pressure',
      value: `${main.pressure} hPa`,
      icon: Gauge,
      color: 'text-purple-500'
    }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weather Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='grid gap-6 sm:grid-cols-2'>
          {details.map((detail) => (
            <div
              key={detail.title}
              className='flex items-center gap-3 rounded-lg border p-4 bg-white/50 dark:bg-black/10'
            >
              <detail.icon className={`h-5 w-5 ${detail.color}`} />
              <div>
                <p className='text-sm font-medium leading-none'>
                  {detail.title}
                </p>
                <p className='text-sm text-muted-foreground'>{detail.value}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default WeatherDetails
