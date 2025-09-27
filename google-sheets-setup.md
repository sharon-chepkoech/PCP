# Google Sheets Integration Setup Guide

Follow these step-by-step instructions to connect your form to Google Sheets.

## Step 1: Create a Google Sheets Document

1. Go to [Google Sheets](https://sheets.google.com/)
2. Click "Blank" to create a new spreadsheet
3. Rename it to "Property Valuation Form Responses" (or any name you prefer)
4. Keep this tab open - you'll need the spreadsheet ID later

## Step 2: Create Google Apps Script

1. Go to [Google Apps Script](https://script.google.com/)
2. Click "New Project"
3. Replace the default `myFunction()` code with the following:

```javascript
function doPost(e) {
  try {
    // IMPORTANT: Replace 'YOUR_SPREADSHEET_ID_HERE' with your actual Google Sheets ID
    // You can find this in your Google Sheets URL: https://docs.google.com/spreadsheets/d/SPREADSHEET_ID_HERE/edit
    const spreadsheetId = 'YOUR_SPREADSHEET_ID_HERE';
    
    const sheet = SpreadsheetApp.openById(spreadsheetId).getActiveSheet();
    
    // Parse the incoming form data
    const data = JSON.parse(e.postData.contents);
    
    // Create headers if this is the first submission
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Timestamp',
        'First Name',
        'Last Name', 
        'Phone Number',
        'Email Address',
        'Property Address',
        'Planning on Selling',
        'How Soon'
      ]);
      
      // Format the header row
      const headerRange = sheet.getRange(1, 1, 1, 8);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#f0f0f0');
    }
    
    // Add the form submission data
    sheet.appendRow([
      new Date(data.timestamp),
      data.firstName,
      data.lastName,
      data.phoneNumber,
      data.emailAddress,
      data.propertyAddress,
      data.planningSelling,
      data.howSoon || 'N/A'
    ]);
    
    // Auto-resize columns for better readability
    sheet.autoResizeColumns(1, 8);
    
    return ContentService
      .createTextOutput(JSON.stringify({success: true, message: 'Data saved successfully'}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error:', error);
    return ContentService
      .createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Optional: Test function to verify your setup
function testFunction() {
  const testData = {
    timestamp: new Date().toISOString(),
    firstName: 'Test',
    lastName: 'User',
    phoneNumber: '1234567890',
    emailAddress: 'test@example.com',
    propertyAddress: '123 Test Street',
    planningSelling: 'yes',
    howSoon: 'less-than-1-month'
  };
  
  const mockEvent = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  return doPost(mockEvent);
}
```

4. Save the project (Ctrl+S or Cmd+S)
5. Give your project a name like "Property Form Handler"

## Step 3: Get Your Google Sheets ID

1. Go back to your Google Sheets document
2. Look at the URL in your browser address bar
3. Copy the long string between `/d/` and `/edit` - this is your Spreadsheet ID
4. Example: `https://docs.google.com/spreadsheets/d/1ABC123def456GHI789jkl/edit`
   - Your ID would be: `1ABC123def456GHI789jkl`

## Step 4: Update the Apps Script with Your Spreadsheet ID

1. In your Apps Script, find the line: `const spreadsheetId = 'YOUR_SPREADSHEET_ID_HERE';`
2. Replace `YOUR_SPREADSHEET_ID_HERE` with your actual Spreadsheet ID
3. Save the script again

## Step 5: Deploy the Apps Script as a Web App

1. In Apps Script, click "Deploy" → "New deployment"
2. Click the gear icon ⚙️ next to "Type" and select "Web app"
3. Fill in the deployment settings:
   - **Description**: "Property Form Handler v1"
   - **Execute as**: "Me (your-email@gmail.com)"
   - **Who has access**: "Anyone"
4. Click "Deploy"
5. **Important**: You may need to authorize the script:
   - Click "Authorize access"
   - Choose your Google account
   - Click "Advanced" → "Go to [Your Project Name] (unsafe)"
   - Click "Allow"
6. Copy the "Web app URL" - it should look like:
   `https://script.google.com/macros/s/AKfycby...../exec`

## Step 6: Update Your Form Code

1. In your `PropertyForm.tsx` file, find this line:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
   ```
2. Replace `YOUR_GOOGLE_APPS_SCRIPT_URL_HERE` with your actual Web app URL from Step 5

## Step 7: Test Your Form

1. Submit a test form on your website
2. Check your Google Sheets - you should see the data appear
3. If there are issues, check the browser console for error messages

## Troubleshooting

### Common Issues:

1. **"Script function not found"**: Make sure you deployed as a "Web app", not as an "API executable"

2. **"Permission denied"**: Ensure the script is set to execute as "Me" and accessible by "Anyone"

3. **"Spreadsheet not found"**: Double-check your Spreadsheet ID is correct

4. **CORS errors**: This is normal with `mode: 'no-cors'` - the form should still work

### Testing Your Apps Script:

1. In Apps Script, click "Run" → select "testFunction"
2. Check your Google Sheets to see if test data appears
3. If the test works but the form doesn't, the issue is likely with the Web app URL

## Security Notes

- The Web app is publicly accessible (required for form submissions)
- Consider adding rate limiting for production use
- All form data will be stored in your Google Sheets
- You can add additional validation in the Apps Script if needed

## Optional Enhancements

You can modify the Apps Script to:
- Send email notifications when forms are submitted
- Add data validation and sanitization
- Create multiple sheets for different form types
- Add timestamps in different time zones
- Format phone numbers and other data consistently

That's it! Your form should now successfully submit data to your Google Sheets.