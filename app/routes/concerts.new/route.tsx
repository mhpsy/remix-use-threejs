import { Link, Outlet } from "@remix-run/react";

export default function ConcertsNew() {
    return (
        <div>
            <h1>concerts.new</h1>
            <nav className="flex flex-col gap-2">
                <Link to=".">来到当前的路由</Link>
                <Link to="new-test">concerts.new.new-test</Link>
                <Link to="new-test2">concerts.new.new-test2</Link>
                <Link to="new-test3">concerts.new.new-test3</Link>

            </nav>
            <Outlet />
        </div>
    )
}

