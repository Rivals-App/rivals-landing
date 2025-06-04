/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://www.rivalsapp.com',
    generateRobotsTxt: true, // Generate robots.txt file
    sitemapSize: 5000,       // Maximum number of URLs per sitemap file
    changefreq: 'weekly',    // Change frequency for each URL
    priority: 0.7,           // Priority of each URL
    exclude: ['/404', '/admin/*', '/private/*'],
    robotsTxtOptions: {
      policies: [
        {
          userAgent: '*',
          allow: '/',      // Allow all crawlers to index your pages
          disallow: ['/admin/', '/private/'],
        },
      ],
      additionalSitemaps: [
        'https://www.rivalsapp.com/sitemap.xml', // This is optional if you want to explicitly list it
      ],
    },
    transform: async (config, path) => {
      // Custom priority for specific pages
      let priority = 0.7;
      let changefreq = 'weekly';

      if (path === '/') {
        priority = 1.0;
        changefreq = 'weekly';
      } else if (path === '/join-us') {
        priority = 0.9;
        changefreq = 'monthly';
      } else if (path === '/about-rivals' || path === '/arcade') {
        priority = 0.8;
        changefreq = 'monthly';
      } else if (path === '/blog') {
        priority = 0.7;
        changefreq = 'weekly';
      } else if (path === '/contact-us') {
        priority = 0.5;
        changefreq = 'yearly';
      } else if (path.startsWith('/blog/')) {
        priority = 0.6;
        changefreq = 'monthly';
      }

      // Return the transformed data
      return {
        loc: path,
        changefreq,
        priority,
        lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
        alternateRefs: config.alternateRefs ?? [],
      };
    },
  };
  