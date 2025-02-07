// Cost Data Processor for Treasury Dashboard
class CostProcessor {
    constructor(rawData, fxRates) {
        this.rawData = rawData;
        this.fxRates = fxRates;
        this.processedData = {
            byYear: {},
            byEntity: {},
            byCurrency: {},
            summary: {
                totalUSD: 0,
                totalEUR: 0
            }
        };
    }

    process() {
        // Filter cost-related entries
        const costEntries = this.rawData.filter(entry => 
            entry._section === 'cost' && !entry.key.endsWith('_ignore')
        );

        // Process each entry
        costEntries.forEach(entry => {
            this.processEntry(entry);
        });

        return this.processedData;
    }

    processEntry(entry) {
        const year = entry._year || new Date().getFullYear().toString();
        const amount = this.parseAmount(entry.value);
        const currency = this.detectCurrency(entry.value);
        const amountUSD = currency === 'EUR' ? amount * this.fxRates.EURUSD : amount;

        // Extract categories and entity
        const category = entry._category;
        const mainCategory = entry._path_1;
        const subCategory = entry._path_2;
        const entity = this.getEntityFromPath(entry._path_1);

        // Initialize year if not exists
        if (!this.processedData.byYear[year]) {
            this.processedData.byYear[year] = {
                total: 0,
                byCategory: {},
                items: []
            };
        }

        // Update year data
        this.processedData.byYear[year].total += amountUSD;
        this.updateCategoryBreakdown(
            this.processedData.byYear[year].byCategory, 
            category,
            mainCategory,
            subCategory,
            amountUSD,
            entry,
            amount,
            currency
        );
        this.processedData.byYear[year].items.push({
            category,
            mainCategory,
            subCategory,
            entity,
            amountUSD,
            originalAmount: amount,
            originalValue: entry.value,
            currency,
            description: subCategory || mainCategory
        });

        // Update entity breakdown
        if (entity) {
            this.updateEntityBreakdown(entity, year, amountUSD, {
                category,
                mainCategory,
                subCategory,
                amountUSD,
                originalAmount: amount,
                originalValue: entry.value,
                currency,
                description: subCategory || mainCategory
            });
        }

        // Update currency breakdown
        this.updateCurrencyBreakdown(currency, amountUSD, amount);

        // Update summary
        this.processedData.summary.totalUSD += amountUSD;
        if (currency === 'EUR') {
            this.processedData.summary.totalEUR += amount;
        }
    }

    getEntityFromPath(path) {
        if (!path) return null;
        
        // Map known entity names
        const entityMap = {
            'Association': 'Association',
            'Just Tech Solutions': 'JTS',
            'Core Team': 'Core'
        };

        return entityMap[path] || null;
    }

    updateCategoryBreakdown(categoryData, category, mainCategory, subCategory, amountUSD, entry, amount, currency) {
        if (!categoryData[category]) {
            categoryData[category] = {
                total: 0,
                subCategories: {},
                mainCategories: {},
                items: []
            };
        }

        categoryData[category].total += amountUSD;

        // Update main category breakdown
        if (mainCategory) {
            if (!categoryData[category].mainCategories[mainCategory]) {
                categoryData[category].mainCategories[mainCategory] = {
                    total: 0,
                    items: []
                };
            }
            categoryData[category].mainCategories[mainCategory].total += amountUSD;
            categoryData[category].mainCategories[mainCategory].items.push({
                description: subCategory,
                amountUSD,
                originalAmount: amount,
                originalValue: entry.value,
                currency,
                details: entry
            });
        }

        // Update sub-category breakdown
        if (subCategory) {
            if (!categoryData[category].subCategories[subCategory]) {
                categoryData[category].subCategories[subCategory] = {
                    total: 0,
                    items: []
                };
            }
            categoryData[category].subCategories[subCategory].total += amountUSD;
            categoryData[category].subCategories[subCategory].items.push({
                mainCategory,
                amountUSD,
                originalAmount: amount,
                originalValue: entry.value,
                currency,
                details: entry
            });
        }

        // Add to items
        categoryData[category].items.push({
            mainCategory,
            subCategory,
            amountUSD,
            originalAmount: amount,
            originalValue: entry.value,
            currency,
            details: entry
        });
    }

    updateEntityBreakdown(entity, year, amountUSD, details) {
        if (!this.processedData.byEntity[entity]) {
            this.processedData.byEntity[entity] = {
                total: 0,
                byYear: {},
                items: []
            };
        }

        this.processedData.byEntity[entity].total += amountUSD;

        if (!this.processedData.byEntity[entity].byYear[year]) {
            this.processedData.byEntity[entity].byYear[year] = {
                total: 0,
                items: []
            };
        }

        this.processedData.byEntity[entity].byYear[year].total += amountUSD;
        this.processedData.byEntity[entity].byYear[year].items.push(details);
        this.processedData.byEntity[entity].items.push(details);
    }

    updateCurrencyBreakdown(currency, amountUSD, originalAmount) {
        if (!this.processedData.byCurrency[currency]) {
            this.processedData.byCurrency[currency] = {
                total: 0,
                totalUSD: 0,
                items: []
            };
        }

        this.processedData.byCurrency[currency].total += originalAmount;
        this.processedData.byCurrency[currency].totalUSD += amountUSD;
    }

    parseAmount(value) {
        if (typeof value !== 'string') return 0;
        
        // Clean the string - remove currency symbols and spaces
        let numericPart = value.trim().replace(/[€$\s]/g, '');
        
        // Handle European format:
        // 1. Replace all periods (thousand separators) with nothing
        // 2. Replace comma (decimal separator) with period for JS parsing
        numericPart = numericPart
            .replace(/\./g, '')     // Remove all periods (thousand separators)
            .replace(',', '.');      // Convert comma to period for decimals
        
        // Parse the numeric value
        const amount = parseFloat(numericPart);
        return isNaN(amount) ? 0 : amount;
    }

    detectCurrency(value) {
        if (typeof value !== 'string') return 'USD';
        
        const cleanValue = value.trim();
        
        // Check for EUR symbol or notation
        if (cleanValue.includes('€') || cleanValue.toLowerCase().includes('eur')) {
            return 'EUR';
        }
        
        // Default to USD
        return 'USD';
    }
}

export { CostProcessor }; 