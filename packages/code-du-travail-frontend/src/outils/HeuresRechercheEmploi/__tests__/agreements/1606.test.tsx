
        import { HeuresRechercheEmploi } from "../../index";
        import { ui } from "../ui";
        import { fireEvent, render, screen } from "@testing-library/react";
        
        jest.spyOn(Storage.prototype, "setItem");
        Storage.prototype.getItem = jest.fn(
          () => `
        {
          "num": 1606,
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
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/1 journée ou 2 demi-journées par semaine ou un nombre d'heures équivalent. Pour le salarié à temps partiel, la durée de l’absence est calculée proportionnellement au temps de travail/)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Les absences doivent être fixées d'un commun accord entre l'employeur et le salarié. En l'absence d'accord, l'employeur et le salarié décident à tour de rôle et pour chaque semaine les conditions de ces absences./)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Article 9.1/)[0]).toBeInTheDocument();
          
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
      expect(screen.queryAllByText(/1 journée ou 2 demi-journées par semaine ou un nombre d'heures équivalent. Pour le salarié à temps partiel, la durée de l’absence est calculée proportionnellement au temps de travail/)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Les absences doivent être fixées d'un commun accord entre l'employeur et le salarié. En l'absence d'accord, l'employeur et le salarié décident à tour de rôle et pour chaque semaine les conditions de ces absences./)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Article 9.2.1/)[0]).toBeInTheDocument();
          
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
          
        expect(screen.queryAllByText(/Article 6/)[0]).toBeInTheDocument();
          
    });
  
      });
    
          
        });
      