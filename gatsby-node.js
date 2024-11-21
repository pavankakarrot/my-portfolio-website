const path = require('path');

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;

  console.log('Starting page creation...');

  const result = await graphql(`
    {
      allMarkdownRemark(
        filter: { 
          fileAbsolutePath: { regex: "/projects/[^/]+/index/i" }
        }
        sort: { frontmatter: { date: DESC } }
      ) {
        edges {
          node {
            frontmatter {
              slug
              title
            }
            fileAbsolutePath
          }
        }
      }
    }
  `);

  console.log('GraphQL Result:', JSON.stringify(result, null, 2));

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query: ${result.errors}`);
    return;
  }

  // Ensure we have edges to process
  if (!result.data?.allMarkdownRemark?.edges) {
    reporter.warn('No markdown files found');
    return;
  }

  // Create pages for each markdown file
  const projectTemplate = path.resolve(`./src/templates/project.js`);
  
  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    const { slug, title } = node.frontmatter;

    if (!slug) {
      reporter.warn(`Skipping page creation for ${node.fileAbsolutePath} - missing slug`);
      return;
    }

    console.log(`Creating page for: ${title || 'Untitled'} (${slug})`);
    
    createPage({
      path: slug,
      component: projectTemplate,
      context: {
        slug: slug,
      },
    });
  });

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