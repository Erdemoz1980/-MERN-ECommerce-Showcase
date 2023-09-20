const API_URL_HEROKU = 'https://erdemoz-io-659240e6c6f7.herokuapp.com/api/users';
const API_URL_LOCAL = 'http://localhost:8000/api/users/'

//Register
const register = async (userData) => {
  const response = await fetch(`${API_URL_HEROKU}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  })
   
  if (!response.ok) {
    let errorMessage = 'An unexpected error occurred. Please try again later.'
    if (response.headers.get('content-type')?.includes('application/json')) {
      const errorData = await response.json()
      errorMessage = errorData.message
    }
    throw new Error(errorMessage)
  }
  return await response.json()
};

//Login
const login = async (userData) => {
  const response = await fetch(`${API_URL_HEROKU}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  })

  if (!response.ok) {
    let errorMessage = 'An unexpected error occurred. Please try again later.'
    if (response.headers.get('content-type')?.includes('application/json')) {
      const errorData = await response.json()
      errorMessage = errorData.message
    }
    throw new Error(errorMessage)
  }
  return await response.json();
};


//Update User
const updateProfile = async (userData) => {
  const response = await fetch(`${API_URL_HEROKU}/profile/update/${userData._id}`, {
    method: 'PUT',
    headers: {
      'Content-Type':'application/json'
    },
    body:JSON.stringify(userData)
  })

  if (!response.ok) {
    let errorMessage = 'An unexpected error occurred. Please try again later.'
    if (response.headers.get('content-type')?.includes('applicaton/json')) {
      const errorData = await response.json()
      errorMessage = errorData.message
    }

    throw new Error(errorMessage)
  }

  return await response.json()
}

//Update Password
const updatePassword = async (userData) => {
  const response = await fetch(`${API_URL_HEROKU}/password/update/${userData._id}`, {
    method: 'PUT',
    headers: {
      'Content-Type':'application/json'
    },
    body:JSON.stringify(userData)
  })
   
  if (!response.ok) {
    let errorMessage = 'An unexpected error occurred. Please try again later.'
    if (response.headers.get('Content-type')?.includes('application/json')) {
      const errorData = await response.json()
      errorMessage = errorData.message
    }
    throw new Error(errorMessage)
  }


  return await response.json()
}


const userService = {
  register,
  login,
  updateProfile,
  updatePassword
}

export default userService