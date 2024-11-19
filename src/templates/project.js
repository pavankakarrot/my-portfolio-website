import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import { Layout } from '@components';
import PropTypes from 'prop-types';

const StyledProjectSection = styled.section`
  max-width: 900px;
  margin: 0 auto;
  padding: 100px 0;
`;

const ProjectTemplate = ({ data, location }) => {
  const { frontmatter, html } = data.markdownRemark;

  return (
    <Layout location={location}>
      <StyledProjectSection>
        <span className="breadcrumb">
          <a href="/">Home</a> / <span>{frontmatter.title}</span>
        </span>

        <h1>{frontmatter.title}</h1>

        {frontmatter.tech && (
          <div className="tech-list">
            {frontmatter.tech.map((tech, i) => (
              <span key={i}>{tech}</span>
            ))}
          </div>
        )}

        <div className="project-container">
          <div className="project-content" dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </StyledProjectSection>
    </Layout>
  );
};

ProjectTemplate.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.shape({
        title: PropTypes.string.isRequired,
        tech: PropTypes.arrayOf(PropTypes.string),
        github: PropTypes.string,
        external: PropTypes.string,
        cta: PropTypes.string,
        cover: PropTypes.object,
      }).isRequired,
      html: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  location: PropTypes.object.isRequired,
};

export default ProjectTemplate;

export const pageQuery = graphql`
  query ($slug: String!) {
    markdownRemark(
      frontmatter: { slug: { eq: $slug } }
      fileAbsolutePath: { regex: "/content/projects/" }
    ) {
      html
      frontmatter {
        title
        tech
        github
        external
        cta
        cover {
          childImageSharp {
            gatsbyImageData(width: 700, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
          }
        }
      }
    }
  }
`;
