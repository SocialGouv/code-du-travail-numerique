
        import { DureePreavisDemission } from "../../index";
        import { ui } from "../ui";
        import { fireEvent, render, screen } from "@testing-library/react";
        
        jest.spyOn(Storage.prototype, "setItem");
        Storage.prototype.getItem = jest.fn(
          () => `
        {
          "num": 3127,
          "shortTitle": "shortTitle",
          "id": "id",
          "title": "title",
          "url": "https://www.url.fr",
          "slug": "3127"
        }
        `
        );
    
        describe("DureePreavisDemission", () => {
          beforeEach(() => {
            render(<DureePreavisDemission icon={""} title={""} displayTitle={""} />);
                fireEvent.click(ui.introduction.startButton.get());
                
    
        fireEvent.click(ui.next.get());
      
    
          });
          
      describe("criteria.ancienneté = 35| 6 mois à 2 ans", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "35| 6 mois à 2 ans" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/1 mois/g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Article 2 de la section 1 du Chapitre 4 de la Partie II de la convention collective/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.ancienneté = 43| Plus de 2 ans", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "43| Plus de 2 ans" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/2 mois/g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Article 2 de la section 1 du Chapitre 4 de la Partie II de la convention collective/)[0]).toBeInTheDocument();
          
    });
  
      });
    
          
        });
      