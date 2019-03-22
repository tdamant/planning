$(document).ready(async function(){
  const fetchName = async () => {
  let currentUser = await fetch ("/users");
  let currentUserId = await currentUser.json();
  return currentUserId[0].first_name;
  }

  let name = await fetchName();

  $("#greet_user").text(`${name}`);
});
