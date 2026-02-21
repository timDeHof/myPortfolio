const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validateRequired = (value: string): boolean => {
  return value.trim().length > 0;
};

const validateMinLength = (value: string, minLength: number): boolean => {
  return value.trim().length >= minLength;
};

export interface ValidationErrors {
  [key: string]: string;
}

export const validateContactForm = (data: {
  name: string;
  email: string;
  message: string;
}): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!validateRequired(data.name)) {
    errors.name = 'Name is required';
  }

  if (!validateRequired(data.email)) {
    errors.email = 'Email is required';
  } else if (!validateEmail(data.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!validateRequired(data.message)) {
    errors.message = 'Message is required';
  } else if (!validateMinLength(data.message, 10)) {
    errors.message = 'Message must be at least 10 characters long';
  }

  return errors;
};