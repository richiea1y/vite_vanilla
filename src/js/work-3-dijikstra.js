import Decimal from 'decimal.js';

// 旅遊景點數據
const tourismSpots = {
  '台北101': {
    avgCost: 500,
    rating: 4.5,
    connections: { '故宮博物院': 30, '象山': 20, '西門町': 25 }
  },
  '故宮博物院': {
    avgCost: 350,
    rating: 4.7,
    connections: { '台北101': 30, '陽明山': 40, '西門町': 35 }
  },
  '象山': {
    avgCost: 100,
    rating: 4.3,
    connections: { '台北101': 20, '西門町': 30, '龍山寺': 35 }
  },
  '西門町': {
    avgCost: 600,
    rating: 4.2,
    connections: { '台北101': 25, '故宮博物院': 35, '象山': 30, '龍山寺': 15 }
  },
  '龍山寺': {
    avgCost: 50,
    rating: 4.6,
    connections: { '西門町': 15, '象山': 35 }
  },
  '陽明山': {
    avgCost: 200,
    rating: 4.4,
    connections: { '故宮博物院': 40 }
  }
};

// 生成景點按鈕
function generateSpotButtons() {
  const container = document.getElementById('spots-container');
  for (let spot in tourismSpots) {
    const button = document.createElement('button');
    button.textContent = `${spot} (成本: ${tourismSpots[spot].avgCost}, 評分: ${tourismSpots[spot].rating})`;
    button.className = 'spot-button';
    button.onclick = () => selectSpot(button, spot);
    container.appendChild(button);
  }
}

let selectedSpots = [];

function selectSpot(button, spot) {
  if (selectedSpots.includes(spot)) {
    selectedSpots = selectedSpots.filter(s => s !== spot);
    button.classList.remove('selected');
  } else if (selectedSpots.length < 2) {
    selectedSpots.push(spot);
    button.classList.add('selected');
  }

  updateButtonStates();
}

function updateButtonStates() {
  document.getElementById('calculate-route').disabled = selectedSpots.length !== 2;
  document.getElementById('clear-selection').disabled = selectedSpots.length === 0;
}

function clearSelection() {
  selectedSpots = [];
  document.querySelectorAll('.spot-button').forEach(button => {
    button.classList.remove('selected');
  });
  document.getElementById('result').innerHTML = '';
  updateButtonStates();
}

/* ---------------------------- Assignment Start ---------------------------- */

// 計算綜合成本，考慮了交通時間、平均消費和景點評分
function calculateCost(spots, from, to, costWeight, ratingWeight) {
  const travelTime = spots[from].connections[to];
  const avgCost = (spots[from].avgCost + spots[to].avgCost) / 2;
  const avgRating = (spots[from].rating + spots[to].rating) / 2;

  // 兩個部分的考量：成本＋評分。 成本包含交通時間和平均成本；評分部分
  return new Decimal(costWeight).mul(travelTime + avgCost).add(
    // 乘以 ratingWeight 是為了根據用戶設定的權重來調整評分的重要性
    // 成本越低評分越高，用 6 減去評分(假設最高評分是 5)，乘以 100 是為了將評分的影響放大,使其與成本在數量級上更接近
    new Decimal(ratingWeight).mul(6 - avgRating).mul(100)
  );
}

