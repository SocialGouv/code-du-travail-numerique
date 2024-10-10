
        import { DureePreavisLicenciement } from "../../index";
        import { ui } from "../ui";
        import { fireEvent, render, screen } from "@testing-library/react";
        
        jest.spyOn(Storage.prototype, "setItem");
        Storage.prototype.getItem = jest.fn(
          () => `
        {
          "num": 1505,
          "shortTitle": "shortTitle",
          "id": "id",
          "title": "title",
          "url": "https://www.url.fr",
          "slug": "1505"
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
          
      describe("criteria.catégorie professionnelle = 23| Agents de maîtrise (AM1 et AM2)", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.catégorie professionnelle"), {
          target: { value: "23| Agents de maîtrise (AM1 et AM2)" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/2 mois/g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/article 20/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.catégorie professionnelle = 48| Cadres (C1 et C2)", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.catégorie professionnelle"), {
          target: { value: "48| Cadres (C1 et C2)" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/3 mois/g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/article 20/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.catégorie professionnelle = 6| Employés (E1 à E7)", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.catégorie professionnelle"), {
          target: { value: "6| Employés (E1 à E7)" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
      describe("criteria.ancienneté = 40| 2 ans ou moins", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "40| 2 ans ou moins" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/1 mois/g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/article 20/)[0]).toBeInTheDocument();
          
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
          
        expect(screen.queryAllByText(/article 20/)[0]).toBeInTheDocument();
          
    });
  
      });
    
        
      });
    
          
        });
      