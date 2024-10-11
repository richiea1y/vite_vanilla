import { cloneDeep } from "lodash";

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
const inputNodes = document.querySelectorAll('#ass1 #work input');

// Each checkbox node in objective.
const rateDouble = document.getElementById("rate_2x");
const rateQuarter = document.getElementById("rate_4x");

// DOM with id=result 
const resultText = document.getElementById("result1");


// 表單提交的按鈕的事件監聽
submitBtn.addEventListener('click', () => {

  // 把節點的值除了任務數量全部輸入到物件屬性裡
  inputNodes.forEach((nodeElement) => {
    // 把 placeholder 值轉成小寫
    const nodeName1 = String(nodeElement.placeholder);
    const lowerNodeName = nodeName1.toLowerCase();

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
    // 輸出物件的 key 值 (score, special ...) 和對應的 index
    // console.log(objects[i]);

    // 輸出物件對應 key 的值
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

// 新增表單輸入的 nodelist 綁定
const inputNodes2 = document.querySelectorAll('#ass2 #work input');

// 遍歷所有輸入字段，將已存在使用資料綁定在輸入欄位
inputNodes2.forEach((nodeElement2) => {
  // 透過 id 的值刪除不必要的字，拿來對應物件的 key
  const nodeName2 = String(nodeElement2.id).replace("Val", "");

  // 如果表單輸入框為空時
  if (!nodeElement2.value) {
    // Test past
    // console.log('Value is empty');

    // 如果是巢狀物件會等於 undefined
    if (!existingUser[nodeName2]) {
      console.log('Found Adress');
      // 處理 address 物件
      nodeElement2.value = existingUser.address[nodeName2]
    } else if (existingUser[nodeName2] !== undefined) {
      nodeElement2.value = existingUser[nodeName2];
    }
  }
});


// 深拷貝已存在的使用者資料
const updatedUser = cloneDeep(existingUser);

// 提交事件監聽
submitBtn2.addEventListener('click', () => {
  displayUdateUser(updatedUser);
});


// 可選：添加一個函數來顯示更新後的用戶數據
function displayUdateUser(newUser) {
  // 取得提交的值，將其綁定到新物件
  // 遍歷所有輸入字段，將已存在使用資料綁定在輸入欄位
  inputNodes2.forEach((nodeElement2) => {
    // 透過 id 的值刪除不必要的字，拿來對應物件的 key
    const nodeName2 = String(nodeElement2.id).replace("Val", "");

    // 如果表單輸入框不為空時
    if (nodeElement2.value) {
      if (!updatedUser[nodeName2]) {
        // 處理 address 物件
        updatedUser.address[nodeName2] = nodeElement2.value;
      } else if (updatedUser[nodeName2] !== undefined) {
        updatedUser[nodeName2] = nodeElement2.value;
      }
    }
  });

  resultText2.innerHTML = `
  First Name: ${updatedUser.firstName}<br/>
  Last Name: ${updatedUser.lastName}<br/>
  Street: ${updatedUser.address.street}<br/>
  City: ${updatedUser.address.city}<br/>
  Email: ${updatedUser.email}
  `;
}