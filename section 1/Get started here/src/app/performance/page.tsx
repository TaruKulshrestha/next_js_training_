import performanceImg from 'public/performance.jpg';
import Hero from '../components/hero';

export default function PerformancePage() {
    return (
        <Hero
            imgData={performanceImg}
            imgAlt='welding'
            title='We serve high performance applications'
        />
    )
    /*
    it will create a new page performance
    http://localhost:3001/performance
    not linked to the homepage
    */
}