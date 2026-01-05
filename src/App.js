import React, { useState, useEffect, useMemo } from 'react';
function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  // Set webinar date (30 days from now as an example) - wrapped in useMemo
  const webinarDate = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + 13);
    date.setHours(18, 30, 0, 0); // 6:30 PM
    return date;
  }, []); // Empty dependency array means this only runs once

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      
      // Update active section for navigation highlighting
      const sections = ['hero', 'learn', 'speakers', 'audience', 'details', 'outcomes', 'testimonials', 'faq'];
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Countdown timer - now properly depends on memoized webinarDate
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = webinarDate.getTime() - now;
      
      if (distance > 0) {
        setCountdown({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);
    
    return () => clearInterval(timer);
  }, [webinarDate]); // Now this dependency is stable

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: 'smooth'
      });
    }
  };

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white text-gray-900 overflow-x-hidden">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md py-3 shadow-md' : 'bg-transparent py-5'}`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
            desixporters
          </div>
          <div className="hidden md:flex space-x-8">
            <button 
              onClick={() => scrollToSection('hero')}
              className={`transition-colors ${activeSection === 'hero' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('learn')}
              className={`transition-colors ${activeSection === 'learn' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
            >
              What You'll Learn
            </button>
            <button 
              onClick={() => scrollToSection('speakers')}
              className={`transition-colors ${activeSection === 'speakers' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
            >
              Speakers
            </button>
            <button 
              onClick={() => scrollToSection('details')}
              className={`transition-colors ${activeSection === 'details' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
            >
              Details
            </button>
            <button 
              onClick={() => scrollToSection('faq')}
              className={`transition-colors ${activeSection === 'faq' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
            >
              FAQ
            </button>
          </div>
          <button 
            onClick={() => scrollToSection('register')}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105"
          >
            Register Now
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center relative pt-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        </div>
        
        <div className="container mx-auto px-4 z-10 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center bg-red-50 border border-red-200 rounded-full px-4 py-2 mb-6">
              <span className="relative flex h-3 w-3 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
              <span className="text-red-600 text-sm font-medium">LIVE WEBINAR</span>
            </div>
            
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-gray-900">
              🚀 Start Export Business in 2026
            </h1>
            <h2 className="text-xl md:text-2xl lg:text-3xl mb-4 text-blue-600 font-semibold">
              Right Product. Right Country. Right Strategy.
            </h2>
            <p className="text-lg md:text-xl mb-8 text-gray-600">
              Live 2-Hour Webinar by @desixporters & @busyowaiss (Real Exporters)
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button 
                onClick={() => scrollToSection('register')}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Register Now – Limited Seats
              </button>
              <button 
                onClick={() => scrollToSection('details')}
                className="bg-transparent border-2 border-gray-800 hover:bg-gray-800 hover:text-white text-gray-800 font-bold py-4 px-8 rounded-full transition-all duration-300"
              >
                Learn More
              </button>
            </div>
            
            <div className="flex justify-center gap-8 mb-12">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-blue-600">{countdown.days}</div>
                <div className="text-sm text-gray-500">Days</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-blue-600">{countdown.hours}</div>
                <div className="text-sm text-gray-500">Hours</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-blue-600">{countdown.minutes}</div>
                <div className="text-sm text-gray-500">Minutes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-blue-600">{countdown.seconds}</div>
                <div className="text-sm text-gray-500">Seconds</div>
              </div>
            </div>
            
            <div className="animate-bounce mt-10">
              <svg className="w-6 h-6 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Learn Section */}
      <section id="learn" className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">What You'll Learn</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon="📦" 
              title="Top Export Products for 2026" 
              description="Discover the most profitable products with high global demand and low competition"
              delay="100"
            />
            <FeatureCard 
              icon="🌍" 
              title="Best Countries to Target" 
              description="Identify emerging markets with favorable trade policies and high growth potential"
              delay="200"
            />
            <FeatureCard 
              icon="🤝" 
              title="How to Find Genuine Buyers" 
              description="Learn proven strategies to connect with reliable international buyers and avoid scams"
              delay="300"
            />
            <FeatureCard 
              icon="📋" 
              title="Export Process Made Simple" 
              description="Step-by-step guidance on documentation, logistics, and compliance requirements"
              delay="100"
            />
            <FeatureCard 
              icon="💼" 
              title="Global Marketplaces Access" 
              description="Leverage international B2B platforms to expand your reach and increase sales"
              delay="200"
            />
            <FeatureCard 
              icon="🏛️" 
              title="Government Benefits & Incentives" 
              description="Navigate export schemes, subsidies, and financial support available for exporters"
              delay="300"
            />
          </div>
        </div>
      </section>

      {/* About the Speakers Section */}
      <section id="speakers" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Meet Your Instructors</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">Learn from real exporters with years of experience in international trade</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <SpeakerCard 
              name="@desixporters"
              title="Export Business Strategist"
              description="15+ years of experience in export business across 20+ countries. Specialized in identifying profitable export opportunities and building sustainable international trade networks."
              stats={["20+ Countries", "500+ Export Deals", "15+ Years Experience"]}
            />
            <SpeakerCard 
              name="@busyowaiss"
              title="Global Trade Consultant"
              description="Expert in export documentation, logistics, and compliance. Helped 1000+ businesses start their export journey with practical, actionable strategies."
              stats={["1000+ Businesses", "10+ Industries", "50+ Trade Shows"]}
            />
          </div>
        </div>
      </section>

      {/* Who Should Attend Section */}
      <section id="audience" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Who Should Attend</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <AttendeeCard 
              icon="🌱" 
              title="Beginners" 
              description="New to exports? We'll guide you from zero to your first international shipment"
            />
            <AttendeeCard 
              icon="💼" 
              title="Business Owners" 
              description="Expand your existing business globally with proven export strategies"
            />
            <AttendeeCard 
              icon="🎓" 
              title="Students" 
              description="Gain practical knowledge to build a career in international trade"
            />
            <AttendeeCard 
              icon="🚀" 
              title="Serious Exporters" 
              description="Scale up your export business with advanced techniques and market insights"
            />
          </div>
        </div>
      </section>

      {/* Webinar Details Section */}
      <section id="details" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Webinar Details</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto"></div>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-blue-600">Date & Time</h3>
                  <p className="mb-2 text-gray-700">{webinarDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  <p className="text-gray-700">6:30 PM - 8:30 PM IST</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-blue-600">Duration</h3>
                  <p className="text-gray-700">2 Hours + 30 Minutes Q&A</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-blue-600">Mode</h3>
                  <p className="text-gray-700">Online (Zoom)</p>
                  <p className="text-sm text-gray-500 mt-2">Link will be sent to registered participants</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-blue-600">Language</h3>
                  <p className="text-gray-700">English (Hindi support available)</p>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-center text-gray-700">Can't attend live? Register anyway and get the recording!</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Outcomes Section */}
      <section id="outcomes" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900">What You'll Achieve</h2>
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed mb-12">
              By the end, you'll know <span className="text-blue-600 font-bold">WHAT</span> to export, 
              <span className="text-indigo-600 font-bold"> WHERE</span> to export, and 
              <span className="text-purple-600 font-bold"> HOW</span> to start — confidently.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
                <div className="text-3xl font-bold text-blue-600 mb-2">90%</div>
                <p className="text-gray-700">Reduction in research time</p>
              </div>
              <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-6 rounded-xl border border-indigo-200">
                <div className="text-3xl font-bold text-indigo-600 mb-2">3X</div>
                <p className="text-gray-700">Faster market entry</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200">
                <div className="text-3xl font-bold text-purple-600 mb-2">50+</div>
                <p className="text-gray-700">Countries to target</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials/Trust Section */}
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Trusted by Exporters Worldwide</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div className="flex items-center justify-center h-20 bg-gray-100 rounded-lg">
              <span className="text-gray-500">Logo 1</span>
            </div>
            <div className="flex items-center justify-center h-20 bg-gray-100 rounded-lg">
              <span className="text-gray-500">Logo 2</span>
            </div>
            <div className="flex items-center justify-center h-20 bg-gray-100 rounded-lg">
              <span className="text-gray-500">Logo 3</span>
            </div>
            <div className="flex items-center justify-center h-20 bg-gray-100 rounded-lg">
              <span className="text-gray-500">Logo 4</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard 
              name="Rahul Sharma"
              role="Textile Exporter"
              content="The webinar helped me identify 3 new markets for my products. Within 2 months, I closed my first international deal!"
              rating={5}
            />
            <TestimonialCard 
              name="Priya Patel"
              role="Handicraft Business Owner"
              content="I was struggling with export documentation. The step-by-step guidance made it so simple. Highly recommend!"
              rating={5}
            />
            <TestimonialCard 
              name="Amit Singh"
              role="Spice Trader"
              content="The insights on finding genuine buyers saved me from potential scams. Worth every penny!"
              rating={5}
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Frequently Asked Questions</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto"></div>
          </div>
          
          <div className="max-w-3xl mx-auto">
            {[
              {
                question: "Is this webinar suitable for beginners with no export experience?",
                answer: "Absolutely! We'll start from the basics and guide you through every step of the export process. No prior knowledge is required."
              },
              {
                question: "Will I get a recording of the webinar?",
                answer: "Yes, all registered participants will receive a recording of the webinar within 24 hours after the live session."
              },
              {
                question: "What if I can't attend the live session?",
                answer: "No problem! Register anyway and you'll get full access to the recording and all materials."
              },
              {
                question: "Will there be a Q&A session?",
                answer: "Yes, we'll have a 30-minute Q&A session where you can ask your specific questions."
              },
              {
                question: "Do you provide any post-webinar support?",
                answer: "Yes, all participants get access to our exclusive community where we continue to share updates and answer questions."
              }
            ].map((item, index) => (
              <div key={index} className="mb-4">
                <button
                  className="w-full text-left p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-all duration-300 flex justify-between items-center"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="font-medium">{item.question}</span>
                  <svg
                    className={`w-5 h-5 transform transition-transform ${expandedFaq === index ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {expandedFaq === index && (
                  <div className="p-4 bg-gray-50 rounded-b-lg border border-t-0 border-gray-200">
                    <p className="text-gray-700">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md p-4 border-t border-gray-200 transform transition-transform duration-300 z-40">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
          <div className="mb-2 sm:mb-0">
            <p className="font-medium text-gray-900">🚀 Start Export Business in 2026</p>
            <p className="text-sm text-gray-600">Limited seats available</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://instagram.com/desixporters"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r w-full sm:w-fit from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-2 px-4 rounded-full transition-all duration-300 flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
              </svg>
              Instagram
            </a>
            <button 
              onClick={() => scrollToSection('register')}
              className="bg-gradient-to-r w-full sm:w-fit from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-2 px-6 rounded-full transition-all duration-300"
            >
              Register Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Reusable Feature Card Component
function FeatureCard({ icon, title, description, delay }) {
  return (
    <div className={`bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-300 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl animate-fade-in`} style={{ animationDelay: `${delay}ms` }}>
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-3 text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

// Reusable Speaker Card Component
function SpeakerCard({ name, title, description, stats }) {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 hover:border-blue-300 transition-all duration-300">
      <div className="flex items-center mb-4">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-2xl font-bold mr-4 text-white">
          {name.charAt(1).toUpperCase()}
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">{name}</h3>
          <p className="text-blue-600">{title}</p>
        </div>
      </div>
      <p className="text-gray-700 mb-4">{description}</p>
      <div className="flex flex-wrap gap-2">
        {stats.map((stat, index) => (
          <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700">{stat}</span>
        ))}
      </div>
    </div>
  );
}

// Reusable Attendee Card Component
function AttendeeCard({ icon, title, description }) {
  return (
    <div className="text-center p-6 rounded-xl hover:bg-gray-50 transition-all duration-300">
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-3 text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

// Reusable Testimonial Card Component
function TestimonialCard({ name, role, content, rating }) {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      <div className="flex mb-4">
        {[...Array(rating)].map((_, i) => (
          <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <p className="text-gray-700 mb-4 italic">"{content}"</p>
      <div>
        <p className="font-bold text-gray-900">{name}</p>
        <p className="text-sm text-gray-600">{role}</p>
      </div>
    </div>
  );
}

export default App;