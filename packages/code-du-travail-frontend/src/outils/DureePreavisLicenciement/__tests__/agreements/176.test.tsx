
        import { DureePreavisLicenciement } from "../../index";
        import { ui } from "../ui";
        import { fireEvent, render, screen } from "@testing-library/react";
        
        jest.spyOn(Storage.prototype, "setItem");
        Storage.prototype.getItem = jest.fn(
          () => `
        {
          "num": 176,
          "shortTitle": "Transports routiers et activités auxiliaires du transport",
          "id": "KALICONT000005635624",
          "title": "Transports routiers et activités auxiliaires du transport",
          "url": "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635624",
          "slug": "16-transports-routiers-et-activites-auxiliaires-du-transport"
        }
        `
        );
    
        describe("DureePreavisLicenciement", () => {
          beforeEach(() => {
            render(<DureePreavisLicenciement icon={""} title={""} displayTitle={""} />);
                fireEvent.click(ui.introduction.startButton.get());
                
    
        fireEvent.click(screen.getByTestId("seriousMisconduct-non"));
        fireEvent.click(ui.next.get());
      
    
    
        fireEvent.click(screen.getByTestId("disabledWorker-non"));
        fireEvent.click(ui.next.get());
      
    
    
        fireEvent.change(screen.getByTestId("cdt.ancienneté"), {
          target: { value: "15| Moins de 6 mois" },
        });
        fireEvent.click(ui.next.get());
      
    
    
        fireEvent.click(ui.next.get());
      
    
          });
          
      describe("criteria.conclusion contrat travail = 1| Contrat de travail conclu avant le 1er juillet 2009", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.conclusion contrat travail"), {
          target: { value: "1| Contrat de travail conclu avant le 1er juillet 2009" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
      describe("criteria.groupe = 24| 1 à 3", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.groupe"), {
          target: { value: "24| 1 à 3" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/2 mois/)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Article 35, 2°/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.groupe = 15| 4", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.groupe"), {
          target: { value: "15| 4" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/2 mois/)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Article 35, 2°/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.groupe = 29| 5 et suivants", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.groupe"), {
          target: { value: "29| 5 et suivants" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/3 mois/)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Article 35, 2°/)[0]).toBeInTheDocument();
          
    });
  
      });
    
        
      });
    
      describe("criteria.conclusion contrat travail = 2| Contrat de travail conclu après le 1er juillet 2009", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.conclusion contrat travail"), {
          target: { value: "2| Contrat de travail conclu après le 1er juillet 2009" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
      describe("criteria.groupe = 24| 1 à 3", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.groupe"), {
          target: { value: "24| 1 à 3" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/2 mois/)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Article 35, 2°/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.groupe = 28| 4 à 6 ", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.groupe"), {
          target: { value: "28| 4 à 6 " },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/3 mois/)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Article 35, 2°/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.groupe = 31| 6 et suivants ", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.groupe"), {
          target: { value: "31| 6 et suivants " },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/4 mois/)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Article 35, 2°/)[0]).toBeInTheDocument();
          
    });
  
      });
    
        
      });
    
          
        });
      