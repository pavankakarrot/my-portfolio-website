import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';
import PropTypes from 'prop-types';

const StyledSkillsSection = styled.section`
  max-width: 900px;
  margin: 0 auto;
  padding: 100px 0;

  .skills-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(280px, 300px));
    gap: 25px;
    margin: 30px 0;
    justify-content: center;

    @media (max-width: 1080px) {
      grid-template-columns: repeat(2, minmax(280px, 300px));
    }

    @media (max-width: 768px) {
      grid-template-columns: minmax(280px, 300px);
    }
  }

  .skill-category {
    background: var(--light-navy);
    padding: 25px;
    border-radius: var(--border-radius);
    transition: all 0.25s ease;

    &:hover {
      transform: translateY(-5px);
      background: var(--lightest-navy);
      box-shadow: 0 8px 20px -15px var(--navy-shadow);
    }

    h3 {
      color: var(--green);
      margin-bottom: 20px;
      font-size: var(--fz-lg);
      position: relative;
      padding-bottom: 8px;
      border-bottom: 1px solid var(--lightest-navy);
    }

    .skill-tree {
      margin: 15px 0;
    }

    .skill-item {
      margin: 12px 0;
      transition: opacity 0.2s ease;

      &:before {
        content: '▹';
        margin-right: 10px;
        color: var(--green);
      }
    }

    .progress-bar {
      height: 4px;
      background: var(--navy);
      border-radius: 2px;
      margin: 6px 0;
      overflow: hidden;

      .fill {
        height: 100%;
        background: var(--green);
        transition: width 0.5s ease-in-out;
      }
    }

    .skill-name {
      display: flex;
      justify-content: space-between;
      font-family: var(--font-mono);
      font-size: var(--fz-sm);
      color: var(--slate);
    }
  }
`;

const SkillCategory = ({ title, skills }) => (
  <div className="skill-category">
    <h3>{title}</h3>
    {skills.map((skill, i) => (
      <div className="skill-tree" key={i}>
        <div className="skill-item">
          <div className="skill-name">
            <span>{skill.name}</span>
            <span>{skill.level}%</span>
          </div>
          <div className="progress-bar">
            <div className="fill" style={{ width: `${skill.level}%` }} />
          </div>
        </div>
        {skill.subSkills?.map((subSkill, j) => (
          <div className="skill-item" key={j} style={{ marginLeft: '20px' }}>
            <div className="skill-name">
              <span>{subSkill.name}</span>
              <span>{subSkill.level}%</span>
            </div>
            <div className="progress-bar">
              <div className="fill" style={{ width: `${subSkill.level}%` }} />
            </div>
          </div>
        ))}
      </div>
    ))}
  </div>
);

SkillCategory.propTypes = {
  title: PropTypes.string.isRequired,
  skills: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      level: PropTypes.number.isRequired,
      subSkills: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          level: PropTypes.number.isRequired,
        }),
      ),
    }),
  ).isRequired,
};

const Skills = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const skillData = {
    'Data Visualization': [
        {
            name: 'Power BI',
            level: 90,
        },
        {
            name: 'Tableau',
            level: 80,
        },
        {
            name: 'Advanced Excel',
            level: 85,
        },
        {
            name: 'PowerPoint',
            level: 85,
        },
        {
            name: 'Looker',
            level: 80,
        },
        {
            name: 'Google Analytics (GA4)',
            level: 80,
        }
    ],
    'Programming & Databases': [
        {
            name: 'SQL',
            level: 85,
        },
        {
            name: 'Python',
            level: 80,
        },
        {
            name: 'Pandas & Numpy',
            level: 85,
        },
        {
            name: 'Seaborn & Matplotlib',
            level: 80,
        },
        {
            name: 'Scikit-learn',
            level: 75,
        },
        {
            name: 'Power Query',
            level: 80,
        }
    ],
    'Data Management': [
        {
            name: 'Data Cleaning & Preprocessing',
            level: 85,
        },
        {
            name: 'ETL Processes',
            level: 80,
        },
        {
            name: 'Data Modeling',
            level: 80,
        }
    ],
    'Statistical Analysis': [
        {
            name: 'Descriptive Statistics',
            level: 85,
        },
        {
            name: 'Inferential Statistics',
            level: 80,
        },
        {
            name: 'Regression Analysis',
            level: 85,
        },
        {
            name: 'Time Series Analysis',
            level: 80,
        }
    ],
    'Business Tools': [
        {
            name: 'Microsoft Stack',
            level: 85,
        },
        {
            name: 'Github',
            level: 80,
        },
        {
            name: 'Shopify',
            level: 80,
        },
        {
            name: 'WordPress',
            level: 80,
        },
        {
            name: 'Google Cloud',
            level: 75,
        }
    ],
    'Soft Skills': [
        {
            name: 'Problem-Solving',
            level: 90,
        },
        {
            name: 'Stakeholder Communication',
            level: 85,
        },
        {
            name: 'Teamwork',
            level: 90,
        },
        {
            name: 'Attention to Detail',
            level: 85,
        },
        {
            name: 'Executive Presentations',
            level: 85,
        }
    ]
};

  return (
    <StyledSkillsSection id="skills" ref={revealContainer}>
      <h2 className="numbered-heading">Skills & Expertise</h2>
      <div className="skills-grid">
        {Object.entries(skillData).map(([category, skills]) => (
          <SkillCategory key={category} title={category} skills={skills} />
        ))}
      </div>
    </StyledSkillsSection>
  );
};

export default Skills;
