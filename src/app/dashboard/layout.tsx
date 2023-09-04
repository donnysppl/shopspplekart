import dynamic from 'next/dynamic';
import { Toaster } from 'react-hot-toast';

// Client Components:
const DashNav = dynamic(() => import('@/components/DashNav'))

export default function DashboardLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode
}) {
    return (
        <>
        <Toaster position="bottom-center" reverseOrder={false} />
        {/* {children} */}
        <div className='backend-dashboard'>
            <section className="w-screen h-screen">
                <div className="w-72 border-r border-gray-500 p-4 fixed top-0 z-10 h-screen">
                    <DashNav />
                </div>
                <div className="right-part pl-72 overflow-y-scroll h-full">
                    <div className="dashboard-right-inner w-full">
                        <div className="mx-auto max-w-full pt-5">
                            {children}
                        </div>
                    </div>

                </div>
            </section>
        </div>
        </>
    )
}