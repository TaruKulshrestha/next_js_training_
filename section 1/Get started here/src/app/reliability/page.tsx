// Import the reliability page image from the public folder
import reliabilityImg from 'public/reliability.jpg';

// Import the shared Hero component
import Hero from '../components/hero';

export default function ReliabilityPage() {
    return (
        <Hero
            imgData={reliabilityImg}
            imgAlt='welding'
            title='Super high reliability'
        />
    )
    /*
    This creates a new page at:
    http://localhost:3001/reliability
    It is not linked to the homepage yet
    */
}