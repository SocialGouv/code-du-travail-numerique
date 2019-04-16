#!/usr/bin/env bash

#

export BRANCH_NAME=${BRANCH_NAME:=$CI_COMMIT_REF_NAME}
export COMMIT=${COMMIT:=$CI_COMMIT_SHA}
export JOB_ID=${JOB_ID:=$CI_JOB_ID}

BRANCH_NAME_HASHED=$(printf "${BRANCH_NAME}" | sha1sum | cut -c1-7 )
export BRANCH_HASH=${BRANCH_HASH:=$BRANCH_NAME_HASHED}

#

case ${BRANCH_NAME} in
  master)
    export ENVIRONMENT=ops;
    #
    export API_HOST=api.code-du-travail-numerique.${ENVIRONMENT}.factory.social.gouv.fr;
    export FRONTEND_HOST=code-du-travail-numerique.${ENVIRONMENT}.factory.social.gouv.fr;
    export NLP_HOST=nlp.code-du-travail-numerique.${ENVIRONMENT}.factory.social.gouv.fr;
    export ELASTICSEARCH_HOST=elasticsearch:${ES_PORT};
    ;;
  *)
    export ENVIRONMENT=dev;
    #
    export API_HOST=api.${BRANCH_HASH}.code-du-travail-numerique.${ENVIRONMENT}.factory.social.gouv.fr;
    export FRONTEND_HOST=${BRANCH_HASH}.code-du-travail-numerique.${ENVIRONMENT}.factory.social.gouv.fr;
    export NLP_HOST=nlp.${BRANCH_HASH}.code-du-travail-numerique.${ENVIRONMENT}.factory.social.gouv.fr;
    export ELASTICSEARCH_HOST=${BRANCH_HASH}.elasticsearch:${ES_PORT};
    ;;
esac
