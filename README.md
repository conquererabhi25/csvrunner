CSV Runner Dashboard 


Point 1 >>  Project Overview

Challange - 

I have build this csv runner dashboard using nextjs, tailwind css and shadcn ui components. I have also use papa-parse to parse and validate the csv files only. Once you upload the csv file the application through calculation gives you overall and per person data like total,avg,min,max miles different runners have run. I have also added line charts and bar charts for the data visualization.

What it does:

1. First you drag and drop or upload a csv file. 

2. Then the algorithm checks weather the csv file have correct data for calculation for e.g headers, date format all rows and columns have data. 

3. Once validation is complete you'll see different metric calculations such as Total,Avg,Min and Max miles different runner have ran. 

4. application also show's the data through line charts and bar charts.

Vercel Application Link: https://csvrunner.vercel.app

Point 2>> Assumptions

While I was coding this, I had to make a few calls on how things should work:

1. I assumed the CSV will always have date, person, and miles run. I made the code trim extra spaces just in case the file is a bit messy.

2. I figured most people use YYYY-MM-DD, but the code should handle anything JavaScript understands.


3. If one row is broken (like a text string where a number should be), I decided to show an error but still try to show the rest of the good data.

4. I didn't set up a database for this version. Everything stays in the browser, so if you refresh, the data clears out.

Point 3 >>  Prerequisites
You’ll need a few things on your computer to run this:

Node.js (I used version 20, but anything above 18.17 should be fine).

npm (comes with Node).

I do not used any database for this project.

Point 4 >>  Setup

Clone Repo: git clone https://github.com/conquererabhi25/csvrunner.git

Go into the folder: cd csvrunner

Install everything using : npm install

Environment Variables: i have not used .env because there no need for this.


Point 5 >> How to Run & Verify

To start the app:

                npm run dev

Then go to http://localhost:3000 in your browser.

How to check if it works:

Upload a file: Use the sample data below. The charts should pop up immediately.

Check the stats: Look at the "Metrics" card. It should show the average and max miles correctly.

Try the filter: Click on a person button . The graphs should change to show only their runs.

Test Error handling : Try by uploading a file with a missing column. You should see a red error message explaining what's wrong by toast.

Sample Data to try
You can copy-paste this into a file called test.csv:

CSV DATA. KINDLY COPY AND PASTE DATA IN TEXT FILE AND USE .CSV EXTENSION.
I HAVE PROVIDED CSV FILE IN ROOT PLEASE CHECK.

date,person,miles run
2023-11-01,Alice,5.2
2023-11-01,Bob,3.1
2023-11-01,Charlie,4.0
2023-11-02,Alice,4.5
2023-11-02,Charlie,6.2
2023-11-03,Bob,2.8
2023-11-03,Alice,3.5
2023-11-04,Charlie,5.5
2023-11-05,Bob,4.2
2023-11-05,Alice,6.0
2023-11-06,Charlie,3.8
2023-11-07,Bob,5.1
2023-11-08,Alice,4.2
2023-11-09,Charlie,7.0
2023-11-10,Bob,3.5
2023-11-11,Alice,5.5
2023-11-12,Charlie,4.2
2023-11-13,Bob,2.5
2023-11-14,Alice,4.8
2023-11-15,Charlie,6.5
2023-11-16,Bob,3.9
2023-11-17,Alice,5.0
2023-11-18,Charlie,4.0
2023-11-19,Bob,4.4
2023-11-20,Alice,6.2

Point 6 >>  Features & Limitations
What works:

Drag and drop file uploading.

Validates headers and row data.

Responsive charts (Line and Bar charts).

Tried to give proffesional look to dashboard.

Fast filtering by runner name.

Limitations / Gaps:

The data doesn't save after you refresh the page.

You can only upload one file at a time.

If the CSV is massive (like 100k rows), the browser might slow down a bit.

Point 7 >>  Architecture & Folders
I tried to keep the project organized based on how Next.js usually works:

app/page.tsx: This is where the main logic lives. I put the parsing and the dashboard view here to keep it simple.

components/ui/: This is where all the shadcn components live (buttons, cards, etc.).

lib/utils.ts: Just some helper functions for CSS classes.

State Logic: I used React useState to keep track of the CSV data and the current filter. When you pick a person, the filteredData recalculates automatically.

Point 8 >>  Accessibility & UI
I tried to make the dashboard easy to use for everyone:

Colors: I used high-contrast colors so text is easy to read.

Keyboard: You should be able to tab through the buttons and the file uploader.

Spacing: I used a lot of padding so it doesn't feel cramped.

Responsive: It should look okay on your phone too, not just a desktop.
