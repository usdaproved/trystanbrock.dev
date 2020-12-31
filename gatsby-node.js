const path = require(`path`);

exports.onCreateNode = ({ node, getNode, actions }) => {
    const { createNodeField } = actions;
    if(node.internal.type === `MarkdownRemark`){
        const fileNode = getNode(node.parent);

        // Cuts off the .md, wraps in //
        let slug = `/${fileNode.relativePath.slice(0, -3)}/`;
        createNodeField({
            node,
            name: `slug`,
            value: slug,
        });
    }
};

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions;
    const result = await graphql(`
    query {
        allMarkdownRemark {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }
    `);
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        createPage({
            path: node.fields.slug,
            component: path.resolve(`./src/templates/post.js`),
            context: {
                slug: node.fields.slug,
            },
        });
    });
};