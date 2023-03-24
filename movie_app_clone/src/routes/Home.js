// 영화 앱 화면
import React from 'react';
import axios from 'axios';
import Movie from '../components/Movie';
import './Home.css';

class Home extends React.Component{
    state = {
        isLoading : true,
        movies : []     // 로딩된 영화 데이터 저장
    };

    getMovies = async () => {
        // console.log(movies.data.data.movies);
        const {
            data : {        // data ->
                data : { movies },      // data -> movies
            },
        } = await axios.get('https://yts-proxy.now.sh/list_movies.json?sort_by=rating');
        
        this.setState({movies, isLoading : false});        
    }

    // 영화앱 로딩
    componentDidMount(){        
        this.getMovies();
    }
    
    render(){
        // 구조 분해 할당으로 this.state에 있는 isLoading을 우선 얻으면 항상 this.state를 입력할 필요 없음
        const { isLoading, movies } = this.state;
        return (
            <section className="container">
                {isLoading ? (
                    <div className="loader">
                        <span className="loader__text">Loading...</span>
                    </div>
                ): (
                    <div className="movies">
                        {movies.map(movie => (
                            <Movie
                                key = {movie.id}
                                id = {movie.id}
                                year = {movie.year}
                                title = {movie.title}
                                summary = {movie.summary}
                                poster = {movie.medium_cover_image}
                                genres = {movie.genres}
                            />   
                        ))}
                    </div>
                )}
            </section>
        );
    }
}

export default Home;