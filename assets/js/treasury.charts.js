(function() {
  // Chart instances
  let incomingTokenChart = null;
  let outgoingTokenChart = null;
  let volumeChart = null;

  // Token chart creation
  function createTokenCharts() {
    const colors = [
      '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
      '#FF9F40', '#FF6384', '#C9CBCF'
    ];

    const incomingTokens = processTokenVolumes(window.treasury.incomingTx);
    const outgoingTokens = processTokenVolumes(window.treasury.outgoingTx);

    // Create or update charts
    updateTokenChart('incomingTokenChart', incomingTokens, colors);
    updateTokenChart('outgoingTokenChart', outgoingTokens, colors);
    createCombinedLegend(incomingTokens, outgoingTokens, colors);
  }

  function updateTokenChart(canvasId, tokens, colors) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const chart = canvasId === 'incomingTokenChart' ? incomingTokenChart : outgoingTokenChart;
    
    // Destroy existing chart
    if (chart) {
      chart.destroy();
    }

    // Default chart configuration
    const config = {
      type: 'doughnut',
      options: {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 1,
        plugins: {
          legend: { display: false }
        }
      }
    };

    // Handle empty data case
    if (!tokens || tokens.length === 0) {
      config.data = {
        labels: ['No Data'],
        datasets: [{
          data: [1],
          backgroundColor: ['#f5f5f5'],
          borderWidth: 0
        }]
      };
    } else {
      config.data = {
        labels: tokens.map(([token]) => token),
        datasets: [{
          data: tokens.map(([,value]) => value),
          backgroundColor: colors.slice(0, tokens.length),
          borderWidth: 1
        }]
      };
    }

    // Create new chart
    const newChart = new Chart(ctx, config);
    
    // Store reference
    if (canvasId === 'incomingTokenChart') {
      incomingTokenChart = newChart;
    } else {
      outgoingTokenChart = newChart;
    }
  }

  function processTokenVolumes(transactions) {
    const tokenVolumes = transactions.reduce((acc, tx) => {
      const token = tx.token;
      acc[token] = (acc[token] || 0) + window.treasury.parseUSDValue(tx.valueUSD);
      return acc;
    }, {});

    const sortedTokens = Object.entries(tokenVolumes)
      .sort(([,a], [,b]) => b - a)
      .filter(([,value]) => value > 0);

    const OTHERS_THRESHOLD = 0.02;
    const totalVolume = sortedTokens.reduce((sum, [,value]) => sum + value, 0);
    
    let chartTokens = [];
    let othersValue = 0;
    
    sortedTokens.forEach(([token, value]) => {
      if (value / totalVolume < OTHERS_THRESHOLD) {
        othersValue += value;
      } else {
        chartTokens.push([token, value]);
      }
    });
    
    if (othersValue > 0) {
      chartTokens.push(['Others', othersValue]);
    }

    return chartTokens;
  }

  function createCombinedLegend(incomingTokens, outgoingTokens, colors) {
    // Combine and deduplicate tokens
    const allTokens = new Set([
      ...incomingTokens.map(([token]) => token),
      ...outgoingTokens.map(([token]) => token)
    ]);

    const legend = document.getElementById('token-legend');
    
    if (allTokens.size === 0) {
      legend.innerHTML = '<div class="token-legend-item">No token transactions</div>';
      return;
    }

    legend.innerHTML = Array.from(allTokens).map((token, index) => {
      const incomingValue = incomingTokens.find(([t]) => t === token)?.[1] || 0;
      const outgoingValue = outgoingTokens.find(([t]) => t === token)?.[1] || 0;
      
      return `
        <div class="token-legend-item">
          <div class="token-legend-color" style="background: ${colors[index]}"></div>
          <span class="token-legend-label">${token}</span>
          <div class="token-legend-values">
            <span class="incoming">+$${incomingValue.toLocaleString('en-US', { maximumFractionDigits: 2 })}</span>
            <span class="outgoing">-$${outgoingValue.toLocaleString('en-US', { maximumFractionDigits: 2 })}</span>
          </div>
        </div>
      `;
    }).join('');
  }

  function createVolumeChart() {
    const canvas = document.getElementById('volumeChart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    if (volumeChart) {
      volumeChart.destroy();
    }

    const chartData = prepareChartData();
    
    volumeChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: chartData.labels,
        datasets: [
          {
            label: 'Incoming',
            data: chartData.incoming,
            backgroundColor: 'rgba(46, 204, 113, 0.2)',
            borderColor: 'rgba(46, 204, 113, 1)',
            borderWidth: 1
          },
          {
            label: 'Outgoing',
            data: chartData.outgoing,
            backgroundColor: 'rgba(231, 76, 60, 0.2)',
            borderColor: 'rgba(231, 76, 60, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 2,
        plugins: {
          tooltip: {
            callbacks: {
              label: context => {
                const label = context.dataset.label;
                const value = context.raw;
                return `${label}: $${value.toLocaleString()}`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: value => '$' + value.toLocaleString()
            }
          }
        }
      }
    });
  }

  function prepareChartData() {
    const monthlyVolumes = {};
    
    window.treasury.transactions.forEach(tx => {
      const date = new Date(tx.date);
      const monthKey = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
      
      if (!monthlyVolumes[monthKey]) {
        monthlyVolumes[monthKey] = { incoming: 0, outgoing: 0 };
      }
      
      const value = window.treasury.parseUSDValue(tx.valueUSD);
      if (window.treasury.incomingTx.includes(tx)) {
        monthlyVolumes[monthKey].incoming += value;
      } else {
        monthlyVolumes[monthKey].outgoing += value;
      }
    });
    
    const sortedMonths = Object.keys(monthlyVolumes).sort();
    
    return {
      labels: sortedMonths.map(month => {
        const [year, monthNum] = month.split('-');
        return `${monthNum}/${year}`;
      }),
      incoming: sortedMonths.map(month => monthlyVolumes[month].incoming),
      outgoing: sortedMonths.map(month => monthlyVolumes[month].outgoing)
    };
  }

  // Make functions globally available
  window.treasuryCharts = {
    createTokenCharts,
    createVolumeChart
  };
})(); 
