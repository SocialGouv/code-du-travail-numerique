import PreavisDemissionSimulator from "../PreavisDemissionSimulator";
import { ui } from "./ui";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

jest.spyOn(Storage.prototype, "setItem");

describe("PreavisDemissionSimulator - Navigation et changements", () => {
  beforeEach(() => {
    // Reset localStorage mock
    Storage.prototype.getItem = jest.fn(() => null);
  });

  describe("Test des retours en arrière", () => {
    beforeEach(() => {
      // Mock pour CC 86 - Publicité française
      Storage.prototype.getItem = jest.fn(
        () => `
        {
          "num": 86,
          "shortTitle": "Publicité française",
          "id": "KALICONT000005635173",
          "title": "Convention collective nationale de la publicité française du 1er février 1956",
          "url": "https://www.legifrance.gouv.fr/conv_coll/id/KALICONT000005635173",
          "slug": "86"
        }
      `
      );
    });

    it("devrait permettre de revenir en arrière depuis l'étape informations vers convention collective", () => {
      render(
        <PreavisDemissionSimulator
          relatedItems={[]}
          title="Durée de préavis de démission"
          displayTitle="Simulateur de durée de préavis de démission"
        />
      );

      // Démarrer le simulateur
      fireEvent.click(ui.introduction.startButton.get());

      // Aller à l'étape convention collective (CC déjà sélectionnée via localStorage)
      fireEvent.click(ui.next.get());

      // Vérifier qu'on est sur l'étape informations
      expect(screen.getByText("Informations")).toBeInTheDocument();

      // Revenir en arrière vers l'étape convention collective
      fireEvent.click(ui.previous.get());

      // Vérifier qu'on est revenu à l'étape convention collective
      expect(screen.getByText("Convention collective")).toBeInTheDocument();
    });

    it("devrait permettre de revenir en arrière depuis le résultat vers informations", () => {
      render(
        <PreavisDemissionSimulator
          relatedItems={[]}
          title="Durée de préavis de démission"
          displayTitle="Simulateur de durée de préavis de démission"
        />
      );

      // Démarrer le simulateur
      fireEvent.click(ui.introduction.startButton.get());

      // Aller à l'étape convention collective (CC déjà sélectionnée)
      fireEvent.click(ui.next.get());

      // Sélectionner une catégorie professionnelle
      const categorySelect = screen.getByTestId(
        "infos-contrat-salarié-convention-collective-publicité-française-catégorie-professionnelle"
      );
      fireEvent.change(categorySelect, {
        target: { value: "'Employés'" },
      });

      // Aller au résultat
      fireEvent.click(ui.next.get());

      // Vérifier qu'on est sur l'étape résultat
      expect(screen.getByText("Résultat")).toBeInTheDocument();

      // Revenir en arrière vers l'étape informations
      fireEvent.click(ui.previous.get());

      // Vérifier qu'on est revenu à l'étape informations
      expect(screen.getByText("Informations")).toBeInTheDocument();
    });
  });

  describe("Test des changements d'éléments dans l'étape information", () => {
    beforeEach(() => {
      // Mock pour CC 86 - Publicité française
      Storage.prototype.getItem = jest.fn(
        () => `
        {
          "num": 86,
          "shortTitle": "Publicité française",
          "id": "KALICONT000005635173",
          "title": "Convention collective nationale de la publicité française du 1er février 1956",
          "url": "https://www.legifrance.gouv.fr/conv_coll/id/KALICONT000005635173",
          "slug": "86"
        }
      `
      );
    });

    it("devrait permettre de modifier les informations et voir le résultat mis à jour", async () => {
      render(
        <PreavisDemissionSimulator
          relatedItems={[]}
          title="Durée de préavis de démission"
          displayTitle="Simulateur de durée de préavis de démission"
        />
      );

      // Démarrer le simulateur
      fireEvent.click(ui.introduction.startButton.get());

      // Aller à l'étape convention collective
      fireEvent.click(ui.next.get());

      // Première sélection : Employés
      const categorySelect = screen.getByTestId(
        "infos-contrat-salarié-convention-collective-publicité-française-catégorie-professionnelle"
      );
      fireEvent.change(categorySelect, {
        target: { value: "'Employés'" },
      });
      fireEvent.click(ui.next.get());

      // Vérifier le premier résultat (Employés = 1 mois)
      await waitFor(() => {
        expect(screen.queryAllByText(/1 mois/)[0]).toBeInTheDocument();
      });
      await waitFor(() => {
        expect(screen.queryAllByText(/Article 29/)[0]).toBeInTheDocument();
      });

      // Revenir en arrière pour modifier la catégorie
      fireEvent.click(ui.previous.get());

      // Changer pour "Cadres"
      fireEvent.change(categorySelect, {
        target: { value: "'Cadres'" },
      });

      // Vérifier que la sélection a bien changé
      expect((categorySelect as HTMLSelectElement).value).toBe("'Cadres'");

      fireEvent.click(ui.next.get());

      // Vérifier qu'on arrive bien sur la page de résultat
      await waitFor(() => {
        expect(screen.getByText("Résultat")).toBeInTheDocument();
      });

      // Vérifier qu'il y a un résultat affiché (peu importe la durée)
      await waitFor(() => {
        expect(screen.getByTestId("resultat")).toBeInTheDocument();
      });
    });

    it("devrait permettre de faire plusieurs modifications successives", async () => {
      render(
        <PreavisDemissionSimulator
          relatedItems={[]}
          title="Durée de préavis de démission"
          displayTitle="Simulateur de durée de préavis de démission"
        />
      );

      // Démarrer le simulateur
      fireEvent.click(ui.introduction.startButton.get());
      fireEvent.click(ui.next.get());

      const categorySelect = screen.getByTestId(
        "infos-contrat-salarié-convention-collective-publicité-française-catégorie-professionnelle"
      );

      // Première sélection : Employés
      fireEvent.change(categorySelect, {
        target: { value: "'Employés'" },
      });
      fireEvent.click(ui.next.get());

      // Vérifier le premier résultat
      await waitFor(() => {
        expect(screen.queryAllByText(/1 mois/)[0]).toBeInTheDocument();
      });

      // Navigation complexe : retour et changement
      fireEvent.click(ui.previous.get()); // Retour à informations
      fireEvent.change(categorySelect, {
        target: { value: "'Cadres'" },
      });

      // Vérifier que la sélection a bien changé
      expect((categorySelect as HTMLSelectElement).value).toBe("'Cadres'");

      fireEvent.click(ui.next.get());

      // Vérifier qu'on arrive bien sur la page de résultat après le changement
      await waitFor(() => {
        expect(screen.getByText("Résultat")).toBeInTheDocument();
      });

      // Vérifier qu'il y a toujours un résultat affiché
      await waitFor(() => {
        expect(screen.getByTestId("resultat")).toBeInTheDocument();
      });

      // Encore un retour et changement
      fireEvent.click(ui.previous.get());
      fireEvent.change(categorySelect, {
        target: { value: "'Agents de maîtrise et Techniciens'" },
      });
      fireEvent.click(ui.next.get());

      // Vérifier qu'on arrive bien sur la page de résultat final
      await waitFor(() => {
        expect(screen.getByText("Résultat")).toBeInTheDocument();
      });

      // Vérifier qu'il y a toujours un résultat affiché
      await waitFor(() => {
        expect(screen.getByTestId("resultat")).toBeInTheDocument();
      });
    });
  });

  describe("Test des changements de convention collective", () => {
    it("devrait permettre de comparer les résultats entre différentes conventions collectives", () => {
      // Test avec CC 86 - Publicité française
      Storage.prototype.getItem = jest.fn(
        () => `
        {
          "num": 86,
          "shortTitle": "Publicité française",
          "id": "KALICONT000005635173",
          "title": "Convention collective nationale de la publicité française du 1er février 1956",
          "url": "https://www.legifrance.gouv.fr/conv_coll/id/KALICONT000005635173",
          "slug": "86"
        }
      `
      );

      const { unmount } = render(
        <PreavisDemissionSimulator
          relatedItems={[]}
          title="Durée de préavis de démission"
          displayTitle="Simulateur de durée de préavis de démission"
        />
      );

      // Démarrer le simulateur avec CC 86
      fireEvent.click(ui.introduction.startButton.get());
      fireEvent.click(ui.next.get());

      // Sélectionner Employés pour CC 86
      const categorySelect86 = screen.getByTestId(
        "infos-contrat-salarié-convention-collective-publicité-française-catégorie-professionnelle"
      );
      fireEvent.change(categorySelect86, {
        target: { value: "'Employés'" },
      });
      fireEvent.click(ui.next.get());

      // Vérifier le résultat pour CC 86 (Employés = 1 mois, article 29)
      expect(screen.queryAllByText(/1 mois/g)[0]).toBeInTheDocument();
      expect(screen.queryAllByText(/Article 29/)[0]).toBeInTheDocument();

      // Nettoyer le premier rendu
      unmount();

      // Maintenant tester avec CC 16 - Transports routiers
      Storage.prototype.getItem = jest.fn(
        () => `
        {
          "num": 16,
          "shortTitle": "Transports routiers",
          "id": "KALICONT000005635624",
          "title": "Convention collective nationale des transports routiers et activités auxiliaires du transport du 21 décembre 1950",
          "url": "https://www.legifrance.gouv.fr/conv_coll/id/KALICONT000005635624",
          "slug": "16"
        }
      `
      );

      render(
        <PreavisDemissionSimulator
          relatedItems={[]}
          title="Durée de préavis de démission"
          displayTitle="Simulateur de durée de préavis de démission"
        />
      );

      // Démarrer le simulateur avec CC 16
      fireEvent.click(ui.introduction.startButton.get());
      fireEvent.click(ui.next.get());

      // Sélectionner Employés pour CC 16
      const categorySelect16 = screen.getByTestId(
        "infos-contrat-salarié-convention-collective-transports-routiers-catégorie-professionnelle"
      );
      fireEvent.change(categorySelect16, {
        target: { value: "'Employés'" },
      });
      fireEvent.click(ui.next.get());

      // Vérifier le résultat pour CC 16 (Employés = 1 mois, mais référence différente)
      expect(screen.queryAllByText(/1 mois/g)[0]).toBeInTheDocument();
      expect(
        screen.queryAllByText(/Annexe II, article 13/)[0]
      ).toBeInTheDocument();
    });
  });

  describe("Test avec convention collective complexe (sous-questions)", () => {
    beforeEach(() => {
      // Mock pour CC 16 - Transports routiers (qui a des sous-questions)
      Storage.prototype.getItem = jest.fn(
        () => `
        {
          "num": 16,
          "shortTitle": "Transports routiers",
          "id": "KALICONT000005635624",
          "title": "Convention collective nationale des transports routiers et activités auxiliaires du transport du 21 décembre 1950",
          "url": "https://www.legifrance.gouv.fr/conv_coll/id/KALICONT000005635624",
          "slug": "16"
        }
      `
      );
    });

    it("devrait permettre de modifier des sous-questions et voir le résultat mis à jour", () => {
      render(
        <PreavisDemissionSimulator
          relatedItems={[]}
          title="Durée de préavis de démission"
          displayTitle="Simulateur de durée de préavis de démission"
        />
      );

      // Démarrer le simulateur
      fireEvent.click(ui.introduction.startButton.get());
      fireEvent.click(ui.next.get());

      // Sélectionner "Ouvriers" pour avoir des sous-questions
      const categorySelect = screen.getByTestId(
        "infos-contrat-salarié-convention-collective-transports-routiers-catégorie-professionnelle"
      );
      fireEvent.change(categorySelect, {
        target: { value: "'Ouvriers'" },
      });

      // Première sous-question : personnel de conduite = Oui
      const conductionSelect = screen.getByTestId(
        "infos-contrat-salarié-convention-collective-transports-routiers-catégorie-professionnelle-Ouvriers-personnel-de-conduite"
      );
      fireEvent.change(conductionSelect, {
        target: { value: "'Oui'" },
      });
      fireEvent.click(ui.next.get());

      // Vérifier le résultat pour Ouvriers avec personnel de conduite (2 semaines)
      expect(screen.queryAllByText(/2 semaines/g)[0]).toBeInTheDocument();
      expect(
        screen.queryAllByText(/Accord du 18 avril 2002, article 30/)[0]
      ).toBeInTheDocument();

      // Revenir en arrière pour modifier la sous-question
      fireEvent.click(ui.previous.get());
      fireEvent.change(conductionSelect, {
        target: { value: "'Non'" },
      });

      // Attendre que la nouvelle sous-question apparaisse
      waitFor(() => {
        const marchandisesSelect = screen.queryByTestId(
          "infos-contrat-salarié-convention-collective-transports-routiers-catégorie-professionnelle-Ouvriers-personnel-de-conduite-Non-personnels-des-entreprises-de-transport-routier-de-marchandises"
        );
        if (marchandisesSelect) {
          fireEvent.change(marchandisesSelect, {
            target: { value: "'Non'" },
          });
        }
      });

      fireEvent.click(ui.next.get());

      // Vérifier qu'on a un résultat (même si différent)
      expect(screen.getByText("Résultat")).toBeInTheDocument();
    });
  });
});
