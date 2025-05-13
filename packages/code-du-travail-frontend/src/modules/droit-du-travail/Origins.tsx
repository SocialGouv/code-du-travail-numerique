import React from "react";
import { fr } from "@codegouvfr/react-dsfr";
import { css } from "@styled-system/css";
import ExpandableCard from "./ExpandableCard";

const Origins = () => (
  <div className={container}>
    <div className={fr.cx("fr-container", "fr-py-6w")}>
      <div className={fr.cx("fr-grid-row", "fr-col-12", "fr-col-md-8")}>
        <h2>
          Quels sont les textes à l&apos;origine du droit du travail&nbsp;?
        </h2>
        <p className={fr.cx("fr-text--lg")}>
          Le droit du travail est construit par de nombreux textes juridiques
          dont les sources sont diverses&nbsp;: sources internationales, sources
          européennes et sources nationales. Vous trouverez les textes
          participant à la construction du droit du travail en France
          ci-dessous.
        </p>
      </div>

      <div className={fr.cx("fr-grid-row", "fr-grid-row--gutters")}>
        <div className={fr.cx("fr-col-12", "fr-col-md-6")}>
          <ExpandableCard
            title="Les textes internationaux"
            iconSrc="/static/assets/icons/droit-du-travail/texte-internationaux.svg"
            backgroundColor="var(--background-default-grey)"
          >
            <p>
              Le droit du travail en France est influencé par les textes de{" "}
              <a
                href="https://www.ilo.org/global/lang--fr/index.htm"
                target="_blank"
                rel="noopener noreferrer"
              >
                l&apos;Organisation internationale du travail
              </a>{" "}
              (OIT), agence des Nations Unies pour le monde du travail.
              L&apos;OIT rédige des recommandations et des conventions.
            </p>
            <p>
              Les conventions de l&apos;OIT sont les principaux textes qui ont
              un effet sur le droit du travail français. Ces conventions
              traitent de nombreux sujets comme le travail des enfants, les
              activités syndicales, le travail forcé, l&apos;emploi, le chômage,
              la rémunération, le rôle de l&apos;inspection du travail.
            </p>
            <p>
              <strong>
                Exemple de convention&nbsp;:{" "}
                <a
                  href="https://www.ilo.org/dyn/normlex/fr/f?p=NORMLEXPUB:12100:0::NO::P12100_ILO_CODE:C158"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  la Convention n°158 de l&apos;OIT sur le licenciement
                </a>
                .
              </strong>
            </p>
            <p>
              Il existe également d&apos;autres traités internationaux qui ont
              une influence sur le droit du travail français.
            </p>
            <p>
              <strong>
                Exemples&nbsp;:{" "}
                <a
                  href="https://www.ohchr.org/fr/professionalinterest/pages/ccpr.aspx"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Le Pacte international relatif aux droits civils et politiques
                  de 1966
                </a>{" "}
                et{" "}
                <a
                  href="https://www.ohchr.org/FR/ProfessionalInterest/Pages/CESCR.aspx"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  le Pacte international relatif aux droits économiques, sociaux
                  et culturels de 1966
                </a>
                .
              </strong>
            </p>
          </ExpandableCard>
        </div>

        <div className={fr.cx("fr-col-12", "fr-col-md-6")}>
          <ExpandableCard
            title="Les textes européens"
            iconSrc="/static/assets/icons/droit-du-travail/texte-europeens.svg"
            backgroundColor="var(--background-default-grey)"
          >
            <p>
              Le droit du travail français est influencé par{" "}
              <a
                href="https://europa.eu/european-union/index_fr"
                target="_blank"
                rel="noopener noreferrer"
              >
                l&apos;Union Européenne
              </a>{" "}
              et par{" "}
              <a
                href="https://www.coe.int/fr/"
                target="_blank"
                rel="noopener noreferrer"
              >
                le Conseil de l&apos;Europe
              </a>
              .
            </p>
            <p>
              L&apos;Union Européenne élabore différents types de textes&nbsp;:
            </p>
            <ul>
              <li>des traités</li>
              <li>des règlements</li>
              <li>des directives</li>
              <li>
                des accords collectifs européens négociés par{" "}
                <a
                  href="https://www.etuc.org/fr"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  la Confédération européenne des syndicats (CES)
                </a>
                ,{" "}
                <a
                  href="https://www.businesseurope.eu/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Business Europe
                </a>{" "}
                et{" "}
                <a
                  href="https://sgieurope.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  le Centre européen des entreprises à participation publique
                </a>{" "}
                (CEEP)
              </li>
            </ul>
            <p>
              Le Conseil de l&apos;Europe, organisation intergouvernementale
              distincte de l&apos;Union Européenne, a adopté 2 textes importants
              en droit du travail&nbsp;:
            </p>
            <ul>
              <li>
                <a
                  href="https://www.echr.coe.int/Pages/home.aspx?p=basictexts&c=fre"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  La Convention européenne de sauvegarde des droits de
                  l&apos;Homme et des libertés fondamentales
                </a>{" "}
                qui évoque des droits civils et politiques comme par exemple la
                liberté syndicale, l&apos;interdiction du travail forcé, des
                discriminations, le respect de la vie privée et familiale.
              </li>
              <li>
                <a
                  href="https://www.coe.int/en/web/european-social-charter"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  La Charte sociale européenne
                </a>{" "}
                qui concerne les droits sociaux et économiques dans les domaines
                notamment de l&apos;emploi et des conditions de travail.
              </li>
            </ul>
          </ExpandableCard>
        </div>

        <div className={fr.cx("fr-col-12", "fr-col-md-6")}>
          <ExpandableCard
            title="La Constitution française"
            iconSrc="/static/assets/icons/droit-du-travail/constitution-francaise.svg"
            backgroundColor="var(--background-default-grey)"
          >
            <p>
              Texte le plus important du système juridique français,{" "}
              <a
                href="https://www.conseil-constitutionnel.fr/le-bloc-de-constitutionnalite/texte-integral-de-la-constitution-du-4-octobre-1958-en-vigueur"
                target="_blank"
                rel="noopener noreferrer"
              >
                la Constitution du 4 octobre 1958
              </a>{" "}
              est le texte fondateur de la Vème République. La Constitution a
              pour objectif d&apos;organiser les pouvoirs publics, de définir
              leur rôle et leurs relations entre eux.
            </p>
            <p>
              Dans son préambule la Constitution de 1958 renvoie explicitement à
              3 autres textes fondamentaux&nbsp;:{" "}
              <a
                href="https://www.conseil-constitutionnel.fr/le-bloc-de-constitutionnalite/declaration-des-droits-de-l-homme-et-du-citoyen-de-1789"
                target="_blank"
                rel="noopener noreferrer"
              >
                la Déclaration des Droits de l&apos;Homme et du Citoyen de 1789
              </a>
              ,{" "}
              <a
                href="https://www.conseil-constitutionnel.fr/le-bloc-de-constitutionnalite/preambule-de-la-constitution-du-27-octobre-1946"
                target="_blank"
                rel="noopener noreferrer"
              >
                le Préambule de la Constitution du 27 octobre 1946
              </a>{" "}
              et{" "}
              <a
                href="https://www.conseil-constitutionnel.fr/le-bloc-de-constitutionnalite/charte-de-l-environnement-de-2004"
                target="_blank"
                rel="noopener noreferrer"
              >
                la Charte de l&apos;environnement de 2004
              </a>
              .
            </p>
            <p>
              Ces textes, qui forment le bloc de constitutionnalité, énoncent
              des principes fondamentaux en droit du travail comme par exemple
              l&apos;égalité entre les femmes et les hommes, le droit à la
              protection de la santé, le droit à être représenté par des
              délégués, la liberté syndicale, le droit de grève, le droit à une
              formation professionnelle, le droit d&apos;obtenir un emploi et
              l&apos;absence de discrimination.
            </p>
          </ExpandableCard>
        </div>

        <div className={fr.cx("fr-col-12", "fr-col-md-6")}>
          <ExpandableCard
            title="Lois, ordonnances, décrets et arrêtés"
            iconSrc="/static/assets/icons/droit-du-travail/lois.svg"
            backgroundColor="var(--background-default-grey)"
          >
            <p>
              La loi est votée par le Parlement et fixe les principes
              fondamentaux du droit du travail et de la sécurité sociale.
            </p>
            <p>
              L&apos;ordonnance est un texte écrit par le Gouvernement après que
              le Parlement l&apos;y ait autorisé. L&apos;ordonnance a valeur de
              loi lorsque le Parlement l&apos;approuve en votant une loi de
              ratification. Si le Parlement n&apos;approuve pas
              l&apos;ordonnance alors l&apos;ordonnance n&apos;est plus
              applicable.
            </p>
            <p>
              Le décret est un texte adopté par le Président de la République ou
              le Premier ministre. Généralement en droit du travail, les décrets
              viennent préciser une loi.
            </p>
            <p>
              L&apos;essentiel des lois, des ordonnances et des décrets en droit
              du travail se trouve dans le Code du travail. Il existe des règles
              applicables en droit du travail qui se trouvent dans d&apos;autres
              codes que le Code du travail comme par exemple le Code civil, le
              Code de l&apos;action sociale ou le Code de la sécurité sociale,
              le code des transports ou le code rural et de la pêche maritime.
            </p>
            <p>
              L&apos;arrêté est un texte pris par une autorité administrative
              autre que le Président de la République et le Premier Ministre :
              il peut ainsi être pris par les ministres, les préfets, les
              maires…
            </p>
            <p>
              <strong>
                Exemple&nbsp;: arrêté préfectoral déterminant la zone
                touristique permettant l&apos;ouverture le dimanche ou arrêté
                ministériel fixant le modèle de l&apos;avis d&apos;inaptitude.
              </strong>
            </p>
          </ExpandableCard>
        </div>

        <div className={fr.cx("fr-col-12", "fr-col-md-6")}>
          <ExpandableCard
            title="Les conventions et accords collectifs"
            iconSrc="/static/assets/icons/droit-du-travail/conventions-collectives.svg"
            backgroundColor="var(--background-default-grey)"
          >
            <p>
              Les conventions et accords collectifs de travail sont des textes
              négociés entre un ou plusieurs employeurs et un ou plusieurs
              syndicats de salariés.
            </p>
            <p>
              La différence entre les deux textes vient de leur contenu. La
              convention collective porte sur l&apos;ensemble des conditions
              d&apos;emploi, de travail et des garanties sociales des salariés.
              L&apos;accord collectif concerne un seul ou quelques thèmes des
              conditions d&apos;emploi, de travail et des garanties sociales des
              salariés.
            </p>
            <p>
              Ces textes peuvent être conclus à différents niveaux&nbsp;: au
              niveau interprofessionnel, au niveau d&apos;une branche
              professionnelle, au niveau d&apos;un groupe, au niveau d&apos;une
              entreprise ou au niveau d&apos;un établissement.
            </p>
          </ExpandableCard>
        </div>

        <div className={fr.cx("fr-col-12", "fr-col-md-6")}>
          <ExpandableCard
            title="Les usages et les engagements unilatéraux"
            iconSrc="/static/assets/icons/droit-du-travail/usage-unilateraux.svg"
            backgroundColor="var(--background-default-grey)"
          >
            <p>
              L&apos;usage d&apos;entreprise est une pratique répétée de
              l&apos;employeur attribuant un avantage aux salariés ou à un
              groupe de salariés de l&apos;entreprise sans que la loi, la
              convention collective ou le contrat de travail ne le lui impose.
            </p>
            <p>
              Il existe également des usages au niveau de certaines professions
              ou de certaines localités.
            </p>
            <p>
              L&apos;engagement unilatéral de l&apos;employeur est un engagement
              écrit de l&apos;employeur d&apos;accorder un avantage aux
              salariés.
            </p>
            <p>
              <strong>
                Exemples&nbsp;: on peut trouver de tels engagements dans une
                note de service, un procès-verbal de désaccord…
              </strong>
            </p>
          </ExpandableCard>
        </div>

        <div className={fr.cx("fr-col-12", "fr-col-md-6")}>
          <ExpandableCard
            title="Le règlement intérieur de l'entreprise"
            iconSrc="/static/assets/icons/droit-du-travail/reglement-interieur-entreprise.svg"
            backgroundColor="var(--background-default-grey)"
          >
            <p>
              Le règlement intérieur de l&apos;entreprise est un acte écrit par
              l&apos;employeur qui fixe les règles concernant la discipline, la
              santé et la sécurité dans l&apos;entreprise.
            </p>
          </ExpandableCard>
        </div>

        <div className={fr.cx("fr-col-12", "fr-col-md-6")}>
          <ExpandableCard
            title="Le contrat de travail"
            iconSrc="/static/assets/icons/droit-du-travail/contrat-travail.svg"
            backgroundColor="var(--background-default-grey)"
          >
            <p>
              Le contrat de travail existe dès l&apos;instant où une personne
              (le salarié) s&apos;engage à travailler, moyennant rémunération,
              pour le compte et sous la direction d&apos;une autre personne
              (l&apos;employeur).
            </p>
            <p>
              Le contrat de travail doit en général être écrit. Il précise la
              rémunération, la qualification, la durée du travail et, plus
              généralement, les attributions du salarié.
            </p>
            <p>
              Il entraîne un certain nombre d&apos;obligations, tant pour le
              salarié que pour l&apos;employeur.
            </p>
            <p>
              Il existe différents types de contrat de travail selon leur durée,
              l&apos;activité de l&apos;employeur ou la nature du travail confié
              au salarié.
            </p>
          </ExpandableCard>
        </div>
      </div>
      <div className={fr.cx("fr-grid-row", "fr-grid-row--center", "fr-mt-4w")}>
        <div className={fr.cx("fr-col-12")}>
          <p className={fr.cx("fr-text--bold", "fr-text--lg", "fr-mb-0")}>
            La jurisprudence de la Cour Européenne des droits de l&apos;Homme,
            de la Cour de justice de l&apos;Union européenne, du Conseil
            Constitutionnel, du Conseil d&apos;Etat et de la Cour de cassation
            influence également le droit du travail en France.
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default Origins;

const container = css({
  background: "var(--background-alt-blue-cumulus)",
});
