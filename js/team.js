export class Team {
  constructor(name, position, wins, draws, loses, pts) {
    this.name = name;
    this.position = position;
    this.wins = wins;
    this.draws = draws;
    this.loses = loses;
    this.pts = pts;
  }

  renderTeam(img) {
    if (img === "") {
      img = "../images/default-logo.png";
    }
    return `
      <img class="card-img" src=${img} alt="Team-image" />
      <h3 class="card-title">${this.name}</h3>
      <ul class="info">
        <li class="info-item">Position: ${this.position}</li>
        <li class="info-item">Wins: ${this.wins}</li>
        <li class="info-item">Draws: ${this.draws}</li>
        <li class="info-item">Loses: ${this.loses}</li>
        <li class="info-item">PTS: ${this.pts}</li>
      </ul>
  
      `;
  }
}
