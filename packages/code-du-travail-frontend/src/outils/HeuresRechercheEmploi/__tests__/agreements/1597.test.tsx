
        import { HeuresRechercheEmploi } from "../../index";
        import { ui } from "../ui";
        import { fireEvent, render, screen } from "@testing-library/react";
        
        jest.spyOn(Storage.prototype, "setItem");
        Storage.prototype.getItem = jest.fn(
          () => `
        {
          "num": 1597,
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
          
      describe("typeRupture = 3| Licenciement", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("typeRupture"), {
          target: { value: "3| Licenciement" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
      describe("criteria.durée du préavis = 1| 2 jours", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.durée du préavis"), {
          target: { value: "1| 2 jours" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
          it("should display expected answer", () => {
            
              expect(screen.queryAllByText("4 heures de travail. Pour le salarié à temps partiel, la durée de l’absence est calculée proportionnellement au temps de travail")[0]).toBeInTheDocument();
            
              expect(screen.queryAllByText("Le salaire est maintenu. Les heures non utilisés dans ce cadre ne donnent pas lieu à rémunération.")[0]).toBeInTheDocument();
            
          });
        
      });
    
      describe("criteria.durée du préavis = 6| 2 semaines", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.durée du préavis"), {
          target: { value: "6| 2 semaines" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
          it("should display expected answer", () => {
            
              expect(screen.queryAllByText("12 heures de travail. Pour le salarié à temps partiel, la durée de l’absence est calculée proportionnellement au temps de travail")[0]).toBeInTheDocument();
            
              expect(screen.queryAllByText("Le salaire est maintenu. Les heures non utilisés dans ce cadre ne donnent pas lieu à rémunération.")[0]).toBeInTheDocument();
            
          });
        
      });
    
      describe("criteria.durée du préavis = 7| Plus de 2 semaines", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.durée du préavis"), {
          target: { value: "7| Plus de 2 semaines" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
          it("should display expected answer", () => {
            
              expect(screen.queryAllByText("25 heures de travail. Pour le salarié à temps partiel, la durée de l’absence est calculée proportionnellement au temps de travail")[0]).toBeInTheDocument();
            
              expect(screen.queryAllByText("Le salaire est maintenu. Les heures non utilisés dans ce cadre ne donnent pas lieu à rémunération.")[0]).toBeInTheDocument();
            
          });
        
      });
    
        
      });
    
      describe("typeRupture = 1| Démission", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("typeRupture"), {
          target: { value: "1| Démission" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
      describe("criteria.durée du préavis = 1| 2 jours", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.durée du préavis"), {
          target: { value: "1| 2 jours" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
          it("should display expected answer", () => {
            
              expect(screen.queryAllByText("4 heures de travail. Pour le salarié à temps partiel, la durée de l’absence est calculée proportionnellement au temps de travail")[0]).toBeInTheDocument();
            
              expect(screen.queryAllByText("Le salaire n'est pas maintenu. Les heures non utilisés dans ce cadre ne donnent pas lieu à rémunération.")[0]).toBeInTheDocument();
            
          });
        
      });
    
      describe("criteria.durée du préavis = 6| 2 semaines", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.durée du préavis"), {
          target: { value: "6| 2 semaines" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
          it("should display expected answer", () => {
            
              expect(screen.queryAllByText("12 heures de travail. Pour le salarié à temps partiel, la durée de l’absence est calculée proportionnellement au temps de travail")[0]).toBeInTheDocument();
            
              expect(screen.queryAllByText("Le salaire n'est pas maintenu. Les heures non utilisés dans ce cadre ne donnent pas lieu à rémunération.")[0]).toBeInTheDocument();
            
          });
        
      });
    
      describe("criteria.durée du préavis = 7| Plus de 2 semaines", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.durée du préavis"), {
          target: { value: "7| Plus de 2 semaines" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
          it("should display expected answer", () => {
            
              expect(screen.queryAllByText("25 heures de travail. Pour le salarié à temps partiel, la durée de l’absence est calculée proportionnellement au temps de travail")[0]).toBeInTheDocument();
            
              expect(screen.queryAllByText("Le salaire n'est pas maintenu. Les heures non utilisés dans ce cadre ne donnent pas lieu à rémunération.")[0]).toBeInTheDocument();
            
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
            
              expect(screen.queryAllByText("D’après les éléments saisis, dans votre situation, la convention collective ne prévoit pas d’heures d’absence autorisée pour rechercher un emploi.")[0]).toBeInTheDocument();
            
          });
        
      });
    
          
        });
      