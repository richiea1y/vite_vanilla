let response = []
const callApi = () => {
  const keywords = document.getElementById("queryStr").value
  const apiPath = `https://restcountries.com/v2/name/${keywords}?fullText=false`
  // 請在以下作答，程式碼內容自行改寫 --->

  // --->
}

const printAnswer = (val) => {
  // 請在以下作答，程式碼內容自行改寫 --->
  const resultScope = document.getElementById("result")
  const countries = ''
  resultScope.innerHTML = `${val} 共有 ${response.length} 筆資料 <br>
  搜尋結果：${countries.join(', ')}`
  // --->
}
