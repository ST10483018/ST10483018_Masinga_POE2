# Change Log 
## 1 Added new screen 
Added a new separte menu managment screen, and a filter screen. 

## 2 Removed MenuContext
All pages (HomePage, AddEditDish, FilterMenu) were refactored to manage menu state directly through App.tsx instead of context.

## 3 Navigation Updates
App.tsx simplified to include only:
HomePage
AddEditDish
FilterMenu
Props (menu, setMenu) are now passed directly via navigation screens.

## 4 Expo & Dependencies
Adjusted for latest expo 54.0.x compatibility.
Updated imports for React Native and navigation stack.

## 5 Moved total dishes 
moved it to same Homepage as average. 
