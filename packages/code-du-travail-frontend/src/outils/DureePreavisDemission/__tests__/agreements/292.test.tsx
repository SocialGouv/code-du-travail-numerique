
        import { DureePreavisDemission } from "../../index";
        import { ui } from "../ui";
        import { fireEvent, render, screen } from "@testing-library/react";
        
        jest.spyOn(Storage.prototype, "setItem");
        Storage.prototype.getItem = jest.fn(
          () => `
        {
          "num": 292,
          "shortTitle": "Transports routiers et activités auxiliaires du transport",
          "id": "KALICONT000005635624",
          "title": "Transports routiers et activités auxiliaires du transport",
          "url": "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635624",
          "slug": "16-transports-routiers-et-activites-auxiliaires-du-transport"
        }
        `
        );
    
        describe("DureePreavisDemission", () => {
          beforeEach(() => {
            render(<DureePreavisDemission icon={""} title={""} displayTitle={""} />);
                fireEvent.click(ui.introduction.startButton.get());
                
    
        fireEvent.click(ui.next.get());
      
    
          });
          
      describe("criteria.catégorie professionnelle = 48| Cadres", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.catégorie professionnelle"), {
          target: { value: "48| Cadres" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/3 mois/)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Avenant Cadres, Article 8/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.catégorie professionnelle = 42| Collaborateurs", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.catégorie professionnelle"), {
          target: { value: "42| Collaborateurs" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
      describe("criteria.coefficient = 24| 700 à 750", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.coefficient"), {
          target: { value: "24| 700 à 750" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/1 mois/)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Article 15/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.coefficient = 28| 800 à 830 inclus", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.coefficient"), {
          target: { value: "28| 800 à 830 inclus" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/2 mois/)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Article 15/)[0]).toBeInTheDocument();
          
    });
  
      });
    
        
      });
    
          
        });
      