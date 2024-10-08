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

// 深拷貝已存在的使用者資料
const newUser = cloneDeep(existingUser);

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

submitBtn2.addEventListener('click', () => {

  // 遍歷所有輸入字段
  inputNodes2.forEach((nodeElement2) => {
    const nodeName2 = String(nodeElement2.id).replace("Val", "");
    // 獲取並清理輸入值
    const value = nodeElement2.value.trim();


    // 根據字段名更新相應的屬性
    if (nodeName2 === 'street' || nodeName2 === 'city') {
      updateNestedObject(newUser, `address.${nodeName2}`, value);
    } else if (['firstName', 'lastName', 'email'].includes(nodeName2)) {
      updateNestedObject(newUser, nodeName2, value);
    }
  });

  // 在這裡你可以對更新後的 newUser 對象進行進一步處理
  // 例如，發送到服務器或更新UI
  // console.log('更新後的用戶數據:', newUser);
  displayUpdatedUser();
});

// 更新嵌套對象的輔助函數
function updateNestedObject(obj, path, value) {
  // 將路徑字符串分割成鍵數組
  const keys = path.split('.');
  // 從對象的根部開始
  let current = obj;

  // 遍歷除最後一個鍵之外的所有鍵
  for (let i = 0; i < keys.length - 1; i++) {
    // 如果當前鍵不存在，則創建一個空對象
    if (!(keys[i] in current)) {
      current[keys[i]] = {};
    }
    // 移動到下一層
    current = current[keys[i]];
  }

  // 獲取路徑中的最後一個鍵
  const lastKey = keys[keys.length - 1];

  // 只有當值不是 undefined 且不是空字符串時才更新
  if (value !== undefined && value !== '') {
    current[lastKey] = value;
  }
}

// 可選：添加一個函數來顯示更新後的用戶數據
function displayUpdatedUser() {
  resultText2.innerHTML = `
  First Name: ${newUser.firstName}<br/>
  Last Name: ${newUser.lastName}<br/>
  Street: ${newUser.address.street}<br/>
  City: ${newUser.address.city}<br/>
  Email: ${newUser.email}
  `;
}