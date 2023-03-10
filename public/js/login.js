const loginFormHandler = async (event) => {
    event.preventDefault()
  
    // Collect values from the login form
    const email = document.querySelector('#email-login').value.trim()
    const password = document.querySelector('#password-login').value.trim()
  
    if (email && password) {
      // Send a POST request to the API endpoint
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' }
      })
  
      if (response.ok) {
        // If successful, redirect the browser to the profile page
        document.location.replace('/api/dashboard')
      } else {
        alert(response.statusText)
      }
    }
  }
  
  const signupFormHandler = async (event) => {
    event.preventDefault()
    const firstName = document.querySelector('#firstName-signup').value.trim()
    const lastName = document.querySelector('#lastName-signup').value.trim()
    const userName = document.querySelector('#userName-signup').value.trim()
    const email = document.querySelector('#email-signup').value.trim()
    const password = document.querySelector('#password-signup').value.trim()
    // if the person entered a name, email, and password, we will create a new User with the User model
    if (firstName && lastName && userName && email && password) {
      const response = await fetch('/api/users/signup', {
        method: 'POST',
        body: JSON.stringify({ firstName, lastName, companyName, email, password }),
        headers: { 'Content-Type': 'application/json' }
      })
      // and if successful, we will reroute to the profile page
      if (response.ok) {
        document.location.replace('/api/dashboard')
      } else {
        alert(response.statusText)
      }
    }
  }
  
  document
    .querySelector('#login-btn')
    .addEventListener('click', loginFormHandler)
  
  document.querySelector('#submit-btn')
    .addEventListener('click', signupFormHandler)
  