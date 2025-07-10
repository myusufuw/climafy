import type { ForecastData } from '@/api/types'
import moment from 'moment'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { ArrowDown, ArrowUp, Droplets, Wind } from 'lucide-react'

type DailyForecast = {
  date: number
  temp_min: number
  temp_max: number
  humidity: number
  wind: number
  weather: {
    id: number
    main: string
    description: string
    icon: string
  }
}

const WeatherForecast = ({ data }: { data: ForecastData }) => {
  const getDailyForecast = data.list.reduce((acc, item) => {
    const date = moment(item.dt_txt).format('YYYY-MM-DD')

    if (!acc[date]) {
      acc[date] = {
        temp_min: item.main.temp_min,
        temp_max: item.main.temp_max,
        weather: item.weather[0],
        humidity: item.main.humidity,
        wind: item.wind.speed,
        date: item.dt
      }
    } else {
      acc[date].temp_min = Math.min(acc[date].temp_min, item.main.temp_min)
      acc[date].temp_max = Math.max(acc[date].temp_max, item.main.temp_max)
    }

    return acc
  }, {} as Record<string, DailyForecast>)

  const fiveDayForecast = Object.values(getDailyForecast).slice(1, 6)
  const formatTemp = (temp: number) => `${Math.round(temp)}°`

  return (
    <Card>
      <CardHeader>
        <CardTitle>5-Day Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='grid gap-4'>
          {fiveDayForecast.map((day) => (
            <div
              key={day.date}
              className='grid grid-cols-3 items-center gap-4 rounded-lg border border-sidebar-border p-4 bg-white/50 dark:bg-black/10'
            >
              <div>
                <p className='font-medium'>
                  {moment(new Date(day.date * 1000)).format('ddd, MMM DD')}
                </p>
                <p className='text-sm text-muted-foreground capitalize'>
                  {day.weather.description}
                </p>
              </div>

              <div className='flex justify-center gap-4'>
                <span className='flex items-center text-blue-500'>
                  <ArrowDown className='mr-1 h-4 w-4' />
                  {formatTemp(day.temp_min)}
                </span>
                <span className='flex items-center text-red-500'>
                  <ArrowUp className='mr-1 h-4 w-4' />
                  {formatTemp(day.temp_max)}
                </span>
              </div>

              <div className='flex justify-end gap-4'>
                <span className='flex items-center gap-1'>
                  <Droplets className='h-4 w-4 text-green-500' />
                  <span className='text-sm'>{day.humidity}%</span>
                </span>
                <span className='flex items-center gap-1'>
                  <Wind className='h-4 w-4 text-blue-500' />
                  <span className='text-sm'>{day.wind}m/s</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default WeatherForecast
