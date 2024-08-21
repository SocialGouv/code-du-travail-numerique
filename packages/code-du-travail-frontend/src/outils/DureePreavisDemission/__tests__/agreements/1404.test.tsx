
        import { DureePreavisDemission } from "../../index";
        import { ui } from "../ui";
        import { fireEvent, render, screen } from "@testing-library/react";
        
        jest.spyOn(Storage.prototype, "setItem");
        Storage.prototype.getItem = jest.fn(
          () => `
        {
          "num": 1404,
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
          
      describe("criteria.catégorie professionnelle = 24| Agents de maîtrise (niveau IV et V)", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.catégorie professionnelle"), {
          target: { value: "24| Agents de maîtrise (niveau IV et V)" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/3 mois/)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Article 3.41.0 de la convention collective/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.catégorie professionnelle = 52| Cadres (niveau VI et plus)", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.catégorie professionnelle"), {
          target: { value: "52| Cadres (niveau VI et plus)" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/3 mois/)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Article 6.50 de la convention collective/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.catégorie professionnelle = 10| Ouvriers, Employés (niveau III)", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.catégorie professionnelle"), {
          target: { value: "10| Ouvriers, Employés (niveau III)" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
      describe("criteria.niveau = 4| III", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.niveau"), {
          target: { value: "4| III" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/2 mois/)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Article 3.41.0 de la convention collective/)[0]).toBeInTheDocument();
          
    });
  
      });
    
        
      });
    
      describe("criteria.catégorie professionnelle = 7| Ouvriers, Employés (niveaux I et II)", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.catégorie professionnelle"), {
          target: { value: "7| Ouvriers, Employés (niveaux I et II)" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
      describe("criteria.niveau = 2| I à II", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.niveau"), {
          target: { value: "2| I à II" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/1 mois/)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Article 3.41.0 de la convention collective/)[0]).toBeInTheDocument();
          
    });
  
      });
    
        
      });
    
          
        });
      