const button = document.getElementById("button");
const audioElement = document.getElementById("audio");

//Toggle button - dis/enb
const toggleButton = () => {
  button.disabled = !button.disabled;
};

// Passing a joke to VoiceRSS API
const tellMe = function (joke) {
  console.log(joke);

  VoiceRSS.speech({
    key: "...", // API_KEY_HERE - https://www.voicerss.org/api/
    src: joke,
    hl: "en-us",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
};

// Get Joke from Joke API
const getJokes = async function () {
  let joke = "";

  const urlApi =
    "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit";
  try {
    const resp = await fetch(urlApi);
    const data = await resp.json();

    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
  } catch (e) {
    console.error(e);
  }

  tellMe(joke);

  //Disable button
  toggleButton();
};

// addEventListener
button.addEventListener("click", getJokes);

// End speech
audioElement.addEventListener("ended", toggleButton);
