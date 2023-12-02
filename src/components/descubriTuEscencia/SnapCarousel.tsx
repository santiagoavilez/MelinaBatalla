import type { ImageMetadata } from 'astro';
import React from 'react';
import { useSnapCarousel } from 'react-snap-carousel';


interface props {
    images: ImageMetadata[];
}

const AdvancedCarousel = ({ images }: props) => {
    const { scrollRef, pages, snapPointIndexes, activePageIndex, next, prev, goTo } =
        useSnapCarousel();

    const handleNext = () => {
        if (activePageIndex === pages.length - 1) {
            goTo(0)
        }
        next();
    }

    const handlePrev = () => {

        prev();
    }
    return (

        <div className='flex flex-col relative w-full md:px-20'>

            <ul
                ref={scrollRef}
                className="flex overflow-x-auto o snap-x snap-mandatory gap-2"

            >
                {images.map((image, i) => (
                    <li
                        key={i}
                        className='w-full md:w-96 h-full '
                        style={{
                            flexShrink: 0,
                            scrollSnapAlign: snapPointIndexes.has(i) ? "start" : "",

                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        < img
                            alt={"Review mentoria grupal"}
                            src={image.src}
                            width={image.width}
                            height={image.height}
                        />
                    </li>
                ))}
            </ul>
            {/* <div>
                {activePageIndex + 1} / {pages.length}
            </div> */}
            <button className='absolute top-1/2 left-0 md:left-10' onClick={handlePrev}><svg className="w-6 h-6 text-blanco dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 1 1.3 6.326a.91.91 0 0 0 0 1.348L7 13" />
            </svg></button>
            <button className='absolute top-1/2  right-0 md:right-10' onClick={handleNext}><svg className="w-6 h-6 text-blanco dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1" />
            </svg></button>
            <ol className='absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse '>
                {pages.map((_, i) => (
                    <li key={i} className='w-full'>
                        <button
                            className='w-3 h-3 rounded-full bg-gray-800 '
                            style={i === activePageIndex ? { opacity: 0.5 } : {}}
                            onClick={() => goTo(i)}
                        >
                        </button>
                    </li>
                ))}
            </ol>
        </div>
    );
};

export default AdvancedCarousel;