import { CostProcessor } from './treasury-cost-processor.js';

// Treasury Data Service
class TreasuryDataService {
    constructor() {
        this.API_URL = 'https://api.sheetbest.com/sheets/4143ddf3-c90f-4e50-a382-f549be411ac4';
        this.rawData = null;
        this.structuredData = {};
        this.CURRENCY_PATTERNS = {
            EUR: /^€?\s*[\d.,]+\s*€?$/,  // Matches €100, 100€, or 100 with € symbol
            USD: /^\$?\s*[\d.,]+\s*\$?$/, // Matches $100, 100$, or 100 with $ symbol
        };
        this.NUMBER_FORMATS = {
            EUROPEAN: {
                thousandSeparator: '.',
                decimalSeparator: ','
            },
            US: {
                thousandSeparator: ',',
                decimalSeparator: '.'
            }
        };
        this.costProcessor = null;
        this.processedCosts = null;
        this.fxRates = {
            EURUSD: 1.08 // Default rate, should be updated with real data
        };
    }

    // Fetch and process data from the API
    async fetchData() {
        try {
            const response = await fetch(this.API_URL);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            this.rawData = await response.json();
            this.processData();
            return this.structuredData;
        } catch (error) {
            console.error('Error fetching treasury data:', error);
            throw error;
        }
    }

    // Parse numeric values with format detection
    parseNumericValue(value) {
        if (!value || typeof value !== 'string') return 0;
        
        // Remove currency symbols and whitespace
        const cleanValue = value.replace(/[$€]/g, '').trim();
        
        // Detect number format
        const format = this.detectNumberFormat(cleanValue);
        
        // Convert to a standard format (US)
        let standardized = cleanValue;
        if (format === 'EUROPEAN') {
            standardized = cleanValue
                .replace(/\./g, '')  // Remove thousand separators
                .replace(/,/g, '.'); // Convert decimal separator
        }
        
        // Parse the standardized number
        const result = parseFloat(standardized);
        return isNaN(result) ? 0 : result;
    }

    // Detect the number format (European vs US)
    detectNumberFormat(value) {
        // If contains comma followed by exactly 2 digits at the end, likely European
        if (/,\d{2}$/.test(value)) return 'EUROPEAN';
        
        // If contains period followed by exactly 2 digits at the end, likely US
        if (/\.\d{2}$/.test(value)) return 'US';
        
        // Count separators
        const commas = (value.match(/,/g) || []).length;
        const periods = (value.match(/\./g) || []).length;
        
        // If more periods than commas, likely European
        if (periods > commas) return 'EUROPEAN';
        
        // Default to US format
        return 'US';
    }

    // Detect currency from value
    detectCurrency(value) {
        if (!value || typeof value !== 'string') return null;
        
        // Check for explicit currency symbols
        if (value.includes('€')) return 'EUR';
        if (value.includes('$')) return 'USD';
        
        // Try pattern matching
        for (const [currency, pattern] of Object.entries(this.CURRENCY_PATTERNS)) {
            if (pattern.test(value)) return currency;
        }
        
        return null;
    }

    // Format value according to currency
    formatCurrencyValue(value, currency = 'USD') {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
        
        return formatter.format(value);
    }

    // Set a value in a nested object structure based on a path array
    setNestedValue(obj, path, value) {
        let current = obj;
        const lastIndex = path.length - 1;

        // Build the nested structure
        for (let i = 0; i < lastIndex; i++) {
            const key = path[i];
            if (!current[key]) {
                current[key] = {};
            }
            current = current[key];
        }

        // Set the final value - handle numeric keys by parsing them
        const finalKey = path[lastIndex];
        const parsedKey = isNaN(finalKey) ? finalKey : parseInt(finalKey);
        current[parsedKey] = value;
    }

