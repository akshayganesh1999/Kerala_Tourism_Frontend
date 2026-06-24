import { Helmet } from 'react-helmet-async';
import Hero from '../components/Hero/Hero';
import Features from '../components/Features/Features';
import Gallery from '../components/Gallery/Gallery';
import WhyUs from '../components/WhyUs/WhyUs';
import Testimonials from '../components/Testimonials/Testimonials';
import InquiryForm from '../components/InquiryForm/InquiryForm';
import CTA from '../components/CTA/CTA';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Explore Kerala – God's Own Country</title>
        <meta name="description" content="Discover breathtaking Kerala — backwaters, hill stations, beaches, and wildlife. Plan your perfect Kerala journey with local experts." />
      </Helmet>
      <main>
        <Hero />
        <Features />
        <Gallery />
        <WhyUs />
        <Testimonials />
        <InquiryForm />
        <CTA />
      </main>
    </>
  );
}
