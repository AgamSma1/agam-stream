import React, { useState, useEffect } from 'react';
import { Play, X, Volume2, VolumeX, ChevronDown, Clock, Film, Star, ArrowRight } from 'lucide-react';

/* 🔥🔥🔥 IMAGE SETUP 🔥🔥🔥 
   I have set these to look for files in your "public" folder.
   Make sure you upload your images to GitHub's "public" folder with these exact names:
   - Main Background: 10.jpg
   - Episode 5: 5.jpg
   - Episode 6: 6.jpg
   - Episode 7: 7.jpg
   - Episode 8: 8.jpg
*/
const HERO_BACKGROUND_IMAGE = "/10.jpg";

/* DATA: Perfect Family Series */
const SERIES_DATA = [
  {
    id: 5,
    title: "Empathy: Mothers & Daughters",
    episode: "Episode 05",
    description: "The women of the family confront the childhoods that shaped them. Old wounds reopen, but so do chances to heal. Starring Pankaj Tripathi, Neha Dhupia, Manoj Pahwa.",
    image: "/5.jpg", 
    videoUrl: "#", 
    duration: "49m",
    rating: "4.8",
    date: "Therapy Ka Safar"
  },
  {
    id: 6,
    title: "Empathy: Fathers & Sons",
    episode: "Episode 06",
    description: "A trip meant for bonding turns into a confrontation with buried fears. One moment changes everything for the men of the family. A Jar Pictures Production.",
    image: "/6.jpg", 
    videoUrl: "#", 
    duration: "52m",
    rating: "5.0",
    date: "Therapy Ka Safar"
  },
  {
    id: 7,
    title: "Coping",
    episode: "Episode 07",
    description: "When life spirals, everyone finds their own way to survive - some healthy, some dangerous. And one announcement shakes the entire family.",
    image: "/7.jpg", 
    videoUrl: "#", 
    duration: "51m",
    rating: "4.7",
    date: "Therapy Ka Safar"
  },
  {
    id: 8,
    title: "Family is Everything",
    episode: "Episode 08",
    description: "A wellness retreat forces the Karkarias to drop their guards and face each other honestly. But healing isn’t peaceful, especially for a family learning to love again.",
    image: "/8.jpg", 
    videoUrl: "#", 
    duration: "55m",
    rating: "5.0",
    date: "Season Finale"
  }
];

// --- COMPONENTS ---

const ScrollProgress = () => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setWidth(Number(scroll));
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 h-1 bg-red-600 z-[100]" style={{ width: `${width * 100}%` }} />
  );
};

