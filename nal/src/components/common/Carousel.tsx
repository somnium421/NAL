import { useEffect, useRef } from 'react';
import './Carousel.css';

const Carousel = () => {
    const viewerRef = useRef<HTMLDivElement>(null);
    const sliderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (viewerRef.current !== null && sliderRef.current !== null) {
            const viewerCurrent = viewerRef.current;
            const sliderCurrent = sliderRef.current;
            let pressed = false;
            let startX: number;

            const mouseDown = (e: MouseEvent) => {
                pressed = true;
                startX = e.offsetX - sliderCurrent.offsetLeft;
            }

            const mouseUpLeave = () => {
                pressed = false;
            }

            const mouseMove = (e: MouseEvent) => {
                if (!pressed) return ;
                // e.preventDefault();

                const left = (e.offsetX-startX); // px
                const sliderRect = sliderCurrent.getBoundingClientRect();
                const viewerRect = viewerCurrent.getBoundingClientRect();

                if (left > 0) sliderCurrent.style.left = "0";
                else if (sliderRect.width + left < viewerRect.width) {
                    sliderCurrent.style.left = `-${(sliderRect.width - viewerRect.width)/window.innerHeight*100}vh`;
                }
                else sliderCurrent.style.left = `${left/window.innerHeight*100}vh`;
            }
            
            viewerCurrent.addEventListener("mousedown", mouseDown)
            viewerCurrent.addEventListener("mouseup", mouseUpLeave);
            viewerCurrent.addEventListener("mousemove", mouseMove);
            viewerCurrent.addEventListener("mouseleave", mouseUpLeave);

            return () => {
                viewerCurrent.removeEventListener("mousedown", mouseDown);
                viewerCurrent.removeEventListener("mouseup", mouseUpLeave);
                viewerCurrent.removeEventListener("mousemove", mouseMove);
                viewerCurrent.removeEventListener("mouseleave", mouseUpLeave);
            }
        }
    }, []);

    return (
        <div id="viewer" ref={viewerRef}>
            <div id="slider" ref={sliderRef}>
                <div className="item">1</div>
                <div className="item">2</div>
                <div className="item">3</div>
                <div className="item">4</div>
                <div className="item">5</div>
            </div>
        </div>
    )
}

export default Carousel;