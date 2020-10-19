import Head from "next/head";

export default function Home() {
  function receiveSpeech() {
    const content = document.querySelector(".content");

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.onstart = function () {
      console.log("voice is activated!");
    };

    recognition.onresult = function (e) {
      const current = e.resultIndex;

      const transcript = e.results[current][0].transcript;
      content.textContent = transcript;

      readOutLoud(transcript);
    };

    recognition.start();

    function readOutLoud(message) {
      const speech = new SpeechSynthesisUtterance();
      speech.text = message;
      speech.volume = 1;
      speech.rate = 1;
      speech.pitch = 1;

      window.speechSynthesis.speak(speech);
    }
  }

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <button onClick={receiveSpeech}>Speak</button>

      <h5 className="content"></h5>
    </div>
  );
}
