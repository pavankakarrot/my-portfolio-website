
# UK Online Retail Store - Customer Cohort Analysis Case Study

## 1. Business Problem/Context
The UK-based online retail company specializes in unique all-occasion gifts, with a significant portion of their customer base being wholesalers. The business needs to understand:
- Customer retention patterns
- Revenue generation by different customer cohorts
- Customer lifetime value metrics
- Effectiveness of their current business model
The analysis covers transactions from December 2010 to December 2011.

## 2. Data Cleaning & Processing with Python Code
Initial data cleaning steps included:
```python
import pandas as pd
import numpy as np

# Load the data
df = pd.read_excel('Online Retail.xlsx')

# Clean the data
df.drop_duplicates(inplace=True)
df = df[(df['Quantity'] > 0) & 
        (df['UnitPrice'] > 0) & 
        (df['CustomerID'].notnull())]

# Create necessary fields for cohort analysis
df['TotalAmount'] = df['Quantity'] * df['UnitPrice']
df['InvoiceDate'] = pd.to_datetime(df['InvoiceDate'])
df['CohortMonth'] = df['InvoiceDate'].dt.to_period('M')

# Calculate months since first purchase
df['MonthsFromFirstPurchase'] = (df['InvoiceDate'].dt.year - df['FirstPurchaseDate'].dt.year) * 12 + \
                               (df['InvoiceDate'].dt.month - df['FirstPurchaseDate'].dt.month)
```

## 3. Analysis Results

### Customer Retention Analysis:
- December 2010 cohort showed strongest retention (37% after first month)
- Significant drop in retention after first purchase across all cohorts
- Winter months show better retention than summer months
- Long-term retention (12+ months) only achieved by earliest cohort

### Revenue Generation:
- Initial cohort (Dec 2010) generated highest revenue (£570K first month)
- Strong seasonal pattern in revenue generation
- Early 2011 cohorts show better sustained revenue
- Cumulative revenue highest for December 2010 cohort (£4.5M over 12 months)

### Customer Lifetime Value (CLV):
- December 2010 cohort achieved highest sustained CLV
- Average initial CLV ranges £400-£700
- Later cohorts show lower CLV progression
- Seasonal impact visible in CLV development

## 4. Business Insights

Key Findings:
1. Seasonal Impact:
   - Winter months are crucial for customer acquisition
   - Higher initial purchase values in winter cohorts
   - Better retention rates in winter cohorts

2. Customer Behavior:
   - Sharp drop in retention after first purchase
   - Early cohorts show better long-term value
   - Significant variation in customer lifetime value

3. Revenue Patterns:
   - Strong initial revenue followed by rapid decline
   - Early cohorts maintain better revenue streams
   - Seasonal impact on revenue generation

## 5. Recommendations

1. Customer Acquisition:
   - Focus acquisition efforts on winter months
   - Develop targeted strategies for summer months
   - Investigate and replicate success factors of December 2010 cohort

2. Retention Strategy:
   - Implement strong onboarding in first 30 days
   - Develop loyalty programs for long-term engagement
   - Create special programs for high-value customers

3. Revenue Optimization:
   - Focus on converting one-time buyers
   - Develop strategies to increase average order value
   - Create targeted promotions for low-revenue periods

## 6. Challenges & Learnings
- Understanding cohort behavior patterns
- Identifying seasonal impacts on business
- Developing actionable insights from complex data
- Creating meaningful visualizations for stakeholder communication
