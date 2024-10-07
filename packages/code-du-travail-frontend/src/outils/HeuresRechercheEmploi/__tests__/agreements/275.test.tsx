
        import { HeuresRechercheEmploi } from "../../index";
        import { ui } from "../ui";
        import { fireEvent, render, screen } from "@testing-library/react";
        
        jest.spyOn(Storage.prototype, "setItem");
        Storage.prototype.getItem = jest.fn(
          () => `
        {
          "num": 275,
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
          
      describe("typeRupture = 3| Licenciement", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("typeRupture"), {
          target: { value: "3| Licenciement" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
      describe("criteria.catégorie professionnelle = 23| Agents de maîtrise", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.catégorie professionnelle"), {
          target: { value: "23| Agents de maîtrise" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/2 heures par jour, dans la limite de 50 heures au total/g)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Le salaire est maintenu./g)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Les heures sont fixées d'un commun accord par l'employeur et le salarié. Si ses recherches le nécessitent, le salarié peut, en accord avec son employeur, bloquer tout ou partie de ces heures. En l'absence d'accord, les jours et heures où l'absence a lieu sont fixées à tour de rôle par l'employeur et le salarié./g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Annexe 2 Article 11/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.catégorie professionnelle = 28| Techniciens", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.catégorie professionnelle"), {
          target: { value: "28| Techniciens" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/2 heures par jour, dans la limite de 50 heures au total/g)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Le salaire est maintenu./g)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Les heures sont fixées d'un commun accord par l'employeur et le salarié. Si ses recherches le nécessitent, le salarié peut, en accord avec son employeur, bloquer tout ou partie de ces heures. En l'absence d'accord, les jours et heures où l'absence a lieu sont fixées à tour de rôle par l'employeur et le salarié./g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Annexe 2 Article 11/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.catégorie professionnelle = 48| Cadres", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.catégorie professionnelle"), {
          target: { value: "48| Cadres" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/50 heures par mois/g)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Le salaire est maintenu./g)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Les heures d'absences peuvent être prises en une ou plusieurs fois en accord avec l'employeur./g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Annexe 1, Article 10/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.catégorie professionnelle = 16| Employés", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.catégorie professionnelle"), {
          target: { value: "16| Employés" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/2 heures par jour, dans la limite de 50 heures au total/g)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Le salaire est maintenu./g)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Les heures sont fixées d'un commun accord par l'employeur et le salarié. Si ses recherches le nécessitent, le salarié peut, en accord avec son employeur, bloquer tout ou partie de ces heures. En l'absence d'accord, les jours et heures où l'absence a lieu sont fixées à tour de rôle par l'employeur et le salarié./g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Annexe 3, Article 15/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.catégorie professionnelle = 4| Ouvriers", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.catégorie professionnelle"), {
          target: { value: "4| Ouvriers" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/2 heures par jour, dans la limite de 50 heures au total/g)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Le salaire est maintenu./g)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Les heures sont fixées d'un commun accord par l'employeur et le salarié. Si ses recherches le nécessitent, le salarié peut, en accord avec son employeur, bloquer tout ou partie de ces heures. En l'absence d'accord, les jours et heures où l'absence a lieu sont fixées à tour de rôle par l'employeur et le salarié./g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Annexe 3, Article 15/)[0]).toBeInTheDocument();
          
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
        
      describe("criteria.catégorie professionnelle = 23| Agents de maîtrise", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.catégorie professionnelle"), {
          target: { value: "23| Agents de maîtrise" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/2 heures par jour, dans la limite de 50 heures au total/g)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Le salaire est maintenu./g)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Les heures sont fixées d'un commun accord par l'employeur et le salarié. Si ses recherches le nécessitent, le salarié peut, en accord avec son employeur, bloquer tout ou partie de ces heures. En l'absence d'accord, les jours et heures où l'absence a lieu sont fixées à tour de rôle par l'employeur et le salarié./g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Annexe 2 Article 11/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.catégorie professionnelle = 28| Techniciens", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.catégorie professionnelle"), {
          target: { value: "28| Techniciens" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/2 heures par jour, dans la limite de 50 heures au total/g)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Le salaire est maintenu./g)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Les heures sont fixées d'un commun accord par l'employeur et le salarié. Si ses recherches le nécessitent, le salarié peut, en accord avec son employeur, bloquer tout ou partie de ces heures. En l'absence d'accord, les jours et heures où l'absence a lieu sont fixées à tour de rôle par l'employeur et le salarié./g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Annexe 2 Article 11/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.catégorie professionnelle = 48| Cadres", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.catégorie professionnelle"), {
          target: { value: "48| Cadres" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/50 heures par mois/g)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Le salaire est maintenu./g)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Les heures d'absences peuvent être prises en une ou plusieurs fois en accord avec l'employeur./g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Annexe 1, Article 10/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.catégorie professionnelle = 4| Ouvriers", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.catégorie professionnelle"), {
          target: { value: "4| Ouvriers" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/2 heures par jour, dans la limite de 50 heures au total/g)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Le salaire est maintenu./g)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Les heures sont fixées d'un commun accord par l'employeur et le salarié. Si ses recherches le nécessitent, le salarié peut, en accord avec son employeur, bloquer tout ou partie de ces heures. En l'absence d'accord, les jours et heures où l'absence a lieu sont fixées à tour de rôle par l'employeur et le salarié./g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Annexe 3, Article 15/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.catégorie professionnelle = 16| Employés", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.catégorie professionnelle"), {
          target: { value: "16| Employés" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/2 heures par jour, dans la limite de 50 heures au total/g)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Le salaire est maintenu./g)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Les heures sont fixées d'un commun accord par l'employeur et le salarié. Si ses recherches le nécessitent, le salarié peut, en accord avec son employeur, bloquer tout ou partie de ces heures. En l'absence d'accord, les jours et heures où l'absence a lieu sont fixées à tour de rôle par l'employeur et le salarié./g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Annexe 3, Article 15/)[0]).toBeInTheDocument();
          
    });
  
      });
    
        
      });
    
      describe("typeRupture = 7| Rupture de la période d'essai", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("typeRupture"), {
          target: { value: "7| Rupture de la période d'essai" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/D’après les éléments saisis, dans votre situation, la convention collective ne prévoit pas d’heures d’absence autorisée pour rechercher un emploi./g)[0]).toBeInTheDocument();
          
        
    });
  
      });
    
          
        });
      