
        import { DureePreavisDemission } from "../../index";
        import { ui } from "../ui";
        import { fireEvent, render, screen } from "@testing-library/react";
        
        jest.spyOn(Storage.prototype, "setItem");
        Storage.prototype.getItem = jest.fn(
          () => `
        {
          "num": 1517,
          "shortTitle": "shortTitle",
          "id": "id",
          "title": "title",
          "url": "https://www.url.fr",
          "slug": "1517"
        }
        `
        );
    
        describe("DureePreavisDemission", () => {
          beforeEach(() => {
            render(<DureePreavisDemission icon={""} title={""} displayTitle={""} />);
                fireEvent.click(ui.introduction.startButton.get());
                
    
        fireEvent.click(ui.next.get());
      
    
          });
          
      describe("criteria.niveau = 1| I", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.niveau"), {
          target: { value: "1| I" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/1 mois/g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Chapitre VI, Article 1/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.niveau = 3| II", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.niveau"), {
          target: { value: "3| II" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/1 mois/g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Chapitre VI, Article 1/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.niveau = 4| III", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.niveau"), {
          target: { value: "4| III" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/1 mois/g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Chapitre VI, Article 1/)[0]).toBeInTheDocument();
          
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
      expect(screen.queryAllByText(/1 mois/g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Chapitre VI, Article 1/)[0]).toBeInTheDocument();
          
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
      expect(screen.queryAllByText(/1 mois/g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Chapitre VI, Article 1/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.niveau = 8| VI", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.niveau"), {
          target: { value: "8| VI" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/2 mois/g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Chapitre VI, Article 1/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.niveau = 9| VII", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.niveau"), {
          target: { value: "9| VII" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/3 mois/g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Chapitre VI, Article 1/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.niveau = 11| VIII", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.niveau"), {
          target: { value: "11| VIII" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/3 mois/g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Chapitre VI, Article 1/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.niveau = 12| IX", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.niveau"), {
          target: { value: "12| IX" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/3 mois/g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Chapitre VI, Article 1/)[0]).toBeInTheDocument();
          
    });
  
      });
    
          
        });
      