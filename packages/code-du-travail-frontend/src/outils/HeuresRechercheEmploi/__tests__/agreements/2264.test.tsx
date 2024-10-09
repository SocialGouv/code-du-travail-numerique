
        import { HeuresRechercheEmploi } from "../../index";
        import { ui } from "../ui";
        import { fireEvent, render, screen } from "@testing-library/react";
        
        jest.spyOn(Storage.prototype, "setItem");
        Storage.prototype.getItem = jest.fn(
          () => `
        {
          "num": 2264,
          "shortTitle": "shortTitle",
          "id": "id",
          "title": "title",
          "url": "https://www.url.fr",
          "slug": "2264"
        }
        `
        );
    
        describe("HeuresRechercheEmploi", () => {
          beforeEach(() => {
            render(<HeuresRechercheEmploi icon={""} title={""} displayTitle={""} />);
                fireEvent.click(ui.introduction.startButton.get());
                
    
        fireEvent.click(ui.next.get());
      
    
          });
          
      describe("typeRupture = 7| Rupture de la période d'essai", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("typeRupture"), {
          target: { value: "7| Rupture de la période d'essai" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
      describe("criteria.initiative de la rupture de la période d'essai = 1| L'employeur", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.initiative de la rupture de la période d'essai"), {
          target: { value: "1| L'employeur" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
      describe("criteria.ancienneté = 9| 3 mois ou moins", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "9| 3 mois ou moins" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/D’après les éléments saisis, dans votre situation, la convention collective ne prévoit pas d’heures d’absence autorisée pour rechercher un emploi./g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Article 43.2/)[0]).toBeInTheDocument();
          
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
      expect(screen.queryAllByText(/2 jours, si le préavis \(aussi appelé délai de prévenance\) est executé/g)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Le salaire est maintenu./g)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Chaque jour d'absence correspond à la durée habituelle de travail du salarié./g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Article 43.2/)[0]).toBeInTheDocument();
          
    });
  
      });
    
        
      });
    
      describe("criteria.initiative de la rupture de la période d'essai = 2| Le salarié", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.initiative de la rupture de la période d'essai"), {
          target: { value: "2| Le salarié" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/D’après les éléments saisis, dans votre situation, la convention collective ne prévoit pas d’heures d’absence autorisée pour rechercher un emploi./g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Article 43.2/)[0]).toBeInTheDocument();
          
    });
  
      });
    
        
      });
    
      describe("typeRupture = 1| Démission", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("typeRupture"), {
          target: { value: "1| Démission" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/D’après les éléments saisis, dans votre situation, la convention collective ne prévoit pas d’heures d’absence autorisée pour rechercher un emploi./g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Article 46/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("typeRupture = 3| Licenciement", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("typeRupture"), {
          target: { value: "3| Licenciement" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
      describe("criteria.durée du travail = 1| Temps complet", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.durée du travail"), {
          target: { value: "1| Temps complet" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/un nombre d'heures égal, par mois de préavis, à la durée hebdomadaire de travail dans l'entreprise/g)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Le salaire est maintenu./g)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Ces heures pourront être prises par demi-journée ou journée entière, dans les conditions fixées d'un commun accord par l'employeur et le salarié./g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Article 46/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.durée du travail = 2| Temps partiel", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.durée du travail"), {
          target: { value: "2| Temps partiel" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/un nombre d'heures égal, par mois de préavis, à la durée hebdomadaire de travail prévue par le contrat de travail/g)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Le salaire est maintenu./g)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Ces heures pourront être prises par demi-journée ou journée entière, dans les conditions fixées d'un commun accord par l'employeur et le salarié./g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Article 46/)[0]).toBeInTheDocument();
          
    });
  
      });
    
        
      });
    
          
        });
      