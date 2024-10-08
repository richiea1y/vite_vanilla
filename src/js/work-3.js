const fruitsArr = [
  { name: 'Melon', seasonal: true, price: '200' },
  { name: 'Strawberry', seasonal: false, price: '120' },
  { name: 'Banana', seasonal: true, price: '40' },
  { name: 'Blue Berry', seasonal: false, price: '300' },
  { name: 'Mango', seasonal: true, price: '180' },
  { name: 'Pinapple', seasonal: true, price: '80' },
  { name: 'Cherry tomato', seasonal: true, price: '70' }
]

const submit = () => {
  // 請在以下區域作答，將click後的結果顯示在DOM上
  const marketScope = document.getElementById('result_market');
  const factoryScope = document.getElementById('result_factory');

  let marketHTML = '';
  let factoryHTML = '';

  marketScope.innerHTML = marketHTML;
  factoryScope.innerHTML = factoryHTML;
}
