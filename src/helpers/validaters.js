export const validatePassword = (pass) =>
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$/.test(pass);

export const validatePasswordText =
  "Please enter a password between 8 and 16 characters with at least one uppercase character, number and special character.";
