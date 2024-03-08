import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { db } from '../../firebaseConfig'; // Ensure this import path is correct
import { collection, getDocs, query, where } from "firebase/firestore"; // Import necessary functions

const Container = styled.div`
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 800px;
  margin: auto;
`;

const CustomerCard = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  overflow: hidden;
  transition: box-shadow 0.3s ease-in-out;
  &:hover {
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }
`;

const CustomerHeader = styled.div`
  background-color: #9dd2ac;
  color: white;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
`;

const CustomerInfo = styled.div`
  padding: 20px;
  background: #f9f9f9;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const CustomerList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;


const OrdersTable = styled.table`
  width: 100%;
  margin-top: 10px;
  border-collapse: collapse;
  display: ${props => props.isOpen ? 'table' : 'none'}; /* Controlled by isOpen prop */
`;

const TableHeader = styled.th`
  background-color: #eee;
  padding: 10px;
  text-align: left;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const TableCell = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
`;

const ScrollView = styled.div`
  max-height: 200px;
  overflow-y: auto;
  margin-top: 10px;
`;

const ToggleButton = styled.button`
  background-color: #4CAF50;
  color: white;
  padding: 8px 12px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  font-size: 14px;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #367c39;
  }
`;

const InfoGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #ffffff;
  padding: 10px 15px;
  border-radius: 5px;
  margin: 5px 0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const Label = styled.span`
  font-weight: 600;
`;

const Value = styled.span`
  color: #333;
`;

const OrdersContainer = styled.div`
  display: ${props => props.isOpen ? 'block' : 'none'};
`;





const CustomerManagement = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [visibleOrders, setVisibleOrders] = useState({}); // Tracks visibility of orders for each customer

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError('');
      try {
        // Fetch customers
        const customersSnapshot = await getDocs(collection(db, 'customers'));
        const customersData = customersSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("Fetched Customers Data:", customersData); // Log fetched customers data
  
        // Fetch orders
        const ordersSnapshot = await getDocs(collection(db, 'orders'));
        const ordersData = ordersSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("Fetched Orders Data:", ordersData); // Log fetched orders data
  
        // Correctly map orders to their respective customers
        const customersWithOrders = customersData.map(customer => ({
          ...customer,
          orders: ordersData.filter(order => order.email === customer.email), // Use order.email to match
        }));

  
        console.log("Customers with Orders:", customersWithOrders); // Log customers with their orders
  
        setCustomers(customersWithOrders);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load data.');
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);

  const toggleOrdersVisibility = (customerId) => {
    setVisibleOrders(prev => ({
      ...prev,
      [customerId]: !prev[customerId]
    }));
    console.log(`Toggled visibility for ${customerId}:`, !visibleOrders[customerId]);
  };
  
  

  if (loading) return <Container>Loading...</Container>;
  if (error) return <Container>Error: {error}</Container>;

  return (
    <Container>
      <h1>Customer Management</h1>
      <CustomerList>
        {customers.map((customer) => (
          <CustomerCard key={customer.id}>
            <CustomerHeader>
              <div>Email: {customer.email}</div>
              <ToggleButton onClick={() => toggleOrdersVisibility(customer.id)}>
                {visibleOrders[customer.id] ? 'Hide Orders' : 'Show Orders'}
              </ToggleButton>
            </CustomerHeader>
            <CustomerInfo>
              <InfoGroup>
                <Label>Total Spent:</Label>
                <Value>{(customer.totalSpent / 100).toFixed(2)} NOK</Value>
              </InfoGroup>
              <InfoGroup>
                <Label>Orders:</Label>
                <Value>{customer.orders.length}</Value>
              </InfoGroup>
            </CustomerInfo>
            <OrdersContainer isOpen={visibleOrders[customer.id]}>
              <ScrollView>
                <OrdersTable isOpen={visibleOrders[customer.id]}>
                  <thead>
                    <tr>
                      <TableHeader>Date</TableHeader>
                      <TableHeader>Products</TableHeader>
                      <TableHeader>Total Price</TableHeader>
                    </tr>
                  </thead>
                  <tbody>
                    {customer.orders.map(order => (
                      <TableRow key={order.id}>
                        <TableCell>{new Date(order.createdAt.seconds * 1000).toLocaleDateString()}</TableCell>
                        <TableCell>{order.productsPurchased.map(p => p.name).join(', ')}</TableCell>
                        <TableCell>{(order.totalAmount / 100).toFixed(2)} NOK</TableCell>
                      </TableRow>
                    ))}
                  </tbody>
                </OrdersTable>
              </ScrollView>
            </OrdersContainer>
          </CustomerCard>
        ))}
      </CustomerList>
    </Container>
  );
};

export default CustomerManagement;
