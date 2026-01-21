export const infographicData = {
  "meta": {
    "total_emails_analyzed": 10000000,
    "analysis_date": "2025-05-12",
    "status": "complete"
  },
  "spam_categories": [
    { "category": "Phishing / Credential Harvesting", "count": 4200000, "percentage": 42, "color": "#FF6384" },
    { "category": "Promotional / Graymail", "count": 2800000, "percentage": 28, "color": "#36A2EB" },
    { "category": "Advance Fee Fraud", "count": 1400000, "percentage": 14, "color": "#FFCE56" },
    { "category": "Malware Delivery", "count": 1100000, "percentage": 11, "color": "#4BC0C0" },
    { "category": "Extortion / Sextortion", "count": 500000, "percentage": 5, "color": "#9966FF" }
  ],
  "top_keywords": [
    { "keyword": "Invoice / Payment", "occurrence_rate": 0.34 },
    { "keyword": "Urgent / Action Required", "occurrence_rate": 0.22 },
    { "keyword": "Delivery / Shipment", "occurrence_rate": 0.18 },
    { "keyword": "Account Verification", "occurrence_rate": 0.15 },
    { "keyword": "Offer / Gift", "occurrence_rate": 0.11 }
  ],
  "malicious_attachments": [
    { "type": "PDF", "extension": ".pdf", "percentage": 38 },
    { "type": "Archives", "extension": ".zip, .rar", "percentage": 25 },
    { "type": "Office Docs", "extension": ".docx, .xlsx", "percentage": 20 },
    { "type": "Executables", "extension": ".exe, .msi", "percentage": 12 },
    { "type": "Scripts", "extension": ".js, .vbs", "percentage": 5 }
  ],
  "impersonated_brands": [
    { "rank": 1, "brand": "Microsoft" },
    { "rank": 2, "brand": "Google" },
    { "rank": 3, "brand": "Amazon" },
    { "rank": 4, "brand": "DHL / FedEx" },
    { "rank": 5, "brand": "Netflix" }
  ]
};
