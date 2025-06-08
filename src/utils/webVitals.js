import { onCLS, onFID, onLCP, onFCP, onTTFB } from 'web-vitals';

const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    // Core Web Vitals
    onCLS(onPerfEntry);
    onFID(onPerfEntry);
    onLCP(onPerfEntry);
    // Additional metrics
    onFCP(onPerfEntry);
    onTTFB(onPerfEntry);
  }
};

export default reportWebVitals;
