//Email Check
export const isValidEmail = (email) => {
  const regEx = /\S+@\S+\.\S+/;
  return regEx.test(email);
};

//Password Validation
export const validatePassword = (password: string) => {
  if (password.length <= 8 || password === "") {
    return false;
  }
  return true;
};

//Mobile Number Check
export const isValidMobile = (mobile: string) => {
  if (mobile.length >= 8 || mobile === "") {
    return false;
  }
  return true;
};

//Empty Check
export const empty = (input: string) => {
  if (input === undefined || input === "") {
    return true;
  }
  return false;
};

//Check Username Pattern
// ^ : start of string
// [ : beginning of character group
// a-z : any lowercase letter
// A-Z : any uppercase letter
// 0-9 : any digit
// _ : underscore
// \.: Escaped character. Matches a dot
// \-: Escaped character. Matches a  minus
// ] : end of character group
// * : zero or more of the given characters
// $ : end of string
export const checkUsername = (username: string) => {
  if (!/[a-z0-9._]{1,30}/.test(username)) {
    return false;
  }

  if (/\.\./.test(username)) {
    return false;
  }

  if (/^\d+$/.test(username)) {
    return false;
  }

  if (/^\./.test(username)) {
    return false;
  }

  return true;
};
