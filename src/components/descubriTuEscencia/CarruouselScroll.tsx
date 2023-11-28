
import ScrollCarousel from 'scroll-carousel-react';

import { Image } from "astro:assets";
import review1 from "@assets/descubri-tu-escencia/review1.png";
import review2 from "@assets/descubri-tu-escencia/review2.png";
import review3 from "@assets/descubri-tu-escencia/review3.png";
import review4 from "@assets/descubri-tu-escencia/review4.png";
const MyComponent = () => {
    return (
        <>
            <h1>This is my component page</h1>
            <p>Now i am showing my creation scroll carousel</p>

            <ScrollCarousel
                autoplay
                autoplaySpeed={2000}
                speed={1000}
                onReady={() => console.log('I am ready')}
            >
                {[1, 2, 3, 4].map((item) => {
                    if (item === 1) {
                        return < img
                            key={item}
                            alt={"Alquimista del exito: melina batalla"}
                            src={review1.src}
                            height={280}

                        />
                    }
                    else if (item === 2) {
                        return <img
                            key={item}
                            alt={"Alquimista del exito: melina batalla"}
                            src={review2.src}
                            height={280}

                        />
                    }
                    else if (item === 3) {
                        return <img
                            key={item}
                            alt={"Alquimista del exito: melina batalla"}
                            src={review3.src}
                            height={280}

                        />
                    }
                    else {
                        return <img
                            key={item}
                            alt={"Alquimista del exito: melina batalla"}
                            src={review1.src}
                            height={280}

                        />
                    }

                })}
            </ScrollCarousel>

        </>
    );
};

export default MyComponent;