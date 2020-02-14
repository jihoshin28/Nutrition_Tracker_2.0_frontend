import React, { Component } from 'react';
import Calendar from 'react-calendar';
import { Chart } from "react-google-charts";
// import { Calendar, momentLocalizer } from 'react-big-calendar'
import api from '../services/Api'




export default class CalendarPage extends Component {
  constructor(){
    super()
    this.state = {
      date: new Date(),
      weekFoodData: null,
      weekExerciseData: null
    }
  }
  

  componentDidMount(){
    const token = localStorage.getItem('token');
            if (token) {
                api.getCurrentUser().then(json => {
                let user = json.user.data.attributes ;
                let weekFoodData = []
                let weekExerciseData = []
                let today = new Date();
                let day = today.getDay();
                let getWeek = (day) => {
                  console.log(today.getDate())
                  console.log(today.getDay())
                  console.log(user.id)
                  for(let i = 0; i < 7; i++){
                      let date = (today.getFullYear() + '-' + (today.getMonth() + 1 ) + '-' + (today.getDate() - day + 1 + i))
                    
                      api.getUserFoods(user.id, date)
                      .then(json => {
                        
                        json.data.forEach(data => {
                          let newData= {}
                          newData["date"] = date
                          newData["calories"] = data.attributes.calories
                          weekFoodData.push(newData)
                         
                        })
                        this.setState({
                          weekFoodData: weekFoodData
                        })
                        console.log(this.state.weekFoodData)
                      })

                      api.getUserExercises(user.id, date)
                      .then(json => {
                        json.data.forEach(data => {
                          let newData= {}
                          newData["date"] = date
                          newData["calories"] = data.attributes.calories
                          weekExerciseData.push(newData)
                          
                        })
                        this.setState({
                          weekExerciseData: weekExerciseData
                        })
                        console.log(this.state.weekExerciseData)
                      })
                      
                  }
                  
                  
                }
                getWeek(day)
              })
    }
    
  }
 
  onChange = (date) => {
    this.dateLink(date)
    this.setState({ date })
  }

  dateLink = (date) => {
    let currentDate = date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate()
    this.props.history.push(`/daypage/${currentDate}`)
    console.log(currentDate)
  }

  render() {
    let graph
  if(!this.state.weekExerciseData || !this.state.weekFoodData){
    graph = "Loading..."
  }
  else if(!!this.state.weekExerciseData && !!this.state.weekFoodData && !this.state.weekExerciseData[0] && !this.state.weekFoodData[0]){
    graph = "No Data Posted!"
  } else {
    let today = new Date();
    let day = today.getDay();
    
    let foodData = []
    foodData.push(['Nutrient', 'Overall Calorie Intake'])
    for(let i = 0; i < 7; i++){
      let array = []
      let date = (today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + (today.getDate() - day + 1 + i))
      let filteredFoods = this.state.weekFoodData.filter(food => food.date === date).map(food => food.calories)
      let sum
      if(!filteredFoods[0]){
        sum = 0
      }else {
        sum = filteredFoods.reduce((total, sum) => total + sum)
      }
      let newDate = date.split("-")[1] + "/" + date.split("-")[2]
      array.push(newDate)
      array.push(sum)
      foodData.push(array)
      
    }
    
    console.log(foodData)
    graph = <div className ="bar-graph-div">
                <Chart
                    width={'1285px'}
                    height={'600px'}
                    chartType="AreaChart"
                    loader={<div>Loading Chart</div>}
                    data={foodData}
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
    
  }
      
    
 
    return (
      
      <div className="calendar-page">
        <div className="calendar-div">
          <h1>Calendar Page</h1>
          <div>
            <Calendar className="calendar"
              onChange={this.onChange}
              value={this.state.date}
            />
          </div>
          <div>
        <div>
    {/* <Calendar
      localizer={localizer}
      events={myEventsList}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
    /> */}
  </div>
          </div>
        </div>
        <div className = "exercise-plan-container">
          <h3>This week's calorie intake</h3>
          <div className = "exercise-plan-display">
            {graph}
            
          </div>
          
        </div>
        <br></br><br></br>
      </div>
    );
  }
}

