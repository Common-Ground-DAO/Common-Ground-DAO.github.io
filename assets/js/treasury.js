(function() {
  // Load and parse transaction data
  let ms2, ms3, ms4, ms5;
  try {
    const multisig2Data = window.MULTISIG2_DATA;
    const multisig3Data = window.MULTISIG3_DATA;
    const multisig4Data = window.MULTISIG4_DATA;
    const multisig5Data = window.MULTISIG5_DATA;
    
    ms2 = JSON.parse(multisig2Data);
    ms3 = JSON.parse(multisig3Data);
    ms4 = JSON.parse(multisig4Data);
    ms5 = JSON.parse(multisig5Data);
  } catch (e) {
    console.error('Failed to parse multisig data:', e);
    ms2 = [];
    ms3 = [];
    ms4 = [];
    ms5 = [];
  }

  const multisig1Data = window.MULTISIG1_DATA;

  // Make these globally available for other scripts
  window.treasury = {
    incomingTx: [],
    outgoingTx: [],
    transactions: [],
    parseUSDValue: function(valueStr) {
      if (!valueStr) return 0;
      return parseFloat(valueStr.replace('$', '').replace(/,/g, '')) || 0;
    }
  };

  // Helper functions
  function parseUSDValue(valueStr) {
    return window.treasury.parseUSDValue(valueStr);
  }

  function parseAmount(amountStr, type = '') {
    if (!amountStr) return { amount: 0, token: type || 'ETH' };
    
    // Handle different amount formats
    const cleanStr = amountStr.trim();
    
    // Format: "X.XX TOKEN" (e.g., "0.15 ETH")
    if (cleanStr.includes(' ')) {
      const [amount, token] = cleanStr.split(' ');
      return {
        amount: parseFloat(amount) || 0,
        token: token || type || 'ETH'
      };
    }
    
    // Format: Just the number with separate token field
    return {
      amount: parseFloat(cleanStr) || 0,
      token: type || 'ETH'
    };
  }

  function isValidTransaction(tx) {
    return tx.amount !== 0 || parseUSDValue(tx.valueUSD) !== 0;
  }

  function isIncomingTransaction(address, tx) {
    return tx.to.toLowerCase() === address.toLowerCase();
  }

  // Multisig addresses
  const MULTISIG_ADDRESSES = {
    multisig1: '0x582e8f63fc69d396395f61191ce1f7870f7289d6',
    multisig2: '0x04a11D3453Ef2E7174a95a07FCae749A182a3F07',
    multisig3: '0x7882bfa84C4Bee72649A0cadf730318A85f3fe56',
    multisig4: '0xb548C27DE463D5AC53056041D664d58b6A8341AD',
    multisig5: '0x2BCb4cE16A0E95CD2006b3eb602BD8C9E698f64B'
  };

  // Process transactions function
  function processTransactions() {
    // Clear existing transactions
    window.treasury.incomingTx.length = 0;
    window.treasury.outgoingTx.length = 0;
    
    // Helper function to normalize transaction data
    function normalizeTransaction(row, multisigKey, txType = 'ETH') {
      if (!row || typeof row !== 'object') return null;
      
      // Parse amount and determine token type
      const amountInfo = parseAmount(row["Amount"], row["Token"]);
      
      // For ETH transactions, if amount contains "ETH", override txType
      if (row["Amount"] && row["Amount"].includes('ETH')) {
        txType = 'ETH';
      }
      
      // Use explicit token type if provided
      if (row["Token"]) {
        txType = row["Token"].split('(')[0].trim();
      }
      
      return {
        date: row["DateTime (UTC)"],
        from: row["From"],
        to: row["To"],
        amount: amountInfo.amount,
        token: txType,
        valueUSD: row["Value (USD)"],
        multisig: multisigKey,
        hash: row["Transaction Hash"] || row["Parent Transaction Hash"]
      };
    }
    
    // Helper function to process a single multisig's transactions
    function processMultisigTransactions(data, multisigKey, startIndex = 1) {
      if (!data || !Array.isArray(data) || data.length <= startIndex) return;
      
      for (let i = startIndex; i < data.length; i++) {
        const tx = normalizeTransaction(data[i], multisigKey);
        if (!tx || !isValidTransaction(tx)) continue;

        if (isIncomingTransaction(MULTISIG_ADDRESSES[multisigKey], tx)) {
          window.treasury.incomingTx.push(tx);
        } else {
          window.treasury.outgoingTx.push(tx);
        }
      }
    }

    // Process multisig2-5 transactions
    processMultisigTransactions(ms2, 'multisig2');
    processMultisigTransactions(ms3, 'multisig3');
    processMultisigTransactions(ms4, 'multisig4');
    processMultisigTransactions(ms5, 'multisig5');

    // Process multisig1 transactions with different file types
    Object.entries(multisig1Data).forEach(([filename, data]) => {
      if (!data || !Array.isArray(data) || data.length < 2) return;
      
      let txType = 'ETH';
      if (filename.includes('tokentxns')) {
        txType = 'token';
      } else if (filename.includes('internal-tx')) {
        txType = 'Internal';
      }
      
      data.slice(1).forEach(row => {
        const tx = normalizeTransaction(row, 'multisig1', txType);
        if (!tx || !isValidTransaction(tx)) return;

        if (isIncomingTransaction(MULTISIG_ADDRESSES.multisig1, tx)) {
          window.treasury.incomingTx.push(tx);
        } else {
          window.treasury.outgoingTx.push(tx);
        }
      });
    });

    // Sort transactions by date
    window.treasury.incomingTx.sort((a, b) => new Date(b.date) - new Date(a.date));
    window.treasury.outgoingTx.sort((a, b) => new Date(b.date) - new Date(a.date));

    window.treasury.transactions = [...window.treasury.incomingTx, ...window.treasury.outgoingTx]
      .sort((a, b) => new Date(b.date) - new Date(a.date));
    
    return window.treasury.transactions;
  }

  // Calculate and display metrics
  function calculateMetrics() {
    const incomingVolume = window.treasury.incomingTx.reduce((sum, tx) => sum + parseUSDValue(tx.valueUSD), 0);
    const outgoingVolume = window.treasury.outgoingTx.reduce((sum, tx) => sum + parseUSDValue(tx.valueUSD), 0);
    const netPosition = incomingVolume - outgoingVolume;
    
    document.getElementById('incoming-volume-value').textContent = 
      `$${incomingVolume.toLocaleString('en-US', { maximumFractionDigits: 2 })}`;
    document.getElementById('outgoing-volume-value').textContent = 
      `$${outgoingVolume.toLocaleString('en-US', { maximumFractionDigits: 2 })}`;
    
    const netPositionElement = document.getElementById('net-position-value');
    netPositionElement.textContent = 
      `$${Math.abs(netPosition).toLocaleString('en-US', { maximumFractionDigits: 2 })}`;
    netPositionElement.classList.add(netPosition >= 0 ? 'positive' : 'negative');
    if (netPosition < 0) netPositionElement.textContent = '-' + netPositionElement.textContent;
    
    document.getElementById('transaction-count-value').textContent = window.treasury.transactions.length;
    document.getElementById('incoming-count').textContent = window.treasury.incomingTx.length;
    document.getElementById('outgoing-count').textContent = window.treasury.outgoingTx.length;
    
    // Create token charts
    window.treasuryCharts.createTokenCharts();
  }

  // Render transactions for current page
  function renderTransactions(transactions, currentPage, itemsPerPage) {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const tbody = document.getElementById('transactions-body');
    tbody.innerHTML = '';
    
    transactions.slice(start, end).forEach(tx => {
      const row = document.createElement('tr');
      const isIncoming = window.treasury.incomingTx.includes(tx);
      const txKey = `${tx.token}-${Math.floor(new Date(tx.date).getTime() / 1000)}`;
      
      row.innerHTML = `
        <td>${new Date(tx.date).toLocaleDateString()}</td>
        <td>${tx.token}</td>
        <td title="${tx.from}">${tx.from.slice(0, 8)}...</td>
        <td title="${tx.to}">${tx.to.slice(0, 8)}...</td>
        <td class="${isIncoming ? 'incoming' : 'outgoing'}">${tx.amount} ${tx.token}</td>
        <td class="usd-value" data-tx-key="${txKey}">${tx.valueUSD || 'Updating...'}</td>
      `;
      tbody.appendChild(row);
    });
  }

  // Setup pagination
  function setupPagination(transactions, itemsPerPage) {
    const totalPages = Math.ceil(transactions.length / itemsPerPage);
    let currentPage = 1;
    
    document.getElementById('current-page').textContent = currentPage;
    document.getElementById('prev-page').disabled = currentPage === 1;
    document.getElementById('next-page').disabled = currentPage === totalPages;
    
    document.getElementById('prev-page').addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--;
        renderTransactions(transactions, currentPage, itemsPerPage);
        document.getElementById('current-page').textContent = currentPage;
        document.getElementById('prev-page').disabled = currentPage === 1;
        document.getElementById('next-page').disabled = currentPage === totalPages;
      }
    });
    
    document.getElementById('next-page').addEventListener('click', () => {
      if (currentPage < totalPages) {
        currentPage++;
        renderTransactions(transactions, currentPage, itemsPerPage);
        document.getElementById('current-page').textContent = currentPage;
        document.getElementById('prev-page').disabled = currentPage === 1;
        document.getElementById('next-page').disabled = currentPage === totalPages;
      }
    });
  }

  function initializeDashboard() {
    // Initialize pagination
    const itemsPerPage = 10;
    let currentPage = 1;
    const totalPages = Math.ceil(window.treasury.transactions.length / itemsPerPage);
    
    // Update page info
    document.getElementById('total-pages').textContent = totalPages;
    
    // Calculate and display metrics
    calculateMetrics();
    
    // Create charts
    window.treasuryCharts.createVolumeChart();
    
    // Render initial transactions
    renderTransactions(window.treasury.transactions, currentPage, itemsPerPage);
    
    // Add pagination event listeners
    setupPagination(window.treasury.transactions, itemsPerPage);
  }

  // Make functions globally available
  Object.assign(window.treasury, {
    processTransactions,
    calculateMetrics,
    renderTransactions,
    setupPagination,
    initializeDashboard
  });
})();
