"use client";
import { useSession } from "next-auth/react"
import { useEffect } from "react";

export function Dashboard() {
    const {data: session} = useSession();

    useEffect(() => {

    console.log(session);

    }, [session]);
    
    return <div>

    </div>
}
