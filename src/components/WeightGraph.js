import React, { Component } from 'react'
import { Chart } from "react-google-charts";

export class WeightGraph extends Component {
    render() {
        return (
            <div>
                <div className = "bar-graph-div">
             
                {/* <Chart
                    width={'1285px'}
                    height={'600px'}
                    chartType="AreaChart"
                    loader={<div>Loading Chart</div>}
                    data={}
                    options={{
                      title: 'This Week\'s Calorie Intake Breakdown',
                      hAxis: { title: 'Time of Day', titleTextStyle: { color: '#333' } },
                      vAxis: { title: 'Calories', minValue: 0 },
                      // For the legend to fit, we make the chart area smaller
                      chartArea: { width: '50%', height: '70%' },
                      // lineWidth: 25
                    }}
                    // For tests
                    rootProps={{ 'data-testid': '1' }}
                  /> */}
           </div>
            </div>
        )
    }
}

export default WeightGraph
