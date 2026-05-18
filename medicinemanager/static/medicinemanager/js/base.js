class CustomDate extends Date
{
    #dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    #monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    dateEquals(otherDate)
    {
        return (this.getDate() == otherDate.getDate()) && (this.getMonth() == otherDate.getMonth()) && (this.getFullYear() == otherDate.getFullYear());
    }

    dateIsBetween(startDate, endDate)
    {
        return (startDate.getDate() <= this.getDate()) && (this.getDate() <= endDate.getDate()) && (startDate.getMonth() <= this.getMonth()) && (this.getMonth() <= endDate.getMonth()) && (startDate.getFullYear() <= this.getFullYear()) && (this.getFullYear() <= endDate.getFullYear());
    }
    timeIsBetween(startTime, endTime)
    {
        return ((startTime.getTime() <= this.getTime()) && (this.getTime() <= endTime.getTime()));
    }
    timeIsGreaterThan(otherTime)
    {
        return (
            (this.getHours() > otherTime.getHours())
            || (
                (this.getHours() == otherTime.getHours())
                && (this.getMinutes() > otherTime.getMinutes())
               )
        );
    }

    getDayName()
    {
        return this.#dayNames[this.getDay()];
    }

    getMonthName()
    {
        return this.#monthNames[this.getMonth()];
    }
}


const menuBtn = document.getElementById('menu-btn');
const navMenu = document.getElementById('nav-menu');
const menuIcon = document.getElementById('menu-icon');
let today = new CustomDate();

let times_of_day_ranges = {
    morning: {
        start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 5, 0),
        end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 11, 59)
    },
    afternoon: {
        start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12, 0),
        end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 15, 59)
    },
    evening: {
        start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 4, 0),
        end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 18, 59)
    },
    night: {
        start: new Date(today.getFullYear(), today.getMonth(), today.getDate() - ((today.getTime() < (new Date(today.getFullYear(), today.getMonth(), today.getDate(), 5, 0)).getTime())), 19, 0),
        end: new Date(today.getFullYear(), today.getMonth(), today.getDate() + (!(today.getTime() < (new Date(today.getFullYear(), today.getMonth(), today.getDate(), 5, 0)).getTime())), 4, 59)
    }
};


function getCurrentTimeOfDay()
{
    if (
        (times_of_day_ranges.morning.start.getTime() <= today.getTime())
        &&
        (today.getTime() <= times_of_day_ranges.morning.end.getTime())
    )
    {
        return "1";
    }
    if (
        (times_of_day_ranges.afternoon.start.getTime() <= today.getTime())
        &&
        (today.getTime() <= times_of_day_ranges.afternoon.end.getTime())
    )
    {
        return "2";
    }
    if (
        (times_of_day_ranges.evening.start.getTime() <= today.getTime())
        &&
        (today.getTime() <= times_of_day_ranges.evening.end.getTime())
    )
    {
        return "3";
    }
    if (
        (times_of_day_ranges.night.start.getTime() <= today.getTime())
        &&
        (today.getTime() <= times_of_day_ranges.night.end.getTime())
    )
    {
        return "4";
    }
}


menuBtn.addEventListener('click', () => {
    const isHidden = navMenu.classList.contains('hidden');
    
    if (isHidden) {
        navMenu.classList.remove('hidden');
        menuIcon.classList.remove('fa-bars');
        menuIcon.classList.add('fa-xmark');
    } else {
        navMenu.classList.add('hidden');
        menuIcon.classList.remove('fa-xmark');
        menuIcon.classList.add('fa-bars');
    }
});
