import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Widget from './Widget'; // Adjust the import path as necessary

const OverviewContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
`;

const DashboardOverview = () => {
  const [metrics, setMetrics] = useState({
    totalSales: 0,
    ordersCount: 0,
    customersCount: 0,
  });

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await fetch('/api/dashboard/metrics'); // Adjust this if your backend is hosted elsewhere
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setMetrics(data);
      } catch (error) {
        console.error("Failed to fetch metrics:", error);
      }
    };

    fetchMetrics();
  }, []);

  return (
    <OverviewContainer>
      <h2>Admin Panel</h2>
      <Widget title="Total Sales" value={`$${metrics.totalSales.toFixed(2)}`} />
      <Widget title="Orders" value={metrics.ordersCount} />
      <Widget title="Customers" value={metrics.customersCount} />
    </OverviewContainer>
  );
};

export default DashboardOverview;
