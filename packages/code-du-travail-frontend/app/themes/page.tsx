import { DsfrLayout } from "../../src/modules/layout";
import { generateDefaultMetadata } from "../../src/modules/common/metas";
import { fetchRootThemes, Themes } from "../../src/modules/themes";

export const metadata = generateDefaultMetadata({
  title: "Thèmes",
  description: "Explorez les contenus autour des thèmes",
  path: "/themes",
});

async function Index() {
  const themes = await getThemes();

  return (
    <DsfrLayout>
      <Themes themes={themes} />
    </DsfrLayout>
  );
}

const getThemes = async () => {
  const themes = await fetchRootThemes(["title", "icon", "slug", "children"]);

  return themes;
};

export default Index;
