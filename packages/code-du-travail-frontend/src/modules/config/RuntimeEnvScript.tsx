import { getClientEnvScript } from "../../runtime-env";

// Composant serveur : expose la config d'exécution au navigateur
// (`window.__ENV`) avant le chargement des bundles.
export const RuntimeEnvScript = ({ nonce }: { nonce?: string }) => (
  <script
    nonce={nonce}
    dangerouslySetInnerHTML={{ __html: getClientEnvScript() }}
  />
);
