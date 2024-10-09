
        import { HeuresRechercheEmploi } from "../../index";
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
    
        describe("HeuresRechercheEmploi", () => {
          beforeEach(() => {
            render(<HeuresRechercheEmploi icon={""} title={""} displayTitle={""} />);
                fireEvent.click(ui.introduction.startButton.get());
                
    
        fireEvent.click(ui.next.get());
      
    
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
          
        expect(screen.queryAllByText(/Chapitre VI, Article 1/)[0]).toBeInTheDocument();
          
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
      expect(screen.queryAllByText(/2 heures par jour. Pour le salarié à temps partiel, la durée de l’absence est calculée proportionnellement au temps de travail/g)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Le salaire est maintenu./g)[0]).toBeInTheDocument();
          expect(screen.queryAllByText(/Les heures d'absence sont fixées d'un commun accord entre l'employeur et le salarié. Ils peuvent décider, par écrit, de les grouper en une ou plusieurs fois. En l'absence d'accord, elles sont fixées un jour par l'employeur et le suivant par le salarié./g)[0]).toBeInTheDocument();
          
        expect(screen.queryAllByText(/Chapitre VI, Article 1/)[0]).toBeInTheDocument();
          
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
          
        expect(screen.queryAllByText(/Chapitre V, Article 3/)[0]).toBeInTheDocument();
          
    });
  
      });
    
          
        });
      