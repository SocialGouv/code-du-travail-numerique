
        import { DureePreavisDemission } from "../../index";
        import { ui } from "../ui";
        import { fireEvent, render, screen } from "@testing-library/react";
        
        jest.spyOn(Storage.prototype, "setItem");
        Storage.prototype.getItem = jest.fn(
          () => `
        {
          "num": 2148,
          "shortTitle": "shortTitle",
          "id": "id",
          "title": "title",
          "url": "https://www.url.fr",
          "slug": "2148"
        }
        `
        );
    
        describe("DureePreavisDemission", () => {
          beforeEach(() => {
            render(<DureePreavisDemission icon={""} title={""} displayTitle={""} />);
                fireEvent.click(ui.introduction.startButton.get());
                
    
        fireEvent.click(ui.next.get());
      
    
          });
          
      describe("criteria.groupe = 20| A et B", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.groupe"), {
          target: { value: "20| A et B" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
      describe("criteria.ancienneté = 38| Moins de 2 ans", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "38| Moins de 2 ans" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/1 mois/g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Article 4.4.1.1/)[0]).toBeInTheDocument();
          
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
          
        expect(screen.queryAllByText(/Article 4.4.1.1/)[0]).toBeInTheDocument();
          
    });
  
      });
    
        
      });
    
      describe("criteria.groupe = 21| C et D", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.groupe"), {
          target: { value: "21| C et D" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/2 mois/g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Article 4.4.1.1/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.groupe = 22| E, F et G", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.groupe"), {
          target: { value: "22| E, F et G" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/3 mois/g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Article 4.4.1.1/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.groupe = 23| Hors classification", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.groupe"), {
          target: { value: "23| Hors classification" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/3 mois/g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Article 4.4.1.1/)[0]).toBeInTheDocument();
          
    });
  
      });
    
          
        });
      