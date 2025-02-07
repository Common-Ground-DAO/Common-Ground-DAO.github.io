// Cost Visualization Handler
class CostVisualization {
    constructor(treasuryDataService) {
        this.dataService = treasuryDataService;
        this.charts = {};
        this.currentYear = '2025';
        this.currentCurrency = 'USD';
        this.colors = {
            infrastructure: '#3b82f6',
            corporate: '#10b981',
            expenses: '#f59e0b',
            salaries: '#ef4444',
            other: '#8b5cf6'
        };
    }

    initialize() {
        this.initializeCharts();
        this.setupEventListeners();
        this.updateVisualizations();
    }

    initializeCharts() {
        // Category Distribution Chart
        this.charts.category = new Chart(
            document.getElementById('cost-category-chart').getContext('2d'),
            {
                type: 'doughnut',
                data: {
                    labels: [],
                    datasets: [{
                        data: [],
                        backgroundColor: Object.values(this.colors)
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'right'
                        },
                        tooltip: {
                            callbacks: {
                                label: (context) => {
                                    const label = context.label || '';
                                    const value = this.formatCurrency(context.raw);
                                    const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                    const percentage = ((context.raw / total) * 100).toFixed(1);
                                    return `${label}: ${value} (${percentage}%)`;
                                }
                            }
                        }
                    }
                }
            }
        );

        // Infrastructure Breakdown Chart
        this.charts.infrastructure = new Chart(
            document.getElementById('infrastructure-breakdown-chart').getContext('2d'),
            {
                type: 'pie',
                data: {
                    labels: [],
                    datasets: [{
                        data: [],
                        backgroundColor: this.generateColors(5)
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'right'
                        }
                    }
                }
            }
        );

        // Monthly Cost Trend Chart
        this.charts.monthly = new Chart(
            document.getElementById('monthly-cost-chart').getContext('2d'),
            {
                type: 'bar',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    datasets: []
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            stacked: true
                        },
                        y: {
                            stacked: true,
                            beginAtZero: true,
                            ticks: {
                                callback: value => this.formatCurrency(value)
                            }
                        }
                    }
                }
            }
        );

        // Entity Cost Chart
        this.charts.entity = new Chart(
            document.getElementById('entity-cost-chart').getContext('2d'),
            {
                type: 'bar',
                data: {
                    labels: [],
                    datasets: [{
                        data: [],
                        backgroundColor: this.generateColors(2)
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                callback: value => this.formatCurrency(value)
                            }
                        }
                    }
                }
            }
        );

        // Currency Distribution Chart
        this.charts.currency = new Chart(
            document.getElementById('currency-distribution-chart').getContext('2d'),
            {
                type: 'pie',
                data: {
                    labels: ['USD', 'EUR'],
                    datasets: [{
                        data: [],
                        backgroundColor: ['#3b82f6', '#10b981']
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'right'
                        }
                    }
                }
            }
        );
    }

    setupEventListeners() {
        // Year filter
        document.getElementById('cost-year-filter').addEventListener('change', (e) => {
            this.currentYear = e.target.value;
            this.updateVisualizations();
        });

        // Currency display
        document.getElementById('cost-currency-display').addEventListener('change', (e) => {
            this.currentCurrency = e.target.value;
            this.updateVisualizations();
        });

        // Table sorting
        document.getElementById('cost-table-sort').addEventListener('change', (e) => {
            this.sortCostTable(e.target.value);
        });

        // Search
        document.getElementById('cost-search').addEventListener('input', (e) => {
            this.filterCostTable(e.target.value);
        });
    }

    updateVisualizations() {
        const costData = this.dataService.getCostsByYear()[this.currentYear];
        if (!costData) return;

        this.updateMetrics(costData);
        this.updateCategoryChart(costData);
        this.updateInfrastructureChart(costData);
        this.updateMonthlyChart(costData);
        this.updateEntityChart(costData);
        this.updateCurrencyChart();
        this.updateCostTable(costData);
    }

    updateMetrics(costData) {
        // Update total annual cost
        document.getElementById('total-annual-cost').textContent = 
            this.formatCurrency(costData.total);

        // Update monthly burn rate
        document.getElementById('monthly-burn-rate').textContent = 
            this.formatCurrency(costData.total / 12);

        // Update infrastructure cost - sum up individual infrastructure items
        const infraItems = costData.byCategory.expenses?.mainCategories?.Infrastructure?.items || [];
        const infraCost = infraItems.reduce((sum, item) => sum + (item.amountUSD || 0), 0);
        document.getElementById('infrastructure-cost').textContent = 
            this.formatCurrency(infraCost);

        // Update corporate cost
        const corpCost = costData.byCategory.corporate?.total || 0;
        document.getElementById('corporate-cost').textContent = 
            this.formatCurrency(corpCost);
    }

    updateCategoryChart(costData) {
        const categories = Object.keys(costData.byCategory);
        const values = categories.map(cat => costData.byCategory[cat].total);

        this.charts.category.data.labels = categories;
        this.charts.category.data.datasets[0].data = values;
        this.charts.category.update();
    }

    updateInfrastructureChart(costData) {
        // Get infrastructure data from expenses category
        const expensesCategory = costData.byCategory.expenses;
        if (!expensesCategory?.mainCategories?.Infrastructure) return;

        const infraData = expensesCategory.mainCategories.Infrastructure;
        const items = infraData.items;

        // Update chart with infrastructure items
        this.charts.infrastructure.data.labels = items.map(item => item.description);
        this.charts.infrastructure.data.datasets[0].data = items.map(item => item.amountUSD);
        this.charts.infrastructure.update();
    }

    updateMonthlyChart(costData) {
        const categories = Object.keys(costData.byCategory);
        const datasets = categories.map((category, index) => ({
            label: category,
            data: Array(12).fill(costData.byCategory[category].total / 12),
            backgroundColor: this.colors[category.toLowerCase()] || this.colors.other
        }));

        this.charts.monthly.data.datasets = datasets;
        this.charts.monthly.update();
    }

    updateEntityChart(costData) {
        const entityData = this.dataService.getCostsByEntity();
        const entities = Object.keys(entityData);
        const values = entities.map(entity => 
            entityData[entity].byYear[this.currentYear]?.total || 0
        );

        this.charts.entity.data.labels = entities;
        this.charts.entity.data.datasets[0].data = values;
        this.charts.entity.update();
    }

    updateCurrencyChart() {
        const currencyData = this.dataService.getCostsByCurrency();
        const values = [
            currencyData.USD?.total || 0,
            currencyData.EUR?.total || 0
        ];

        this.charts.currency.data.datasets[0].data = values;
        this.charts.currency.update();
    }

    updateCostTable(costData) {
        const tbody = document.getElementById('cost-details-table').querySelector('tbody');
        tbody.innerHTML = '';

        Object.entries(costData.byCategory).forEach(([category, data]) => {
            data.items.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${category}</td>
                    <td>${item.mainCategory || '-'}</td>
                    <td>${item.subCategory || '-'}</td>
                    <td>${this.formatCurrency(item.amountUSD)}</td>
                    <td>${item.originalValue || '-'}</td>
                `;
                tbody.appendChild(row);
            });
        });
    }

    sortCostTable(criteria) {
        const tbody = document.getElementById('cost-details-table').querySelector('tbody');
        const rows = Array.from(tbody.querySelectorAll('tr'));

        rows.sort((a, b) => {
            const aValue = a.cells[this.getSortColumnIndex(criteria)].textContent;
            const bValue = b.cells[this.getSortColumnIndex(criteria)].textContent;
            return this.compareValues(aValue, bValue, criteria);
        });

        tbody.innerHTML = '';
        rows.forEach(row => tbody.appendChild(row));
    }

    filterCostTable(searchTerm) {
        const tbody = document.getElementById('cost-details-table').querySelector('tbody');
        const rows = tbody.querySelectorAll('tr');

        rows.forEach(row => {
            const text = Array.from(row.cells).map(cell => cell.textContent).join(' ').toLowerCase();
            row.style.display = text.includes(searchTerm.toLowerCase()) ? '' : 'none';
        });
    }

    getSortColumnIndex(criteria) {
        switch (criteria) {
            case 'category': return 0;
            case 'entity': return 1;
            case 'amount': return 3;
            default: return 0;
        }
    }

    compareValues(a, b, criteria) {
        if (criteria === 'amount') {
            return this.parseAmount(b) - this.parseAmount(a);
        }
        return a.localeCompare(b);
    }

    parseAmount(value) {
        return parseFloat(value.replace(/[^0-9.-]+/g, '')) || 0;
    }

    formatCurrency(value) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: this.currentCurrency,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(value);
    }

    formatOriginalAmount(amount, currency) {
        if (!currency) return '-';
        
        // Use European locale for EUR, US locale for USD
        const locale = currency === 'EUR' ? 'de-DE' : 'en-US';
        
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(amount);
    }

    generateColors(count) {
        const baseColors = [
            '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6',
            '#ec4899', '#14b8a6', '#f97316', '#6366f1', '#84cc16'
        ];
        return Array(count).fill().map((_, i) => baseColors[i % baseColors.length]);
    }
}

export { CostVisualization }; 