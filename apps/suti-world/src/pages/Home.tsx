import { Link } from "react-router-dom";

export default function Home() {

  return (

    <main>

      <h1>SUTI.world</h1>

      <p>
        Semantic Operating System
      </p>

      <hr/>

      <ul>

        <li>
          <Link to="/docs/README">
            README
          </Link>
        </li>

        <li>
          <Link to="/docs/SYSTEM_MAP">
            SYSTEM_MAP
          </Link>
        </li>

        <li>
          <Link to="/docs/sreteniya-manifest">
            Manifest
          </Link>
        </li>

      </ul>

    </main>

  );

}
