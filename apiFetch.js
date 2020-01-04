const API_KEY = '75d23ba8270ad30710994ff25cd75eaf'; // The API KEY
const upcomingMoviesContainer = document.getElementById('upcoming-movies');//for upcoming movies fetch
const popularsmoviesContainer  = document.getElementById('populars-movies');//for popular movies fetch
const nowplayingMovieContainer = document.getElementById('nowplaying-movies');//for nowplaying movies fetch
//generateUrl for getting diffrent data
const generateUrl = (path)=>{
    const url =`https://api.themoviedb.org/3${path}?api_key=${API_KEY}`;
    return url;
};

//this method will render movies upcoming top rated etc and append it on the moviescontainer ! not the search movie container!
const renderMovies = (data,container)=>{
    
    
    const movies = data.results; // get the results
    
    
    const movieBlock = createMovieContainer(movies); //use the func to lop movie container
    
    container.appendChild(movieBlock); //append to the fathet div

};



const upcomingMovies = () => {
const upcomingMoviesData = generateUrl('/movie/upcoming');
    fetch(upcomingMoviesData)
    .then((res)=>res.json())
    .then((data)=>{
        renderMovies(data,upcomingMoviesContainer);

    })
    .catch(err=>{console.log(err);})
};

const popularMovies = () => {
    const popularMovieData = generateUrl('/movie/popular');
        fetch(popularMovieData)
        .then((res)=>res.json())
        .then((data)=>{
            renderMovies(data,popularsmoviesContainer);
    
        })
        .catch(err=>{console.log(err);})
     };
    
 const nowplayingMovies = () => {
     const nowplaytingData = generateUrl('/movie/now_playing');
            fetch(nowplaytingData)
            .then((res)=>res.json())
            .then((data)=>{
                renderMovies(data,nowplayingMovieContainer);
        
            })
            .catch(err=>{console.log(err);})
};
        


