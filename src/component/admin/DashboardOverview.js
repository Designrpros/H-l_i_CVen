import React, { useState, useEffect } from 'react';
import { db } from '../../firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import styled from 'styled-components';
import { useAuth } from '../../context/AuthContext';

const OverviewContainer = styled.div`
  padding: 20px;
`;

const Header = styled.h2`
  text-align: center;
  margin-bottom: 20px;
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

const LogoutButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 40px; /* Added more space to the bottom */
`;

const LogoutButton = styled.button`
  padding: 10px 20px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #d32f2f;
  }
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
    revenueGrowth: null, // Initialized as null to distinguish from 0%
    topSellingProducts: [],
  });

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        // Fetch orders and calculate sales and product quantities
        const ordersSnapshot = await getDocs(collection(db, "orders"));
        let totalSales = 0;
        let productQuantities = {};
        ordersSnapshot.forEach(doc => {
          const order = doc.data();
          const totalAmountCorrected = order.totalAmount / 100;
          totalSales += totalAmountCorrected;
          order.productsPurchased.forEach(product => {
            productQuantities[product.name] = (productQuantities[product.name] || 0) + product.quantity;
          });
        });

        // Fetch products and calculate inventory levels
        const productsSnapshot = await getDocs(collection(db, "products"));
        let productInventoryLevels = {};
        productsSnapshot.forEach(doc => {
          const product = doc.data();
          productInventoryLevels[product.name] = product.stock;
        });

        // Calculate revenue growth
        const lastMonth = new Date();
        lastMonth.setMonth(lastMonth.getMonth() - 1);
        const ordersLastMonthSnapshot = await getDocs(query(collection(db, "orders"), where("createdAt", ">", lastMonth)));
        let lastMonthSales = 0;
        ordersLastMonthSnapshot.forEach(doc => {
          lastMonthSales += doc.data().totalAmount / 100;
        });
        const revenueGrowth = lastMonthSales > 0 ? ((totalSales - lastMonthSales) / lastMonthSales) * 100 : null;

        // Calculate other metrics
        const ordersCount = ordersSnapshot.size;
        const averageOrderValue = totalSales / ordersCount;
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

        // Update state with all metrics
        setMetrics({
          totalSales,
          ordersCount,
          customersCount,
          averageOrderValue,
          mostPopularProduct,
          revenueGrowth,
          topSellingProducts: Object.entries(productQuantities).sort((a, b) => b[1] - a[1]).slice(0, 3),
        });
      } catch (error) {
        console.error("Failed to fetch metrics:", error);
      }
    };

    fetchMetrics();
  }, []);

  const { logout } = useAuth();

  return (
    <OverviewContainer>
      <Header>Dashboard Overview</Header>
      <LogoutButtonContainer>
        <LogoutButton onClick={logout}>Logout</LogoutButton>
      </LogoutButtonContainer>
      <WidgetsContainer>
        <Widget title="Total Sales" value={`${metrics.totalSales.toFixed(2)} NOK`} />
        <Widget title="Orders" value={metrics.ordersCount} />
        <Widget title="Customers" value={metrics.customersCount} />
        <Widget title="Average Order Value" value={`${metrics.averageOrderValue.toFixed(2)} NOK`} />
        <Widget title="Revenue Growth" value={metrics.revenueGrowth ? `${metrics.revenueGrowth.toFixed(2)}%` : 'Calculating...'} />
        <Widget title="Most Popular Product" value={metrics.mostPopularProduct} />
        {metrics.topSellingProducts.map(([productName, quantity], index) => (
          <Widget key={index} title={`Top ${index + 1}: ${productName}`} value={`Sold: ${quantity}`} />
        ))}
      </WidgetsContainer>
    </OverviewContainer>
  );
};

export default DashboardOverview;
