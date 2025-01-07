# HR Analytics: Employee Retention Analysis

### 1. Business Problem/Context
- **Company**: Salifort Motors
- **Challenge**: High employee turnover
- **Goal**: Predict employee churn and identify contributing factors
- **Business Impact**: Reduce hiring costs and improve retention

### 2. Data Cleaning & Processing

#### Initial Data Assessment
```python
# Import required libraries
import pandas as pd
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
from scipy import stats

# Read and check data
df0.info()
df0.duplicated().sum()

# Rename columns for consistency
df0 = df0.rename(columns={
    'Work_accident': 'work_accident',
    'average_montly_hours': 'average_monthly_hours',
    'time_spend_company': 'tenure',
    'Department': 'department'
})

# Remove duplicates
df1 = df0.drop_duplicates(keep='first')
```

### 3. Outlier Analysis Summary


**Outlier Detection Methods Explained:**
1. **IQR Method (Box Plot Method)**
   - Like finding shirts that are unusually small or large in a clothing store
   - Creates a "normal range" using the middle 50% of data
   - Anything too far from this range is flagged as unusual

2. **Z-score Method**
   - Like comparing test scores to class average
   - Measures how far each value is from the average
   - Values more than 3 standard deviations away are considered unusual

| Metric | Key Findings & Business Impact |
|--------|-------------------------------|
| Satisfaction Level | • Moderate overall mood (0.63/1.0)<br>• Some very unhappy employees (as low as 0.09)<br>• Potential risk for turnover |
| Last Evaluation | • Generally positive reviews (0.72/1.0)<br>• No extremely poor performers<br>• Consistent evaluation system |
| Project Count | • Most handle 3-4 projects<br>• Some managing 7 projects<br>• Risk of burnout at higher levels |
| Monthly Hours | • Standard 40-hour weeks on average<br>• Some working up to 77.5 hours/week<br>• Work-life balance concerns |
| Tenure | • Many outliers (824)<br>• High variation in stay duration<br>• Retention challenges evident |
| Work Accidents | • 15% accident rate<br>• Safety concerns<br>• Need for better protocols |
| Left Company | • 17% turnover rate<br>• Above industry average<br>• Immediate attention needed |
| Promotions | • Very low promotion rate (2%)<br>• Career growth concerns<br>• Potential cause of turnover |



## 4. Data Upload & Analysis in Tableau
- Imported hr_analytics_cleaned.csv
- Created calculated fields for:
  * Standard hours (166.67)
  * Tenure grouping
  * Correlation metrics
- Set up color schemes: Red (left), Blue (stayed)

## 5. Visualization Process
Comprehensive Analysis of HR Visualizations:

1. **Turnover Distribution (Basic Bar Chart)**
- 17% turnover rate
- Key Risk: High turnover cost impact

2. **Project Load vs Hours (Box Plot & Histogram)**
- Optimal project load: 3-4 projects
- 100% turnover for 7-project employees
- Workload threshold identified

3. **Monthly Hours vs Satisfaction (Scatter Plot)**
- High hours (240-315) = near-zero satisfaction
- Sweet spot: 210-280 hours with 0.7-0.9 satisfaction
- Cultural pressure impact evident

4-5. **Satisfaction by Tenure (Box Plot & Histogram)**
- Two turnover groups:
  * Short tenure + low satisfaction
  * Medium tenure + high satisfaction
- Critical 4-year mark identified

6. **Salary Distribution by Tenure**
- No correlation between tenure and salary
- Limited salary progression
- Retention challenge identified

7. **Hours vs Evaluation (Scatter Plot)**
- Overworked high performers leaving
- Hours-evaluation correlation
- Work-life balance issues

8-9. **Promotions and Department Analysis**
- Low promotion rate (2%)
- Consistent turnover across departments
- Company-wide retention issue

**Key Correlations:**
- Strong: Hours-Projects (0.42)
- Negative: Satisfaction-Left (-0.39)
- Moderate: Evaluation-Projects (0.35)

## 6. Business Insights
Key Findings:
1. Workload Issues
- 7+ projects = 100% turnover
- Optimal: 3-4 projects
- Overworking prevalent

2. Satisfaction Patterns
- Two turnover groups:
  * Short tenure + low satisfaction
  * Medium tenure + high satisfaction
- Critical 4-year mark

3. Performance Relations
- Hours correlate with evaluations
- Low promotion rate (2%)
- Consistent departmental turnover

4. Retention Risks
- 17% turnover rate
- Work-life balance issues
- Limited career progression

## 7. Challenges & Learnings
Challenges:
- Complex data relationships
- Multiple variable interactions
- Visualization limitations in Tableau

Learnings:
- Data cleaning importance
- Multiple visualization perspectives
- Business metric correlation
- HR pattern identification

Recommendations:
1. Implement project caps
2. Review 4-year policies
3. Create career paths
4. Address workload culture
5. Develop retention strategy
