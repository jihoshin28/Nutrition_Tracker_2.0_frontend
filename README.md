## Nutrition Tracker Application

Nutrition Tracker is a planner which allows users to easily record what they ate and how much they exercised for any day of the calendar. The Nutritionix API allows for users to input their logs in plain English, which is then input into the database as comprehensive data on the food/exercise. F.e. users can just enter "I ate 2 bananas". There's also a notes section for users to add any reminders for the day.

The application organizes the data so the users can see how they can better manage their diet. 

### Graphs/info included: 

- Macronutrients pie chart
- Bar Graph of recommended and consumed nutrients
- Daily calories burned during exercise
- Calorie consumption line graph for the day and week (accounts for calories burned in exercise)

## Getting Started

There are 2 ways you can run the application. 

### 1) Run the application locally.

### Installation

To run the application locally first clone the source code onto your local machine.

```
git clone git@github.com:geeuho/Nutrition_Tracker_2.0_frontend.git
cd Nutrition_Tracker_2.0_frontend
npm install 
```

### Start

Once you've done that, you can run the following command to start the React application.

```
npm start
```

### 2) Visit the hosted website

You can also just visit the hosted live website. 

[https://geeuho.github.io/Nutrition_Tracker_2.0_frontend/](https://geeuho.github.io/Nutrition_Tracker_2.0_frontend/)

## Backend

The backend for the application is currently being hosted on Heroku, so you don't have to run the server locally. 

If you do want to run the server locally, this is the github to the backend code. [https://github.com/geeuho/Nutrition_Tracker_2.0_backend](https://github.com/geeuho/Nutrition_Tracker_2.0_backend). 

## Using the Site

### Login

Once you get on the site you'll first want to login to the website. If you don't have an account, please sign up and create your profile. 

If you already have an account, login with your username and password. 

### 1) The day page

This is the main page for the website, which displays the logs for a specific day, with display graphs. 

When you login you'll be taken immediately to today's page. 

Each section has a plus sign next to it which will redirect you to the page for posting data.

### 2) Calendar page

This page has a calendar which allows you to navigate to pages for days other than today. 

There is also a graph that displays which tracks this week's calorie consumption. 

### 3) The post tab in the header. 

You can quickly post a food, exercise, or note on this page, with a dropdown to select your category 

There is a calendar so you can select the date that you want to post for.  

## Technologies/Libraries

- React
- Bootstrap
- Bcrypt Authentication
- Nutritionix API
- Google Charts API
- Google Calendar API
- Axios

## Contact

If you have any ideas you would like to contribute or would love to collaborate on the project I would love to connect! 

Email: geeuho@gmail.com

Github: [https://github.com/geeuho/](https://github.com/geeuho/)

LinkedIn: [https://www.linkedin.com/in/allen-shin/](https://www.linkedin.com/in/allen-shin/)

