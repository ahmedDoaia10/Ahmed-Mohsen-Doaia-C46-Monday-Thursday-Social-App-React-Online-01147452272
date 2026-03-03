
// function to format the time of the comment
export function getCurrentTime(iso) {
  
    return new Date(iso).toLocaleString("en-US", {
    hour12: true
  });
}

// default avatar for the user
export const DEFAULT_AVATAR = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face';


// function to check if the photo is undefined
export function getAvatar(photo) {
  return photo && !String(photo).includes('undefined') ? photo : DEFAULT_AVATAR
}
