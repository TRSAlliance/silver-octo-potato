module.exports = {
  title: 'Permaweb Cookbook',
  description: 'Official documentation for TRS Alliance permaweb-cookbook',
  head: [
    ['meta', { name: 'keywords', content: 'TRS Alliance, permaweb, blockchain, decentralized, documentation' }],
    ['meta', { name: 'robots', content: 'index, follow' }],
    ['meta', { property: 'og:title', content: 'Permaweb Cookbook' }],
    ['meta', { property: 'og:description', content: 'Official documentation for TRS Alliance permaweb-cookbook, covering protocols and AI-driven workflows.' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:url', content: 'https://trsalliance.org/docs' }],
    ['meta', { property: 'og:image', content: 'https://trsalliance.org/assets/og-image.jpg' }],
    ['link', { rel: 'canonical', href: 'https://trsalliance.org/docs' }]
  ],
  plugins: [
    ['vuepress-plugin-seo', {
      siteTitle: (_, $site) => $site.title,
      title: $page => $page.title,
      description: $page => $page.frontmatter.description,
      author: (_, $site) => $site.themeConfig.author || 'TRS Alliance',
      tags: $page => $page.frontmatter.tags,
      twitterCard: _ => 'summary_large_image',
      type: $page => 'article',
      url: (_, $site, path) => 'https://trsalliance.org' + path
    }]
  ]
};