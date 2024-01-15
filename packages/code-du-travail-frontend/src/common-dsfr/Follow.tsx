export const Follow = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        flexDirection: "column",
      }}
    >
      <div className="fr-follow__social">
        <ul className="fr-btns-group">
          <li>
            <a
              className="fr-btn--facebook fr-btn"
              href="[À MODIFIER - Lien vers le facebook de l'organisation]"
              target="_blank"
              title="[À MODIFIER - Intitulé] - nouvelle fenêtre"
              rel="noopener external"
            >
              facebook
            </a>
          </li>
          <li>
            <a
              className="fr-btn--mail fr-btn"
              href="[À MODIFIER - Lien vers le twitter de l'organisation]"
              target="_blank"
              title="[À MODIFIER - Intitulé] - nouvelle fenêtre"
              rel="noopener external"
            >
              X (anciennement Twitter)
            </a>
          </li>
          <li>
            <a
              className="fr-btn--linkedin fr-btn"
              href="[À MODIFIER - Lien vers le linkedin de l'organisation]"
              target="_blank"
              title="[À MODIFIER - Intitulé] - nouvelle fenêtre"
              rel="noopener external"
            >
              linkedin
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};
