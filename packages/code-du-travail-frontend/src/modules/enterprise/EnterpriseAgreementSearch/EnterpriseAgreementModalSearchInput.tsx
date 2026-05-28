"use client";
import { fr } from "@codegouvfr/react-dsfr";
import Button from "@codegouvfr/react-dsfr/Button";
import { useEnterpriseAgreementSearch } from "./useEnterpriseAgreementSearch";
import { EnterpriseSearchFormAndResults } from "./EnterpriseSearchFormAndResults";
import { EnterpriseAgreementSelectionForm } from "./EnterpriseAgreementSelectionForm";
import { EnterpriseAgreementSelectionDetail } from "./EnterpriseAgreementSelectionDetail";
import { Enterprise } from "../types";
import { Agreement } from "src/modules/outils/indemnite-depart/types";

type Props = {
  onAgreementSelect: (agreement?: Agreement, enterprise?: Enterprise) => void;
  agreement?: Agreement;
  trackingActionName: string;
  level: 2 | 3;
};

export const EnterpriseAgreementModalSearchInput = ({
  onAgreementSelect,
  agreement,
  trackingActionName,
  level,
}: Props) => {
  const TitleTag = `h${level}` as "h2" | "h3";
  const {
    search,
    setSearch,
    location,
    setLocation,
    enterprises,
    loading,
    searchState,
    error,
    onSubmit,
    resultRef,
    selectedConventionTitleRef,
    getStateMargin,
    getInputState,
    selectedEnterprise,
    setSelectedEnterprise,
    selectedAgreement,
    setSelectedAgreement,
    tracking,
  } = useEnterpriseAgreementSearch({ trackingActionName, agreement });

  // Vue 1 : convention collective sélectionnée (entreprise avec 1 seule CC)
  if (selectedAgreement && (selectedEnterprise?.conventions?.length ?? 0) < 2) {
    return (
      <>
        {selectedEnterprise && (
          <EnterpriseAgreementSelectionDetail
            enterprise={selectedEnterprise}
            level={level}
          />
        )}
        <TitleTag
          ref={selectedConventionTitleRef}
          className={fr.cx("fr-h4", "fr-mt-2w", "fr-mb-0")}
          tabIndex={-1}
        >
          Vous avez sélectionné la convention collective
        </TitleTag>
        <div
          className={fr.cx(
            "fr-my-2w",
            "fr-grid-row",
            "fr-grid-row--middle",
            "fr-grid-row--gutters"
          )}
        >
          <div className={fr.cx("fr-card", "fr-card--sm", "fr-col-10")}>
            <div className={fr.cx("fr-card__body")}>
              <div className={fr.cx("fr-card__content", "fr-py-1w")}>
                <p
                  className={fr.cx("fr-card__title")}
                  id={"selected-convention"}
                >
                  {`${selectedAgreement.shortTitle} IDCC ${selectedAgreement.id}`}
                </p>
              </div>
            </div>
          </div>
          <div className={fr.cx("fr-col")}>
            <Button
              iconId="fr-icon-arrow-go-back-fill"
              priority="secondary"
              onClick={() => {
                setSelectedAgreement(undefined);
                if (
                  selectedEnterprise?.conventions.length &&
                  selectedEnterprise?.conventions.length < 2
                ) {
                  setSelectedEnterprise(undefined);
                }
              }}
              nativeButtonProps={{
                "aria-describedby": `selected-convention`,
              }}
            >
              Modifier
            </Button>
          </div>
        </div>
      </>
    );
  }

  // Vue 2 : entreprise sélectionnée avec plusieurs CCs
  if (selectedEnterprise) {
    return (
      <EnterpriseAgreementSelectionForm
        enterprise={selectedEnterprise}
        selectedAgreement={selectedAgreement}
        level={level}
        goBack={() => {
          setSelectedEnterprise(undefined);
          setSelectedAgreement(undefined);
        }}
        onAgreementSelect={(agr) => {
          setSelectedAgreement(agr);
          tracking.emitSelectEnterpriseEvent(trackingActionName, {
            label: selectedEnterprise.label,
            siren: selectedEnterprise.siren,
          });
          tracking.emitSelectEnterpriseAgreementEvent(
            `idcc${selectedEnterprise.conventions[0].num}`,
            trackingActionName
          );
          onAgreementSelect(agr, selectedEnterprise);
        }}
      />
    );
  }

  // Vue 3 : formulaire de recherche
  return (
    <EnterpriseSearchFormAndResults
      search={search}
      setSearch={setSearch}
      location={location}
      setLocation={setLocation}
      enterprises={enterprises}
      loading={loading}
      searchState={searchState}
      error={error}
      onSubmit={onSubmit}
      resultRef={resultRef}
      getStateMargin={getStateMargin}
      getInputState={getInputState}
      level={level}
      buildEnterpriseLinkProps={(ent) => ({
        onClick: (ev) => {
          ev.preventDefault();
          setSelectedEnterprise(ent);
          if (!ent) {
            tracking.emitNoEnterpriseSelectEvent();
            return;
          }
          if (ent.conventions.length === 1) {
            tracking.emitSelectEnterpriseEvent(trackingActionName, {
              label: ent.label,
              siren: ent.siren,
            });
            tracking.emitSelectEnterpriseAgreementEvent(
              `idcc${ent.conventions[0].num}`,
              trackingActionName
            );
            onAgreementSelect(ent.conventions[0], ent);
          } else if (!ent.conventions || ent.conventions.length === 0) {
            onAgreementSelect(undefined, ent);
          }
        },
      })}
      buildAssistantsMaternielsLinkProps={() => ({
        onClick: (ev) => {
          ev.preventDefault();
          const assMatAgreement: Agreement = {
            contributions: true,
            num: 3239,
            id: "3239",
            shortTitle: "Particuliers employeurs et emploi à domicile",
            slug: "3239-particuliers-employeurs-et-emploi-a-domicile",
            title: "Particuliers employeurs et emploi à domicile",
            url: "/3239-particuliers-employeurs-et-emploi-a-domicile",
          };
          setSelectedAgreement(assMatAgreement);
          tracking.emitNoEnterpriseSelectEvent();
          onAgreementSelect(assMatAgreement);
          setTimeout(() => {
            selectedConventionTitleRef.current?.focus();
          }, 100);
        },
      })}
    />
  );
};
