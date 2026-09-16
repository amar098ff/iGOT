// ── PROFESSIONAL STREAMS ─────────────────────────────────────────────────────
export const STREAMS = [
  {
    id: 'stats',
    name: 'Statistics & Data Analytics',
    shortName: 'Statistics',
    icon: '📊',
    description: 'Statistical methods, data analysis, survey design, and data-driven policy.',
    competencies: ['Statistical Analysis', 'Data Analysis', 'Data Interpretation', 'Data Visualization', 'Python / Tools', 'Problem Solving'],
    requiredLevels: { 'Statistical Analysis': 80, 'Data Analysis': 75, 'Data Interpretation': 75, 'Data Visualization': 70, 'Python / Tools': 70, 'Problem Solving': 65 },
    color: '#1D5F9E',
    bg: '#E8F0F8',
  },
  {
    id: 'it',
    name: 'Information Technology',
    shortName: 'IT',
    icon: '💻',
    description: 'Software systems, cybersecurity, e-governance platforms, and digital infrastructure.',
    competencies: ['Software Development', 'Cybersecurity', 'Database Management', 'Cloud & Infrastructure', 'Agile Practices', 'System Analysis'],
    requiredLevels: { 'Software Development': 80, 'Cybersecurity': 75, 'Database Management': 75, 'Cloud & Infrastructure': 70, 'Agile Practices': 65, 'System Analysis': 70 },
    color: '#276749',
    bg: '#EBF5EE',
  },
  {
    id: 'finance',
    name: 'Finance & Accounts',
    shortName: 'Finance',
    icon: '💰',
    description: 'Government budgeting, financial management, audit, and public expenditure.',
    competencies: ['Budget Management', 'Financial Reporting', 'Audit & Compliance', 'Public Procurement', 'Treasury Operations', 'Risk Management'],
    requiredLevels: { 'Budget Management': 80, 'Financial Reporting': 75, 'Audit & Compliance': 80, 'Public Procurement': 70, 'Treasury Operations': 70, 'Risk Management': 65 },
    color: '#B7791F',
    bg: '#FFFBEB',
  },
  {
    id: 'admin',
    name: 'Public Administration',
    shortName: 'Administration',
    icon: '🏛️',
    description: 'Policy formulation, inter-departmental coordination, governance, and public service delivery.',
    competencies: ['Policy Analysis', 'Governance & Ethics', 'Stakeholder Management', 'Public Communication', 'Legal Framework', 'Leadership'],
    requiredLevels: { 'Policy Analysis': 80, 'Governance & Ethics': 85, 'Stakeholder Management': 75, 'Public Communication': 75, 'Legal Framework': 70, 'Leadership': 70 },
    color: '#0B2545',
    bg: '#E8F0F8',
  },
  {
    id: 'health',
    name: 'Healthcare',
    shortName: 'Healthcare',
    icon: '🏥',
    description: 'Health policy, epidemiology, hospital administration, and public health programmes.',
    competencies: ['Epidemiology', 'Health Policy', 'Clinical Data Management', 'Healthcare Administration', 'Public Health Outreach', 'Research Methods'],
    requiredLevels: { 'Epidemiology': 75, 'Health Policy': 80, 'Clinical Data Management': 70, 'Healthcare Administration': 75, 'Public Health Outreach': 70, 'Research Methods': 70 },
    color: '#C0392B',
    bg: '#FDEDEC',
  },
  {
    id: 'edu',
    name: 'Education',
    shortName: 'Education',
    icon: '📚',
    description: 'Curriculum design, teacher training, education policy, and learning outcome assessment.',
    competencies: ['Curriculum Design', 'Education Policy', 'Assessment & Evaluation', 'Instructional Methods', 'Learning Analytics', 'Stakeholder Engagement'],
    requiredLevels: { 'Curriculum Design': 75, 'Education Policy': 80, 'Assessment & Evaluation': 75, 'Instructional Methods': 70, 'Learning Analytics': 65, 'Stakeholder Engagement': 70 },
    color: '#E07B39',
    bg: '#FEF3EC',
  },
];

