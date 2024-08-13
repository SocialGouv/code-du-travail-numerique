
        import { DureePreavisLicenciement } from "../../index";
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
          
      describe("criteria.âge = 1| Moins de 50 ans", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.âge"), {
          target: { value: "1| Moins de 50 ans" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
      describe("criteria.position = 1| A, B, C ou D", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.position"), {
          target: { value: "1| A, B, C ou D" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
      describe("criteria.anciennement cadre = 2| Oui", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.anciennement cadre"), {
          target: { value: "2| Oui" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
      describe("criteria.ancienneté = 47| Entre 3 ans et moins de 5 ans", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "47| Entre 3 ans et moins de 5 ans" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
          it("should display expected answer", () => {
            
              expect(screen.queryAllByText("3 mois")[0]).toBeInTheDocument();
            
          });
        
      });
    
      describe("criteria.ancienneté = 48| 5 ans ou plus", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "48| 5 ans ou plus" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
          it("should display expected answer", () => {
            
              expect(screen.queryAllByText("3 mois")[0]).toBeInTheDocument();
            
          });
        
      });
    
        
      });
    
        
      });
    
      describe("criteria.position = 2| E", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.position"), {
          target: { value: "2| E" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
      describe("criteria.anciennement cadre = 2| Oui", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.anciennement cadre"), {
          target: { value: "2| Oui" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
      describe("criteria.ancienneté = 47| Entre 3 ans et moins de 5 ans", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "47| Entre 3 ans et moins de 5 ans" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
          it("should display expected answer", () => {
            
              expect(screen.queryAllByText("3 mois")[0]).toBeInTheDocument();
            
          });
        
      });
    
      describe("criteria.ancienneté = 48| 5 ans ou plus", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "48| 5 ans ou plus" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
          it("should display expected answer", () => {
            
              expect(screen.queryAllByText("3 mois")[0]).toBeInTheDocument();
            
          });
        
      });
    
        
      });
    
        
      });
    
      describe("criteria.position = 3| F, G, H ou I", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.position"), {
          target: { value: "3| F, G, H ou I" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
      describe("criteria.ancienneté = 47| Entre 3 ans et moins de 5 ans", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "47| Entre 3 ans et moins de 5 ans" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
          it("should display expected answer", () => {
            
              expect(screen.queryAllByText("3 mois")[0]).toBeInTheDocument();
            
          });
        
      });
    
      describe("criteria.ancienneté = 48| 5 ans ou plus", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "48| 5 ans ou plus" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
          it("should display expected answer", () => {
            
              expect(screen.queryAllByText("3 mois")[0]).toBeInTheDocument();
            
          });
        
      });
    
        
      });
    
        
      });
    
      describe("criteria.âge = 2| 50 ans à 55 ans", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.âge"), {
          target: { value: "2| 50 ans à 55 ans" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
      describe("criteria.position = 1| A, B, C ou D", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.position"), {
          target: { value: "1| A, B, C ou D" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
      describe("criteria.anciennement cadre = 2| Oui", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.anciennement cadre"), {
          target: { value: "2| Oui" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
      describe("criteria.ancienneté = 47| Entre 3 ans et moins de 5 ans", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "47| Entre 3 ans et moins de 5 ans" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
          it("should display expected answer", () => {
            
              expect(screen.queryAllByText("4 mois")[0]).toBeInTheDocument();
            
          });
        
      });
    
      describe("criteria.ancienneté = 48| 5 ans ou plus", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "48| 5 ans ou plus" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
          it("should display expected answer", () => {
            
              expect(screen.queryAllByText("6 mois")[0]).toBeInTheDocument();
            
          });
        
      });
    
        
      });
    
        
      });
    
      describe("criteria.position = 2| E", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.position"), {
          target: { value: "2| E" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
      describe("criteria.anciennement cadre = 2| Oui", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.anciennement cadre"), {
          target: { value: "2| Oui" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
      describe("criteria.ancienneté = 47| Entre 3 ans et moins de 5 ans", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "47| Entre 3 ans et moins de 5 ans" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
          it("should display expected answer", () => {
            
              expect(screen.queryAllByText("4 mois")[0]).toBeInTheDocument();
            
          });
        
      });
    
      describe("criteria.ancienneté = 48| 5 ans ou plus", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "48| 5 ans ou plus" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
          it("should display expected answer", () => {
            
              expect(screen.queryAllByText("6 mois")[0]).toBeInTheDocument();
            
          });
        
      });
    
        
      });
    
        
      });
    
      describe("criteria.position = 3| F, G, H ou I", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.position"), {
          target: { value: "3| F, G, H ou I" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
      describe("criteria.ancienneté = 47| Entre 3 ans et moins de 5 ans", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "47| Entre 3 ans et moins de 5 ans" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
          it("should display expected answer", () => {
            
              expect(screen.queryAllByText("4 mois")[0]).toBeInTheDocument();
            
          });
        
      });
    
      describe("criteria.ancienneté = 48| 5 ans ou plus", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "48| 5 ans ou plus" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
          it("should display expected answer", () => {
            
              expect(screen.queryAllByText("6 mois")[0]).toBeInTheDocument();
            
          });
        
      });
    
        
      });
    
        
      });
    
      describe("criteria.âge = 4| 55 ans et plus", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.âge"), {
          target: { value: "4| 55 ans et plus" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
      describe("criteria.position = 1| A, B, C ou D", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.position"), {
          target: { value: "1| A, B, C ou D" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
      describe("criteria.anciennement cadre = 2| Oui", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.anciennement cadre"), {
          target: { value: "2| Oui" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
      describe("criteria.ancienneté = 47| Entre 3 ans et moins de 5 ans", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "47| Entre 3 ans et moins de 5 ans" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
          it("should display expected answer", () => {
            
              expect(screen.queryAllByText("6 mois")[0]).toBeInTheDocument();
            
          });
        
      });
    
      describe("criteria.ancienneté = 48| 5 ans ou plus", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "48| 5 ans ou plus" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
          it("should display expected answer", () => {
            
              expect(screen.queryAllByText("6 mois")[0]).toBeInTheDocument();
            
          });
        
      });
    
        
      });
    
        
      });
    
      describe("criteria.position = 2| E", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.position"), {
          target: { value: "2| E" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
      describe("criteria.anciennement cadre = 2| Oui", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.anciennement cadre"), {
          target: { value: "2| Oui" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
      describe("criteria.ancienneté = 47| Entre 3 ans et moins de 5 ans", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "47| Entre 3 ans et moins de 5 ans" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
          it("should display expected answer", () => {
            
              expect(screen.queryAllByText("6 mois")[0]).toBeInTheDocument();
            
          });
        
      });
    
      describe("criteria.ancienneté = 48| 5 ans ou plus", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "48| 5 ans ou plus" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
          it("should display expected answer", () => {
            
              expect(screen.queryAllByText("6 mois")[0]).toBeInTheDocument();
            
          });
        
      });
    
        
      });
    
        
      });
    
      describe("criteria.position = 3| F, G, H ou I", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.position"), {
          target: { value: "3| F, G, H ou I" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
      describe("criteria.ancienneté = 47| Entre 3 ans et moins de 5 ans", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "47| Entre 3 ans et moins de 5 ans" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
          it("should display expected answer", () => {
            
              expect(screen.queryAllByText("6 mois")[0]).toBeInTheDocument();
            
          });
        
      });
    
      describe("criteria.ancienneté = 48| 5 ans ou plus", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "48| 5 ans ou plus" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
          it("should display expected answer", () => {
            
              expect(screen.queryAllByText("6 mois")[0]).toBeInTheDocument();
            
          });
        
      });
    
        
      });
    
        
      });
    
          
        });
      