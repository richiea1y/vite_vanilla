const obj = {
  score: "",
  objective: "",
  special: "",
  compelete: ""
};

const resultText = document.getElementById("result");
resultText.innerHTML = `
  Score: ${obj.score}<br/>
  Special: ${obj.special}<br/>
  Objective: ${obj.objective}<br/>
  compelete: ${obj.compelete}
  `;
const rateDouble = document.getElementById("rate_2x");
const rateQuarter = document.getElementById("rate_4x");

// 表單提交後的資料更新邏輯
const submitBtn = document.getElementById("submitBtn");
submitBtn.addEventListener("click", () => {
  console.log("submit!!");
});
