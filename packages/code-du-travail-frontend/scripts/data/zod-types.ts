import { z } from "zod";
import { FicheSPDataElement } from "../../src/fiche-service-public/type";

export const ficheSPDataTextSchema = z.object({
  type: z.literal("text"),
  text: z.string(),
});

export const ficheSPDataParagrapheSchema = z.object({
  type: z.literal("element"),
  children: z.array(ficheSPDataTextSchema),
  name: z.literal("Paragraphe"),
});

export const ficheSPDataLienExterneSchema = z.object({
  type: z.literal("element"),
  attributes: z.object({
    URL: z.string(),
  }),
  children: z.array(ficheSPDataTextSchema),
  name: z.literal("LienExterne"),
});

export const ficheSPDataElementSchema: z.ZodSchema<FicheSPDataElement> = z.lazy(
  () =>
    z.object({
      type: z.literal("element"),
      children: z.union([
        z.array(ficheSPDataElementSchema),
        z.array(ficheSPDataParagrapheSchema),
        z.array(ficheSPDataTextSchema),
      ]),
      name: z.union([
        z.literal("Introduction"),
        z.literal("Titre"),
        z.literal("Description"),
        z.literal("FragmentConditionne"),
        z.literal("SousChapitre"),
        z.literal("Expression"),
        z.literal("MiseEnEvidence"),
        z.literal("Valeur"),
        z.literal("Exposant"),
        z.literal("LienIntra"),
        z.literal("LienInterne"),
      ]),
    })
);

export const ficheSPDataWithElementChildrenSchema = z.object({
  type: z.literal("element"),
  children: z.array(ficheSPDataElementSchema),
  name: z.union([
    z.literal("Texte"),
    z.literal("ANoter"),
    z.literal("ASavoir"),
    z.literal("Attention"),
    z.literal("Rappel"),
    z.literal("Cas"),
  ]),
});

export const ficheSPDataTableauChildrenSchema = z.object({
  type: z.literal("element"),
  attributes: z.object({
    type: z.string(),
  }),
  children: z.array(ficheSPDataElementSchema),
  name: z.union([z.literal("Rang\u00E9e"), z.literal("Colonne")]),
});

export const ficheSPDataChapitreSchema = z.object({
  type: z.literal("element"),
  children: z.union([
    z.array(ficheSPDataElementSchema),
    z.array(ficheSPDataParagrapheSchema),
  ]),
  name: z.literal("Chapitre"),
});

export const ficheSPDataTexteChapitreSchema = z.object({
  type: z.literal("element"),
  children: z.array(ficheSPDataChapitreSchema),
  name: z.literal("Texte"),
});

export const ficheSPDataAvertissementSchema = z.object({
  type: z.literal("element"),
  attributes: z
    .object({
      date: z.string(),
    })
    .optional(),
  children: z.array(ficheSPDataElementSchema),
  name: z.literal("Avertissement"),
});

export const ficheSPDataImageSchema = z.object({
  type: z.literal("element"),
  attributes: z.object({
    LienPublication: z.string(),
    langue: z.string(),
    poids: z.string(),
    format: z.string(),
    type: z.string(),
    redimensionnable: z.string(),
  }),
  children: z.array(ficheSPDataElementSchema),
  name: z.literal("Image"),
});

export const ficheSPDataLienExterneCommenteSchema = z.object({
  type: z.literal("element"),
  attributes: z.object({
    URL: z.string(),
  }),
  children: z.array(ficheSPDataElementSchema),
  name: z.literal("LienExterneCommente"),
});

export const ficheSPDataListSchema = z.object({
  type: z.literal("element"),
  attributes: z.object({
    type: z.string(),
  }),
  children: z.array(ficheSPDataElementSchema),
  name: z.literal("Liste"),
});

export const ficheSPDataRessourceWebSchema = z.object({
  type: z.literal("element"),
  attributes: z.object({
    URL: z.string(),
  }),
  children: z.array(ficheSPDataElementSchema),
  name: z.literal("RessourceWeb"),
});

export const ficheSPDataOuSAdresserSchema = z.object({
  type: z.literal("element"),
  children: z.array(
    z.union([ficheSPDataRessourceWebSchema, ficheSPDataElementSchema])
  ),
  name: z.literal("OuSAdresser"),
});

export const ficheSPDataServiceEnLigneSchema = z.object({
  type: z.literal("element"),
  attributes: z.object({
    URL: z.string(),
  }),
  children: z.array(ficheSPDataElementSchema),
  name: z.union([z.literal("ServiceEnLigne"), z.literal("PourEnSavoirPlus")]),
});

export const ficheSPDataSituationSchema = z.object({
  type: z.literal("element"),
  children: z.array(ficheSPDataElementSchema),
  name: z.literal("Situation"),
});

export const ficheSPDataListeSituationsSchema = z.object({
  type: z.literal("element"),
  attributes: z.object({
    affichage: z.string(),
  }),
  children: z.array(ficheSPDataSituationSchema),
  name: z.literal("ListeSituations"),
});

export const ficheSPDataBlocCasSchema = z.object({
  type: z.literal("element"),
  attributes: z.object({
    affichage: z.string(),
  }),
  children: z.array(ficheSPDataWithElementChildrenSchema),
  name: z.literal("BlocCas"),
});

export const ficheSPDataTableauSchema = z.object({
  type: z.literal("element"),
  children: z.array(ficheSPDataTableauChildrenSchema),
  name: z.literal("Tableau"),
});

export const ficheSPDataElementWithElementChildrenSchema = z.union([
  ficheSPDataImageSchema,
  ficheSPDataOuSAdresserSchema,
  ficheSPDataWithElementChildrenSchema,
  ficheSPDataLienExterneCommenteSchema,
  ficheSPDataBlocCasSchema,
  ficheSPDataChapitreSchema,
  ficheSPDataListeSituationsSchema,
  ficheSPDataSituationSchema,
  ficheSPDataAvertissementSchema,
  ficheSPDataTableauSchema,
]);

export const ficheSPDataSchema = z.union([
  ficheSPDataElementSchema,
  ficheSPDataTextSchema,
  ficheSPDataBlocCasSchema,
  ficheSPDataParagrapheSchema,
  ficheSPDataLienExterneCommenteSchema,
  ficheSPDataLienExterneSchema,
  ficheSPDataRessourceWebSchema,
  ficheSPDataOuSAdresserSchema,
  ficheSPDataWithElementChildrenSchema,
  ficheSPDataTexteChapitreSchema,
  ficheSPDataSituationSchema,
  ficheSPDataListeSituationsSchema,
  ficheSPDataImageSchema,
  ficheSPDataAvertissementSchema,
  ficheSPDataListSchema,
  ficheSPDataServiceEnLigneSchema,
  ficheSPDataChapitreSchema,
  ficheSPDataTableauSchema,
  ficheSPDataTableauChildrenSchema,
]);
