var day1FormObj = {
  name: '',
  job: '',
  company: '',
  seniority: '',
  designerExp: '',
  developerExp: ''
}

var day1Submit = () => {
  // 請從這裡開始作答，寫出事件和對象綁定，來替換掉Result的所有文字

  // Debugging line
  console.log('day1Submit function called');

  // 將 Nodelist 綁定到變數上
  const inputNodes = document.querySelectorAll('.form input');

  // 把節點的值全部輸入到物件屬性裡
  inputNodes.forEach((nodeElement, index) => {
    day1FormObj[Object.keys(day1FormObj)[index]] = nodeElement.value;
  });

  // Debugging line
  console.log('Form object:', day1FormObj);

  // 把物件所有屬性的值送到最終結果裡
  var resultText = `My name is ${day1FormObj.name}, I am a ${day1FormObj.job} of ${day1FormObj.company} for ${day1FormObj.seniority} years.<br>
            And I have more than ${totalExp} years of work experience.`;

  document.getElementById("work1Result").innerHTML = resultText
  console.log(resultText);
}

// 測試事件監聽能否正常運行
var testEventListener = () => {
  console.log('Test Pass');
};


// 新增按鈕事件
var day1SubmitBtn = document.getElementById('submitBtn');
day1SubmitBtn.addEventListener('click', testEventListener);

