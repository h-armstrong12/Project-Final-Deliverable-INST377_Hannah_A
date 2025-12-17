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
  const imageurls = []
  const fetchsongimg = [];

  while (imageurls.length < 10){
    const songimgid = generateRandomNumbers(1, 111239, 112573)[0];
  }
    for (let index = 0; index < 10; index++){
      fetchsongimg.push(
     fetch(`https://dog.ceo/api/breeds/image/random`)
    .then((resp) => resp.json())
        .then((resp) => {
      const image = resp.message;
      imageurls.push(image)
      
     })
    );
    } 
    await Promise.all(fetchsongimg);
  console.log(imageurls);
    const imagediv = document.getElementById('imagecontainer');      

    imageurls.forEach((dogs) => {
        const dogimage = document.createElement('img');
        dogimage.src = dogs;
        dogimage.style.width ="400px";

        imagediv.appendChild(dogimage); 

        
      })
    simpleslider.getSlider({
      container: document.getElementById('imagecontainer'),
      transitionTime:1,
      delay: 3.5
    });

}

window.onload = function(){
    musicpictures();
    musicnumbercount();



}