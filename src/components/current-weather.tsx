import type { GeocodingResponse, WeatherData } from '@/api/types'
import { Card, CardContent } from './ui/card'
import {
  ArrowDown,
  ArrowUp,
  Droplets,
  Sunrise,
  Sunset,
  Wind
} from 'lucide-react'
import clsx from 'clsx'

type CurrentWeatherProps = {
  data: WeatherData
  locationName?: GeocodingResponse | null
}

const CurrentWeather = ({ data, locationName }: CurrentWeatherProps) => {
  const {
    weather: [currentWeather],
    main: { temp, feels_like, humidity, temp_max, temp_min },
    wind: { speed },
    sys: { sunrise, sunset }
  } = data
  console.log(data)

  const formatTemp = (temp: number) => `${Math.round(temp)}°`

  const weatherListInformations = [
    {
      icon: Droplets,
      title: 'Humidity',
      value: `${humidity}%`,
      color: 'text-green-500'
    },
    {
      icon: Wind,
      title: 'Wind Speed',
      value: `${speed} m/s`,
      color: 'text-blue-500'
    },
    {
      icon: Sunrise,
      title: 'Sunrise',
      value: new Date(sunrise * 1000).toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: false
      }),
      color: 'text-yellow-500'
    },
    {
      icon: Sunset,
      title: 'Sunset',
      value: new Date(sunset * 1000).toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: false
      }),
      color: 'text-orange-500'
    }
  ]

  return (
    <Card className='overflow-hidden bg-white/50 dark:bg-black/20 backdrop-blur-lg border border-white/20 dark:border-white/10 shadow-md'>
      <CardContent className='p-6'>
        <div className='grid gap-6 md:grid-cols-2'>
          {/* LEFT CONTENT */}
          <div className='space-y-4'>
            {/* LOCATION NAME */}
            <div className='space-y-2'>
              <div className='flex items-center'>
                <h2 className='text-2xl font-bold tracking-tight'>
                  {locationName?.name}
                </h2>
                {locationName?.state && (
                  <span className='text-muted-foreground'>
                    , {locationName.state}
                  </span>
                )}
              </div>
              <p className='text-sm text-muted-foreground'>
                {locationName?.country}
              </p>
            </div>

            {/* TEMPERATURE */}
            <div className='flex items-center gap-4'>
              <p className='text-7xl font-bold tracking-tighter'>
                {formatTemp(temp)}
              </p>
              <div className='space-y-1'>
                <p className='text-sm font-medium text-muted-foreground'>
                  Feels like {formatTemp(feels_like)}
                </p>
                <div className='flex gap-2 text-sm font-medium'>
                  <span className='flex items-center gap-1 text-blue-500'>
                    <ArrowDown className='h-3 w-3' />
                    {formatTemp(temp_min)}
                  </span>
                  <span className='flex items-center gap-1 text-red-500'>
                    <ArrowUp className='h-3 w-3' />
                    {formatTemp(temp_max)}
                  </span>
                </div>
              </div>
            </div>

            {/* DETAILS */}
            <div className='grid grid-cols-2 gap-4'>
              {weatherListInformations.map((item, index) => (
                <div className='flex items-center gap-2' key={index}>
                  <item.icon className={clsx(item.color, 'h-4 w-4')} />
                  <div className='space-y-0.5'>
                    <p className='text-sm font-medium'>{item.title}</p>
                    <p className='text-sm text-muted-foreground'>
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className='flex items-center justify-center'>
            <div className='relative flex aspect-square w-full max-w-[200px] items-center justify-center'>
              <img
                src={`https://openweathermap.org/img/wn/${currentWeather.icon}@4x.png`}
                alt={currentWeather.description}
                className='h-full w-full object-contain'
              />
              <div className='absolute bottom-0 text-center'>
                <p className='text-sm font-medium capitalize'>
                  {currentWeather.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default CurrentWeather
