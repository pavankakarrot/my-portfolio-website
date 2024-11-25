import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  height: 100vh;
  padding: 0;

  @media (max-height: 700px) and (min-width: 700px), (max-width: 360px) {
    height: auto;
    padding-top: var(--nav-height);
  }

  h1 {
    margin: 0 0 30px 4px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  h3 {
    margin-top: 5px;
    color: var(--slate);
    line-height: 0.9;
  }

  p {
    margin: 20px 0 0;
    max-width: 540px;
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }
`;

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const one = <h4>Hi, my name is</h4>;
  const two = <h3 className="big-heading">Pavan Tummalapenta.</h3>;
  const three = <h4 className="big-heading">Data Analytics Strategist</h4>;
  const four = (
    <p>
      Transforming raw data into revenue-driving insights, I specialize in building analytical frameworks that power business decisions. 
      As an e-commerce analytics specialist, I develop custom KPIs and performance metrics that translate complex data into measurable business growth.
    </p>
  );
  const five = (
    <div className="specializations">
      <h4>Specializing in:</h4>
      <ul>
        <li>Data Visualization & Dashboard Development</li>
        <li>E-commerce Analytics & User Behavior Analysis</li>
        <li>Predictive Modeling & Machine Learning</li>
        <li>KPI Development & Performance Metrics</li>
        <li>Business Intelligence & Strategic Analysis</li>
      </ul>
    </div>
  );
  const six = (
    <a
      className="email-link"
      href="https://www.linkedin.com/in/pavan-tummalapenta"
      target="_blank"
      rel="noreferrer">
      Leave a message!
    </a>
  );
  const items = [one, two, three, four, five];

  return (
    <StyledHeroSection>
      {prefersReducedMotion ? (
        <>
          {items.map((item, i) => (
            <div key={i}>{item}</div>
          ))}
        </>
      ) : (
        <TransitionGroup component={null}>
          {isMounted &&
            items.map((item, i) => (
              <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
              </CSSTransition>
            ))}
        </TransitionGroup>
      )}
    </StyledHeroSection>
  );
};

export default Hero;
