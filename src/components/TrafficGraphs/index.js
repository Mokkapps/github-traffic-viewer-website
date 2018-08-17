import React from 'react'
import ReactChartkick, { LineChart } from 'react-chartkick'
import Chart from 'chart.js'

ReactChartkick.addAdapter(Chart)

const mapToGraph = data => {
  const countsData = {}
  const uniquesData = {}

  for (const view of data) {
    const { timestamp, count, uniques } = view
    countsData[timestamp] = count
    uniquesData[timestamp] = uniques
  }

  return [
    { name: 'Views', data: countsData },
    { name: 'Unique visitors', data: uniquesData },
  ]
}

const TrafficGraphs = ({ graphData }) => (
  <div>
    {graphData.map(data => {
      return (
        <div key={data.name}>
          <h2>{data.name}</h2>
          <LineChart
            colors={['#FC1A20', '#333333']}
            curve={false}
            legend="bottom"
            data={mapToGraph(data.views)}
          />
        </div>
      )
    })}
  </div>
)

export default TrafficGraphs
