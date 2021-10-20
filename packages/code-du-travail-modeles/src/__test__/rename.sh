for f in **/preavis-retraite/depart-mise-retraite.spec.ts ; do
#   temp="${f#depart-retraite-}";

#   temp2="${temp//-references-spec.ts/}";
#  if ! [[ "$temp2" == *"references" ]]; then
#    mkdir -p "$temp2/preavis-retraite"
echo "${f//depart-mise-retraite/depart-mise}"
    mv "$f" "${f//depart-mise-retraite/depart-mise}"
#  fi
#  mv "$f" "$f//is/was}" ;
done
#
#find __test__ -type f \
#               -name '*-spec.ts' \
#               -execdir rename 's/\.\/(.+)-spec\.ts$/$1.spec.ts/' {} \;