// ── STREAM-SPECIFIC ASSESSMENT QUESTIONS ─────────────────────────────────────
export const STREAM_QUESTIONS = {
  stats: [
    { id: 1, text: 'Which measure of central tendency is most appropriate for a skewed income distribution?', options: [{ id: 'A', text: 'Mean' }, { id: 'B', text: 'Median' }, { id: 'C', text: 'Mode' }, { id: 'D', text: 'Variance' }], correct: 'B', competency: 'Statistical Analysis' },
    { id: 2, text: 'In stratified random sampling, strata are defined to:', options: [{ id: 'A', text: 'Reduce sample size to zero' }, { id: 'B', text: 'Ensure subgroups are adequately represented' }, { id: 'C', text: 'Eliminate non-sampling errors' }, { id: 'D', text: 'Increase bias' }], correct: 'B', competency: 'Statistical Analysis' },
    { id: 3, text: 'A p-value of 0.03 at α = 0.05 means:', options: [{ id: 'A', text: 'Fail to reject null hypothesis' }, { id: 'B', text: 'Reject null hypothesis; result is significant' }, { id: 'C', text: 'The result is 3% true' }, { id: 'D', text: 'The effect size is large' }], correct: 'B', competency: 'Statistical Analysis' },
    { id: 4, text: 'Which chart type is best suited for showing part-to-whole relationships?', options: [{ id: 'A', text: 'Line chart' }, { id: 'B', text: 'Scatter plot' }, { id: 'C', text: 'Pie / Donut chart' }, { id: 'D', text: 'Histogram' }], correct: 'C', competency: 'Data Visualization' },
    { id: 5, text: 'What does a high standard deviation indicate?', options: [{ id: 'A', text: 'Data is clustered near the mean' }, { id: 'B', text: 'Data is widely spread around the mean' }, { id: 'C', text: 'The mean is high' }, { id: 'D', text: 'The dataset is skewed' }], correct: 'B', competency: 'Data Interpretation' },
    { id: 6, text: 'Which Python library is primarily used for data analysis and manipulation?', options: [{ id: 'A', text: 'NumPy' }, { id: 'B', text: 'Flask' }, { id: 'C', text: 'Pandas' }, { id: 'D', text: 'Matplotlib' }], correct: 'C', competency: 'Python / Tools' },
    { id: 7, text: 'Consumer Price Index (CPI) primarily measures:', options: [{ id: 'A', text: 'Industrial output' }, { id: 'B', text: 'Changes in the price of a consumer goods basket' }, { id: 'C', text: 'GDP growth' }, { id: 'D', text: 'Employment rate' }], correct: 'B', competency: 'Data Interpretation' },
    { id: 8, text: 'Correlation coefficient of +1.0 means:', options: [{ id: 'A', text: 'No relationship' }, { id: 'B', text: 'Perfect negative relationship' }, { id: 'C', text: 'Perfect positive linear relationship' }, { id: 'D', text: 'Causation is established' }], correct: 'C', competency: 'Data Analysis' },
    { id: 9, text: 'Which Pandas function reads a CSV file?', options: [{ id: 'A', text: 'pd.load_csv()' }, { id: 'B', text: 'pd.read_csv()' }, { id: 'C', text: 'pd.import_csv()' }, { id: 'D', text: 'pd.open_csv()' }], correct: 'B', competency: 'Python / Tools' },
    { id: 10, text: 'A box plot primarily displays:', options: [{ id: 'A', text: 'Time-series trends' }, { id: 'B', text: 'Frequency distribution' }, { id: 'C', text: 'Median, quartiles, and outliers' }, { id: 'D', text: 'Categorical comparisons' }], correct: 'C', competency: 'Data Visualization' },
    { id: 11, text: 'Type I error in hypothesis testing is:', options: [{ id: 'A', text: 'Failing to reject a false null hypothesis' }, { id: 'B', text: 'Rejecting a true null hypothesis' }, { id: 'C', text: 'Accepting a false alternative hypothesis' }, { id: 'D', text: 'Computing an incorrect p-value' }], correct: 'B', competency: 'Statistical Analysis' },
    { id: 12, text: 'Best visualization for relationship between two continuous variables?', options: [{ id: 'A', text: 'Bar chart' }, { id: 'B', text: 'Pie chart' }, { id: 'C', text: 'Scatter plot' }, { id: 'D', text: 'Waterfall chart' }], correct: 'C', competency: 'Data Visualization' },
    { id: 13, text: 'Data cleaning is performed to:', options: [{ id: 'A', text: 'Increase dataset size' }, { id: 'B', text: 'Remove errors, duplicates, and inconsistencies' }, { id: 'C', text: 'Visualise the data' }, { id: 'D', text: 'Train machine learning models' }], correct: 'B', competency: 'Data Analysis' },
    { id: 14, text: '95% Confidence interval means:', options: [{ id: 'A', text: 'The parameter falls in the interval 95% of the time across repeated samples' }, { id: 'B', text: 'The sample is 95% accurate' }, { id: 'C', text: '95% of data lies within the interval' }, { id: 'D', text: 'The p-value is 0.95' }], correct: 'A', competency: 'Statistical Analysis' },
    { id: 15, text: 'Which is a non-probability sampling method?', options: [{ id: 'A', text: 'Simple random sampling' }, { id: 'B', text: 'Systematic sampling' }, { id: 'C', text: 'Purposive sampling' }, { id: 'D', text: 'Cluster sampling' }], correct: 'C', competency: 'Statistical Analysis' },
    { id: 16, text: 'Matplotlib in Python is primarily used for:', options: [{ id: 'A', text: 'Database management' }, { id: 'B', text: 'Data visualization / plotting' }, { id: 'C', text: 'Web scraping' }, { id: 'D', text: 'Machine learning' }], correct: 'B', competency: 'Python / Tools' },
    { id: 17, text: 'An outlier in a dataset is:', options: [{ id: 'A', text: 'A value near the median' }, { id: 'B', text: 'A data point significantly different from other observations' }, { id: 'C', text: 'Always a data entry error' }, { id: 'D', text: 'The mode of the dataset' }], correct: 'B', competency: 'Data Interpretation' },
    { id: 18, text: 'Best measure for income inequality:', options: [{ id: 'A', text: 'Mean' }, { id: 'B', text: 'Standard Deviation only' }, { id: 'C', text: 'Gini Coefficient' }, { id: 'D', text: 'Mode' }], correct: 'C', competency: 'Data Analysis' },
    { id: 19, text: 'Primary purpose of a pivot table:', options: [{ id: 'A', text: 'Sorting data alphabetically' }, { id: 'B', text: 'Summarising and aggregating data across dimensions' }, { id: 'C', text: 'Visualising time-series' }, { id: 'D', text: 'Creating dashboards' }], correct: 'B', competency: 'Data Analysis' },
    { id: 20, text: 'Literacy rate increased from 64% to 77%. The increase in percentage points is:', options: [{ id: 'A', text: '20.3%' }, { id: 'B', text: '13 percentage points' }, { id: 'C', text: '77%' }, { id: 'D', text: '7.3 percentage points' }], correct: 'B', competency: 'Problem Solving' },
  ],
  it: [
    { id: 1, text: 'Which OSI layer is responsible for end-to-end data delivery?', options: [{ id: 'A', text: 'Network' }, { id: 'B', text: 'Transport' }, { id: 'C', text: 'Session' }, { id: 'D', text: 'Application' }], correct: 'B', competency: 'System Analysis' },
    { id: 2, text: 'SQL command to retrieve all records from "employees":', options: [{ id: 'A', text: 'FETCH * FROM employees' }, { id: 'B', text: 'SELECT ALL employees' }, { id: 'C', text: 'SELECT * FROM employees' }, { id: 'D', text: 'GET * employees' }], correct: 'C', competency: 'Database Management' },
    { id: 3, text: 'HTTPS ensures over HTTP:', options: [{ id: 'A', text: 'Faster speed' }, { id: 'B', text: 'Encrypted data in transit' }, { id: 'C', text: 'Smaller file size' }, { id: 'D', text: 'Better SEO' }], correct: 'B', competency: 'Cybersecurity' },
    { id: 4, text: 'A firewall is primarily used to:', options: [{ id: 'A', text: 'Speed up the network' }, { id: 'B', text: 'Filter and monitor network traffic' }, { id: 'C', text: 'Store data' }, { id: 'D', text: 'Compress data' }], correct: 'B', competency: 'Cybersecurity' },
    { id: 5, text: 'In Agile, a "Sprint" refers to:', options: [{ id: 'A', text: 'A deployment to production' }, { id: 'B', text: 'A time-boxed iteration for completing specific tasks' }, { id: 'C', text: 'A unit test cycle' }, { id: 'D', text: 'A code review process' }], correct: 'B', competency: 'Agile Practices' },
    { id: 6, text: 'Example of Infrastructure as a Service (IaaS):', options: [{ id: 'A', text: 'Google Docs' }, { id: 'B', text: 'AWS EC2' }, { id: 'C', text: 'Salesforce' }, { id: 'D', text: 'GitHub' }], correct: 'B', competency: 'Cloud & Infrastructure' },
    { id: 7, text: 'Version control is used to:', options: [{ id: 'A', text: 'Compile code faster' }, { id: 'B', text: 'Track changes to code and enable collaboration' }, { id: 'C', text: 'Deploy applications' }, { id: 'D', text: 'Test APIs' }], correct: 'B', competency: 'Software Development' },
    { id: 8, text: 'REST in APIs stands for:', options: [{ id: 'A', text: 'Reliable Encrypted Server Transfer' }, { id: 'B', text: 'Representational State Transfer' }, { id: 'C', text: 'Remote Endpoint Server Technology' }, { id: 'D', text: 'Rapid Execution Standard Transfer' }], correct: 'B', competency: 'Software Development' },
    { id: 9, text: 'Phishing attacks are best mitigated by:', options: [{ id: 'A', text: 'Installing faster hardware' }, { id: 'B', text: 'Employee security awareness training' }, { id: 'C', text: 'Using louder speakers' }, { id: 'D', text: 'Upgrading OS' }], correct: 'B', competency: 'Cybersecurity' },
    { id: 10, text: 'Primary key in a relational database:', options: [{ id: 'A', text: 'Can have NULL values' }, { id: 'B', text: 'Uniquely identifies each row in a table' }, { id: 'C', text: 'Links two databases together' }, { id: 'D', text: 'Is optional' }], correct: 'B', competency: 'Database Management' },
    { id: 11, text: 'Containerisation in IT means:', options: [{ id: 'A', text: 'Storing data in boxes' }, { id: 'B', text: 'Packaging software with dependencies for consistent deployment' }, { id: 'C', text: 'A data compression technique' }, { id: 'D', text: 'A type of firewall' }], correct: 'B', competency: 'Cloud & Infrastructure' },
    { id: 12, text: 'Agile Manifesto values:', options: [{ id: 'A', text: 'Processes over people' }, { id: 'B', text: 'Contract negotiation over collaboration' }, { id: 'C', text: 'Individuals and interactions over processes and tools' }, { id: 'D', text: 'Documentation over working software' }], correct: 'C', competency: 'Agile Practices' },
    { id: 13, text: 'Which is NOT a characteristic of cloud computing?', options: [{ id: 'A', text: 'On-demand self-service' }, { id: 'B', text: 'Broad network access' }, { id: 'C', text: 'Fixed hardware costs' }, { id: 'D', text: 'Measured service' }], correct: 'C', competency: 'Cloud & Infrastructure' },
    { id: 14, text: 'OWASP Top 10 relates to:', options: [{ id: 'A', text: 'Web application security risks' }, { id: 'B', text: 'Network performance' }, { id: 'C', text: 'Cloud pricing' }, { id: 'D', text: 'Database design' }], correct: 'A', competency: 'Cybersecurity' },
    { id: 15, text: 'OOP primary concept:', options: [{ id: 'A', text: 'Writing functions only' }, { id: 'B', text: 'Structuring code into objects with properties and methods' }, { id: 'C', text: 'Using arrays for all data' }, { id: 'D', text: 'Avoiding recursion' }], correct: 'B', competency: 'Software Development' },
    { id: 16, text: 'A DDoS attack aims to:', options: [{ id: 'A', text: 'Steal data quietly' }, { id: 'B', text: 'Overwhelm a system to make it unavailable' }, { id: 'C', text: 'Encrypt files for ransom' }, { id: 'D', text: 'Intercept communications' }], correct: 'B', competency: 'Cybersecurity' },
    { id: 17, text: 'JOIN in SQL is used to:', options: [{ id: 'A', text: 'Add new rows' }, { id: 'B', text: 'Combine rows from tables based on a related column' }, { id: 'C', text: 'Delete records' }, { id: 'D', text: 'Sort the result set' }], correct: 'B', competency: 'Database Management' },
    { id: 18, text: 'CI/CD stands for:', options: [{ id: 'A', text: 'Code Integration / Code Deployment' }, { id: 'B', text: 'Continuous Integration / Continuous Delivery' }, { id: 'C', text: 'Central Interface / Centralized Data' }, { id: 'D', text: 'Cloud Infrastructure / Cloud Delivery' }], correct: 'B', competency: 'Software Development' },
    { id: 19, text: 'Protocol for secure file transfer over the internet:', options: [{ id: 'A', text: 'FTP' }, { id: 'B', text: 'HTTP' }, { id: 'C', text: 'SFTP / FTPS' }, { id: 'D', text: 'SMTP' }], correct: 'C', competency: 'System Analysis' },
    { id: 20, text: 'Database index improves:', options: [{ id: 'A', text: 'Data entry speed' }, { id: 'B', text: 'Query retrieval performance' }, { id: 'C', text: 'Data security' }, { id: 'D', text: 'Backup speed' }], correct: 'B', competency: 'Database Management' },
  ],
  finance: [
    { id: 1, text: 'Primary purpose of a government budget:', options: [{ id: 'A', text: 'To determine salary increases' }, { id: 'B', text: 'To plan resource allocation and financial policy' }, { id: 'C', text: 'To calculate tax rates' }, { id: 'D', text: 'To list all government assets' }], correct: 'B', competency: 'Budget Management' },
    { id: 2, text: 'Fiscal deficit is:', options: [{ id: 'A', text: 'Revenue surplus minus capital expenditure' }, { id: 'B', text: 'Total expenditure minus total receipts excluding borrowings' }, { id: 'C', text: 'GDP minus government spending' }, { id: 'D', text: 'Tax revenue minus non-tax revenue' }], correct: 'B', competency: 'Budget Management' },
    { id: 3, text: 'Internal audit in government primarily aims to:', options: [{ id: 'A', text: 'Prepare tax returns' }, { id: 'B', text: 'Ensure compliance, identify risks, and improve controls' }, { id: 'C', text: 'Set budget allocations' }, { id: 'D', text: 'Process payroll' }], correct: 'B', competency: 'Audit & Compliance' },
    { id: 4, text: 'Annual financial statement of Government of India:', options: [{ id: 'A', text: 'Economic Survey' }, { id: 'B', text: 'Union Budget' }, { id: 'C', text: 'CAG Report' }, { id: 'D', text: 'Finance Commission Report' }], correct: 'B', competency: 'Financial Reporting' },
    { id: 5, text: 'Public procurement should primarily be governed by:', options: [{ id: 'A', text: 'Speed of procurement only' }, { id: 'B', text: 'Transparency, competition, and value for money' }, { id: 'C', text: 'Sole-sourcing for efficiency' }, { id: 'D', text: 'Lowest bidder always' }], correct: 'B', competency: 'Public Procurement' },
    { id: 6, text: 'Consolidated Fund of India receives:', options: [{ id: 'A', text: 'Only grants from state governments' }, { id: 'B', text: 'All tax revenues, non-tax revenues, and capital receipts' }, { id: 'C', text: 'Only customs duty' }, { id: 'D', text: 'Public deposits only' }], correct: 'B', competency: 'Budget Management' },
    { id: 7, text: 'Value for Money (VfM) in public procurement means:', options: [{ id: 'A', text: 'Always choosing the cheapest option' }, { id: 'B', text: 'Best combination of quality, service, and cost' }, { id: 'C', text: 'Avoiding all expenditure' }, { id: 'D', text: 'Spending the entire budget' }], correct: 'B', competency: 'Public Procurement' },
    { id: 8, text: 'CAG is responsible for:', options: [{ id: 'A', text: 'Setting tax policy' }, { id: 'B', text: 'Auditing government accounts and expenditure' }, { id: 'C', text: 'Preparing the Union Budget' }, { id: 'D', text: 'Managing forex reserves' }], correct: 'B', competency: 'Audit & Compliance' },
    { id: 9, text: 'Treasury Single Account (TSA) helps:', options: [{ id: 'A', text: 'Decentralise government funds' }, { id: 'B', text: 'Consolidate government cash for better management' }, { id: 'C', text: 'Avoid budget planning' }, { id: 'D', text: 'Split funds across accounts' }], correct: 'B', competency: 'Treasury Operations' },
    { id: 10, text: 'Risk specific to government revenue collection:', options: [{ id: 'A', text: 'Operational risk only' }, { id: 'B', text: 'Tax evasion and compliance risk' }, { id: 'C', text: 'Market risk' }, { id: 'D', text: 'Credit risk only' }], correct: 'B', competency: 'Risk Management' },
    { id: 11, text: 'PFMS is used for:', options: [{ id: 'A', text: 'Filing income tax returns' }, { id: 'B', text: 'Tracking government expenditure and fund releases in real time' }, { id: 'C', text: 'Setting GST rates' }, { id: 'D', text: 'Processing bank loans' }], correct: 'B', competency: 'Budget Management' },
    { id: 12, text: 'Capital expenditure creates:', options: [{ id: 'A', text: 'Spending on salaries' }, { id: 'B', text: 'Assets or reduces liabilities' }, { id: 'C', text: 'Spending on stationery' }, { id: 'D', text: 'Spending on subsidies' }], correct: 'B', competency: 'Budget Management' },
    { id: 13, text: 'Accrual accounting records transactions:', options: [{ id: 'A', text: 'Only when cash is received or paid' }, { id: 'B', text: 'When income is earned or expense is incurred, regardless of cash flow' }, { id: 'C', text: 'At year end' }, { id: 'D', text: 'When approved by the auditor' }], correct: 'B', competency: 'Financial Reporting' },
    { id: 14, text: 'Primary objective of internal controls:', options: [{ id: 'A', text: 'To slow down processes' }, { id: 'B', text: 'To safeguard assets, ensure accuracy, and prevent fraud' }, { id: 'C', text: 'To increase paperwork' }, { id: 'D', text: 'To replace the audit function' }], correct: 'B', competency: 'Audit & Compliance' },
    { id: 15, text: 'Financial statement showing position at a specific date:', options: [{ id: 'A', text: 'Income Statement' }, { id: 'B', text: 'Cash Flow Statement' }, { id: 'C', text: 'Balance Sheet' }, { id: 'D', text: 'Statement of Changes in Equity' }], correct: 'C', competency: 'Financial Reporting' },
    { id: 16, text: 'GeM (Government e-Marketplace) is used for:', options: [{ id: 'A', text: 'Filing GST' }, { id: 'B', text: 'Procuring goods and services for government departments' }, { id: 'C', text: 'Publishing government reports' }, { id: 'D', text: 'Paying employee salaries' }], correct: 'B', competency: 'Public Procurement' },
    { id: 17, text: 'Liquidity risk refers to:', options: [{ id: 'A', text: 'Risk of interest rate changes' }, { id: 'B', text: 'Risk that an entity cannot meet short-term financial obligations' }, { id: 'C', text: 'Currency fluctuation risk' }, { id: 'D', text: 'Inflation risk' }], correct: 'B', competency: 'Risk Management' },
    { id: 18, text: 'Contingency Fund of India can be used for:', options: [{ id: 'A', text: 'Regular government expenditure' }, { id: 'B', text: 'Urgent unforeseen expenditure pending parliamentary approval' }, { id: 'C', text: 'Funding elections' }, { id: 'D', text: 'Paying state dues' }], correct: 'B', competency: 'Treasury Operations' },
    { id: 19, text: 'Document accompanying a procurement tender:', options: [{ id: 'A', text: 'Audit Report' }, { id: 'B', text: 'Request for Proposal (RFP) / Tender Document' }, { id: 'C', text: 'Balance Sheet' }, { id: 'D', text: 'Expenditure Statement' }], correct: 'B', competency: 'Public Procurement' },
    { id: 20, text: 'Performance audit evaluates:', options: [{ id: 'A', text: 'Only accuracy of financial statements' }, { id: 'B', text: 'Economy, efficiency, and effectiveness of programmes' }, { id: 'C', text: 'Employee performance appraisals' }, { id: 'D', text: 'Tax collection only' }], correct: 'B', competency: 'Audit & Compliance' },
  ],
  admin: [
    { id: 1, text: 'Policy analysis primarily involves:', options: [{ id: 'A', text: 'Writing news articles' }, { id: 'B', text: 'Evaluating policy options, impacts, and trade-offs' }, { id: 'C', text: 'Implementing policies directly' }, { id: 'D', text: 'Auditing departments' }], correct: 'B', competency: 'Policy Analysis' },
    { id: 2, text: 'RTI Act 2005 ensures:', options: [{ id: 'A', text: 'Right to education' }, { id: 'B', text: 'Citizens can access information held by public authorities' }, { id: 'C', text: 'Free healthcare' }, { id: 'D', text: 'Freedom of press' }], correct: 'B', competency: 'Governance & Ethics' },
    { id: 3, text: 'Good governance principle emphasising citizen participation:', options: [{ id: 'A', text: 'Autocracy' }, { id: 'B', text: 'Inclusiveness / Participation' }, { id: 'C', text: 'Opacity' }, { id: 'D', text: 'Centralisation' }], correct: 'B', competency: 'Governance & Ethics' },
    { id: 4, text: 'Stakeholder mapping is done to:', options: [{ id: 'A', text: 'Create org charts' }, { id: 'B', text: 'Identify interests of all parties affected by a policy' }, { id: 'C', text: 'Map geographical boundaries' }, { id: 'D', text: 'Budget allocation' }], correct: 'B', competency: 'Stakeholder Management' },
    { id: 5, text: 'Primary purpose of the IAS:', options: [{ id: 'A', text: 'Tax collection' }, { id: 'B', text: 'Public administration and policy implementation' }, { id: 'C', text: 'Military defence' }, { id: 'D', text: 'Foreign diplomacy' }], correct: 'B', competency: 'Public Communication' },
    { id: 6, text: 'Effective government press release should:', options: [{ id: 'A', text: 'Use complex jargon' }, { id: 'B', text: 'Be clear, accurate, timely, and citizen-centric' }, { id: 'C', text: 'Avoid key facts' }, { id: 'D', text: 'Be very long with no summary' }], correct: 'B', competency: 'Public Communication' },
    { id: 7, text: 'Article ensuring equality of opportunity in public employment:', options: [{ id: 'A', text: 'Article 14' }, { id: 'B', text: 'Article 16' }, { id: 'C', text: 'Article 21' }, { id: 'D', text: 'Article 19' }], correct: 'B', competency: 'Legal Framework' },
    { id: 8, text: 'DISHA focuses on:', options: [{ id: 'A', text: 'Criminal justice' }, { id: 'B', text: 'Monitoring implementation of central schemes at district level' }, { id: 'C', text: 'Tax collection' }, { id: 'D', text: 'Rural land records' }], correct: 'B', competency: 'Governance & Ethics' },
    { id: 9, text: 'Evidence-based policy making uses:', options: [{ id: 'A', text: 'Only political opinion' }, { id: 'B', text: 'Data, research, and evaluation to inform decisions' }, { id: 'C', text: 'Historical precedent only' }, { id: 'D', text: 'Media reports exclusively' }], correct: 'B', competency: 'Policy Analysis' },
    { id: 10, text: 'Servant Leadership in civil service means:', options: [{ id: 'A', text: 'Following orders without question' }, { id: 'B', text: 'Prioritising the needs of citizens and team members' }, { id: 'C', text: 'Delegating all tasks' }, { id: 'D', text: 'Focusing on personal advancement' }], correct: 'B', competency: 'Leadership' },
    { id: 11, text: 'Conflict of interest in public service occurs when:', options: [{ id: 'A', text: 'Two departments disagree' }, { id: 'B', text: 'Personal interests could improperly influence official duties' }, { id: 'C', text: 'Budget is insufficient' }, { id: 'D', text: 'A policy is unpopular' }], correct: 'B', competency: 'Governance & Ethics' },
    { id: 12, text: 'Last-mile delivery refers to:', options: [{ id: 'A', text: 'Courier services' }, { id: 'B', text: 'Reaching services to the most remote or marginalised citizens' }, { id: 'C', text: 'Final audit steps' }, { id: 'D', text: 'End-of-year reporting' }], correct: 'B', competency: 'Stakeholder Management' },
    { id: 13, text: 'Key principle of natural justice:', options: [{ id: 'A', text: 'Speed of decision only' }, { id: 'B', text: 'Audi alteram partem — hear the other side' }, { id: 'C', text: 'Favouring the stronger party' }, { id: 'D', text: 'Secrecy of proceedings' }], correct: 'B', competency: 'Legal Framework' },
    { id: 14, text: 'Strategic plan differs from operational plan in that it:', options: [{ id: 'A', text: 'Is shorter in duration' }, { id: 'B', text: 'Sets long-term goals and direction' }, { id: 'C', text: 'Lists daily tasks' }, { id: 'D', text: 'Focuses on individual performance' }], correct: 'B', competency: 'Leadership' },
    { id: 15, text: 'Citizen charter primarily:', options: [{ id: 'A', text: 'Lists employee rights' }, { id: 'B', text: 'Specifies standards and commitments of service delivery to citizens' }, { id: 'C', text: 'Defines government budgets' }, { id: 'D', text: 'Describes party manifesto' }], correct: 'B', competency: 'Public Communication' },
    { id: 16, text: 'Article 311 protects:', options: [{ id: 'A', text: 'Fundamental Rights' }, { id: 'B', text: 'Civil servants from arbitrary dismissal without inquiry' }, { id: 'C', text: 'Right to information' }, { id: 'D', text: 'Election commissioner appointment' }], correct: 'B', competency: 'Legal Framework' },
    { id: 17, text: 'Tool for public sector performance measurement:', options: [{ id: 'A', text: 'P&L Statement' }, { id: 'B', text: 'Balanced Scorecard adapted for public sector' }, { id: 'C', text: 'Share price monitoring' }, { id: 'D', text: 'Dividend policy' }], correct: 'B', competency: 'Policy Analysis' },
    { id: 18, text: 'Inter-departmental coordination is best achieved through:', options: [{ id: 'A', text: 'Ignoring other departments' }, { id: 'B', text: 'Structured communication, shared goals, regular meetings' }, { id: 'C', text: 'Working in silos' }, { id: 'D', text: 'Outsourcing all coordination' }], correct: 'B', competency: 'Stakeholder Management' },
    { id: 19, text: 'Constitutional morality in governance refers to:', options: [{ id: 'A', text: 'Religious governance' }, { id: 'B', text: 'Acting in accordance with the spirit and values of the Constitution' }, { id: 'C', text: 'Following only written rules' }, { id: 'D', text: 'Political party ideology' }], correct: 'B', competency: 'Governance & Ethics' },
    { id: 20, text: 'No-Confidence Motion in Parliament:', options: [{ id: 'A', text: 'Removes a minister from cabinet' }, { id: 'B', text: 'Tests whether Council of Ministers retains Lok Sabha confidence' }, { id: 'C', text: 'Amends the Constitution' }, { id: 'D', text: 'Dissolves the Rajya Sabha' }], correct: 'B', competency: 'Legal Framework' },
  ],
  health: [
    { id: 1, text: 'Epidemiology is the study of:', options: [{ id: 'A', text: 'Individual patient treatments' }, { id: 'B', text: 'Distribution and determinants of health and disease in populations' }, { id: 'C', text: 'Drug chemistry' }, { id: 'D', text: 'Hospital architecture' }], correct: 'B', competency: 'Epidemiology' },
    { id: 2, text: 'Incidence rate measures:', options: [{ id: 'A', text: 'Total cases at a point in time' }, { id: 'B', text: 'New cases of disease in a population over a specific period' }, { id: 'C', text: 'Death rate' }, { id: 'D', text: 'Recovery rate' }], correct: 'B', competency: 'Epidemiology' },
    { id: 3, text: 'Under Ayushman Bharat PM-JAY, health cover is:', options: [{ id: 'A', text: '₹1 lakh per family per year' }, { id: 'B', text: '₹5 lakh per family per year' }, { id: 'C', text: '₹10 lakh per family per year' }, { id: 'D', text: 'Unlimited' }], correct: 'B', competency: 'Health Policy' },
    { id: 4, text: 'Primary focus of preventive healthcare:', options: [{ id: 'A', text: 'Treating existing diseases' }, { id: 'B', text: 'Reducing incidence and burden of diseases before they occur' }, { id: 'C', text: 'Hospital construction' }, { id: 'D', text: 'Drug pricing' }], correct: 'B', competency: 'Public Health Outreach' },
    { id: 5, text: 'HMIS is used to:', options: [{ id: 'A', text: 'Manage pharmacy inventory only' }, { id: 'B', text: 'Collect, store, and analyse health data for decision making' }, { id: 'C', text: 'Schedule surgeries' }, { id: 'D', text: 'Train doctors' }], correct: 'B', competency: 'Clinical Data Management' },
    { id: 6, text: 'National Health Mission (NHM) focuses on:', options: [{ id: 'A', text: 'Urban hospitals only' }, { id: 'B', text: 'Improving healthcare in rural areas and for underserved populations' }, { id: 'C', text: 'Medical education' }, { id: 'D', text: 'Drug manufacturing' }], correct: 'B', competency: 'Health Policy' },
    { id: 7, text: 'Hospital bed occupancy rate measures:', options: [{ id: 'A', text: 'Patient satisfaction' }, { id: 'B', text: 'How efficiently hospital capacity is being utilised' }, { id: 'C', text: 'Doctor-patient ratio' }, { id: 'D', text: 'Medicine availability' }], correct: 'B', competency: 'Healthcare Administration' },
    { id: 8, text: 'RCT is gold standard for:', options: [{ id: 'A', text: 'Epidemiological surveys' }, { id: 'B', text: 'Determining causality in health interventions' }, { id: 'C', text: 'Hospital management' }, { id: 'D', text: 'Policy documentation' }], correct: 'B', competency: 'Research Methods' },
    { id: 9, text: 'Herd immunity is achieved when:', options: [{ id: 'A', text: '10% of population is vaccinated' }, { id: 'B', text: 'Sufficient proportion becomes immune to limit spread' }, { id: 'C', text: 'All diseases are eradicated' }, { id: 'D', text: 'Only high-risk groups are vaccinated' }], correct: 'B', competency: 'Epidemiology' },
    { id: 10, text: 'Health equity means:', options: [{ id: 'A', text: 'Equal distribution of medicine' }, { id: 'B', text: 'Everyone has fair opportunity to attain the best possible health' }, { id: 'C', text: 'Same hospitals for all' }, { id: 'D', text: 'Equal doctors per district' }], correct: 'B', competency: 'Public Health Outreach' },
    { id: 11, text: 'EHR systems are used to:', options: [{ id: 'A', text: 'Manage hospital finance' }, { id: 'B', text: 'Digitally store and manage patient health information' }, { id: 'C', text: 'Schedule staff rosters' }, { id: 'D', text: 'Order medical supplies' }], correct: 'B', competency: 'Clinical Data Management' },
    { id: 12, text: 'ASHA workers operate at:', options: [{ id: 'A', text: 'District hospital level' }, { id: 'B', text: 'Village / grassroots level to link communities with health system' }, { id: 'C', text: 'State health ministry level' }, { id: 'D', text: 'Medical college level' }], correct: 'B', competency: 'Public Health Outreach' },
    { id: 13, text: 'Case fatality rate (CFR) is:', options: [{ id: 'A', text: 'Total cases / total deaths' }, { id: 'B', text: 'Deaths from disease / confirmed cases × 100' }, { id: 'C', text: 'New cases / population' }, { id: 'D', text: 'Recovery rate × incidence rate' }], correct: 'B', competency: 'Epidemiology' },
    { id: 14, text: 'Triage in emergency medicine refers to:', options: [{ id: 'A', text: 'Patient billing' }, { id: 'B', text: 'Sorting patients by urgency to prioritise treatment' }, { id: 'C', text: 'Discharging patients' }, { id: 'D', text: 'Storing medicines' }], correct: 'B', competency: 'Healthcare Administration' },
    { id: 15, text: 'Research method using existing past records:', options: [{ id: 'A', text: 'Prospective study' }, { id: 'B', text: 'Retrospective / secondary data study' }, { id: 'C', text: 'RCT' }, { id: 'D', text: 'Cross-sectional interview' }], correct: 'B', competency: 'Research Methods' },
    { id: 16, text: 'IDSP is for:', options: [{ id: 'A', text: 'Monitoring air quality' }, { id: 'B', text: 'Detecting and responding to disease outbreaks' }, { id: 'C', text: 'Drug approval' }, { id: 'D', text: 'Training nurses' }], correct: 'B', competency: 'Epidemiology' },
    { id: 17, text: 'MMR improvement reflects:', options: [{ id: 'A', text: 'Improved industrial production' }, { id: 'B', text: 'Better maternal healthcare, nutrition, and skilled birth attendance' }, { id: 'C', text: 'GDP growth' }, { id: 'D', text: 'Education expenditure' }], correct: 'B', competency: 'Health Policy' },
    { id: 18, text: 'Universal Health Coverage ensures:', options: [{ id: 'A', text: 'Free medicine for all diseases' }, { id: 'B', text: 'All people receive needed health services without financial hardship' }, { id: 'C', text: 'Doctors in every village' }, { id: 'D', text: 'Zero medical errors' }], correct: 'B', competency: 'Health Policy' },
    { id: 19, text: 'A systematic review:', options: [{ id: 'A', text: 'Reviews a single patient case' }, { id: 'B', text: 'Synthesises evidence from multiple studies on a specific question' }, { id: 'C', text: 'Reviews hospital budgets' }, { id: 'D', text: 'Monitors a single drug trial' }], correct: 'B', competency: 'Research Methods' },
    { id: 20, text: 'Primary goal of a Community Health Centre (CHC):', options: [{ id: 'A', text: 'Specialised surgery only' }, { id: 'B', text: 'Referral services and specialist care for a defined rural population' }, { id: 'C', text: 'Urban primary care' }, { id: 'D', text: 'Drug manufacturing' }], correct: 'B', competency: 'Healthcare Administration' },
  ],
  edu: [
    { id: 1, text: "Bloom's Taxonomy is used to:", options: [{ id: 'A', text: 'Classify types of schools' }, { id: 'B', text: 'Classify educational objectives from lower to higher order thinking' }, { id: 'C', text: 'Rate textbooks' }, { id: 'D', text: 'Design school buildings' }], correct: 'B', competency: 'Curriculum Design' },
    { id: 2, text: 'Formative assessment is conducted:', options: [{ id: 'A', text: 'Only at the end of the year' }, { id: 'B', text: 'During the learning process to provide ongoing feedback' }, { id: 'C', text: 'Before enrollment' }, { id: 'D', text: 'By parents only' }], correct: 'B', competency: 'Assessment & Evaluation' },
    { id: 3, text: 'NEP 2020 school structure:', options: [{ id: 'A', text: '10+2' }, { id: 'B', text: '5+3+3+4' }, { id: 'C', text: '4+4+4' }, { id: 'D', text: '6+3+3' }], correct: 'B', competency: 'Education Policy' },
    { id: 4, text: 'Constructivist learning theory emphasises:', options: [{ id: 'A', text: 'Rote memorisation' }, { id: 'B', text: 'Learners actively construct knowledge through experience' }, { id: 'C', text: 'Teacher-only instruction' }, { id: 'D', text: 'Standardised testing as the only measure' }], correct: 'B', competency: 'Instructional Methods' },
    { id: 5, text: 'Gross Enrollment Ratio (GER) measures:', options: [{ id: 'A', text: 'Teacher attendance' }, { id: 'B', text: 'Total enrollment relative to the eligible population' }, { id: 'C', text: 'Average school size' }, { id: 'D', text: 'Literacy rate' }], correct: 'B', competency: 'Learning Analytics' },
    { id: 6, text: 'DIKSHA platform is used for:', options: [{ id: 'A', text: 'Teacher salary disbursement' }, { id: 'B', text: 'Digital learning content for students and teachers' }, { id: 'C', text: 'School building construction' }, { id: 'D', text: 'Food distribution in schools' }], correct: 'B', competency: 'Education Policy' },
    { id: 7, text: 'Summative assessment evaluates:', options: [{ id: 'A', text: 'Day-to-day learning' }, { id: 'B', text: 'Overall learning achievement at end of a unit or course' }, { id: 'C', text: 'Teacher performance' }, { id: 'D', text: 'School infrastructure' }], correct: 'B', competency: 'Assessment & Evaluation' },
    { id: 8, text: 'Competency-based education focuses on:', options: [{ id: 'A', text: 'Hours spent in class' }, { id: 'B', text: 'Demonstrating mastery of specific skills and knowledge' }, { id: 'C', text: 'Textbook completion' }, { id: 'D', text: 'Exam scores only' }], correct: 'B', competency: 'Curriculum Design' },
    { id: 9, text: 'RTE Act 2009 mandates:', options: [{ id: 'A', text: 'Free higher education' }, { id: 'B', text: 'Free and compulsory education for children aged 6–14 years' }, { id: 'C', text: 'Free vocational training' }, { id: 'D', text: 'Free college education' }], correct: 'B', competency: 'Education Policy' },
    { id: 10, text: 'UDISE provides data on:', options: [{ id: 'A', text: 'Teacher salaries' }, { id: 'B', text: 'School infrastructure, enrollment, teachers, and outcomes' }, { id: 'C', text: 'University rankings' }, { id: 'D', text: 'State budget for education' }], correct: 'B', competency: 'Learning Analytics' },
    { id: 11, text: 'Scaffolding in instructional design means:', options: [{ id: 'A', text: 'Building classroom furniture' }, { id: 'B', text: 'Providing structured support to help learners achieve tasks beyond current ability' }, { id: 'C', text: 'Testing at year end' }, { id: 'D', text: 'Grouping students by ability' }], correct: 'B', competency: 'Instructional Methods' },
    { id: 12, text: 'Learning outcome data is used to:', options: [{ id: 'A', text: 'Rank schools publicly only' }, { id: 'B', text: 'Identify areas of improvement in teaching and curriculum' }, { id: 'C', text: 'Determine teacher salaries' }, { id: 'D', text: 'Design school buildings' }], correct: 'B', competency: 'Learning Analytics' },
    { id: 13, text: 'NAS (National Achievement Survey) measures:', options: [{ id: 'A', text: 'Teacher qualification levels' }, { id: 'B', text: 'Student learning outcomes at national level' }, { id: 'C', text: 'School enrollment rates' }, { id: 'D', text: 'Dropout rates only' }], correct: 'B', competency: 'Assessment & Evaluation' },
    { id: 14, text: 'Parent-teacher engagement primarily:', options: [{ id: 'A', text: 'Increases bureaucracy' }, { id: 'B', text: 'Improves student outcomes and school accountability' }, { id: 'C', text: 'Reduces teacher autonomy' }, { id: 'D', text: 'Has no measurable impact' }], correct: 'B', competency: 'Stakeholder Engagement' },
    { id: 15, text: 'Universal Design for Learning (UDL) aims to:', options: [{ id: 'A', text: 'Design school buildings' }, { id: 'B', text: 'Create flexible experiences accommodating all learner needs' }, { id: 'C', text: 'Standardise tests' }, { id: 'D', text: 'Create uniform textbooks' }], correct: 'B', competency: 'Instructional Methods' },
    { id: 16, text: 'Dropout rate measures:', options: [{ id: 'A', text: 'Students who fail exams' }, { id: 'B', text: 'Students who leave school before completing a level of education' }, { id: 'C', text: 'Teacher absenteeism' }, { id: 'D', text: 'Number of school holidays' }], correct: 'B', competency: 'Learning Analytics' },
    { id: 17, text: 'CCE (Continuous and Comprehensive Evaluation) emphasises:', options: [{ id: 'A', text: 'Annual examination only' }, { id: 'B', text: 'Holistic assessment of academic and co-scholastic areas throughout the year' }, { id: 'C', text: 'Teacher self-evaluation' }, { id: 'D', text: 'Standardised national exams only' }], correct: 'B', competency: 'Assessment & Evaluation' },
    { id: 18, text: 'Community participation in school education:', options: [{ id: 'A', text: 'Is not required by law' }, { id: 'B', text: 'Is mandated through School Management Committees (SMCs) under RTE' }, { id: 'C', text: 'Leads to reduced quality' }, { id: 'D', text: 'Only applies to private schools' }], correct: 'B', competency: 'Stakeholder Engagement' },
    { id: 19, text: 'Flipped classroom model involves:', options: [{ id: 'A', text: 'Students teaching each other' }, { id: 'B', text: 'Content consumed at home, class time for practice and discussion' }, { id: 'C', text: 'Reversing exam schedules' }, { id: 'D', text: 'Online only education' }], correct: 'B', competency: 'Instructional Methods' },
    { id: 20, text: 'FLN mission under NEP 2020 targets:', options: [{ id: 'A', text: 'Higher education quality' }, { id: 'B', text: 'Children achieving basic reading and arithmetic skills by Grade 3' }, { id: 'C', text: 'Teacher recruitment' }, { id: 'D', text: 'Vocational training' }], correct: 'B', competency: 'Curriculum Design' },
  ],
};

