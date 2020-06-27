export function validateRegisterInput(username, firstName, lastName, email, password, confirmPassword) {
  const errors = {};
  if (username.trim() === '') {
    errors.username = 'Username must not be empty';
  }
  if (firstName.trim() === '') {
    errors.firstName = 'First name must not be empty';
  }
  if (lastName.trim() === '') {
    errors.lastName = 'Last name must not be empty';
  }
  if (email.trim() === '') {
    errors.email = 'Email must not be empty';
  } else {
    const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = 'Email must be a valid email address';
    }
  }
  if (password === '') {
    errors.password = 'Password must not empty';
  } else if (password !== confirmPassword) {
    errors.confirmPassword = 'Passwords must match';
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
}

export function validateLoginInput(login, password) {
  const errors = {};
  if (login.trim() === '') {
    errors.login = 'You must enter a username or email address';
  }
  if (password.trim() === '') {
    errors.password = 'Password must not be empty';
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
}

export function validateToolInput(title, make, model, description) {
  const errors = {};
  if (title.trim() === '') {
    errors.title = 'Title must not be empty';
  }
  if (make.trim() === '') {
    errors.make = 'Make must not be empty';
  }
  if (model.trim() === '') {
    errors.model = 'Model must not be empty';
  }
  if (description.trim() === '') {
    errors.description = 'Description must not be empty';
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
}
