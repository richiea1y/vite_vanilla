const fruitsArr = [
  { name: 'Melon', seasonal: true, price: '200' },
  { name: 'Strawberry', seasonal: false, price: '120' },
  { name: 'Banana', seasonal: true, price: '40' },
  { name: 'Blue Berry', seasonal: false, price: '300' },
  { name: 'Mango', seasonal: true, price: '180' },
  { name: 'Pinapple', seasonal: true, price: '80' },
  { name: 'Cherry tomato', seasonal: true, price: '70' }
]

const marketScope = document.getElementById('result_market');
const factoryScope = document.getElementById('result_factory');

let seasonal_arr = [];
let unseasonal_arr = [];

const submit = document.getElementById("submit")
submit.addEventListener('click', () => {
  // 請在以下區域作答，將click後的結果顯示在DOM上

  // 遍歷陣列，將當季與非當季的水果分配到不同的空陣列
  for (let i of fruitsArr) {
    if (i.seasonal) {
      seasonal_arr.push(i)
    } else {
      unseasonal_arr.push(i)
    }
  }

  let marketHTML = fruitname(seasonal_arr);
  let factoryHTML = fruitname(unseasonal_arr);

  marketScope.innerHTML = marketHTML;
  factoryScope.innerHTML = factoryHTML;
  // console.log(marketHTML, factoryHTML);
});


function fruitname(arr) {
  let empty_arr = [];
  // 遍歷所有陣列，將物件的名字拿到空陣列裡面
  arr.forEach((i) => {
    empty_arr.push(i.name);
    // console.log(i.name);
  })
  // console.log(empty_arr.join(', '));
  return empty_arr.join(', ');
}