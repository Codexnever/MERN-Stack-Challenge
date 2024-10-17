## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [API Usage](#api-usage)
- [Code Structure](#code-structure)
- [Workflow](#workflow)
- [Setup Instructions](#setup-instructions)

## Features
- Transaction overview with search functionality.
- Bar chart and pie chart visualizations for data analysis.
- Responsive design using Material UI and Tailwind CSS.

## Tech Stack
- **Frontend:**
  - React.js
  - Material UI
  - Tailwind CSS
  - Axios for API calls

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB (or your choice of database)
  
- **Libraries:**
  - Chart.js for data visualization
  - dotenv for environment variable management

## API Usage
### API Endpoints
- **Get Statistics**
  - **URL:** `/api/statistics`
  - **Method:** GET
  - **Query Params:** `month`
  
- **Get Transactions**
  - **URL:** `/api/transactions`
  - **Method:** GET
  - **Query Params:** `month`, `page`, `perPage`, `search`

- **Get Combined Data**
  - **URL:** `/api/combined`
  - **Method:** GET
  - **Query Params:** `month`
 - **Request:**
    ```http
    GET http://localhost:5000/api/combined?month=March
    ```
  - **Description:** Fetches combined data for the specified month, useful for overview analytics.


- **Get Bar Chart Data**
  - **URL:** `/api/bar-chart`
  - **Method:** GET
  - **Query Params:** `month`
   - **Request:**
    ```http
    GET http://localhost:5000/api/bar-chart?month=March
    ```

- **Get Pie Chart Data**
  - **URL:** `/api/pie-chart`
  - **Method:** GET
  - **Query Params:** `month`
   - **Request:**
    ```http
    GET http://localhost:5000/api/pie-chart?month=March
    ```

### Axios API Calls
The API calls are handled using Axios in the `api.js` file located in the `src/api` directory. Here’s a brief overview of the methods:
- `getStatistics(month)`
- `getTransactions(month, page, perPage, searchQuery)`
- `getCombinedData(month)`
- `getBarChart(month)`
- `getPieChart(month)`

## Code Structure
```
/client                   # Frontend directory
|-- /public               # Public files
|-- /src                  # Source files
|   |-- /components       # Reusable components
|   |-- /pages            # Page components
|   |-- /api              # API call functions
|   |-- /styles           # Styles (CSS, SCSS)
|   |-- App.js            # Main application component
|   |-- index.js          # Entry point

/server                   # Backend directory
|-- /models               # Database models
|-- /routes               # API routes
|-- /controllers          # Request handlers
|-- server.js             # Main server file
```

## Workflow
1. **Setup the Environment:**
   - Clone the repository.
   - Install dependencies for both the frontend and backend.
   - Set up environment variables in a `.env` file.

2. **Running the Application:**
   - Start the backend server: `node server.js`
   - Start the frontend application: `npm start` in the `/client` directory.

3. **Development Process:**
   - Create new features in separate branches.
   - Make commits with clear messages.
   - Push changes and create pull requests for review.

## Setup Instructions
### Prerequisites
- Node.js
- MongoDB (or any preferred database)
- Axios

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Codexnever/MERN-Stack-Challenge.git
   cd <project-directory>
   ```

2. Install backend dependencies:
   ```bash
   cd server
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd client
   npm install
   ```

4. Create a `.env` file in the server directory and add your environment variables.

5. Run the application:
   - For the server:
     ```bash
     cd server
     node server.js
     ```
   - For the client:
     ```bash
     cd client
     npm start
     ```

