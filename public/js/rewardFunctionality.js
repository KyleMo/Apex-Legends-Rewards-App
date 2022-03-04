
let platform = "psn";
let platformUserIdentifier = "";
let previousPUI = "";
let previousPlat = "";
const psn = document.querySelector('#psn'),
      xbl = document.querySelector('#xbl'),
      origin = document.querySelector('#origin'),
      searchText = document.querySelector('#gamerTag'),
      sectionSelect = document.querySelector('#matches');


psn.addEventListener('click', (event) => {
  platform = "psn";
  psn.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
  psn.style.borderRadius = "10px"
  xbl.style.backgroundColor = "rgba(0, 0, 0, 0)";
  origin.style.backgroundColor = "rgba(0, 0, 0, 0)";
  searchText.placeholder = "Enter PlayStation Network Username";
})
xbl.addEventListener('click', (event) => {
  platform = "xbl";
  xbl.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
  xbl.style.borderRadius = "10px";
  origin.style.backgroundColor = "rgba(0, 0, 0, 0)";
  psn.style.backgroundColor = "rgba(0, 0, 0, 0)";
  searchText.placeholder = "Enter Xbox Live Username";
})
origin.addEventListener('click', (event) => {
  platform = "origin";
  xbl.style.backgroundColor = "rgba(0, 0, 0, 0)";
  origin.style.borderRadius = "10px";
  origin.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
  psn.style.backgroundColor = "rgba(0, 0, 0, 0)";
  searchText.placeholder = "Enter Origin Username";
})

document.querySelector('#gamerTag').addEventListener('click', (event) => {
  if (document.querySelector('.notFound') != null){
    document.querySelector('.notFound').remove();
  }
});
document.querySelector('#gamerTag').addEventListener('change', (event) => {
  platformUserIdentifier = event.target.value;
});
document.querySelector('#submit-search').addEventListener('click', (event) => {
  if (platformUserIdentifier === ""){
    alert("Please enter the gamertag for your " + document.querySelector("#"+platform).name + " account.")
  }
  else {
    try {
      getData(platform,platformUserIdentifier);
    }
    catch (e){
      alert("Please confirm you're entering a valid gamertag",e);
    }
  }
});


async function getData(platform, platformUserIdentifier) {
    if (platformUserIdentifier === previousPUI && platform === previousPlat){
      return;
    }
    //Testing if previousPUI is not "" is needed because after the first search, it
    //will no longer be "".We don't want to delete a table that doesn't yet
    //exist in the first iteration.
    else if(document.querySelector('table') != null){
      document.querySelector('table').remove()
    }

    let myHeaders = new Headers();
    myHeaders.append("TRN-Api-Key", "c3156608-1896-4485-87ce-37a467e40a42");
    let requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    try {
      const response = await fetch(`https://public-api.tracker.gg/v2/apex/standard/profile/${platform}/${platformUserIdentifier}/sessions`
            ,requestOptions);
      const apiData = await response.json();
      createLastFiveMatchesInDom(getLastFiveMatches(apiData))
      previousPUI = platformUserIdentifier;
      previousPlat = platform;
    }
    catch(err){
      const quickContainer = document.createElement('section');
      const accountNotFound = document.createElement('h3');
      quickContainer.classList.add('notFoundSec');
      accountNotFound.classList.add('notFound');
      console.log(err);
      accountNotFound.innerText = "Account was not found. Please ensure you typed the username in correctly and selected the correct platform."
      document.querySelector('.main-content').insertAdjacentElement('afterend',quickContainer);
      quickContainer.appendChild(accountNotFound)
    }

}

function createLastFiveMatchesInDom(arr){

  if (arr.length === 0){
    const noMatchsWarning = document.createElement('h3');
    noMatchsWarning.innerText = "There are matches found on this account."
    noMatchsWarning.classList.add("noMatchsWarningStyles")
    document.querySelector('.main-content').insertAdjacentElement('afterend',noMatchsWarning);

    return null;
  }

  const matchTable = document.createElement('table');
    matchTable.classList.add("matchTableStyles");
    sectionSelect.appendChild(matchTable);
  addTableHeaders(matchTable);
  const tbody = document.createElement('tbody');
    matchTable.appendChild(tbody);
    addTableBody(tbody,arr);
}

function getLastFiveMatches(apiData){
  let matchesArr = [];

  //Start by iterating through the all the sessions played,
  //Then iterate through each match in said sessions.
  for (let i=0;i<apiData.data.items.length;i++){
    for (let j=0;j<apiData.data.items[i].matches.length;j++){
      if (matchesArr.length < 5){
        matchesArr.push(apiData.data.items[i].matches[j])
      }
      else{
        break;
      }
    break;
    }
  }
  return matchesArr
}

//Sometimes values simply aren't included in the JSON file from the API.
// Using try and catches to get around this
function testAndReturnValues(arr){
  let valuesArr = [],
      kills = "",
      headshots = "",
      damage = "";

  //try for kills
  try {
    kills = arr.stats.kills.displayValue;
    valuesArr.push(kills)
  }
  catch {
    kills = "N/A";
    valuesArr.push(kills)
  }

  //try for headshots
  try {
    headshots = arr.stats.headshots.displayValue;
    valuesArr.push(headshots);
  }
  catch {
    headshots = "N/A";
    valuesArr.push(headshots);
  }

  //try from damage
  try {
    damage = arr.stats.damage.displayValue;
    valuesArr.push(damage);
  }
  catch {
    damage = "N/A";
    valuesArr.push(damage);
  }

  return valuesArr;
}

function addTableHeaders(matchTable) {
  let header = matchTable.createTHead()
  matchTable.appendChild(header);
  let headerRow = header.insertRow();
  header.classList.add("headerRow");

  for (let i=0;i<5;i++){
    let headerCell = document.createElement("TH");
    if (i==0){
      headerCell.innerText = "Match"
    }
    else if (i==1){
      headerCell.innerText = "Kills";
    }
    else if (i==2){
      headerCell.innerText = "Damage";
    }
    else if (i==3){
      headerCell.innerText = "Headshots";
    }
    else {
      headerCell.innerText = "Rewards";
    }
    headerRow.appendChild(headerCell);
  }
}

function addTableBody(tbody, matchesArr) {
  for (let i=0;i<matchesArr.length;i++){
    let getRewardBtn = document.createElement('button')
    let tr = tbody.insertRow();
    let c1 = tr.insertCell(),
        c2 = tr.insertCell(),
        c3 = tr.insertCell(),
        c4 = tr.insertCell(),
        c5 = tr.insertCell();

    let valueArr = testAndReturnValues(matchesArr[i])
    getRewardBtn.innerText = "Check for Reward"

    c5.appendChild(getRewardBtn);
    c1.innerText = i+1;
    c2.innerText = valueArr[0];
    c3.innerText = valueArr[2];
    c4.innerText = valueArr[1];
  }
}
