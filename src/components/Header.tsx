// import React, { useState, useEffect } from 'react';
// import { Menu, X } from 'lucide-react';

// const Header: React.FC = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const scrollToSection = (sectionId: string) => {
//     const section = document.getElementById(sectionId);
//     if (section) {
//       section.scrollIntoView({ behavior: 'smooth' });
//       setIsMenuOpen(false);
//     }
//   };

//   return (
//     <header
//       className={`fixed w-full z-50 transition-all duration-300 ${
//         isScrolled
//           ? 'dark:bg-gray-900/10 backdrop-blur-md py-4'
//           : 'bg-transparent py-4'
//       }`}
//     >
//       <div className="container mx-auto px-4 md:px-6">
//         <div className="flex justify-between items-center">
//           <div className="flex items-center">
//             <img
//               src="/apwen_logo.png"
//               alt="APWEN Logo"
//               className="h-10 w-auto mr-2"
//               style={{ maxHeight: 40 }}
//             />
//           </div>

//           {/* Desktop Navigation */}
//           <nav className="hidden md:block">
//             <ul className="flex space-x-8">
//               {['about', 'timeline', 'FAQ', 'contact'].map((item) => (
//                 <li key={item}>
//                   <button
//                     onClick={() => scrollToSection(item)}
//                     className={`text-xl font-bold font-orbitron transition-colors hover:text-white ${
//                       isScrolled ? 'text-white-500' : 'text-white'
//                     }`}
//                   >
//                     {item.charAt(0).toUpperCase() + item.slice(1)}
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           </nav>

//           {/* Register Button */}
//           <a
//             href="#"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="hidden md:block bg-pink-500 font-orbitron hover:bg-pink-600 text-white px-5 py-2 rounded-full transition-colors shadow-md"
//           >
//             Register
//           </a>

//           {/* Mobile Menu Button */}
//           <button
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//             className="md:hidden text-2xl focus:outline-none font-orbitron"
//             aria-label="Toggle menu"
//           >
//             {isMenuOpen ? (
//               <X className={`h-6 w-6 ${isScrolled ? 'text-white-500' : 'text-white'}`} />
//             ) : (
//               <Menu className={`h-6 w-6 ${isScrolled ? 'text-white-500' : 'text-white'}`} />
//             )}
//           </button>
//         </div>

//         {/* Mobile Menu */}
//         {isMenuOpen && (
//           <div className="md:hidden mt-4 bg-white rounded-lg font-orbitron shadow-lg p-4 absolute left-4 right-4 top-16">
//             <ul className="space-y-3">
//               {['about', 'timeline', 'FAQ', 'contact'].map((item) => (
//                 <li key={item}>
//                   <button
//                     onClick={() => scrollToSection(item)}
//                     className="block w-full text-left font-orbitron text-gray-900 hover:text-pink-500 py-2 transition-colors"
//                   >
//                     {item.charAt(0).toUpperCase() + item.slice(1)}
//                   </button>
//                 </li>
//               ))}
//               <li>
//                 <div className="flex flex-col space-y-2">
//                   <a
//                     href="#"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="block w-full text-center font-orbitron bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-full transition-colors"
//                   >
//                     Register
//                   </a>
//                   {/* <a
//                     href="https://drive.google.com/drive/folders/1RBu_yvnFR0QdVTZKPMxxtDJUC_XS2Tqd?usp=drive_link"
//                     download
//                     className="block w-full text-center font-orbitron bg-white-500 hover:bg-white-600 text-pink-500 px-4 py-2 rounded-full transition-colors border border-pink-500"
//                   >
//                     Download Guide
//                   </a> */}
//                 </div>
//               </li>
//             </ul>
//           </div>
//         )}
//       </div>
//     </header>
//   );
// };

// export default Header;



import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
        ? 'md:dark:bg-gray-900/10 md:backdrop-blur-md py-4'
        : 'py-4'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">

          {/* Logo - Hidden on Mobile */}
          <div className="hidden md:flex items-center">
            <img
              src="/apwen_logo.png"
              alt="APWEN Logo"
              className="h-10 w-auto mr-2"
              style={{ maxHeight: 40 }}
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              {['about', 'timeline', 'FAQ', 'contact'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => scrollToSection(item)}
                    className={`text-xl font-bold font-orbitron transition-colors hover:text-white ${
                      isScrolled ? 'text-white-500' : 'text-white'
                    }`}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Register Button (Desktop Only) */}
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:block bg-pink-500 font-orbitron hover:bg-pink-600 text-white px-5 py-2 rounded-full transition-colors shadow-md"
          >
            Register
          </a>

          {/* Mobile Menu Button (Isolated with Blur Container) */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden p-2 rounded-full backdrop-blur-md bg-gray-800/30 ${
              isScrolled ? 'text-white-500' : 'text-white'
            }`}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div
            className={`md:hidden mt-4 bg-white rounded-lg font-orbitron shadow-lg p-4 absolute left-4 right-4 top-16 ${
              isMenuOpen ? "animate-bounce-in" : "animate-slide-up"
            }`}
          >
            <ul className="space-y-3">
              {['about', 'timeline', 'FAQ', 'contact'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => scrollToSection(item)}
                    className="block w-full text-left font-orbitron text-gray-900 hover:text-pink-500 py-2 transition-colors"
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </button>
                </li>
              ))}
              <li>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center font-orbitron bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-full transition-colors"
                >
                  Register
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>

  );
};

export default Header;