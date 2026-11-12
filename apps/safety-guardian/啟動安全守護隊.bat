@echo off
set "SITE_FILE=%~dp0index.html"
where chrome >nul 2>nul
if %errorlevel%==0 (
  start "" chrome "%SITE_FILE%"
) else (
  start "" "%SITE_FILE%"
)
