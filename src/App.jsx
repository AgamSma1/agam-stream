import React, { useState, useEffect } from 'react';
import { Play, X, ChevronDown, Star, ArrowRight, Menu, Search, Film } from 'lucide-react';

const TMDB_API_KEY = "YOUR_TMDB_API_KEY_HERE";
const VIDKING_EMBED_BASE = "https://vidsrc.to/embed";

const HERO_BACKGROUND_IMAGE_DESKTOP = "/10.jpg";
const HERO_BACKGROUND_IMAGE_MOBILE = "/10.jpg";

const AGAM_ORIGINALS = [
  {
    id: 'local-5',
    title: "Empathy: Mothers & Daughters",
    episode: "Episode 05",
    description: "The women of the family confront the childhoods that shaped them. Old wounds reopen, but so do chances to heal.",
    image: "/5.jpg",
    videoUrl: "https://drive.google.com/file/d/1dKp7N9hTFqcWh9J6tz1P1iMhzprjN7Sm/view?usp=sharing",
    duration: "43m",
    rating: "4.8",
    date: "Therapy Ka Safar",
    badge: "ORIGINAL"
  },
  {
    id: 'local-6',
    title: "Empathy: Fathers & Sons",
    episode: "Episode 06",
    description: "A trip meant for bonding turns into a confrontation with buried fears. One moment changes everything.",
    image: "/6.jpg",
    videoUrl: "https://www.dropbox.com/scl/fi/gcn8og7je0cfay3myqta6/ep6.mp4?rlkey=7slsbtydqznlvhfc4z950v6nm&st=z27owx8g&raw=1",
    duration: "37m",
    rating: "5.0",
    date: "Therapy Ka Safar",
    badge: "ORIGINAL"
  },
  {
    id: 'local-7',
    title: "Coping",
    episode: "Episode 07",
    description: "When life spirals, everyone finds their own way to survive. And one announcement shakes the entire family.",
    image: "/7.jpg",
    videoUrl: "https://www.dropbox.com/scl/fi/8tysj9p0l4yyvveb7adf9/ep7.mp4?rlkey=wpjhpyl220x9oyq7hfi7mx1d6&st=ykgs6dfb&raw=1",
    duration: "40m",
    rating: "4.7",
    date: "Therapy Ka Safar",
    badge: "ORIGINAL"
  },
  {
    id: 'local-8',
    title: "Family is Everything",
    episode: "Episode 08",
    description: "A wellness retreat forces the Karkarias to drop their guards. Healing isn’t peaceful, especially for a family learning to love again.",
    image: "/8.jpg",
    videoUrl: "https://www.dropbox.com/scl/fi/8vse0qcdwvlxvnrbmmahf/ep8.mp4?rlkey=29w1ja09oqhy26ge7qqjdrb1s&st=5f7ai7h2&raw=1",
    duration: "51m",
    rating: "5.0",
    date: "Season Finale",
    badge: "ORIGINAL"
  }
];

const FEATURED_MOVIES = [
  {
    id: 'movie-1',
    title: "Doraemon: Nobita's Dorabian Nights",
    episode: "Movie",
    description: "Nobita and his friends travel to the world of Arabian Nights using Doraemon's storybook shoes, but Shizuka gets trapped inside! They must go on a magical journey to rescue her.",
    image: "/dora.jpg",
    videoUrl: "https://drive.google.com/file/d/1QvhFo3c4_-65zGltu81olnCgZRIML-0y/view?usp=sharing",
    duration: "1h 40m",
    rating: "7.5",
    date: "Anime Classic",
    badge: "FEATURED"
  }
];

const ScrollProgress = () => {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setWidth(Number(totalScroll / windowHeight));
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return <div className="fixed top-0 left-0 h-1 bg-red-600 z-[100]" style={{ width: `${width * 100}%` }} />;
};