// ── STREAM SPECIFIC IGOT COURSES ─────────────────────────────────────────────
export const STREAM_COURSES = {
  stats: [
    {
      id: 'sc-stats-1',
      title: 'Python for Statistical Computing & Official Statistics',
      provider: 'iGOT Karmayogi / MoSPI',
      duration: '18 hours',
      modules: 8,
      level: 'Intermediate',
      rating: 4.9,
      enrolled: 4230,
      tags: ['Python / Tools', 'Data Analysis'],
      description: 'Comprehensive hands-on training for government statisticians on using Python, NumPy, and Pandas for processing and analyzing large-scale official datasets.',
      competency: 'Python / Tools',
      badge: 'iGOT Certified',
    },
    {
      id: 'sc-stats-2',
      title: 'Data Visualization & Interactive Dashboards for Policy',
      provider: 'National Statistical Systems Training Academy (NSSTA)',
      duration: '12 hours',
      modules: 6,
      level: 'Intermediate',
      rating: 4.8,
      enrolled: 3180,
      tags: ['Data Visualization', 'Data Interpretation'],
      description: 'Design impactful statistical dashboards, choropleth maps, and visual executive summaries for government ministers and administrative heads.',
      competency: 'Data Visualization',
      badge: 'NSSTA Verified',
    },
    {
      id: 'sc-stats-3',
      title: 'Advanced Sampling Techniques & Survey Methodology',
      provider: 'National Sample Survey Office (NSSO) / iGOT',
      duration: '15 hours',
      modules: 7,
      level: 'Advanced',
      rating: 4.9,
      enrolled: 2840,
      tags: ['Statistical Analysis', 'Problem Solving'],
      description: 'Deep dive into multi-stage stratified sampling, non-sampling error minimization, and weighting calibration for nation-wide socioeconomic surveys.',
      competency: 'Statistical Analysis',
      badge: 'Core Competency',
    },
    {
      id: 'sc-stats-4',
      title: 'Economic Indicators & National Accounts Compilation',
      provider: 'Central Statistics Office (CSO) / iGOT',
      duration: '10 hours',
      modules: 5,
      level: 'Intermediate',
      rating: 4.7,
      enrolled: 1950,
      tags: ['Data Interpretation', 'Statistical Analysis'],
      description: 'Methodology for compiling GDP, CPI, IIP, and standard System of National Accounts (SNA 2008) in compliance with UN statistical frameworks.',
      competency: 'Data Interpretation',
      badge: 'iGOT Karmayogi',
    },
  ],
  it: [
    {
      id: 'sc-it-1',
      title: 'Government Cloud Architecture & MeghRaj Integration',
      provider: 'National Informatics Centre (NIC) / iGOT',
      duration: '16 hours',
      modules: 6,
      level: 'Intermediate',
      rating: 4.9,
      enrolled: 5410,
      tags: ['Cloud & Infrastructure', 'System Analysis'],
      description: 'Architecting high-availability, compliant government web applications on MeghRaj GI Cloud infrastructure and microservices standards.',
      competency: 'Cloud & Infrastructure',
      badge: 'NIC Certified',
    },
    {
      id: 'sc-it-2',
      title: 'Cybersecurity Incident Response & CERT-In Guidelines',
      provider: 'Indian Computer Emergency Response Team (CERT-In)',
      duration: '14 hours',
      modules: 7,
      level: 'Advanced',
      rating: 4.9,
      enrolled: 6120,
      tags: ['Cybersecurity', 'System Analysis'],
      description: 'Operational defense, penetration testing methodologies, vulnerability remediation, and statutory compliance with CERT-In cyber crisis management plans.',
      competency: 'Cybersecurity',
      badge: 'CERT-In Mandate',
    },
    {
      id: 'sc-it-3',
      title: 'Enterprise Database Administration & PostgreSQL Tuning',
      provider: 'iGOT Karmayogi / CDAC',
      duration: '20 hours',
      modules: 9,
      level: 'Intermediate',
      rating: 4.8,
      enrolled: 3890,
      tags: ['Database Management', 'Software Development'],
      description: 'Designing scalable schema, indexing strategies, transaction replication, and disaster recovery for mission-critical e-Gov databases.',
      competency: 'Database Management',
      badge: 'iGOT Verified',
    },
    {
      id: 'sc-it-4',
      title: 'Modern Full-Stack e-Governance Development & DevSecOps',
      provider: 'Ministry of Electronics & IT (MeitY) / iGOT',
      duration: '24 hours',
      modules: 10,
      level: 'Intermediate',
      rating: 4.9,
      enrolled: 4720,
      tags: ['Software Development', 'Agile Practices'],
      description: 'Building secure citizen-facing portals with React, Node.js, Open API guidelines, and automated CI/CD security pipelines.',
      competency: 'Software Development',
      badge: 'MeitY Certified',
    },
  ],
  finance: [
    {
      id: 'sc-fin-1',
      title: 'PFMS Advanced Operations & Direct Benefit Transfer (DBT)',
      provider: 'Controller General of Accounts (CGA) / iGOT',
      duration: '12 hours',
      modules: 6,
      level: 'Intermediate',
      rating: 4.9,
      enrolled: 7800,
      tags: ['Budget Management', 'Treasury Operations'],
      description: 'Mastering the Public Financial Management System, sanction generation, treasury single account reconciliations, and DBT fund flow tracking.',
      competency: 'Budget Management',
      badge: 'CGA Certified',
    },
    {
      id: 'sc-fin-2',
      title: 'General Financial Rules (GFR 2017) & Public Procurement via GeM',
      provider: 'Department of Expenditure / GeM Academy',
      duration: '16 hours',
      modules: 8,
      level: 'Intermediate',
      rating: 4.9,
      enrolled: 9200,
      tags: ['Public Procurement', 'Audit & Compliance'],
      description: 'In-depth study of GFR 2017 provisions, e-bidding, reverse auctions, contract management, and dispute resolution on the Government e-Marketplace.',
      competency: 'Public Procurement',
      badge: 'Mandatory Training',
    },
    {
      id: 'sc-fin-3',
      title: 'Performance & Compliance Auditing for Civil Accounts',
      provider: 'Comptroller and Auditor General of India (CAG) / iGOT',
      duration: '14 hours',
      modules: 7,
      level: 'Advanced',
      rating: 4.8,
      enrolled: 3450,
      tags: ['Audit & Compliance', 'Risk Management'],
      description: 'Conducting proprietary and compliance audits, identifying systemic leakage, risk-based internal control assessments, and CAG paras management.',
      competency: 'Audit & Compliance',
      badge: 'CAG Standard',
    },
    {
      id: 'sc-fin-4',
      title: 'Government Budget Formulation & Medium-Term Expenditure Framework',
      provider: 'National Institute of Financial Management (NIFM)',
      duration: '10 hours',
      modules: 5,
      level: 'Advanced',
      rating: 4.8,
      enrolled: 2310,
      tags: ['Financial Reporting', 'Budget Management'],
      description: 'Outcome budget preparation, gender budgeting principles, demand for grants analysis, and financial reporting aligned with Union Budget timelines.',
      competency: 'Financial Reporting',
      badge: 'NIFM Verified',
    },
  ],
  admin: [
    {
      id: 'sc-adm-1',
      title: 'Public Policy Formulation, Regulatory Impact & Implementation',
      provider: 'LBSNAA Mussoorie / iGOT Karmayogi',
      duration: '20 hours',
      modules: 8,
      level: 'Advanced',
      rating: 4.9,
      enrolled: 6890,
      tags: ['Policy Analysis', 'Leadership'],
      description: 'Executive methods in drafting cabinet notes, conducting stakeholder consultations, evidence-based policy design, and monitoring scheme outcomes.',
      competency: 'Policy Analysis',
      badge: 'LBSNAA Certified',
    },
    {
      id: 'sc-adm-2',
      title: 'Constitutional Law, Administrative Ethics & RTI Governance',
      provider: 'Department of Personnel & Training (DoPT) / iGOT',
      duration: '12 hours',
      modules: 6,
      level: 'Foundational',
      rating: 4.9,
      enrolled: 11400,
      tags: ['Governance & Ethics', 'Legal Framework'],
      description: 'Ethical civil service codes, natural justice principles, prevention of corruption mechanisms, and timely proactive disclosure under RTI 2005.',
      competency: 'Governance & Ethics',
      badge: 'DoPT Core',
    },
    {
      id: 'sc-adm-3',
      title: 'Inter-Departmental Collaboration & Citizen Grievance Redressal (CPGRAMS)',
      provider: 'DARPG / iGOT Karmayogi',
      duration: '10 hours',
      modules: 5,
      level: 'Intermediate',
      rating: 4.8,
      enrolled: 8200,
      tags: ['Stakeholder Management', 'Public Communication'],
      description: 'Streamlining cross-ministerial workflows and expediting citizen grievance resolution with quality monitoring metrics on the CPGRAMS portal.',
      competency: 'Stakeholder Management',
      badge: 'DARPG Verified',
    },
    {
      id: 'sc-adm-4',
      title: 'Crisis Management & Strategic Public Communication',
      provider: 'Indian Institute of Public Administration (IIPA)',
      duration: '8 hours',
      modules: 4,
      level: 'Intermediate',
      rating: 4.7,
      enrolled: 4100,
      tags: ['Public Communication', 'Leadership'],
      description: 'Engaging media, drafting unambiguous press advisories, counteracting misinformation, and coordinating multi-agency emergency response.',
      competency: 'Public Communication',
      badge: 'IIPA Standard',
    },
  ],
  health: [
    {
      id: 'sc-hlth-1',
      title: 'Public Health Surveillance & Outbreak Epidemiology (IDSP)',
      provider: 'National Centre for Disease Control (NCDC) / iGOT',
      duration: '16 hours',
      modules: 7,
      level: 'Advanced',
      rating: 4.9,
      enrolled: 3400,
      tags: ['Epidemiology', 'Research Methods'],
      description: 'Standard surveillance workflows, early warning signal detection, contact tracing protocols, and epidemic curve analysis for disease surveillance.',
      competency: 'Epidemiology',
      badge: 'NCDC Verified',
    },
    {
      id: 'sc-hlth-2',
      title: 'Ayushman Bharat Digital Mission (ABDM) & Health Informatics',
      provider: 'National Health Authority (NHA) / iGOT',
      duration: '14 hours',
      modules: 6,
      level: 'Intermediate',
      rating: 4.8,
      enrolled: 5120,
      tags: ['Clinical Data Management', 'Health Policy'],
      description: 'Implementing ABHA ID creation, electronic health record interoperability, Unified Health Interface (UHI), and hospital HMIS systems.',
      competency: 'Clinical Data Management',
      badge: 'NHA Certified',
    },
    {
      id: 'sc-hlth-3',
      title: 'National Health Programmes & Last-Mile Maternal-Child Care',
      provider: 'Ministry of Health & Family Welfare (MoHFW) / NIHFW',
      duration: '18 hours',
      modules: 8,
      level: 'Intermediate',
      rating: 4.9,
      enrolled: 6700,
      tags: ['Health Policy', 'Public Health Outreach'],
      description: 'Field execution of NHM, PM-JAY, immunization coverage, ASHA supportive supervision, and reducing maternal & infant mortality indicators.',
      competency: 'Public Health Outreach',
      badge: 'MoHFW Standard',
    },
  ],
  edu: [
    {
      id: 'sc-edu-1',
      title: 'National Education Policy (NEP 2020) Pedagogical Framework & FLN',
      provider: 'NCERT / iGOT Karmayogi',
      duration: '16 hours',
      modules: 8,
      level: 'Foundational',
      rating: 4.9,
      enrolled: 14200,
      tags: ['Education Policy', 'Curriculum Design'],
      description: 'Foundational Literacy and Numeracy (FLN) implementation, 5+3+3+4 stage-wise pedagogy, experiential learning, and multi-disciplinary curriculum design.',
      competency: 'Education Policy',
      badge: 'NCERT Certified',
    },
    {
      id: 'sc-edu-2',
      title: 'Competency-Based Assessment & Holistic Progress Card (PARAKH)',
      provider: 'PARAKH / CBSE / iGOT',
      duration: '14 hours',
      modules: 6,
      level: 'Intermediate',
      rating: 4.8,
      enrolled: 9800,
      tags: ['Assessment & Evaluation', 'Learning Analytics'],
      description: 'Designing criterion-referenced assessment items, 360-degree holistic student progress cards, and analyzing National Achievement Survey (NAS) data.',
      competency: 'Assessment & Evaluation',
      badge: 'PARAKH Standard',
    },
    {
      id: 'sc-edu-3',
      title: 'Digital Pedagogy & DIKSHA Content Authoring',
      provider: 'CIET-NCERT / iGOT Karmayogi',
      duration: '12 hours',
      modules: 6,
      level: 'Intermediate',
      rating: 4.8,
      enrolled: 8600,
      tags: ['Instructional Methods', 'Stakeholder Engagement'],
      description: 'Creating interactive e-learning modules, gamified quizzes, micro-courses, and accessible learning objects for DIKSHA and PM e-VIDYA.',
      competency: 'Instructional Methods',
      badge: 'DIKSHA Verified',
    },
  ],
};

