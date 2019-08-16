// -- REQUIRES --
const fs = require('fs');

const items = JSON.parse(fs.readFileSync('./GameJSON/item.json', 'utf8'));
const store = JSON.parse(fs.readFileSync('./GameJSON/store.json', 'utf8'));
const badges = JSON.parse(fs.readFileSync('./GameJSON/badge.json', 'utf8'));
const badgeStore = JSON.parse(fs.readFileSync('./GameJSON/badgeStore.json', 'utf8'));

// Needs to be added post-step
const teamList = JSON.parse(fs.readFileSync('./Data/teamlist.json', 'utf8'));

// Loads team data
function getTeamData(teamID) {
  // Check for team
  if (!teamList[teamID]) {
    throw "There was no team with that ID!";
  }

  // Return data for that team
  try {
    return JSON.parse(fs.readFileSync(`./Data/${teamList[teamID]}.json`, 'utf8'));
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

  // Save data
  fs.writeFile(`./Data/${teamList[teamID]}.json`, JSON.stringify(data, null, 2), function(err) {
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
};
