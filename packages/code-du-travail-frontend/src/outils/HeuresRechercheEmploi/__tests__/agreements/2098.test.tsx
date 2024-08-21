
        import { HeuresRechercheEmploi } from "../../index";
        import { ui } from "../ui";
        import { fireEvent, render, screen } from "@testing-library/react";
        
        jest.spyOn(Storage.prototype, "setItem");
        Storage.prototype.getItem = jest.fn(
          () => `
        {
          "num": 2098,
          "shortTitle": "Transports routiers et activités auxiliaires du transport",
          "id": "KALICONT000005635624",
          "title": "Transports routiers et activités auxiliaires du transport",
          "url": "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635624",
          "slug": "16-transports-routiers-et-activites-auxiliaires-du-transport"
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
        
      describe("criteria.catégorie professionnelle = 48| Cadres", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.catégorie professionnelle"), {
          target: { value: "48| Cadres" },
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
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/2 heures maximum par jour/)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Le salaire est maintenu./)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Les absences sont fixées un jour par le salarié, un jour par l'employeur. Ces heures d'absences peuvent également être groupées sur demande du salarié, avec l'accord de l'employeur./)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Article 2.2/)[0]).toBeInTheDocument();
          
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
      expect(screen.queryAllByText(/2 heures maximum par jour/)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Le salaire n'est pas maintenu./)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Les absences sont fixées un jour par le salarié, un jour par l'employeur. Ces heures d'absences peuvent également être groupées sur demande du salarié, avec l'accord de l'employeur./)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Article 2.2/)[0]).toBeInTheDocument();
          
    });
  
      });
    
        
      });
    
      describe("criteria.catégorie professionnelle = 38| Non-cadres", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.catégorie professionnelle"), {
          target: { value: "38| Non-cadres" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/D’après les éléments saisis, dans votre situation, la convention collective ne prévoit pas d’heures d’absence autorisée pour rechercher un emploi./)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Article 13.2/)[0]).toBeInTheDocument();
          
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
      expect(screen.queryAllByText(/2 heures maximum par jour/)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Le salaire n'est pas maintenu./)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Les absences sont fixées un jour par le salarié, un jour par l'employeur. Ces heures d'absences peuvent également être groupées sur demande du salarié, avec l'accord de l'employeur./)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Article 19/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("typeRupture = 3| Licenciement", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("typeRupture"), {
          target: { value: "3| Licenciement" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/2 heures maximum par jour/)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Le salaire est maintenu./)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Les absences sont fixées un jour par le salarié, un jour par l'employeur. Ces heures d'absences peuvent également être groupées sur demande du salarié, avec l'accord de l'employeur. Les heures non utilisées ne sont pas rémunérées./)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Article 19/)[0]).toBeInTheDocument();
          
    });
  
      });
    
          
        });
      