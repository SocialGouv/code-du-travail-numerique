
        import { DureePreavisDemission } from "../../index";
        import { ui } from "../ui";
        import { fireEvent, render, screen } from "@testing-library/react";
        
        jest.spyOn(Storage.prototype, "setItem");
        Storage.prototype.getItem = jest.fn(
          () => `
        {
          "num": 1597,
          "shortTitle": "shortTitle",
          "id": "id",
          "title": "title",
          "url": "https://www.url.fr",
          "slug": "1597"
        }
        `
        );
    
        describe("DureePreavisDemission", () => {
          beforeEach(() => {
            render(<DureePreavisDemission icon={""} title={""} displayTitle={""} />);
                fireEvent.click(ui.introduction.startButton.get());
                
    
        fireEvent.click(ui.next.get());
      
    
          });
          
      describe("criteria.catégorie professionnelle = 4| Ouvriers", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.catégorie professionnelle"), {
          target: { value: "4| Ouvriers" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
      describe("criteria.ancienneté = 10| Au delà de la période d'essai et jusqu'à 3 mois", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "10| Au delà de la période d'essai et jusqu'à 3 mois" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/2 jours/g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Article 10.1/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.ancienneté = 13| Plus de 3 mois", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "13| Plus de 3 mois" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/2 semaines/g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Article 10.1/)[0]).toBeInTheDocument();
          
    });
  
      });
    
        
      });
    
          
        });
      