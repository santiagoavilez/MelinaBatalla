import { Button } from '@components/ui/button'
import { bonus } from '@lib/bonusStore'
import { useStore } from '@nanostores/react'
import { useEffect } from 'react'



interface Props {
    variant?: 'default' | 'secondary'
    children?: React.ReactNode
}

export function CompleteOrder({ variant = 'default', children }: Props) {


    useEffect(() => {
        if (window) {

            window.createLemonSqueezy()
        }
    }, [])
    const $bonus = useStore(bonus)

    const handleCompleteOrder = () => {

        fetch('/api/checkout', {
            method: 'POST',
            body: JSON.stringify({
                data: {
                    bonus: $bonus,
                    variant: variant,
                }
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response => response.json()).then((response) => {
            console.log('data:', response);

            const url = response?.url;
            if (url) {
                window.LemonSqueezy.Url.Open(url);
            }

        }).catch((error) => {
            console.error('Error:', error);
        });
    }


    return (
        <Button  variant={variant} onClick={handleCompleteOrder} className="w-full md:w-fit  md:px-10 md:py-6 text-xl rounded-full self-center text-left " >
            {children}
        </Button>
    )
}
