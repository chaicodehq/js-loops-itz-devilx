/**
 * 🏆 IPL Season Points Table
 *
 * IPL ka season chal raha hai aur tujhe points table banana hai!
 * Tujhe match results ka array milega, aur tujhe har team ke points
 * calculate karke sorted table return karna hai.
 *
 * Match result types:
 *   - "win": Winning team gets 2 points, losing team gets 0
 *   - "tie": Both teams get 1 point each
 *   - "no_result": Both teams get 1 point each (rain/bad light)
 *
 * Each match object: { team1: "CSK", team2: "MI", result: "win", winner: "CSK" }
 *   - For "tie" and "no_result", the winner field is absent or ignored
 *
 * Rules (use for loop with object accumulator):
 *   - Loop through matches array
 *   - Build an object accumulator: { "CSK": { team, played, won, lost, tied, noResult, points }, ... }
 *   - After processing all matches, convert to array and sort:
 *     1. By points DESCENDING
 *     2. If points are equal, by team name ASCENDING (alphabetical)
 *
 * Validation:
 *   - Agar matches array nahi hai ya empty hai, return []
 *
 * @param {Array<{team1: string, team2: string, result: string, winner?: string}>} matches
 * @returns {Array<{team: string, played: number, won: number, lost: number, tied: number, noResult: number, points: number}>}
 *
 * @example
 *   iplPointsTable([
 *     { team1: "CSK", team2: "MI", result: "win", winner: "CSK" },
 *     { team1: "RCB", team2: "CSK", result: "tie" },
 *   ])
 *   // CSK: played=2, won=1, tied=1, points=3
 *   // MI: played=1, won=0, lost=1, points=0
 *   // RCB: played=1, tied=1, points=1
 *   // Sorted: CSK(3), RCB(1), MI(0)
 */
export function iplPointsTable(matches) {
  if(!Array.isArray(matches) || matches.length <= 0){
    return [];
  }

    const resultArray = [];

  for(let i=0; i<matches.length; i++){
    const team1Name = matches[i].team1;
    const team2Name = matches[i].team2;
  
    const obj1 = {team: team1Name, played: 0, won: 0, lost: 0, tied: 0, noResult: 0, points: 0};
    const obj2 = {team: team2Name, played: 0, won: 0, lost: 0, tied: 0, noResult: 0, points: 0};

    if(matches[i].result === 'win'){
      const winner = matches[i].winner;
      if(winner === team1Name){
        obj1.won = obj1.won + 1;
        obj1.points = obj1.points + 2;
        obj2.lost = obj2.lost + 1;
        
      }else{
        obj2.won = obj2.won + 1;
        obj2.points = obj2.points + 2;
        obj1.lost = obj1.lost + 1;
      }
    }
    else if(matches[i].result === 'tie'){
      // points
      obj1.points = obj1.points + 1;
      obj2.points = obj2.points + 1;
      // tied
      obj1.tied = obj1.tied + 1;
      obj2.tied = obj2.tied + 1;
    }
    else{
      // points
      obj1.points = obj1.points + 1;
      obj2.points = obj2.points + 1;
      // no-result
      obj1.noResult = obj1.noResult + 1;
      obj2.noResult = obj2.noResult + 1;
    }
    // played
    obj1.played = obj1.played + 1;
    obj2.played = obj2.played + 1;

    if(resultArray.length === 0){
      resultArray.push(obj1,obj2)
    }
    else{
      let flag1 = true;
      let flag2 = true;
      resultArray.forEach((team)=>{
        if(team.team === team1Name){
          team.points += obj1.points;
          team.won += obj1.won;
          team.played += obj1.played;
          team.tied += obj1.tied;
          team.noResult += obj1.noResult;
          team.lost += obj1.lost
          flag1 = false;
        }

        if(team.team === team2Name){
          team.points += obj2.points;
          team.won += obj2.won;
          team.played += obj2.played;
          team.tied += obj2.tied;
          team.noResult += obj2.noResult;
          team.lost += obj2.lost
          flag2 = false;
        }
      })

      if(flag1){
        resultArray.push(obj1);
      }
      if(flag2){
        resultArray.push(obj2);
      }
    }
  }

  return resultArray.sort((team1, team2)=>{
    if(team1.points === team2.points){
      return team1.team.charCodeAt(0) - team2.team.charCodeAt(0);
    }

    return team2.points - team1.points
  })
}
