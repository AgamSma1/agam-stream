import React, { useState, useEffect, useRef } from 'react';
import { Play, Info, Plus, Bell, Search, User, X, ChevronLeft, ChevronRight, Volume2, VolumeX, Check, Pause, Maximize } from 'lucide-react';

/* MOCK DATA 
   Updated to reflect Agam's Adventure Series (Episodes 4-8)
   UPDATE: Replace 'videoUrl' with real YouTube links or MP4 links to see them play!
*/
const MOCK_DATA = [
  {
    id: 4,
    title: "PERFECT FAMILY (Episode 04) Pankaj Tripathi | Neha Dhupia | Manoj Pahwa | Girija Godbole | Gulshan D",
    description: "Picking up after the events of the first three parts, Agam returns to the trail with renewed determination. The terrain shifts from green valleys to rocky ascents.",
    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=2670&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Example YouTube Link
    match: "98% Match",
    duration: "50m 12s",
    genre: "Adventure",
    category: "Perfect Family"
  },
  {
    id: 5,
    title: "Ep 5: Into the Wild",
    description: "Deep in the wilderness, resources start to run low. Agam discovers a hidden river crossing that changes the course of the expedition entirely.",
    image: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?q=80&w=2670&auto=format&fit=crop",
    videoUrl: "#", 
    match: "95% Match",
    duration: "49m 45s",
    genre: "Survival",
    category: "Perfect Family"
  },
  {
    id: 6,
    title: "Ep 6: The Summit Push",
    description: "The team prepares for the most grueling leg of the journey. High altitude affects morale, but the view from the base camp offers a glimmer of hope.",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2670&auto=format&fit=crop",
    videoUrl: "#", 
    match: "99% Match",
    duration: "52m 10s",
    genre: "Adventure",
    category: "Perfect Family"
  },
  {
    id: 7,
    title: "Ep 7: Stormy Night",
    description: "A sudden blizzard traps Agam in the makeshift shelter. With visibility at zero, the camera captures the raw intensity of nature's fury.",
    image: "https://images.unsplash.com/photo-1517056233069-42b78d21c7a4?q=80&w=2670&auto=format&fit=crop",
    videoUrl: "#", 
    match: "97% Match",
    duration: "51m 30s",
    genre: "Thriller",
    category: "Perfect Family"
  },
  {
    id: 8,
    title: "Ep 8: The Final Descent",
    description: "The season finale. After the storm clears, the descent proves more dangerous than the climb. Agam reflects on the journey from Episode 1 to now.",
    image: "https://images.unsplash.com/photo-1533240332313-0db49b459ad6?q=80&w=2574&auto=format&fit=crop",
    videoUrl: "#", 
    match: "New",
    duration: "55m 05s",
    genre: "Documentary",
    category: "Perfect Family"
  }
];

// --- TOAST NOTIFICATION COMPONENT ---
const Toast = ({ message, onClose }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="fixed top-20 right-4 z-[100] bg-white text-black px-6 py-3 rounded shadow-2xl animate-in slide-in-from-right duration-300 font-medium flex items-center gap-2">
      <Info size={18} className="text-red-600" />
      {message}
    </div>
  );
};

