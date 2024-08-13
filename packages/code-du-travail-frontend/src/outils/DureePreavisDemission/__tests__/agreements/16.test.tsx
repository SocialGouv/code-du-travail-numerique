
        import { DureePreavisDemission } from "../../index";
        import { ui } from "../ui";
        import { fireEvent, render, screen } from "@testing-library/react";
        
        jest.spyOn(Storage.prototype, "setItem");
        Storage.prototype.getItem = jest.fn(
          () => `
        {
          "num": 16,
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
          
      describe("criteria.catégorie professionnelle = 16| Employés", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.catégorie professionnelle"), {
          target: { value: "16| Employés" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
          it("should display expected answer", () => {
            
              expect(screen.queryAllByText("1 mois")[0]).toBeInTheDocument();
            
          });
        
      });
    
      describe("criteria.catégorie professionnelle = 61| Ingénieurs et Cadres", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.catégorie professionnelle"), {
          target: { value: "61| Ingénieurs et Cadres" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
          it("should display expected answer", () => {
            
              expect(screen.queryAllByText("3 mois")[0]).toBeInTheDocument();
            
          });
        
      });
    
      describe("criteria.catégorie professionnelle = 4| Ouvriers", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.catégorie professionnelle"), {
          target: { value: "4| Ouvriers" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
      describe("criteria.personnel de conduite = 1| Oui", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.personnel de conduite"), {
          target: { value: "1| Oui" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
          it("should display expected answer", () => {
            
              expect(screen.queryAllByText("2 semaines")[0]).toBeInTheDocument();
            
          });
        
      });
    
      describe("criteria.personnel de conduite = 2| Non", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.personnel de conduite"), {
          target: { value: "2| Non" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
      describe("criteria.personnels des entreprises de transport routier de marchandises = 1| Oui", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.personnels des entreprises de transport routier de marchandises"), {
          target: { value: "1| Oui" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
          it("should display expected answer", () => {
            
              expect(screen.queryAllByText("2 semaines")[0]).toBeInTheDocument();
            
          });
        
      });
    
      describe("criteria.personnels des entreprises de transport routier de marchandises = 1| Non", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.personnels des entreprises de transport routier de marchandises"), {
          target: { value: "1| Non" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
          it("should display expected answer", () => {
            
              expect(screen.queryAllByText("1 semaine")[0]).toBeInTheDocument();
            
          });
        
      });
    
        
      });
    
        
      });
    
      describe("criteria.catégorie professionnelle = 27| Techniciens et agents de maîtrise (TAM)", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.catégorie professionnelle"), {
          target: { value: "27| Techniciens et agents de maîtrise (TAM)" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
      describe("criteria.groupe = 25| 1 à 5 ", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.groupe"), {
          target: { value: "25| 1 à 5 " },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
          it("should display expected answer", () => {
            
              expect(screen.queryAllByText("1 mois")[0]).toBeInTheDocument();
            
          });
        
      });
    
      describe("criteria.groupe = 30| 6 à 8", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.groupe"), {
          target: { value: "30| 6 à 8" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
          it("should display expected answer", () => {
            
              expect(screen.queryAllByText("2 mois")[0]).toBeInTheDocument();
            
          });
        
      });
    
        
      });
    
          
        });
      