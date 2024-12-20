import { json, LoaderFunctionArgs, redirect } from "@remix-run/node";

import {
    Form,
    Link,
    NavLink,
    Outlet,
    Scripts,
    ScrollRestoration,
    useLoaderData,
    useNavigation,
    useSubmit,
} from "@remix-run/react";

import { createEmptyContact, getContacts } from "../data";
import { useEffect, useState } from "react";

export const loader = async ({
    request,
}: LoaderFunctionArgs) => {
    const url = new URL(request.url);
    const q = url.searchParams.get("q");
    const contacts = await getContacts(q);
    return json({ contacts, q });
};

export const action = async () => {
    const contact = await createEmptyContact();
    return redirect(`/contacts/${contact.id}/edit`);
};
export default function Contacts() {

    const { contacts, q } = useLoaderData<typeof loader>();


    // query always equals q, so we need to use a state to update the input field
    const [query, setQuery] = useState(q || "");

    useEffect(() => {
        setQuery(q || "");
        // const searchField = document.getElementById("q");
        // if (searchField instanceof HTMLInputElement) {
        //     searchField.value = q || "";
        // }
    }, [q]);

    const navigation = useNavigation();
    const searching =
        navigation.location &&
        new URLSearchParams(navigation.location.search).has(
            "q"
        );

    const submit = useSubmit();


    return (
        <>
            <div id="sidebar">
                <Link to="/">Home</Link>
                <h1>Remix Contacts</h1>
                <div>
                    <Form id="search-form" role="search" onChange={(event) => {
                        const isFirstSearch = q === null;
                        submit(event.currentTarget, {
                            replace: !isFirstSearch,
                        });
                    }}>
                        <input
                            id="q"
                            aria-label="Search contacts"
                            placeholder="Search"
                            className={searching ? "loading" : ""}
                            type="search"
                            name="q"
                            value={query}
                            onChange={(event) => {
                                console.log('input', event.currentTarget);
                                setQuery(event.currentTarget.value);
                            }}
                        />
                        <div id="search-spinner" aria-hidden hidden={!searching} />
                    </Form>
                    <Form method="post">
                        <button type="submit">New</button>
                    </Form>
                </div>
                <nav>
                    {contacts.length ? (
                        <ul>
                            {contacts.map((contact) => (
                                <li key={contact.id}>
                                    <NavLink
                                        className={({ isActive, isPending }) =>
                                            isActive
                                                ? "active"
                                                : isPending
                                                    ? "pending"
                                                    : ""
                                        }
                                        to={`${contact.id}`}>
                                        {contact.first || contact.last ? (
                                            <>
                                                {contact.first} {contact.last}
                                            </>
                                        ) : (
                                            <i>No Name</i>
                                        )}{" "}
                                        {contact.favorite ? (
                                            <span>★</span>
                                        ) : null}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>
                            <i>No contacts</i>
                        </p>
                    )}
                </nav>
            </div>
            <div id="detail"
                className={
                    navigation.state === "loading" && !searching ? "loading" : ""
                }
            >
                <Outlet />
            </div>

        </>
    )
}
