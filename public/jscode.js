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
  if (!musicidinfo || musicidinfo==""){ 
    alert('Please specify what Artist you would like to search for.')
      tablemusicinfo.innerHTML = "";
      return;
  }
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
  if (!musicidinfo){ 
    alert('Please specify what Artist you would like to search for.')
  }
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

  if (!artistq || !songq){
    alert("Make sure to specify the artist and song!");
  }

    fetch(`https://www.theaudiodb.com/api/v1/json/123/searchtrack.php?s=${artistq}&t=${songq}`)
    .then((resp) => resp.json())
    .then((resp)=> {
      console.log(resp.track[0]);

      document.getElementById('songsearchresults').innerHTML=`Song: ${resp.track[0].strTrack}, Artist: ${resp.track[0].strArtist}
      , Album: ${resp.track[0].strAlbum}`;

    })
}


function trending(){
  fetch('https://www.theaudiodb.com/api/v1/json/123/trending.php?country=us&type=itunes&format=singles')
  .then((resp) => resp.json())
  .then((resp) => {
    console.log(resp.trending)
    
    trendingsongs = resp.trending

      document.getElementById('trending1').innerHTML = `"${trendingsongs[0].strTrack}" by ${trendingsongs[0].strArtist}`
      document.getElementById('trending2').innerHTML = `"${trendingsongs[1].strTrack}" by ${trendingsongs[1].strArtist}`
      document.getElementById('trending3').innerHTML = `"${trendingsongs[2].strTrack}" by ${trendingsongs[2].strArtist}`



  })
}

window.onload = function(){
    musicpictures();
    trending()


}