const VideoModal = ({ movie, onClose }) => {
  if (!movie) return null;

  const getVideoSource = (item) => {
    if (item.videoUrl && item.videoUrl !== '#') {
        const url = item.videoUrl;
        
        if (url.includes('drive.google.com')) {
            const id = url.split('/file/d/')[1]?.split('/')[0];
            return { type: 'iframe', src: `https://drive.google.com/file/d/${id}/preview`, isLocal: true };
        }
        return { type: 'direct', src: url, isLocal: true };
    }

    const mediaType = item.media_type || 'movie';
    return { 
        type: 'iframe', 
        src: `${VIDKING_EMBED_BASE}/${mediaType}/${item.id}`,
        isLocal: false
    };
  };

  const source = getVideoSource(movie);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 animate-in fade-in zoom-in duration-300">
      <div className="relative w-full max-w-6xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10">
        <button onClick={onClose} className="absolute top-4 right-4 md:top-6 md:right-6 z-50 bg-black/50 hover:bg-white/20 p-2 rounded-full text-white transition-all">
          <X size={24} className="md:w-8 md:h-8" />
        </button>

        {source.type === 'direct' ? (
             <video src={source.src} className="w-full h-full object-contain" controls autoPlay />
        ) : (
             <iframe 
               className="w-full h-full"
               src={source.src}
               title={movie.title || movie.name}
               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
               allowFullScreen
             />
        )}
        
        {!source.isLocal && (
            <div className="absolute bottom-4 right-4 text-xs text-gray-500 bg-black/80 px-2 py-1 rounded">
                Source: External API
            </div>
        )}
      </div>
    </div>
  );
};

