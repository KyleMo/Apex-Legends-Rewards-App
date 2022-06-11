const determineReward = (kills, rankScoreChange) => {

  if (rankScoreChange === 0){
    rankScoreChange = 1
  }

  if (rankScoreChange < 0){
    return false;
  }

  if(kills > 15 | rankScoreChange > 175){
    return true
  }

  if((kills * rankScoreChange) > 1000){
    return true
  }

  return false
}

export default determineReward
