@echo off
REM === Get local IPv4 address ===
setlocal enabledelayedexpansion
set ip=

for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /i "IPv4"') do (
    set ip=%%a
    set ip=!ip: =!
    goto :foundip
)

:foundip
REM If no IP found, fallback to localhost
if "%ip%"=="" set ip=127.0.0.1

echo Starting Python HTTP server on %ip%:8080 ...

REM Start the server in a new background window
start cmd /k "python -m http.server 8080"

REM Give it a second to start
timeout /t 2 >nul

REM Open default web browser to the local address
start http://%ip%:8080/

endlocal
exit
