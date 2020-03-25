import React, { Component } from 'react'
import { Chart } from "react-google-charts";

export class WeightGraph extends Component {
    constructor(){
        super()
        this.state = {
            posted: false,
            fields: null
        }
    }

    render() {
        return (
            <div>
                
                <br></br>
                <div className = "bar-graph-div">
                <option></option>
                <Chart
                    width={'1285px'}
                    height={'600px'}
                    chartType="AreaChart"
                    loader={<div>Loading Chart</div>}
                    data={30}
                    // *Example Data*
                    // ["Nutrient", "Overall Calorie Intake"],
                    // ["3/23", 0],
                    // ["3/24", 1072.75],
                    // ["3/25", 0],
                    // ["3/26", 0],
                    // ["3/27", 0],
                    // ["3/28", 0],
                    // ["3/29", 0]
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
                  />
           </div>
            </div>
        )
    }
}

export default WeightGraph
