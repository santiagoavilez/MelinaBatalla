/*eslint-disable  */


import { Button } from "@components/ui/button"
import { useStore } from "@nanostores/react"

// import Payment from '@mercadopago/sdk-react/bricks/payment'
import { lazy, Suspense, useEffect, useState } from "react"
import { confettiAni } from "@lib/utils/confetti"
import { bonus } from "@lib/bonusStore"
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogHeader, AlertDialogOverlay, AlertDialogTitle, AlertDialogTrigger } from "@components/ui/alert-dialog"
import { Loader2, X } from "lucide-react"
import { Skeleton } from "@components/ui/skeleton"

const Payment = lazy(() => import('@mercadopago/sdk-react/bricks/payment'));

export default function MercadoPagoButton() {
    const $bonus = useStore(bonus)
    const [showSuccessDialog, setShowSuccessDialog] = useState(false);
    const [loading, setLoading] = useState(true)
    const [preferenceId, setPreferenceId] = useState<string | null>(null);
    const [initialization, setInitialization] = useState<any>(false);
    useEffect(() => {
        import('@mercadopago/sdk-react/mercadoPago/initMercadoPago').then(({ default: initMercadoPago }) => {
            console.log(import.meta.env.PUBLIC_MP_PUBLIC_KEY)
            console.log('initMercadoPago')
            initMercadoPago(import.meta.env.PUBLIC_MP_PUBLIC_KEY as string, { locale: 'es-AR' });
            setInitialization(true)
        })
    }, [])
    const createPreference = async () => {
        if (preferenceId) return
        const requestData = {
            items: [
                {
                    id: 'root-program-1',
                    title: `Root Program: Programa integrado por 5 clases grabadas, plantillas para creación de contenido efectivo y acceso a la comunidad de acompañamiento privado.`,
                    description: 'Programa integrado por 5 clases grabadas, plantillas para creación de contenido efectivo y acceso a la comunidad de acompañamiento privado.',
                    picture_url: "https://melina-batalla.lemonsqueezy.com/_vercel/image?url=https:%2F%2Flemonsqueezy.imgix.net%2Fmedia%2F77898%2Fd1657848-7a5d-4dcd-b49c-35c0455b58fa.png?ixlib=php-3.3.1%26s=7cb2c62f0da994cc05868441ef51d702&w=1536&q=100",
                    quantity: 1,
                    currency_id: "ARS",
                    unit_price: 1,
                },
            ],
            metadata: {
                bonus: $bonus ? 'true' : 'false',
                variant: 'default',
                userId: '123',
            },
            notification_url: `https://${import.meta.env.PUBLIC_VERCEL_URL}/api/webhooks/mercadopago/notification`,
            back_urls: {
                success: `https://${import.meta.env.PUBLIC_VERCEL_URL}/root-program`,
                failure: `https://${import.meta.env.PUBLIC_VERCEL_URL}/error`,
                pending: `https://${import.meta.env.PUBLIC_VERCEL_URL}/root-program`,
            },
            auto_return: 'approved',
            differential_pricing: {},
        };

        try {
            const response = await fetch(`api/mercadopago/checkout`, {
                method: "POST",
                body: JSON.stringify(requestData),
            });
            const data = await response.json();
            const { id } = data
            setPreferenceId(id);
            console.log(data)
        }
        catch (error) {
            console.log(error)
        }
    };

    const onSubmit = async ({ formData }: any) => {
        // callback llamado al hacer clic en el botón enviar datos
        console.log(formData);
        formData.metadata = {
            bonus: $bonus ? 'true' : 'false',
        }
        console.log(formData)
        return new Promise<void>((resolve, reject) => {
            fetch("/api/mercadopago/payment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            }).then((response) => {
                console.log(response)
                if (!response.ok) throw new Error(response.statusText, { cause: response });

                return response.json()
            })
                .then((data) => {
                    // recibir el resultado del pago
                    console.log(data);
                    if (data.status === 'rejected' || data.status === 'cancelled') {
                        throw new Error('Error al procesar el pago', { cause: data.status})
                    }
                    setTimeout(() => {
                        setShowSuccessDialog(true)
                        confettiAni()
                    }, 500)

                    resolve();
                })
                .catch((error) => {
                    // manejar la respuesta de error al intentar crear el pago
                    console.log(error);
                    reject();
                });
        });


    };
    const onError = async (error: any) => {
        // callback llamado para todos los casos de error de Brick
        console.log(error);


    };
    const onReady = () => {
        /*
          Callback llamado cuando el Brick está listo.
          Aquí puede ocultar cargamentos de su sitio, por ejemplo.
        */

        setLoading(false)

    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild >
                {initialization ?
                    <Button className="w-full   md:w-fit  flex gap-2 items-center py-4  md:px-10 md:py-6 text-lg rounded-full  " onClickCapture={createPreference}  > Comprar con ARS</Button> :
                    <Button className="w-full animate-pulse md:w-fit
                        flex gap-2 items-center py-4  md:px-10 md:py-6 text-lg rounded-full cursor-not-allowed">
                        <Loader2 className="animate-spin" />Comprar con ARS
                    </Button>}

            </AlertDialogTrigger>
            <AlertDialogContent className={`min-h-64 max-h-[90%] ${loading ? 'overflow-y-hidden' : 'overflow-y-auto'} px-0 md:px-4  `}>
                <AlertDialogCancel className="fixed top-1 right-1 p-2 w-fit mt-0 border-none"><X /></AlertDialogCancel>

                <AlertDialogHeader >
                    <AlertDialogTitle className="px-10" >{showSuccessDialog ? 'Bienvenida a la tribu 🧙‍♀️' : 'Compra con Mercado Pago'}</AlertDialogTitle>
                </AlertDialogHeader>
                {showSuccessDialog ? <>
                    <span>Tu compra fue exitosa, felicitaciones y gracias por confiar en Naz como tu mentora! 🤍</span>
                    <span>Te hemos enviado un mail acceder al programa.</span>
                </>
                    :
                    <div className={`min-h-64  ${loading ? 'bg-blanco mx-6 animate-pulse' : ' animate-none'}  z-50`} >
                        {loading && <div role="status" className="w-full  p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 ">
                            <div className="flex items-center space-x-4 w-full h-full">
                                <Skeleton className="w-6 bg-gray-400 h-6 rounded-full"></Skeleton>
                                <Skeleton className="w-16 bg-gray-300 grow-1 h-16 rounded-full"></Skeleton>
                                <div className='grow'>
                                    <div className="h-3 bg-gray-300 rounded-sm w-full mb-2.5"></div>
                                    <div className="w-1/2 h-3 bg-gray-200 rounded-sm "></div>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4 w-full h-full">
                                <Skeleton className="w-6 bg-gray-400 h-6 rounded-full"></Skeleton>
                                <Skeleton className="w-16 bg-gray-300 grow-1 h-16 rounded-full"></Skeleton>

                                <div className='grow'>
                                    <div className="h-3 bg-gray-300 rounded-sm w-full mb-2.5"></div>
                                    <div className="w-1/2 h-3 bg-gray-200 rounded-sm "></div>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4 w-full h-full">
                                <Skeleton className="w-6 bg-gray-400 h-6 rounded-full"></Skeleton>
                                <Skeleton className="w-16 bg-gray-300 grow-1 h-16 rounded-full"></Skeleton>
                                <div className='grow'>
                                    <div className="h-3 bg-gray-300 rounded-sm w-full mb-2.5"></div>
                                    <div className="w-1/2 h-3 bg-gray-200 rounded-sm "></div>
                                </div>
                            </div>
                            <span className="sr-only">Loading...</span>
                        </div>
                        }
                        {preferenceId && <Suspense >
                            <div className={` ${!loading ? ' animate-in  fade-in-0 h-auto ' : 'animate-out fade-out-0 opacity-0 h-0'} `}>
                                <Payment
                                initialization={{
                                    amount: 1,
                                    preferenceId: preferenceId,
                                }}
                                customization={{
                                    visual: {
                                        defaultPaymentOption: {
                                            debitCardForm: true,
                                        },
                                        hideFormTitle: true,
                                        hideRedirectionPanel: true,

                                    },
                                    paymentMethods: {
                                        debitCard: 'all',
                                        creditCard: 'all',
                                        mercadoPago: ['wallet_purchase'],
                                    },

                                }}
                                onSubmit={onSubmit}
                                onReady={onReady}
                                onError={onError}
                            /></div>
                        </Suspense>}
                    </div>
                }
            </AlertDialogContent>
        </AlertDialog>
    )
}