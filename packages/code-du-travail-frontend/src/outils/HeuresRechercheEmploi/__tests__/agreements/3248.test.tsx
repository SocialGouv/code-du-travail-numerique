
        import { HeuresRechercheEmploi } from "../../index";
        import { ui } from "../ui";
        import { fireEvent, render, screen } from "@testing-library/react";
        
        jest.spyOn(Storage.prototype, "setItem");
        Storage.prototype.getItem = jest.fn(
          () => `
        {
          "num": 3248,
          "shortTitle": "shortTitle",
          "id": "id",
          "title": "title",
          "url": "https://www.url.fr",
          "slug": "3248"
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
        
      describe("criteria.forfait jour = 1| Oui", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.forfait jour"), {
          target: { value: "1| Oui" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
      describe("criteria.ancienneté = 48| moins d’un mois", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "48| moins d’un mois" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/D’après les éléments saisis, dans votre situation, la convention collective ne prévoit pas d’heures d’absence autorisée pour rechercher un emploi./g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Article 70.5.3.2/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.ancienneté = 49| un mois ou plus", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "49| un mois ou plus" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/1 jour pour 2 semaines de travail/g)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Le salaire est maintenu./g)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Cette journée est convenue entre l'employeur et le salarié. En l'absence d'accord, elle est fixée une fois par l’employeur et une fois par le salarié. Si la durée du délai de prévenance est égale à 2 semaines, la journée est fixée par l'employeur. Les absences cessent d'être autorisées, dès que le salarié a retrouvé un emploi./g)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Si la lettre de rupture de la période d'essai a été présentée avant le 01\/01\/2024, le résultat peut ne pas correspondre au résultat donné. En effet, jusqu’au 31\/12\/2023, ce sont les conventions locales de la métallurgie ainsi que la convention spécifique aux ingénieurs et cadres de la métallurgie qui s’appliquaient. Toutes ces conventions ont disparu au profit d’une nouvelle convention collective nationale applicable depuis le 01\/01\/2024./g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Article 70.5.3.2/)[0]).toBeInTheDocument();
          
    });
  
      });
    
        
      });
    
      describe("criteria.forfait jour = 2| Non", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.forfait jour"), {
          target: { value: "2| Non" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
      describe("criteria.ancienneté = 48| moins d’un mois", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "48| moins d’un mois" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/D’après les éléments saisis, dans votre situation, la convention collective ne prévoit pas d’heures d’absence autorisée pour rechercher un emploi./g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Article 70.5.3.1/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.ancienneté = 49| un mois ou plus", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
          target: { value: "49| un mois ou plus" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/2h30 par jour travaillé/g)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Le salaire est maintenu./g)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/L’utilisation de ces heures, y compris leur regroupement éventuel, est convenue entre l'employeur et le salarié. En l'absence d'accord, elles sont fixées un jour par l'employeur et un jour par le salarié. Les absences cessent d'être autorisées, dès que le salarié a retrouvé un emploi./g)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Si la lettre de rupture de la période d'essai a été présentée avant le 01\/01\/2024, le résultat peut ne pas correspondre au résultat donné. En effet, jusqu’au 31\/12\/2023, ce sont les conventions locales de la métallurgie ainsi que la convention spécifique aux ingénieurs et cadres de la métallurgie qui s’appliquaient. Toutes ces conventions ont disparu au profit d’une nouvelle convention collective nationale applicable depuis le 01\/01\/2024./g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Article 70.5.3.1/)[0]).toBeInTheDocument();
          
    });
  
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
          
        expect(screen.queryAllByText(/Article 70.5.3.1/)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Article 70.5.3.2/)[0]).toBeInTheDocument();
          
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
          
        expect(screen.queryAllByText(/Article 74.2.2/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("typeRupture = 3| Licenciement", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("typeRupture"), {
          target: { value: "3| Licenciement" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
      describe("criteria.forfait jour = 2| Non", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.forfait jour"), {
          target: { value: "2| Non" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/2h30 maximum par jour travaillé \(dans la limite de 50 heures par mois de préavis\)/g)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Le salaire est maintenu./g)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/L'employeur et le salarié s’entendent sur les modalités de prise de ces heures \(y compris sur leur regroupement éventuel\). À défaut d'accord entre les parties, les heures sont fixées alternativement un jour par l'employeur et un jour par le salarié. Elles peuvent être regroupées si le salarié occupe un poste qui présente des contraintes d’organisation particulières. Les absences cessent d'être autorisées, dès que le salarié a retrouvé un emploi./g)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Si la lettre de licenciement a été présentée avant le 01\/01\/2024, le résultat peut ne pas correspondre au résultat donné. En effet, jusqu’au 31\/12\/2023, ce sont les conventions locales de la métallurgie ainsi que la convention spécifique aux ingénieurs et cadres de la métallurgie qui s’appliquaient. Toutes ces conventions ont disparu au profit d’une nouvelle convention collective nationale applicable depuis le 01\/01\/2024./g)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Pour le salarié à temps partiel, le volume de 50 heures est réduit proportionnellement à son temps de travail/g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Article 75.2.3.1/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.forfait jour = 1| Oui", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.forfait jour"), {
          target: { value: "1| Oui" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/1 jour pour 2 semaines de travail/g)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Le salaire est maintenu./g)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Cette journée est convenue entre l'employeur et le salarié. En l'absence d'accord, elle est fixée une fois par l’employeur et une fois par le salarié. Les absences cessent d'être autorisées, dès que le salarié a retrouvé un emploi./g)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Si la lettre de licenciement a été présentée avant le 01\/01\/2024, le résultat peut ne pas correspondre au résultat donné. En effet, jusqu’au 31\/12\/2023, ce sont les conventions locales de la métallurgie ainsi que la convention spécifique aux ingénieurs et cadres de la métallurgie qui s’appliquaient. Toutes ces conventions ont disparu au profit d’une nouvelle convention collective nationale applicable depuis le 01\/01\/2024./g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Article 75.2.3.2/)[0]).toBeInTheDocument();
          
    });
  
      });
    
        
      });
    
          
        });
      