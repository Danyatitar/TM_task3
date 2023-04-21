export class Player {
  constructor(name, age, team, rating, games, minutes) {
    this.name = name;
    this.age = age;
    this.team = team;
    this.rating = rating;
    this.games = games;
    this.minutes = minutes;
  }

  getPercentageOfUsage() {
    return Math.round(parseFloat(this.minutes) / parseFloat(this.games) / 0.9);
  }
  renderPlayer(img) {
    if (img === "") {
      img = "../TM_task3/images/default_player.jpg";
    }
    return `
    <img class="card-img" src=${img} onerror="this.src='../TM_task3/images/default_player.jpg'" alt="Player-image" />
    <h3 class="card-title">${this.name}</h3>
    <ul class="info">
      <li class="info-item">Age: ${this.age}</li>
      <li class="info-item">Team: ${this.team}</li>
      <li class="info-item ${!this.rating ? "hidden" : ""}">Rating: ${
      this.rating
    }</li>
      <li class="info-item">Games: ${this.games}</li>
      <li class="info-item">Minutes: ${this.minutes}</li>
    </ul>

    `;
  }
}

export class TopScorer extends Player {
  constructor(goals, position, shots, ...args) {
    super(...args);
    this.goals = goals;
    this.position = position;
    this.shots = shots;
  }
  renderPlayer(img, index) {
    if (img === "") {
      img = "../TM_task3/images/default_player.jpg";
    }
    return `
    <img class="card-img" src=${img}  onerror="this.src='../TM_task3/images/default_player.jpg'" alt="Player-image" />
    <h3 class="card-title">${this.name}</h3>
    <ul class="info">
      <li class="info-item">Age: ${this.age}</li>
      <li class="info-item">Team: ${this.team}</li>
      <li class="info-item ${!this.rating ? "hidden" : ""}">Rating: ${
      this.rating
    }</li>
      <li class="info-item">Rank: ${this.position}</li>
      <li class="info-item">Goals: ${this.goals}</li>
  </ul>
  <button class="btn more-btn" id=${index}>More</button>
  <div class="advanced-${index} hidden">
  <h3 class="card-title">Advanced Stats</h3>
  <ul class="info">
    <li class="info-item">Usage:
    ${this.getPercentageOfUsage()}%</li>
    <li class="info-item">Goals per Match: ${this.getGoalsPerMatch()}</li>
  </ul>
  </div>
  `;
  }

  getGoalsPerMatch() {
    return Math.round((this.goals / this.games) * 100) / 100;
  }
}
