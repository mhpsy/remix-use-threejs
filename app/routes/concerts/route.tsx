import { Outlet } from '@remix-run/react'

export default function Concerts() {
    return (
        <div>
            <div>concerts</div>
            <Outlet />
        </div>
    )
}