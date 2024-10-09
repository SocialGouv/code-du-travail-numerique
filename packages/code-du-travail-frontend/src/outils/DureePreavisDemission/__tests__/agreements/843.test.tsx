
        import { DureePreavisDemission } from "../../index";
        import { ui } from "../ui";
        import { fireEvent, render, screen } from "@testing-library/react";
        
        jest.spyOn(Storage.prototype, "setItem");
        Storage.prototype.getItem = jest.fn(
          () => `
        {
          "num": 843,
          "shortTitle": "shortTitle",
          "id": "id",
          "title": "title",
          "url": "https://www.url.fr",
          "slug": "843"
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
      expect(screen.queryAllByText(/2 mois/g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Article 6 de l'annexe : Statut du personnel d'encadrement/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.catégorie professionnelle = 35| Personnel de fabrication, personnel de vente et personnel de services", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.catégorie professionnelle"), {
          target: { value: "35| Personnel de fabrication, personnel de vente et personnel de services" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
      describe("criteria.ancienneté = 15| Moins de 6 mois", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "15| Moins de 6 mois" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/1 semaine/g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Article 32 de la convention collective/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.ancienneté = 22| Plus de 6 mois", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "22| Plus de 6 mois" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/2 semaines/g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Article 32 de la convention collective/)[0]).toBeInTheDocument();
          
    });
  
      });
    
        
      });
    
          
        });
      