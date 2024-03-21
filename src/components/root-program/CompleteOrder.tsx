import { Button } from '@components/ui/button'
import { bonus } from '@lib/bonusStore'
import { useStore } from '@nanostores/react'
import { useEffect } from 'react'

const secret = import.meta.env.LEMON_SECRET_KEY

export  function CompleteOrder() {

    useEffect(() => {
        if(window) {
        window.createLemonSqueezy()
        }
    }, [])

    const $bonus = useStore(bonus)

    const handleCompleteOrder = () => {

        fetch('https://api.lemonsqueezy.com/v1/checkouts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${secret}`
            },
            body: JSON.stringify({
                data: {
                    "type": "checkouts",
                    "attributes": {
                        'custom_price': $bonus ? 33200: 28800,
                        "checkout_options": {
                            embed: true,
                            "button_color": "#2DD272"
                        },
                        "checkout_data": {
                            'discount_code': $bonus ? 'IXNJK2MA' :'A2MZY0MA',
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
                                "id": "295602"
                            },
                        }
                    }
                }
            })
        })
            .then(response => response.json())
            .then(( response ) => {
                console.log('data:', response);
                const url = response?.data?.attributes.url;
                if (url) {
                    window.LemonSqueezy.Url.Open(url);
                }

            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }


    return (
        <Button id='complete-order' onClick={handleCompleteOrder} className="w-full md:w-fit  md:px-10 md:py-6 text-xl rounded-full self-center text-left " >
            Completar mi compra
        </Button>
    )
}
