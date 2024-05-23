"use client";

import Link from "next/link";
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const dashNavList = [
    {
        navhead: "Ekart Shipment",
        navlink: [
            {
                innernavname: "Dashboard",
                innernavlink: "/dashboard"
            },
            {
                innernavname: "Create New Shipment",
                innernavlink: "/dashboard/shipment/create/new"
            },
            {
                innernavname: "List Shipment",
                innernavlink: "/dashboard/list-shipment"
            },
            {
                innernavname: "Track Shipment",
                innernavlink: "/dashboard/track-shipment"
            },
            {
                innernavname: "Bulk Label",
                innernavlink: "/dashboard/bulk-label"
            }
        ]
    }
]

export default function DashNav() {
    const router = useRouter();

    const logout = async () => {
        await fetch('/api/admin/logout', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }).then(res => res.json())
            .then(res => {
                console.log(res);
                if (res.status === 200) {
                    toast.success(res.message);
                    router.push("/");
                  }
                  else if (res.status === 400) {
                    toast.error(res.message);
                  }
                  else if (res.status === 500) {
                    toast.error(res.message);
                  }
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <aside>
            <div className="logo-part">
                <div className="py-2 text-2xl text-center font-bold border-b border-gray-700">EKART SHOP SPPL</div>
            </div>
            <div className="dash-nav-part">
                <div className="nav-scroll">
                    {
                        dashNavList && dashNavList.map((item, index) => (
                            <div key={index} className="pb-1 mb-3 border-b border-gray-600 mt-4">
                                <div className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400/80">
                                    {item.navhead}
                                </div>
                                <div className="space-y-1 flex flex-col mb-3 ">
                                    {
                                        item && item.navlink.map((item, index) => (
                                            <Link key={index} className="dash-nav-list" href={item.innernavlink}>{item.innernavname}</Link>
                                        ))
                                    }
                                </div>

                            </div>
                        ))
                    }
                    <div className="pb-1 mb-3">
                        <div className="space-y-1 flex flex-col mb-3 ">
                            <div className="dash-nav-list cursor-pointer" onClick={logout} >
                                Logout
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </aside>
    )
}
