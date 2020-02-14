const API_ROOT = `http://localhost:3000/api/v1/`;

let token = localStorage.getItem("token")

const headers = {
  'Content-Type': 'application/json',
  Accepts: 'application/json',
  "Authorization": token
};

const nutritionixGetFood = (query) => {
    return fetch(`https://trackapi.nutritionix.com/v2/natural/nutrients`, {
        method: `POST`,
        headers: {
          'content-type': 'application/json',
          'x-app-id': '5abf948d',
          'x-app-key': '47c1f26a3b33cec73d5a0862b176fa69'
        },
        body: JSON.stringify({
            "query": query
        })
    })
    .then(response => response.json())
}

const nutritionixGetExercise = (query, user) => {
    return fetch(`https://trackapi.nutritionix.com/v2/natural/exercise`, {
        method: `POST`,
        headers: {
          'content-type': 'application/json',
          'x-app-id': '5abf948d',
          'x-app-key': '47c1f26a3b33cec73d5a0862b176fa69'
        },
        body: JSON.stringify({
            "query": query,
            "gender": user.gender,
            "weight_kg": (user.weight / 2.2046),
            "height_cm": (user.height * 2.54),
            "age": user.age
        })
    }).then(response => response.json())
}

const postUserFood = (food, user, meal, date, time) => {
    return fetch(`${API_ROOT}food_posts`, {
        method: `POST`,
        headers: headers,
        body: JSON.stringify({
            food_post: {
                name: food.food_name,
                calories: food.nf_calories,
                fat: food.nf_total_fat,
                protein: food.nf_protein,
                carbs: food.nf_total_carbohydrate,
                potassium: food.nf_potassium,
                sugar: food.nf_sugars,
                sodium: food.nf_sodium,
                saturated_fat: food.nf_saturated_fat,
                cholesterol: food.nf_cholesterol,
                dietary_fiber: food.nf_dietary_fiber,
                user_id: user.id,
                meal: meal,
                note: '',
                date: date,
                time: time,
                image: food.photo.highres
            }
        })
    }).then(res => res.json())
}

const postUserExercise = (exercise, user, date, time) => {
    return fetch(`${API_ROOT}exercise_posts`, {
        method: `POST`,
        headers: headers,
        body: JSON.stringify({
            exercise_post: {
                name: exercise.name,
                calories: exercise.nf_calories,
                user_id: user.id,
                note: '',
                date: date,
                time: time,
                image: exercise.photo.highres,

            }
        })
    }).then(res => res.json())
}

const postUserNote = (subject, text, user, date) => {
   
    return fetch(`${API_ROOT}notes`, {
        method: `POST`,
        headers: headers,
        body: JSON.stringify({
            subject: subject,
            text: text,
            date: date,
            user_id: user.id
        })
    }).then(res => res.json())
}

const editUser = (fields, id) => {
    return fetch(`${API_ROOT}users/${id}`, {
        method: `PATCH`,
        headers: headers,
        body: JSON.stringify({
            username: fields.username,
            weight: fields.weight,
            height: fields.height,
            calorie_goal: fields.calorie_goal,
            diet_type: fields.diet_type,
            image: fields.image,
            bio: fields.bio,
          
        })
    }).then(res => res.json())
}

const editUserExercise = (fields, id) => {
    let newDate = new Date()
    console.log(newDate)
    return fetch(`${API_ROOT}exercise_posts/${id}`, {
        method: `PATCH`,
        headers: headers,
        body: JSON.stringify({
            name: fields.name,
            calories: fields.calories,
            unit: fields.unit,
            unit_number: fields.unit_number
        })
    }).then(res => res.json())
}

const editUserFood = (fields, id) => {
    return fetch(`${API_ROOT}food_posts/${id}`, {
        method: `PATCH`,
        headers: headers,
        body: JSON.stringify({
            name: fields.name,
            calories: fields.calories,
            fat: fields.fat,
            protein: fields.protein,
            carbs: fields.carbs,
            potassium: fields.potassium,
            sugar: fields.sugar,
            sodium: fields.sodium,
            saturated_fat: fields.saturated_fat,
            cholesterol: fields.cholesterol,
            dietary_fiber: fields.dietary_fiber
        })
    }).then(res => res.json())
}

