function getRandomInRange(from, to, fixed){
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
}

function generateRandomNumbers(count, min, max){
    const randomnumbers = [];
    for (let i = 0; i < count; i++){
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        randomnumbers.push(randomNumber);
    }
    return randomnumbers;
}

async function musicpictures(){
  const imageurls = [];
  const fetchsongimg = [];

  while (imageurls.length < 4){
    const songimgid = generateRandomNumbers(1, 111239, 112573)[0];
 

      fetchsongimg.push(
      fetch(`https://www.theaudiodb.com/api/v1/json/123/album.php?i=${songimgid}`)
    .then((resp) => resp.json())
        .then((resp) => {

        resp.album.forEach(album => {
          if (album.strAlbumThumb && !imageurls.includes(album.strAlbumThumb) && imageurls.length < 4){
            imageurls.push(album.strAlbumThumb);
          }
    
     });
  })
  .catch(() => {})
);

 if (fetchsongimg.length >= 4) break;
}

    await Promise.all(fetchsongimg);
  console.log(imageurls);
    const imagediv = document.getElementById('imagecontainer');      

  imageurls.forEach((songspic) => {
        const albumimage = document.createElement('img');
        albumimage.src = songspic;

        imagediv.appendChild(albumimage); 
  });
        

    simpleslider.getSlider({
      container: document.getElementById('imagecontainer'),
      transitionTime:1,
      delay: 3.5
    });
  }


function clearinfo() {
  const tablebody = document.getElementById('tabledata');
  tablebody.innerHTML = ``;
  document.getElementById("Album").innerText = '';
  document.getElementById("Year").innerText = '';
  document.getElementById('artistbio').innerText = '';
}



function getmusicinfo(){    
  clearinfo();      

  const musicidinfo = document.getElementById('searchinput').value.trim();
  if (!musicidinfo) return;
  console.log(musicidinfo);
  fetch(`https://www.theaudiodb.com/api/v1/json/123/search.php?s=${musicidinfo}`)
  .then((resp) => resp.json())
    .then((resp)=> {

      musicinformation = resp.artists[0].strBiographyEN;

      tablemusicinfo = document.getElementById('artistbio');
      tablemusicinfo.innerHTML = musicinformation;
    })





}



function getalbums(){  
  const tablebody = document.getElementById('tabledata');

  clearinfo();
  const musicidinfo = document.getElementById('searchinput').value.trim();
  if (!musicidinfo) return;
  console.log(musicidinfo);


  fetch(`https://www.theaudiodb.com/api/v1/json/123/searchalbum.php?s=${musicidinfo}`)
  .then((resp) => resp.json())
    .then((resp)=> {
      console.log(resp.album);
      albuminformation = `${resp.album[0].intYearReleased}., ${resp.album[0].strAlbum}`
      console.log(albuminformation);

      albumlist = resp.album;
      
      albumlist.forEach((albums) => {
        if (!albums.strAlbum || !albums.intYearReleased){
            console.log('skip undefined values');
            return;
        }
        const row = document.createElement('tr');
        const albumcell = document.createElement('td');
        const yearcell = document.createElement('td');

        albumcell.innerText = albums.strAlbum;
        row.append(albumcell);

        yearcell.innerText = albums.intYearReleased;
        row.appendChild(yearcell);


        tablebody.appendChild(row);

      });
      
      document.getElementById("Album").innerText = `${musicidinfo} album(s)`;
      document.getElementById("Year").innerText = `Year`;

    })


}




function songsearch(){
  document.getElementById('songsearchresults').innerHTML='';
  const artistq = document.getElementById('searchartist').value.trim();
  const songq = document.getElementById('searchsong').value.trim();

    fetch(`https://www.theaudiodb.com/api/v1/json/123/searchtrack.php?s=${artistq}&t=${songq}`)
    .then((resp) => resp.json())
    .then((resp)=> {
      console.log(resp.track[0]);

      document.getElementById('songsearchresults').innerHTML=`Song: ${resp.track[0].strTrack}, Artist: ${resp.track[0].strArtist}
      , Album: ${resp.track[0].strAlbum}`;

    })
}


async function loaduserdata(){
  await fetch('/usersongs')
  .then((resp) => resp.json())
  .then((resp) => {
      console.log(resp);

      const table = document.getElementById('databasetable');

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
    musicpictures();

}