// Stream-specific employee role metadata
export const STREAM_ROLES = {
  stats: {
    role: 'Statistical Officer (Grade B)',
    department: 'Data Informatics & Innovation Division (DIID)',
    ministry: 'Ministry of Statistics & Programme Implementation (MoSPI)',
    station: 'Sardar Patel Bhawan, New Delhi',
    assessmentName: 'Official Statistical Systems & Data Analytics Assessment',
    benchmark: 80,
  },
  it: {
    role: 'Senior Systems Analyst / Technical Lead',
    department: 'National Informatics Centre (NIC) / MeitY',
    ministry: 'Ministry of Electronics and Information Technology',
    station: 'CGO Complex, New Delhi',
    assessmentName: 'e-Governance Systems & Cybersecurity Competency Assessment',
    benchmark: 80,
  },
  finance: {
    role: 'Assistant Accounts Officer (AAO)',
    department: 'Controller General of Accounts (CGA)',
    ministry: 'Ministry of Finance, Department of Expenditure',
    station: 'North Block, New Delhi',
    assessmentName: 'Public Financial Management & GFR Compliance Assessment',
    benchmark: 80,
  },
  admin: {
    role: 'Section Officer / Assistant Secretary',
    department: 'Department of Administrative Reforms & Public Grievances (DARPG)',
    ministry: 'Ministry of Personnel, Public Grievances and Pensions',
    station: 'Patel Chowk, New Delhi',
    assessmentName: 'Public Policy Analysis & Governance Ethics Assessment',
    benchmark: 80,
  },
  health: {
    role: 'Public Health Programme Officer',
    department: 'National Health Mission Directorate',
    ministry: 'Ministry of Health & Family Welfare',
    station: 'Nirman Bhawan, New Delhi',
    assessmentName: 'Epidemiological Surveillance & Health Policy Assessment',
    benchmark: 80,
  },
  edu: {
    role: 'Education Planning & Assessment Officer',
    department: 'Department of School Education & Literacy',
    ministry: 'Ministry of Education',
    station: 'Shastri Bhawan, New Delhi',
    assessmentName: 'NEP 2020 Pedagogical & Learning Assessment Competency',
    benchmark: 80,
  },
};

