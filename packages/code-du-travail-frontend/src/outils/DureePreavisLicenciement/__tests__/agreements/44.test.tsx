
        import { DureePreavisLicenciement } from "../../index";
        import { ui } from "../ui";
        import { fireEvent, render, screen } from "@testing-library/react";
        
        jest.spyOn(Storage.prototype, "setItem");
        Storage.prototype.getItem = jest.fn(
          () => `
        {
          "num": 44,
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
          
      describe("criteria.catégorie professionnelle = 23| Agents de maîtrise", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.catégorie professionnelle"), {
          target: { value: "23| Agents de maîtrise" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
      describe("criteria.groupe = 6| IV", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.groupe"), {
          target: { value: "6| IV" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
      describe("criteria.coefficient = 11| Inférieur à 275", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.coefficient"), {
          target: { value: "11| Inférieur à 275" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
          it("should display expected answer", () => {
            
              expect(screen.queryAllByText("2 mois")[0]).toBeInTheDocument();
            
          });
        
      });
    
      describe("criteria.coefficient = 14| Supérieur à 275 (inclus)", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.coefficient"), {
          target: { value: "14| Supérieur à 275 (inclus)" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
          it("should display expected answer", () => {
            
              expect(screen.queryAllByText("3 mois")[0]).toBeInTheDocument();
            
          });
        
      });
    
        
      });
    
        
      });
    
      describe("criteria.catégorie professionnelle = 16| Employés", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.catégorie professionnelle"), {
          target: { value: "16| Employés" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
      describe("criteria.groupe = 1| I", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.groupe"), {
          target: { value: "1| I" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
      describe("criteria.coefficient = 7| Inférieur à 190", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.coefficient"), {
          target: { value: "7| Inférieur à 190" },
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
            
              expect(screen.queryAllByText("1 mois")[0]).toBeInTheDocument();
            
          });
        
      });
    
      describe("criteria.ancienneté = 42| 2 ans ou plus", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "42| 2 ans ou plus" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
          it("should display expected answer", () => {
            
              expect(screen.queryAllByText("2 mois")[0]).toBeInTheDocument();
            
          });
        
      });
    
        
      });
    
      describe("criteria.coefficient = 8| 190 et plus", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.coefficient"), {
          target: { value: "8| 190 et plus" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
          it("should display expected answer", () => {
            
              expect(screen.queryAllByText("2 mois")[0]).toBeInTheDocument();
            
          });
        
      });
    
        
      });
    
      describe("criteria.groupe = 4| II", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.groupe"), {
          target: { value: "4| II" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
      describe("criteria.coefficient = 7| Inférieur à 190", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.coefficient"), {
          target: { value: "7| Inférieur à 190" },
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
            
              expect(screen.queryAllByText("1 mois")[0]).toBeInTheDocument();
            
          });
        
      });
    
      describe("criteria.ancienneté = 42| 2 ans ou plus", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "42| 2 ans ou plus" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
          it("should display expected answer", () => {
            
              expect(screen.queryAllByText("2 mois")[0]).toBeInTheDocument();
            
          });
        
      });
    
        
      });
    
      describe("criteria.coefficient = 8| 190 et plus", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.coefficient"), {
          target: { value: "8| 190 et plus" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
          it("should display expected answer", () => {
            
              expect(screen.queryAllByText("2 mois")[0]).toBeInTheDocument();
            
          });
        
      });
    
        
      });
    
      describe("criteria.groupe = 5| III", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.groupe"), {
          target: { value: "5| III" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
      describe("criteria.coefficient = 7| Inférieur à 190", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.coefficient"), {
          target: { value: "7| Inférieur à 190" },
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
            
              expect(screen.queryAllByText("1 mois")[0]).toBeInTheDocument();
            
          });
        
      });
    
      describe("criteria.ancienneté = 42| 2 ans ou plus", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "42| 2 ans ou plus" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
          it("should display expected answer", () => {
            
              expect(screen.queryAllByText("2 mois")[0]).toBeInTheDocument();
            
          });
        
      });
    
        
      });
    
      describe("criteria.coefficient = 8| 190 et plus", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.coefficient"), {
          target: { value: "8| 190 et plus" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
          it("should display expected answer", () => {
            
              expect(screen.queryAllByText("2 mois")[0]).toBeInTheDocument();
            
          });
        
      });
    
        
      });
    
        
      });
    
      describe("criteria.catégorie professionnelle = 60| Ingénieurs, Cadres", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.catégorie professionnelle"), {
          target: { value: "60| Ingénieurs, Cadres" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
      describe("criteria.groupe = 9| V", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.groupe"), {
          target: { value: "9| V" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
          it("should display expected answer", () => {
            
              expect(screen.queryAllByText("3 mois")[0]).toBeInTheDocument();
            
          });
        
      });
    
        
      });
    
      describe("criteria.catégorie professionnelle = 4| Ouvriers", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.catégorie professionnelle"), {
          target: { value: "4| Ouvriers" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
      describe("criteria.groupe = 1| I", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.groupe"), {
          target: { value: "1| I" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
      describe("criteria.coefficient = 7| Inférieur à 190", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.coefficient"), {
          target: { value: "7| Inférieur à 190" },
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
            
              expect(screen.queryAllByText("1 mois")[0]).toBeInTheDocument();
            
          });
        
      });
    
      describe("criteria.ancienneté = 42| 2 ans ou plus", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "42| 2 ans ou plus" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
          it("should display expected answer", () => {
            
              expect(screen.queryAllByText("2 mois")[0]).toBeInTheDocument();
            
          });
        
      });
    
        
      });
    
      describe("criteria.coefficient = 8| 190 et plus", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.coefficient"), {
          target: { value: "8| 190 et plus" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
          it("should display expected answer", () => {
            
              expect(screen.queryAllByText("2 mois")[0]).toBeInTheDocument();
            
          });
        
      });
    
        
      });
    
      describe("criteria.groupe = 4| II", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.groupe"), {
          target: { value: "4| II" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
      describe("criteria.coefficient = 7| Inférieur à 190", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.coefficient"), {
          target: { value: "7| Inférieur à 190" },
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
            
              expect(screen.queryAllByText("1 mois")[0]).toBeInTheDocument();
            
          });
        
      });
    
      describe("criteria.ancienneté = 42| 2 ans ou plus", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "42| 2 ans ou plus" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
          it("should display expected answer", () => {
            
              expect(screen.queryAllByText("2 mois")[0]).toBeInTheDocument();
            
          });
        
      });
    
        
      });
    
      describe("criteria.coefficient = 8| 190 et plus", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.coefficient"), {
          target: { value: "8| 190 et plus" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
          it("should display expected answer", () => {
            
              expect(screen.queryAllByText("2 mois")[0]).toBeInTheDocument();
            
          });
        
      });
    
        
      });
    
      describe("criteria.groupe = 5| III", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.groupe"), {
          target: { value: "5| III" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
      describe("criteria.coefficient = 7| Inférieur à 190", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.coefficient"), {
          target: { value: "7| Inférieur à 190" },
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
            
              expect(screen.queryAllByText("1 mois")[0]).toBeInTheDocument();
            
          });
        
      });
    
      describe("criteria.ancienneté = 42| 2 ans ou plus", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "42| 2 ans ou plus" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
          it("should display expected answer", () => {
            
              expect(screen.queryAllByText("2 mois")[0]).toBeInTheDocument();
            
          });
        
      });
    
        
      });
    
      describe("criteria.coefficient = 8| 190 et plus", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.coefficient"), {
          target: { value: "8| 190 et plus" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
          it("should display expected answer", () => {
            
              expect(screen.queryAllByText("2 mois")[0]).toBeInTheDocument();
            
          });
        
      });
    
        
      });
    
        
      });
    
      describe("criteria.catégorie professionnelle = 28| Techniciens", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.catégorie professionnelle"), {
          target: { value: "28| Techniciens" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
      describe("criteria.groupe = 1| I", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.groupe"), {
          target: { value: "1| I" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
      describe("criteria.coefficient = 7| Inférieur à 190", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.coefficient"), {
          target: { value: "7| Inférieur à 190" },
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
            
              expect(screen.queryAllByText("1 mois")[0]).toBeInTheDocument();
            
          });
        
      });
    
      describe("criteria.ancienneté = 42| 2 ans ou plus", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "42| 2 ans ou plus" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
          it("should display expected answer", () => {
            
              expect(screen.queryAllByText("2 mois")[0]).toBeInTheDocument();
            
          });
        
      });
    
        
      });
    
      describe("criteria.coefficient = 8| 190 et plus", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.coefficient"), {
          target: { value: "8| 190 et plus" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
          it("should display expected answer", () => {
            
              expect(screen.queryAllByText("2 mois")[0]).toBeInTheDocument();
            
          });
        
      });
    
        
      });
    
      describe("criteria.groupe = 4| II", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.groupe"), {
          target: { value: "4| II" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
      describe("criteria.coefficient = 7| Inférieur à 190", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.coefficient"), {
          target: { value: "7| Inférieur à 190" },
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
            
              expect(screen.queryAllByText("1 mois")[0]).toBeInTheDocument();
            
          });
        
      });
    
      describe("criteria.ancienneté = 42| 2 ans ou plus", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "42| 2 ans ou plus" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
          it("should display expected answer", () => {
            
              expect(screen.queryAllByText("2 mois")[0]).toBeInTheDocument();
            
          });
        
      });
    
        
      });
    
      describe("criteria.coefficient = 8| 190 et plus", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.coefficient"), {
          target: { value: "8| 190 et plus" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
          it("should display expected answer", () => {
            
              expect(screen.queryAllByText("2 mois")[0]).toBeInTheDocument();
            
          });
        
      });
    
        
      });
    
      describe("criteria.groupe = 5| III", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.groupe"), {
          target: { value: "5| III" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
      describe("criteria.coefficient = 7| Inférieur à 190", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.coefficient"), {
          target: { value: "7| Inférieur à 190" },
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
            
              expect(screen.queryAllByText("1 mois")[0]).toBeInTheDocument();
            
          });
        
      });
    
      describe("criteria.ancienneté = 42| 2 ans ou plus", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "42| 2 ans ou plus" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
          it("should display expected answer", () => {
            
              expect(screen.queryAllByText("2 mois")[0]).toBeInTheDocument();
            
          });
        
      });
    
        
      });
    
      describe("criteria.coefficient = 8| 190 et plus", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.coefficient"), {
          target: { value: "8| 190 et plus" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
          it("should display expected answer", () => {
            
              expect(screen.queryAllByText("2 mois")[0]).toBeInTheDocument();
            
          });
        
      });
    
        
      });
    
      describe("criteria.groupe = 6| IV", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.groupe"), {
          target: { value: "6| IV" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
      describe("criteria.coefficient = 11| Inférieur à 275", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.coefficient"), {
          target: { value: "11| Inférieur à 275" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
          it("should display expected answer", () => {
            
              expect(screen.queryAllByText("2 mois")[0]).toBeInTheDocument();
            
          });
        
      });
    
      describe("criteria.coefficient = 14| Supérieur à 275 (inclus)", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.coefficient"), {
          target: { value: "14| Supérieur à 275 (inclus)" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
          it("should display expected answer", () => {
            
              expect(screen.queryAllByText("3 mois")[0]).toBeInTheDocument();
            
          });
        
      });
    
        
      });
    
        
      });
    
          
        });
      