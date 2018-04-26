import React from "react";
import * as Feather from "react-feather";
import StarRating from "react-star-rating-component";
import styled from "styled-components";

import FeedbackForm from "./FeedbackForm";
import ConventionPicker from "./ConventionPicker";
import Articles from "./Articles";
import Fiches, { hasFiche } from "./Fiches";
import FAQ, { hasFaq } from "./FAQ";

// page de résultats

const ButtonReset = styled.button`
  padding: 10px 20px;
  cursor: pointer;
`;
const Center = styled.div`
  text-align: center;
`;

const Block = styled.div`
  border: 1px solid #eee;
  padding: 10px;
  margin: 10px;
  font-size: 0.9em;
  li {
    margin: 10px 0;
    &:last-child {
      margin-bottom: 0;
    }
  }
  svg {
    vertical-align: bottom;
  }
  .dv-star-rating {
    font-size: 1.5em;
    vertical-align: middle;
    margin-left: 10px;
  }
`;

const BlockTitle = styled.div`
  font-size: 1.2em;
  svg {
    vertical-align: bottom;
  }
  padding-bottom: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid #eee;
`;

const TwoCols = styled.div`
  width: 100%;
  > div {
    width: calc(50% - 20px);
    margin: 10px;
    display: inline-block;
    box-sizing: border-box;
  }
`;

const Result = ({ onResetClick, theme }) => {
  return (
    <div>
      {theme.articles.length && (
        <Block>
          <BlockTitle>
            <Feather.Book size="20" /> Code du Travail : {theme.articles.length}{" "}
            Articles
          </BlockTitle>
          <Articles theme={theme} />
        </Block>
      )}

      <Block>
        <BlockTitle>
          <Feather.AlertTriangle size="20" /> Textes applicables
        </BlockTitle>
        Attention, dans votre entreprise va s'appliquer également des
        conventions et accords de branche ou d'entreprise.
      </Block>

      {hasFaq(theme) && (
        <Block>
          <BlockTitle>
            <Feather.HelpCircle size="20" /> FAQ Code du travail
          </BlockTitle>
          <FAQ theme={theme} />
        </Block>
      )}

      {hasFiche(theme) && (
        <Block>
          <BlockTitle>
            <Feather.FileText size="20" /> Fiches pratiques
          </BlockTitle>
          <Fiches theme={theme} />
        </Block>
      )}

      <Block>
        <BlockTitle>
          <Feather.Paperclip size="20" /> Textes conventionnels
        </BlockTitle>
        Trouvez votre convention collective :
        <br />
        <br />
        <ConventionPicker />
        <li>
          <a href="#">
            Trouver votre accord d'entreprise <Feather.Search size="12" />
          </a>
        </li>
      </Block>

      <Block>
        <BlockTitle>
          <Feather.Plus size="20" /> Voir aussi
        </BlockTitle>
        <li>
          <a href="#">Liens vers thèmes similaires</a>
        </li>
      </Block>

      <TwoCols>
        <Block>
          <BlockTitle>
            <Feather.Phone size="20" /> Vos interlocuteurs
          </BlockTitle>
          <li>
            <a href="#">Services de renseignement</a>
          </li>
          <li>
            <a href="#">Médecine du travail</a>
          </li>
        </Block>

        <Block>
          <BlockTitle>
            <Feather.Link size="20" /> Liens et outils
          </BlockTitle>
          <li>
            <a href="#">
              Lien 1 <Feather.ExternalLink size="12" />
            </a>
          </li>
          <li>
            <a href="#">
              Lien 2 <Feather.ExternalLink size="12" />
            </a>
          </li>
        </Block>
      </TwoCols>

      <Block>
        <BlockTitle>
          <Feather.ThumbsUp size="20" /> Aidez-nous à nous améliorer
        </BlockTitle>
        Avons-nous répondu à votre question ?
        <StarRating name="stars" value={null} />
        <FeedbackForm />
      </Block>

      <Block>
        <BlockTitle>
          <Feather.Trash2 size="20" /> Nouvelle demande
        </BlockTitle>
        <Center>
          <ButtonReset onClick={onResetClick}>
            Faire une nouvelle demande
          </ButtonReset>
        </Center>
      </Block>
    </div>
  );
};
export default Result;
