import TYPE_REFERENCE from "./typeReference";

export const blocs = {
  "1_1_a": {
    title: "L'accord de branche étendu prime",
    text:
      "Pour ces thèmes, les accords négociés et étendus dans votre branche d'activité peuvent prévoir des mesures/modalités plus favorables que le code du travail. Votre entreprise ne peut pas conclure d'accord sur ces thèmes.",
    references: [
      "L3121-14",
      "L3122-16",
      "L3123-19",
      "L3123-21",
      "L3123-22",
      "L1242-8",
      "L1243-13",
      "L1244-3",
      "L1244-4",
      "L1251-12",
      "L1251-35",
      "L1251-36",
      "L1251-37",
      "L1223-8",
      "L1223-9",
      "L1221-21",
      "L1254-2",
      "L1254-9",
      "L1251-7",
      "L1224-1",
      "L1251-6",
      "L1242-2",
      "L6321-10",
      "L4625-2 ",
      "L6241-13",
      "L6331-55"
    ],
    hasCCSearch: true
  },
  "1_1_b": {
    title: "L'accord de branche prime",
    text:
      "Pour ces thèmes, les accords négociés dans votre branche d'activité peuvent prévoir des mesures/modalités plus favorables que le code du travail. A noter que votre entreprise ne peut pas conclure d'accord sur ces sujets.",
    references: [
      "L3121-44",
      "L2135-9",
      "L2135-10",
      "L5121-4",
      "L6331-5",
      "L6331-35",
      "L6331-38",
      "L6331-60",
      "L6332-14",
      "L6332-1-1"
    ],
    hasCCSearch: true
  },
  "1_2": {
    title:
      "L'accord de branche prime sauf garanties équivalentes de l'accord d'entreprise",
    text:
      "Pour ces thèmes, les accords négociés dans votre branche d'activité peuvent prévoir des mesures/modalités plus favorables que le code du travail. A noter que s'il existe dans votre entreprise des accords conclus sur ces sujets, c'est l'accord de branche qui s'applique à votre situation sauf dans un cas spécifique. En effet, si l'accord de votre entreprise prévoit \"des garanties au moins équivalentes\" dans ce domaine, c'est l'accord de votre entreprise qui s'applique. \"des garanties au moins équivalentes\" s'apprécient par matière et par rapport à la collectivité de salariés.",
    references: [
      "L2232-5-1",
      "L2253-4",
      "L2241-1 ",
      "L2241-8 ",
      "L2241-11",
      "L2241-15",
      "L2241-17",
      "L2242-1",
      "L2242-13",
      "L1142-4",
      "L1242-2",
      "L2241-1",
      "L2241-15",
      "R3121-1"
    ],
    hasCCSearch: true
  }
};

const referencesToBlocMap = new Map();

Object.entries(blocs).forEach(([blocId, blocInfo]) => {
  blocInfo.references.forEach(reference =>
    referencesToBlocMap.set(reference, blocId)
  );
});

export const mapReferencesToBlocs = references => {
  const concernedBlocs = new Map();
  const autresReferences = [];
  references.forEach(reference => {
    const upperCasedReferenceId = reference.id.toUpperCase();
    if (
      reference.type === TYPE_REFERENCE.codeDuTravail &&
      referencesToBlocMap.has(upperCasedReferenceId)
    ) {
      const concernedBloc = referencesToBlocMap.get(upperCasedReferenceId);
      if (concernedBlocs.has(concernedBloc)) {
        concernedBlocs.get(concernedBloc).push(reference);
      } else {
        concernedBlocs.set(concernedBloc, [reference]);
      }
    } else {
      autresReferences.push(reference);
    }
  });
  return { concernedBlocs, autresReferences };
};
