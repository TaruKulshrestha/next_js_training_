// Import the scale page image from the public folder
import scaleImg from 'public/scale.jpg';

// Import the shared Hero component
import Hero from '../components/hero';

export default function ScalePage() {
    return (
        <Hero
            imgData={scaleImg}
            imgAlt='welding'
            title='Built to scale with your business'
        />
    )
    /*
    This creates a new page at:
    http://localhost:3001/scale
    It is not linked to the homepage yet
    */
} 