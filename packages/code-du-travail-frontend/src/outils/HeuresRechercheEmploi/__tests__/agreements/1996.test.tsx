
        import { HeuresRechercheEmploi } from "../../index";
        import { ui } from "../ui";
        import { fireEvent, render, screen } from "@testing-library/react";
        
        jest.spyOn(Storage.prototype, "setItem");
        Storage.prototype.getItem = jest.fn(
          () => `
        {
          "num": 1996,
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
          
      describe("typeRupture = 2| Démission ou licenciement", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("typeRupture"), {
          target: { value: "2| Démission ou licenciement" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
      describe("criteria.catégorie professionnelle = 48| Cadres", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.catégorie professionnelle"), {
          target: { value: "48| Cadres" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
      describe("criteria.durée du travail = 2| Temps partiel", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.durée du travail"), {
          target: { value: "2| Temps partiel" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/2 heures par jour, dans la limite d'un tiers du temps de travail pour un salarié à temps partiel/)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Le salaire est maintenu./)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Elles sont fixées un jour par l'employeur et un jour par le salarié. L'employeur peut autoriser le regroupement de ces heures d'absence, si le salarié en fait la demande./)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Article 6 des dispositions particulières pour les cadres/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.durée du travail = 1| Temps complet", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.durée du travail"), {
          target: { value: "1| Temps complet" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/2 heures par jour/)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Le salaire est maintenu./)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Elles sont fixées un jour par l'employeur et un jour par le salarié. L'employeur peut autoriser le regroupement de ces heures d'absence, si le salarié en fait la demande./)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Article 6 des dispositions particulières pour les cadres/)[0]).toBeInTheDocument();
          
    });
  
      });
    
        
      });
    
      describe("criteria.catégorie professionnelle = 38| Non-cadres", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.catégorie professionnelle"), {
          target: { value: "38| Non-cadres" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
      describe("criteria.durée du travail = 1| Temps complet", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.durée du travail"), {
          target: { value: "1| Temps complet" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/2 heures par jour/)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Le salaire est maintenu./)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Elles sont fixées un jour par l'employeur et un jour par le salarié. L'employeur peut autoriser le regroupement de ces heures d'absence, si le salarié en fait la demande/)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Article 20/)[0]).toBeInTheDocument();
          
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
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/D’après les éléments saisis, dans votre situation, la convention collective ne prévoit pas d’heures d’absence autorisée pour rechercher un emploi./)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Article 19/)[0]).toBeInTheDocument();
          
    });
  
      });
    
          
        });
      