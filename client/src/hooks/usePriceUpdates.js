import { useState, useEffect } from 'react';
import axios from 'axios';

export function usePriceUpdates(transactions) {
  const [progress, setProgress] = useState({
    total: 0,
    completed: 0,
    failed: 0,
    status: 'idle'
  });

  const [updatedPrices, setUpdatedPrices] = useState(new Map());

  useEffect(() => {
    if (!transactions?.length) return;

    // Start the price update process
    const startUpdate = async () => {
      try {
        // Queue transactions for update
        await axios.post('/api/prices/queue', { transactions });
      } catch (error) {
        console.error('Failed to queue price updates:', error);
      }
    };

    startUpdate();
  }, [transactions]);

  useEffect(() => {
    // Set up SSE connection for progress updates
    const eventSource = new EventSource('/api/prices/progress');

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      if (data.type === 'progress') {
        setProgress(data.progress);
      } else if (data.type === 'price_update') {
        setUpdatedPrices(prev => {
          const next = new Map(prev);
          for (const update of data.updates) {
            const key = `${update.token}-${update.timestamp}`;
            next.set(key, update.price);
          }
          return next;
        });
      }
    };

    eventSource.onerror = (error) => {
      console.error('SSE connection error:', error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  // Get the latest price for a transaction
  const getPrice = (token, timestamp) => {
    const key = `${token}-${timestamp}`;
    return updatedPrices.get(key);
  };

  return {
    progress,
    getPrice,
    isUpdating: progress.status === 'processing',
    isComplete: progress.status === 'completed'
  };
} 