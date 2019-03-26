
        //<p id="stages-list" ></p> <br>

// $(document).ready(async () => {
//
//   const getUrlParams = (name) => {
//       var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
//       return results[1];
//   };
//
//   const getData = async () => {
//     let tripId = await getUrlParams('id');
//     let userId = await $.get("/whoami");
//     let pollsData = await $.get("/polls/getPolls", {tripId: tripId });
//     let votes = await $.get("/polls/votes", {tripId: tripId});
//     return {
//       tripId: tripId,
//       userId: userId,
//       pollsData: pollsData,
//       votes: votes
//     }
//   };
//
//
//   let data = await getData();
//   addPolls(data.pollsData);
//
//
// });
