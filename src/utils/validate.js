export const checkValidData = (email, password) => {
   const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
   const isPasswordValid = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

   if (!isEmailValid) return 'Email is not valid';
   if (!isPasswordValid) return 'password is not valid'

   return null;
}