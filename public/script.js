const container = document.querySelector(".container");
const formBox = document.querySelector(".box");
const wordArea = document.querySelector("#word");
// const smallContainer = document.querySelector("#smallContainer");

//---------------------------------------
const placeWords = () => {

  for (let i = 0; i < 10; i += 1) {

    let word = createWordObject(
      arrKey[i],  // word
      arrVal[i],  // freq
      // (~~(Math.random() * 6) - 3) * 30  // rotate
      
    );

    if(word.innerText != "undefined"){
      placeWord(word, 2,2);

    }
  }
};

//---------------------------------------
const placeWord = (word, x, y) => {
  //  
    // if(word){
      container.appendChild(word);
      // wordsDown.push(word.getBoundingClientRect());
    // }
    //console.log(x, y);
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
          console.log(
          );
          const parseJsonToObject = JSON.parse(responseData);
         
            
          var index_r = 0;
          for (i of Object.keys(parseJsonToObject)) {
            arrKey[index_r] = i;
            index_r++;
            if(index_r == 20){
              break;
            }
          }
          
          var index_v = 0;
          for (i of Object.values(parseJsonToObject)) {
            arrVal[index_v] = i;
            index_v++;
            if(index_v == 20){
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
  const a =  Math.floor(Math.random()*250);
  const b =  Math.floor(Math.random()*300);
  console.log(typeof a, a);

  const wordContainer = document.createElement("div");

  // wordContainer.style.position= "absoulute";

  wordContainer.style.left = "'"+ b + "px'";
  wordContainer.style.top =  "'" + a + "px'";

  // wordContainer.style.position = "relative";
  wordContainer.appendChild(document.createTextNode(word));
  //wordContainer.style.lineHeight = 0.8;
  wordContainer.style.fontSize = freq*5+ "px";

  // wordContainer.style.transform = "translate(" + a + "px, " + b + "px)";

  if (freq > 0 && freq < 5) {
    wordContainer.style.color = "rgba(255, 255, 255, 0.377)";
  } else if (freq >= 5 && freq < 10) {
    wordContainer.style.color = "rgba(255, 255, 255, 0.473)";
  } else if (freq >= 10 && freq < 15) {
    wordContainer.style.color = "(255, 255, 255, 0.555)";
  }else if (freq >= 15 && freq < 20) {
    wordContainer.style.color = "rgba(255, 255, 255, 0.781)";
  } else {
    wordContainer.style.color = "white";
  }

  return wordContainer;
};


