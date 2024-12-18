const path = require('path');

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;

  console.log('Starting page creation...');

  const result = await graphql(`
    {
      projects: allMarkdownRemark(
        filter: { 
          fileAbsolutePath: { regex: "/projects/[^/]+/index/i" }
        }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            frontmatter {
              slug
              title
              date
              category
              tools
              tableauUrl
            }
            fileAbsolutePath
          }
        }
      }
      caseStudies: allMarkdownRemark(
        filter: { 
          fileAbsolutePath: { regex: "/case-studies/.+/.+/index.md/" }
        }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            frontmatter {
              slug
              title
              date
              category
              tools
              tableauUrl
            }
            fileAbsolutePath
          }
        }
      }
    }
  `);

  // Rest of your code remains the same

  console.log('GraphQL Result:', JSON.stringify(result, null, 2));

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query: ${result.errors}`);
    return;
  }

  // Create project pages
  const projectTemplate = path.resolve(`./src/templates/project.js`);
  if (result.data?.projects?.edges) {
    result.data.projects.edges.forEach(({ node }) => {
      const { slug, title } = node.frontmatter;

      if (!slug) {
        reporter.warn(`Skipping project page creation for ${node.fileAbsolutePath} - missing slug`);
        return;
      }

      console.log(`Creating project page for: ${title || 'Untitled'} (${slug})`);
      
      createPage({
        path: slug,
        component: projectTemplate,
        context: {
          slug: slug,
        },
      });
    });
  } else {
    reporter.warn('No project markdown files found');
  }

  // Create case study pages
  const caseStudyTemplate = path.resolve(`./src/templates/case-study.js`);
  if (result.data?.caseStudies?.edges) {
    result.data.caseStudies.edges.forEach(({ node }) => {
      const { slug, title } = node.frontmatter;

      if (!slug) {
        reporter.warn(`Skipping case study page creation for ${node.fileAbsolutePath} - missing slug`);
        return;
      }

      // Ensure the path starts with a forward slash
      const pagePath = slug.startsWith('/') ? slug : `/${slug}`;
      
      console.log(`Creating case study page for: ${title || 'Untitled'} (${pagePath})`);
      
      createPage({
        path: pagePath,
        component: caseStudyTemplate,
        context: {
          slug: slug,
        },
      });
    });
  } else {
    reporter.warn('No case study markdown files found');
  }

  console.log('Finished creating pages');
};

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      html: String
    }
    
    type Frontmatter {
      title: String!
      date: String!
      cover: File @fileByRelativePath
      github: String
      external: String
      tech: [String]!
      slug: String!
      showInProjects: Boolean
      cta: String
      category: String
      tools: [String]
      tableauUrl: String
    }
  `;
  createTypes(typeDefs);
};

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === 'build-html' || stage === 'develop-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /scrollreveal/,
            use: loaders.null(),
          },
          {
            test: /animejs/,
            use: loaders.null(),
          },
          {
            test: /miniraf/,
            use: loaders.null(),
          },
        ],
      },
    });
  }

  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@components': path.resolve(__dirname, 'src/components'),
        '@config': path.resolve(__dirname, 'src/config'),
        '@fonts': path.resolve(__dirname, 'src/fonts'),
        '@hooks': path.resolve(__dirname, 'src/hooks'),
        '@images': path.resolve(__dirname, 'src/images'),
        '@pages': path.resolve(__dirname, 'src/pages'),
        '@styles': path.resolve(__dirname, 'src/styles'),
        '@utils': path.resolve(__dirname, 'src/utils'),
      },
    },
  });
};