document.addEventListener("DOMContentLoaded", function () {
        // Year tabs
        const tab2025 = document.getElementById("tab2025");
        const tab2026 = document.getElementById("tab2026");
        const currentYear = document.getElementById("current-year");

        tab2025.addEventListener("click", () => {
          tab2025.classList.add("tab-active");
          tab2026.classList.remove("tab-active");
          currentYear.textContent = "2025";
          updateCalendar(2025, currentMonth);
        });

        tab2026.addEventListener("click", () => {
          tab2026.classList.add("tab-active");
          tab2025.classList.remove("tab-active");
          currentYear.textContent = "2026";
          updateCalendar(2026, currentMonth);
        });

        // Calendar logic
        const months = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
        const calendarDays = document.getElementById("calendar-days");
        const currentMonthElement = document.getElementById("current-month");
        const nextMonthBtn = document.getElementById("next-month");
        const prevMonthBtn = document.getElementById("prev-month");
        const todayBtn = document.getElementById("today");

        const today = new Date();
        let currentYearVal = 2025;
        let currentMonth = today.getMonth();

        function updateCalendar(year, month) {
          // Update year and month
          currentYearVal = year;
          currentMonth = month;
          currentMonthElement.textContent = months[month];
          currentYear.textContent = year;

          // Get first and last day of month
          const firstDay = new Date(year, month, 1);
          const lastDay = new Date(year, month + 1, 0);

          // Calculate days from previous month to display
          const daysFromPrevMonth = firstDay.getDay();

          // Calculate days from next month to display
          const totalDays = lastDay.getDate();
          const daysFromNextMonth = 6 - lastDay.getDay();

          // Create days array
          let days = [];

          // Previous month days
          if (daysFromPrevMonth > 0) {
            const prevMonthLastDay = new Date(year, month, 0).getDate();
            for (
              let i = prevMonthLastDay - daysFromPrevMonth + 1;
              i <= prevMonthLastDay;
              i++
            ) {
              days.push({ day: i, month: "prev" });
            }
          }

          // Current month days
          for (let i = 1; i <= totalDays; i++) {
            days.push({
              day: i,
              month: "current",
              isToday:
                i === today.getDate() &&
                month === today.getMonth() &&
                year === today.getFullYear(),
            });
          }

          // Next month days
          for (let i = 1; i <= daysFromNextMonth; i++) {
            days.push({ day: i, month: "next" });
          }

          // Generate calendar HTML
          calendarDays.innerHTML = "";
          days.forEach((day) => {
            const dayElem = document.createElement("div");
            dayElem.className = `calendar-day flex flex-col items-center justify-center p-1 transition-all rounded-xl ${
              day.month === "current"
                ? "bg-white hover:bg-planner-pink hover:bg-opacity-20 cursor-pointer"
                : "text-gray-300"
            } ${
              day.isToday
                ? "bg-planner-purple bg-opacity-20 border-2 border-planner-purple"
                : ""
            }`;

            dayElem.innerHTML = `
                        <span class="font-semibold">${day.day}</span>
                        ${
                          day.month === "current"
                            ? '<div class="h-1 w-1 rounded-full bg-planner-darkpink bg-opacity-50 mt-1"></div>'
                            : ""
                        }
                    `;
            calendarDays.appendChild(dayElem);
          });
        }

        nextMonthBtn.addEventListener("click", () => {
          if (currentMonth === 11) {
            currentMonth = 0;
            currentYearVal++;
          } else {
            currentMonth++;
          }
          updateCalendar(currentYearVal, currentMonth);
        });

        prevMonthBtn.addEventListener("click", () => {
          if (currentMonth === 0) {
            currentMonth = 11;
            currentYearVal--;
          } else {
            currentMonth--;
          }
          updateCalendar(currentYearVal, currentMonth);
        });

        todayBtn.addEventListener("click", () => {
          currentMonth = today.getMonth();
          // Set correct year tab
          if (today.getFullYear() === 2025) {
            tab2025.classList.add("tab-active");
            tab2026.classList.remove("tab-active");
          } else {
            tab2026.classList.add("tab-active");
            tab2025.classList.remove("tab-active");
          }
          updateCalendar(today.getFullYear(), currentMonth);
        });

        // Initialize calendar
        updateCalendar(2025, today.getMonth());
      });