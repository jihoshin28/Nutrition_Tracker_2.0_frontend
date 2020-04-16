import React, { Component } from 'react'
import { Chart } from "react-google-charts";
import api from '../services/Api.js'

export class WeightGraph extends Component {
    constructor(props){
        super(props)
        this.state = {
            posted: false,
            timeline: props
        }
    }

    graphData = (type) => {
        
    }

    render(){
        console.log(this.props, this.props.timeline)
        let dataArray= []
        let graphTitle
        if(!!this.props.user){
            
            console.log(this.props.user)
            api.getUserWeights(this.props.user.id)
            .then(json =>
                {
                    console.log(json.data)
                    dataArray.push(["Date", "Recorded Weight"])
                    
                    dataArray.push(['2020-03-30', 2008])
                    json.data.forEach(element => {
                        let data = []
                        let date = element.attributes.date.toString()
                        console.log(date)
                        data.push(date)
                        data.push(element.attributes.current_weight)
                        dataArray.push(data)
                        console.log(data)
                    })
                    console.log(dataArray)
                })
            
            if(!this.props.timeline || (!!this.props.timeline && this.props.timeline === "week")){
                
                graphTitle = 'This Week\'s Calorie Intake Breakdown'
    
            } else if(!!this.props.timeline && this.props.timeline === "month") {
                graphTitle = 'This Month\'s Calorie Intake Breakdown'
            } else if(!!this.props.timeline && this.props.timeline === "year"){
                graphTitle = 'This Year\'s Calorie Intake Breakdown'
                dataArray.push(['Date', 'Recorded Weight'])
                dataArray.push(['3/30/2020', 188])
            }
        }
        


        if(!!this.props.user){
            console.log(this.props.user.id)
            if(this.props.timeline === "week"){

            } else if (this.props.timeline === "month"){

            } else if (this.props.timeline === "year"){

            }
           
        }
        
        
        return(
            
            <div>
                
                <br></br>
                <div className = "bar-graph-div">
                <option></option>
                <Chart
                    width={'1285px'}
                    height={'600px'}
                    chartType="AreaChart"
                    loader={<div>Loading Chart</div>}
                    data= {dataArray}
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
                      title: graphTitle,
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
