@ECHO OFF
    start "" %1 /n
    C:\Users\%USERNAME%\Documents\GitHub\workspace\src\assets\scripts\nircmd.exe cmdwait 1500
    C:\Users\%USERNAME%\Documents\GitHub\workspace\src\assets\scripts\nircmd.exe win setsize foreground  %2, %3, %4, %5
  