/*eslint-disable  */


import { Button, type ButtonVariants } from "@components/ui/button"
import { useStore } from "@nanostores/react"

// import Payment from '@mercadopago/sdk-react/bricks/payment'
import { lazy, Suspense, useEffect, useState } from "react"
import { confettiAni } from "@lib/utils/confetti"
import { bonus } from "@lib/bonusStore"
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogHeader, AlertDialogOverlay, AlertDialogTitle, AlertDialogTrigger } from "@components/ui/alert-dialog"
import { Loader2, X } from "lucide-react"
import { Skeleton } from "@components/ui/skeleton"
import { auth } from "@lib/authStore"

const Payment = lazy(() => import('@mercadopago/sdk-react/bricks/payment'));
interface Props {
    variant?: ButtonVariants["variant"];
    full?: boolean;
}
export default function MercadoPagoButton({ variant = 'default', full}: Props) {
    const $bonus = useStore(bonus)
    const clerk = useStore(auth)

    const [showSuccessDialog, setShowSuccessDialog] = useState(false);
    const [loading, setLoading] = useState(true)
    const [preferenceId, setPreferenceId] = useState<string | null>(null);
    const [initialization, setInitialization] = useState<any>(false);
    const isSecondary = variant === 'secondary'
    const price =55000;
    const name = `Root Program.`
    const description = `Programa integrado por 5 clases grabadas, plantillas para creación de contenido efectivo y acceso a la comunidad de acompañamiento privado. `
    useEffect(() => {
        import('@mercadopago/sdk-react/mercadoPago/initMercadoPago').then(({ default: initMercadoPago }) => {
            initMercadoPago(import.meta.env.PUBLIC_MP_PUBLIC_KEY as string, { locale: 'es-AR' });
            setInitialization(true)
        })
    }, [])
    useEffect(() => {
        setPreferenceId(null)
    }, [$bonus])
    const createPreference = async () => {
        if (preferenceId) {
            return
        }
        try {
            const requestData = {
                items: [
                    {
                        id: 'root-program-1',
                        title: name,
                        description: description,
                        picture_url: "https://melina-batalla.lemonsqueezy.com/_vercel/image?url=https:%2F%2Flemonsqueezy.imgix.net%2Fmedia%2F77898%2Fd1657848-7a5d-4dcd-b49c-35c0455b58fa.png?ixlib=php-3.3.1%26s=7cb2c62f0da994cc05868441ef51d702&w=1536&q=100",
                        quantity: 1,
                        currency_id: "ARS",
                        unit_price: price,
                        category_id: 'learnings',
                    },
                ],
                external_reference: variant,
                metadata: {
                    bonus: $bonus ? 'true' : 'false',
                    variant: variant,
                    userId: isSecondary ? clerk?.user?.id ?? '123' : '123',
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
            const response = await fetch(`/api/mercadopago/checkout`, {
                method: "POST",
                body: JSON.stringify(requestData),
            });
            const data = await response.json();
            const { id } = data
            setPreferenceId(id);
        }
        catch (error) {

            console.log(error)
        }
    };

    const onSubmit = async ({ formData }: any) => {
        // callback llamado al hacer clic en el botón enviar datos
        formData.metadata = {
            bonus: $bonus ? 'true' : 'false',
            variant: variant,
            userId: isSecondary ? clerk?.user?.id ?? '123' : '123',
        }
        if (formData.additional_info.items) {
            formData.additional_info.items[0].category_id = 'learnings'
        }
        //formData.aditional_info.items[0].category_id = 'learnings'
        formData.statement_descriptor = name
        formData.external_reference = variant
        formData.notification_url = `https://${import.meta.env.PUBLIC_VERCEL_URL}/api/webhooks/mercadopago/notification`
        formData.description = name

        return new Promise<void>((resolve, reject) => {
            fetch("/api/mercadopago/payment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            }).then((response) => {
                if (!response.ok) {
                    console.error(response)
                    throw new Error(response.statusText, { cause: response });
                }
                return response.json()
            })
                .then((data) => {
                    // recibir el resultado del pago
                    if (data.status === 'rejected' || data.status === 'cancelled') {
                        throw new Error('Error al procesar el pago', { cause: data.status })
                    }
                    setShowSuccessDialog(true)
                    setTimeout(async () => {
                        await confettiAni()
                    }, 500)

                    resolve();
                })
                .catch(async (error) => {
                    // manejar la respuesta de error al intentar crear el pago
                    console.log(error);
                    try {

                        const { cause } = error
                        const body = cause.body
                        const message = await body.json()
                        console.log(message)
                    }
                    catch (error) {
                        console.log(error)
                    }

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
                    <Button variant={variant} className={`w-full ${full ? '' : 'md:w-fit'} flex gap-2  items-center   h-auto text-lg rounded-full self-center text-left `}
                        onClickCapture={createPreference}  > Comprar con ARS</Button> :
                    <Button variant={variant} className={`w-full ${full ? '' : 'md:w-fit'} animate-pulse flex gap-2 cursor-not-allowed items-center   h-auto text-lg rounded-full self-center text-left `}>
                        <Loader2 className="animate-spin" />Comprar con ARS
                    </Button>}

            </AlertDialogTrigger>
            <AlertDialogContent className={` ${showSuccessDialog ? 'min-h-0 ' : 'min-h-[408px] pb-0  '} max-h-[90%] ${loading ? 'overflow-y-hidden  ' : 'overflow-y-auto '}  px-0 md:px-4  `}>
                <AlertDialogCancel className="fixed top-1 right-1 p-2 w-fit mt-0 border-none"><X /></AlertDialogCancel>

                <AlertDialogHeader >
                    <AlertDialogTitle className="px-10" >{showSuccessDialog ? 'Bienvenida a la tribu 🧙‍♀️' : 'Compra con Mercado Pago'}</AlertDialogTitle>

                </AlertDialogHeader>
                {showSuccessDialog ? <>
                    <div>Tu compra fue exitosa, felicitaciones y gracias por confiar en Naz como tu mentora! 🤍</div>
                    <div>Te hemos enviado un mail acceder al programa.</div>
                </>
                    :
                    <div className={`min-h-64  ${loading ? ' mx-6 animate-pulse' : ' animate-none'} z-50`} >
                        {(loading || !preferenceId) && <div role="status" className="w-full flex flex-col gap-4 animate-pulse   ">
                            <div className="boder max-h-72 divide-y-2 divide-stone-300/20  border-stone-300 rounded shadow ">
                                <div className="flex items-center p-4 space-x-4  w-full  ">
                                    <Skeleton className="w-6 bg-stone-300 h-6 rounded-full"></Skeleton>
                                    <Skeleton className="w-10 bg-stone-200 grow-1 h-10 rounded-full"></Skeleton>
                                    <div className='grow'>
                                        <div className="h-3 bg-stone-200 rounded-sm w-full mb-2.5"></div>
                                        <div className="w-1/2 h-3 bg-stone-200 rounded-sm "></div>
                                    </div>
                                </div>
                                <div className="flex items-center p-4 space-x-4  w-full ">
                                    <Skeleton className="w-6 bg-stone-300 h-6 rounded-full"></Skeleton>
                                    <Skeleton className="w-10 bg-stone-200 grow-1 h-10 rounded-full"></Skeleton>

                                    <div className='grow'>
                                        <div className="h-3 bg-stone-200 rounded-sm w-full mb-2.5"></div>
                                        <div className="w-1/2 h-3 bg-stone-200 rounded-sm "></div>
                                    </div>
                                </div>
                                <div className="flex items-center p-4 space-x-4  w-full ">
                                    <Skeleton className="w-6 bg-stone-300 h-6 rounded-full"></Skeleton>
                                    <Skeleton className="w-10 bg-stone-200 grow-1 h-10 rounded-full"></Skeleton>
                                    <div className='grow'>
                                        <div className="h-3 bg-stone-200 rounded-sm w-full mb-2.5"></div>
                                        <div className="w-1/2 h-3 bg-stone-200 rounded-sm "></div>
                                    </div>
                                </div>
                            </div>
                            <Skeleton className="w-full h-10 bg-stone-200 rounded"></Skeleton>
                            <span className="sr-only">Loading...</span>
                        </div>
                        }
                        {preferenceId && <Suspense >
                            <div className={` ${!loading ? ' animate-in  fade-in-0 h-auto ' : 'animate-out fade-out-0 opacity-0 h-0'} `}>
                                <Payment

                                    initialization={{
                                        amount: price,
                                        preferenceId: preferenceId,
                                        items: {
                                            totalItemsAmount: price,
                                            itemsList: [
                                                {
                                                    name: name,
                                                    description: description,
                                                    imageURL: "https://melina-batalla.lemonsqueezy.com/_vercel/image?url=https:%2F%2Flemonsqueezy.imgix.net%2Fmedia%2F77898%2Fd1657848-7a5d-4dcd-b49c-35c0455b58fa.png?ixlib=php-3.3.1%26s=7cb2c62f0da994cc05868441ef51d702&w=1536&q=100",
                                                    units: 1,
                                                    value: price,
                                                }
                                            ]
                                        },

                                    }}
                                    customization={{
                                        visual: {
                                            hideFormTitle: true,
                                            defaultPaymentOption: {
                                                debitCardForm: true
                                            },
                                        },
                                        paymentMethods: {
                                            debitCard: 'all',
                                            creditCard: 'all',
                                            mercadoPago: ['wallet_purchase'],
                                        },
                                        enableReviewStep: true,
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