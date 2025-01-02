---
title: 'Inventory Analysis: Optimize Your Stock, Maximize Your Profits'
date: '2024-01-15'
category: 'business'
tools:
  - 'Python'
  - 'Tableau'
  - 'SQL'
  - 'Pandas'
slug: 'case-studies/business-performance/inventory-analysis'
tableauUrl: 'https://public.tableau.com/views/Book1_17358323575450/Dashboard1?:showVizHome=no&:embed=true'
---

# Inventory Analysis: Optimize Your Stock, Maximize Your Profits

<div style="text-align: center; margin: 40px 0;">
  <a 
    href="/presentations/inventory-analysis.pptx" 
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

A comprehensive view of inventory levels, sales patterns, and stock forecasts. Get recommended stock levels and identify optimal inventory targets to streamline your supply chain management.


I understand you want a comprehensive case study on inventory management analysis, incorporating your Python code, Tableau process, and detailed business insights. I'll help structure this with all the technical details and observations you've shared.

### 1. Business Problem/Context

The business faces inventory management challenges in the spirits/liquor distribution sector. Key issues include:
- Inefficient stock level management
- Inconsistent supply chain timelines
- Suboptimal vendor relationships
- Need for data-driven inventory decisions

### 2. Data Cleaning & Processing

Our dataset included six key tables:
```python
# Import necessary libraries
import pandas as pd
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt

# Handle missing values
cols_to_check = ['Description', 'Size', 'Volume']
for col in cols_to_check:
    purchase_prices = purchase_prices[purchase_prices[col].notna()]

if end_inv['Store'].nunique() == end_inv['City'].nunique():
    city_store_mapping = end_inv[['Store', 'City']].drop_duplicates().set_index('Store').to_dict()['City']
    end_inv['City'] = end_inv['City'].fillna(end_inv['Store'].map(city_store_mapping))
else:
    end_inv['City'].fillna('Unknown', inplace=True)

# Calculate supply and payment durations
purchases['PODate'] = pd.to_datetime(purchases['PODate'])
purchases['ReceivingDate'] = pd.to_datetime(purchases['ReceivingDate'])
purchases['SupplyDuration'] = (purchases['ReceivingDate'] - purchases['PODate']).dt.days

purchases['InvoiceDate'] = pd.to_datetime(purchases['InvoiceDate'])
purchases['PayDate'] = pd.to_datetime(purchases['PayDate'])
purchases['PaymentDuration'] = (purchases['PayDate'] - purchases['InvoiceDate']).dt.days
```

### 3. Data Upload & Analysis in Tableau Public

Methodology:
1. Created calculated fields for:
   - Daily Sales Rate
   - Current Stock Levels
   - Supply Duration Analysis
   - Payment Timeline Analysis

2. Developed key metrics:
```
Daily Sales Rate Formula:
{FIXED [Brand], [Description]: SUM([SalesQuantity])} / 
{FIXED : DATEDIFF('day', MIN([SalesDate]), MAX([SalesDate]))}

Current Stock Formula:
{FIXED [Brand], [Description], [endDate]: SUM([onHand])}
```

### 4. Visualization Process

Created five interconnected visualizations:

1. Best Selling Products Analysis
- Bar chart showing sales quantity distribution
- Highlighted cyclical patterns
- Identified key products like "Smirnoff 80 Proof"

2. Vendor Purchase Cost Analysis
- Horizontal bar chart for top vendors
- Color gradient to emphasize cost differences
- DIAGEO NORTH AMERICA INC leading at $3.92M

3. Supply Chain Duration Analysis
- Dual-axis chart comparing supply vs payment durations
- Distribution analysis showing 7.62 days average supply time
- Payment cycles averaging 35.66 days

4. Stock Level Recommendations
- Combined bar chart comparing current vs recommended levels
- Product-specific analysis
- Highlighted critical stock points

### 5. Business Insights

1. Vendor Management:
- DIAGEO NORTH AMERICA INC dominates purchases ($3.92M)
- Top 3 vendors account for 47% of total purchase costs
- 1.5M gap between top and second vendor

2. Supply Chain Efficiency:
- Average supply duration: 7.62 days
- Payment cycles: 35.66 days
- Regular supply patterns at 4, 6, 8, 10, and 12-day intervals

3. Product Performance:
- Smirnoff 80 Proof leads sales consistently
- Weekly sales patterns identified
- January 25th showed significant sales peak

### 6. Challenges & Learnings

Technical Challenges:
1. Data Integration:
- Handling multiple date formats
- Resolving aggregation issues in Tableau
- Creating proper level of detail expressions

2. Analysis Complexity:
- Balancing stock recommendations
- Accounting for seasonality
- Creating meaningful visualizations

Learnings:
1. Technical Skills:
- Advanced LOD expressions
- Complex calculated fields
- Data relationship management

2. Business Understanding:
- Inventory optimization principles
- Supply chain metrics
- Vendor relationship dynamics
