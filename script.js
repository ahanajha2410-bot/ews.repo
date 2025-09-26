document.addEventListener('DOMContentLoaded', () => {
    // --- 1. SIMULATED DATA ---
    const mockAlerts = [
        { village: "Bishnupur", type: "RED", description: "Water Quality: High Turbidity. Health: 5 Diarrhea cases.", status: "Pending Investigation", time: "1 hour ago" },
        { village: "Kakching", type: "AMBER", description: "Health: Cluster of 3 Fever/Vomiting reports.", status: "ASHA Verified", time: "4 hours ago" },
        { village: "Imphal West", type: "RED", description: "Water Quality: High TDS. Health: 2 Diarrhea cases.", status: "Field Team Dispatched", time: "8 hours ago" },
        { village: "Thoubal", type: "GREEN", description: "Routine water check passed. Health reports nominal.", status: "Closed", time: "1 day ago" },
    ];

    // --- 2. POPULATE ALERT LOG ---
    const alertList = document.getElementById('alert-list');
    mockAlerts.forEach(alert => {
        const li = document.createElement('li');
        li.className = alert.type.toLowerCase();
        li.innerHTML = `
            <strong>${alert.type} Alert: ${alert.village}</strong> (${alert.time})<br>
            Reason: ${alert.description} | Status: <span class="status">${alert.status}</span>
        `;
        alertList.appendChild(li);
    });

    // --- 3. WATER QUALITY CHART (Time Series) ---
    const wqChartCanvas = document.getElementById('water-quality-chart').getContext('2d');
    const wqChart = new Chart(wqChartCanvas, {
        type: 'line',
        data: {
            labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Today'],
            datasets: [{
                label: 'Turbidity (NTU)',
                data: [2.1, 1.8, 3.5, 4.2, 7.9, 9.1, 8.5],
                borderColor: '#dc3545',
                fill: false,
                yAxisID: 'y'
            }, {
                label: 'WHO Limit (5 NTU)',
                data: [5, 5, 5, 5, 5, 5, 5],
                borderColor: 'rgba(0,0,0,0.5)',
                borderDash: [5, 5],
                pointRadius: 0,
                fill: false,
                yAxisID: 'y'
            }]
        },
        options: {
            responsive: true,
            title: { display: true, text: 'Turbidity Trend (Past 7 Days)' },
            scales: {
                y: { beginAtZero: true, title: { display: true, text: 'NTU' } }
            }
        }
    });

    // --- 4. DISEASE REPORTS CHART (Symptom Breakdown) ---
    const diseaseChartCanvas = document.getElementById('disease-reports-chart').getContext('2d');
    const diseaseChart = new Chart(diseaseChartCanvas, {
        type: 'bar',
        data: {
            labels: ['Diarrhea', 'Fever/Vomiting', 'Jaundice', 'Other'],
            datasets: [{
                label: 'Reports in Last 7 Days',
                data: [15, 8, 2, 4],
                backgroundColor: ['#007bff', '#ffc107', '#28a745', '#6c757d'],
            }]
        },
        options: {
            responsive: true,
            title: { display: true, text: 'Symptom Breakdown' },
            scales: {
                y: { beginAtZero: true, title: { display: true, text: 'Number of Reports' } }
            }
        }
    });

    // --- 5. UPDATE GLOBAL STATUS BAR ---
    const redAlertCount = mockAlerts.filter(a => a.type === 'RED').length;
    const globalStatusElement = document.getElementById('global-alert');
    if (redAlertCount > 0) {
        globalStatusElement.textContent = `Global Status: RED ALERT (${redAlertCount} active sites)`;
        globalStatusElement.className = 'red';
    } else if (mockAlerts.filter(a => a.type === 'AMBER').length > 0) {
        globalStatusElement.textContent = `Global Status: AMBER (Elevated Watch)`;
        globalStatusElement.className = 'amber';
    }
});