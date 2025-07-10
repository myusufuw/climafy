import type { ForecastData } from '@/api/types'
import moment from 'moment'
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

type ChartData = {
  time: moment.Moment | string
  temp: number
  feels_like: number
}

const HourlyTemperature = ({ data }: { data: ForecastData }) => {
  const chartData: ChartData[] = data.list.slice(0, 8).map((item) => ({
    time: moment(new Date(item.dt_txt)).format('HH:mm'),
    temp: Math.round(item.main.temp),
    feels_like: Math.round(item.main.feels_like)
  }))

  return (
    <Card className='flex-1'>
      <CardHeader>
        <CardTitle>Today's Temperature</CardTitle>
      </CardHeader>
      <CardContent className='pl-0'>
        <div className='h-[200px] w-full'>
          {/* CHART */}
          <ResponsiveContainer width='100%' height='100%'>
            <LineChart data={chartData}>
              <XAxis
                dataKey='time'
                stroke='#888888'
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />

              <YAxis
                stroke='#888888'
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}°`}
              />

              <Line
                type='monotone'
                dataKey='temp'
                stroke='#2563eb'
                strokeWidth={2}
                dot={false}
              />

              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className='rounded-lg border bg-background p-2 shadow-sm'>
                        <div className='grid grid-cols-2 gap-2'>
                          <div className='flex flex-col'>
                            <span className='text-[0.70rem] text-muted-foreground'>
                              Temperature
                            </span>
                            <span className='font-bold'>
                              {payload[0].value}°
                            </span>
                          </div>
                          <div className='flex flex-col'>
                            <span className='text-[0.70rem] text-muted-foreground'>
                              Feels Like
                            </span>
                            <span className='font-bold'>
                              {payload[1].value}°
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                  }
                }}
              />

              <Line
                type='monotone'
                dataKey='feels_like'
                stroke='#64748b'
                strokeWidth={2}
                dot={false}
                strokeDasharray='5 5'
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

export default HourlyTemperature