const editUserNote = (fields, id) => {
    console.log(id)
    return fetch(`${API_ROOT}notes/${id}`, {
        method: `PATCH`,
        headers: headers,
        body: JSON.stringify({
            subject: fields.subject,
            text: fields.text
        })
    }).then(res => res.json())
}

const editFoodNote = (fields, id) => {
    console.log(id)
    return fetch(`${API_ROOT}food_posts/${id}`, {
        method: `PATCH`,
        headers: headers,
        body: JSON.stringify({
            note: fields.note
        })
    }).then(res => res.json())
}

const editExerciseNote = (fields, id) => {
    console.log(id)
    console.log(fields)
    return fetch(`${API_ROOT}exercise_posts/${id}`, {
        method: `PATCH`,
        headers: headers,
        body: JSON.stringify({
            note: fields.note
        })
    }).then(res => res.json())
}

const deleteUser= (id) => {
    return fetch(`${API_ROOT}users/${id}`, {
      method: `DELETE`,
      headers: headers
    }).then(res => res.json());
}

const deleteUserExercise = (id) => {
    return fetch(`${API_ROOT}exercise_posts/${id}`, {
      method: `DELETE`,
      headers: headers
    }).then(res => res.json());
}

const deleteUserFood= (id) => {
    return fetch(`${API_ROOT}food_posts/${id}`, {
      method: `DELETE`,
      headers: headers
    }).then(res => res.json());
}

const deleteUserNote = (id) => {
    return fetch(`${API_ROOT}notes/${id}`, {
      method: `DELETE`,
      headers: headers
    }).then(res => res.json());
}

const getUserFoods = (userId, date) => {
    console.log(userId, date)
    return fetch(`${API_ROOT}food_posts?user_id=${userId}&date=${date}`, {headers: headers})
    .then(response => response.json())
}

const getUserExercises = (userId, date) => {
    console.log(userId, date)
    return fetch(`${API_ROOT}exercise_posts?user_id=${userId}&date=${date}`, {headers: headers})
    .then(response => response.json())
}

const getUserNotes = (userId, date) => {
    console.log(userId, date)
    return fetch(`${API_ROOT}notes?user_id=${userId}&date=${date}`, {headers: headers})
    .then(response => response.json())
}

const getUser = (id) => {
    return fetch(`${API_ROOT}users/${id}`, {headers: headers})
    .then(res => res.json())
}

const getCurrentUser = () => {
    return fetch(`${API_ROOT}current_user`, {
      headers: headers
    }).then(res => res.json());
  };

const signUp = (user) => {
    return fetch(`${API_ROOT}users`, {
      method: `POST`,
      headers: headers,
      body: JSON.stringify({ 
          user: {
              username: user.username, 
              password: user.password, 
              password_confirmation: user.passwordConfirmation, 
              first_name: user.first_name,
              last_name: user.last_name,
              image: user.image,
              age: user.age,
              diet_type: user.diet_type,
              weight: user.weight,
              height: user.height,
              email: user.email,
              calorie_goal: user.calorie_goal,
              bio: user.bio,
              gender: user.gender
            } 
        })
    }).then(res => res.json());
  };
  
const login = (username, password) => {
    return fetch(`${API_ROOT}login`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ user: {username, password} })
    }).then(res => res.json());
};


export default {
    nutritionixGetFood,
    nutritionixGetExercise,
    postUserFood,
    postUserExercise,
    postUserNote,
    signUp,
    login,
    getCurrentUser,
    getUser,
    getUserFoods,
    getUserExercises,
    getUserNotes,
    editUser,
    editUserExercise,
    editUserFood,
    editUserNote,
    editFoodNote,
    editExerciseNote,
    deleteUser,
    deleteUserExercise,
    deleteUserFood,
    deleteUserNote
}