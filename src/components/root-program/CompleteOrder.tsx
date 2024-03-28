import { Button } from '@components/ui/button'
import { auth } from '@lib/authStore'
import { bonus } from '@lib/bonusStore'
import { useStore } from '@nanostores/react'
import { Loader2 } from 'lucide-react'
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
    }, [window])

    if(!window){

    }

    if(!window ){
        return (
            <Button variant={variant} className="w-full md:w-fit animate-pulse  md:px-10 md:py-6 text-xl rounded-full self-center text-left " >
               <Loader2 className='animate-spin' ></Loader2> ...Cargando
            </Button>
        )
    }

    const $bonus = useStore(bonus)
    const clerk = useStore(auth)
    const user =  clerk?.user
    const handleCompleteOrder = () => {

        fetch('/api/checkout', {
            method: 'POST',
            body: JSON.stringify({
                data: {
                    bonus: $bonus,
                    variant: variant,
                    userId : user?.id
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
