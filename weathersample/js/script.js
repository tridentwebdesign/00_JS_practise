//別ファイルでweathercodesを読み込み済み

const codeNums = [
  { 愛知県: 230000 },
  { 岐阜県: 210000 },
  { 三重県: 240000 },
  { 静岡県: 220000 },
];
const weekUrl = `https://www.jma.go.jp/bosai/forecast/data/forecast/${codeNums[0]["愛知県"]}.json`;
const url = `https://www.jma.go.jp/bosai/forecast/data/overview_forecast/${codeNums[0]["愛知県"]}.json`;
const Btns = document.querySelectorAll(".datebtn");
const weatherArea = document.querySelector(".forecast");

//愛知県西部の天気予報をwest、日付をweatherDateに代入します。
const west = data[0].timeSeries[0].areas[0];

//コード表と取得コードをすり合わせて、天気を返す関数
const weatherForecast = function (getCode) {
  for (let weather in weathercode) {
    if (weather === getCode) {
      return {
        result: weathercode[weather][3],
        imagecode: weathercode[weather][0],
      };
    }
  }
};

const image = document.createElement("img");
image.setAttribute(
  "src",
  `https://www.jma.go.jp/bosai/forecast/img/${
    weatherForecast(west.weatherCodes[0]).imagecode
  }`
);
weatherArea.append(image);

// 本日を作成.

for (let i = 0; i < Btns.length; i++) {
  const date = new Date();
  date.setDate(date.getDate() + i);
  Btns[i].innerHTML = `${date.getMonth()}月${date.getDate()}日`;
}

weatherArea
  .fetch(weekUrl)
  .then(function (response) {
    if (response.status !== 200) {
      console.log("問題がありました。ステータスコード:" + response.status);
      return;
    }
    response.json().then(function (data) {
      console.log(data);

      const weatherDate = data[0].timeSeries[0].timeDefines;

      //日付をbuttonに代入

      weatherDate.forEach((date, index) => {
        Btns[index].addEventListener("click", function () {
          console.log(west.weatherCodes[index]);

          //表示場所を取得

          weatherArea.innerHTML = weatherForecast(
            west.weatherCodes[index]
          ).result;
          const image = document.createElement("img");
          image.setAttribute(
            "src",
            `https://www.jma.go.jp/bosai/forecast/img/${
              weatherForecast(west.weatherCodes[index]).imagecode
            }`
          );
          weatherArea.append(image);
        });
      });
    });
  })
  .catch(function (err) {
    console.log("Fetchエラー:", err);
  });

const speechBtn = document.querySelector(".speaker");
const stopBtn = document.querySelector(".speakerstop");

fetch(url)
  .then(function (response) {
    if (response.status !== 200) {
      console.log("問題がありました。ステータスコード:" + response.status);
      return;
    }
    // responseのテキストを調べる
    response.json().then(function (weather) {
      console.log(weather.text);
      speechBtn.addEventListener("click", () => {
        speech(weather.text);
      });
      stopBtn.addEventListener("click", () => {
        speechstop();
      });
    });
  })
  .catch(function (err) {
    console.log("Fetchエラー:", err);
  });

const speech = function (text) {
  // ブラウザにWeb Speech API Speech Synthesis機能があるか判定
  if ("speechSynthesis" in window) {
    // 発言を設定 (必須)
    const uttr = new SpeechSynthesisUtterance();

    // テキストを設定 (必須)
    uttr.text = `天気予報をききたいですか？仕方ないですね。${text}`;

    // 言語を設定
    uttr.lang = "ja-JP";

    // 速度を設定
    uttr.rate = 2;

    // 高さを設定
    uttr.pitch = 1;

    // 音量を設定
    uttr.volume = 1;

    // 発言を再生 (必須)
    speechSynthesis.speak(uttr);
  }
};

const speechstop = function () {
  if ("speechSynthesis" in window) {
    // 発言を設定 (必須)
    const uttr = new SpeechSynthesisUtterance();

    // 発言をキャンセル
    speechSynthesis.cancel();
  }
};
