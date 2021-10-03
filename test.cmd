set DEBUG=%1
cscript %DEBUG% build/ohMsOffh2Pdf.js %~dp0test/test.pub %temp%\test.pub.pdf
cscript %DEBUG% build/ohMsOffh2Pdf.js %~dp0test/test.docx %temp%\test.docx.pdf
cscript %DEBUG% build/ohMsOffh2Pdf.js %~dp0test/test.xlsx %temp%\test.xlsx.pdf
cscript %DEBUG% build/ohMsOffh2Pdf.js %~dp0test/test.pptx %temp%\test.pptx.pdf
pause
