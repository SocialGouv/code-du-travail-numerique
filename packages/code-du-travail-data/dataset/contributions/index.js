const fetch = require("node-fetch");
const remark = require("remark");
const html = require("remark-html");

const compiler = remark().use(html, { sanitize: true });

const fetchContributions = async () => {
  const agreements = await fetch(
    `https://contributions-api.codedutravail.num.social.gouv.fr/agreements`
  ).then(r => r.json());

  const answers = await fetch(
    `https://contributions-api.codedutravail.num.social.gouv.fr/public_answers?select=*&order=updated_at.desc`
  ).then(r => r.json()); //.filter(a => a.is_published);

  const questions = await fetch(
    `https://contributions-api.codedutravail.num.social.gouv.fr/questions?select=*&order=updated_at.desc`
  ).then(r => r.json());

  const getAgreementIdcc = agreementId =>
    agreements.find(a => a.id === agreementId).idcc;

  const getConventionsAnswers = questionId =>
    answers
      .filter(a => a.question_id === questionId && !!a.agreement_id)
      .map(ccAnswer => ({
        html: compiler.processSync(ccAnswer.value).contents.replace(/\n/g, ""),
        idcc: getAgreementIdcc(ccAnswer.agreement_id)
      }));

  const getGenericAnswer = questionId => {
    const genericAnswer = answers.find(
      a => a.question_id === questionId && a.agreement_id === null
    );
    if (!genericAnswer) {
      return;
    }
    return {
      html: compiler
        .processSync(genericAnswer.value)
        .contents.replace(/\n/g, "")
    };
  };

  const allAnswers = questions.map(question => ({
    ...question,
    answers: {
      general: getGenericAnswer(question.id),
      conventions: getConventionsAnswers(question.id)
    }
  }));

  return allAnswers;
};

module.exports = fetchContributions;

if (require.main === module) {
  fetchContributions()
    .then(data => console.log(JSON.stringify(data, null, 2)))
    .catch(console.log);
}

fetchContributions();
