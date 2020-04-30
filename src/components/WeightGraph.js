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
        let dataArray = []
        let curr = new Date;
        let month = curr.getMonth() + 1
        let year = curr.getFullYear()
        let weekDays = []
        
        for(let i = 0; i < 7; i++){
            let first = curr.getDate() - curr.getDay() + i 
            let date = new Date(curr.setDate(first)).toISOString().slice(0, 10)
            weekDays.push(date)
            
        }
        console.log(weekDays)
        // dataArray.push(["3/23", 0])
        let graphTitle = "Weight Recordings"
        if(!!this.props.user && !!this.props.weights){
            console.log(this.props)
            this.props.weights.forEach(element => {
                let data = []
                data.push(element.date)
                data.push(element.current_weight)
                dataArray.push(data)
                
            })
            
            if(!this.props.timeline || (!!this.props.timeline && this.props.timeline === "week")){  
                dataArray = dataArray.filter(element => {
                    return element[0].split("-")[2] == 29
                    // return (element[0].split("-")[2] < weekEnd && element[0].split("-")[2] > weekStart);
                })
                dataArray.unshift(["Date" , "Current Weight"])
                console.log(dataArray)

                graphTitle = 'This Week\'s Weight Records'
            } else if(!!this.props.timeline && this.props.timeline === "month") {
                dataArray = dataArray.filter(element => {
                    return element[0].split("-")[1] == month;
                })
                dataArray.unshift(["Date" , "Current Weight"])
                graphTitle = 'This Month\'s Weight Records'
            } else if(!!this.props.timeline && this.props.timeline === "year"){
                dataArray = dataArray.filter(element => {
                    return element[0].split("-")[0] == year;
                })
                dataArray.unshift(["Date" , "Current Weight"])
                graphTitle = 'This Year\'s Weight Records'
            }
        }
        //console.log(testArray)
        console.log(dataArray)
        let sortedArray = dataArray.sort((a, b) => {
                    console.log(parseFloat(a[0].split("-").join("")), b[1])
                    return parseFloat(a[0].split("-").join("")) - parseFloat(b[0].split("-").join(""))
                    // return a[1] - b[1]
                })
        console.log(sortedArray)
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
                    data = {dataArray}
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
