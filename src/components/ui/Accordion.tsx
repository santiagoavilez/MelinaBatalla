
import { createSignal } from 'solid-js';
import { Collapse } from 'solid-collapse';

type AccordionProps = {
    title: string;
    content: string;
};

export default function Accordion({ title, content }: AccordionProps) {
    const [isExpanded, setIsExpanded] = createSignal(false);
    const handleExpand = () => {
        setIsExpanded(!isExpanded());
    };
    return (
        <section class='my-1.5'>
            <header class={`${isExpanded() ? 'bg-negro text-white transition-all' : ''}  border border-negro/50 w-full p-2 `}>
                <button class={`  w-full flex justify-between items-center `} onClick={handleExpand}>
                    <span class='text-left'>{title}</span>
                    <svg id="Capa_2" class={` ${isExpanded() ? 'stroke-white ' : 'stroke-negro rotate-90  fill-white '}  transition-all  w-5 `} data-name="Capa 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 49.48 49.71">

                        <g style={{ fill: none, strokeMiterLimit: 10, strokeWidth: "2px" }} id="Mobil">
                            <g id="S7">
                                <g>
                                    <line class="cls-1" x1=".71" y1="49" x2="48.48" y2="1.22" />
                                    <line class="cls-1" x1="48.48" y1="20.82" x2="48.48" />
                                    <line class="cls-1" x1="28.88" y1="1.22" x2="48.48" y2="1.22" />
                                </g>
                            </g>
                        </g>
                    </svg>
                </button>
            </header>
            <Collapse value={isExpanded()} class="my-transition">
                <p class="block my-3 pl-3">
                    {content}
                </p>
            </Collapse>

        </section >
    );
};
