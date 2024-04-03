import { lazy, Suspense } from 'react'
import { Button } from '@components/ui/button'
import { Loader2 } from 'lucide-react'
import { Skeleton } from '@components/ui/skeleton';


const LazyMercadoPagoButton = lazy(() => import('./MercadoPagoButton'));

export default function MercadoPagoLoader() {
    return (
        <div role="status" className="w-full h-full p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 ">
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

    )
}