// --- NAVBAR ---
const Navbar = ({ scrolled, onMenuClick }) => {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-black/95 shadow-xl' : 'bg-gradient-to-b from-black/90 via-black/60 to-transparent'}`}>
      <div className="flex items-center justify-between px-4 md:px-12 py-4">
        <div className="flex items-center gap-8">
          <h1 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-red-600 text-2xl md:text-3xl font-bold tracking-tighter cursor-pointer hover:scale-105 transition-transform"
          >
            AGAM<span className="font-light text-white">STREAM</span>
          </h1>
          <div className="hidden md:flex items-center gap-6 text-sm text-gray-300">
            {['Home', 'TV Shows', 'Movies'].map((item) => (
              <button 
                key={item} 
                onClick={() => onMenuClick(`${item} page is under construction!`)}
                className="hover:text-white transition font-medium cursor-pointer"
              >
                {item}
              </button>
            ))}
            <button 
              onClick={() => {
                const myListRow = document.getElementById('row-my-list');
                if (myListRow) myListRow.scrollIntoView({ behavior: 'smooth' });
              }} 
              className="hover:text-white transition font-medium cursor-pointer"
            >
              My List
            </button>
          </div>
        </div>
        
        <div className="flex items-center gap-6 text-white">
          <div className={`flex items-center transition-all duration-300 ${searchOpen ? 'bg-black/50 border border-white/50 px-2 py-1 rounded' : ''}`}>
             <Search 
               className="w-5 h-5 cursor-pointer hover:text-gray-300" 
               onClick={() => setSearchOpen(!searchOpen)} 
             />
             <input 
               type="text" 
               placeholder="Titles, people, genres"
               className={`bg-transparent border-none outline-none text-sm ml-2 transition-all duration-300 ${searchOpen ? 'w-48 opacity-100' : 'w-0 opacity-0'}`}
             />
          </div>
          
          <Bell 
            className="w-5 h-5 cursor-pointer hover:text-gray-300" 
            onClick={() => onMenuClick("No new notifications")}
          />
          
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => onMenuClick("Profile settings coming soon")}>
            <div className="w-8 h-8 rounded bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center font-bold shadow-lg group-hover:ring-2 ring-white transition-all">A</div>
            <span className="hidden md:block text-sm group-hover:underline">Agam Sharma</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

