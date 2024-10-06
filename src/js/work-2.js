import { cloneDeep, stubString } from "lodash";

// ------------------- First Assignment-----------------------//

const obj = {
  score: "",
  special: "",
  objective: "",
  compelete: ""
};

const objects = Object.keys(obj);


// 新增表單提交的按鈕綁定
const submitBtn = document.getElementById('submitBtn');
// 新增表單輸入的 nodelist 綁定
const inputNodes = document.querySelectorAll('#work input');

// Each checkbox node in objective.
const rateDouble = document.getElementById("rate_2x");
const rateQuarter = document.getElementById("rate_4x");

// DOM with id=result 
const resultText = document.getElementById("result");


// 表單提交的按鈕的事件監聽
submitBtn.addEventListener('click', () => {

  // 把節點的值除了任務數量全部輸入到物件屬性裡
  inputNodes.forEach((nodeElement) => {
    // 把 placeholder 值轉成小寫
    const nodeName = String(nodeElement.placeholder);
    const lowerNodeName = nodeName.toLowerCase();

    // 如果這個迭代轉成小寫的 placeholder 的值有在物件裡，就賦值。
    if (`${lowerNodeName}` in obj) {
      obj[`${lowerNodeName}`] = nodeElement.value;
      // console.table(lowerNodeName, obj[`${lowerNodeName}`])
    }
  });

  // 把任務數量也賦值進物件
  if (rateDouble.checked) {
    obj['objective'] = Number(2);
  }
  if (rateQuarter.checked) {
    obj['objective'] = Number(4);
  }

  // 重新計算總值
  for (let i = 0; i < Object.keys(obj).length; i++) {
    // console.log(objects[i]);
    // console.log(obj[objects[i]]);
    if (i != 2) {
      obj[objects[i]] *= obj[objects[2]];
    }
  };

  resultText.innerHTML = `
    Score: ${obj.score}<br/>
    Special: ${obj.special}<br/>
    Objective: ${obj.objective}<br/>
    compelete: ${obj.compelete}
    `;
});


// ------------------- Second Assignment-----------------------//

const existingUser = {
  firstName: "John",
  lastName: "Doe",
  address: {
    street: "123 Main St",
    city: "New York"
  },
  email: "johndoe@example.com"
};

// 顯示原始使用者資料
const resultText2 = document.getElementById("result2");
resultText2.innerHTML = `
  First Name: ${existingUser.firstName}<br/>
  Last Name: ${existingUser.lastName}<br/>
  Street: ${existingUser.address.street}<br/>
  City: ${existingUser.address.city}<br/>
  Email: ${existingUser.email}
`;

// 表單提交後的資料更新邏輯
const submitBtn2 = document.getElementById('submitBtn2');
submitBtn2.addEventListener('click', () => {

  console.log('submit!!');
});
