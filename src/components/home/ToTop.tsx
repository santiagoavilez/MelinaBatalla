import { Button } from '@components/ui/button'

export default function ToTop() {

    const scrollTotop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };
    return (
        <Button onClick={scrollTotop} className="w-full  md:hidden">
            Quiero el e-book
        </Button>
    )
}
