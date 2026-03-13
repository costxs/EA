import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

// Components
import Preloader from '../components/Preloader';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import RecentNews from '../components/RecentNews';
import About from '../components/About';
import Pillars from '../components/Pillars';
import Footer from '../components/Footer';

export default function Home() {
    const [loading, setLoading] = useState(true);

    return (
        <>
            <AnimatePresence>
                {loading && <Preloader setLoading={setLoading} />}
            </AnimatePresence>

            <Navbar />
            <Hero />
            <RecentNews />
            <About />
            <Pillars />
            <Footer />
        </>
    );
}
