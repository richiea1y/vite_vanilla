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
const creatMobs = () => {
  let html = ''
  for (let i in mobs) {
    html += `
      <div class="cards">
        <div class="row horizontal space">
          <b>${mobs[i].name}</b>
          <span>${mobs[i].class}</span>
        </div>
        <div class="row horizontal space">
          <b>HP</b>
          <span>${mobs[i].hp}</span>
        </div>
        <div class="row horizontal space">
          <b>MP</b>
          <span>${mobs[i].mp}</span>
        </div>
        <div class="row horizontal space">
          <b>狀態</b>
          <span>${mobs[i].status}</span>
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
  for (let i in players) {
    skills.push(players[i].skill.map(item => {
      return item.name
    }))
  }
  //console.log(skills)

  for (let i in players) {
    const createButton = () => {
      let html = ''
      let result = players[i].skill.map(item => {
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
            <b>${players[i].name}</b>
            <span>${players[i].class}</span>
          </div>
          <div class="row horizontal space">
            <b>HP</b>
            <span>${players[i].hp}</span>
          </div>
          <div class="row horizontal space">
            <b>MP</b>
            <span>${players[i].mp}</span>
          </div>
          <div class="row horizontal space">
            <b>狀態</b>
            <span>${players[i].status}</span>
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
const attackMethods = (playerIndex, playerSkill) => {
  const parsePlayerName = () => {
    return players[playerIndex].name
  }
  const parsePlayerSkill = () => {
    return players[playerIndex].skill[playerSkill].name
  }
  const resultScope = document.getElementById('result')

  resultScope.innerHTML = `${parsePlayerName()} 對 ${mobs[0].name} 使出 ${parsePlayerSkill()} 造成了 ${''} 傷害！`
  if (parsePlayerSkill() == '全體恢復(大)') {
    resultScope.innerHTML = `${parsePlayerName()} 對 我方成員 使出 ${parsePlayerSkill()} 恢復了 ${''} HP！`
  }
}
// -------------->