// Helper: compute scores from assessment answers
export function computeCompetencyScores(streamId, answers) {
  const questions = STREAM_QUESTIONS[streamId] || [];
  const stream = STREAMS.find(s => s.id === streamId);
  if (!stream) return {};
  const competencyTotals = {};
  const competencyCounts = {};

  questions.forEach((q, i) => {
    const comp = q.competency;
    if (!competencyTotals[comp]) { competencyTotals[comp] = 0; competencyCounts[comp] = 0; }
    competencyCounts[comp]++;
    if (answers[i] === q.correct) competencyTotals[comp]++;
  });

  const scores = {};
  stream.competencies.forEach(comp => {
    const total = competencyCounts[comp] || 1;
    const correct = competencyTotals[comp] || 0;
    const rawPct = (correct / total) * 100;
    // Map to 35-95 range based on correctness
    scores[comp] = Math.round(35 + (rawPct * 0.60));
  });
  return scores;
}

// Helper: generate full Gap Analysis report
export function generateGapAnalysis(streamId, answers) {
  const stream = STREAMS.find(s => s.id === streamId) || STREAMS[0];
  const questions = STREAM_QUESTIONS[streamId] || [];
  const roleInfo = STREAM_ROLES[streamId] || STREAM_ROLES.stats;

  let correctCount = 0;
  questions.forEach((q, i) => {
    if (answers[i] === q.correct) correctCount++;
  });

  const rawPercent = Math.round((correctCount / (questions.length || 1)) * 100);
  const overallScore = Math.max(35, Math.min(98, Math.round(40 + rawPercent * 0.58)));
  const scores = computeCompetencyScores(streamId, answers);

  const competencyBreakdown = stream.competencies.map(compName => {
    const current = scores[compName] || 60;
    const required = stream.requiredLevels[compName] || 75;
    const gap = Math.max(0, required - current);

    let category = 'developing';
    let statusText = 'Developing Competency';
    let color = '#D97706'; // amber

    if (current >= required) {
      category = 'strong';
      statusText = 'Strong / Proficient';
      color = '#15803D'; // green
    } else if (gap >= 15 || current < 58) {
      category = 'critical';
      statusText = 'Critical Gap';
      color = '#B91C1C'; // red
    }

    return {
      name: compName,
      current,
      required,
      gap,
      category,
      statusText,
      color,
    };
  });

  const criticalGaps = competencyBreakdown.filter(c => c.category === 'critical');
  const developingGaps = competencyBreakdown.filter(c => c.category === 'developing');
  const strongAreas = competencyBreakdown.filter(c => c.category === 'strong');

  // Matched Karmayogi courses
  const allCourses = STREAM_COURSES[streamId] || STREAM_COURSES.stats;
  const recommendedCourses = allCourses.map(course => {
    const matchGap = competencyBreakdown.find(c => c.name === course.competency || course.tags.includes(c.name));
    return {
      ...course,
      targetGap: matchGap?.name || stream.competencies[0],
      priority: matchGap?.category === 'critical' ? 'High' : matchGap?.category === 'developing' ? 'Medium' : 'Elective',
    };
  });

  return {
    stream,
    roleInfo,
    overallScore,
    benchmark: roleInfo.benchmark,
    correctCount,
    totalQuestions: questions.length,
    competencyBreakdown,
    criticalGaps,
    developingGaps,
    strongAreas,
    recommendedCourses,
    aiSummary: `Based on your diagnostic assessment in ${stream.name}, your overall readiness is ${overallScore}% against the Ministry benchmark of ${roleInfo.benchmark}%. You demonstrated solid aptitude in ${strongAreas.map(s => s.name).join(', ') || 'fundamental domain principles'}. Priority capacity building is recommended in ${[...criticalGaps, ...developingGaps].slice(0, 2).map(g => g.name).join(' and ') || 'advanced practical workflows'} via the curated Karmayogi modules below.`,
  };
}


