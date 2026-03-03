import axios from "axios";

const baseURl = import.meta.env.VITE_BASE_URL;

export async function getAllComments(postId) {
   
   const token = localStorage.getItem("User token")

    let data = await axios.get(`${baseURl}/posts/${postId}/comments?page=1&limit=10`, {
        headers: {
            "Content-Type" : "application/json",
            "Authorization": `Bearer ${token}`
        }
    });

    return data;
}





export async function createComment(postId, formData) {
   
   const token = localStorage.getItem("User token")

    let data = await axios.post(`${baseURl}/posts/${postId}/comments?`, formData , {
        headers: { 
           
            "Authorization": `Bearer ${token}`
        }
    });

    return data;
}

export async function updateComment(postId, commentId, formData) {
    const token = localStorage.getItem("User token");

    let data = await axios.put(`${baseURl}/posts/${postId}/comments/${commentId}`, formData, {
        headers: {
            "Authorization": `Bearer ${token}`
            
        }
    });

    return data;
}

export async function deleteComment(postId, commentId) { 
    const token = localStorage.getItem("User token");
    let data = await axios.delete(`${baseURl}/posts/${postId}/comments/${commentId}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    return data;
}






