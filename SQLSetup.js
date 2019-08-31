const SQLite = require("better-sqlite3");
const arenasql = new SQLite('./Data/arena.sqlite');
// Change depending on number of battles
const numBattles = 24;

// Setup data
function setup() {
	// Check if the table exists
    const table = arenasql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'arena';").get();
    if (!table['count(*)']) {
		// If the table isn't there, create it and setup the database correctly.
		arenasql.prepare("CREATE TABLE arena (user TEXT PRIMARY KEY, team TEXT, level INTEGER, SP INTEGER, coins INTEGER, nextBattle INTEGER, nextQuest INTEGER);").run();
		// Ensure that the "user" row is always unique and indexed.
		arenasql.prepare("CREATE UNIQUE INDEX idx_scores_id ON arena (user);").run();
		arenasql.pragma("synchronous = 1");
		arenasql.pragma("journal_mode = wal");
	}
    const history = arenasql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'history';").get();
    if (!history['count(*)']) {
    // If the table isn't there, create it and setup the database correctly.
    arenasql.prepare("CREATE TABLE history (id INTEGER PRIMARY KEY, user TEXT, opponent TEXT, result TEXT, note TEXT, SP INTEGER, coins INTEGER, time INTEGER);").run();
    // Ensure that the "user" row is always unique and indexed.
    arenasql.pragma("synchronous = 1");
    arenasql.pragma("journal_mode = wal");
  }
}

// Create user
function createData(user, teamName) {
	const data = {
		user: user,
		team: teamName,
		level: 1,
		SP: 0,
		coins: 0,
		nextBattle: numBattles,
		nextQuest: 0,
	};

	// Save data
	arenasql.prepare("INSERT OR REPLACE INTO arena (user, team, level, SP, coins, nextBattle, nextQuest)"
		+ " VALUES (@user, @team, @level, @SP, @coins, @nextBattle, @nextQuest);").run(data);
}

function readTeamData(team) {
  return arenasql.prepare(`SELECT * FROM arena WHERE user = ?`).get(team);
}

function saveTeamData(team) {
  arenasql.prepare("INSERT OR REPLACE INTO arena (user, team, level, SP, coins, nextBattle, nextQuest)"
		+ " VALUES (@user, @team, @level, @SP, @coins, @nextBattle, @nextQuest);").run(team);
}

module.exports = {
  setup: setup,
  createTeam: createData,
  readTeam: readTeamData,
  saveTeam: saveTeamData,
};
