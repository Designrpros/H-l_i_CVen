import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { db } from '../../firebaseConfig'; // Adjust the import path as necessary
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';

const OrdersContainer = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
  min-height: 100vh;
`;


const OrdersTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const TableHeader = styled.th`
  padding: 10px;
  border-bottom: 1px solid #eee;
  background-color: #f5f5f5;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const TableCell = styled.td`
  padding: 10px;
  border-bottom: 1px solid #eee;
`;

const Header = styled.h1`
  color: #333;
  margin-bottom: 20px;
`;

const ErrorMsg = styled.p`
  color: red;
`;

const LoadingMsg = styled.p`
  color: #333;
`;

const Checkbox = styled.input`
  margin-right: 10px;
`;

const SendButton = styled.button`
  background-color: ${props => props.confirmationSent ? '#888' : '#4CAF50'}; /* Gray if sent, otherwise green */
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  &:hover {
    background-color: ${props => props.confirmationSent ? '#777' : '#45a049'};
  }
`;

const ScrollableTableContainer = styled.div`
  max-height: calc(100vh - 100px); /* Adjust based on your header height and desired padding */
  overflow-y: auto;
  margin-top: 20px; /* Space between the header and the table */
`;

const SearchField = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px; // Add some margin to separate from the table
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
`;


const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState(''); // State to hold the search query

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError('');
      try {
        const querySnapshot = await getDocs(collection(db, 'orders'));
        let fetchedOrders = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt.toDate(), // Convert Firestore Timestamp to JavaScript Date
        }));
        // Sort fetchedOrders by createdAt in descending order (newest first)
        fetchedOrders.sort((a, b) => b.createdAt - a.createdAt);
        setOrders(fetchedOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError("Failed to fetch orders. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchOrders();
  }, []);
  



  const handleShippedChange = async (orderId, currentStatus) => {
    const orderRef = doc(db, 'orders', orderId);
    try {
      await updateDoc(orderRef, {
        shipped: !currentStatus,
      });
      // Update local state to reflect the change
      setOrders(orders.map(order => order.id === orderId ? { ...order, shipped: !currentStatus } : order));
    } catch (error) {
      console.error("Error updating shipped status:", error);
    }
  };



  const handleSendConfirmation = async (orderId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/send-confirmation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderId }),
      });
      if (!response.ok) {
        throw new Error('Failed to send confirmation email');
      }
      // Assuming the email was sent successfully, update Firestore
      const orderRef = doc(db, 'orders', orderId);
      await updateDoc(orderRef, {
        confirmationSent: true,
      });
      // Update local state to reflect the change
      setOrders(orders.map(order => order.id === orderId ? { ...order, confirmationSent: true } : order));
    } catch (error) {
      console.error('Error sending confirmation email:', error);
    }
  };


  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  // Filter and sort orders based on the search query and date
  const filteredAndSortedOrders = orders.filter(order =>
    order.email.toLowerCase().includes(searchQuery) ||
    order.id.toLowerCase().includes(searchQuery) ||
    order.productsPurchased.some(p => p.name.toLowerCase().includes(searchQuery))
  ).sort((a, b) => b.createdAt - a.createdAt); // This ensures the list stays sorted even after filtering

  if (loading) return <LoadingMsg>Loading orders...</LoadingMsg>;
  if (error) return <ErrorMsg>{error}</ErrorMsg>;

  return (
    <OrdersContainer>
      <Header>Order Management</Header>
      <ScrollableTableContainer>
      <SearchField
          type="text"
          placeholder="Search orders..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      <OrdersTable>
        <thead>
          <tr>
            <TableHeader>Shipped</TableHeader>
            <TableHeader>Send Confirmation</TableHeader>
            <TableHeader>Date</TableHeader>
            <TableHeader>Price</TableHeader>
            <TableHeader>Product Name</TableHeader>
            <TableHeader>Amount</TableHeader> {/* New column for coffee amount */}
            <TableHeader>Customer's Name</TableHeader>
            <TableHeader>Order ID</TableHeader>
          </tr>
        </thead>
        <tbody>
        {filteredAndSortedOrders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>
                <Checkbox type="checkbox" checked={order.shipped} onChange={() => handleShippedChange(order.id, order.shipped)} />
              </TableCell>
              <TableCell>
                <SendButton
                  onClick={() => handleSendConfirmation(order.id)}
                  confirmationSent={order.confirmationSent}
                  disabled={order.confirmationSent}
                >
                  Send
                </SendButton>
              </TableCell>
              <TableCell>{order.createdAt.toLocaleDateString()}</TableCell>
              <TableCell>{order.totalAmount / 100} NOK</TableCell>
              <TableCell>{order.productsPurchased.map(p => p.name).join(', ')}</TableCell>
              <TableCell>
                {order.productsPurchased.map(p => `${p.quantity} pcs`).join(', ')} {/* Displaying the quantity */}
              </TableCell>
              <TableCell>{order.email}</TableCell>
              <TableCell>{order.id}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </OrdersTable>
      </ScrollableTableContainer>

    </OrdersContainer>
  );
};

export default OrderManagement;
