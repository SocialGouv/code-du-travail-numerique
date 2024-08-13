
        import { HeuresRechercheEmploi } from "../../index";
        import { ui } from "../ui";
        import { fireEvent, render, screen } from "@testing-library/react";
        
        jest.spyOn(Storage.prototype, "setItem");
        Storage.prototype.getItem = jest.fn(
          () => `
        {
          "num": 2609,
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
            
              expect(screen.queryAllByText("D’après les éléments saisis, dans votre situation, la convention collective ne prévoit pas d’heures d’absence autorisée pour rechercher un emploi.")[0]).toBeInTheDocument();
            
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
            
              expect(screen.queryAllByText("5 journées ou 10 demi-journées")[0]).toBeInTheDocument();
            
              expect(screen.queryAllByText("Le salaire est maintenu.")[0]).toBeInTheDocument();
            
              expect(screen.queryAllByText("Les autorisations d'absence seront fixées moitié par le salarié, et moitié par l'employeur. Chacun devra en informer l'autre partie. L'employeur ne verse pas d'indemnité au salarié s'il n'utilise ces heures d'absence autorisée.")[0]).toBeInTheDocument();
            
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
            
              expect(screen.queryAllByText("5 journées ou 10 demi-journées")[0]).toBeInTheDocument();
            
              expect(screen.queryAllByText("Le salaire est maintenu.")[0]).toBeInTheDocument();
            
              expect(screen.queryAllByText("Les autorisations d'absence seront fixées moitié par le salarié, et moitié par l'employeur. Chacun devra en informer l'autre partie. L'employeur ne verse pas d'indemnité au salarié s'il n'utilise ces heures d'absence autorisée.")[0]).toBeInTheDocument();
            
          });
        
      });
    
          
        });
      