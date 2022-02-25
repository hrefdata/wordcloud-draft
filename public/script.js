const container = document.querySelector(".container");
const formBox = document.querySelector(".box");
const wordArea = document.querySelector("#word");

//---------------------------------------

const placeWords = () => {
  for (let i = 0; i < 10; i += 1) {
    let word = createWordObject(
      arrKey[i], // word
      arrVal[i], // freq
      90
    );

    if (word.innerText != "undefined") {
      placeWord(word, 2, 2);
    }
  }
};

//---------------------------------------
const placeWord = (word, x, y) => {
  container.appendChild(word);
};

//---------------------------------------

const deleteForm = () => {
  formBox.remove();
  placeWords();
};

//---------------------------------------

let debouncer;

var arrKey = new Array();
var arrVal = new Array();

formBox.addEventListener("submit", (event) => {
  event.preventDefault();

  if (debouncer) {
    clearTimeout(debouncer);
  }

  debouncer = setTimeout(() => {
    const text = wordArea.value; // textArea에 입력한 값.

    if (text) {
      const xhr = new XMLHttpRequest();

      const url = "/news";

      xhr.onreadystatechange = () => {
        if ((xhr.readyState == 4) & (xhr.status == 200)) {
          const responseData = xhr.responseText;
          console.log();
          const parseJsonToObject = JSON.parse(responseData);

          var index_r = 0;
          for (i of Object.keys(parseJsonToObject)) {
            arrKey[index_r] = i;
            index_r++;
            if (index_r == 20) {
              break;
            }
          }

          var index_v = 0;
          for (i of Object.values(parseJsonToObject)) {
            arrVal[index_v] = i;
            index_v++;
            if (index_v == 20) {
              break;
            }
          }

          console.log(arrKey);
          console.log(arrVal);

          deleteForm();
        }
      };

      xhr.open("POST", url);

      xhr.setRequestHeader("Content-type", "application/json");

      const requestData = {
        // typeof : object
        text,
      };

      deleteForm(requestData);

      jsonToString = JSON.stringify(requestData);

      // xhr : XMLHttpRequest
      xhr.send(jsonToString);
    } else {
      console.log("번역할 텍스트를 입력하세요.");
      // alert('번역할 텍스트를 입력하셔야죠!');
    }
  }, 500);
});

// div(word) 생성 메소드
const createWordObject = (word, freq, rotate) => {
  const a = Math.floor(Math.random() * 250);
  const b = Math.floor(Math.random() * 300);

  const wordContainer = document.createElement("div");

  wordContainer.style.display = "flex";
  wordContainer.style.left = "'" + b + "px'";
  wordContainer.style.top = "'" + a + "px'";
  wordContainer.style.fontSize = freq * 5 + "px";

  wordContainer.appendChild(document.createTextNode(word));
  
  if (freq > 0 && freq < 2) {
    wordContainer.style.color = "white";
  } else if (freq >= 2 && freq < 5) {
    wordContainer.style.color = "rgb(255, 214, 214)"; // 신설
    wordContainer.style.width = freq * 20 + "px";
    wordContainer.style.height = freq * 5 + "px";
    wordContainer.style.alignItems = "center";
    wordContainer.style.transform = "translate(-400px, 70px)";
  } else if (freq >= 5 && freq < 10) {
    //대통령
    wordContainer.style.color = "rgb(241, 173, 173)";
    wordContainer.style.width = freq * 20 + "px";
    wordContainer.style.height = freq * 5 + "px";
    wordContainer.style.alignItems = "center";
    wordContainer.style.transform = "translate(-190px, 130px)";
  } else if (freq >= 10 && freq < 15) {
    wordContainer.style.color = "rgb(229, 143, 143)";
    wordContainer.style.width = freq * 20 + "px";
    wordContainer.style.height = freq * 5 + "px";
  } else if (freq >= 15 && freq < 20) {
    wordContainer.style.color = "rgb(228, 109, 109)";
    wordContainer.style.transform = "rotate(" + rotate + "deg)";
    wordContainer.style.width = freq * 20 + "px";
    wordContainer.style.height = freq * 5 + "px";
    wordContainer.style.alignItems = "baseline";
  } else {
    wordContainer.style.color = "rgb(219, 59, 59)";
    wordContainer.style.width = freq * 20 + "px";
    wordContainer.style.height = freq * 5 + "px";
    wordContainer.style.justifyContent = "right";
  }

  return wordContainer;
};
