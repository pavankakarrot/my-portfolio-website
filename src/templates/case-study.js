import React, { useEffect, useRef } from 'react';
import { graphql, Link } from 'gatsby';
import styled from 'styled-components';
import { Layout } from '@components';
import PropTypes from 'prop-types';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledCaseStudySection = styled.section`
  max-width: 1000px;
  margin: 0 auto;
  padding: 100px 20px;

  .breadcrumb {
    margin-bottom: 50px;
    color: var(--light-slate);
    font-family: var(--font-mono);
    font-size: var(--fz-sm);

    a {
      color: var(--green);
    }
  }

  .case-study-header {
    margin-bottom: 50px;

    h1 {
      font-size: clamp(40px, 5vw, 60px);
      margin-bottom: 20px;
    }

    .metadata {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      margin-bottom: 30px;

      .category {
        color: var(--green);
        font-family: var(--font-mono);
      }

      .tools {
        display: flex;
        gap: 10px;
        
        span {
          padding: 5px 10px;
          background: var(--light-navy);
          border-radius: var(--border-radius);
          font-size: var(--fz-xxs);
        }
      }
    }
  }

  .visualization-embed {
    margin: 40px 0;
    padding: 20px;
    background: var(--light-navy);
    border-radius: var(--border-radius);
    min-height: 500px;
  }

  .case-study-content {
    color: var(--light-slate);
    
    h2 {
      color: var(--lightest-slate);
      margin: 60px 0 20px;
    }

    h3 {
      color: var(--white);
      margin: 40px 0 20px;
    }

    p {
      margin-bottom: 20px;
      line-height: 1.7;
    }

    ul, ol {
      padding-left: 20px;
      margin-bottom: 20px;
    }

    li {
      margin-bottom: 10px;
    }

    code {
      background: var(--light-navy);
      padding: 2px 6px;
      border-radius: 4px;
      font-family: var(--font-mono);
      font-size: var(--fz-sm);
    }

    pre {
      background: var(--light-navy);
      padding: 20px;
      border-radius: var(--border-radius);
      overflow-x: auto;
      margin: 20px 0;
    }

    blockquote {
      border-left: 2px solid var(--green);
      padding-left: 20px;
      margin: 20px 0;
      font-style: italic;
    }
  }
`;

const CaseStudy = ({ data, location }) => {
  const { frontmatter, html } = data.markdownRemark;
  const revealTitle = useRef(null);
  const revealContent = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    sr.reveal(revealTitle.current, srConfig());
    sr.reveal(revealContent.current, srConfig(200));
  }, [prefersReducedMotion]);

  return (
    <Layout location={location}>
      <StyledCaseStudySection>
        <div className="breadcrumb">
          <Link to="/">Home</Link> /{' '}
          <Link to="/#analysis-models">Analysis Models</Link> /{' '}
          <span>{frontmatter.title}</span>
        </div>

        <div className="case-study-header" ref={revealTitle}>
          <h1>{frontmatter.title}</h1>
          
          <div className="metadata">
            <div className="category">{frontmatter.category}</div>
            <div className="tools">
              {frontmatter.tools.map((tool, i) => (
                <span key={i}>{tool}</span>
              ))}
            </div>
          </div>

          {frontmatter.tableauUrl && frontmatter.tableauUrl.includes('tableau.com') && (
            <div className="visualization-embed">
              <iframe
                src={frontmatter.tableauUrl}
                width="100%"
                height="600"
                frameBorder="0"
                allowFullScreen
              />
            </div>

          )}
        </div>

        <div 
          className="case-study-content"
          ref={revealContent}
          dangerouslySetInnerHTML={{ __html: html }} 
        />
      </StyledCaseStudySection>
    </Layout>
  );
};

CaseStudy.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.shape({
        title: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        tools: PropTypes.arrayOf(PropTypes.string).isRequired,
        tableauUrl: PropTypes.string,
      }).isRequired,
      html: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  location: PropTypes.object.isRequired,
};

export default CaseStudy;

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        category
        tools
        tableauUrl
      }
    }
  }
`;