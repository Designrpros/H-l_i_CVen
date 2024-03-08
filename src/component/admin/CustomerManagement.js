import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { db } from '../../firebaseConfig'; // Ensure this import path is correct
import { collection, getDocs, query, where } from "firebase/firestore"; // Import necessary functions

const Container = styled.div`
  padding: 20px;
`;

const CustomerList = styled.ul`
  list-style: none;
  padding: 0;
`;

const CustomerItem = styled.li`
  background: #f0f0f0;
  padding: 20px;
  margin-bottom: 10px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
`;

const Info = styled.p`
  margin: 5px 0;
`;

const OrdersTable = styled.table`
  width: 100%;
  margin-top: 10px;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  background-color: #eee;
  padding: 10px;
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

const CustomerManagement = () => {
  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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
        console.log("Customers:", customersData); // Debugging
  
        // Fetch orders
        const ordersSnapshot = await getDocs(collection(db, 'orders'));
        const ordersData = ordersSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("Orders:", ordersData); // Debugging
  
        // Map orders to their respective customers
        const customersWithOrders = customersData.map(customer => ({
          ...customer,
          orders: ordersData.filter(order => order.customerId === customer.id),
        }));
  
        console.log("Customers with Orders:", customersWithOrders); // Debugging
  
        setCustomers(customersWithOrders);
        setOrders(ordersData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load data.');
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);
  

  if (loading) return <Container>Loading...</Container>;
  if (error) return <Container>Error: {error}</Container>;

  return (
    <Container>
      <h1>Customer Management</h1>
      <CustomerList>
        {customers.map((customer) => (
          <CustomerItem key={customer.id}>
            <Info>Email: {customer.email}</Info>
            <Info>Total Spent: {(customer.totalSpent / 100).toFixed(2)} NOK</Info>
            <Info>Orders: {customer.orders?.length || 0}</Info>
            {customer.orders && customer.orders.length > 0 && (
              <OrdersTable>
                <thead>
                  <tr>
                    <TableHeader>Date</TableHeader>
                    <TableHeader>Amount</TableHeader>
                    <TableHeader>Total Price</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  {customer.orders.map(order => (
                    <TableRow key={order.id}>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>{order.amount}</TableCell>
                      <TableCell>{(order.totalPrice / 100).toFixed(2)} NOK</TableCell>
                    </TableRow>
                  ))}
                </tbody>
              </OrdersTable>
            )}
          </CustomerItem>
        ))}
      </CustomerList>
    </Container>
  );
};

export default CustomerManagement;
