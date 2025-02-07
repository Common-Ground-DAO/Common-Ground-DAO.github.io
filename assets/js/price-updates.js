// Debug logging system
const Debug = {
  SSE: {
    log: (msg) => console.log(`[SSE] ${msg}`),
    error: (msg) => console.error(`[SSE] ${msg}`)
  },
  Progress: {
    group(title, fn) {
      console.group(`📊 Progress: ${title}`);
      try {
        fn();
      } finally {
        console.groupEnd();
      }
    },
    log: (...args) => console.log('📊 Progress:', ...args),
    error: (...args) => console.error('❌ Progress:', ...args),
    warn: (...args) => console.warn('⚠️ Progress:', ...args)
  },
  Updates: {
    log: (msg) => console.log(`[Updates] ${msg}`),
    error: (msg) => console.error(`[Updates] ${msg}`)
  },
  Dashboard: {
    group(title, fn) {
      console.group(`📈 Dashboard: ${title}`);
      try {
        fn();
      } finally {
        console.groupEnd();
      }
    },
    log: (...args) => console.log('📈 Dashboard:', ...args),
    error: (...args) => console.error('❌ Dashboard:', ...args),
    warn: (...args) => console.warn('⚠️ Dashboard:', ...args)
  }
};

(function() {
  // Price update progress component
  class PriceUpdateProgress {
    constructor() {
      // Create progress container
      this.container = document.createElement('div');
      this.container.style.cssText = `
        position: absolute;
        top: 0;
        right: 0;
        background: white;
        border: 1px solid #ddd;
        border-radius: 4px;
        padding: 8px 12px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        z-index: 1000;
        font-size: 0.9rem;
        display: none;
        max-width: 250px;
      `;

      // Create status text
      this.statusText = document.createElement('div');
      this.statusText.style.marginBottom = '6px';
      this.container.appendChild(this.statusText);

      // Create progress bar container
      const progressBarContainer = document.createElement('div');
      progressBarContainer.style.cssText = `
        background: #f0f0f0;
        border-radius: 2px;
        height: 3px;
        width: 100%;
        overflow: hidden;
      `;

      // Create progress bar
      this.progressBar = document.createElement('div');
      this.progressBar.style.cssText = `
        background: #4CAF50;
        height: 100%;
        width: 0;
        transition: width 0.3s ease;
      `;

      progressBarContainer.appendChild(this.progressBar);
      this.container.appendChild(progressBarContainer);
      
      // Add to the content header instead of dashboard
      const contentHeader = document.querySelector('.content-header');
      if (contentHeader) {
        contentHeader.style.position = 'relative';
        contentHeader.appendChild(this.container);
      } else {
        const header = document.querySelector('h1, h2');
        if (header) {
          header.style.position = 'relative';
          header.appendChild(this.container);
        } else {
          document.body.appendChild(this.container);
        }
      }
      
      // State tracking
      this.isVisible = false;
      this.queuedTransactions = 0;
      this.validTokens = 0;
      this.invalidTokens = 0;
      this.completedUpdates = 0;
      this.lastUpdateTime = null;
      this.inactivityTimer = null;
      this.inactivityTimeout = 5000; // 5 seconds
      this.state = 'initializing';
      this.hasActiveUpdates = false;
    }

    show() {
      if (this.hasActiveUpdates && !this.isVisible) {
        this.container.style.display = 'block';
        this.isVisible = true;
      }
    }

    hide() {
      if (this.isVisible) {
        this.container.style.display = 'none';
        this.isVisible = false;
        this.resetState();
      }
    }

    resetState() {
      this.queuedTransactions = 0;
      this.validTokens = 0;
      this.invalidTokens = 0;
      this.completedUpdates = 0;
      this.state = 'initializing';
      this.hasActiveUpdates = false;
    }

    clearInactivityTimer() {
      if (this.inactivityTimer) {
        clearTimeout(this.inactivityTimer);
        this.inactivityTimer = null;
      }
    }

    setQueuedTransactions(count) {
      if (count > 0) {
        this.hasActiveUpdates = true;
        this.queuedTransactions = count;
        this.state = 'validating';
        this.updateDisplay();
      }
    }

    updateTokenValidation(valid, invalid) {
      this.validTokens = valid;
      this.invalidTokens = invalid;
      if (this.state === 'validating') {
        this.state = 'processing';
      }
      this.updateDisplay();
    }

    trackUpdate(token, timestamp) {
      this.completedUpdates++;
      this.lastUpdateTime = Date.now();
      
      if (this.completedUpdates >= this.validTokens) {
        this.state = 'completed';
        setTimeout(() => this.hide(), 2000);
      }
      
      this.updateDisplay();
    }

    updateDisplay() {
      this.show();

      let statusText;
      let progressPercent = 0;

      switch (this.state) {
        case 'initializing':
          statusText = 'Initializing price updates...';
          break;
        
        case 'validating':
          const validatedCount = this.validTokens + this.invalidTokens;
          progressPercent = this.queuedTransactions > 0 ? 
            (validatedCount / this.queuedTransactions) * 100 : 0;
          statusText = `Validating tokens (${validatedCount}/${this.queuedTransactions})`;
          break;
        
        case 'processing':
          progressPercent = this.validTokens > 0 ? 
            (this.completedUpdates / this.validTokens) * 100 : 0;
          statusText = `Updated ${this.completedUpdates} of ${this.validTokens} valid tokens`;
          if (this.invalidTokens > 0) {
            statusText += ` (${this.invalidTokens} invalid)`;
          }
          break;
        
        case 'completed':
          statusText = `Updated ${this.completedUpdates} tokens`;
          if (this.invalidTokens > 0) {
            statusText += ` (${this.invalidTokens} invalid)`;
          }
          progressPercent = 100;
          break;
        
        case 'error':
          statusText = 'Error updating prices';
          break;
      }

      this.statusText.textContent = statusText;
      this.progressBar.style.width = `${progressPercent}%`;
    }

    updateProgress(progress) {
      if (!progress || typeof progress !== 'object') {
        Debug.Progress.warn('Invalid progress update:', progress);
        return;
      }

      const { status, valid, invalid, completed } = progress;
      
      switch (status) {
        case 'connecting':
          if (this.hasActiveUpdates) {
            this.state = 'initializing';
          }
          break;
        
        case 'validating':
          if (valid === 0 && invalid === 0) {
            this.hide();
            return;
          }
          this.updateTokenValidation(valid || 0, invalid || 0);
          break;
        
        case 'processing':
          if (completed) this.completedUpdates = completed;
          break;
        
        case 'error':
          this.state = 'error';
          setTimeout(() => this.hide(), 3000);
          break;
        
        case 'completed':
          this.state = 'completed';
          setTimeout(() => {
            this.hide();
            this.hasActiveUpdates = false;
          }, 2000);
          break;

        case 'idle':
          if (!this.hasActiveUpdates) {
            this.hide();
          }
          break;
      }
      
      this.updateDisplay();
    }
  }

  // Initialize progress component
  const priceUpdateProgress = new PriceUpdateProgress();
  let eventSource = null;
  let reconnectAttempts = 0;
  const MAX_RECONNECT_ATTEMPTS = 5;
  const INITIAL_RECONNECT_DELAY = 1000;

  // API base URL
  const API_BASE_URL = 'http://localhost:3000';

  // Queue transactions for price updates
  function queueTransactionsForUpdate(transactions, skipIfQueued = false) {
    if (!Array.isArray(transactions) || transactions.length === 0) return;
    
    // Filter out stablecoins as they're always $1
    const STABLECOINS = ['USDC', 'USDT', 'DAI', 'xDAI'];
    const transactionsToUpdate = transactions.filter(tx => !STABLECOINS.includes(tx.token));
    
    Debug.Updates.log(`Queueing ${transactionsToUpdate.length} non-stablecoin transactions for update`);
    
    const updates = transactionsToUpdate.map(tx => ({
      token: tx.token,
      timestamp: Math.floor(new Date(tx.date).getTime() / 1000),
      amount: parseFloat(tx.amount)
    }));

    // Set initial queued count
    priceUpdateProgress.setQueuedTransactions(updates.length);

    fetch(`${API_BASE_URL}/api/prices/queue`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ transactions: updates })
    })
    .then(response => {
      Debug.Updates.log(`Queue response status: ${response.status}`);
      return response.json();
    })
    .catch(error => {
      Debug.Updates.error(`Failed to queue updates: ${error.message}`);
      priceUpdateProgress.updateProgress({ status: 'error' });
    });
  }

  // Debounce function for dashboard updates
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Batch dashboard updates
  const refreshDashboard = debounce(() => {
    Debug.Dashboard.group('Refresh', () => {
      Debug.Dashboard.log('Starting dashboard refresh');
      window.treasury.calculateMetrics();
      window.treasuryCharts.createTokenCharts();
      window.treasuryCharts.createVolumeChart();
      
      const currentPage = parseInt(document.getElementById('current-page').textContent);
      const itemsPerPage = 10;
      Debug.Dashboard.log('Re-rendering transactions page', { currentPage, itemsPerPage });
      
      const originalRenderTransactions = window.treasury.renderTransactions;
      window.treasury.renderTransactions = function(transactions, page, perPage) {
        Debug.Dashboard.log('Rendering transactions', { 
          total: transactions.length,
          page,
          perPage,
          showing: `${(page-1)*perPage + 1}-${Math.min(page*perPage, transactions.length)}`
        });
        const start = (page - 1) * perPage;
        const end = start + perPage;
        const tbody = document.getElementById('transactions-body');
        tbody.innerHTML = '';
        
        transactions.slice(start, end).forEach(tx => {
          const row = document.createElement('tr');
          const isIncoming = window.treasury.incomingTx.includes(tx);
          row.innerHTML = `
            <td>${new Date(tx.date).toLocaleDateString()}</td>
            <td>${tx.token}</td>
            <td title="${tx.from}">${tx.from.slice(0, 8)}...</td>
            <td title="${tx.to}">${tx.to.slice(0, 8)}...</td>
            <td class="${isIncoming ? 'incoming' : 'outgoing'}">${tx.amount} ${tx.token}</td>
            <td class="usd-value">${tx.valueUSD || 'Updating...'}</td>
          `;
          tbody.appendChild(row);
        });
      };
      
      window.treasury.renderTransactions(window.treasury.transactions, currentPage, itemsPerPage);
      window.treasury.renderTransactions = originalRenderTransactions;
      Debug.Dashboard.log('Dashboard refresh complete');
    });
  }, 500);  // Wait for all updates in a 500ms window

  // Connect to SSE endpoint for progress updates
  function initializePriceUpdates(isReconnect = false) {
    // Close existing connection if any
    if (eventSource) {
      eventSource.close();
      eventSource = null;
    }

    // Don't show progress on reconnect if no active updates
    if (isReconnect && !priceUpdateProgress.hasActiveUpdates) {
      return;
    }

    // Check if we've exceeded max reconnection attempts
    if (isReconnect && reconnectAttempts >= MAX_RECONNECT_ATTEMPTS) {
      console.error('Max reconnection attempts reached. Giving up.');
      priceUpdateProgress.updateProgress({
        total: 0,
        completed: 0,
        failed: 0,
        status: 'error'
      });
      return;
    }

    try {
      eventSource = new EventSource(`${API_BASE_URL}/api/prices/progress`, {
        withCredentials: true
      });

      let heartbeatTimeout;
      const resetHeartbeatTimeout = () => {
        if (heartbeatTimeout) clearTimeout(heartbeatTimeout);
        heartbeatTimeout = setTimeout(() => {
          console.error('SSE heartbeat timeout');
          if (eventSource) {
            eventSource.close();
            eventSource = null;
          }
          initializePriceUpdates(true);
        }, 45000); // Wait 45 seconds for heartbeat (timeout after missing one)
      };

      eventSource.onopen = () => {
        console.log('SSE connection established');
        reconnectAttempts = 0; // Reset reconnect attempts on successful connection
        resetHeartbeatTimeout();
        
        // Show connecting state
        priceUpdateProgress.updateProgress({
          total: 0,
          completed: 0,
          failed: 0,
          status: 'connecting'
        });
      };

      eventSource.onmessage = (event) => {
        resetHeartbeatTimeout();
        
        if (event.data.trim() === '') {
          Debug.SSE.log('Received heartbeat');
          if (!priceUpdateProgress.hasActiveUpdates) {
            priceUpdateProgress.updateProgress({ status: 'idle' });
          }
          return;
        }

        try {
          const data = JSON.parse(event.data);
          
          if (data.type === 'progress') {
            const progress = data.progress;
            
            if (progress.type === 'price_update' && Array.isArray(progress.updates)) {
              Debug.Updates.log(`Processing ${progress.updates.length} price updates`);
              
              let updatedAny = false;
              let updateStats = { attempted: 0, succeeded: 0, failed: 0 };
              
              progress.updates.forEach(update => {
                const { token, timestamp, price } = update;
                updateStats.attempted++;
                
                let found = false;
                window.treasury.transactions.forEach(tx => {
                  const txTimestamp = Math.floor(new Date(tx.date).getTime() / 1000);
                  if (tx.token === token && txTimestamp === timestamp) {
                    tx.valueUSD = `$${price.toFixed(2)}`;
                    updatedAny = true;
                    found = true;
                    updateStats.succeeded++;
                    // Track successful update
                    priceUpdateProgress.trackUpdate(token, txTimestamp);
                  }
                });
                
                if (!found) {
                  Debug.Updates.log(`No matching transaction found for ${token} at ${timestamp}`);
                  updateStats.failed++;
                }
              });
              
              Debug.Updates.log(`Update complete - Attempted: ${updateStats.attempted}, Succeeded: ${updateStats.succeeded}, Failed: ${updateStats.failed}`);
              
              if (updatedAny) {
                Debug.Updates.log('Refreshing dashboard');
                refreshDashboard();
              }
            } else {
              priceUpdateProgress.updateProgress(progress);
            }
          }
        } catch (error) {
          Debug.SSE.error(`Failed to process message: ${error.message}`);
        }
      };

      eventSource.onerror = (error) => {
        const errorMessage = error.message || 'Unknown error';
        console.error('SSE connection error:', error);
        console.log('EventSource readyState:', eventSource?.readyState);
        
        if (heartbeatTimeout) {
          clearTimeout(heartbeatTimeout);
          heartbeatTimeout = null;
        }
        
        if (eventSource) {
          eventSource.close();
          eventSource = null;
        }

        // Only attempt reconnect if we haven't reached the limit
        if (reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
          reconnectAttempts++;
          const delay = INITIAL_RECONNECT_DELAY * Math.pow(2, reconnectAttempts - 1);
          console.log(`Attempting reconnect ${reconnectAttempts} of ${MAX_RECONNECT_ATTEMPTS} in ${delay}ms`);
          
          // Show reconnecting state
          priceUpdateProgress.updateProgress({
            total: 0,
            completed: 0,
            failed: 0,
            status: 'reconnecting'
          });
          
          setTimeout(() => {
            initializePriceUpdates(true);
          }, delay);
        } else {
          console.error('Max reconnection attempts reached');
          priceUpdateProgress.updateProgress({
            total: 0,
            completed: 0,
            failed: 0,
            status: 'error'
          });
        }
      };

      // Clean up function
      return () => {
        if (heartbeatTimeout) {
          clearTimeout(heartbeatTimeout);
          heartbeatTimeout = null;
        }
        if (eventSource) {
          eventSource.close();
          eventSource = null;
        }
      };
    } catch (error) {
      console.error('Error initializing SSE connection:', error);
      if (reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
        reconnectAttempts++;
        const delay = INITIAL_RECONNECT_DELAY * Math.pow(2, reconnectAttempts - 1);
        setTimeout(() => {
          initializePriceUpdates(true);
        }, delay);
      }
    }
  }

  // Update transaction values in the UI
  function updateTransactionValues(updates) {
    console.log('[Price Updates] Received updates to apply:', updates);
    
    if (!Array.isArray(updates)) {
      console.warn('[Price Updates] Updates is not an array:', updates);
      return;
    }

    // Debug: List all available data-tx-key elements
    const allElements = document.querySelectorAll('[data-tx-key]');
    console.log(`[Price Updates] Found ${allElements.length} total elements with data-tx-key attributes`);
    if (allElements.length > 0) {
      console.log('[Price Updates] Available keys:', Array.from(allElements).map(el => el.getAttribute('data-tx-key')));
    }

    let updatedCount = 0;
    updates.forEach(update => {
      if (!update || !update.token || !update.timestamp) {
        console.warn('[Price Updates] Invalid update object:', update);
        return;
      }

      // Try both Unix timestamp and ISO date formats
      const unixKey = `${update.token}-${update.timestamp}`;
      const isoDate = new Date(update.timestamp * 1000).toISOString().split('T')[0];
      const isoKey = `${update.token}-${isoDate}`;
      
      console.log(`[Price Updates] Looking for elements with keys:`, {
        unixKey,
        isoKey,
        token: update.token,
        timestamp: update.timestamp,
        isoDate
      });
      
      // Try both formats
      let elements = document.querySelectorAll(`[data-tx-key="${unixKey}"]`);
      if (elements.length === 0) {
        elements = document.querySelectorAll(`[data-tx-key="${isoKey}"]`);
      }
      
      console.log(`[Price Updates] Found ${elements.length} elements to update for ${update.token}`);
      
      elements.forEach(element => {
        const oldValue = element.textContent;
        const newValue = `$${update.price.toFixed(2)}`;
        console.log(`[Price Updates] Updating element from ${oldValue} to ${newValue}`);
        
        // Add highlight effect
        element.classList.add('price-updated');
        element.textContent = newValue;
        updatedCount++;
        
        // Remove highlight effect after animation
        setTimeout(() => {
          element.classList.remove('price-updated');
        }, 1000);
      });
    });

    console.log(`[Price Updates] Completed updates: ${updatedCount} elements updated`);
  }

  // Add necessary styles
  const style = document.createElement('style');
  style.textContent = `
    .price-updated {
      animation: highlight-price 1s ease-in-out;
    }

    .dashboard-updated {
      animation: highlight-dashboard 1s ease-in-out;
    }

    @keyframes highlight-price {
      0% { background-color: transparent; }
      50% { background-color: rgba(76, 175, 80, 0.1); }
      100% { background-color: transparent; }
    }

    @keyframes highlight-dashboard {
      0% { opacity: 1; }
      50% { opacity: 0.8; }
      100% { opacity: 1; }
    }
  `;
  document.head.appendChild(style);

  // Initialize when DOM is ready
  document.addEventListener('DOMContentLoaded', () => {
    // First connect to SSE for updates
    initializePriceUpdates();
    
    // Then queue all transactions for price updates when treasury data is available
    const checkTreasuryData = setInterval(() => {
      if (window.treasury?.transactions) {
        Debug.Updates.log('Treasury data loaded, queueing all transactions for price updates');
        queueTransactionsForUpdate(window.treasury.transactions);
        clearInterval(checkTreasuryData);
      }
    }, 100);
    
    // Clean up on page unload
    window.addEventListener('unload', () => {
      if (eventSource) {
        eventSource.close();
        eventSource = null;
      }
      clearInterval(checkTreasuryData);
    });
  });

  // Make functions globally available
  window.priceUpdates = {
    initializePriceUpdates,
    updateTransactionValues,
    queueTransactionsForUpdate
  };
})(); 
