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
      <xsl:apply-templates/>
    </xsl:template>

    <xsl:template match="Titre">
      <div class="sp__Titre"><xsl:apply-templates/></div>
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
