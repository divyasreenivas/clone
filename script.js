const ban = document.getElementById("banner")
const bantitle= document.getElementById("title")
const bandisc = document.getElementById("discription")
const title = document.getElementById("titlee")
const date = document.getElementById("date")
const lang = document.getElementById("lan")
const rating = document.getElementById("rating")
const dis = document.getElementById("disc")
const closebtn =document.getElementById("close")
const cont =document.getElementById("con")

const API_KEY ="c1256905da155611d0d63cc7cb725daf";
const baseURL = "https://api.themoviedb.org/3";
const imageUrl = "https://image.tmdb.org/t/p/original/";

const requests = [
    `/discover/tv?api_key=${API_KEY}&with_networks=213`,
    `/trending/all/week?api_key=${API_KEY}&language=en-US`,
    `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    `/discover/movie?api_key=${API_KEY}&with_genres=28`,
    `/discover/movie?api_key=${API_KEY}&with_genres=35`,
    `/discover/movie?api_key=${API_KEY}&with_genres=27`,
    `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
    `/discover/movie?api_key=${API_KEY}&with_genres=99`
]

// async function datafetch(){
//     const response = await fetch(`${baseURL}${requests[0]}`)
//     const data = await response.json();

//     console.log(data)

// }
// datafetch()

//fetching data for movierows
async function fetchdata(){
    for (let i = 0 ; i<8;i++){
        const response = await fetch(`${baseURL}${requests[i]}`);
        const data = await response.json();
        var movie =data.results;
        console.log(movie);
        createrows(movie,i)
    }
    return movie
   
}
fetchdata();
// data to be added in rows 
function createrows(movie,i){
    movie.map((movie)=>{
        const imagee =document.getElementById(`imga${[i]}`);
        const poster = document.createElement("img");
        if (i>0){
            poster.src=`${imageUrl}${movie.backdrop_path}`;
        }else{
            poster.src=`${imageUrl}${movie.poster_path}`;
            poster.classList.add('largerimage')

        }
        poster.classList.add('image')
        imagee.appendChild(poster);

         //details of movies 
        poster.addEventListener("click",function(){
        console.log(movie)
        cont.style.display="flex"
        const movpoimg = document.getElementById("movposimg")
        movpoimg.src =`${imageUrl}${movie.poster_path}`;
        title.textContent = ( movie.title || movie.name || movie.original_name);
        date.textContent=movie.first_air_date;
        lang.textContent=movie.original_language;
        rating.textContent=movie.vote_average;
        dis.textContent=movie.overview;

        

         })
    })

}

//fetching data and displaying data 

async function fetchingbandata(){
    const banresponse = await fetch (`${baseURL}${requests[0]}`)
    const bandata =await banresponse .json();
    var banner = bandata.results;
    console.log(banner)
    const select = banner[Math.floor(Math.random()*banner.length)]
    console.log(select)
    ban.style.backgroundImage=`url(${imageUrl}${select.backdrop_path})`;
    bantitle.textContent=select.name;
    bandisc.textContent = select.overview;    
}
fetchingbandata()
// close about  container 
closebtn.addEventListener("click", function(){
    cont.style.display="none"

})