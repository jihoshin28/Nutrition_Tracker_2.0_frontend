import React, { Component } from 'react'

// import CanvasJSReact from '../canvasjs-2.3.2/canvasjs.react'
import { Chart } from "react-google-charts";


export class Graphs extends Component {
  constructor(props){
    super()
    this.state = {
      foodData: props.foodData,
      exerciseData: props.exerciseData
    }
  }

    render() {
      let fatSum = this.state.foodData.fat.map(food => food.data)
      .reduce((total, sum) => total + sum)
      let carbSum = this.state.foodData.carbs.map(food => food.data)
      .reduce((total, sum) => total + sum)
      let proteinSum = this.state.foodData.protein.map(food => food.data)
      .reduce((total, sum) => total + sum)
      let potassiumSum = this.state.foodData.potassium.map(food => food.data)
      .reduce((total, sum) => total + sum)
      let sugarSum = this.state.foodData.sugar.map(food => food.data)
      .reduce((total, sum) => total + sum)
      let sodiumSum = this.state.foodData.sodium.map(food => food.data)
      .reduce((total, sum) => total + sum)
      let saturatedFatSum = this.state.foodData.saturated_fat.map(food => food.data)
      .reduce((total, sum) => total + sum)
      let dietaryFiberSum = this.state.foodData.dietary_fiber.map(food => food.data)
      .reduce((total, sum) => total + sum)
      let cholesterolSum = this.state.foodData.cholesterol.map(food => food.data)
      .reduce((total, sum) => total + sum)
      console.log(potassiumSum, sugarSum, sodiumSum, saturatedFatSum, dietaryFiberSum, cholesterolSum)
      // let caloriesBurnedSum = this.state.exerciseData.calories.map(exercise => exercise.data)
      // .reduce((total, sum) => total + sum)

      let allCalorieData = []
      allCalorieData.push(['Time', 'Calories Consumed'])
      let sum = 0
      console.log(this.state.foodData.calories)
      // let sortedExerciseData = this.state.exerciseData.calories.map(food => food * -1)
      let sortedCalorieData = this.state.foodData.calories.sort(function (a, b) {
  
        return parseFloat(a.time.split(":").join("")) - parseFloat(b.time.split(":").join(""));
      });
      console.log(parseFloat(this.state.foodData.calories[0].time.split(":").join("")))
      console.log(sortedCalorieData)
      
      sortedCalorieData.map(food =>{
        let data = []
        let newTime = food.time.split(":")[0] + ":" + food.time.split(":")[1]
        data[0] = newTime
        data[1] = food.data + sum
        sum += food.data
        allCalorieData.push(data)
      })

      console.log(allCalorieData)

        return (
            <div>
              <div className ="graphs-div">
                <div className ="top-graphs-div"> 
                  <div className= "pie-chart-div">
                  <Chart
                        width={'360px'}
                        height={'360px'}
                        chartType="PieChart"
                        loader={<div>Loading Chart</div>}
                        data={[
                          ['Macronutrient', 'grams'],
                          ['Fat (g)', fatSum],
                          ['Protein (g)' , proteinSum],
                          ['Carbs (g)', carbSum],
                        ]}
                        options={{
                          title: 'Macronutrients Breakdown',
                        }}
                        rootProps={{ 'data-testid': '1' }}
                      />
                  </div>
                  <div className = "bar-graph-div">
             
                  <Chart
                    width={'360px'}
                    height={'360px'}
                    chartType="BarChart"
                    loader={<div>Loading Chart</div>}
                    data={[
                      ['Nutrient', 'Daily Rec.', 'Todays Intake'],
                      ['Potassium (mg)', 4500, potassiumSum],
                      ['Cholesterol (mg)', 300, cholesterolSum],
                      ['Sodium (mg)', 1500, sodiumSum]
                  
                    ]}
                    options={{
                      title: 'Nutrition Info',
                      chartArea: { width: '50%' },
                      hAxis: {
                        title: 'Total Amount',
                        minValue: 0,
                        maxValue: 5000
                      },
                      vAxis: {
                        title: 'Nutrient',
                      },
                    }}
                    // For tests
                    rootProps={{ 'data-testid': '1' }}
                  />
                </div>
                <div className = "bar-graph-div">
             
                  <Chart
                    width={'360px'}
                    height={'360px'}
                    chartType="BarChart"
                    loader={<div>Loading Chart</div>}
                    data={[
                      ['Nutrient', 'Daily Rec.', 'Todays Intake'],
                      ['Sugar (g)', 30, sugarSum ],
                      ['Saturated Fat (g)', 13, saturatedFatSum],
                      ['Dietary Fiber (g)', 30, dietaryFiberSum]
                  
                    ]}
                    options={{
                      title: 'Nutrition Info',
                      chartArea: { width: '50%' },
                      hAxis: {
                        title: 'Total Amount',
                        minValue: 0,
                        maxValue: 150
                      },
                      vAxis: {
                        title: 'Nutrient',
                      },
                    }}
                    // For tests
                    rootProps={{ 'data-testid': '1' }}
                  />
                </div>
                
                
                <br></br>
                </div>
                  <br></br>
                <div className ="bottom-graphs-div">
                  <Chart
                    width={'1080px'}
                    height={'600px'}
                    chartType="AreaChart"
                    loader={<div>Loading Chart</div>}
                    data={allCalorieData}
                    options={{
                      title: 'Calories Intake Breakdown',
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
            </div>
        )
    }
}

export default Graphs
