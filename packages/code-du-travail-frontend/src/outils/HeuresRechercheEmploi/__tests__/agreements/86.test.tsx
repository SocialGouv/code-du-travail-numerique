
        import { HeuresRechercheEmploi } from "../../index";
        import { ui } from "../ui";
        import { fireEvent, render, screen } from "@testing-library/react";
        
        jest.spyOn(Storage.prototype, "setItem");
        Storage.prototype.getItem = jest.fn(
          () => `
        {
          "num": 86,
          "shortTitle": "Transports routiers et activités auxiliaires du transport",
          "id": "KALICONT000005635624",
          "title": "Transports routiers et activités auxiliaires du transport",
          "url": "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635624",
          "slug": "16-transports-routiers-et-activites-auxiliaires-du-transport"
        }
        `
        );
    
        describe("HeuresRechercheEmploi", () => {
          beforeEach(() => {
            render(<HeuresRechercheEmploi icon={""} title={""} displayTitle={""} />);
                fireEvent.click(ui.introduction.startButton.get());
                
    
        fireEvent.click(ui.next.get());
      
    
          });
          
      describe("typeRupture = 1| Démission", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("typeRupture"), {
          target: { value: "1| Démission" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
      describe("criteria.catégorie professionnelle = 21| Agents de maîtrise et Techniciens", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.catégorie professionnelle"), {
          target: { value: "21| Agents de maîtrise et Techniciens" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/2 heures par jour/)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Le salaire est maintenu./)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Le salarié fixe par accord avec l'employeur la période de la journée pendant laquelle il prend ces 2 heures. Si l'employeur et le salarié le décident ensemble, ces heures peuvent être prises, de façon groupée, en une ou plusieurs journées ou demi-journées, consécutives ou non. En cas d'absence d'accord entre l'employeur et le salarié, ces 2 heures sont fixées un jour par l'employeur et, le jour suivant, par le salarié. Lorsque le salarié a retrouvé un emploi, il doit immédiatement en informer l'employeur et ne pourra plus utiliser les heures d'absence autorisée pour rechercher un emploi./)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Article 48/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.catégorie professionnelle = 48| Cadres", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.catégorie professionnelle"), {
          target: { value: "48| Cadres" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/2 heures par jour/)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Le salaire est maintenu./)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Le salarié fixe par accord avec l'employeur la période de la journée pendant laquelle il prend ces 2 heures. Si l'employeur et le salarié le décident ensemble, ces heures peuvent être prises, de façon groupée, en une ou plusieurs journées ou demi-journées, consécutives ou non. En cas d'absence d'accord entre l'employeur et le salarié, ces 2 heures sont fixées un jour par l'employeur et, le jour suivant, par le salarié. Lorsque le salarié a retrouvé un emploi, il doit immédiatement en informer l'employeur et ne pourra plus utiliser les heures d'absence autorisée pour rechercher un emploi./)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Article 67/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.catégorie professionnelle = 16| Employés", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.catégorie professionnelle"), {
          target: { value: "16| Employés" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/2 heures par jour/)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Le salaire est maintenu./)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Le salarié fixe par accord avec l'employeur la période de la journée pendant laquelle il prend ces 2 heures. Si l'employeur et le salarié le décident ensemble, ces heures peuvent être prises, de façon groupée, en une ou plusieurs journées ou demi-journées, consécutives ou non. En cas d'absence d'accord entre l'employeur et le salarié, ces 2 heures sont fixées un jour par l'employeur et, le jour suivant, par le salarié. Lorsque le salarié a retrouvé un emploi, il doit immédiatement en informer l'employeur et ne pourra plus utiliser les heures d'absence autorisée pour rechercher un emploi./)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Article 29/)[0]).toBeInTheDocument();
          
    });
  
      });
    
        
      });
    
      describe("typeRupture = 3| Licenciement", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("typeRupture"), {
          target: { value: "3| Licenciement" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
      describe("criteria.catégorie professionnelle = 21| Agents de maîtrise et Techniciens", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.catégorie professionnelle"), {
          target: { value: "21| Agents de maîtrise et Techniciens" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/2 heures par jour/)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Le salaire est maintenu./)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Le salarié fixe par accord avec l'employeur la période de la journée pendant laquelle il prend ces 2 heures. Si l'employeur et le salarié le décident ensemble, ces heures peuvent être prises, de façon groupée, en une ou plusieurs journées ou demi-journées, consécutives ou non. En cas d'absence d'accord entre l'employeur et le salarié, ces 2 heures sont fixées un jour par l'employeur et, le jour suivant, par le salarié. Lorsque le salarié a retrouvé un emploi, il doit immédiatement en informer l'employeur et ne pourra plus utiliser les heures d'absence autorisée pour rechercher un emploi./)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Article 49/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.catégorie professionnelle = 48| Cadres", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.catégorie professionnelle"), {
          target: { value: "48| Cadres" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/2 heures par jour/)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Le salaire est maintenu./)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Le salarié fixe par accord avec l'employeur la période de la journée pendant laquelle il prend ces 2 heures. Si l'employeur et le salarié le décident ensemble, ces heures peuvent être prises, de façon groupée, en une ou plusieurs journées ou demi-journées, consécutives ou non. En cas d'absence d'accord entre l'employeur et le salarié, ces 2 heures sont fixées un jour par l'employeur et, le jour suivant, par le salarié. Lorsque le salarié a retrouvé un emploi, il doit immédiatement en informer l'employeur et ne pourra plus utiliser les heures d'absence autorisée pour rechercher un emploi./)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Article 68/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.catégorie professionnelle = 16| Employés", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.catégorie professionnelle"), {
          target: { value: "16| Employés" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
      describe("criteria.ancienneté = 40| 2 ans ou moins", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "40| 2 ans ou moins" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/D’après les éléments saisis, dans votre situation, la convention collective ne prévoit pas d’heures d’absence autorisée pour rechercher un emploi./)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Article 30/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.ancienneté = 43| Plus de 2 ans", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "43| Plus de 2 ans" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/2 heures par jour/)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Le salaire est maintenu./)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Le salarié fixe par accord avec l'employeur la période de la journée pendant laquelle il prend ces 2 heures. Si l'employeur et le salarié le décident ensemble, ces heures peuvent être prises, de façon groupée, en une ou plusieurs journées ou demi-journées, consécutives ou non. En cas d'absence d'accord entre l'employeur et le salarié, ces 2 heures sont fixées un jour par l'employeur et, le jour suivant, par le salarié. Lorsque le salarié a retrouvé un emploi, il doit immédiatement en informer l'employeur et ne pourra plus utiliser les heures d'absence autorisée pour rechercher un emploi./)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Article 30/)[0]).toBeInTheDocument();
          
    });
  
      });
    
        
      });
    
        
      });
    
      describe("typeRupture = 7| Rupture de la période d'essai", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("typeRupture"), {
          target: { value: "7| Rupture de la période d'essai" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
      describe("criteria.catégorie professionnelle = 21| Agents de maîtrise et Techniciens", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.catégorie professionnelle"), {
          target: { value: "21| Agents de maîtrise et Techniciens" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
      describe("criteria.initiative de la rupture de la période d'essai = 1| L'employeur", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.initiative de la rupture de la période d'essai"), {
          target: { value: "1| L'employeur" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/1 heure par jour lorsque l'employeur décide de la rupture du contrat après le renouvellement de la période d'essai/)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/L'employeur et le salarié peuvent décider de cumuler ces heures sur 1 semaine ou sur 1 mois. Ce cumul sera appliqué pour les salariés en forfait jours./)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Article 33/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.initiative de la rupture de la période d'essai = 2| Le salarié", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.initiative de la rupture de la période d'essai"), {
          target: { value: "2| Le salarié" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/D’après les éléments saisis, dans votre situation, la convention collective ne prévoit pas d’heures d’absence autorisée pour rechercher un emploi./)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Article 33/)[0]).toBeInTheDocument();
          
    });
  
      });
    
        
      });
    
      describe("criteria.catégorie professionnelle = 48| Cadres", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.catégorie professionnelle"), {
          target: { value: "48| Cadres" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
      describe("criteria.initiative de la rupture de la période d'essai = 1| L'employeur", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.initiative de la rupture de la période d'essai"), {
          target: { value: "1| L'employeur" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/1 heure par jour, lorsque l'employeur décide de la rupture du contrat après le renouvellement de la période d'essai/)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/L'employeur et le salarié peuvent décider ensemble de cumuler ces heures sur 1 semaine ou sur 1 mois. Ce cumul sera appliqué pour les salariés en forfait jours./)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Article 53/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.initiative de la rupture de la période d'essai = 2| Le salarié", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.initiative de la rupture de la période d'essai"), {
          target: { value: "2| Le salarié" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/D’après les éléments saisis, dans votre situation, la convention collective ne prévoit pas d’heures d’absence autorisée pour rechercher un emploi./)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Article 53/)[0]).toBeInTheDocument();
          
    });
  
      });
    
        
      });
    
      describe("criteria.catégorie professionnelle = 16| Employés", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.catégorie professionnelle"), {
          target: { value: "16| Employés" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/D’après les éléments saisis, dans votre situation, la convention collective ne prévoit pas d’heures d’absence autorisée pour rechercher un emploi./)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Article 15/)[0]).toBeInTheDocument();
          
    });
  
      });
    
        
      });
    
          
        });
      