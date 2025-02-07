---
layout: treasury
title: Treasury
summary: A modern dashboard for tracking and analyzing our treasury data.
permalink: /treasury/
---

<header class="page-header">
    <h1 class="page-title">Treasury Dashboard</h1>
    <p class="page-summary">Real-time insights into our treasury activities and financial health.</p>
</header>

<link rel="stylesheet" href="/assets/css/treasury-v2.css">
<div class="dashboard-container">
    <!-- Overview Metrics -->
    <div id="metrics" class="dashboard-section">
        <div id="dashboard-metrics" class="metrics-grid">
            <!-- Metrics will be populated by JavaScript -->
        </div>
    </div>

    <!-- Treasury Components Section -->
    <div id="components" class="dashboard-section">
        <div class="chart-card">
            <h3>Treasury Components</h3>
            <div class="chart-container">
                <canvas id="treasury-components-chart"></canvas>
            </div>
        </div>
    </div>

    <!-- Liquid Assets Section -->
    <div id="liquid-assets" class="dashboard-section">
        <div class="section-content">
            <div class="chart-card">
                <h3>Liquid Portfolio</h3>
                <div class="chart-container">
                    <canvas id="liquid-portfolio-chart"></canvas>
                </div>
            </div>
            <div class="asset-list-card">
                <div class="card-header">
                    <h3>Liquid Assets</h3>
                    <div class="card-actions">
                        <select id="liquid-asset-sort" class="select-styled">
                            <option value="value">Sort by Value</option>
                            <option value="name">Sort by Name</option>
                        </select>
                    </div>
                </div>
                <div class="asset-list" id="liquid-asset-list">
                    <!-- Liquid asset items will be populated by JavaScript -->
                </div>
            </div>
        </div>
    </div>

    <!-- Illiquid Assets Section -->
    <div id="illiquid-assets" class="dashboard-section">
        <div class="section-content">
            <div class="chart-card">
                <h3>Illiquid Portfolio</h3>
                <div class="chart-container">
                    <canvas id="illiquid-portfolio-chart"></canvas>
                </div>
            </div>
            <div class="asset-list-card">
                <div class="card-header">
                    <h3>Illiquid Assets</h3>
                    <div class="card-actions">
                        <select id="illiquid-asset-sort" class="select-styled">
                            <option value="value">Sort by Value</option>
                            <option value="name">Sort by Name</option>
                        </select>
                    </div>
                </div>
                <div class="asset-list" id="illiquid-asset-list">
                    <!-- Illiquid asset items will be populated by JavaScript -->
                </div>
            </div>
        </div>
    </div>

    <!-- Token Distribution Section -->
    <div id="token-distribution" class="dashboard-section">
        <div class="chart-card">
            <h3>Token Distribution Across Wallets</h3>
            <div class="chart-container">
                <canvas id="token-distribution-chart"></canvas>
            </div>
        </div>
    </div>    

    <!-- Multisig Wallets Section -->
    <div id="multisig-wallets" class="dashboard-section">
        <div class="section-header">
            <h2>Multisig Wallets</h2>
        </div>
        <div class="multisig-grid" id="multisig-wallets">
            <!-- Multisig wallet cards will be populated by JavaScript -->
        </div>
    </div>

    <!-- Cost Analysis Section -->
    <div id="cost-analysis" class="dashboard-section">
        <div class="section-header">
            <h2>Cost Analysis</h2>
            <div class="section-controls">
                <select id="cost-year-filter" class="select-styled">
                    <option value="2025">2025</option>
                </select>
                <select id="cost-currency-display" class="select-styled">
                    <option value="USD">Show in USD</option>
                </select>
            </div>
        </div>

        <!-- Cost Overview -->
        <div class="cost-overview">
            <div class="cost-metrics-grid">
                <div class="metric-card">
                    <h3>Total Annual Cost</h3>
                    <div id="total-annual-cost" class="metric-value"></div>
                    <div class="metric-subtitle">Projected</div>
                </div>
                <div class="metric-card">
                    <h3>Monthly Burn Rate</h3>
                    <div id="monthly-burn-rate" class="metric-value"></div>
                    <div class="metric-subtitle">Average</div>
                </div>
                <div class="metric-card">
                    <h3>Infrastructure</h3>
                    <div id="infrastructure-cost" class="metric-value"></div>
                    <div class="metric-subtitle">Annual</div>
                </div>
                <div class="metric-card">
                    <h3>Corporate</h3>
                    <div id="corporate-cost" class="metric-value"></div>
                    <div class="metric-subtitle">Annual</div>
                </div>
            </div>
        </div>

        <!-- Cost Distribution -->
        <div class="cost-charts-grid">
            <!-- Main Category Distribution -->
            <div class="chart-card">
                <h3>Cost Distribution by Category</h3>
                <div class="chart-container">
                    <canvas id="cost-category-chart"></canvas>
                </div>
            </div>

            <!-- Infrastructure Costs -->
            <div class="chart-card">
                <h3>Infrastructure Cost Breakdown</h3>
                <div class="chart-container">
                    <canvas id="infrastructure-breakdown-chart"></canvas>
                </div>
            </div>

            <!-- Monthly Cost Trend -->
            <div class="chart-card full-width">
                <h3>Monthly Cost Projection</h3>
                <div class="chart-container">
                    <canvas id="monthly-cost-chart"></canvas>
                </div>
            </div>

            <!-- Entity Cost Comparison -->
            <div class="chart-card">
                <h3>Cost by Entity</h3>
                <div class="chart-container">
                    <canvas id="entity-cost-chart"></canvas>
                </div>
            </div>

            <!-- Currency Distribution -->
            <div class="chart-card">
                <h3>Currency Distribution</h3>
                <div class="chart-container">
                    <canvas id="currency-distribution-chart"></canvas>
                </div>
            </div>
        </div>

        <!-- Detailed Cost Table -->
        <div class="cost-details">
            <div class="card-header">
                <h3>Detailed Cost Breakdown</h3>
                <div class="card-actions">
                    <input type="text" id="cost-search" class="input-styled" placeholder="Search costs...">
                    <select id="cost-table-sort" class="select-styled">
                        <option value="category">Sort by Category</option>
                        <option value="amount">Sort by Amount</option>
                        <option value="entity">Sort by Entity</option>
                    </select>
                </div>
            </div>
            <div class="cost-table-container">
                <table id="cost-details-table" class="data-table">
                    <thead>
                        <tr>
                            <th>Category</th>
                            <th>Entity</th>
                            <th>Description</th>
                            <th>Amount (USD)</th>
                            <th>Original Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- Cost details will be populated by JavaScript -->
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>

<script type="module">
    import { treasuryDataService } from '{{ site.baseurl }}/assets/js/treasury-v2-data.js';
    window.treasuryDataService = treasuryDataService;
</script>
<script src="{{ '/assets/js/treasury-v2.js' | relative_url }}" type="module"></script> 