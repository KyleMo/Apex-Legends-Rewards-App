const matchesArr = []; //should this be defined globally?

let platform = "psn";
let platformUserIdentifier = "";
const psn = document.querySelector('#psn');
const xbl = document.querySelector('#xbl');
const origin = document.querySelector('#origin');
const searchText = document.querySelector('#gamerTag');


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
document.querySelector('#gamerTag').addEventListener('change', (event) => {
  platformUserIdentifier = event.target.value;
})
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
    let myHeaders = new Headers();
    myHeaders.append("TRN-Api-Key", "c3156608-1896-4485-87ce-37a467e40a42");
    let requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    const response = await fetch(`https://cors-anywhere.herokuapp.com/https://public-api.tracker.gg/v2/apex/standard/profile/${platform}/${platformUserIdentifier}/sessions`
      ,requestOptions);
    const apiData = await response.json();

    for (let i=0;i<apiData.data.items.length;i++){
      for (let j=0;j<apiData.data.items[i].matches.length;j++){
        if (matchesArr.length < 5){
          matchesArr.push(apiData.data.items[i].matches[j])
        }
        else{
          break;
        }
      break;}
    }

    //at this points matchesArr is populated
    //next i need to place the stats from these games as li elements into the dom
    console.log(matchesArr);
}
