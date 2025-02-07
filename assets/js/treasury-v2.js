import { treasuryDataService } from '/assets/js/treasury-v2-data.js';
import { CostVisualization } from '/assets/js/treasury-cost-charts.js';

// Treasury Dashboard V2
class TreasuryDashboard {
    constructor() {
        this.charts = {};
        this.data = {
            metrics: null,
            assets: null,
            liabilities: null,
            fxRates: null,
            structuredData: null
        };
        this.costViz = null;
        this.init();
    }

    async init() {
        try {
            await this.loadData();
            this.initializeCharts();
            this.setupEventListeners();
            this.render();
            
            // Initialize cost visualizations
            this.costViz = new CostVisualization(treasuryDataService);
            this.costViz.initialize();
            
            // Setup auto-refresh every 5 minutes
            setInterval(() => this.refreshData(), 5 * 60 * 1000);
        } catch (error) {
            console.error('Failed to initialize dashboard:', error);
            this.handleError(error);
        }
    }

    async loadData() {
        let isDataValid = false;
        try {
            // Show loading state
            this.setLoadingState(true);
            
            // Try up to 3 times with exponential backoff
            for (let attempt = 1; attempt <= 3; attempt++) {
                try {
                    await treasuryDataService.fetchData();
                    break;
                } catch (error) {
                    if (attempt === 3) throw error;
                    await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt - 1) * 1000));
                }
            }
            
            // Get structured data from service
            this.data.metrics = treasuryDataService.getDashboardMetrics();
            
            // If total liquid is 0 or null, keep the loading state and retry
            if (this.data.metrics.liquidAssets === 0) {
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    return this.loadData();
            }
            
            // Mark data as valid and load the remaining data
            isDataValid = true;
            this.data.assets = treasuryDataService.getAssetBreakdown();
            this.data.liabilities = treasuryDataService.getLiabilityBreakdown();
            this.data.fxRates = treasuryDataService.getFXRates();
            this.data.structuredData = treasuryDataService.structuredData;
            
            // Calculate changes
            this.calculateChanges();
        } catch (error) {
            console.error('Error loading data:', error);
            this.handleError(new Error('Failed to load treasury data. Please check your connection and try again.'));
        } finally {
            // Only remove loading state if valid data has been loaded
            if (isDataValid) {
                this.setLoadingState(false);
            }
        }
    }

    setLoadingState(isLoading) {
        const dashboard = document.querySelector('.dashboard-container');
        if (!dashboard) return;
        
        // Ensure the dashboard container is positioned relative so the absolute overlay is correctly positioned
        dashboard.style.position = 'relative';
        
        if (isLoading) {
            let overlay = document.getElementById('dashboard-loading-overlay');
            if (!overlay) {
                overlay = document.createElement('div');
                overlay.id = 'dashboard-loading-overlay';
                overlay.innerHTML = `
                    <div class="spinner"></div>
                    <h2>Loading Treasury Data</h2>
                    <p>Please hold on while we gather the latest financial insights...</p>
                `;
                dashboard.appendChild(overlay);
            }
            
            // Style the overlay to cover the dashboard container with a smart white gradient
            overlay.style.position = 'absolute';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.width = '100%';
            overlay.style.height = '100%';
            overlay.style.display = 'flex';
            overlay.style.flexDirection = 'column';
            overlay.style.alignItems = 'center';
            overlay.style.justifyContent = 'flex-start';
            overlay.style.paddingTop = '20px';
            overlay.style.background = 'linear-gradient(135deg, #ffffff, #f0f0f0)';
            overlay.style.backdropFilter = 'blur(8px)';
            overlay.style.boxShadow = 'inset 0 0 30px rgba(0, 0, 0, 0.1)';
            overlay.style.zIndex = '1000';
            overlay.style.opacity = '1';
            overlay.style.transition = 'opacity 0.3s ease-in-out';
        } else {
            const overlay = document.getElementById('dashboard-loading-overlay');
            if (overlay) {
                overlay.style.opacity = '0';
                setTimeout(() => overlay.remove(), 300);
            }
        }
    }

    async refreshData() {
        // Clear existing refresh timer if it exists
        if (this.refreshTimer) {
            clearInterval(this.refreshTimer);
        }
        
        await this.loadData();
        this.render();
        
        // Update cost visualizations
        if (this.costViz) {
            this.costViz.updateVisualizations();
        }
        
        // Setup new refresh timer
        this.refreshTimer = setInterval(() => this.refreshData(), 5 * 60 * 1000);
    }

    calculateChanges() {
        // Placeholder for calculating metric changes
        // This will be implemented when we have historical data
        this.data.changes = {
            totalBalance: 0,
            liquidAssets: 0,
            illiquidAssets: 0,
            assetCount: 0
        };
    }

    initializeCharts() {
        try {
            if (typeof Chart === 'undefined') {
                throw new Error('Chart.js is not loaded');
            }
            
            // Cleanup existing charts
            Object.values(this.charts).forEach(chart => {
                if (chart && typeof chart.destroy === 'function') {
                    chart.destroy();
                }
            });
            this.charts = {};
            
            // Initialize new charts
            this.initializeLiquidPortfolioChart();
            this.initializeIlliquidPortfolioChart();
            this.initializeTokenDistributionChart();
            this.initializeTreasuryComponentsChart();
        } catch (error) {
            console.error('Failed to initialize charts:', error);
            this.handleError(error);
        }
    }

    initializeLiquidPortfolioChart() {
        const ctx = document.getElementById('liquid-portfolio-chart')?.getContext('2d');
        if (!ctx) {
            console.warn('Liquid portfolio chart canvas not found');
            return;
        }

        this.charts.liquidPortfolio = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: [],
                datasets: [{
                    data: [],
                    backgroundColor: []
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
                                const percentage = ((context.raw / context.dataset.data.reduce((a, b) => a + b, 0)) * 100).toFixed(1);
                                return `${label}: ${value} (${percentage}%)`;
                            }
                        }
                    }
                }
            }
        });
    }

    initializeIlliquidPortfolioChart() {
        const ctx = document.getElementById('illiquid-portfolio-chart')?.getContext('2d');
        if (!ctx) {
            console.warn('Illiquid portfolio chart canvas not found');
            return;
        }

        this.charts.illiquidPortfolio = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: [],
                datasets: [{
                    data: [],
                    backgroundColor: []
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
                                const percentage = ((context.raw / context.dataset.data.reduce((a, b) => a + b, 0)) * 100).toFixed(1);
                                return `${label}: ${value} (${percentage}%)`;
                            }
                        }
                    }
                }
            }
        });
    }

    initializeTokenDistributionChart() {
        const ctx = document.getElementById('token-distribution-chart')?.getContext('2d');
        if (!ctx) {
            console.warn('Token distribution chart canvas not found');
            return;
        }

        this.charts.tokenDist = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: [],
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
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                return `${context.dataset.label}: ${this.formatCurrency(context.raw)}`;
                            }
                        }
                    }
                }
            }
        });
    }

    initializeTreasuryComponentsChart() {
        const ctx = document.getElementById('treasury-components-chart')?.getContext('2d');
        if (!ctx) {
            console.warn('Treasury components chart canvas not found');
            return;
        }

        this.charts.components = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: [],
                datasets: [{
                    data: [],
                    backgroundColor: []
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
                                const percentage = ((context.raw / context.dataset.data.reduce((a, b) => a + b, 0)) * 100).toFixed(1);
                                return `${label}: ${value} (${percentage}%)`;
                            }
                        }
                    }
                }
            }
        });
    }

    setupEventListeners() {
        // Asset sorting
        document.getElementById('liquid-asset-sort').addEventListener('change', (e) => {
            this.sortAssets('liquid', e.target.value);
        });
        document.getElementById('illiquid-asset-sort').addEventListener('change', (e) => {
            this.sortAssets('illiquid', e.target.value);
        });
    }

    sortAssets(type, criteria) {
        const assets = type === 'liquid' ? this.getLiquidAssets() : this.getIlliquidAssets();
        
        switch (criteria) {
            case 'value':
                assets.sort((a, b) => b.value - a.value);
                break;
            case 'name':
                assets.sort((a, b) => a.name.localeCompare(b.name));
                break;
        }

        this.renderAssetList(type, assets);
    }

    getLiquidAssets() {
        const overview = this.data.structuredData?.overview;
        const multisig = this.data.structuredData?.multisig;
        if (!overview?.liquid || !multisig) return [];

        const assets = [];
        const tokenTotals = {};

        // Calculate token totals across all multisig wallets
        Object.values(multisig).forEach(wallet => {
            Object.entries(wallet).forEach(([token, amount]) => {
                if (token !== 'total') {
                    const upperToken = token.toUpperCase();
                    const fxRate = this.data.structuredData.fx[upperToken] || 1;
                    const valueUSD = amount * fxRate;
                    
                    if (!tokenTotals[upperToken]) {
                        tokenTotals[upperToken] = {
                            amount: 0,
                            valueUSD: 0
                        };
                    }
                    tokenTotals[upperToken].amount += amount;
                    tokenTotals[upperToken].valueUSD += valueUSD;
                }
            });
        });

        // Add token assets
        Object.entries(tokenTotals).forEach(([token, data]) => {
            assets.push({
                name: token,
                amount: data.amount,
                symbol: token,
                value: data.valueUSD,
                change: 0
            });
        });

        // Add receivables (combined)
        if (overview.liquid.outstanding?.receivables) {
            const totalReceivables = Object.values(overview.liquid.outstanding.receivables).reduce((sum, amount) => sum + amount, 0);
            assets.push({
                name: 'Receivables',
                amount: totalReceivables,
                symbol: 'USD',
                value: totalReceivables,
                change: 0
            });
        }

        return assets;
    }

    getIlliquidAssets() {
        const overview = this.data.structuredData?.overview;
        if (!overview?.illiquid) return [];

        const assets = [];

        // Add CG Token
        if (overview.illiquid?.cg?.token) {
            const cgTokenAmount = overview.illiquid.cg.token;
            assets.push({
                name: 'CG Token',
                amount: cgTokenAmount,
                symbol: 'CG',
                value: overview.illiquid.total || 0,
                change: 0
            });
        }

        return assets;
    }

    viewAllTransactions() {
        // Placeholder for view all transactions functionality
    }

    updateMetrics() {
        if (!this.data.metrics) return;

        // Update total balance
        document.getElementById('total-balance-value').textContent = 
            this.formatCurrency(this.data.metrics.totalBalance);
        document.getElementById('total-balance-change').textContent = 
            this.formatPercentage(this.data.changes.totalBalance);

        // Update inflow/outflow (to be implemented)
        document.getElementById('total-inflow-value').textContent = 
            this.formatCurrency(0);
        document.getElementById('total-outflow-value').textContent = 
            this.formatCurrency(0);

        // Update asset count
        const assetCount = Object.keys(this.data.assets.liquid).length + 
                          Object.keys(this.data.assets.illiquid).length;
        document.getElementById('asset-count-value').textContent = assetCount;
    }

    getAssetItems() {
        const assetItems = [];
        const overview = this.data.structuredData?.overview;
        if (!overview) return assetItems;

        // Add liquid assets
        if (overview.liquid) {
            // Add cash
            if (overview.liquid.cash) {
                assetItems.push({
                    name: 'Cash',
                    amount: overview.liquid.cash,
                    symbol: 'USD',
                    value: overview.liquid.cash,
                    change: 0
                });
            }

            // Add receivables (combined)
            if (overview.liquid.outstanding?.receivables) {
                const totalReceivables = Object.values(overview.liquid.outstanding.receivables).reduce((sum, amount) => sum + amount, 0);
                assetItems.push({
                    name: 'Receivables',
                    amount: totalReceivables,
                    symbol: 'USD',
                    value: totalReceivables,
                    change: 0
                });
            }
        }

        // Add illiquid assets
        if (overview.illiquid?.cg?.token) {
            const cgTokenAmount = overview.illiquid.cg.token;
            assetItems.push({
                name: 'CG Token',
                amount: cgTokenAmount,
                symbol: 'CG',
                value: overview.illiquid.total || 0,  // Use the pre-calculated USD total
                change: 0
            });
        }

        return assetItems;
    }

    formatAssetName(name) {
        return name
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    formatPercentage(value) {
        const sign = value >= 0 ? '+' : '';
        return `${sign}${value.toFixed(2)}%`;
    }

    renderAssetList(type, assets) {
        const listId = type === 'liquid' ? 'liquid-asset-list' : 'illiquid-asset-list';
        const assetList = document.getElementById(listId);
        assetList.innerHTML = '';

        assets.forEach(asset => {
            const assetElement = document.createElement('div');
            assetElement.className = 'asset-item';
            assetElement.innerHTML = `
                <div class="asset-info">
                    <div class="asset-icon"></div>
                    <div>
                        <div class="asset-name">${asset.name}</div>
                        <div class="asset-amount">${asset.amount} ${asset.symbol}</div>
                    </div>
                </div>
                <div class="asset-value">
                    <div class="asset-price">${this.formatCurrency(asset.value)}</div>
                    <div class="asset-change ${asset.change >= 0 ? 'positive' : 'negative'}">
                        ${asset.change >= 0 ? '+' : ''}${asset.change}%
                    </div>
                </div>
            `;
            assetList.appendChild(assetElement);
        });
    }

    updateCharts() {
        this.updateLiquidPortfolioChart();
        this.updateIlliquidPortfolioChart();
        this.updateTokenDistributionChart();
        this.updateTreasuryComponentsChart();
    }

    updateLiquidPortfolioChart() {
        const liquidAssets = this.getLiquidAssets();
        if (liquidAssets.length > 0) {
            this.charts.liquidPortfolio.data.labels = liquidAssets.map(a => a.name);
            this.charts.liquidPortfolio.data.datasets[0].data = liquidAssets.map(a => a.value);
            this.charts.liquidPortfolio.data.datasets[0].backgroundColor = this.generateChartColors(liquidAssets.length);
            this.charts.liquidPortfolio.update();
        }
    }

    updateIlliquidPortfolioChart() {
        const illiquidAssets = this.getIlliquidAssets();
        if (illiquidAssets.length > 0) {
            this.charts.illiquidPortfolio.data.labels = illiquidAssets.map(a => a.name);
            this.charts.illiquidPortfolio.data.datasets[0].data = illiquidAssets.map(a => a.value);
            this.charts.illiquidPortfolio.data.datasets[0].backgroundColor = this.generateChartColors(illiquidAssets.length);
            this.charts.illiquidPortfolio.update();
        }
    }

    updateTokenDistributionChart() {
        const multisig = this.data.structuredData?.multisig;
        if (!multisig) return;

        // Get all unique tokens across all wallets
        const allTokens = new Set();
        Object.values(multisig).forEach(wallet => {
            Object.keys(wallet).forEach(token => {
                if (token !== 'total') allTokens.add(token.toUpperCase());
            });
        });

        // Prepare datasets
        const labels = Object.keys(multisig);
        const datasets = Array.from(allTokens).map(token => ({
            label: token,
            data: labels.map(wallet => {
                const amount = multisig[wallet][token.toLowerCase()] || 0;
                const fxRate = this.data.structuredData.fx[token] || 1;
                return amount * fxRate;
            }),
            backgroundColor: this.getTokenColor(token)
        }));

        this.charts.tokenDist.data.labels = labels.map(this.formatWalletName);
        this.charts.tokenDist.data.datasets = datasets;
        this.charts.tokenDist.update();
    }

    updateTreasuryComponentsChart() {
        const overview = this.data.structuredData?.overview;
        if (!overview) return;

        const components = [
            { label: 'Liquid Assets', value: overview.liquid?.total || 0 },
            { label: 'Illiquid Assets', value: overview.illiquid?.total || 0 },
            { label: 'Provisions', value: overview.provisions?.total || 0 }
        ];

        this.charts.components.data.labels = components.map(c => c.label);
        this.charts.components.data.datasets[0].data = components.map(c => c.value);
        this.charts.components.data.datasets[0].backgroundColor = this.generateChartColors(components.length);
        this.charts.components.update();
    }

    generateChartColors(count) {
        const colors = [
            '#3b82f6', // blue
            '#10b981', // green
            '#f59e0b', // yellow
            '#ef4444', // red
            '#8b5cf6', // purple
            '#ec4899', // pink
            '#14b8a6', // teal
            '#f97316', // orange
            '#6366f1', // indigo
            '#84cc16'  // lime
        ];

        // If we need more colors than we have, repeat the array
        return Array(count).fill().map((_, i) => colors[i % colors.length]);
    }

    render() {
        this.renderDashboardMetrics();
        this.renderAssetList('liquid', this.getLiquidAssets());
        this.renderAssetList('illiquid', this.getIlliquidAssets());
        this.renderMultisigWallets();
        this.updateCharts();
    }

    formatCurrency(value) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(value);
    }

    formatTime(timestamp) {
        if (!timestamp) return '';
        return new Intl.RelativeTimeFormat('en', { numeric: 'auto' })
            .format(-Math.round((Date.now() - timestamp) / 1000 / 60), 'minute');
    }

    handleError(error) {
        console.error('Treasury Dashboard Error:', error);
        
        // Display error message to user
        const metricsDiv = document.getElementById('dashboard-metrics');
        if (metricsDiv) {
            metricsDiv.innerHTML = `
                <div class="error-message">
                    <h3>Error Loading Dashboard Data</h3>
                    <p>${error.message}</p>
                    <button onclick="window.location.reload()">Retry</button>
                </div>
            `;
        }
    }

    // Render dashboard metrics
    renderDashboardMetrics() {
        const metrics = this.data.metrics;
        const metricsContainer = document.getElementById('dashboard-metrics');
        
        const metricCards = [
            {
                title: 'Total Liquid',
                value: this.formatCurrency(metrics.liquidAssets),
                icon: 'bi-cash-coin',
                trend: null
            },
            {
                title: 'Total Illiquid',
                value: this.formatCurrency(metrics.illiquidAssets),
                icon: 'bi-bank',
                trend: null
            },
            {
                title: 'Unallocated Budget',
                value: this.formatCurrency(metrics.effectiveBudget),
                icon: 'bi-wallet2',
                trend: null
            },
            {
                title: 'Total Provisions',
                value: this.formatCurrency(metrics.totalProvisions),
                icon: 'bi-piggy-bank',
                trend: null
            }
        ];

        metricsContainer.innerHTML = metricCards.map(metric => `
            <div class="metric-card">
                <h3>${metric.title}</h3>
                <div class="metric-value">${metric.value}</div>
                ${metric.trend ? `<div class="metric-change">${metric.trend.value}</div>` : ''}
            </div>
        `).join('');
    }

    renderMultisigWallets() {
        const multisig = this.data.structuredData?.multisig;
        const walletsContainer = document.getElementById('multisig-wallets');
        
        if (!multisig) return;

        const walletCards = Object.entries(multisig).map(([name, data]) => {
            const tokens = Object.entries(data)
                .filter(([key]) => key !== 'total')
                .map(([token, amount]) => {
                    const upperToken = token.toUpperCase();
                    const fxRate = this.data.structuredData.fx[upperToken] || 1;
                    return {
                        token: upperToken,
                        amount,
                        valueUSD: amount * fxRate
                    };
                });

            return `
                <div class="multisig-wallet">
                    <div class="multisig-wallet-header">
                        <div class="multisig-wallet-name">${this.formatWalletName(name)}</div>
                        <div class="multisig-wallet-total">${this.formatCurrency(data.total || 0)}</div>
                    </div>
                    <div class="token-list">
                        ${tokens.map(t => `
                            <div class="token-item">
                                <span class="token-name">${t.token}</span>
                                <span class="token-amount">${t.amount.toFixed(2)} (${this.formatCurrency(t.valueUSD)})</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        });

        walletsContainer.innerHTML = walletCards.join('');
    }

    formatWalletName(name) {
        return name.split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    }

    getTokenColor(token) {
        const colors = {
            'ETH': '#8247E5',    // Ethereum purple
            'USDC': '#2775CA',   // USDC blue
            'USDT': '#26A17B',   // Tether green
            'EURE': '#F0B90B',   // Euro gold/yellow
            'default': '#CBD5E1'  // Default gray
        };
        return colors[token.toUpperCase()] || colors.default;
    }
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.treasuryDashboard = new TreasuryDashboard();
}); 