var day1FormObj = {
  name: '',
  job: '',
  company: '',
  seniority: '',
  designerExp: '',
  developerExp: ''
}

function day1Submit() {
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

// 新增按鈕事件
var submitBtn = document.getElementById('submitBtn');
if (submitBtn) {
  submitBtn.addEventListener('click', day1Submit);
  // Debugging line
  console.log('Event listener added to submit button');
} else {
  // Debugging line
  console.error('Submit button not found');
}