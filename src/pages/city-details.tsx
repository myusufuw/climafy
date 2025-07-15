import CurrentWeather from '@/components/current-weather'
import HourlyTemperature from '@/components/hourly-temperature'
import WeatherSkeleton from '@/components/loading-skeleton'
import { Alert, AlertDescription } from '@/components/ui/alert'
import WeatherDetails from '@/components/weather-details'
import WeatherForecast from '@/components/weather-forecast'
import { useForecastQuery, useWeatherQuery } from '@/hooks/use-weather'
import { AlertTriangle } from 'lucide-react'
import { useParams, useSearchParams } from 'react-router-dom'

const CityDetails = () => {
  const [searchParams] = useSearchParams()
  const { cityName } = useParams()

  const lat = parseFloat(searchParams.get('lat') || '0')
  const lon = parseFloat(searchParams.get('lon') || '0')

  const coordinates = { lat, lon }

  const { data: wetaherData, error: weatherError } =
    useWeatherQuery(coordinates)

  const { data: forecastData, error: forecastError } =
    useForecastQuery(coordinates)

  if (weatherError || forecastError) {
    return (
      <Alert variant='destructive'>
        <AlertTriangle className='h-4 w-4' />
        <AlertDescription>
          Failed to load weather data. Please try again.
        </AlertDescription>
      </Alert>
    )
  }

  if (!wetaherData || !forecastData || !cityName) {
    return <WeatherSkeleton />
  }

  return (
    <div className='space-y-4'>
      {/* FAVORITE CITIES */}
      <h1 className='text-3xl font-bold tracking-tight'>
        {cityName}, {wetaherData.sys.country}
      </h1>

      {/* CONTENTS */}
      <div className='grid gap-6'>
        <div className='flex flex-col lg:flex-row gap-6'>
          {/* CURRENT WEATHER */}
          <CurrentWeather data={wetaherData} />

          {/* HOURLY TEMPERATURE */}
          <HourlyTemperature data={forecastData} />
        </div>

        <div className='grid gap-6 md:grid-cols-2 items-start'>
          {/* WEATHER DETAILS */}
          <WeatherDetails data={wetaherData} />

          {/* WEATHER FORECAST */}
          <WeatherForecast data={forecastData} />
        </div>
      </div>
    </div>
  )
}

export default CityDetails