// --- HERO SECTION ---
const Hero = ({ movie, onPlay, onInfo, onToggleMute, muted }) => {
  if (!movie) return null;

  return (
    <div className="relative h-[85vh] w-full text-white">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={movie.image} 
          alt={movie.title} 
          className="w-full h-full object-cover animate-in fade-in duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="absolute top-[30%] left-4 md:left-12 max-w-xl space-y-6">
        <div className="flex items-center gap-2 text-red-600 font-bold tracking-widest text-sm md:text-base animate-in slide-in-from-left duration-700 fade-in">
          <span className="bg-red-600 text-white px-2 py-0.5 rounded-sm text-xs">N</span> SERIES
        </div>
        <h1 className="text-4xl md:text-6xl font-black leading-tight drop-shadow-lg animate-in slide-in-from-left duration-700 delay-100 fade-in">
          {movie.title}
        </h1>
        <p className="text-lg text-gray-200 line-clamp-3 drop-shadow-md animate-in slide-in-from-left duration-700 delay-200 fade-in">
          {movie.description}
        </p>
        
        <div className="flex items-center gap-4 pt-4 animate-in slide-in-from-bottom duration-700 delay-300 fade-in">
          <button 
            onClick={() => onPlay(movie)}
            className="flex items-center gap-2 bg-white text-black px-6 md:px-8 py-2 md:py-3 rounded hover:bg-opacity-80 active:scale-95 transition font-bold text-lg"
          >
            <Play className="fill-black w-6 h-6" /> Play
          </button>
          <button 
            onClick={() => onInfo(movie)}
            className="flex items-center gap-2 bg-gray-500/70 text-white px-6 md:px-8 py-2 md:py-3 rounded hover:bg-gray-500/50 active:scale-95 transition font-bold text-lg backdrop-blur-sm"
          >
            <Info className="w-6 h-6" /> More Info
          </button>
        </div>
      </div>

      <div className="absolute bottom-32 right-12 z-20 hidden md:block">
         <button 
          onClick={onToggleMute}
          className="p-3 border border-white/50 rounded-full hover:bg-white/10 transition bg-black/20 backdrop-blur-sm"
        >
           {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
         </button>
      </div>
    </div>
  );
};

// --- CONTENT ROW ---
const Row = ({ id, title, data, onSelect }) => {
  const rowRef = useRef(null);

  const scroll = (direction) => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo = direction === 'left' 
        ? scrollLeft - clientWidth / 2 
        : scrollLeft + clientWidth / 2;
      
      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  if (!data || data.length === 0) return null;

  return (
    <div id={id} className="space-y-4 my-8 pl-4 md:pl-12 group relative z-10">
      <h2 className="text-xl md:text-2xl font-bold text-white hover:text-gray-300 cursor-pointer transition w-fit flex items-center gap-2">
        {title}
        <span className="text-xs text-blue-400 font-normal opacity-0 group-hover:opacity-100 transition-opacity">Explore All</span>
      </h2>
      
      <div className="relative group/row">
        <ChevronLeft 
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-40 w-12 h-full bg-black/50 hover:bg-black/70 text-white cursor-pointer opacity-0 group-hover/row:opacity-100 transition-opacity p-2 hidden md:block"
        />
        
        <div 
          ref={rowRef}
          className="flex items-center gap-2 overflow-x-scroll scrollbar-hide scroll-smooth py-4 pr-12"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {data.map((movie) => (
            <div 
              key={movie.id}
              onClick={() => onSelect(movie)}
              className="relative min-w-[200px] md:min-w-[280px] h-[120px] md:h-[160px] rounded cursor-pointer transition-transform duration-300 hover:scale-105 hover:z-20 group/item"
            >
              <img 
                src={movie.image} 
                alt={movie.title}
                className="w-full h-full object-cover rounded shadow-md"
              />
              <div className="absolute inset-0 bg-black/20 group-hover/item:bg-transparent transition-colors border border-transparent group-hover/item:border-white/50 rounded" />
              
              {/* Hover Metadata Mini-Preview */}
              <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover/item:opacity-100 transition-opacity text-xs font-bold drop-shadow-md">
                 <p className="flex items-center gap-1"><span className="text-green-400">{movie.match}</span> {movie.duration}</p>
                 <p className="text-white line-clamp-1">{movie.title}</p>
              </div>
            </div>
          ))}
        </div>

        <ChevronRight 
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-40 w-12 h-full bg-black/50 hover:bg-black/70 text-white cursor-pointer opacity-0 group-hover/row:opacity-100 transition-opacity p-2 hidden md:block"
        />
      </div>
    </div>
  );
};

// --- VIDEO PLAYER / DETAILS MODAL ---
const VideoModal = ({ movie, onClose, isMyList, onToggleMyList, autoPlay = false }) => {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
     setIsPlaying(autoPlay);
  }, [autoPlay]);

  // Simulate video progress for mock player
  useEffect(() => {
    let interval;
    if (isPlaying && (!movie?.videoUrl || movie.videoUrl === '#')) {
      interval = setInterval(() => {
        setProgress(prev => (prev >= 100 ? 0 : prev + 0.5));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, movie]);

  if (!movie) return null;

  const renderPlayer = () => {
    if (!isPlaying) {
         // Thumbnail View
         return (
             <>
              <img src={movie.image} className="w-full h-full object-cover opacity-60" alt="background" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div 
                  onClick={() => setIsPlaying(true)}
                  className="w-20 h-20 bg-red-600/90 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 hover:bg-red-600 transition shadow-[0_0_30px_rgba(220,38,38,0.5)]"
                >
                    <Play className="fill-white ml-2 w-8 h-8 text-white" />
                </div>
              </div>
             </>
         );
    }

    // 1. YouTube Handling
    if (movie.videoUrl && (movie.videoUrl.includes('youtube.com') || movie.videoUrl.includes('youtu.be'))) {
        let videoId = '';
        if (movie.videoUrl.includes('v=')) {
            videoId = movie.videoUrl.split('v=')[1].split('&')[0];
        } else {
            videoId = movie.videoUrl.split('/').pop();
        }
        return (
            <div className="w-full h-full bg-black">
                <iframe 
                    width="100%" 
                    height="100%" 
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} 
                    title={movie.title}
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                ></iframe>
                {/* Close Overlay for usability */}
                <button 
                    onClick={() => setIsPlaying(false)}
                    className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition z-50"
                >
                    Stop Playing
                </button>
            </div>
        );
    }
    
    // 2. Direct Video File (mp4, etc.)
    if (movie.videoUrl && movie.videoUrl !== '#' && !movie.videoUrl.includes('youtube')) {
         return (
             <div className="w-full h-full bg-black flex items-center justify-center">
                <video 
                    src={movie.videoUrl} 
                    className="w-full h-full object-contain" 
                    controls 
                    autoPlay
                />
                 <button 
                    onClick={() => setIsPlaying(false)}
                    className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition z-50"
                >
                    Stop Playing
                </button>
             </div>
         );
    }

    // 3. Simulated Player (Fallback for '#')
    return (
             <div className="w-full h-full bg-black flex flex-col justify-center items-center relative overflow-hidden">
                {/* Simulated Content */}
                <img 
                  src={movie.image} 
                  className="w-full h-full object-cover opacity-30 animate-pulse" 
                  alt="video content"
                />
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4 border-t-red-600 animate-spin"></div>
                  <p className="text-white font-mono text-sm">Simulation: {movie.title}</p>
                </div>

                {/* Video Controls Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-full h-1 bg-gray-600 rounded cursor-pointer mb-4 group/progress">
                        <div 
                          className="h-full bg-red-600 rounded relative" 
                          style={{width: `${progress}%`}}
                        >
                           <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-red-600 rounded-full scale-0 group-hover/progress:scale-125 transition-transform shadow"></div>
                        </div>
                    </div>
                    
                    <div className="flex justify-between items-center text-white">
                        <div className="flex items-center gap-6">
                            <button onClick={() => setIsPlaying(!isPlaying)} className="hover:text-red-500 transition">
                                {isPlaying ? <Pause size={24} className="fill-white" /> : <Play size={24} className="fill-white" />}
                            </button>
                            <button onClick={() => setIsPlaying(false)} className="hover:text-gray-300 text-sm font-bold">
                                STOP
                            </button>
                            <div className="flex items-center gap-2 group/vol">
                                <button onClick={() => setIsMuted(!isMuted)}>
                                  {isMuted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
                                </button>
                                <input 
                                  type="range" min="0" max="1" step="0.1" 
                                  value={isMuted ? 0 : volume}
                                  onChange={(e) => { setVolume(e.target.value); setIsMuted(false); }}
                                  className="w-0 group-hover/vol:w-20 transition-all h-1 bg-white accent-red-600 rounded-lg cursor-pointer"
                                />
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-xs font-mono text-gray-400">10:24 / {movie.duration}</span>
                            <Maximize size={20} className="cursor-pointer hover:scale-110 transition" />
                        </div>
                    </div>
                </div>
             </div>
    );
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-[#181818] rounded-lg overflow-hidden shadow-2xl ring-1 ring-white/10 flex flex-col max-h-[90vh]">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-50 bg-black/50 p-2 rounded-full hover:bg-white text-white hover:text-black transition"
        >
          <X size={24} />
        </button>

        {/* Video Player Area */}
        <div className="aspect-video w-full bg-black relative group shrink-0">
           {renderPlayer()}
        </div>

        {/* Info Area */}
        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8 overflow-y-auto custom-scrollbar">
          <div className="space-y-4">
            <div className="flex items-center gap-4 text-sm">
               <span className="text-green-500 font-bold">{movie.match}</span>
               <span className="text-gray-400">{movie.duration}</span>
               <span className="border border-gray-500 px-1 rounded text-[10px] text-gray-400">HD</span>
               <span className="border border-gray-500 px-1 rounded text-[10px] text-gray-400">5.1</span>
            </div>
            <h2 className="text-3xl font-bold text-white">{movie.title}</h2>
            <p className="text-gray-300 leading-relaxed text-sm md:text-base">{movie.description}</p>
            <div className="h-px bg-gray-700 w-full my-4"></div>
            <div className="flex flex-col gap-2">
               <h3 className="text-white font-bold text-lg">About Agam's Video</h3>
               <p className="text-sm text-gray-400">This video was recorded using a Sony A7III during the winter expedition.</p>
            </div>
          </div>
          
          <div className="space-y-4 text-sm text-gray-400">
             <div><span className="text-gray-500">Cast:</span> <span className="text-gray-200 hover:underline cursor-pointer">Agam Sharma</span></div>
             <div><span className="text-gray-500">Genres:</span> <span className="text-gray-200 hover:underline cursor-pointer">{movie.genre}</span></div>
             <div><span className="text-gray-500">Tags:</span> <span className="text-gray-200">Inspiring, Visual, Outdoor</span></div>
             
             <div className="pt-4">
                <button 
                  onClick={onToggleMyList}
                  className="flex flex-col items-center gap-2 group w-full"
                >
                   <div className={`w-full py-2 rounded border flex items-center justify-center gap-2 transition-all ${isMyList ? 'bg-white text-black border-white' : 'border-gray-500 text-white hover:border-white'}`}>
                      {isMyList ? <Check size={20} /> : <Plus size={20} />}
                      <span className="font-bold uppercase tracking-wider text-xs">{isMyList ? 'In My List' : 'Add to My List'}</span>
                   </div>
                </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [autoPlayModal, setAutoPlayModal] = useState(false);
  const [myListIds, setMyListIds] = useState([]);
  const [toastMsg, setToastMsg] = useState(null);
  const [heroMuted, setHeroMuted] = useState(true);
  
  // Featured movie is the LATEST upload (Episode 8)
  const featuredMovie = MOCK_DATA.find(m => m.id === 8) || MOCK_DATA[0];

  // Group data by category
  const categories = [...new Set(MOCK_DATA.map(item => item.category))];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleMyList = (movie) => {
    if (myListIds.includes(movie.id)) {
      setMyListIds(prev => prev.filter(id => id !== movie.id));
      setToastMsg("Removed from My List");
    } else {
      setMyListIds(prev => [...prev, movie.id]);
      setToastMsg("Added to My List");
    }
  };

  const handleHeroPlay = (movie) => {
    setSelectedMovie(movie);
    setAutoPlayModal(true);
  };

  const handleInfo = (movie) => {
    setSelectedMovie(movie);
    setAutoPlayModal(false);
  };

  const getMyListMovies = () => {
    return MOCK_DATA.filter(m => myListIds.includes(m.id));
  };

  return (
    <div className="bg-[#141414] min-h-screen text-white overflow-x-hidden font-sans selection:bg-red-600 selection:text-white pb-20">
      <Toast message={toastMsg} onClose={() => setToastMsg(null)} />
      
      <Navbar scrolled={scrolled} onMenuClick={setToastMsg} />
      
      <Hero 
        movie={featuredMovie} 
        onPlay={handleHeroPlay} 
        onInfo={handleInfo}
        muted={heroMuted}
        onToggleMute={() => {
          setHeroMuted(!heroMuted);
          setToastMsg(heroMuted ? "Unmuted" : "Muted");
        }}
      />

      <div className="-mt-32 md:-mt-48 relative z-20 space-y-4 md:space-y-8 pb-12 pl-4 md:pl-0">
        {categories.map((category) => (
          <Row 
            key={category} 
            id={`row-${category.replace(/\s+/g, '-').toLowerCase()}`}
            title={category} 
            data={MOCK_DATA.filter(m => m.category === category)} 
            onSelect={(m) => { setSelectedMovie(m); setAutoPlayModal(false); }}
          />
        ))}
        
        {/* Dynamic My List Row */}
        {myListIds.length > 0 && (
          <Row 
             id="row-my-list"
             title="My List" 
             data={getMyListMovies()} 
             onSelect={(m) => { setSelectedMovie(m); setAutoPlayModal(false); }}
          />
        )}
      </div>

      <VideoModal 
        movie={selectedMovie} 
        onClose={() => setSelectedMovie(null)}
        autoPlay={autoPlayModal}
        isMyList={selectedMovie ? myListIds.includes(selectedMovie.id) : false}
        onToggleMyList={() => handleToggleMyList(selectedMovie)}
      />

      {/* Footer */}
      <footer className="max-w-4xl mx-auto px-12 py-12 text-gray-500 text-sm mt-12">
        <div className="flex gap-4 mb-4">
           {['facebook', 'instagram', 'twitter', 'youtube'].map(social => (
             <button key={social} onClick={() => setToastMsg(`Opening ${social}...`)} className="hover:text-white capitalize">
                {social}
             </button>
           ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          {['Audio Description', 'Help Center', 'Gift Cards', 'Media Center', 'Investor Relations', 'Jobs', 'Terms of Use', 'Privacy'].map(link => (
             <button key={link} onClick={() => setToastMsg("Page under construction")} className="text-left hover:underline">
               {link}
             </button>
          ))}
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col gap-4">
           <button onClick={() => setToastMsg("Service Code: 893-212")} className="border border-gray-500 p-2 hover:text-white w-fit">
              Service Code
           </button>
           <div>
             <p className="mb-2">© 2024 AgamStream, Inc.</p>
             <p className="text-xs">Created by Agam Sharma. All Rights Reserved.</p>
           </div>
        </div>
      </footer>
    </div>
  );
}