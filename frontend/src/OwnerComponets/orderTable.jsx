// src/components/OrdersTable.js

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrdersDetails} from '../Redux/orderDetailSlice';
import OwnerNavBar from './OwnerNavBar';
import OwnerSideBar from './OwnerSideBar';


const OrdersTable = () => {
    const dispatch = useDispatch();
    const orders = useSelector((state) => state.orders.orders)
    const orderStatus = useSelector((state) => state.orders.status);

    useEffect(() => {
        if (orderStatus === 'idle') {
            dispatch(fetchOrdersDetails());
        }
    }, [orderStatus, dispatch]);

    if (orderStatus === 'loading') {
        return <div>Loading...</div>;
    }

    if (orderStatus === 'failed') {
        return <div>Error fetching orders.</div>;
    }

    return (
        <div className="">
            
             <OwnerNavBar/>
             <OwnerSideBar/>
             <div className="overflow-x-auto pl-28 pr-20">
            <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">Order ID</th>
                        <th className="border border-gray-300 px-4 py-2">Created At</th>
                        <th className="border border-gray-300 px-4 py-2">Status</th>
                        <th className="border border-gray-300 px-4 py-2">Menu ID</th>
                        <th className="border border-gray-300 px-4 py-2">Menu Name</th>
                        <th className="border border-gray-300 px-4 py-2">Image</th>
                        <th className="border border-gray-300 px-4 py-2">Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) =>
                        order.items.map((item) => (
                            <tr key={item.menu_id}>
                                <td className="border border-gray-300 px-4 py-2">{order.order_id}</td>
                                <td className="border border-gray-300 px-4 py-2">{order.created_at}</td>
                                <td className="border border-gray-300 px-4 py-2">{order.status}</td>
                                <td className="border border-gray-300 px-4 py-2">{item.menu_id}</td>
                                <td className="border border-gray-300 px-4 py-2">{item.menu_name}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <img src={item.image} alt={item.menu_name} className="h-16" />
                                </td>
                                <td className="border border-gray-300 px-4 py-2">{item.quantity}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
        </div>
       
    );
};

export default OrdersTable;
