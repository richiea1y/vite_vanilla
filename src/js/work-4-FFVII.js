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
    isGameOver = true; // 設置遊戲結束狀態
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
  const buttonHtml = '<button onclick="window.resetGame()" class="reset-button" style="background-color: #ff4444;color: white;border: 2px solid #cc0000;padding: 8px 16px;border-radius: 4px;cursor: pointer;font-weight: bold;transition: background-color 0.3s;box-shadow: 0 2px 4px rgba(0,0,0,0.2);">重新開始</button>';

  if (result === 'victory') {
    resultScope.innerHTML = `
      <div class="battle-result">
        <p>恭喜擊敗${gameMobs[0].name}！</p>
        ${buttonHtml}
      </div>
    `;
  } else {
    resultScope.innerHTML = `
      <div class="battle-result">
        <p>戰鬥失敗...</p>
        ${buttonHtml}
      </div>
    `;
  }
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
  // 重置遊戲狀態
  gamePlayer = cloneDeep(players);
  gameMobs = cloneDeep(mobs);
  isGameOver = false; // 重置遊戲結束標記

  // 清空結果顯示
  document.getElementById('result').innerHTML = '';

  // 重新渲染 UI
  createPlayers();
  creatMobs();
}

// 為了確保 resetGame 可以從 HTML 中調用
window.resetGame = resetGame;

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
  if (skill.name === 'ケアルガ（全體恢復）') {
    handleHealing(player, skill);
  } else {
    handleAttack(player, skill);
  }

  // Update game state
  updateGameState();
}

const handleHealing = (player, skill) => {
  const resultScope = document.getElementById('result');
  resultScope.innerHTML = `${player.name} 對 我方成員 使出 ${skill.name} 恢復了 ${skill.damage} HP！`;

  gamePlayer.forEach(target => {
    if (target.hp > 0) {
      target.hp = Math.min(getMaxHp(target.name), target.hp + skill.damage);
    }
  });
}

const handleAttack = (player, skill) => {
  const boss = gameMobs[0];
  const resultScope = document.getElementById('result');
  resultScope.innerHTML = `${player.name} 對 ${boss.name} 使出 ${skill.name} 造成了 ${skill.damage} 傷害！`;

  const previousHp = boss.hp;
  boss.hp -= skill.damage;

  // Check for boss counter-attack
  if (boss.hp > 0 && Math.floor(previousHp / 2000) > Math.floor(boss.hp / 2000)) {
    executeBossAttack();
  }
}

const executeBossAttack = () => {
  // 如果遊戲已經結束，不執行攻擊
  if (isGameOver) {
    return;
  }

  const boss = gameMobs[0];
  const skill = boss.skill[0];
  const resultScope = document.getElementById('result');

  gamePlayer.forEach(player => {
    if (player.hp > 0) {
      player.hp = Math.max(0, player.hp - skill.damage);
    }
  });

  resultScope.innerHTML += `<br>${boss.name} 反擊！使出 ${skill.name} 對我方全體造成 ${skill.damage} 傷害！`;
}
// -------------->