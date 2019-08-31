// -- REQUIRES --
const fs = require('fs');
const sqlGet = require('./SQLSetup.js');

const items = JSON.parse(fs.readFileSync('./GameJSON/item.json', 'utf8'));
const store = JSON.parse(fs.readFileSync('./GameJSON/store.json', 'utf8'));
const badges = JSON.parse(fs.readFileSync('./GameJSON/badge.json', 'utf8'));
const badgeStore = JSON.parse(fs.readFileSync('./GameJSON/badgeStore.json', 'utf8'));

// Needs to be added post-step
const teamList = JSON.parse(fs.readFileSync('./Data/teamlist.json', 'utf8'));

function checkTeam(teamID) {
  return teamList[teamID];
}

// Loads team data
function getTeamData(teamID) {
  // Check for team
  if (!teamList[teamID]) {
    throw "There was no team with that ID!";
  }

  // Return data for that team
  try {
    return { ...sqlGet.readTeam(teamID), ...JSON.parse(fs.readFileSync(`./Data/${teamList[teamID]}.json`, 'utf8')) };
  }
  catch (err) {
    throw "We couldn't find the data for that team!";
  }
}

// Loads team data only IF user ID is in ownerID
function getTeamDataCheck(teamID, userID) {
  const data = getTeamData(teamID);
  if (data.ownerID.includes(userID)) {
    return data;
  }
  else {
    throw "User is not part of the team!";
  }
}

// Saves team data
function saveTeamData(teamID, data) {
  // Check for team
  if (!teamList[teamID]) {
    throw "There was no team with that ID!";
  }

  // SQL save
  sqlGet.saveTeam(data);

  // Team save
  const dataJSON = { teamName: data.teamName, ownerID: data.ownerID, items: data.items, badges: data.badges, keyItems: data.keyItems };
  // Save data
  fs.writeFile(`./Data/${teamList[teamID]}.json`, JSON.stringify(dataJSON, null, 2), function(err) {
    if (err) throw err;
  });
}

// Create team
// Assumes ID doesn't already exist
function createTeam(teamID, teamJSON, teamName) {
  teamList[teamID] = teamID;
  sqlGet.createTeam(teamID, teamName);
  // Save teamlist
  fs.writeFile('./Data/teamlist.json', JSON.stringify(teamList, null, 2), function(err) {
    if (err) throw err;
  });
  // Save team data
  fs.writeFile(`./Data/${teamID}.json`, JSON.stringify(teamJSON, null, 2), function(err) {
    if (err) throw err;
  });
}

module.exports = {
  items: items,
  store: store,
  badges: badges,
  loadData: getTeamData,
  loadCheck: getTeamDataCheck,
  saveData: saveTeamData,
  badgeStore: badgeStore,
  createTeam: createTeam,
  checkTeam: checkTeam,
};
