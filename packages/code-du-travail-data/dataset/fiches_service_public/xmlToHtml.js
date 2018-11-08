const libxslt = require("libxslt");
const libxmljs = libxslt.libxmljs;

/*
convert service-public DSL from their XML dumps to HTML
*/

const XSL = `
  <xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:template match="/">
      <xsl:apply-templates />
    </xsl:template>

    <xsl:template match="Introduction">
      <h2>Introduction</h2>
      <xsl:apply-templates/>
    </xsl:template>

    <xsl:template match="Texte">
      <xsl:apply-templates/>
    </xsl:template>

    <xsl:template match="Chapitre">
      <div class="sp__Titre"><xsl:value-of select="Titre/Paragraphe"/></div>
      <xsl:apply-templates select="*[name() != 'Titre']"/>
    </xsl:template>

    <xsl:template match="ASavoir">
      <div class="sp__Info"><xsl:value-of select="Titre"/></div>
      <xsl:apply-templates select="*[name() != 'Titre']"/>
    </xsl:template>

    <xsl:template match="ANoter">
      <div class="sp__Info"><xsl:value-of select="Titre"/></div>
      <xsl:apply-templates select="*[name() != 'Titre']"/>
    </xsl:template>

    <xsl:template match="Attention">
      <div class="sp__Warning"><xsl:value-of select="Titre"/></div>
      <xsl:apply-templates select="*[name() != 'Titre']"/>
    </xsl:template>

    <xsl:template match="MiseEnEvidence">
      <span class="sp__MiseEnEvidence"><xsl:apply-templates/></span>
    </xsl:template>

    <xsl:template match="Valeur">
      <span class="sp__Valeur"><xsl:apply-templates/></span>
      <p><xsl:apply-templates/></p>
    </xsl:template>

    <xsl:template match="ASavoir">
      <div class="sp__ASavoir"><xsl:apply-templates/></div>
    </xsl:template>

    <xsl:template match="Paragraphe">
      <p><xsl:apply-templates/></p>
    </xsl:template>

    <xsl:template match="Liste">
      <ul><xsl:apply-templates/></ul>
    </xsl:template>

    <xsl:template match="Liste/Item">
      <li><xsl:apply-templates/></li>
    </xsl:template>


    <xsl:template match="LienInterne[audience='Particuliers']">
      <a href="" target="_blank" rel="noreferrer, noopener">
        <xsl:attribute name="href">https://www.service-public.fr/particuliers/vos-droits/<xsl:value-of select="@LienPublication"/></xsl:attribute>
        <xsl:value-of select="."/>
      </a>
    </xsl:template>

    <xsl:template match="ServiceEnLigne">
      <a href="" target="_blank" rel="noreferrer, noopener">
        <xsl:attribute name="href">https://www.service-public.fr/professionnels-entreprise/vos-droits/<xsl:value-of select="@LienPublication"/></xsl:attribute>
        <xsl:value-of select="."/>
      </a>
    </xsl:template>

    <xsl:template match="ServiceEnLigne">
    <a class="bt" href="" target="_blank" rel="noreferrer, noopener">
      <xsl:attribute name="href"><xsl:value-of select="@URL"/></xsl:attribute>
      <xsl:value-of select="Titre"/>
    </a>
  </xsl:template>

    <xsl:template match="Tableau">
      <table>
        <thead>
          <tr class="title">
            <th>
              <xsl:attribute name="colspan"><xsl:value-of select="count(./Colonne) + 1"/></xsl:attribute>
              <xsl:value-of select="Titre"/>
            </th>
          </tr>
        </thead>
        <tbody>
          <xsl:apply-templates select="Rangée"/>
        </tbody>
      </table>
    </xsl:template>

    <xsl:template match="Rangée">
      <tr><xsl:apply-templates/></tr>
    </xsl:template>

    <xsl:template match="Cellule">
      <td><xsl:value-of select="Paragraphe"/></td>
    </xsl:template>


    <xsl:template match="ListeSituations">
      <ul class="sp__situations-nav">
        <xsl:for-each select="Situation">
          <li>
            <a>
              <xsl:attribute name="href">#situation-<xsl:value-of select="position()"/></xsl:attribute>
              <xsl:value-of select="Titre"/>
            </a>
          </li>
        </xsl:for-each>
      </ul>

      <div class="sp__situations">
        <xsl:for-each select="Situation">
          <div class="sp__situation">
            <xsl:attribute name="id">situation-<xsl:value-of select="position()"/></xsl:attribute>
            <xsl:apply-templates/>
          </div>
        </xsl:for-each>
      </div>
    </xsl:template>



    <xsl:template match="Publication">
      <h1>Publication</h1>
      <xsl:apply-templates select="Introduction"/>
      <xsl:apply-templates select="Texte"/>
      <xsl:apply-templates select="ListeSituations"/>
      <xsl:for-each select="//item">
        <xsl:sort select="@pos"/>
        <xsl:value-of select="."/>
      </xsl:for-each>
    </xsl:template>

  </xsl:stylesheet>
`;

const stylesheetObj = libxmljs.parseXml(XSL, { nocdata: true });
const stylesheet = libxslt.parse(stylesheetObj);

const convert = xmlString =>
  stylesheet
    .apply(libxmljs.parseXml(xmlString))
    .toString()
    .replace(/^<\?xml version="1\.0" encoding="UTF-8"\?>\s+/, "");

module.exports = convert;
