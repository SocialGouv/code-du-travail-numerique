export const blocs = {
  "1_1_a": {
    title: "L'accord de branche étendu prime",
    text:
      "Pour ces thèmes, les accords négociés et étendus dans votre branche d'activité peuvent prévoir des mesures/modalités plus favorables que le code du travail. Votre entreprise ne peut pas conclure d'accord sur ces thèmes.",
    references: [
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
      "L3123-19",
      "L1224-1",
      "L1242-2",
      "L6321-10",
      "L4625-2",
      "L4622-1",
      "L4622-2",
      "L4622-3",
      "L4622-4",
      "L4622-5"
    ]
  },
  "1_1_b": {
    title: "L'accord de branche prime",
    text:
      "Pour ces thèmes, les accords négociés dans votre branche d'activité peuvent prévoir des mesures/modalités plus favorables que le code du travail. A noter que votre entreprise ne peut pas conclure d'accord sur ces sujets.",
    references: ["L3121-44", "L2135-9", "L2135-10", "L5121-4"]
  },
  "1_2": {
    title:
      "L'accord de branche prime sauf garanties équivalentes de l'accord d'entreprise",
    text:
      "Pour ces thèmes, les accords négociés dans votre branche d'activité peuvent prévoir des mesures/modalités plus favorables que le code du travail. A noter que s'il existe dans votre entreprise des accords conclus sur ces sujets, c'est l'accord de branche qui s'applique à votre situation sauf dans un cas spécifique. En effet, si l'accord de votre entreprise prévoit \"des garanties au moins équivalentes\" dans ce domaine, c'est l'accord de votre entreprise qui s'applique. \"des garanties au moins équivalentes\" s'apprécient par matière et par rapport à la collectivité de salariés.",
    references: []
  }
};

export const references = new Map();

Object.entries(blocs).forEach(([blocId, blocInfo]) => {
  blocInfo.references.forEach(reference => references.set(reference, blocId));
});
