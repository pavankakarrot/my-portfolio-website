import React from 'react';
import { graphql, Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { Layout } from '@components';
import PropTypes from 'prop-types';
import { Icon } from '@components/icons';

const StyledProjectSection = styled.section`
  max-width: 1000px;
  margin: 0 auto;
  padding: 100px 20px;

  @media (max-width: 768px) {
    padding: 80px 20px;
  }

  .breadcrumb {
    display: block;
    margin-bottom: 50px;
    color: var(--light-slate);
    font-family: var(--font-mono);
    font-size: var(--fz-sm);

    a {
      color: var(--green);
      &:hover,
      &:focus {
        text-decoration: underline;
      }
    }

    span {
      color: var(--light-slate);
    }
  }

  h1 {
    font-size: clamp(40px, 5vw, 60px);
    margin: 0 0 30px;
    color: var(--lightest-slate);
  }

  .project-meta {
    margin-bottom: 40px;
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    align-items: center;

    .project-links {
      display: flex;
      align-items: center;
      gap: 15px;
      
      a {
        padding: 12px;
        background-color: var(--light-navy);
        border-radius: 8px;
        color: var(--lightest-slate);
        transition: var(--transition);

        &:hover {
          background-color: var(--green-tint);
        }

        svg {
          width: 24px;
          height: 24px;
        }
      }
    }

    .platform-badges {
      display: flex;
      gap: 10px;
      
      span {
        padding: 6px 12px;
        border-radius: 4px;
        font-size: var(--fz-xs);
        font-family: var(--font-mono);
        background-color: var(--green-tint);
        color: var(--green);
      }
    }
  }

  .tech-list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 40px;

    span {
      padding: 8px 16px;
      background-color: var(--light-navy);
      color: var(--light-slate);
      border-radius: 4px;
      font-size: var(--fz-sm);
      font-family: var(--font-mono);
    }
  }

  .project-image {
    margin-bottom: 40px;
    border-radius: var(--border-radius);
    overflow: hidden;
    
    .gatsby-image-wrapper {
      width: 100%;
      height: auto;
      mix-blend-mode: multiply;
      filter: grayscale(100%) contrast(1) brightness(90%);
      
      &:hover {
        filter: none;
        mix-blend-mode: normal;
      }
    }
  }

  .project-container {
    .project-content {
      color: var(--light-slate);
      font-size: var(--fz-lg);

      a {
        ${({ theme }) => theme.mixins.inlineLink};
      }

      h1, h2, h3, h4, h5, h6 {
        color: var(--lightest-slate);
        margin: 2em 0 1em;
      }

      p {
        margin-bottom: 1.5em;
        line-height: 1.7;
      }

      ul, ol {
        padding-left: 2em;
        margin-bottom: 1.5em;
      }

      li {
        margin-bottom: 0.5em;
      }

      code {
        background-color: var(--light-navy);
        color: var(--lightest-slate);
        padding: 0.2em 0.4em;
        border-radius: 3px;
        font-size: var(--fz-sm);
        font-family: var(--font-mono);
      }

      pre {
        background-color: var(--light-navy);
        padding: 1.5em;
        border-radius: var(--border-radius);
        overflow-x: auto;
        margin-bottom: 1.5em;
      }
    }
  }
`;

const Project = ({ data, location }) => {
  const { frontmatter, html } = data.markdownRemark;
  const coverImage = getImage(frontmatter.cover);

  return (
    <Layout location={location}>
      <StyledProjectSection>
        <div className="breadcrumb">
          <Link to="/">Home</Link> / <span>{frontmatter.title}</span>
        </div>

        <h1>{frontmatter.title}</h1>

        <div className="project-meta">
          <div className="project-links">
            {frontmatter.github && (
              <a href={frontmatter.github} target="_blank" rel="noreferrer" aria-label="GitHub Link">
                <Icon name="GitHub" />
              </a>
            )}
            {frontmatter.external && (
              <a href={frontmatter.external} target="_blank" rel="noreferrer" aria-label="External Link">
                <Icon name="External" />
              </a>
            )}
          </div>
        </div>

        {frontmatter.tech && (
          <div className="tech-list">
            {frontmatter.tech.map((tech, i) => (
              <span key={i}>{tech}</span>
            ))}
          </div>
        )}

        {coverImage && (
          <div className="project-image">
            <GatsbyImage image={coverImage} alt={frontmatter.title} />
          </div>
        )}

        <div className="project-container">
          <div className="project-content" dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </StyledProjectSection>
    </Layout>
  );
};

Project.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.shape({
        title: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        tech: PropTypes.arrayOf(PropTypes.string),
        github: PropTypes.string,
        external: PropTypes.string,
        cover: PropTypes.object,
      }).isRequired,
      html: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  location: PropTypes.object.isRequired,
};

// Make sure to export as default
export default Project;

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date
        github
        external
        tech
        cover {
          childImageSharp {
            gatsbyImageData(
              width: 1200
              quality: 90
              placeholder: BLURRED
              layout: CONSTRAINED
            )
          }
        }
      }
    }
  }
`;