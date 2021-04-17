"C:\Mine\MSI Afterburner\MSIAfterburner.exe" -Profile3
tasklist /FI "IMAGENAME eq PhoenixMiner.exe" 2>NUL | find /I /N "PhoenixMiner.exe">NUL
if "%ERRORLEVEL%"=="0" (
	echo Program is running
) else (
    REM
    REM Example bat file for starting PhoenixMiner.exe to mine ETH
    REM

    setx GPU_FORCE_64BIT_PTR 0
    setx GPU_MAX_HEAP_SIZE 100
    setx GPU_USE_SYNC_OBJECTS 1
    setx GPU_MAX_ALLOC_PERCENT 100
    setx GPU_SINGLE_ALLOC_PERCENT 100

    REM IMPORTANT: Replace the ETH address with your own ETH wallet address in the -wal option (Rig001 is the name of the rig)
    PhoenixMiner.exe -pool eth-eu.sparkpool.com:3333 -pool2 eth-eu.sparkpool.com:13333 -wal sp_tomvedor.777
    pause
	"C:\Mine\MSI Afterburner\MSIAfterburner.exe" -Profile1
)