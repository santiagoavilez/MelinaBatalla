import { Button } from '@components/ui/button'
import { bonus } from '@lib/bonusStore'
import { useStore } from '@nanostores/react'
import { useEffect } from 'react'


const secret = import.meta.env.PUBLIC_LEMON_API_KEY

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
    const customprice = variant !== 'default' ? 4400 : ($bonus ? 33200 : 30500)
    const discount_code = variant !== 'default' ? undefined : 'E1NZEXMW'


    const handleCompleteOrder = () => {

        fetch('/api/checkout', {
            method: 'POST',
            body: JSON.stringify({
                data: {
                    "type": "checkouts",
                    "attributes": {
                        'custom_price': customprice,
                        "checkout_options": {
                            embed: true,
                            "button_color": "#2DD272"
                        },
                        "checkout_data": {
                            discount_code,
                            "custom": {
                                "user_id": '123',
                                "bonus": $bonus ? 'true' : 'false',
                            },
                        },
                    },
                    "relationships": {
                        "store": {
                            "data": {
                                "type": "stores",
                                "id": "76058"
                            }
                        },
                        "variant": {
                            "data": {
                                "type": "variants",
                                "id": "307170"
                            },
                        }
                    }
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
        <Button id='complete-order' variant={variant} onClick={handleCompleteOrder} className="w-full md:w-fit  md:px-10 md:py-6 text-xl rounded-full self-center text-left " >
            {children}
        </Button>
    )
}
