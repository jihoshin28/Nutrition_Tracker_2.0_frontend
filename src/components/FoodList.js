import React, { Component } from 'react'
import FoodCard from './FoodCard'


export default class FoodList extends Component {
    render() {
        return (
            <div>
                {this.props.foods.map(food => <FoodCard prop = {this.props.props} key = {food.id} id = {food.id} food = {food.attributes} />)}
            </div>
        )
    }
}


