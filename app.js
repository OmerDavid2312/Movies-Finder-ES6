//select elements DOM
const buttonElement = document.getElementById('search');
const inputElement = document.getElementById('inputValue');
const movieSearchable = document.getElementById('movie-searchable');


const movieSection = (movies) =>{
    //loop the object to get each movie detail.
    return movies.map((movie)=>{
        if(movie.poster_path)
        {
        return `<img src=https://image.tmdb.org/t/p/w500${movie.poster_path} data-movie-id=${movie.id}/>`;
        }
    })
};

const createMovieContainer = (movies)=>{
    const movieElement = document.createElement('div');
    movieElement.setAttribute('class','movie');
    const movieTemplate = `
    <section class="section">
    ${movieSection(movies)}
    </section>
    <div class="content"><p id="content-close"></p></div>`;
    movieElement.innerHTML=movieTemplate;
    
    return movieElement; //which is now Full of the template !
};


const renderSearchMovies = (data)=>{
    movieSearchable.innerHTML = "";//reset the currect result
    const movies = data.results; // get the results
    
    
    const movieBlock = createMovieContainer(movies); //use the func to lop movie container
    movieSearchable.appendChild(movieBlock); //append to the fathet div

};


//when click on search button
buttonElement.addEventListener('click',(event)=>{
    event.preventDefault();
    const value = inputElement.value;
    if(value.trim()==="")
    {
        alert('Please Enter Input');return;
    }
    const path = '/search/movie';
    const newUrl = generateUrl(path) +'&query=' + value;
    fetch(newUrl)
           .then((res)=>res.json())//make result as json
           .then((data)=>{ // then the Data
            renderSearchMovies(data); 
              
           })
            .catch((error)=>{
                console.log(error);
            });
            inputElement.value = ""; //reset the value after submit
});
//for click the img and get detail
document.onclick = (event)=>{
    const target = event.target;
    if(target.tagName.toLowerCase()==='img')
    {
       
       const movieid = event.target.dataset.movieId; //get movie id thanks to target and dataset than movie id
       const rendermovieid = movieid.substring(0, movieid.length - 1);//need to delete / in 561/
       
      const section = event.target.parentElement;//get the parent
      
      const content = section.nextElementSibling;  //content
      
      content.classList.add('content-display');

      ////////Fetch Movie Detail!///////////////
      const specificMovie = generateUrl(`/movie/${rendermovieid}`)
      
      fetch(specificMovie)
      .then((res)=>res.json())//make result as json
      .then((data)=>{ // then the Data
        
       const infoTemplate = `<div class="container"><span id="delete" class="text-info font-weight-bold badge badge-dark">X</span>
       <div class="row">
       <div class="col-4 h-100">
       <img src=https://image.tmdb.org/t/p/w500${data.poster_path} height="100%" width="100%">
       
       </div>
       <div class="col-8"> <h2 class="mt-4">${data.title}</h2>
       <span class="badge badge-primary">Popularity: ${data.popularity}</span>
       <span class="badge badge-info">Release Date: ${data.release_date}</span>
       <span class="badge badge-success">status: ${data.status}</span>
       
       <p class="text-bold mt-3">${data.overview}</p>
       
       <span class="badge badge-light">Runtime : ${data.runtime} Minutes</span></div>
     
        </div>
        </div>
        `;
       
       content.innerHTML = infoTemplate;
       document.getElementById('delete').addEventListener('click',(e)=>{
        let containertooff = e.target.parentElement.parentElement;
        
        
        containertooff.classList.remove('content-display');
        e.target.parentElement.remove();
        
       });
         
      })
       .catch((error)=>{
           console.log(error);
       });
    }
    if(target.id==='content-close')
    {
        const content = target.parentElement;
        content.classList.remove('content-display');
    }
};



//init
upcomingMovies();
popularMovies();
nowplayingMovies();