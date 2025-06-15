import React from 'react';

// Main App Component
export default function BadgePage() {
  // --- IMPORTANT ---
  // You need to place your 'rank1.png' image in a location where your web app can access it.
  // For example, if you place it in the 'public/images' folder of your project,
  // the path would be '/images/rank1.png'.
  // I am using the previously provided URL as a placeholder.
  // REPLACE THE LINE BELOW WITH THE ACTUAL PATH TO YOUR IMAGE.
  const badgeImageUrl = '/Picsart_25-06-15_11-44-57-964.png';

  return (
    <>
      {/* This <style> block contains all the custom CSS for the animations and visual effects. */}
      <style>{`
        /* * Creates the gentle up-and-down floating animation.
         * It moves the element up by 12 pixels over 2.5 seconds and then back down.
         */
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-12px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        /* Applies the infinite floating animation to the badge. */
        .badge-float {
          animation: float 5s ease-in-out infinite;
        }

        /* * Creates the rotating animation for the glow effect.
         * This spins the gradient 360 degrees.
         */
        @keyframes rotateGlow {
            from {
                transform: translate(-50%, -50%) rotate(0deg);
            }
            to {
                transform: translate(-50%, -50%) rotate(360deg);
            }
        }

        /* * This is the core of the glow effect.
         * It uses a ::before pseudo-element to create a layer behind the badge container.
         * The 'conic-gradient' creates a circular gradient with different shades of gold.
         * The 'filter: blur()' is what makes the gradient soft and "glowy".
         * This entire element is then animated with the 'rotateGlow' keyframes.
         */
        .glow-effect::before {
            content: '';
            position: absolute;
            left: 50%;
            top: 50%;
            width: 130%; 
            height: 130%;
            background: conic-gradient(
                from 0deg,
                #ffd700, /* Classic Gold */
                #f0e68c, /* Khaki/Light Gold */
                #fffacd, /* LemonChiffon for bright highlights */
                #daa520, /* GoldenRod for deeper tones */
                #ffd700  /* Loop back to gold */
            );
            filter: blur(70px); /* This creates the soft glow. */
            z-index: -1; /* This places the glow BEHIND the image. */
            animation: rotateGlow 7s linear infinite;
        }
      `}</style>

      {/* Main container with a dark background to make the gold pop. */}
      <div className="bg-[#10141f] min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 font-sans text-white overflow-hidden">
        
        {/* Badge Section */}
        <div className="relative w-full max-w-sm flex flex-col items-center justify-center mb-8">
          {/* This div is the anchor for the glow pseudo-element. */}
          <div className="relative glow-effect">
            <img 
              src={badgeImageUrl} 
              alt="Rank 1 Badge - Legendary Learner" 
              className="relative z-10 w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 object-contain badge-float"
              // Fallback image in case your 'rank1.png' fails to load.

            />
          </div>
        </div>

        {/* Text Content Section */}
        <div className="text-center max-w-md w-full">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-wider uppercase" style={{ textShadow: '0 2px 15px rgba(255, 215, 0, 0.5)' }}>
            Legendary Learner
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-gray-300">
            Awarded to the top-performing student who consistently demonstrates exceptional academic excellence, curiosity, and a passion for learning. A true role model in the classroom, setting the standard for brilliance and dedication.
          </p>
        </div>

        {/* Share Button Section */}
        <div className="mt-12 w-full flex justify-center">
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-16 sm:px-20 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out text-lg">
                Share
            </button>
        </div>
      </div>
    </>
  );
}

