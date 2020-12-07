export function getJoke() {
  return fetch('https://official-joke-api.appspot.com/jokes/general/random')
    .then((result) => result.json())
    .then((data) => {
      console.log(data[0]);
      return data[0];
    });
}
