# About This Repo

This repo is meant to document my learning converting from MS Excel macros to Google Apps Script.

The model is originally created by KM (initial) to help NCC Bereavement ministry team pick one or more server to serve at a memorial service.

## How it works

1. The ministry leader opens a Create A Service Google Form
2. On submit, a list of Recommendation is generated
3. The leader should change the `Assign?` value of the server to `Yes` if the server agrees to serve. This can be more than 2 servers.
4. Confirm assignment by clicking Assignment menu -> Confirm Assignment
5. This record will be added unto the Servers Log tab

## Document Properties

Create any file (example: `Secret.gs`) and add 2 functions below, and replace `your document id` with your document id.

```javascript
// Do not commit this file

function setProperties() {
  var documentProperties = PropertiesService.getDocumentProperties();
  documentProperties.setProperty('DOCUMENT_ID', 'your document id');
}

function getDocumentId() {
  var documentProperties = PropertiesService.getDocumentProperties();
  var documentId = documentProperties.getProperty('DOCUMENT_ID') 
  return documentId
  
}
```