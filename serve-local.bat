@Echo Off

:: Default environment variables
set IS_LOCAL=true
set NODE_ENV=dev

:: serve backend
CALL npm run serve
