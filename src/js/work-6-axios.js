let response = []
const callApi = () => {
  const keywords = document.getElementById("queryStr").value
  const apiPath = `https://restcountries.com/v2/name/${keywords}?fullText=false`
  /*
  當 fullText=false 時（模糊搜尋）：
  - 輸入 "tai" 可以找到：Taiwan, Thailand 等
  - 輸入 "united" 可以找到：United States, United Kingdom, United Arab Emirates 等
  - 只要國家名稱中包含你輸入的文字，就會出現在結果中

  當 fullText=true 時（精確搜尋）：
  - 必須輸入完整的國家名稱才能找到結果
  - 輸入 "tai" 會找不到任何國家
  - 必須輸入完整的 "Taiwan" 才能找到台灣
  */

  // 請在以下作答，程式碼內容自行改寫 -------------------------------------->

  // 使用 axios 呼叫 API
  axios.get(apiPath)
    .then(res => {
      // 成功時：存入 API 回傳的資料
      /*
        當 API 請求成功時，res 是 axios 的回應物件，res.data 包含了實際的 API 回傳資料（即國家資訊的陣列）
        我們將這些資料存入全域的 response 變數中，以便後續使用
      */
      response = res.data
      printAnswer('Value')
    })
    .catch(error => {
      // 失敗時：設為空陣列，並印出錯誤訊息
      /*
        當 API 請求失敗時（例如網路錯誤或找不到國家），會進入 catch 區塊，將 response 設為空陣列是為了確保即使發生錯誤，程式也能正常運作，空陣列會讓 printAnswer 顯示「共有 0 筆資料」，這是較好的使用者體驗
      */
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