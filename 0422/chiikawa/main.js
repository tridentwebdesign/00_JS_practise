//class.jsをインポートしたい

//複数なので配列を準備
const chiikawaContents = []; //空の配列

//挿入するエリア
const container = document.querySelector(".contents");

//インスタンス化
//配列の順番を表す数字を「添え字」またの名を「index」
for (let i = 0; i < chiikawas.length; i++) {
  chiikawaContents.push(
    new Chiikawa(
      chiikawas[i].story,
      chiikawas[i].title,
      chiikawas[i].image,
      chiikawas[i].id
    )
  );

  //メソッドの呼び出し
  //console.log(chiikawaContents[i].createMarkup()); //dl...dt....dd
  container.insertAdjacentHTML("beforeend", chiikawaContents[i].createMarkup());
}
console.log(chiikawaContents);
