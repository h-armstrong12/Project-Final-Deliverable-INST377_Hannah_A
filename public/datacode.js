async function loaduserdata(){
  await fetch('/usersongs')
  .then((resp) => resp.json())
  .then((resp) => {
      console.log(resp);

      const table = document.createElement('table');
      

      const tableRow = document.createElement('tr');
      const tableHeadingusername = document.createElement('th');
      tableHeadingusername.innerHTML = "Name";

      const tableHeadingfavartist = document.createElement('th');
      tableHeadingfavartist.innerHTML = "Favorite Artist";

      const tableHeadingfavsong = document.createElement('th');
      tableHeadingfavsong.innerHTML = "Favorite Song";
      tableRow.appendChild(tableHeadingusername);
      tableRow.appendChild(tableHeadingfavartist);
      tableRow.appendChild(tableHeadingfavsong);

      table.appendChild(tableRow);

      //adding data
      resp.forEach((user) => {
      const usertablerow = document.createElement('tr');
      const usertableusername = document.createElement('td');
      const usertableartist = document.createElement('td');
      const usertablesong = document.createElement('td');

      usertableusername.innerHTML = user['user_name'];
      usertableartist.innerHTML = user['user_favorite_artist'];
      usertablesong.innerHTML = user['user_favorite_song'];
      
      usertablerow.appendChild(usertableusername)
      usertablerow.appendChild(usertableartist)
      usertablerow.appendChild(usertablesong)

      table.appendChild(usertablerow);



    
    });


      document.body.appendChild(table);


  });
}

window.onload = function(){
    loaduserdata();


}