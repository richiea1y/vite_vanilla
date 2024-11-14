let response = []
const callApi = () => {
  const keywords = document.getElementById("queryStr").value
  const apiPath = `https://restcountries.com/v2/name/${keywords}?fullText=false`
  // 請在以下作答，程式碼內容自行改寫 --->

  // 使用 axios 呼叫 API
  axios.get(apiPath)
    .then(res => {
      response = res.data
      printAnswer('Value')
    })
    .catch(error => {
      response = []
      printAnswer('Value')
      console.error('Error:', error)
    })
  // --->
}

const printAnswer = (val) => {
  // 請在以下作答，程式碼內容自行改寫 --->
  const resultScope = document.getElementById("result")
  const countries = response.map(country => country.name)

  // 建立國家清單 HTML
  /*
  resultScope.innerHTML = `${val} 共有 ${response.length} 筆資料 <br>
  搜尋結果：${countries.join(', ')}`
  */
  const countriesList = countries.map(country => `<li>${country}</li>`).join('')

  resultScope.innerHTML = `
    <p>${val} 共有 ${response.length} 筆資料</p>
    <p>搜尋結果：</p>
    <ul>
      ${countriesList}
    </ul>
  `
  // --->
}

const actionButton = document.getElementById("action");
actionButton.addEventListener("click", callApi);