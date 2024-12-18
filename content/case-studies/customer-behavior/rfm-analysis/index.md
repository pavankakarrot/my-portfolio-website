---
title: 'RFM Analysis'
date: '2024-01-15'
category: 'customer-behavior'
slug: 'case-studies/customer-behavior/rfm-analysis'
tools:
  - 'Python'
  - 'Tableau'
  - 'SQL'
tableauUrl: 'https://public.tableau.com/views/Book1_17337693683590/Dashboard1?:showVizHome=no&:embed=true"'
pptUrl: '/presentations/rfm-analysis.pptx'
---


# Retail Customer Segmentation: RFM Analysis Case Study

### Table of Contents:
1. Business Problem/Context
2. Data Collection & Preparation
3. Methodology & Implementation
4. Tableau Visualization Process
5. Business Insights
6. Challenges & Learnings


<div style="text-align: center; margin: 40px 0;">
  <a 
    href="/presentations/rfm-analysis.pptx" 
    style="
      display: inline-block;
      padding: 15px 30px;
      border: 2px solid var(--green);
      border-radius: 4px;
      color: var(--green);
      font-family: var(--font-mono);
      font-size: 16px;
      text-decoration: none;
      transition: all 0.25s cubic-bezier(0.645,0.045,0.355,1);
      background-color: transparent;
    "
    onmouseover="this.style.backgroundColor='var(--green-tint)'"
    onmouseout="this.style.backgroundColor='transparent'"
  >
    📊 Download Complete Presentation (PPT)
  </a>
</div>

## 1. Business Problem/Context

### Background
Our retail business faced challenges in effectively targeting marketing efforts and optimizing customer engagement strategies. With a diverse customer base and varying purchase patterns, we needed a data-driven approach to segment customers and personalize our marketing initiatives.

### Business Objectives
1. Develop a customer segmentation framework using RFM analysis
2. Identify high-value customer groups and at-risk customers
3. Optimize marketing resource allocation based on customer segments
4. Improve customer retention rates through targeted engagement

### Key Questions
- Who are our most valuable customers?
- Which customer segments are at risk of churning?
- How can we tailor our marketing strategies for different segments?
- Where are the opportunities to increase customer lifetime value?

### Success Metrics
- Reduction in Lost Customer segment (Target: 15%)
- Increase in Regular to Loyal customer conversion (Target: 10%)
- Improvement in Q4 performance (Target: 20%)
- Enhanced customer engagement rates across segments

## 2. Data Collection & Preparation

### Data Quality Assessment
Initial analysis revealed:
- Missing values in CustomerID (10%)
- Missing ShippingCost data (5%)
- Incomplete WarehouseLocation information (7%)
- No duplicate transactions identified

### Data Cleaning Approach
1. Customer ID Treatment:
   - Generated unique guest IDs (90000+) for missing CustomerIDs
   - Ensured continuity in customer tracking

2. Missing Value Handling:
   - ShippingCost: Filled with country-wise median values
   - WarehouseLocation: Used mode imputation
   - Validated data completeness post-cleaning

### Star Schema Implementation
Created optimized tables for analysis:
- fact_sales: Core transaction metrics
- dim_customer: Customer attributes
- dim_product: Product information
- dim_shipment: Shipping details
- dim_date: Temporal attributes

## 3. Methodology & Implementation

### RFM Scoring Approach
1. Recency:
   - Based on days since last purchase
   - Scored 1-4 (4 being most recent)
   - Thresholds: 30, 90, 180 days

2. Frequency:
   - Based on number of purchases
   - Scored 1-4 (4 being most frequent)
   - Used distribution-based thresholds

3. Monetary:
   - Based on total customer spend
   - Scored 1-4 (4 being highest value)
   - Used quartile-based scoring

### Customer Segmentation Logic
- Champions (Score: 10-12)
- Loyal Customers (Score: 7-9)
- Regular Customers (Score: 6)
- At Risk Customers (Score: 4-5)
- Lost Customers (Score: 3)

## 4. Tableau Visualization Process

### Dashboard Structure
1. Customer Distribution Analysis:
   - Bar charts for segment distribution
   - Revenue contribution visualization
   - Average Order Value comparison

2. Temporal Analysis:
   - Monthly revenue trends
   - Customer count evolution
   - Average order value patterns

3. Dimensional Analysis:
   - Geographic distribution
   - Shipment provider analysis
   - Payment method preferences

### Key Calculated Fields
```
// Example of RFM Score Calculation
RFM Score = [Monetary Score] + [Recency Score] + [Frequency Score]

// Customer Segmentation Logic
Customer Segment = 
IF [RFM Score] >= 10 THEN 'Champions'
ELSEIF [RFM Score] >= 7 AND [RFM Score] < 10 THEN 'Loyal Customers'
...
```

## 5. Business Insights

### Key Findings
1. Customer Value Paradox:
   - 44.34% Lost Customers contribute only 13.77% revenue
   - 22.88% Regular Customers drive 41.3% revenue
   - Champions (0.57%) maintain highest AOV at 1.4K

2. Seasonal Patterns:
   - Strong performance June-August
   - Universal decline post-August
   - Consistent geographic performance with exceptions in France, Norway, Spain

### Actionable Recommendations
1. Short-term (0-3 months):
   - Implement Q4 decline mitigation strategies
   - Develop Regular Customer retention program
   - Optimize shipping costs with FedEx

2. Medium-term (3-6 months):
   - Design segment upgrade pathways
   - Develop geographic expansion strategy
   - Plan seasonal customer acquisition

3. Long-term (6-12 months):
   - Rebalance customer base
   - Expand market presence
   - Optimize seasonal business patterns

## 6. Challenges & Learnings

### Technical Challenges
1. Data Relationship Issues:
   - Initially encountered many-to-many relationships
   - Resolved through proper star schema implementation
   - Improved data model efficiency

2. Calculation Complexity:
   - Addressed aggregation issues in RFM scoring
   - Optimized calculated fields for performance
   - Enhanced visualization accuracy

### Business Learnings
1. Customer Behavior Patterns:
   - Identified critical seasonal dependencies
   - Understood value migration patterns
   - Recognized operational preferences

2. Future Improvements:
   - Implement predictive churn modeling
   - Develop real-time segmentation updates
   - Create automated reporting systems