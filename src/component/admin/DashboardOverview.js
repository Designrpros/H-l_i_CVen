import React, { useState, useEffect } from 'react';
import { db } from '../../firebaseConfig'; // Adjust the import path as necessary
import { collection, getDocs, query, where } from 'firebase/firestore';
import styled from 'styled-components';


const OverviewContainer = styled.div`
  padding: 20px;
`;

const Header = styled.h2`
  text-align: center;
  margin-bottom: 40px; // Adjust based on your preference
`;

const WidgetsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
`;

const WidgetContainer = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
  }
`;

const WidgetTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  color: #333;
  text-transform: uppercase;
`;

const WidgetValue = styled.div`
  margin-top: 10px;
  font-size: 24px;
  font-weight: bold;
  color: #4a90e2;
`;

const Widget = ({ title, value }) => (
  <WidgetContainer>
    <WidgetTitle>{title}</WidgetTitle>
    <WidgetValue>{value}</WidgetValue>
  </WidgetContainer>
);

const DashboardOverview = () => {
  const [metrics, setMetrics] = useState({
    totalSales: 0,
    ordersCount: 0,
    customersCount: 0,
    averageOrderValue: 0,
    mostPopularProduct: '',
  });

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const ordersSnapshot = await getDocs(collection(db, "orders"));
        let totalSales = 0;
        let productQuantities = {}; // Track quantities for each product
  
        ordersSnapshot.forEach(doc => {
          const order = doc.data();
          // Assuming 'totalAmount' is stored as an integer (e.g., 45000 for 450.00 NOK)
          // Convert it to a proper decimal (e.g., 450.00)
          const totalAmountCorrected = order.totalAmount / 100; // Correcting the amount
  
          console.log(`Order ID: ${doc.id}, Corrected Total Amount: ${totalAmountCorrected} NOK`); // Debugging log
  
          totalSales += totalAmountCorrected; // Use the corrected amount for total sales calculation
  
          // Aggregate product quantities
          order.productsPurchased.forEach(product => {
            if (productQuantities[product.name]) {
              productQuantities[product.name] += product.quantity;
            } else {
              productQuantities[product.name] = product.quantity;
            }
          });
        });
  
        const ordersCount = ordersSnapshot.size;
        const averageOrderValue = ordersCount > 0 ? totalSales / ordersCount : 0;
  
        // Debugging logs for verification
        console.log(`Corrected Total Sales (NOK): ${totalSales}`);
        console.log(`Orders Count: ${ordersCount}`);
        console.log(`Corrected Average Order Value (NOK): ${averageOrderValue}`);
  
        // Identify most popular product
        let mostPopularProduct = '';
        let maxQuantity = 0;
        Object.entries(productQuantities).forEach(([product, quantity]) => {
          if (quantity > maxQuantity) {
            mostPopularProduct = product;
            maxQuantity = quantity;
          }
        });
  
        // Fetch customers count
        const customersSnapshot = await getDocs(collection(db, "customers"));
        const customersCount = customersSnapshot.size;
  
        // Update state with fetched data
        setMetrics({
          totalSales,
          ordersCount,
          customersCount,
          averageOrderValue,
          mostPopularProduct,
        });
      } catch (error) {
        console.error("Failed to fetch metrics:", error);
      }
    };
  
    fetchMetrics();
  }, []);
  
  

  return (
    <OverviewContainer>
      <Header>Dashboard</Header>
      <WidgetsContainer>
        <Widget title="Total Sales" value={`${metrics.totalSales.toFixed(2)} NOK`} />
        <Widget title="Orders" value={metrics.ordersCount} />
        <Widget title="Customers" value={metrics.customersCount} />
        <Widget title="Average Order Value" value={`${metrics.averageOrderValue.toFixed(2)} NOK`} />
        <Widget title="Most Popular Product" value={metrics.mostPopularProduct} />
      </WidgetsContainer>
    </OverviewContainer>
  );
};

export default DashboardOverview;
