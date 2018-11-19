import { Container, Alert } from "@cdt/ui";

const Disclaimer = () => (
  <Alert warning>
    Important ! Ce site est en cours de construction : les données qui s&apos;y
    trouvent peuvent être erronées ou imprécises.{" "}
    <a
      target="_blank"
      href="https://www.legifrance.gouv.fr/affichTexteArticle.do;jsessionid=AE9DCF75DDCF0465784CEE0E7D62729F.tplgfr37s_2?idArticle=JORFARTI000035607420&cidTexte=JORFTEXT000035607388&dateTexte=29990101&categorieLien=id"
    >
      L&apos;ouverture officielle du site
    </a>{" "}
    est prévue pour 2020.
  </Alert>
);

export default Disclaimer;
