import { Player, TopScorer } from "./player.js";
import { Team } from "./team.js";
import { MyError } from "./error.js";

const input = document.querySelector(".input");
const search_player_btn = document.querySelector(".search-player-btn");
const league = document.querySelector(".league-select");
const topScorers_btn = document.querySelector(".topscorers-btn");
const teams_btn = document.querySelector(".teams-btn");
const cards = document.querySelector(".cards");
const err = document.querySelector(".error");

const API_KEY =
  "4944c03364424e4ed9b4f7cbc0f0cb4cfe0af96774495190393af8d5054a4ff1";

async function getPlayer(name) {
  const result = await fetch(
    `https://apiv3.apifootball.com/?action=get_players&player_name=${name}&APIkey=${API_KEY}`
  )
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new MyError("Server Error or your Network doesn't working!");
    })
    .catch((e) => {
      console.log(e.message);
    });
  return result;
}

async function getPlayerID(id) {
  const result = await fetch(
    `https://apiv3.apifootball.com/?action=get_players&player_id=${id}&APIkey=${API_KEY}`
  )
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new MyError("Server Error or your Network doesn't working!");
    })
    .catch((e) => {
      console.log(e.message);
    });
  return result;
}

async function getTopScorer(league) {
  const result = await fetch(
    `https://apiv3.apifootball.com/?action=get_topscorers&league_id=${league}&APIkey=${API_KEY}`
  )
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new MyError("Server Error or your Network doesn't working!");
    })
    .catch((e) => {
      console.log(e.message);
    });

  return result;
}

async function getTeam(league) {
  const result = await fetch(
    `https://apiv3.apifootball.com/?action=get_standings&league_id=${league}&APIkey=${API_KEY}`
  )
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new MyError("Server Error or your Network doesn't working!");
    })
    .catch((e) => {
      console.log(e.message);
    });
  return result;
}

function removeCards() {
  const card_items = document.querySelectorAll(".card");
  card_items.forEach((item) => item.remove());
}

function searchPlayer() {
  search_player_btn.addEventListener("click", async () => {
    const response = await getPlayer(input.value);

    if (response) {
      console.log(response);
      if (response.error !== undefined) {
        err.classList.remove("hidden");
        err.innerHTML = "Invalid Input!";
      } else {
        removeCards();
        err.classList.add("hidden");
        const p = new Player(
          response[response.length - 1].player_name,
          response[response.length - 1].player_age,
          response[response.length - 1].team_name,
          response[response.length - 1].player_rating,
          response[response.length - 1].player_match_played,
          response[response.length - 1].player_minutes
        );
        addCardPlayer(p, response[response.length - 1].player_image);
      }
    } else {
      err.classList.remove("hidden");
      err.innerHTML = "Server Error!";
    }
  });
}

function searchTopScorer() {
  topScorers_btn.addEventListener("click", async () => {
    const response_scorer = await getTopScorer(parseInt(league.value));

    if (response_scorer) {
      removeCards();
      let count = 0;
      response_scorer.forEach(async (item, index) => {
        const response = await getPlayerID(item.player_key);

        if (response) {
          if (response.error !== undefined) {
            err.classList.remove("hidden");
            err.innerHTML = "Can't found player!";
          } else {
            err.classList.add("hidden");
            const p = new TopScorer(
              item.goals,
              item.player_place,
              response[response.length - 1].player_shots_total,
              response[response.length - 1].player_name,
              response[response.length - 1].player_age,
              response[response.length - 1].team_name,
              response[response.length - 1].player_rating,
              response[response.length - 1].player_match_played,
              response[response.length - 1].player_minutes
            );

            addCardPlayer(p, response[response.length - 1].player_image, index);
          }
          count++;
          if (count === response_scorer.length) {
            moreInfo();
          }
        } else {
          err.classList.remove("hidden");
          err.innerHTML = "Server Error! Can't found players";
        }
      });
    } else {
      err.classList.remove("hidden");
      err.innerHTML = "Server Error!";
    }
  });
}

function searchTeam() {
  teams_btn.addEventListener("click", async () => {
    const response = await getTeam(league.value);

    if (response) {
      err.classList.add("hidden");
      removeCards();
      response.forEach((item) => {
        const team = new Team(
          item.team_name,
          item.overall_league_position,
          item.overall_league_W,
          item.overall_league_D,
          item.overall_league_L,
          item.overall_league_PTS
        );
        addCardTeam(team, item.team_badge);
      });
    } else {
      err.classList.remove("hidden");
      err.innerHTML = "Server Error!";
    }
  });
}

function addCardPlayer(player, img, index) {
  const card_item = document.createElement("div");
  card_item.classList.add("card");
  card_item.id = `card-${index}`;
  card_item.innerHTML = player.renderPlayer(img, index);
  cards.prepend(card_item);
}

function addCardTeam(team, img) {
  const team_item = document.createElement("div");
  team_item.classList.add("card");
  team_item.innerHTML = team.renderTeam(img);
  cards.prepend(team_item);
}

function moreInfo() {
  const more_btn = document.querySelectorAll(".more-btn");
  more_btn.forEach((btn) => {
    btn.addEventListener("click", function () {
      const stats = document.querySelector(`.advanced-${this.id}`);
      stats.classList.toggle("hidden");
      if (this.innerHTML === "More") {
        this.innerHTML = "Less";
      } else {
        this.innerHTML = "More";
      }
    });
  });
}

searchPlayer();
searchTopScorer();
searchTeam();
