import axios from "axios";

const baseURl = import.meta.env.VITE_BASE_URL;

export async function registerUser(body) {
   
   
    let data = await axios.post(`${baseURl}/users/signup`, body, {
        headers: {
            "Content-Type": "application/json"
        }
    });
    return data.data;
}

export async function LoginUser(body) {
    let data = await axios.post(`${baseURl}/users/signin`, body, {
        headers: {
            "Content-Type": "application/json"
        }
    });
    return data.data;
}

export async function ChangePassword(body) {
    const token = localStorage.getItem("User token")
    let data = await axios.patch(`${baseURl}/users/change-password`, body, { 
        headers: {
            "Content-Type" : "application/json",
            "Authorization": `Bearer ${token}`
        }
    });
    return data.data;
}


export async function uploadPhoto(formData) {
  const token = localStorage.getItem("User token");
  let data = await axios.put(`${baseURl}/users/upload-photo`, formData, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
  return data.data;
}