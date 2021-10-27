import React, { useState, useEffect} from 'react'
import { useStateValue } from './StateProvider'
import { db } from './firebase'
import { collection, doc, onSnapshot, orderBy, getDocs, query } from "firebase/firestore";
import './Orders.css'
import Order from './Order'

function Orders() {
    const [{basket, user}, dispatch] = useStateValue()
    const [orders, setOrders] = useState([])

    useEffect(async () => {
        if(user){
            const orderRef = collection(db, "users", user?.uid, "orders")
            const q =  query(orderRef, orderBy("created", "desc"));
           

            onSnapshot(q, (querySnapshot) => {
                const orderList = [] 
                querySnapshot.forEach((doc) => {
                    orderList.push({id: doc.id, data: doc.data()})
                });
                setOrders(orderList);
            });
            

        }
        else{
            setOrders([])
        }
       
    }, [user])
    
    return (
        <div className='orders'>
            <h1>Your Orders</h1>
            <div className="orders__order">
                {
                    orders?.map(order => (
                        <Order order={order} />
                    ))
                }
            </div>
        </div>
    )
}

export default Orders
