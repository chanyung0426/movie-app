
export const fetchGenres = async ()=>{
    try{
        const res = await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=82776dd4e021405937c471b1f995902b&language=ko-KR')
        const data = await res.json();
        const genre = data.genre.reduce((acc,genre)=>{
            acc[genre.id]=genre.name;
            return acc
        },{})
        return genreMap;
    }catch(error){
        console.error(error)
    }
    
}