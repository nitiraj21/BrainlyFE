import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { CardLanding } from '../components/cardLanding';

export function CardsSection() {
  useEffect(() => {
    AOS.init({
      duration: 600,
      once: true,
      offset: 80
    });

    setTimeout(() => {
      AOS.refresh();
    }, 500);
  }, []);

  return (
    <div className="flex justify-center items-center px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 max-w-xl w-full">
        <div className="aspect-square transform-gpu backface-hidden will-change-transform" data-aos="fade-up" data-aos-delay="0">
          <CardLanding 
            title="Create your digital brain"
            image="src/icons/3dimg.png"
            className="h-64 w-64"
          />
        </div>
        <div className="aspect-square transform-gpu backface-hidden will-change-transform" data-aos="fade-up" data-aos-delay="300">
          <CardLanding 
            title="Save Videos, Tweets & Articles"
            image="src/icons/ChatGPT Image Jun 25, 2025, 01_37_03 PM.png"
            className="h-64 w-64"
          />
        </div>
        <div className="aspect-square transform-gpu backface-hidden will-change-transform" data-aos="fade-up" data-aos-delay="100">
          <CardLanding 
            title="Share your brain to others"
            image="src/pages/share.png"
            className="h-64 w-64"
          />
        </div>
        <div className="aspect-square transform-gpu backface-hidden will-change-transform" data-aos="fade-up" data-aos-delay="200">
          <CardLanding 
            title="AI-Powered Summaries"
            image="src/icons/AIglitter.png"
            className="h-64 w-64"
          />
        </div>
      </div>
    </div>
  );
}
