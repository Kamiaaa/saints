// components/CorporateClubCarousel.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import { 
  FiChevronLeft, 
  FiChevronRight, 
  FiPause, 
  FiPlay,
  FiUsers,
  FiBriefcase,
  FiAward,
  FiCalendar,
  FiMapPin
} from 'react-icons/fi';

interface Slide {
  _id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  ctaPrimary?: {
    text: string;
    link: string;
  };
  ctaSecondary?: {
    text: string;
    link: string;
  };
  overlayColor?: string;
}

// Define static slides data for Corporate Club
const STATIC_SLIDES: Slide[] = [
  {
    _id: '1',
    title: 'Welcome to Saints Club',
    subtitle: 'Where industry leaders connect, innovate, and excel together',
    imageUrl: '/img/slide-01.jpg',
    ctaPrimary: {
      text: 'Explore Membership',
      link: '/membership'
    },
    ctaSecondary: {
      text: 'Schedule a Visit',
      link: '/visit'
    },
    overlayColor: 'from-blue-900/40 via-emerald-700/20 to-transparent'
  },
  {
    _id: '2',
    title: 'Executive Networking',
    subtitle: 'Connect with top industry leaders in our exclusive networking forums',
    imageUrl: '/img/slide-02.jpg',
    ctaPrimary: {
      text: 'View Events',
      link: '/events'
    },
    ctaSecondary: {
      text: 'Join Now',
      link: '/join'
    },
    overlayColor: 'from-emerald-900/40 via-blue-700/20 to-transparent'
  },
  {
    _id: '3',
    title: 'Leadership Development',
    subtitle: 'Advance your career with our executive coaching and development programs',
    imageUrl: '/img/slide-03.jpg',
    ctaPrimary: {
      text: 'View Programs',
      link: '/programs'
    },
    ctaSecondary: {
      text: 'Contact Us',
      link: '/contact'
    },
    overlayColor: 'from-gray-900/40 via-emerald-800/20 to-transparent'
  },
  {
    _id: '4',
    title: 'Premium Facilities',
    subtitle: 'Access our state-of-the-art conference rooms and executive lounges',
    imageUrl: '/img/slide-04.jpg',
    ctaPrimary: {
      text: 'Tour Facilities',
      link: '/facilities'
    },
    ctaSecondary: {
      text: 'Book Now',
      link: '/booking'
    },
    overlayColor: 'from-purple-900/40 via-blue-800/20 to-transparent'
  },
  {
    _id: '5',
    title: 'Annual Summit',
    subtitle: 'Join our prestigious gathering of corporate innovators and thought leaders',
    imageUrl: '/img/slide-05.jpg',
    ctaPrimary: {
      text: 'See Schedule',
      link: '/summit'
    },
    ctaSecondary: {
      text: 'Get Tickets',
      link: '/tickets'
    },
    overlayColor: 'from-rose-900/40 via-purple-700/20 to-transparent'
  }
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const slides = STATIC_SLIDES;

  const nextSlide = useCallback(() => {
    if (slides.length === 0) return;
    setCurrentIndex((prevIndex) => 
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    if (slides.length === 0) return;
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  }, [slides.length]);

  const goToSlide = (index: number) => {
    if (slides.length === 0) return;
    setCurrentIndex(index);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying || slides.length === 0) return;
    
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);

    return () => clearInterval(timer);
  }, [currentIndex, isPlaying, slides.length, nextSlide]);

  // Icons for each slide
  const slideIcons = [
    <FiUsers key="users" className="w-10 h-10 md:w-12 md:h-12" />,
    <FiBriefcase key="briefcase" className="w-10 h-10 md:w-12 md:h-12" />,
    <FiAward key="award" className="w-10 h-10 md:w-12 md:h-12" />,
    <FiMapPin key="mappin" className="w-10 h-10 md:w-12 md:h-12" />,
    <FiCalendar key="calendar" className="w-10 h-10 md:w-12 md:h-12" />
  ];

  if (slides.length === 0) {
    return (
      <div className="w-full min-h-[calc(70vh-64px)] flex items-center justify-center bg-gray-100 mt-0">
        <div className="text-center">
          <FiUsers className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">No slides available</p>
          <a 
            href="/admin/add-slide" 
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-full font-semibold transition-colors"
          >
            Add Slides
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white shadow-2xl overflow-hidden">
      <div className="relative min-h-[calc(100vh-64px)] md:h-175 overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={slide._id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ 
                backgroundImage: `url(${slide.imageUrl})`,
                backgroundPosition: 'center 30%'
              }}
            />
            
            {/* Gradient Overlay */}
            <div className={`absolute inset-0 bg-linear-to-b ${slide.overlayColor || 'from-blue-900/40 via-emerald-700/20 to-transparent'}`} />
            
            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4 md:px-6 lg:px-8">
              {/* Icon Display */}
              <div className="mb-6 inline-flex items-center justify-center p-4 bg-white/20 backdrop-blur-sm rounded-2xl">
                {slideIcons[index]}
              </div>
              
              {/* Slide Title */}
              <h2 className="text-4xl md:text-6xl lg:text-7xl text-gray-50 font-cormorant font-extrabold mb-6 drop-shadow-2xl max-w-4xl">
                {slide.title}
              </h2>
              
              {/* Slide Subtitle */}
              <p className="text-xl md:text-2xl text-gray-100 drop-shadow-lg max-w-2xl mb-10">
                {slide.subtitle}
              </p>
              
              {/* Call-to-action buttons with original styling */}
              <div className="mt-6 flex flex-col sm:flex-row gap-4">
                {slide.ctaPrimary && (
                  <a
                    href={slide.ctaPrimary.link}
                    className="inline-flex items-center bg-blue-950 text-gray-50 hover:bg-blue-900 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg group"
                  >
                    {slide.ctaPrimary.text}
                    <FiChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                )}
                {slide.ctaSecondary && (
                  <a
                    href={slide.ctaSecondary.link}
                    className="border-2 border-white hover:bg-white/10 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 backdrop-blur-sm text-lg"
                  >
                    {slide.ctaSecondary.text}
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows - Original Design */}
        <button
          onClick={prevSlide}
          className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-4 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg border border-white/30 z-20"
          aria-label="Previous slide"
        >
          <FiChevronLeft className="w-6 h-6 md:w-7 md:h-7" />
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-4 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg border border-white/30 z-20"
          aria-label="Next slide"
        >
          <FiChevronRight className="w-6 h-6 md:w-7 md:h-7" />
        </button>

        {/* Play/Pause Button - Original Design */}
        {/* <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="absolute top-6 right-6 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-xl transition-all duration-300 border border-white/30 z-20"
          aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
        >
          {isPlaying ? (
            <FiPause className="w-5 h-5" />
          ) : (
            <FiPlay className="w-5 h-5" />
          )}
        </button> */}

        {/* Slide Counter - Original Design */}
        <div className="absolute bottom-6 right-6 bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm md:text-base font-medium border border-white/20 z-20">
          <span className="text-white/90">Slide </span>
          <span className="font-bold">{currentIndex + 1}</span>
          <span className="text-white/70"> / {slides.length}</span>
        </div>

        {/* Slide Indicators - Original Dot Design */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-gray-50 w-10 shadow-lg'
                  : 'bg-gray-50/50 hover:bg-gray-50/80 hover:w-4'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Corporate Club Badge - Original Style */}
        {/* <div className="absolute top-6 left-6 bg-emerald-500/90 text-white px-4 py-2 rounded-full text-lg font-semibold backdrop-blur-sm z-20 border border-emerald-400/30">
          Corporate Club • Executive Network
        </div> */}
      </div>
    </div>
  );
};

export default Carousel;