const ContentRow = ({ title, data, onSelect }) => {
    if (!data || data.length === 0) return null;
    
    return (
        <div className="mb-12">
            <h2 className="text-xl md:text-2xl font-bold mb-6 px-6 md:px-24 flex items-center gap-2">
                <span className="w-1 h-6 bg-red-600 rounded-full inline-block"></span>
                {title}
            </h2>
            <div className="flex overflow-x-auto gap-4 px-6 md:px-24 pb-8 scrollbar-hide snap-x">
                {data.map((item) => (
                    <div 
                        key={item.id} 
                        onClick={() => onSelect(item)}
                        className="flex-shrink-0 w-[160px] md:w-[220px] group cursor-pointer snap-start"
                    >
                        <div className="aspect-[2/3] relative rounded-xl overflow-hidden mb-3 border border-white/10">
                            <img 
                                src={item.image || `https://image.tmdb.org/t/p/w500${item.poster_path}`} 
                                alt={item.title || item.name} 
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                onError={(e) => { e.target.src = "https://via.placeholder.com/500x750?text=No+Image" }}
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                            
                            {item.badge && (
                              <div className="absolute top-2 left-2 bg-red-600 text-[10px] font-bold px-2 py-0.5 rounded text-white tracking-wider">
                                {item.badge}
                              </div>
                            )}

                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="bg-red-600/90 p-3 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform">
                                    <Play size={20} className="fill-white text-white" />
                                </div>
                            </div>
                        </div>
                        <h3 className="font-bold text-sm md:text-base leading-tight group-hover:text-red-500 transition-colors line-clamp-1">
                            {item.title || item.name}
                        </h3>
                        <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                            <Star size={10} className="text-yellow-500 fill-yellow-500" />
                            <span>{item.vote_average ? item.vote_average.toFixed(1) : item.rating}</span>
                            <span>•</span>
                            <span>{item.badge ? item.episode || 'Movie' : (item.media_type === 'tv' ? 'TV' : 'Movie')}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default function App() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingSeries, setTrendingSeries] = useState([]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    
    const fetchData = async () => {
        if (TMDB_API_KEY === "YOUR_TMDB_API_KEY_HERE") return; 

        try {
            const moviesRes = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${TMDB_API_KEY}`);
            const moviesData = await moviesRes.json();
            setTrendingMovies(moviesData.results || []);

            const tvRes = await fetch(`https://api.themoviedb.org/3/trending/tv/week?api_key=${TMDB_API_KEY}`);
            const tvData = await tvRes.json();
            setTrendingSeries(tvData.results || []);
        } catch (error) {
            console.error(error);
        }
    };

    fetchData();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const latestEpisode = AGAM_ORIGINALS[AGAM_ORIGINALS.length - 1];

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white font-sans selection:bg-red-500/30 selection:text-red-200 overflow-x-hidden">
      <ScrollProgress />
      
      <nav className={`fixed w-full z-40 transition-all duration-500 px-4 md:px-6 py-4 flex justify-between items-center ${scrolled ? 'bg-black/90 backdrop-blur-xl border-b border-white/5' : 'bg-gradient-to-b from-black/80 to-transparent'}`}>
        <div className="text-xl md:text-2xl font-black tracking-tighter z-50 flex items-center gap-2">
          AGAM<span className="text-red-600">.</span>STREAM
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium tracking-wide text-gray-300">
          <a href="#" className="hover:text-white transition-colors">Home</a>
          <a href="#originals" className="hover:text-white transition-colors">Originals</a>
          <a href="#featured-movies" className="hover:text-white transition-colors">Movies</a>
          <a href="#series" className="hover:text-white transition-colors">TV Series</a>
        </div>
        <div className="flex items-center gap-4">
            <Search className="w-5 h-5 text-gray-300 hover:text-white cursor-pointer" />
            <button className="hidden md:block bg-white text-black px-5 py-2 rounded-full font-bold text-sm hover:bg-gray-200 transition-transform hover:scale-105">
                Sign In
            </button>
            <button className="md:hidden z-50" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
        </div>
      </nav>

      <header className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_BACKGROUND_IMAGE_DESKTOP} alt="Hero" className="hidden md:block w-full h-full object-cover scale-105 animate-[pulse_20s_ease-in-out_infinite]" />
          <img src={HERO_BACKGROUND_IMAGE_MOBILE} alt="Hero Mobile" className="block md:hidden w-full h-full object-cover object-top" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#0a0a0a]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/60 to-transparent md:hidden" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent hidden md:block" />
        </div>

        <div className="relative z-10 h-full flex flex-col justify-end md:justify-center px-6 md:px-24 max-w-7xl mx-auto pb-32 md:pb-0">
          <span className="text-red-600 font-bold tracking-[0.3em] text-xs md:text-sm mb-2 md:mb-4 bg-black/50 w-fit px-2 py-1 backdrop-blur-md rounded border border-red-500/30">
            AGAM ORIGINAL SERIES
          </span>
          <h1 className="text-5xl md:text-9xl font-black tracking-tighter text-white mb-2 md:mb-4 leading-[0.9] mix-blend-overlay opacity-90">
            PERFECT<br/>FAMILY
          </h1>
          <p className="text-gray-300 max-w-lg text-sm md:text-lg mb-6 line-clamp-3 md:line-clamp-none">
             A journey through the unforgiving Himalayas. Witness Agam Sharma's expedition as bonds are tested, limits are broken, and the true meaning of family is discovered.
          </p>
          
          <div className="flex flex-col md:flex-row gap-3 md:gap-4 w-full md:w-auto">
             <button onClick={() => setSelectedMovie(latestEpisode)} className="group flex justify-center items-center gap-3 bg-red-600 text-white px-8 py-4 rounded-full font-bold tracking-wide hover:bg-red-700 transition-all w-full md:w-auto shadow-[0_0_30px_rgba(220,38,38,0.4)]">
               <Play className="fill-white w-5 h-5 group-hover:scale-110 transition-transform" /> WATCH FINALE
             </button>
             <button onClick={() => document.getElementById('originals').scrollIntoView({behavior:'smooth'})} className="flex justify-center items-center gap-3 px-8 py-4 rounded-full font-bold tracking-wide border border-white/30 bg-white/5 hover:bg-white/10 transition-all backdrop-blur-sm w-full md:w-auto">
               EPISODES
             </button>
          </div>
        </div>
      </header>

      <section id="originals" className="pt-12 md:pt-20">
         <ContentRow title="Agam Originals: Perfect Family" data={AGAM_ORIGINALS} onSelect={setSelectedMovie} />
      </section>

      <section id="featured-movies">
         <ContentRow title="Featured Movies" data={FEATURED_MOVIES} onSelect={setSelectedMovie} />
      </section>

      {trendingMovies.length > 0 && (
          <section id="movies">
            <ContentRow title="Trending Movies" data={trendingMovies} onSelect={setSelectedMovie} />
          </section>
      )}

      {trendingSeries.length > 0 && (
          <section id="series">
            <ContentRow title="Popular TV Shows" data={trendingSeries} onSelect={setSelectedMovie} />
          </section>
      )}

      {trendingMovies.length === 0 && (
          <div className="px-6 md:px-24 py-12 text-center border-t border-gray-900">
              <p className="text-gray-500 mb-2">Want to see more movies?</p>
              <p className="text-sm text-gray-600">Add a TMDB API Key in App.jsx to load global content.</p>
          </div>
      )}

      <footer className="bg-black border-t border-gray-900 py-12 text-center text-gray-600 text-sm">
         <p>© 2026 AgamStream Inc. All rights reserved.</p>
         <p className="text-xs mt-2 opacity-50">This site does not host any illegal content on its servers.</p>
      </footer>

      <VideoModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
    </div>
  );
}
