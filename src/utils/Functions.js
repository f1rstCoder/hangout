import { getAxios } from "../lib/DefineAxiosGet";

export const handleFindAccount = receivedUsername => {
  getAxios('http://localhost:3050/users', { username: receivedUsername })
    .then(res => {
      if (res.length === 0)
        return;
      window.open(
        `http://localhost:3000/profile/${res[0].id}`,
        "_self"
      );
    })
    .catch(err => console.error(err));
}


export const setDarkMode = () => {
  localStorage.setItem('theme', 'dark')
  document.querySelector("body").setAttribute('data-theme', "dark")
}

export const setLightMode = () => {
  localStorage.setItem('theme', 'light')
  document.querySelector("body").setAttribute('data-theme', "light")
}