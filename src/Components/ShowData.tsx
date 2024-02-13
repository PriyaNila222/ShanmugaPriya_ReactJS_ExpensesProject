import React, { Fragment, useEffect, useState } from 'react';
import IDataList from '../Model/IDataList';
import { getDataFromServer } from '../Service/Menu.ts';
import ExpensesTracker from './ExpenseTracker.tsx';
import './ShowData.css';


function ShowData() {
    const [items, setItems] = useState<IDataList[]>([]);
    const [sum, setSum] = useState<number | null>();
    const [rahulSpent, setRahulSpent] = useState<number>(0);
    const [rameshSpent, setRameshSpent] = useState<number>(0);
    const [showForm, setshowForm] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const data = await getDataFromServer();
                setItems(data);
                setSum(data.reduce((res, each) => (res = res + each.price), 0));
                shares(data);
            } catch (error: any) {
                setError(error);
            }
        };

        fetchItems();
    }, [showForm]);

    var rahulSpent1: number = 0;
    var rameshSpent1: number = 0;

    const shares = (data: IDataList[]) => {
        data.map((each) =>
            each.payeeName === "Rahul" ? (rahulSpent1 = rahulSpent1 + each.price) : (rameshSpent1 = rameshSpent1 + each.price)
        );

        setRahulSpent(rahulSpent1);
        setRameshSpent(rameshSpent1);
    }

    const success = () => {
        setshowForm(false);
    }

    const cancel = () => {
        setshowForm(false);
    }

    return (
        <>
            <header id="page-header">Expenses Tracker</header>
            <button onClick={() => setshowForm(true)}>Add</button>
            {showForm &&
                (<div className="form">
                    <ExpensesTracker onTrue={success} OnClose={cancel}></ExpensesTracker>
                </div>)

            }

            <article className="flex-row">
                <div className="heading">Date</div>
                <div className="heading">Product Purchased</div>
                <div className="heading">Price</div>
                <div className="heading" style={{ width: 100 }}>Payee</div>
            </article>


            {
                items && items.map((user, index) => (

                    <section className="flex-row" key={index}>
                        <div className="heading date">{user.setDate}</div>
                        <div className="heading product">{user.product}</div>
                        <div className="heading price">{user.price}</div>
                        <div className={`heading ${user.payeeName}`} style={{ width: 100 }}>{user.payeeName}</div>
                    </section>

                )
                )
            }

            <hr />

            <section className="result">
                <div className="total">Total:</div>
                <div className="total sum" >{sum}</div>

            </section>

            <section className="result">
                <div className="total">Rahul Paid:</div>
                <div className="total Rahul">{rahulSpent}</div>

            </section>
            <section className="result">
                <div className="total">Ramesh Paid:</div>
                <div className="total Ramesh">{rameshSpent}</div>

            </section>
            <section className="result">
                <div className="total payable">
                    {rahulSpent > rameshSpent ? "Pay Rahul" : "Pay Ramesh"}
                </div>

                <div className="total payable price">{" "}
                    {Math.abs((rahulSpent - rameshSpent) / 2)}
                </div>
            </section>
            {error && <>{error?.message}</>}
        </>

    );


}

export default ShowData;