
        import { DureePreavisDemission } from "../../index";
        import { ui } from "../ui";
        import { fireEvent, render, screen } from "@testing-library/react";
        
        jest.spyOn(Storage.prototype, "setItem");
        Storage.prototype.getItem = jest.fn(
          () => `
        {
          "num": 1090,
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
          
      describe("criteria.catégorie professionnelle = 23| Agents de maîtrise", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.catégorie professionnelle"), {
          target: { value: "23| Agents de maîtrise" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
      describe("criteria.échelon = 4| De 17 à 19", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.échelon"), {
          target: { value: "4| De 17 à 19" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/2 mois/g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Article 4.10 de la convention collective/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.échelon = 5| De 20 à 25", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.échelon"), {
          target: { value: "5| De 20 à 25" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/3 mois/g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Article 4.10 de la convention collective/)[0]).toBeInTheDocument();
          
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
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/3 mois/g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Article 4.10 de la convention collective/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.catégorie professionnelle = 6| Ouvriers, Employés", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.catégorie professionnelle"), {
          target: { value: "6| Ouvriers, Employés" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
      describe("criteria.échelon = 2| 1 et 2", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.échelon"), {
          target: { value: "2| 1 et 2" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/2 semaines/g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Article 2.12 de la convention collective/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.échelon = 3| De 3 à 12", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.échelon"), {
          target: { value: "3| De 3 à 12" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/1 mois/g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Article 2.12 de la convention collective/)[0]).toBeInTheDocument();
          
    });
  
      });
    
        
      });
    
          
        });
      