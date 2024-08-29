
        import { SimulateurIndemnitePrecarite } from "../../index";
        import { ui } from "../ui";
        import { fireEvent, render, screen } from "@testing-library/react";
        
        jest.spyOn(Storage.prototype, "setItem");
        Storage.prototype.getItem = jest.fn(
          () => `
        {
          "num": 2098,
          "shortTitle": "Transports routiers et activités auxiliaires du transport",
          "id": "KALICONT000005635624",
          "title": "Transports routiers et activités auxiliaires du transport",
          "url": "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635624",
          "slug": "16-transports-routiers-et-activites-auxiliaires-du-transport"
        }
        `
        );
    
        describe("SimulateurIndemnitePrecarite", () => {
          beforeEach(() => {
            render(<SimulateurIndemnitePrecarite icon={""} title={""} displayTitle={""} />);
                fireEvent.click(ui.introduction.startButton.get());
                
    
        fireEvent.click(ui.next.get());
      
    
          });
          
      describe("contractType = CDD", () => {
        
        beforeEach(() => {
          
        fireEvent.click(screen.getByTestId("contractType-cdd"));
        fireEvent.click(ui.next.get());
      
        });
        
      describe("criteria.cddType = CDD d'optimisation linéaire", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.cddType"), {
          target: { value: "CDD d'optimisation linéaire" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
      describe("typeRemuneration = amount", () => {
        
        beforeEach(() => {
          
        fireEvent.click(screen.getByTestId("typeRemuneration-amount"));
        fireEvent.click(ui.next.get());
      
        });
        
      describe("currency = 3000", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("currency"), {
          target: { value: "3000" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/300/)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Article 9 de l'accord du 10 mai 2010 relatif à l'activité d'optimisation de linéaires/)[0]).toBeInTheDocument();
          
    });
  
      });
    
        
      });
    
        
      });
    
      describe("criteria.cddType = CDD d'animation commerciale", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.cddType"), {
          target: { value: "CDD d'animation commerciale" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
      describe("typeRemuneration = amount", () => {
        
        beforeEach(() => {
          
        fireEvent.click(screen.getByTestId("typeRemuneration-amount"));
        fireEvent.click(ui.next.get());
      
        });
        
      describe("currency = 3000", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("currency"), {
          target: { value: "3000" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/300/)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Article 9 de l'accord du 13 février 2006 Activités de l'animation commerciale/)[0]).toBeInTheDocument();
          
    });
  
      });
    
        
      });
    
        
      });
    
      describe("criteria.cddType = Contrat d'intervention dans le secteur de l'accueil événementiel", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.cddType"), {
          target: { value: "Contrat d'intervention dans le secteur de l'accueil événementiel" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
      describe("typeRemuneration = amount", () => {
        
        beforeEach(() => {
          
        fireEvent.click(screen.getByTestId("typeRemuneration-amount"));
        fireEvent.click(ui.next.get());
      
        });
        
      describe("currency = 3000", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("currency"), {
          target: { value: "3000" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/300/)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Article 4.1 de l'accord du 20 septembre 2002 \(1\) relatif aux dispositions spécifiques à l'accueil événementiel/)[0]).toBeInTheDocument();
          
    });
  
      });
    
        
      });
    
        
      });
    
      describe("criteria.cddType = Autres", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.cddType"), {
          target: { value: "Autres" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
      describe("finContratPeriodeDessai = Non", () => {
        
        beforeEach(() => {
          
        fireEvent.click(screen.getByTestId("finContratPeriodeDessai-non"));
        fireEvent.click(ui.next.get());
      
        });
        
      describe("propositionCDIFindeContrat = Non", () => {
        
        beforeEach(() => {
          
        fireEvent.click(screen.getByTestId("propositionCDIFindeContrat-non"));
        fireEvent.click(ui.next.get());
      
        });
        
      describe("refusCDIFindeContrat = Non", () => {
        
        beforeEach(() => {
          
        fireEvent.click(screen.getByTestId("refusCDIFindeContrat-non"));
        fireEvent.click(ui.next.get());
      
        });
        
      describe("interruptionFauteGrave = Non", () => {
        
        beforeEach(() => {
          
        fireEvent.click(screen.getByTestId("interruptionFauteGrave-non"));
        fireEvent.click(ui.next.get());
      
        });
        
      describe("refusRenouvellementAuto = Non", () => {
        
        beforeEach(() => {
          
        fireEvent.click(screen.getByTestId("refusRenouvellementAuto-non"));
        fireEvent.click(ui.next.get());
      
        });
        
      describe("typeRemuneration = amount", () => {
        
        beforeEach(() => {
          
        fireEvent.click(screen.getByTestId("typeRemuneration-amount"));
        fireEvent.click(ui.next.get());
      
        });
        
      describe("currency = 3000", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("currency"), {
          target: { value: "3000" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/300/)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Article L1243-8 du code du travail/)[0]).toBeInTheDocument();
          
    });
  
      });
    
        
      });
    
        
      });
    
        
      });
    
        
      });
    
        
      });
    
        
      });
    
        
      });
    
        
      });
    
          
        });
      