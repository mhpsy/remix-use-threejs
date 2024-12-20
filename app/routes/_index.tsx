import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <p id="index-page">
      <div>
        <Link to="/contacts">Contacts</Link>
      </div>
      <div>
        <Link to="/concerts">Concerts</Link>
      </div>
    </p>
  );
}
