# Watchlist API 🚀

A serverless API for managing stocks in a watchlist, built with AWS Lambda, API Gateway, and PostgreSQL on Supabase.

### 🌟 Key Features

Full CRUD for stocks in a watchlist
Serverless architecture (no servers to manage)
PostgreSQL database hosted on Supabase
Automated CI/CD with GitHub Actions
Infrastructure as code using Serverless Framework

### 🛠 Technologies Used

**AWS**:
Lambda (Node.js 18.x)
API Gateway
**Database**: PostgreSQL (Supabase)
**Framework**: Serverless Framework v4
**CI/CD**: GitHub Actions
**Language**: JavaScript (Node.js)

### 📋 Available Endpoints

|Method   |  Endpoint |  Description | Example Body |
| ------------ | ------------ | ------------ | ------------ |
|  POST | /watchlist  |  Add a stock to the watchlist | {"symbol":"AAPL","companyName":"Apple Inc.","notes":"Tech stock"}  |
| GET  |  /watchlist | Get all registered stocks  |   |
| DELETE  |  /watchlist/{symbol} | Remove a specific stock  |   |

### 🚀 Deployment

##### Prerequisites

AWS account with IAM credentials
PostgreSQL instance (Supabase or local)
Node.js 18.x or higher
Serverless Framework installed globally

#### Manual Deployment Steps

##### Set environment variables:
    export DB_CONNECTION_STRING="databaseString"
    export AWS_ACCESS_KEY_ID="your_access_key"
    export AWS_SECRET_ACCESS_KEY="your_secret_key"
##### Install dependencies:
    npm install
##### Deploy:
    serverless deploy
	
### Automatic Deployment (CI/CD)

The repository includes GitHub Actions that automatically deploy when pushing to main.

### 🏗 Project Structure
    
    watchlist-api/
    ├── handler.js           # Lambda function logic
    ├── serverless.yml       # Infrastructure configuration
    ├── package.json         # Node.js dependencies
    └── .github/workflows/
        └── deploy.yml       # CI/CD pipeline
    
### 💾 Database Schema

    CREATE TABLE watchlist (
      id SERIAL PRIMARY KEY,
      user_id INT NOT NULL,
      symbol VARCHAR(10) NOT NULL,
      company_name TEXT NOT NULL,
      notes TEXT,
      created_at TIMESTAMP DEFAULT NOW()
    );

### 🔍 Testing

You can test the endpoints with cURL:


#### Add stock
    curl -X POST https://your-api.execute-api.region.amazonaws.com/dev/watchlist \
      -H "Content-Type: application/json" \
      -d '{"symbol":"AAPL","companyName":"Apple Inc.","notes":"Tech stock"}'

#### List stocks
    curl https://your-api.execute-api.region.amazonaws.com/dev/watchlist

#### Delete stock
    curl -X DELETE https://your-api.execute-api.region.amazonaws.com/dev/watchlist/AAPL
