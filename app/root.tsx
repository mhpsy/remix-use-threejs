import type { LinksFunction } from "@remix-run/node";

import stylesHref from "./app.css?url";
import { Links, Meta, Scripts, ScrollRestoration, Outlet } from "@remix-run/react";

export const links: LinksFunction = () => [
    { rel: "stylesheet", href: stylesHref },
];



export default function App() {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <Meta />
                <Links />
            </head>
            <body>
                <Outlet />
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
}
