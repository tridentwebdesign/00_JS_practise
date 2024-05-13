const codeNums = [
  { 愛知県: 230000 },
  { 岐阜県: 210000 },
  { 三重県: 240000 },
  { 静岡県: 220000 },
];
const weekUrl = `https://www.jma.go.jp/bosai/forecast/data/forecast/${codeNums[0]["愛知県"]}.json`;

$.ajax({
  // json読み込み開始
  type: "GET",
  url: weekUrl,
  dataType: "json",
}).then(
  function (json) {
    // jsonの読み込みに成功した時
    const west = json[0].timeSeries[0].areas[0].weathers;
    const weatherDate = json[0].timeSeries[0].timeDefines;
    console.log(weatherDate, west);
    const weatherArea = document.querySelectorAll(".weather");

    for (let i = 0; i < west.length; i++) {
      if (west[i] == "晴れ") {
        weatherArea[i].innerHTML = `<p>${west[i]}<p>
  <div>
  <img src="./images/clear.png"
  </div>`;
      }
    }
    alert("天気予報API成功");
  },
  function () {
    //jsonの読み込みに失敗した時
    alert("天気予報API失敗");
  }
);
