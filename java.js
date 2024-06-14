"use strict";

function addMonths(elem) {
    var annualUseKw = 0, dailyUseKw = 0, i = 0, x = 0;
    var months = document.getElementById(elem).getElementsByTagName('input');
    for (i = 0; i < months.length; i++) {
        x = Number(months[i].value);
        if (isNaN(x) || x < 0) {
            alert("Please enter a valid number for all months.");
            return;
        }
        annualUseKw += x;
    }
    dailyUseKw = annualUseKw / 365;
    return dailyUseKw;
}

function sunHours() {
    var hrs;
    var theZone = document.forms.solarForm.zone.selectedIndex;
    theZone += 1;
    switch (theZone) {
        case 1:
            hrs = 6;
            break;
        case 2:
            hrs = 5.5;
            break;
        case 3:
            hrs = 5;
            break;
        case 4:
            hrs = 4.5;
            break;
        case 5:
            hrs = 4.2;
            break;
        case 6:
            hrs = 3.5;
            break;
        default:
            hrs = 0;
    }
    return hrs;
}

function calculatePanel() {
    var userChoice = document.forms.solarForm.panel.selectedIndex;
    var panelOptions = document.forms.solarForm.panel.options;
    var power = panelOptions[userChoice].value;
    var name = panelOptions[userChoice].text;
    return [power, name];
}

function calculateSolar() {
    var dailyUseKw = addMonths('mpc');
    var sunHoursPerDay = sunHours();
    var minKwNeeds = dailyUseKw / sunHoursPerDay;
    var realKwNeeds = minKwNeeds * 1.25;
    var realWattNeeds = realKwNeeds * 1000;
    var panelInfo = calculatePanel();
    var panelOutput = panelInfo[0];
    var panelName = panelInfo[1];
    var panelsNeeded = Math.ceil(realWattNeeds / panelOutput);

    var feedback = "";
    feedback += "<p style='color: green;'>Based on your average daily use of " + Math.round(dailyUseKw) + " kWh you will need to purchase " + panelsNeeded + " " + panelName + " solar panels to offset 100% of your electricity bill.</p>";
    feedback += "<h2>Additional Details</h2>";
    feedback += "<p>Your average daily electricity consumption: " + Math.round(dailyUseKw) + " kWh per day.</p>";
    feedback += "<p>Average sunshine hours per day: " + sunHoursPerDay + " hours.</p>";
    feedback += "<p>Realistic watts needed per hour: " + Math.round(realWattNeeds) + " watts/hour.</p>";
    feedback += "<p>The " + panelName + " panel you selected generates about " + panelOutput + " watts per day.</p>";

    document.getElementById('feedback').innerHTML = feedback;

    saveData();
}

function resetForm() {
    document.forms.solarForm.reset();
    document.getElementById('feedback').innerHTML = "<p>Enter your information above to calculate your solar needs.</p>";
}

function saveData() {
    var form = document.forms.solarForm;
    var data = {
        jan: form.jan.value,
        feb: form.feb.value,
        mar: form.mar.value,
        apr: form.apr.value,
        may: form.may.value,
        jun: form.jun.value,
        jul: form.jul.value,
        aug: form.aug.value,
        sep: form.sep.value,
        oct: form.oct.value,
        nov: form.nov.value,
        dec: form.dec.value,
        zone: form.zone.selectedIndex,
        panel: form.panel.selectedIndex
    };
    localStorage.setItem('solarData', JSON.stringify(data));
}

function loadData() {
    var data = JSON.parse(localStorage.getItem('solarData'));
    if (data) {
        var form = document.forms.solarForm;
        form.jan.value = data.jan;
        form.feb.value = data.feb;
        form.mar.value = data.mar;
        form.apr.value = data.apr;
        form.may.value = data.may;
        form.jun.value = data.jun;
        form.jul.value = data.jul;
        form.aug.value = data.aug;
        form.sep.value = data.sep;
        form.oct.value = data.oct;
        form.nov.value = data.nov;
        form.dec.value = data.dec;
        form.zone.selectedIndex = data.zone;
        form.panel.selectedIndex = data.panel;
    }
}

// Load saved data when the page loads
window.onload = loadData;
