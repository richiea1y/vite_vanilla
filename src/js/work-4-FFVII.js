import { cloneDeep } from 'lodash';

const players = [
  {
    name: 'Cloud',
    class: '戰士',
    hp: 5500,
    mp: 500,
    status: '正常',
    skill: [
      { id: 0, name: '攻擊', cost: 0, damage: 400 },
      { id: 1, name: '超究武神霸斬', cost: 50, damage: 2000 }
    ]
  },
  {
    name: 'Tifa',
    class: '格鬥家',
    hp: 5000,
    mp: 500,
    status: '正常',
    skill: [
      { id: 2, name: '攻擊', cost: 0, damage: 600 },
      { id: 3, name: 'ファイナルヘブン（最終天堂）', cost: 80, damage: 2000 }
    ]
  },
  {
    name: 'Aerith',
    class: '魔法師',
    hp: 4800,
    mp: 800,
    status: '正常',
    skill: [
      { id: 4, name: '攻擊', cost: 0, damage: 800 },
      { id: 5, name: 'ケアルガ（全體恢復）', cost: 50, damage: 2000 },
      { id: 6, name: 'ホーリー（聖光）', cost: 80, damage: 900 },
      { id: 7, name: 'デブチョコボ召喚（召喚胖陸行鳥）', cost: 100, damage: 1500 }
    ]
  }
]

const mobs = [
  {
    name: '巴哈姆特',
    class: 'BOSS',
    hp: 10000,
    mp: 20000,
    status: '不爽',
    skill: [{ name: 'メガフレア（超巨爆）', cost: 0, damage: 3000 }]
  }
]

// Deep clone objects
let gamePlayer = cloneDeep(players);
let gameMobs = cloneDeep(mobs);

const creatMobs = () => {
  let html = ''
  for (let i in gameMobs) {
    html += `
      <div class="cards">
        <div class="row horizontal space">
          <b>${gameMobs[i].name}</b>
          <span>${gameMobs[i].class}</span>
        </div>
        <div class="row horizontal space">
          <b>HP</b>
          <span>${gameMobs[i].hp}</span>
        </div>
        <div class="row horizontal space">
          <b>MP</b>
          <span>${gameMobs[i].mp}</span>
        </div>
        <div class="row horizontal space">
          <b>狀態</b>
          <span>${gameMobs[i].status}</span>
        </div>
      </div>
    `
  }
  const scope = document.getElementById('mob')
  scope.innerHTML = html
}

const createPlayers = () => {
  let html = ''
  let btnHTML = ''
  let buttonName = []
  let skills = []
  for (let i in gamePlayer) {
    skills.push(gamePlayer[i].skill.map(item => {
      return item.name
    }))
  }

  for (let i in gamePlayer) {
    const createButton = () => {
      let html = ''
      let result = gamePlayer[i].skill.map(item => {
        return item.name
      })
      for (let j in result) {
        html += `<button onClick="attackMethods(${i}, ${j})">${result[j]}</button>`
      }
      return html
    }
    html += `
      <div class="cards row horizontal">
        <div class="row vertical" data-space="space-next">
          <div class="row horizontal space">
            <b>${gamePlayer[i].name}</b>
            <span>${gamePlayer[i].class}</span>
          </div>
          <div class="row horizontal space">
            <b>HP</b>
            <span>${gamePlayer[i].hp}</span>
          </div>
          <div class="row horizontal space">
            <b>MP</b>
            <span>${gamePlayer[i].mp}</span>
          </div>
          <div class="row horizontal space">
            <b>狀態</b>
            <span>${gamePlayer[i].status}</span>
          </div>
        </div>
        <div class="row vertical">
          <b>技能</b>
          ${createButton()}
        </div>
      </div>
    `
  }
  const scope = document.getElementById('players')
  scope.innerHTML = html
}



createPlayers()
creatMobs()

// 請在以下開始作答-------------->

// 添加遊戲狀態追踪
let isGameOver = false;

// State management functions
const updateGameState = () => {
  updatePlayersState();
  updateMobsState();
  checkBattleConditions();
  renderUI();
}

const updatePlayersState = () => {
  gamePlayer.forEach(player => {
    // Clamp HP between 0 and max HP
    player.hp = Math.max(0, Math.min(player.hp, getMaxHp(player.name)));
    // Clamp MP between 0 and max MP
    player.mp = Math.max(0, Math.min(player.mp, getMaxMp(player.name)));
    // Update status
    player.status = player.hp <= 0 ? '無法戰鬥' : '正常';
  });
}

const updateMobsState = () => {
  gameMobs.forEach(mob => {
    mob.hp = Math.max(0, mob.hp);
    mob.status = mob.hp <= 0 ? '已擊敗' : '不爽';
  });
}

const checkBattleConditions = () => {
  const allPlayersDead = gamePlayer.every(player => player.hp <= 0);
  const bossDefeated = gameMobs[0].hp <= 0;

  if (allPlayersDead || bossDefeated) {
    isGameOver = true;
    showBattleResult(bossDefeated ? 'victory' : 'defeat');
  }
}

const renderUI = () => {
  // 重新渲染玩家和怪物狀態
  createPlayers();
  creatMobs();
}

const showBattleResult = (result) => {
  const resultScope = document.getElementById('result');

  // 創建重新開始按鈕
  const resetButton = document.createElement('button');
  resetButton.textContent = '重新開始';
  resetButton.className = 'reset-button';
  resetButton.addEventListener('click', resetGame);

  // 創建結果文字
  const messageText = result === 'victory'
    ? `恭喜擊敗${gameMobs[0].name}！`
    : '戰鬥失敗...';

  // 清空並設置新內容
  resultScope.innerHTML = '';
  resultScope.insertAdjacentHTML('beforeend', `<p>${messageText}</p>`);
  resultScope.appendChild(resetButton);
}


