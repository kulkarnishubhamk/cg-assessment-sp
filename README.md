

Prerequisites

Before you begin, ensure the following tools are installed on your system:

1. Node.js
   - Recommended version: v18.20.5
   - Download: https://nodejs.org/

2. Yeoman and Gulp CLI
   Install globally if not already available:
   npm install -g yo gulp

3. SharePoint Framework Yeoman Generator
   Install globally:
   npm install -g @microsoft/generator-sharepoint

4. Code Editor
   Install Visual Studio Code: https://code.visualstudio.com/

5. SharePoint Online Tenant
   You need access to a SharePoint Online tenant for development purposes.
   Create Sharepoint List "reportData" with columns : "Id", "Title", "Status", "Start Date", "End Date", "Budget", "Expenses", "Team".
   Create Sharepoint List "newsFeed" with columns : "Title", "imgUrl", "isActive", "newsBy", "Date"


---

Installation Steps

1. Clone the Repository
   Clone this project to your local machine:
   git clone https://github.com/kulkarnishubhamk/cg-assessment-sp.git
   

2. Install Dependencies
   Navigate to the project directory and run:
   npm install
   gulp build

3. Set Up Dev Environment
   Configure the serve.json file (located in the config folder) with your SharePoint site URL:
   {
     "$schema": "https://developer.microsoft.com/json-schemas/core-build/serve.schema.json",
     "port": 4321,
     "https": true,
     "initialPage": "https://<your-sharepoint-site>/_layouts/workbench.aspx"
   }

---

Running the Project Locally

1. Start the Local Server
   Run the following command in your project directory:
   gulp serve

2. Access Workbench
   - The default browser will open with the SharePoint Workbench.
   - If it doesn’t open automatically, navigate to the following URL in your browser:
     https://<your-sharepoint-site>/_layouts/workbench.aspx

3. Test Your Web Part
   - Add your web part to the workbench to preview and test functionality.
   - Modify your code as needed, and Gulp will rebuild and refresh automatically.

---


Common Issues and Troubleshooting

1. Dependencies Not Installing
   Delete the node_modules folder and try re-installing:
   rm -rf node_modules package-lock.json
   npm install

2. Incorrect Node.js Version
   Use nvm to switch to a compatible Node.js version:
   nvm install 16
   nvm use 16

3. SharePoint Workbench Not Loading
   - Ensure the serve.json file has the correct SharePoint site URL.
   - Check network connectivity to the SharePoint tenant.

---

Project Deployment

When ready to deploy your web part, bundle and package the solution:
gulp bundle --ship
gulp package-solution --ship

Upload the .sppkg file from the sharepoint/solution folder to your App Catalog.

