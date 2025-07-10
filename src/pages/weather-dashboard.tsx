import CurrentWeather from '@/components/current-weather'
import HourlyTemperature from '@/components/hourly-temperature'
import WeatherSkeleton from '@/components/loading-skeleton'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import WeatherDetails from '@/components/weather-details'
import WeatherForecast from '@/components/weather-forecast'
import { useGeolocation } from '@/hooks/use-geolocation'
import {
  useForecastQuery,
  useReverseGeocodeQuery,
  useWeatherQuery
} from '@/hooks/use-weather'
import clsx from 'clsx'
import { AlertTriangle, MapPin, RefreshCw } from 'lucide-react'

const WeatherDashboard = () => {
  const {
    coordinates,
    error: locationError,
    isLoading: locationLoading,
    getLocation
  } = useGeolocation()

  const { data: locationData, refetch: refetchLocation } =
    useReverseGeocodeQuery(coordinates)

  const {
    data: wetaherData,
    refetch: refetchWeather,
    error: weatherError,
    isFetching: weatherIsFetching
  } = useWeatherQuery(coordinates)

  const {
    data: forecastData,
    refetch: refetchForecast,
    error: forecastError,
    isFetching: forecastIsFetching
  } = useForecastQuery(coordinates)

  const handleRefresh = () => {
    getLocation()

    if (coordinates) {
      // RELOAD WEATHER DATA
      refetchLocation()
      refetchWeather()
      refetchForecast()
    }
  }

  if (locationLoading) return <WeatherSkeleton />

  if (locationError)
    return (
      <Alert variant='destructive'>
        <AlertTriangle className='h-4 w-4' />
        <AlertTitle>Location Error</AlertTitle>
        <AlertDescription className='flex flex-col gap-4'>
          <p>{locationError}</p>
          <Button variant='outline' onClick={getLocation} className='w-fit'>
            <MapPin className='mr-2 h-4 w-4' />
            Enable Location
          </Button>
        </AlertDescription>
      </Alert>
    )

  if (!coordinates) {
    return (
      <Alert>
        <MapPin className='h-4 w-4' />
        <AlertTitle>Location Required</AlertTitle>
        <AlertDescription className='flex flex-col gap-4'>
          <p>Please enable location access to see your local weather.</p>
          <Button variant='outline' onClick={getLocation} className='w-fit'>
            <MapPin className='mr-2 h-4 w-4' />
            Enable Location
          </Button>
        </AlertDescription>
      </Alert>
    )
  }

  const locationName =
    locationData && locationData?.length > 0 ? locationData[0] : null

  if (weatherError || forecastError) {
    return (
      <Alert variant='destructive'>
        <AlertTriangle className='h-4 w-4' />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription className='flex flex-col gap-4'>
          <p>Failed to fetch weather data. Please try again.</p>
          <Button variant='outline' onClick={handleRefresh} className='w-fit'>
            <RefreshCw className='mr-2 h-4 w-4' />
            Retry
          </Button>
        </AlertDescription>
      </Alert>
    )
  }

  if (!wetaherData || !forecastData) {
    return <WeatherSkeleton />
  }

  return (
    <div className='space-y-4'>
      {/* FAVORITE CITIES */}
      <div className='flex items-center justify-between'>
        <h1 className='text-xl font-bold tracking-tight'>My Location</h1>
        <Button
          variant='outline'
          size='icon'
          onClick={handleRefresh}
          disabled={weatherIsFetching || forecastIsFetching}
        >
          <RefreshCw
            className={clsx('h-4 w-4', {
              'animate-spin': weatherIsFetching || forecastIsFetching
            })}
          />
        </Button>
      </div>

      {/* CONTENTS */}
      <div className='grid gap-6'>
        <div className='flex flex-col lg:flex-row gap-6'>
          {/* CURRENT WEATHER */}
          <CurrentWeather data={wetaherData} locationName={locationName} />

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

export default WeatherDashboard
