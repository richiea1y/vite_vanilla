const getUrlDomain = (url) => {
  // 請在以下區塊作答 --->
  // --->
  return url
    .replace(/^https?:\/\//, '')         // 步驟 1: 移除 http:// 或 https://
    .replace(/\/.*$/, '')                // 步驟 2: 移除 / 之後的所有內容 (子路徑)
    .replace(/:[0-9]+$/, '')             // 步驟 3: 移除 : 後面的數字 (port)
    .replace(/^.*?([^.]+\.[^.]+\.[^.]+$|[^.]+\.[^.]+$)/, '$1'); // 步驟 4: 取得最後兩個 . 之後的內容
}

const printAnswer = () => {
  const url = document.getElementById("url_1").value
  const resultScope = document.getElementById("result")
  resultScope.innerHTML = getUrlDomain(url)
}

const actionButton = document.getElementById("action");
actionButton.addEventListener("click", printAnswer);

/*
https://www.example.com/page
http://subdomain.example.co.uk/path
https://multiple.sub.domains.example.org
http://example-with-dash.com
https://blog.example.com:8080
http://localhost:3000
https://test.herokuapp.com
http://sub1.sub2.example.co.jp
*/