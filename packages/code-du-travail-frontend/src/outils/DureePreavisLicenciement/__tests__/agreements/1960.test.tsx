
        import { DureePreavisLicenciement } from "../../index";
        import { ui } from "../ui";
        import { fireEvent, render, screen } from "@testing-library/react";
        
        jest.spyOn(Storage.prototype, "setItem");
        Storage.prototype.getItem = jest.fn(
          () => `
        {
          "num": 1960,
          "shortTitle": "shortTitle",
          "id": "id",
          "title": "title",
          "url": "https://www.url.fr",
          "slug": "1960"
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
          
      describe("criteria.niveau = 1| I", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.niveau"), {
          target: { value: "1| I" },
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
      expect(screen.queryAllByText(/2 semaines/g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Article 20 des clauses particulières concernant les mensuels/)[0]).toBeInTheDocument();
          
    });
  
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
          
        expect(screen.queryAllByText(/Article 20 des clauses particulières concernant les mensuels/)[0]).toBeInTheDocument();
          
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
          
        expect(screen.queryAllByText(/Article 20 des clauses particulières concernant les mensuels/)[0]).toBeInTheDocument();
          
    });
  
      });
    
        
      });
    
      describe("criteria.niveau = 3| II", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.niveau"), {
          target: { value: "3| II" },
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
          
        expect(screen.queryAllByText(/Article 20 des clauses particulières concernant les mensuels/)[0]).toBeInTheDocument();
          
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
          
        expect(screen.queryAllByText(/Article 20 des clauses particulières concernant les mensuels/)[0]).toBeInTheDocument();
          
    });
  
      });
    
        
      });
    
      describe("criteria.niveau = 4| III", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.niveau"), {
          target: { value: "4| III" },
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
          
        expect(screen.queryAllByText(/Article 20 des clauses particulières concernant les mensuels/)[0]).toBeInTheDocument();
          
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
          
        expect(screen.queryAllByText(/Article 20 des clauses particulières concernant les mensuels/)[0]).toBeInTheDocument();
          
    });
  
      });
    
        
      });
    
      describe("criteria.niveau = 5| IV", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.niveau"), {
          target: { value: "5| IV" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/2 mois/g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Article 20 des clauses particulières concernant les mensuels/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.niveau = 7| V", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.niveau"), {
          target: { value: "7| V" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/3 mois/g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Article 20 des clauses particulières concernant les mensuels/)[0]).toBeInTheDocument();
          
    });
  
      });
    
          
        });
      