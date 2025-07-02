import React, { useState } from "react";

const Payment = () => {
    const [paymentMethod, setPaymentMethod] = useState("card");
    const [cardDetails, setCardDetails] = useState({
        name: "",
        number: "",
        expiry: "",
        cvv: "",
    });

    const handleInputChange = (e) => {
        setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
    };

    const handlePaymentMethodChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add payment processing logic here
        alert("Payment submitted!");
    };

    return (
        <div className="payment-page" style={{ maxWidth: 400, margin: "40px auto" }}>
            <h2>Payment</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        <input
                            type="radio"
                            value="card"
                            checked={paymentMethod === "card"}
                            onChange={handlePaymentMethodChange}
                        />
                        Credit/Debit Card
                    </label>
                    <label style={{ marginLeft: 16 }}>
                        <input
                            type="radio"
                            value="cod"
                            checked={paymentMethod === "cod"}
                            onChange={handlePaymentMethodChange}
                        />
                        Cash on Delivery
                    </label>
                </div>

                {paymentMethod === "card" && (
                    <div style={{ marginTop: 16 }}>
                        <div>
                            <label>Name on Card</label>
                            <input
                                type="text"
                                name="name"
                                value={cardDetails.name}
                                onChange={handleInputChange}
                                required
                                style={{ width: "100%", marginBottom: 8 }}
                            />
                        </div>
                        <div>
                            <label>Card Number</label>
                            <input
                                type="text"
                                name="number"
                                value={cardDetails.number}
                                onChange={handleInputChange}
                                required
                                maxLength={16}
                                style={{ width: "100%", marginBottom: 8 }}
                            />
                        </div>
                        <div style={{ display: "flex", gap: 8 }}>
                            <div>
                                <label>Expiry</label>
                                <input
                                    type="text"
                                    name="expiry"
                                    value={cardDetails.expiry}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="MM/YY"
                                    style={{ width: "100px", marginBottom: 8 }}
                                />
                            </div>
                            <div>
                                <label>CVV</label>
                                <input
                                    type="password"
                                    name="cvv"
                                    value={cardDetails.cvv}
                                    onChange={handleInputChange}
                                    required
                                    maxLength={4}
                                    style={{ width: "60px", marginBottom: 8 }}
                                />
                            </div>
                        </div>
                    </div>
                )}

                <button type="submit" style={{ marginTop: 24, width: "100%" }}>
                    Pay Now
                </button>
            </form>
        </div>
    );
};

export default Payment;