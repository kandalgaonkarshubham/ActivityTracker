# ActivityTracker
ActivityTracker is an all-in-one time management solution, built with HTML, PHP, CSS, JavaScript and MySQL. With features such as a Stopwatch, Calendar, Calculator, and Taskify, it is the perfect tool for tracking and organizing your daily activities. Keep a record of your computer usage with the Stopwatch, see a visual representation of your usage history with the Calendar, Calculate the electricity cost of your computer with the Calculator, and stay on top of your tasks with the Taskify to-do list. Stay productive and organized with ActivityTracker.

## References
While working on this project, I used a few open-source libraries and elements that I found on the internet. The majority of the visual elements in this project are taken from [uiverse](https://uiverse.io). They are listed below:
- The Preloader is obtained from https://uiverse.io/alexruix/tame-fly-42.
- The Dark Mode Switch is obtained from https://uiverse.io/satyamchaudharydev/shy-earwig-18.
- The Info/Edit Button is obtained from https://uiverse.io/fanishah/smart-dog-17.
- The Delete Button is obtained from https://uiverse.io/cssbuttons-io/stupid-impala-51.
- The Stopwatch (Home Page) was adapted from [CodingLab](https://www.codinglabweb.com/2021/10/Stopwatch-HTML-CSS-JavaScript.html) and modified.
- The Calendar page is an Open Source Library - [Github](https://github.com/nggepe/calendar-gc).
- The Taskify page is based on a Bootstrap 4 template obtained from [CodePen](https://codepen.io/paulj05hua/pen/LYGLJYQ), which I later modified to support the latest Bootstrap 5 version and improved the look and feel by changing few things.
- I used [HackTimer.js](https://github.com/turuslan/HackTimer) to Avoid timers throttling by browser when tab is inactive.
- In the Stopwatch Page, I used the [Screen Wake Lock API](https://developer.mozilla.org/en-US/docs/Web/API/WakeLock), which is an experimental technology that prevents device screens from dimming or locking when an application needs to run. Sometimes it doesn't work, thats why on the Homepage you will get notification every 6 hour to open your respective browser's discard page to disable the Stopwatch page's to snooze.
More information about the discards page can be found on [Mozilla's Docs](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/tabs/discard),[Chrome Auto Discarding](https://stackoverflow.com/questions/49172240/chrome-auto-tab-discarding-disable-java-script) and [Auto Discarding Solution](https://stackoverflow.com/questions/48992045/how-to-disable-automatic-tab-discarding-on-chrome-debian).

## Technologies Used
ActivityTracker is built with the following technologies:
- HTML
- PHP
- CSS
- JavaScript
- JQuery
- Ajax
- MySQL

## Features
ActivityTracker offers several features along with `Light/dark mode toggle` and `Cross platform compatibility` to help you monitor your computer usage:

### StopWatch
The StopWatch page features a standard stopwatch that starts when you want, and allows you to stop the time and store it in a MySQL database for the current day. You can use the stopwatch multiple times per day to keep track of your computer usage.Also the Homepage is set to Stopwatch by default, allowing you to start monitoring your computer usage right away.

### Calendar
The Calendar page displays a calendar that shows the total computer usage time for each day, based on the stopwatch data stored in the database. This feature allows you to see at a glance how much time you spend on your computer each day.

### Calculator
The Calculator page is designed to help you calculate the cost of electricity in rupees, based on the data from the database. You can set a custom watt value and date, and use the slider to determine how many days of data you want to fetch. The data is displayed in a table, with columns for Date, Hours, and Units. The Hour column shows the total hours, while the Unit column shows the equivalent units converted from the total hours using a formula based on the wattage value. The bottom of the page displays the total cost in rupees for the selected choices.

To Calculate consumption from hours i used the following way :

* **First we have to convert hours to kilowatt-hours (kWh) and then to units**

```
u = (h * pr / 1000) * 1000 / pr
```

Where:

*u* is the number of units

*h* is the number of hours

*pr* is the power rating of the appliance in watts.


For example, to convert 2 hours of usage to units for an appliance with a power rating of 1000 watts:

```
u = (2 * 1000 / 1000) * 1000 / 1000
  = 2 * 1
  = 2
```
This means that the appliance has consumed 2 units of electricity.

* **Now to calculate the cost in INR, we can then multiply the number of units by the rate per unit.**
For example, we take the rate per unit as INR 7.50, then total cost would be:
```
totalCost = units * ratePerUnit
          = 2 * 7.50
          = INR 15.00
```
#### NOTE 
* The preceding is just an example of the type of formula I used in my code to calculate consumption in INR.
* The rate per unit is dependant on how many units are consumed, *For example, The SBPDCL charges Rs. 4.22 for the first 100 units, Rs. 5.02 for the next 101-200 units, and Rs. 5.87 for the next 200-300 units for energy*.

* I used the *unit/rupee* values from my Light Bill (MahaVitaran), in my code. You can find yours on the backside of your Light Bill in a Table Format.

* You can modify the *Unit Group* and *Rate of Unit* values in my code to reflect your preferences; they are located at the bottom of `calc.js`, in `/!— CALCULATING AND PRINTING PRICE —>`.I used [if-else ladder](https://www.w3schools.com/js/js_if_else.asp) to calculate and print the final consumption.


### Taskify
The Taskify page is a simple to-do list website where you can create, delete and edit to-do items with due dates. This feature allows you to keep track of your tasks and stay organized.

## Conclusion
In conclusion, ActivityTracker is a comprehensive website that offers several features to help you track your computer activity and usage. Whether you're looking to monitor your time spent on the computer or keep track of your tasks, ActivityTracker has you covered. Also This started out as a personal project for my personal use. It started out with just a stopwatch, but as I came up with new ideas, I added them. I wasn't expecting to add so many features to this.


## Installation
To use ActivityTracker, you need to have a web server with PHP and MySQL installed(I used XAAMP). Follow these steps to get started:

1. `Download Zip` or Clone the repository to your local machine:
```bash
  https://github.com/kandalgaonkarshubham/ActivityTracker.git
```

2. Create a database in MYSQL with name "activitytracker"(Without the quotes).

3. Import the `activitytracker.sql` file to your MySQL database. This file contains the necessary tables for the website to function properly.

4. Update the database connection information in the `authentication/connect.php` file to match your MySQL setup.

5. Launch the website by visiting the index.html file in your web browser.

## Contribution
If you're interested in contributing to the development of ActivityTracker, you can do so by submitting a pull request with your changes. All contributions are welcome and appreciated.

## License
ActivityTracker is licensed under the [GNU GPLv3](https://choosealicense.com/licenses/gpl-3.0/). Feel free to use and modify the code as you see fit.