    // Process raw data into structured format
    processData() {
        // Reset structured data
        this.structuredData = {};

        // Process each item in the flat list
        this.rawData.forEach(item => {
            const { key, value } = item;
            
            // Skip any key ending with _ignore
            if (key.endsWith('_ignore')) {
                return;
            }

            const parts = key.split('_');
            const section = parts[0];          // overview, fx, multisig, etc.
            const category = parts[1];         // liquid, debt, provisions, etc.
            const path = parts.slice(2);       // remaining path parts
            const numericValue = this.parseNumericValue(value);

            // Initialize section if it doesn't exist
            if (!this.structuredData[section]) {
                this.structuredData[section] = {};
            }

            // Initialize category if it doesn't exist
            if (!this.structuredData[section][category]) {
                this.structuredData[section][category] = {};
            }

            // For fx rates, store directly under fx section
            if (section === 'fx') {
                this.structuredData.fx[category.toUpperCase()] = numericValue;
            } else {
                // For all other sections, use the nested path
                this.setNestedValue(this.structuredData[section][category], path, numericValue);
            }
        });

        // Process cost data
        const costProcessor = new CostProcessor(this.rawData, this.fxRates);
        this.processedCosts = costProcessor.process();

        this.calculateDerivedMetrics();
    }

    // Calculate additional metrics
    calculateDerivedMetrics() {
        const overview = this.structuredData.overview;
        
        // Calculate total assets
        const totalAssets = (overview.liquid?.total || 0) + (overview.illiquid?.total || 0);
        
        // Calculate net position
        const netPosition = totalAssets - 
            (overview.debt?.total || 0) - 
            (overview.provisions?.total || 0);
        
        // Calculate liquidity ratio
        const liquidityRatio = (overview.liquid?.total || 0) / 
            ((overview.debt?.total || 0) + (overview.provisions?.total || 0));

        // Add derived metrics to the structure
        overview.total_assets = totalAssets;
        overview.net_position = netPosition;
        overview.liquidity_ratio = liquidityRatio;
    }

    // Get dashboard metrics
    getDashboardMetrics() {
        const overview = this.structuredData.overview;
        return {
            totalBalance: overview.true?.balance || 0,
            effectiveBudget: overview.effective?.budget || 0,
            liquidAssets: overview.liquid?.total || 0,
            illiquidAssets: overview.illiquid?.total || 0,
            totalDebt: overview.debt?.total || 0,
            totalProvisions: overview.provisions?.total || 0,
            netPosition: overview.net_position || 0,
            liquidityRatio: overview.liquidity_ratio || 0
        };
    }

    // Get asset breakdown
    getAssetBreakdown() {
        const overview = this.structuredData.overview;
        return {
            liquid: {
                cash: overview.liquid?.cash || 0,
                receivables: {
                    '2024': overview.liquid?.outstanding?.receivables?.[2024] || 0,
                    '2025': overview.liquid?.outstanding?.receivables?.[2025] || 0
                }
            },
            illiquid: {
                cg_token: {
                    amount: overview.illiquid?.cg_token || 0,
                    price: overview.cg_token_price || 0
                }
            }
        };
    }

    // Get liability breakdown
    getLiabilityBreakdown() {
        const overview = this.structuredData.overview;
        return {
            debt: {
                jts: overview.debt?.jts?.unpaid || 0,
                flo: {
                    expenses: overview.debt?.flo?.expenses?.unpaid || 0,
                    salaries: overview.debt?.flo?.salaries?.unpaid || 0
                },
                jan: {
                    salaries: overview.debt?.jan?.salaries?.unpaid || 0
                }
            },
            provisions: {
                vat: overview.provisions?.vat?.token_sale || 0,
                overhead: overview.provisions?.association?.overhead || 0,
                payables_2025: overview.provisions?.outstanding?.payables?.[2025] || 0,
                infra_2025: overview.provisions?.infra?.[2025] || 0,
                corporate_2025: overview.provisions?.corporate?.[2025] || 0
            }
        };
    }

    // Get FX rates
    getFXRates() {
        return { ...this.structuredData.fx };
    }

    // Get cost metrics
    getCostMetrics() {
        if (!this.costProcessor) return null;
        return this.costProcessor.getSummaryMetrics();
    }

    // Get cost breakdown by category
    getCostsByCategory() {
        if (!this.costProcessor) return null;
        return this.costProcessor.getCategoryBreakdown();
    }

    // Get cost breakdown by year
    getCostsByYear() {
        return this.processedCosts?.byYear || {};
    }

    // Get cost breakdown by entity
    getCostsByEntity() {
        return this.processedCosts?.byEntity || {};
    }

    // Get cost breakdown by currency
    getCostsByCurrency() {
        return this.processedCosts?.byCurrency || {};
    }

    getCostSummary() {
        return this.processedCosts?.summary || {
            totalUSD: 0,
            totalEUR: 0
        };
    }
}

// Export as singleton
const treasuryDataService = new TreasuryDataService();
export { treasuryDataService }; 