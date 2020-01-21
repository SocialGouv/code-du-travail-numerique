const fetch = require("node-fetch");
const kaliData = require("@socialgouv/kali-data/data/index.json");
const remark = require("remark");
const strip = require("strip-markdown");
const slugify = require("../../slugify");
const allThemes = require("../datafiller/themes.data.json");
const mdStriper = remark().use(strip);

const API_URL = `https://contributions-api.codedutravail.num.social.gouv.fr`;

const comparableIdcc = num => parseInt(num);

const sortByKey = key => (a, b) => `${a[key]}`.localeCompare(`${b[key]}`);

const themes = allThemes.filter(theme =>
  theme.refs.some(ref => ref.url.startsWith("/contribution/"))
);

/**
 * Fetch contribution fetch contribution from the contributions api
 * retrieve all the answers, questions, reference
 *
 */

const fetchContributions = async () => {
  const agreements = await fetch(`${API_URL}/agreements`).then(r => r.json());

  const answers = await fetch(
    `${API_URL}/public_answers?select=*&order=updated_at.desc`
  ).then(r => r.json()); //.filter(a => a.is_published);

  const questions = await fetch(
    `${API_URL}/questions?select=*&order=id`
  ).then(r => r.json());

  const references = await fetch(`${API_URL}/answers_references`).then(r =>
    r.json()
  );

  const getAnswer = answerId => answers.find(q => q.id === answerId);

  const getAgreement = agreementId =>
    agreements.find(a => a.id === agreementId);

  const getAgreementIdcc = agreementId => {
    const agreement = getAgreement(agreementId);
    return agreement && agreement.idcc;
  };

  // get answer CC details from kali-data
  const getConventionKali = answerId => {
    const answer = getAnswer(answerId);
    const agreement = answer.agreement_id && getAgreement(answer.agreement_id);
    const conventionKali =
      agreement &&
      kaliData.find(
        convention =>
          comparableIdcc(convention.num) === comparableIdcc(agreement.idcc)
      );
    return conventionKali;
  };

  const getReferences = answerId =>
    references
      .filter(r => r.answer_id === answerId)
      .map(({ category, value: title, url }) => {
        if (category === "agreement") {
          return {
            category,
            title,
            agreement: getConventionKali(answerId)
          };
        }
        return { title, url, category };
      })
      .sort(sortByKey("title"));

  const getConventionsAnswers = questionId =>
    answers
      .filter(a => a.question_id === questionId && a.agreement_id !== null)
      .map(ccAnswer => ({
        markdown: ccAnswer.value,
        idcc: getAgreementIdcc(ccAnswer.agreement_id),
        references: getReferences(ccAnswer.id)
      }))
      .sort((a, b) => parseInt(a.idcc, 10) - parseInt(b.idcc, 10));

  const getGenericAnswer = questionId => {
    const genericAnswer = answers.find(
      a => a.question_id === questionId && a.agreement_id === null
    );
    if (!genericAnswer) {
      return;
    }
    const genericTextAnswer = mdStriper
      .processSync(genericAnswer.value)
      .contents.replace(/(\s)\s+/, "$1")
      .trim();
    return {
      text: genericTextAnswer,
      description:
        genericTextAnswer.slice(0, genericTextAnswer.indexOf(" ", 150)) + "…",
      references: getReferences(genericAnswer.id),
      markdown: genericAnswer.value
    };
  };

  const allAnswers = questions
    .map(({ id, index, value: title }) => {
      const slug = slugify(title);
      const theme = themes.find(theme =>
        theme.refs.some(ref => ref.url.match(new RegExp(slug)))
      );
      let breadcrumbs = [];
      if (theme) {
        breadcrumbs = (theme.breadcrumbs || []).concat([
          { title: theme.title, slug: theme.slug }
        ]);
      }
      return {
        id,
        index,
        title,
        slug,
        breadcrumbs,
        answers: {
          generic: getGenericAnswer(id),
          conventions: getConventionsAnswers(id)
        }
      };
    })
    .filter(q => q.answers.generic)
    .sort((a, b) => a.index - b.index);

  return allAnswers;
};

module.exports = fetchContributions;

if (require.main === module) {
  fetchContributions()
    .then(data => console.log(JSON.stringify(data, null, 2)))
    .catch(console.error);
}

fetchContributions();
