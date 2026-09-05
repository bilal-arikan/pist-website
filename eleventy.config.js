export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "CNAME": "CNAME" });
  eleventyConfig.addPassthroughCopy({ "robots.txt": "robots.txt" });

  // Türkçe tarih: 8 Eylül 2026
  const AYLAR = ["Ocak","Şubat","Mart","Nisan","Mayıs","Haziran",
                 "Temmuz","Ağustos","Eylül","Ekim","Kasım","Aralık"];
  eleventyConfig.addFilter("tarihTR", (d) => {
    const t = new Date(d);
    return `${t.getUTCDate()} ${AYLAR[t.getUTCMonth()]} ${t.getUTCFullYear()}`;
  });
  eleventyConfig.addFilter("tarihEN", (d) => new Date(d).toLocaleDateString("en-GB",
    { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }));
  eleventyConfig.addFilter("isoTarih", (d) => new Date(d).toISOString().slice(0, 10));

  // blog koleksiyonları
  eleventyConfig.addCollection("yazilarTR", (c) =>
    c.getFilteredByGlob("src/blog/tr/*.md").sort((a, b) => b.data.date - a.data.date));
  eleventyConfig.addCollection("yazilarEN", (c) =>
    c.getFilteredByGlob("src/blog/en/*.md").sort((a, b) => b.data.date - a.data.date));

  return {
    dir: { input: "src", output: "_site", includes: "_includes", data: "_data" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
