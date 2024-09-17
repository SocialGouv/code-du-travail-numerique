
        import { DureePreavisDemission } from "../../index";
        import { ui } from "../ui";
        import { fireEvent, render, screen } from "@testing-library/react";
        
        jest.spyOn(Storage.prototype, "setItem");
        Storage.prototype.getItem = jest.fn(
          () => `
        {
          "num": 3248,
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
          
      describe("criteria.groupe = 1| A ou B", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.groupe"), {
          target: { value: "1| A ou B" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/2 semaines/)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Article 74.2.1/)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Article 68/)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Cour de cassation, civile, Chambre sociale, 31 mars 2021, 19-20.883, Inédit/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.groupe = 2| C", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.groupe"), {
          target: { value: "2| C" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/1 mois/)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Article 74.2.1/)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Article 68/)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Cour de cassation, civile, Chambre sociale, 31 mars 2021, 19-20.883, Inédit/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.groupe = 3| D ou E", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.groupe"), {
          target: { value: "3| D ou E" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/2 mois/)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Article 74.2.1/)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Article 68/)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Cour de cassation, civile, Chambre sociale, 31 mars 2021, 19-20.883, Inédit/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.groupe = 4| F, G, H ou I", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.groupe"), {
          target: { value: "4| F, G, H ou I" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/3 mois/)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Article 74.2.1/)[0]).toBeInTheDocument();
          
    });
  
      });
    
          
        });
      