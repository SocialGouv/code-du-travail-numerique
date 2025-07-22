import { CalculateurPreavisLicenciement } from "../../index";
import { ui } from "../ui";
import { fireEvent, render, screen } from "@testing-library/react";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
        {
          "num": 44,
          "shortTitle": "shortTitle",
          "id": "id",
          "title": "title",
          "url": "https://www.url.fr",
          "slug": "44"
        }
        `
);

describe("CalculateurPreavisLicenciement", () => {
  beforeEach(() => {
    render(
      <CalculateurPreavisLicenciement title="Test Préavis de Licenciement" />
    );
    fireEvent.click(ui.introduction.startButton.get());

    // Étape 1 : Situation du salarié - Compléter toutes les questions
    fireEvent.click(ui.situation.fauteGraveNon.get());
    fireEvent.click(ui.situation.handicapNon.get());
    fireEvent.change(ui.situation.seniority.get(), {
      target: { value: "'Moins de 6 mois'" },
    });
    fireEvent.click(ui.next.get());

    // Étape 2 : Convention collective (déjà sélectionnée par défaut)
    fireEvent.click(ui.next.get());
  });

  describe("criteria.catégorie professionnelle = 23| Agents de maîtrise", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos.contrat salarié - convention collective - industries chimiques - catégorie professionnelle"
        ),
        {
          target: { value: "'Agents de maîtrise'" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    describe("criteria.groupe = 6| IV", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos.contrat salarié - convention collective - industries chimiques - catégorie professionnelle Agents de maîtrise - groupe"
          ),
          {
            target: { value: "'IV'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      describe("criteria.coefficient = 11| Inférieur à 275", () => {
        beforeEach(() => {
          fireEvent.change(
            screen.getByTestId(
              "infos.contrat salarié - convention collective - industries chimiques - catégorie professionnelle Agents de maîtrise - groupe IV - coefficient"
            ),
            {
              target: { value: "'Inférieur à 275'" },
            }
          );
          fireEvent.click(ui.next.get());
        });

        it("should display expected answer", () => {
          expect(screen.queryAllByText(/2 mois/g)[0]).toBeInTheDocument();

          expect(
            screen.queryAllByText(/Avenant 2, article 20/)[0]
          ).toBeInTheDocument();
        });
      });

      describe("criteria.coefficient = 14| Supérieur à 275 (inclus)", () => {
        beforeEach(() => {
          fireEvent.change(
            screen.getByTestId(
              "infos.contrat salarié - convention collective - industries chimiques - catégorie professionnelle Agents de maîtrise - groupe IV - coefficient"
            ),
            {
              target: { value: "'Supérieur à 275 inclus'" },
            }
          );
          fireEvent.click(ui.next.get());
        });

        it("should display expected answer", () => {
          expect(screen.queryAllByText(/3 mois/g)[0]).toBeInTheDocument();

          expect(
            screen.queryAllByText(/Avenant 2, article 20/)[0]
          ).toBeInTheDocument();
        });
      });
    });
  });

  describe("criteria.catégorie professionnelle = 16| Employés", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos.contrat salarié - convention collective - industries chimiques - catégorie professionnelle"
        ),
        {
          target: { value: "'Employés'" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    describe("criteria.groupe = 1| I", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos.contrat salarié - convention collective - industries chimiques - catégorie professionnelle Agents de maîtrise - groupe"
          ),
          {
            target: { value: "'I'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      describe("criteria.coefficient = 7| Inférieur à 190", () => {
        beforeEach(() => {
          fireEvent.change(
            screen.getByTestId(
              "infos.contrat salarié - convention collective - industries chimiques - catégorie professionnelle Agents de maîtrise - groupe II - coefficient"
            ),
            {
              target: { value: "'Inférieur à 190'" },
            }
          );
          fireEvent.click(ui.next.get());
        });

        describe("criteria.ancienneté = 38| Moins de 2 ans", () => {
          beforeEach(() => {
            fireEvent.change(
              screen.getByTestId(
                "infos.contrat salarié - convention collective - industries chimiques - ancienneté"
              ),
              {
                target: { value: "'Moins de 2 ans'" },
              }
            );
            fireEvent.click(ui.next.get());
          });

          it("should display expected answer", () => {
            expect(screen.queryAllByText(/1 mois/g)[0]).toBeInTheDocument();

            expect(
              screen.queryAllByText(/Avenant n°1 article 27/)[0]
            ).toBeInTheDocument();
          });
        });

        describe("criteria.ancienneté = 42| 2 ans ou plus", () => {
          beforeEach(() => {
            fireEvent.change(
              screen.getByTestId(
                "infos.contrat salarié - convention collective - industries chimiques - ancienneté"
              ),
              {
                target: { value: "'2 ans ou plus'" },
              }
            );
            fireEvent.click(ui.next.get());
          });

          it("should display expected answer", () => {
            expect(screen.queryAllByText(/2 mois/g)[0]).toBeInTheDocument();

            expect(
              screen.queryAllByText(/Avenant n°1 article 27/)[0]
            ).toBeInTheDocument();
          });
        });
      });

      describe("criteria.coefficient = 8| 190 et plus", () => {
        beforeEach(() => {
          fireEvent.change(
            screen.getByTestId(
              "infos.contrat salarié - convention collective - industries chimiques - catégorie professionnelle Employés - groupe I - coefficient"
            ),
            {
              target: { value: "'190 et plus'" },
            }
          );
          fireEvent.click(ui.next.get());
        });

        it("should display expected answer", () => {
          expect(screen.queryAllByText(/2 mois/g)[0]).toBeInTheDocument();

          expect(
            screen.queryAllByText(/Avenant n°1 article 27/)[0]
          ).toBeInTheDocument();
        });
      });
    });

    describe("criteria.groupe = 4| II", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos.contrat salarié - convention collective - industries chimiques - catégorie professionnelle Agents de maîtrise - groupe"
          ),
          {
            target: { value: "'II'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      describe("criteria.coefficient = 7| Inférieur à 190", () => {
        beforeEach(() => {
          fireEvent.change(
            screen.getByTestId(
              "infos.contrat salarié - convention collective - industries chimiques - catégorie professionnelle Agents de maîtrise - groupe II - coefficient"
            ),
            {
              target: { value: "'Inférieur à 190'" },
            }
          );
          fireEvent.click(ui.next.get());
        });

        describe("criteria.ancienneté = 38| Moins de 2 ans", () => {
          beforeEach(() => {
            fireEvent.change(
              screen.getByTestId(
                "infos.contrat salarié - convention collective - industries chimiques - ancienneté"
              ),
              {
                target: { value: "'Moins de 2 ans'" },
              }
            );
            fireEvent.click(ui.next.get());
          });

          it("should display expected answer", () => {
            expect(screen.queryAllByText(/1 mois/g)[0]).toBeInTheDocument();

            expect(
              screen.queryAllByText(/Avenant n°1 article 27/)[0]
            ).toBeInTheDocument();
          });
        });

        describe("criteria.ancienneté = 42| 2 ans ou plus", () => {
          beforeEach(() => {
            fireEvent.change(
              screen.getByTestId(
                "infos.contrat salarié - convention collective - industries chimiques - ancienneté"
              ),
              {
                target: { value: "'2 ans ou plus'" },
              }
            );
            fireEvent.click(ui.next.get());
          });

          it("should display expected answer", () => {
            expect(screen.queryAllByText(/2 mois/g)[0]).toBeInTheDocument();

            expect(
              screen.queryAllByText(/Avenant n°1 article 27/)[0]
            ).toBeInTheDocument();
          });
        });
      });

      describe("criteria.coefficient = 8| 190 et plus", () => {
        beforeEach(() => {
          fireEvent.change(
            screen.getByTestId(
              "infos.contrat salarié - convention collective - industries chimiques - catégorie professionnelle Agents de maîtrise - groupe II - coefficient"
            ),
            {
              target: { value: "'190 et plus'" },
            }
          );
          fireEvent.click(ui.next.get());
        });

        it("should display expected answer", () => {
          expect(screen.queryAllByText(/2 mois/g)[0]).toBeInTheDocument();

          expect(
            screen.queryAllByText(/Avenant n°1 article 27/)[0]
          ).toBeInTheDocument();
        });
      });
    });

    describe("criteria.groupe = 5| III", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos.contrat salarié - convention collective - industries chimiques - catégorie professionnelle Agents de maîtrise - groupe"
          ),
          {
            target: { value: "'III'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      describe("criteria.coefficient = 7| Inférieur à 190", () => {
        beforeEach(() => {
          fireEvent.change(
            screen.getByTestId(
              "infos.contrat salarié - convention collective - industries chimiques - catégorie professionnelle Agents de maîtrise - groupe III - coefficient"
            ),
            {
              target: { value: "'Inférieur à 190'" },
            }
          );
          fireEvent.click(ui.next.get());
        });

        describe("criteria.ancienneté = 38| Moins de 2 ans", () => {
          beforeEach(() => {
            fireEvent.change(
              screen.getByTestId(
                "infos.contrat salarié - convention collective - industries chimiques - ancienneté"
              ),
              {
                target: { value: "'Moins de 2 ans'" },
              }
            );
            fireEvent.click(ui.next.get());
          });

          it("should display expected answer", () => {
            expect(screen.queryAllByText(/1 mois/g)[0]).toBeInTheDocument();

            expect(
              screen.queryAllByText(/Avenant n°1 article 27/)[0]
            ).toBeInTheDocument();
          });
        });

        describe("criteria.ancienneté = 42| 2 ans ou plus", () => {
          beforeEach(() => {
            fireEvent.change(
              screen.getByTestId(
                "infos.contrat salarié - convention collective - industries chimiques - ancienneté"
              ),
              {
                target: { value: "'2 ans ou plus'" },
              }
            );
            fireEvent.click(ui.next.get());
          });

          it("should display expected answer", () => {
            expect(screen.queryAllByText(/2 mois/g)[0]).toBeInTheDocument();

            expect(
              screen.queryAllByText(/Avenant n°1 article 27/)[0]
            ).toBeInTheDocument();
          });
        });
      });

      describe("criteria.coefficient = 8| 190 et plus", () => {
        beforeEach(() => {
          fireEvent.change(
            screen.getByTestId(
              "infos.contrat salarié - convention collective - industries chimiques - catégorie professionnelle Agents de maîtrise - groupe III - coefficient"
            ),
            {
              target: { value: "'190 et plus'" },
            }
          );
          fireEvent.click(ui.next.get());
        });

        it("should display expected answer", () => {
          expect(screen.queryAllByText(/2 mois/g)[0]).toBeInTheDocument();

          expect(
            screen.queryAllByText(/Avenant n°1 article 27/)[0]
          ).toBeInTheDocument();
        });
      });
    });
  });

  describe("criteria.catégorie professionnelle = 60| Ingénieurs, Cadres", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos.contrat salarié - convention collective - industries chimiques - catégorie professionnelle"
        ),
        {
          target: { value: "'Ingénieurs, Cadres'" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    describe("criteria.groupe = 9| V", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos.contrat salarié - convention collective - industries chimiques - catégorie professionnelle Ingénieurs, Cadres - groupe"
          ),
          {
            target: { value: "'V'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(screen.queryAllByText(/3 mois/g)[0]).toBeInTheDocument();

        expect(
          screen.queryAllByText(/Avenant n°3 Article 4/)[0]
        ).toBeInTheDocument();
      });
    });
  });

  describe("criteria.catégorie professionnelle = 4| Ouvriers", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos.contrat salarié - convention collective - industries chimiques - catégorie professionnelle"
        ),
        {
          target: { value: "'Ouvriers'" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    describe("criteria.groupe = 1| I", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos.contrat salarié - convention collective - industries chimiques - catégorie professionnelle Ouvriers - groupe"
          ),
          {
            target: { value: "'I'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      describe("criteria.coefficient = 7| Inférieur à 190", () => {
        beforeEach(() => {
          fireEvent.change(
            screen.getByTestId(
              "infos.contrat salarié - convention collective - industries chimiques - catégorie professionnelle Agents de maîtrise - groupe II - coefficient"
            ),
            {
              target: { value: "'Inférieur à 190'" },
            }
          );
          fireEvent.click(ui.next.get());
        });

        describe("criteria.ancienneté = 38| Moins de 2 ans", () => {
          beforeEach(() => {
            fireEvent.change(
              screen.getByTestId(
                "infos.contrat salarié - convention collective - industries chimiques - ancienneté"
              ),
              {
                target: { value: "'Moins de 2 ans'" },
              }
            );
            fireEvent.click(ui.next.get());
          });

          it("should display expected answer", () => {
            expect(screen.queryAllByText(/1 mois/g)[0]).toBeInTheDocument();

            expect(
              screen.queryAllByText(/Avenant n°1 article 27/)[0]
            ).toBeInTheDocument();
          });
        });

        describe("criteria.ancienneté = 42| 2 ans ou plus", () => {
          beforeEach(() => {
            fireEvent.change(
              screen.getByTestId(
                "infos.contrat salarié - convention collective - industries chimiques - ancienneté"
              ),
              {
                target: { value: "'2 ans ou plus'" },
              }
            );
            fireEvent.click(ui.next.get());
          });

          it("should display expected answer", () => {
            expect(screen.queryAllByText(/2 mois/g)[0]).toBeInTheDocument();

            expect(
              screen.queryAllByText(/Avenant n°1 article 27/)[0]
            ).toBeInTheDocument();
          });
        });
      });

      describe("criteria.coefficient = 8| 190 et plus", () => {
        beforeEach(() => {
          fireEvent.change(
            screen.getByTestId(
              "infos.contrat salarié - convention collective - industries chimiques - catégorie professionnelle Agents de maîtrise - groupe II - coefficient"
            ),
            {
              target: { value: "'190 et plus'" },
            }
          );
          fireEvent.click(ui.next.get());
        });

        it("should display expected answer", () => {
          expect(screen.queryAllByText(/2 mois/g)[0]).toBeInTheDocument();

          expect(
            screen.queryAllByText(/Avenant n°1 article 27/)[0]
          ).toBeInTheDocument();
        });
      });
    });

    describe("criteria.groupe = 4| II", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos.contrat salarié - convention collective - industries chimiques - catégorie professionnelle Ouvriers - groupe"
          ),
          {
            target: { value: "'II'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      describe("criteria.coefficient = 7| Inférieur à 190", () => {
        beforeEach(() => {
          fireEvent.change(
            screen.getByTestId(
              "infos.contrat salarié - convention collective - industries chimiques - catégorie professionnelle Agents de maîtrise - groupe II - coefficient"
            ),
            {
              target: { value: "'Inférieur à 190'" },
            }
          );
          fireEvent.click(ui.next.get());
        });

        describe("criteria.ancienneté = 38| Moins de 2 ans", () => {
          beforeEach(() => {
            fireEvent.change(
              screen.getByTestId(
                "infos.contrat salarié - convention collective - industries chimiques - ancienneté"
              ),
              {
                target: { value: "'Moins de 2 ans'" },
              }
            );
            fireEvent.click(ui.next.get());
          });

          it("should display expected answer", () => {
            expect(screen.queryAllByText(/1 mois/g)[0]).toBeInTheDocument();

            expect(
              screen.queryAllByText(/Avenant n°1 article 27/)[0]
            ).toBeInTheDocument();
          });
        });

        describe("criteria.ancienneté = 42| 2 ans ou plus", () => {
          beforeEach(() => {
            fireEvent.change(
              screen.getByTestId(
                "infos.contrat salarié - convention collective - industries chimiques - ancienneté"
              ),
              {
                target: { value: "'2 ans ou plus'" },
              }
            );
            fireEvent.click(ui.next.get());
          });

          it("should display expected answer", () => {
            expect(screen.queryAllByText(/2 mois/g)[0]).toBeInTheDocument();

            expect(
              screen.queryAllByText(/Avenant n°1 article 27/)[0]
            ).toBeInTheDocument();
          });
        });
      });

      describe("criteria.coefficient = 8| 190 et plus", () => {
        beforeEach(() => {
          fireEvent.change(
            screen.getByTestId(
              "infos.contrat salarié - convention collective - industries chimiques - catégorie professionnelle Agents de maîtrise - groupe II - coefficient"
            ),
            {
              target: { value: "'190 et plus'" },
            }
          );
          fireEvent.click(ui.next.get());
        });

        it("should display expected answer", () => {
          expect(screen.queryAllByText(/2 mois/g)[0]).toBeInTheDocument();

          expect(
            screen.queryAllByText(/Avenant n°1 article 27/)[0]
          ).toBeInTheDocument();
        });
      });
    });

    describe("criteria.groupe = 5| III", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos.contrat salarié - convention collective - industries chimiques - catégorie professionnelle Ouvriers - groupe"
          ),
          {
            target: { value: "'III'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      describe("criteria.coefficient = 7| Inférieur à 190", () => {
        beforeEach(() => {
          fireEvent.change(
            screen.getByTestId(
              "infos.contrat salarié - convention collective - industries chimiques - catégorie professionnelle Agents de maîtrise - groupe II - coefficient"
            ),
            {
              target: { value: "'Inférieur à 190'" },
            }
          );
          fireEvent.click(ui.next.get());
        });

        describe("criteria.ancienneté = 38| Moins de 2 ans", () => {
          beforeEach(() => {
            fireEvent.change(
              screen.getByTestId(
                "infos.contrat salarié - convention collective - industries chimiques - ancienneté"
              ),
              {
                target: { value: "'Moins de 2 ans'" },
              }
            );
            fireEvent.click(ui.next.get());
          });

          it("should display expected answer", () => {
            expect(screen.queryAllByText(/1 mois/g)[0]).toBeInTheDocument();

            expect(
              screen.queryAllByText(/Avenant n°1 article 27/)[0]
            ).toBeInTheDocument();
          });
        });

        describe("criteria.ancienneté = 42| 2 ans ou plus", () => {
          beforeEach(() => {
            fireEvent.change(
              screen.getByTestId(
                "infos.contrat salarié - convention collective - industries chimiques - ancienneté"
              ),
              {
                target: { value: "'2 ans ou plus'" },
              }
            );
            fireEvent.click(ui.next.get());
          });

          it("should display expected answer", () => {
            expect(screen.queryAllByText(/2 mois/g)[0]).toBeInTheDocument();

            expect(
              screen.queryAllByText(/Avenant n°1 article 27/)[0]
            ).toBeInTheDocument();
          });
        });
      });

      describe("criteria.coefficient = 8| 190 et plus", () => {
        beforeEach(() => {
          fireEvent.change(
            screen.getByTestId(
              "infos.contrat salarié - convention collective - industries chimiques - catégorie professionnelle Agents de maîtrise - groupe II - coefficient"
            ),
            {
              target: { value: "'190 et plus'" },
            }
          );
          fireEvent.click(ui.next.get());
        });

        it("should display expected answer", () => {
          expect(screen.queryAllByText(/2 mois/g)[0]).toBeInTheDocument();

          expect(
            screen.queryAllByText(/Avenant n°1 article 27/)[0]
          ).toBeInTheDocument();
        });
      });
    });
  });

  describe("criteria.catégorie professionnelle = 28| Techniciens", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos.contrat salarié - convention collective - industries chimiques - catégorie professionnelle"
        ),
        {
          target: { value: "'Techniciens'" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    describe("criteria.groupe = 1| I", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos.contrat salarié - convention collective - industries chimiques - catégorie professionnelle Techniciens - groupe"
          ),
          {
            target: { value: "'I'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      describe("criteria.coefficient = 7| Inférieur à 190", () => {
        beforeEach(() => {
          fireEvent.change(
            screen.getByTestId(
              "infos.contrat salarié - convention collective - industries chimiques - catégorie professionnelle Agents de maîtrise - groupe II - coefficient"
            ),
            {
              target: { value: "'Inférieur à 190'" },
            }
          );
          fireEvent.click(ui.next.get());
        });

        describe("criteria.ancienneté = 38| Moins de 2 ans", () => {
          beforeEach(() => {
            fireEvent.change(
              screen.getByTestId(
                "infos.contrat salarié - convention collective - industries chimiques - ancienneté"
              ),
              {
                target: { value: "'Moins de 2 ans'" },
              }
            );
            fireEvent.click(ui.next.get());
          });

          it("should display expected answer", () => {
            expect(screen.queryAllByText(/1 mois/g)[0]).toBeInTheDocument();

            expect(
              screen.queryAllByText(/Avenant n°1 article 27/)[0]
            ).toBeInTheDocument();
          });
        });

        describe("criteria.ancienneté = 42| 2 ans ou plus", () => {
          beforeEach(() => {
            fireEvent.change(
              screen.getByTestId(
                "infos.contrat salarié - convention collective - industries chimiques - ancienneté"
              ),
              {
                target: { value: "'2 ans ou plus'" },
              }
            );
            fireEvent.click(ui.next.get());
          });

          it("should display expected answer", () => {
            expect(screen.queryAllByText(/2 mois/g)[0]).toBeInTheDocument();

            expect(
              screen.queryAllByText(/Avenant n°1 article 27/)[0]
            ).toBeInTheDocument();
          });
        });
      });

      describe("criteria.coefficient = 8| 190 et plus", () => {
        beforeEach(() => {
          fireEvent.change(
            screen.getByTestId(
              "infos.contrat salarié - convention collective - industries chimiques - catégorie professionnelle Agents de maîtrise - groupe II - coefficient"
            ),
            {
              target: { value: "'190 et plus'" },
            }
          );
          fireEvent.click(ui.next.get());
        });

        it("should display expected answer", () => {
          expect(screen.queryAllByText(/2 mois/g)[0]).toBeInTheDocument();

          expect(
            screen.queryAllByText(/Avenant n°1 article 27/)[0]
          ).toBeInTheDocument();
        });
      });
    });

    describe("criteria.groupe = 4| II", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos.contrat salarié - convention collective - industries chimiques - catégorie professionnelle Techniciens - groupe"
          ),
          {
            target: { value: "'II'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      describe("criteria.coefficient = 7| Inférieur à 190", () => {
        beforeEach(() => {
          fireEvent.change(
            screen.getByTestId(
              "infos.contrat salarié - convention collective - industries chimiques - catégorie professionnelle Agents de maîtrise - groupe II - coefficient"
            ),
            {
              target: { value: "'Inférieur à 190'" },
            }
          );
          fireEvent.click(ui.next.get());
        });

        describe("criteria.ancienneté = 38| Moins de 2 ans", () => {
          beforeEach(() => {
            fireEvent.change(
              screen.getByTestId(
                "infos.contrat salarié - convention collective - industries chimiques - ancienneté"
              ),
              {
                target: { value: "'Moins de 2 ans'" },
              }
            );
            fireEvent.click(ui.next.get());
          });

          it("should display expected answer", () => {
            expect(screen.queryAllByText(/1 mois/g)[0]).toBeInTheDocument();

            expect(
              screen.queryAllByText(/Avenant n°1 article 27/)[0]
            ).toBeInTheDocument();
          });
        });

        describe("criteria.ancienneté = 42| 2 ans ou plus", () => {
          beforeEach(() => {
            fireEvent.change(
              screen.getByTestId(
                "infos.contrat salarié - convention collective - industries chimiques - ancienneté"
              ),
              {
                target: { value: "'2 ans ou plus'" },
              }
            );
            fireEvent.click(ui.next.get());
          });

          it("should display expected answer", () => {
            expect(screen.queryAllByText(/2 mois/g)[0]).toBeInTheDocument();

            expect(
              screen.queryAllByText(/Avenant n°1 article 27/)[0]
            ).toBeInTheDocument();
          });
        });
      });

      describe("criteria.coefficient = 8| 190 et plus", () => {
        beforeEach(() => {
          fireEvent.change(
            screen.getByTestId(
              "infos.contrat salarié - convention collective - industries chimiques - catégorie professionnelle Agents de maîtrise - groupe II - coefficient"
            ),
            {
              target: { value: "'190 et plus'" },
            }
          );
          fireEvent.click(ui.next.get());
        });

        it("should display expected answer", () => {
          expect(screen.queryAllByText(/2 mois/g)[0]).toBeInTheDocument();

          expect(
            screen.queryAllByText(/Avenant n°1 article 27/)[0]
          ).toBeInTheDocument();
        });
      });
    });

    describe("criteria.groupe = 5| III", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos.contrat salarié - convention collective - industries chimiques - catégorie professionnelle Techniciens - groupe"
          ),
          {
            target: { value: "'III'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      describe("criteria.coefficient = 7| Inférieur à 190", () => {
        beforeEach(() => {
          fireEvent.change(
            screen.getByTestId(
              "infos.contrat salarié - convention collective - industries chimiques - catégorie professionnelle Agents de maîtrise - groupe II - coefficient"
            ),
            {
              target: { value: "'Inférieur à 190'" },
            }
          );
          fireEvent.click(ui.next.get());
        });

        describe("criteria.ancienneté = 38| Moins de 2 ans", () => {
          beforeEach(() => {
            fireEvent.change(
              screen.getByTestId(
                "infos.contrat salarié - convention collective - industries chimiques - ancienneté"
              ),
              {
                target: { value: "'Moins de 2 ans'" },
              }
            );
            fireEvent.click(ui.next.get());
          });

          it("should display expected answer", () => {
            expect(screen.queryAllByText(/1 mois/g)[0]).toBeInTheDocument();

            expect(
              screen.queryAllByText(/Avenant n°1 article 27/)[0]
            ).toBeInTheDocument();
          });
        });

        describe("criteria.ancienneté = 42| 2 ans ou plus", () => {
          beforeEach(() => {
            fireEvent.change(
              screen.getByTestId(
                "infos.contrat salarié - convention collective - industries chimiques - ancienneté"
              ),
              {
                target: { value: "'2 ans ou plus'" },
              }
            );
            fireEvent.click(ui.next.get());
          });

          it("should display expected answer", () => {
            expect(screen.queryAllByText(/2 mois/g)[0]).toBeInTheDocument();

            expect(
              screen.queryAllByText(/Avenant n°1 article 27/)[0]
            ).toBeInTheDocument();
          });
        });
      });

      describe("criteria.coefficient = 8| 190 et plus", () => {
        beforeEach(() => {
          fireEvent.change(
            screen.getByTestId(
              "infos.contrat salarié - convention collective - industries chimiques - catégorie professionnelle Agents de maîtrise - groupe II - coefficient"
            ),
            {
              target: { value: "'190 et plus'" },
            }
          );
          fireEvent.click(ui.next.get());
        });

        it("should display expected answer", () => {
          expect(screen.queryAllByText(/2 mois/g)[0]).toBeInTheDocument();

          expect(
            screen.queryAllByText(/Avenant n°1 article 27/)[0]
          ).toBeInTheDocument();
        });
      });
    });

    describe("criteria.groupe = 6| IV", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId(
            "infos.contrat salarié - convention collective - industries chimiques - catégorie professionnelle Techniciens - groupe"
          ),
          {
            target: { value: "'IV'" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      describe("criteria.coefficient = 11| Inférieur à 275", () => {
        beforeEach(() => {
          fireEvent.change(
            screen.getByTestId(
              "infos.contrat salarié - convention collective - industries chimiques - coefficient"
            ),
            {
              target: { value: "'Inférieur à 275'" },
            }
          );
          fireEvent.click(ui.next.get());
        });

        it("should display expected answer", () => {
          expect(screen.queryAllByText(/2 mois/g)[0]).toBeInTheDocument();

          expect(
            screen.queryAllByText(/Avenant 2, article 20/)[0]
          ).toBeInTheDocument();
        });
      });

      describe("criteria.coefficient = 14| Supérieur à 275 (inclus)", () => {
        beforeEach(() => {
          fireEvent.change(
            screen.getByTestId(
              "infos.contrat salarié - convention collective - industries chimiques - coefficient"
            ),
            {
              target: { value: "'Supérieur à 275 (inclus)'" },
            }
          );
          fireEvent.click(ui.next.get());
        });

        it("should display expected answer", () => {
          expect(screen.queryAllByText(/3 mois/g)[0]).toBeInTheDocument();

          expect(
            screen.queryAllByText(/Avenant 2, article 20/)[0]
          ).toBeInTheDocument();
        });
      });
    });
  });
});