// Helper functions
const getMaxHp = (playerName) => {
  const originalPlayer = players.find(p => p.name === playerName);
  return originalPlayer ? originalPlayer.hp : 0;
}

const getMaxMp = (playerName) => {
  const originalPlayer = players.find(p => p.name === playerName);
  return originalPlayer ? originalPlayer.mp : 0;
}

const resetGame = () => {

  // 重置遊戲結束標記
  isGameOver = false;

  // 重置遊戲狀態
  gamePlayer = cloneDeep(players);
  gameMobs = cloneDeep(mobs);

  // 清空結果顯示
  document.getElementById('result').innerHTML = '';

  // 重新渲染 UI
  createPlayers();
  creatMobs();

  // 重置累積傷害（因為這是新遊戲）
  accumulatedDamage = 0;
}

// Fix: Define attackMethods as as property of the window object. Originally attackMethods is defined in a local scope, which makes it inaccessible to the inline onclick handlers.
window.attackMethods = (playerIndex, playerSkill) => {
  // 如果遊戲已經結束，直接返回
  if (isGameOver) {
    return;
  }

  const player = gamePlayer[playerIndex];
  const skill = player.skill[playerSkill];
  const resultScope = document.getElementById('result');

  // Check if player has enough MP
  if (skill.cost > player.mp) {
    resultScope.innerHTML = `${player.name} 的 MP 不足！`;
    return;
  }

  // Deduct MP cost
  player.mp -= skill.cost;

  // Apply skill effects
  if (skill.id === 5) {
    handleHealing(player, skill);
  } else {
    handleAttack(player, skill);
  }
}

const handleHealing = (player, skill) => {
  gamePlayer.forEach(target => {
    if (target.hp > 0) {
      target.hp = Math.min(getMaxHp(target.name), target.hp + skill.damage);
    }
  });

  // 更新遊戲狀態
  updateGameState();

  // 顯示治療訊息
  const healMessage = `${player.name} 對 我方成員 使出 ${skill.name} 恢復了 <span class="heal-number">${skill.damage}</span> HP！`;
  displayBattleAndResult(healMessage);
}

// 添加累積傷害追蹤
let accumulatedDamage = 0;

const handleAttack = (player, skill) => {
  const boss = gameMobs[0];

  // 造成傷害
  boss.hp -= skill.damage;

  // 累積這次的傷害
  accumulatedDamage += skill.damage;

  // 顯示攻擊訊息，將傷害數字用 span 包裝
  let battleMessage = `${player.name} 對 ${boss.name} 使出 ${skill.name} 造成了 <span class="damage-number">${skill.damage}</span> 傷害！`;

  // 檢查是否會觸發 BOSS 反擊（累積傷害超過 2000）
  if (boss.hp > 0 && accumulatedDamage >= 2000) {
    battleMessage += executeBossAttack();
    // 反擊後，累積傷害歸零重新計數
    accumulatedDamage = 0;
  }

  // 更新遊戲狀態
  updateGameState();

  // 檢查戰鬥結果並顯示完整訊息
  displayBattleAndResult(battleMessage);
}

// 新增的顯示函數，整合戰鬥訊息和結果
const displayBattleAndResult = (battleMessage) => {
  const resultScope = document.getElementById('result');
  const allPlayersDead = gamePlayer.every(player => player.hp <= 0);
  const bossDefeated = gameMobs[0].hp <= 0;

  // 使用帶有樣式的 div 包裝戰鬥訊息
  let fullMessage = `<div class="battle-message">${battleMessage}</div>`;

  // 如果戰鬥結束，添加結果訊息
  if (allPlayersDead || bossDefeated) {
    isGameOver = true;
    const resultMessage = bossDefeated ?
      `<div class="battle-result">恭喜擊敗${gameMobs[0].name}！</div>` :
      '<div class="battle-result">戰鬥失敗...</div>';

    // 使用容器包裝所有內容
    fullMessage = `
      <div class="message-container">
        ${fullMessage}
        ${resultMessage}
      </div>
    `;

    // 更新顯示內容
    resultScope.innerHTML = fullMessage;

    // 創建並添加按鈕
    const resetButton = document.createElement('button');
    resetButton.textContent = '重新開始';
    resetButton.className = 'reset-button';
    resetButton.addEventListener('click', resetGame);

    // 創建按鈕容器
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'button-container';
    buttonContainer.appendChild(resetButton);

    // 將按鈕容器加入到結果區域
    resultScope.appendChild(buttonContainer);
  } else {
    // 如果遊戲沒結束，使用容器包裝戰鬥訊息
    fullMessage = `
      <div class="message-container">
        ${fullMessage}
      </div>
    `;
    resultScope.innerHTML = fullMessage;
  }

  // 更新 UI
  renderUI();
}

const executeBossAttack = () => {
  const boss = gameMobs[0];
  const skill = boss.skill[0];

  gamePlayer.forEach(player => {
    if (player.hp > 0) {
      player.hp = Math.max(0, player.hp - skill.damage);
    }
  });

  // 返回反擊訊息而不是直接顯示，同樣將傷害數字用 span 包裝
  return `<br>${boss.name} 發動反擊！使出 ${skill.name} 對我方全體造成 <span class="damage-number">${skill.damage}</span> 傷害！`;
}
// -------------->