/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://www.rivalsapp.com',
    generateRobotsTxt: true, // Generate robots.txt file
    sitemapSize: 5000,       // Maximum number of URLs per sitemap file
    changefreq: 'weekly',    // Change frequency for each URL
    priority: 0.7,           // Priority of each URL
    exclude: ['/404'],       // Exclude the 404 page from sitemap
    robotsTxtOptions: {
      policies: [
        {
          userAgent: '*',
          allow: '/',      // Allow all crawlers to index your pages
        },
      ],
      additionalSitemaps: [
        'https://www.rivalsapp.com/sitemap.xml', // This is optional if you want to explicitly list it
      ],
    },
  };
  