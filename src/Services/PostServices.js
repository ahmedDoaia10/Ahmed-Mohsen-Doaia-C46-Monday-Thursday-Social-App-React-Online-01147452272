import axios from "axios";

const baseURl = import.meta.env.VITE_BASE_URL;

export async function getAllPosts() {
   
   const token = localStorage.getItem("User token")

    let data = await axios.get(`${baseURl}/posts`, {
        headers: {
            "Content-Type" : "application/json",
            "Authorization": `Bearer ${token}`
        }
    });

    return data.data;
}


export async function getPostById(id) {
   
   const token = localStorage.getItem("User token")

    let data = await axios.get(`${baseURl}/posts/${id}`, {
        headers: {
            "Content-Type" : "application/json",
            "Authorization": `Bearer ${token}`
        }
    });

    return data.data;
}


export async function createPost(formData) {
   
   const token = localStorage.getItem("User token")

    let data = await axios.post(`${baseURl}/posts`, formData, {
        headers: {
           
            "Authorization": `Bearer ${token}`
        }
    });
    
    return data.data;
}



export async function MyProfile() {
   
   const token = localStorage.getItem("User token")

    let data = await axios.get(`${baseURl}/users/profile-data`, {
        headers: {
            "Content-Type" : "application/json",
            "Authorization": `Bearer ${token}`
        }
    });

    return data.data;
}



export async function HomeFeed() {
   
   const token = localStorage.getItem("User token")

    let data = await axios.get(`${baseURl}/posts/feed?only=following&limit=10`, {
        headers: {
            "Content-Type" : "application/json",
            "Authorization": `Bearer ${token}`
        }
    });

    return data.data;
}



export async function UpdatePost(postId, formData) {
   
   const token = localStorage.getItem("User token")

    let data = await axios.put(`${baseURl}/posts/${postId}`, formData, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    
    return data.data;
}



export async function DeletePost(postId) {
  const token = localStorage.getItem("User token");
  let data = await axios.delete(`${baseURl}/posts/${postId}`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
  return data.data;
}