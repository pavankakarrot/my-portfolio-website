import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { Icon } from '@components/icons';
import { usePrefersReducedMotion } from '@hooks';

const StyledModelsSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 100px 0;

  .category-tabs {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 15px;
    margin-bottom: 40px;
    width: 100%;

    button {
      ${({ theme }) => theme.mixins.link};
      padding: 12px 20px;
      background: var(--light-navy);
      border-radius: var(--border-radius);
      font-size: var(--fz-sm);
      
      &.active {
        background: var(--green);
        color: var(--navy);
      }
    }
  }

  .models-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 25px;
    width: 100%;
    margin-top: 50px;
    padding: 0 20px;

    @media (max-width: 1080px) {
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    }
  }
`;

const StyledModelCard = styled.div`
  ${({ theme }) => theme.mixins.boxShadow};
  position: relative;
  background-color: var(--light-navy);
  padding: 25px;
  border-radius: var(--border-radius);
  transition: var(--transition);

  &:hover {
    transform: translateY(-5px);
  }

  h3 {
    margin: 0 0 15px;
    color: var(--lightest-slate);
  }

  .model-links {
    display: flex;
    gap: 15px;
    margin-top: 20px;

    a {
      padding: 10px 15px;
      border-radius: var(--border-radius);
      font-size: var(--fz-xs);
      
      &.case-study {
        background: var(--green);
        color: var(--navy);
      }
      
      &.visualization {
        background: var(--light-slate);
        color: var(--navy);
      }
    }
  }

  .tools-used {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 15px;

    span {
      font-family: var(--font-mono);
      font-size: var(--fz-xxs);
      padding: 4px 8px;
      background: var(--navy);
      border-radius: 4px;
    }
  }
`;

const AnalysisModels = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const revealTitle = useRef(null);
  const revealModels = useRef([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  const categories = [
    { id: 'all', name: 'All Models' },
    { id: 'customer', name: 'Customer Behavior' },
    { id: 'business', name: 'Business Performance' },
    { id: 'product', name: 'Product Analysis' },
    { id: 'statistical', name: 'Statistical Analysis' },
    { id: 'advanced', name: 'Advanced Analytics' },
    { id: 'financial', name: 'Financial Analytics' }
  ];

  // Sample data structure - replace with your actual data
  const models = [
    {
      title: 'Customer Value Optimization: Advanced RFM Analytics',
      category: 'customer',
      description: 'Developed a sophisticated customer segmentation model analyzing $2M+ in transactions using RFM (Recency, Frequency, Monetary) methodology.',
      tools: ['Python', 'Tableau', 'SQL'],
      caseStudyUrl: '/case-studies/customer-behavior/rfm-analysis',
      visualizationUrl: 'https://public.tableau.com/app/profile/pavan.kakarrot/viz/Book1_17337693683590/Dashboard1',
    },
    {
      title: 'E-commerce Customer Retention: Cohort Analysis & Insights',
      category: 'statistical',    // Make sure this matches your category system
      description: 'Engineered a comprehensive cohort analysis framework for a online retailer, analyzing 500,000+ transactions across multiple customer segments.',
      tools: ['Python', 'Tableau', 'SQL'],
      caseStudyUrl: '/case-studies/statistical-analysis/cohort-analysis',
      visualizationUrl: 'https://public.tableau.com/views/Book1_17355657741890/Dashboard1',
    },
    {
      title: 'Supply Chain Optimization: Inventory Analytics',
      category: 'business',
      description: 'Developed an end-to-end inventory optimization solution analyzing 50,000+ SKUs across multiple warehouses. Implemented recomended Stock.',
      tools: ['Python', 'Tableau', 'SQL', 'Pandas'],
      caseStudyUrl: '/case-studies/business-performance/inventory-analysis',
      visualizationUrl: 'https://public.tableau.com/views/Book1_17358323575450/Dashboard1',
    },
    {
      title: 'HR Analytics: Retention Turnover',
      category: 'advanced',
      description: 'Discover how I leveraged Python and Tableau to analyze 11,991 employee records, uncovering critical turnover patterns by different parameters.',
      tools: ['Python', 'Tableau', 'SQL', 'Statistical Analysis', 'Predictive Modeling'],
      caseStudyUrl: '/case-studies/advanced-analytics/hr-analytics',
      visualizationUrl: 'https://public.tableau.com/views/Book1_17362526523090/Dashboard1',
    },
  ];

  const filteredModels = activeCategory === 'all' 
    ? models 
    : models.filter(model => model.category === activeCategory);

  useEffect(() => {
    if (prefersReducedMotion) return;

    sr.reveal(revealTitle.current, srConfig());
    revealModels.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100)));
  }, [prefersReducedMotion]);

  return (
    <StyledModelsSection id="analysis-models">
      <h2 className="numbered-heading" ref={revealTitle}>
        My Data Analysis Models
      </h2>

      <div className="category-tabs">
        {categories.map(({ id, name }) => (
          <button
            key={id}
            className={activeCategory === id ? 'active' : ''}
            onClick={() => setActiveCategory(id)}>
            {name}
          </button>
        ))}
      </div>

      <TransitionGroup className="models-grid">
        {filteredModels.map((model, i) => (
          <CSSTransition
            key={i}
            classNames="fadeup"
            timeout={prefersReducedMotion ? 0 : i >= 6 ? (i - 6) * 100 : 300}
            exit={false}>
            <StyledModelCard
              ref={el => (revealModels.current[i] = el)}
              style={{
                transitionDelay: `${prefersReducedMotion ? 0 : i >= 6 ? (i - 6) * 100 : 0}ms`,
              }}>
              <h3>{model.title}</h3>
              <p>{model.description}</p>
              
              <div className="tools-used">
                {model.tools.map((tool, i) => (
                  <span key={i}>{tool}</span>
                ))}
              </div>

              <div className="model-links">
                <Link to={model.caseStudyUrl}
                      className="case-study"
                >
                 View Case Study
                </Link>
                {model.visualizationUrl &&(
                <a 
                  href={model.visualizationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="visualization">
                  View Visualization
                </a>
                )}
              </div>
            </StyledModelCard>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </StyledModelsSection>
  );
};

export default AnalysisModels;
