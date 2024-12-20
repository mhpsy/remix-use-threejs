
import { Link } from '@remix-run/react'

export default function ConcertsIndex() {
    return (
        <div>
            <div>
                <h1>concerts._index</h1>
                <nav>
                    <Link to="new">concerts.new</Link>
                </nav>
            </div>
        </div>
    )
}