// TODO: 實現 findBestTravelRoute 函數
// spots 是 tourismSpots
function findBestTravelRoute(spots, start, end, costWeight = 0.7, ratingWeight = 0.3) {
  // TODO: 實現迪傑斯特拉演算法
  // 存儲從起點到每個節點的最短距離，初始化為空對象是為了動態添加節點。
  const distances = {};
  // 記錄到達每個節點的最短路徑中的前一個節點，初始化為空對象，同樣是為了動態添加節點。
  const previous = {};
  // Set 提供了 O(1) 時間複雜度的查找和刪除操作。在迪傑斯特拉算法中，我們需要頻繁地檢查節點是否被訪問過，以及從未訪問集合中刪除節點。Set 的這些特性使得這些操作非常高效
  // A Set is a special type collection – “set of values” (without keys), where each value may occur only once. (Set keeps only unique values)
  // Set is much better optimized internally for uniqueness checks.
  const unvisited = new Set(Object.keys(spots));

  // 初始化距離
  for (let spot in spots) {
    // 如果是起點,距離為0; 否則為無窮大。
    // 其他點距離為無窮大表示我們還不知道到達這些點的路徑。
    // 無窮大作為初始值確保了任何實際路徑都會比它短，這使得算法可以逐步更新更短的路徑。
    // 當所有可達節點都被訪問過後，剩下的無窮大值表示那些節點是不可達的。
    distances[spot] = spot === start ? new Decimal(0) : new Decimal(Infinity);
  }

  // unvisited 是一個 Set 對象,它代表還未訪問的節點集合，Set 對象有一個 size 屬性,表示集合中元素的數量
  while (unvisited.size > 0) {
    // 找到距離最小的未訪問景點，當這行代碼執行時，reduce 方法會立即遍歷整個 [...unvisited] 數組，它會在一次操作中找出距離最小的節點。
    // [...unvisited] 是將 Set 轉換為數組的語法，因為 Set 沒有 reduce 方法，但數組有。
    // 在每次迭代中，a 代表當前的累積結果（即目前找到的最小距離節點），b 代表當前正在比較的節點。
    // lessThan() 是 Decimal.js 庫提供的方法，用於比較兩個 Decimal 對象的大小，如果 a 的距離小於 b 的距離，則返回 a；否則返回 b。
    let current = [...unvisited].reduce((a, b) => distances[a].lessThan(distances[b]) ? a : b);

    // 如果 current 等於終點，說明已經找到了最短路徑，可以結束主循環。
    if (current === end) break;

    // 將當前景點標記為已訪問
    unvisited.delete(current);

    // 更新相鄰景點的距離，遍歷當前節點的所有相鄰節點
    // 我們不斷地尋找更短的路徑。每次我們訪問一個新節點時,我們都檢查是否可以通過這個新節點找到到達其他節點的更短路徑。如果找到了,我們就更新這些路徑。
    for (let neighbor in spots[current].connections) {
      // 檢查相鄰節點是否未訪問
      if (unvisited.has(neighbor)) {
        // 計算到相鄰景點的新距離
        const cost = calculateCost(spots, current, neighbor, costWeight, ratingWeight);
        // 新距離是從起點到當前節點的距離加上從當前節點到相鄰節點的成本。
        const newDistance = distances[current].add(cost);

        // 如果新距離更短,更新距離和前驅節點
        // 如果新計算的距離小於之前記錄的到達該相鄰節點的距離,我們就更新距離並記錄前驅節點。
        if (newDistance.lessThan(distances[neighbor])) {
          distances[neighbor] = newDistance;
          previous[neighbor] = current;
        }
      }
    }
  }


  // previous 記錄到達每個節點的最短路徑中的前一個節點
  // 我們從終點開始，因為我們知道終點，但不知道到達終點的具體路徑，通過不斷查找前驅節點，我們可以逐步回溯到起點，最終，path 數組將包含從起點到終點的正確順序的路徑。
  const path = [];
  let current = end;
  // 在路徑重建部分，current 最初被設置為終點，然後在循環中不斷更新為前一個節點。多次執行，直到 current 變為 null 或 undefined
  while (current) {
    // 將當前節點添加到路徑的開頭，因為我們是從終點往回走，所以需要反轉順序。
    path.unshift(current);
    // 更新 current 變成最近的前驅節點
    current = previous[current];
  }

  // 計算實際成本和平均評分
  let actualCost = new Decimal(0);
  let totalRating = new Decimal(0);
  // 使用 path.length - 1 是因為我們需要計算路徑中的每一段,而不是每個點。例如,如果路徑是 A -> B -> C,我們需要計算 A 到 B 和 B 到 C 兩段。
  for (let i = 0; i < path.length - 1; i++) {
    // 從一個景點到下一個景點的交通時間(或成本) + 當前景點的平均消費。
    // 我們將交通時間(或成本)和景點的平均消費相加,得到從一個景點到達下一個景點並遊覽的總成本。
    actualCost = actualCost.add(spots[path[i]].connections[path[i + 1]] + spots[path[i]].avgCost);
    // 累加每個景點的評分。
    totalRating = totalRating.add(spots[path[i]].rating);
  }
  // 這是為了加上最後一個景點的平均消費,因為循環中沒有計算到最後一個景點的消費。
  actualCost = actualCost.add(spots[path[path.length - 1]].avgCost);
  totalRating = totalRating.add(spots[path[path.length - 1]].rating);

  // 將總評分除以景點數量,得到平均評分。
  const averageRating = totalRating.div(path.length);

  return {
    path,
    totalCost: distances[end],
    actualCost,
    averageRating
  };

}

/* ---------------------------- Assignment End ---------------------------- */

function calculateAndDisplayRoute() {
  const [start, end] = selectedSpots;
  const result = findBestTravelRoute(tourismSpots, start, end);
  displayResult(result);
}

function displayResult(result) {
  const resultDiv = document.getElementById('result');
  if (result) {
    resultDiv.innerHTML = `
          <p>最佳路線: ${result.path.join(' -> ')}</p>
          <p>綜合成本指標: ${result.totalCost.toFixed(2)}</p>
          <p>預估總花費: ${result.actualCost.toFixed(2)} NTD</p>
          <p>平均評分: ${result.averageRating.toFixed(2)}</p>
      `;
  } else {
    resultDiv.innerHTML = '<p>沒有找到可行的路線</p>';
  }
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
  generateSpotButtons();
  document.getElementById('calculate-route').addEventListener('click', calculateAndDisplayRoute);
  document.getElementById('clear-selection').addEventListener('click', clearSelection);
  updateButtonStates();
});
