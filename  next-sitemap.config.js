
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://yanis-harrat.vercel.app',
  generateRobotsTxt: true,         // ✅ génère robots.txt
  generateIndexSitemap: false,     // ❌ pas besoin si t’as pas plusieurs sitemaps
  sitemapSize: 7000,
  exclude: ['/404', '/500'],
};