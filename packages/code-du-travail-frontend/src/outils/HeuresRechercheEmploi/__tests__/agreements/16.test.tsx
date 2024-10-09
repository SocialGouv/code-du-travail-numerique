
        import { HeuresRechercheEmploi } from "../../index";
        import { ui } from "../ui";
        import { fireEvent, render, screen } from "@testing-library/react";
        
        jest.spyOn(Storage.prototype, "setItem");
        Storage.prototype.getItem = jest.fn(
          () => `
        {
          "num": 16,
          "shortTitle": "shortTitle",
          "id": "id",
          "title": "title",
          "url": "https://www.url.fr",
          "slug": "16"
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
        
      describe("criteria.catégorie professionnelle = 16| Employés", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.catégorie professionnelle"), {
          target: { value: "16| Employés" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/2 heures par jour dans la limite d'un mois/g)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Le salaire est maintenu./g)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Les heures sont fixées d'un commun accord par l'employeur et le salarié. Ils peuvent décider de bloquer ces heures avant la fin du préavis. En l'absence d'accord, elles sont fixées un jour par l'employeur et le suivant par le salarié./g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Accord du 27 février 1951 relatif aux employés Annexe II, Article13/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.catégorie professionnelle = 60| Ingénieurs, Cadres", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.catégorie professionnelle"), {
          target: { value: "60| Ingénieurs, Cadres" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/2 heures par jour dans la limite de 2 mois/g)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Le salaire est maintenu./g)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Les heures sont fixées d'un commun accord par l'employeur et le salarié. Ils peuvent décider de bloquer ces heures avant la fin du préavis. En l'absence d'accord, elles sont fixées un jour par l'employeur et le suivant par le salarié./g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Accord du 30 octobre 1951 relatif aux ingénieurs et cadres - Annexe IV article 15/)[0]).toBeInTheDocument();
          
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
      expect(screen.queryAllByText(/2 heures par jour/g)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Le salaire est maintenu sur la base du salaire effectif du salarié et jusqu'à 12 heures d'absence au maximum./g)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Les heures sont fixées d'un commun accord par l'employeur et le salarié. Ils peuvent décider de bloquer ces heures avant la fin du préavis. En l'absence d'accord, elles sont fixées un jour par l'employeur et le suivant par le salarié./g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Accord du 16 juin 1961 relatifs aux ouvriers - annexe I, article 5/)[0]).toBeInTheDocument();
          
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
      expect(screen.queryAllByText(/2 heures par jour dans la limite d'un mois/g)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Le salaire est maintenu./g)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Les heures sont fixées d'un commun accord par l'employeur et le salarié. Ils peuvent décider de bloquer ces heures avant la fin du préavis. En l'absence d'accord, elles sont fixées un jour par l'employeur et le suivant par le salarié./g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Accord du 30 mars 1951 relatif aux techniciens et agents de maîtrise Annexe IIII, article 17/)[0]).toBeInTheDocument();
          
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
      expect(screen.queryAllByText(/2 heures par jour dans la limite de 2 mois/g)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Le salaire est maintenu./g)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Les heures sont fixées d'un commun accord par l'employeur et le salarié. Ils peuvent décider de bloquer ces heures avant la fin du préavis. En l'absence d'accord, elles sont fixées un jour par l'employeur et le suivant par le salarié./g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Accord du 30 mars 1951 relatif aux techniciens et agents de maîtrise Annexe IIII, article 17/)[0]).toBeInTheDocument();
          
    });
  
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
        
      describe("criteria.catégorie professionnelle = 16| Employés", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.catégorie professionnelle"), {
          target: { value: "16| Employés" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/2 heures par jour dans la limite d'un mois/g)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Le salaire est maintenu./g)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Les heures sont fixées d'un commun accord par l'employeur et le salarié. Ils peuvent décider de bloquer ces heures avant la fin du préavis. En l'absence d'accord, elles sont fixées un jour par l'employeur et le suivant par le salarié./g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Accord du 27 février 1951 relatif aux employés Annexe II, Article13/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.catégorie professionnelle = 60| Ingénieurs, Cadres", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.catégorie professionnelle"), {
          target: { value: "60| Ingénieurs, Cadres" },
        });
        fireEvent.click(ui.next.get());
      
        });
        
        
    it("should display expected answer", () => {
      expect(screen.queryAllByText(/2 heures par jour dans la limite de 2 mois/g)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Le salaire est maintenu./g)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Les heures sont fixées d'un commun accord par l'employeur et le salarié. Ils peuvent décider de bloquer ces heures avant la fin du préavis. En l'absence d'accord, elles sont fixées un jour par l'employeur et le suivant par le salarié./g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Accord du 30 octobre 1951 relatif aux ingénieurs et cadres - Annexe IV article 15/)[0]).toBeInTheDocument();
          
    });
  
      });
    
      describe("criteria.catégorie professionnelle = 4| Ouvriers", () => {
        
        beforeEach(() => {
          
        fireEvent.change(screen.getByTestId("criteria.catégorie professionnelle"), {
          target: { value: "4| Ouvriers" },
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
      expect(screen.queryAllByText(/12 heures/g)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Le salaire est maintenu sur la base du salaire effectif du salarié./g)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Ces heures sont fixées d'un commun accord par l'employeur et le salarié. En l'absence d'accord, 6 heures sont fixées par l’employeur et 6 heures par le salarié./g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Accord du 16 juin 1961 relatifs aux ouvriers - annexe I, article 5/)[0]).toBeInTheDocument();
          
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
      expect(screen.queryAllByText(/2 heures par jour/g)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Le salaire est maintenu sur la base du salaire effectif du salarié et jusqu'à 12 heures d'absence au maximum./g)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Les heures sont fixées d'un commun accord par l'employeur et le salarié. Ils peuvent décider de bloquer ces heures avant la fin du préavis. En l'absence d'accord, elles sont fixées un jour par l'employeur et le suivant par le salarié./g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Accord du 16 juin 1961 relatifs aux ouvriers - annexe I, article 5/)[0]).toBeInTheDocument();
          
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
      expect(screen.queryAllByText(/2 heures par jour dans la limite d'un mois/g)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Le salaire est maintenu./g)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Les heures sont fixées d'un commun accord par l'employeur et le salarié. Ils peuvent décider de bloquer ces heures avant la fin du préavis. En l'absence d'accord, elles sont fixées un jour par l'employeur et le suivant par le salarié./g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Accord du 30 mars 1951 relatif aux techniciens et agents de maîtrise Annexe IIII, article 17/)[0]).toBeInTheDocument();
          
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
      expect(screen.queryAllByText(/2 heures par jour dans la limite de 2 mois/g)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Le salaire est maintenu./g)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Les heures sont fixées d'un commun accord par l'employeur et le salarié. Ils peuvent décider de bloquer ces heures avant la fin du préavis. En l'absence d'accord, elles sont fixées un jour par l'employeur et le suivant par le salarié./g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Accord du 30 mars 1951 relatif aux techniciens et agents de maîtrise Annexe IIII, article 17/)[0]).toBeInTheDocument();
          
    });
  
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
          
        expect(screen.queryAllByText(/Accord du 30 octobre 1951 relatif aux ingénieurs et cadres - Annexe IV article 15/)[0]).toBeInTheDocument();
          
    });
  
      });
    
          
        });
      