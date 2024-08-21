
        import { HeuresRechercheEmploi } from "../../index";
        import { ui } from "../ui";
        import { fireEvent, render, screen } from "@testing-library/react";
        
        jest.spyOn(Storage.prototype, "setItem");
        Storage.prototype.getItem = jest.fn(
          () => `
        {
          "num": 787,
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
        
      describe("criteria.ancienneté = 47| Au moins 5 ans", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "47| Au moins 5 ans" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/2 heures par journée d'ouverture du cabinet/)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Le salaire est maintenu./)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Les heures sont fixées d'un commun accord entre l'employeur et le salarié. En l'absence d'accord, ces absences sont fixées un jour par l'employeur et le salarié. Le salarié qui a retrouvé un emploi ne peut plus utiliser ces heures./)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Article 6.2.2/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.ancienneté = 46| Moins de 5 ans", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "46| Moins de 5 ans" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/2 heures par journée d'ouverture du cabinet/)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Le salaire n'est pas maintenu./)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Les heures sont fixées d'un commun accord entre l'employeur et le salarié. En l'absence d'accord, ces absences sont fixées un jour par l'employeur et le salarié. Le salarié qui a retrouvé un emploi ne peut plus utiliser ces heures./)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Article 6.2.2/)[0]).toBeInTheDocument();
          
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
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/2 heures par journée d'ouverture du cabinet/)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Le salaire est maintenu./)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Les heures sont fixées d'un commun accord entre l'employeur et le salarié. En l'absence d'accord, ces absences sont fixées un jour par l'employeur et le salarié. Le salarié qui a retrouvé un emploi ne peut plus utiliser ces heures./)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Article 6.2.2/)[0]).toBeInTheDocument();
          
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
          
        expect(screen.queryAllByText(/Article 6.2.2/)[0]).toBeInTheDocument();
          
    });
  
      });
    
          
        });
      