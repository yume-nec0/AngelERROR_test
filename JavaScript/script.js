let current = 0;
let userName = "";

const scores = {
  sera: 0,
  noel: 0,
  rei: 0,
  nana: 0,
  nemu: 0
};

const characters = {

  sera: {
    name: "天瀬せら",
    image: "images/01.jpeg",
    description: "共感タイプ。まずは気持ちを受け止めてもらうことで前へ進める。"
  },

  noel: {
    name: "羽澄ノエル",
    image: "images/02.PNG",
    description: "包容タイプ。安心できる場所や人とのつながりが力になる。"
  },

  rei: {
    name: "識乃レイ",
    image: "images/03.jpeg",
    description: "分析タイプ。状況を整理し、理解することで前へ進める。"
  },

  nana: {
    name: "叶宮ナナ",
    image: "images/04.jpg",
    description: "共闘タイプ。一緒に頑張る仲間の存在が背中を押してくれる。"
  },

  nemu: {
    name: "夜宵ねむ",
    image: "images/n05.jpg",
    description: "休息タイプ。今は休むことも大切な選択肢。"
  }

};

const questions = [

{
text:"悩みを話すとき、まずは気持ちを分かってほしい。",
yes:{sera:2,noel:1},
no:{rei:2,nana:1}
},

{
text:"一人で抱え込んでしまうことが多い。",
yes:{noel:2,nemu:1},
no:{nana:2,rei:1}
},

{
text:"問題が起きると、感情より原因を考える。",
yes:{rei:2},
no:{sera:2,nemu:1}
},

{
text:"今は頑張るより休みたい気持ちが強い。",
yes:{nemu:2,noel:1},
no:{nana:2,rei:1}
},

{
text:"一緒に頑張ってくれる人がいると心強い。",
yes:{nana:2,noel:1},
no:{nemu:2}
},

{
text:"『そのままで大丈夫』と言われると安心する。",
yes:{sera:2,noel:1},
no:{rei:2,nana:1}
},

{
text:"悩みの答えを出すより、誰かと共有したい。",
yes:{noel:2,sera:1},
no:{rei:2,nemu:1}
},

{
text:"自分の考えを整理できると気持ちも落ち着く。",
yes:{rei:2},
no:{sera:1,nemu:1}
},

{
text:"背中を押してくれる存在が欲しい。",
yes:{nana:2,sera:1},
no:{nemu:1}
},

{
text:"最近『少し疲れたな』と感じることが多い。",
yes:{nemu:2,noel:1},
no:{nana:2,rei:1}
},

{
text:"人から認められると頑張ろうと思える。",
yes:{sera:2,nana:1},
no:{rei:1,nemu:1}
},

{
text:"今必要なのは答えより安心感だと思う。",
yes:{noel:2,sera:1},
no:{rei:2,nana:1}
}

];

function showQuestion() {

  const q = questions[current];

  document.getElementById("progress").innerText =
    `${current + 1} / ${questions.length}`;

  document.getElementById("question").innerText =
    q.text;

}

function answer(choice) {

  const pointData = questions[current][choice];

  for (const key in pointData) {
    scores[key] += pointData[key];
  }

  current++;

  if (current < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {

  let winner = "sera";

  for (const key in scores) {
    if (scores[key] > scores[winner]) {
      winner = key;
    }
  }

  const result = characters[winner];

  const total =
    scores.sera +
    scores.noel +
    scores.rei +
    scores.nana +
    scores.nemu;

  document.body.innerHTML = `

  <h1>${userName}さんの診断結果</h1>

  <img src="${result.image}">

  <h2>${result.name}</h2>

  <p>${result.description}</p>

  <canvas id="chart"></canvas>

  <div id="percent">
    <p>せら ${Math.round(scores.sera/total*100)}%</p>
    <p>ノエル ${Math.round(scores.noel/total*100)}%</p>
    <p>レイ ${Math.round(scores.rei/total*100)}%</p>
    <p>ナナ ${Math.round(scores.nana/total*100)}%</p>
    <p>ねむ ${Math.round(scores.nemu/total*100)}%</p>
  </div>

  `;

  new Chart(document.getElementById("chart"), {

    type: "pie",

    data: {
      labels: [
        "せら",
        "ノエル",
        "レイ",
        "ナナ",
        "ねむ"
      ],

      datasets: [{
        data: [
          scores.sera,
          scores.noel,
          scores.rei,
          scores.nana,
          scores.nemu
        ],
        backgroundColor: [
        "#ffb6c1",
        "#98fb98",
        "#87ceeb",
        "#ffd700",
        "#dda0dd"
        ],
        
      }]
    }

  });

}

window.onload = function () {

  document.getElementById("startBtn")
  .addEventListener("click", function () {

    userName =
      document.getElementById("username")
      .value.trim();

    if (userName === "") {
      userName = "ゲスト";
    }

    document.getElementById("start").style.display = "none";
    document.getElementById("quiz").style.display = "block";

    showQuestion();

  });

  document.getElementById("btnA")
  .addEventListener("click", function () {
    answer("yes");
  });

  document.getElementById("btnB")
  .addEventListener("click", function () {
    answer("no");
  });

};