const VideoModal = ({ movie, onClose }) => {
  if (!movie) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 animate-in fade-in zoom-in duration-300">
      <div className="relative w-full max-w-6xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-50 bg-black/50 hover:bg-white/20 p-2 rounded-full text-white transition-all transform hover:rotate-90"
        >
          <X size={32} />
        </button>

        {movie.videoUrl && movie.videoUrl.includes('youtube') ? (
           <iframe 
             className="w-full h-full"
             src={`https://www.youtube.com/embed/${movie.videoUrl.split('v=')[1]?.split('&')[0]}?autoplay=1`} 
             title={movie.title}
             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
             allowFullScreen
           />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-white space-y-4">
             <div className="w-20 h-20 border-t-4 border-red-500 border-solid rounded-full animate-spin"></div>
             <p className="font-mono tracking-widest uppercase text-sm opacity-50">Loading Stream Source...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default function App() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  // Get the latest episode (last item in the array) for the Hero button
  const latestEpisode = SERIES_DATA[SERIES_DATA.length - 1];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToEpisodes = () => {
    document.getElementById('episodes').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white font-sans selection:bg-red-500/30 selection:text-red-200">
      <ScrollProgress />
      
      {/* --- NAVIGATION --- */}
      <nav className={`fixed w-full z-40 transition-all duration-500 px-6 py-6 flex justify-between items-center ${scrolled ? 'bg-black/80 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent'}`}>
        <div className="text-2xl font-black tracking-tighter">
          AGAM<span className="text-red-600">.</span>STREAM
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium tracking-wide text-gray-400">
          <a href="#" className="hover:text-white transition-colors">Series</a>
          <a href="#" className="hover:text-white transition-colors">Behind the Scenes</a>
          <a href="#" className="hover:text-white transition-colors">Cast</a>
        </div>
        <button className="bg-white text-black px-5 py-2 rounded-full font-bold text-sm hover:bg-gray-200 transition-transform hover:scale-105">
          Sign In
        </button>
      </nav>

      {/* --- CINEMATIC HERO --- */}
      <header className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={HERO_BACKGROUND_IMAGE} 
            alt="Hero Background" 
            className="w-full h-full object-cover scale-105 animate-[pulse_10s_ease-in-out_infinite]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-[#0a0a0a]" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-24 max-w-7xl mx-auto">
          <span className="text-red-500 font-bold tracking-[0.3em] text-sm md:text-base mb-4 animate-in slide-in-from-bottom duration-700 fade-in">
            ORIGINAL SERIES
          </span>
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-white mb-6 leading-[0.9] mix-blend-overlay opacity-90 animate-in slide-in-from-left duration-1000">
            PERFECT<br/>FAMILY
          </h1>
          
          <div className="flex gap-4 animate-in zoom-in duration-1000 delay-300 mt-8">
             <button 
               onClick={() => setSelectedMovie(latestEpisode)} 
               className="group flex items-center gap-3 bg-red-600 text-white px-8 py-4 rounded-full font-bold tracking-wide hover:bg-red-700 transition-all"
             >
               <Play className="fill-white w-5 h-5 group-hover:scale-110 transition-transform" /> 
               WATCH FINALE
             </button>
             <button 
               onClick={scrollToEpisodes}
               className="flex items-center gap-3 px-8 py-4 rounded-full font-bold tracking-wide border border-white/20 hover:bg-white/10 transition-all backdrop-blur-sm"
             >
               VIEW EPISODES
             </button>
          </div>
        </div>

        <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce">
          <ChevronDown className="text-white/50 w-8 h-8" />
        </div>
      </header>

      {/* --- EDITORIAL EPISODE LIST --- */}
      <section id="episodes" className="py-24 px-6 md:px-24 max-w-[1400px] mx-auto">
        <div className="flex items-end justify-between mb-16 border-b border-gray-800 pb-6">
           <div>
             <span className="text-red-500 font-bold tracking-widest text-xs uppercase mb-2 block">Season 1</span>
             <h2 className="text-4xl md:text-5xl font-bold">The Collection</h2>
           </div>
           <div className="hidden md:block text-right">
             <div className="text-2xl font-bold">{SERIES_DATA.length} Episodes</div>
             <div className="text-gray-500 text-sm">Drama / Family</div>
           </div>
        </div>

        <div className="space-y-24">
          {SERIES_DATA.map((item, index) => (
            <div 
              key={item.id} 
              className={`group flex flex-col md:flex-row gap-8 md:gap-16 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
            >
              {/* Thumbnail Card */}
              <div 
                className="w-full md:w-3/5 aspect-video relative rounded-2xl overflow-hidden cursor-pointer shadow-2xl transition-all duration-500 hover:shadow-red-900/20 group-hover:scale-[1.01]"
                onClick={() => setSelectedMovie(item)}
              >
                <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                
                {/* Play Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/50">
                    <Play className="fill-white text-white w-8 h-8 ml-1" />
                  </div>
                </div>

                {/* Corner Data */}
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-mono border border-white/10">
                  {item.duration}
                </div>
                {item.id === 8 && (
                   <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-lg text-xs font-bold tracking-wider shadow-lg">
                     NEW RELEASE
                   </div>
                )}
              </div>

              {/* Text Info */}
              <div className="w-full md:w-2/5 space-y-6">
                <div className="flex items-center gap-4 text-sm font-bold text-gray-500 tracking-widest uppercase">
                   <span className="text-red-500">{item.episode}</span>
                   <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                   <span>{item.date}</span>
                </div>
                
                <h3 className="text-3xl md:text-5xl font-bold leading-tight group-hover:text-red-500 transition-colors cursor-pointer" onClick={() => setSelectedMovie(item)}>
                  {item.title}
                </h3>
                
                <p className="text-gray-400 leading-relaxed text-lg">
                  {item.description}
                </p>

                <div className="flex items-center gap-6 pt-4 border-t border-gray-800">
                   <div className="flex items-center gap-2 text-sm font-medium text-white">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" /> {item.rating}
                   </div>
                   <button 
                     onClick={() => setSelectedMovie(item)}
                     className="text-sm font-bold flex items-center gap-2 hover:text-red-500 transition-colors"
                   >
                     WATCH NOW <ArrowRight className="w-4 h-4" />
                   </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-[#050505] border-t border-gray-900 py-20 mt-20">
         <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-2xl font-black tracking-tighter mb-8">AGAM<span className="text-red-600">.</span>STREAM</h2>
            <div className="flex justify-center gap-8 mb-8">
               {['Instagram', 'Twitter', 'YouTube'].map(social => (
                 <a key={social} href="#" className="text-gray-500 hover:text-white transition-colors uppercase text-xs tracking-widest">
                   {social}
                 </a>
               ))}
            </div>
            <p className="text-gray-700 text-sm">
              © 2026 AgamStream Inc. All rights reserved. <br/>
              Created by Agam Sharma.
            </p>
         </div>
      </footer>

      <VideoModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
    </div>
  );
}
