import * as z from "zod";



export const registerSchema = z.object({
  name: z.string()
    .min(1, "*Name is required")
    .min(3, "*Name must be at least 3 chars long")
    .max(12, "*chars not Exceed 12"),

  username: z.string()
    .max(20, "*Username max 20 characters")
    .optional()
    .or(z.literal("")),  

  email: z.string()
    .min(1, "*Email is required")
    .email("*Email is invalid"),

  password: z.string()
    .min(1, "*Password is required")
    .min(8, "*Password should be at least 8 characters")
    .max(13, "*Password max 13 characters"),

  rePassword: z.string().min(1, "*Re-Password is required"),

  dateOfBirth: z.string()
    .min(1, "*Date of Birth is required")
    .refine((date) => {
      const today = new Date().getFullYear();
      const birthDate = new Date(date).getFullYear();
      const age = today - birthDate;
      return age >= 18;
    }, "Age not Allowed less than 18 years old"),

  gender: z.string().min(1, "*Gender is required"),

}).refine((data) => data.password === data.rePassword, {
  path: ["rePassword"],
  message: "*Passwords not match",
});


export const loginSchema = z.object({
  
  emailOrUsername: z.string()
    .min(1, "*Email or Username is required")
    .refine((value) => {
      const isEmail = z.string().email().safeParse(value).success;
      const isUsername = value.length >= 3;
      return isEmail || isUsername;
    }, "*Enter a valid email or username (min 3 chars)"),

  password: z.string()
    .min(1, "*Password is required")
    .min(8, "*Password should be at least 8 characters")
    .max(13, "*Password max 13 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "*Password must contain uppercase, lowercase, number and special character"
    ),
});




export const settingsSchema = z.object({
  currentPassword: z.string()
    .min(1, "*Current password is required"),

  password: z.string()
    .min(1, "*Password is required")
    .min(8, "*Password should be at least 8 characters")
    .max(13, "*Password max 13 characters"),

  rePassword: z.string()
    .min(1, "*Re-Password is required"),

}).refine((data) => data.password === data.rePassword, {
  path: ["rePassword"],
  message: "*Passwords not match",
});















// export const registerSchema = z.object({
//   name: z.string()
//     .min(1, "*Name is required")
//     .min(3, "*Name must be at least 3 chars long")
//     .max(10, "*chars not Exceed 10"),
    
//   email: z.string()
//     .min(1, "*Email is required")
//     .toLowerCase() 
//     .refine((val) => {
    
//       const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//       return emailRegex.test(val);
//     }, "*Email is invalid"),
    
//   password: z.string()
//     .min(1, "*Password is required")
//     .min(8, "*Password should be at least 8 characters")
//     .max(13, "*Password max 13 characters")
//     .regex(
//       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
//       "*Password must contain uppercase, lowercase, number and special character"
//     ),
    
//   rePassword: z.string().min(1, "*Re-Password is required"),
  
//   dateOfBirth: z.string()
//     .min(1, "*Date of Birth is required")
//     .refine((date) => {
//       const today = new Date().getFullYear();
//       const birthDate = new Date(date).getFullYear();
//       const age = today - birthDate;
//       return age >= 18;
//     }, "Age not Allowed less than 18 years old"),

//   gender: z.string().min(1, "*Gender is required")
  
// }).refine((data) => data.password === data.rePassword, {
//   path: ["rePassword"],
//   message: "*Passwords not match",
// });