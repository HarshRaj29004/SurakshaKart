import React, { useState, useEffect, useRef } from "react";
import QRCode from "react-qr-code";
import { X, Copy, CheckCircle, Clock, XCircle } from "lucide-react";
import { useCallback } from "react";

// --- Custom Hook for Timer (Abstraction) ---
const useTimer = (initialSeconds, onTimerEnd) => {
    const [seconds, setSeconds] = useState(initialSeconds);
    const timerRef = useRef(null);
    const [isActive, setIsActive] = useState(false);

    const startTimer = useCallback(() => {
        clearInterval(timerRef.current);
        setSeconds(initialSeconds);
        setIsActive(true);
    }, [initialSeconds]);

    const stopTimer = useCallback(() => {
        clearInterval(timerRef.current);
        setIsActive(false);
    }, []);

    useEffect(() => {
        if (isActive) {
            timerRef.current = setInterval(() => {
                setSeconds((prev) => {
                    if (prev <= 1) {
                        clearInterval(timerRef.current);
                        setIsActive(false);
                        onTimerEnd && onTimerEnd();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => clearInterval(timerRef.current);
    }, [isActive, onTimerEnd]);

    const formatTime = () => {
        const m = String(Math.floor(seconds / 60)).padStart(2, "0");
        const s = String(seconds % 60).padStart(2, "0");
        return `${m}:${s}`;
    };

    return { seconds, formatTime, startTimer, stopTimer, isActive };
};

// --- Dummy Account Data ---
const dummyAccount = {
    accountHolder: "Harsh Raj",
    ifscCode: "SBIN0001234",
    receiverServiceAccount: "68681801bb03d6320b86113d",
};

// --- Transaction Reference Input Modal ---
const TransactionRefModal = ({ onClose, onSubmit, isLoading }) => {
    const [transactionRef, setTransactionRef] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        if (e) e.preventDefault();
        if (!transactionRef.trim()) {
            setError("Please enter a transaction reference");
            return;
        }
        setError("");
        onSubmit(transactionRef.trim());
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl">
                <div className="flex items-center justify-between mb-4 border-b pb-3">
                    <h2 className="text-lg font-bold text-gray-800">Enter Transaction Reference</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                        disabled={isLoading}
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>

                <div onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Transaction Reference ID
                        </label>
                        <input
                            type="text"
                            value={transactionRef}
                            onChange={(e) => setTransactionRef(e.target.value)}
                            placeholder="Enter your transaction reference"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            disabled={isLoading}
                            autoFocus
                        />
                        {error && (
                            <p className="text-red-500 text-sm mt-1">{error}</p>
                        )}
                    </div>

                    <div className="flex flex-col space-y-2">
                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={isLoading}
                            className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    <Clock className="h-4 w-4 mr-2 animate-spin" />
                                    Confirming...
                                </div>
                            ) : (
                                "Confirm Payment"
                            )}
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isLoading}
                            className="w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-all font-semibold disabled:opacity-50"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- QR Code Modal Component ---
const QRModal = ({ account, amount, onClose, onConfirm, timerData, onCopy }) => {
    const { formatTime, seconds, isActive } = timerData;
    const qrValue = {
        receiverServiceAccount: account.receiverServiceAccount,
        url: `http://localhost:5174/transfer/${account.receiverServiceAccount}?amount=${amount}`,
        gateway: "LinkSuraksha",
        amount: amount,
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50 animate-fade-in">
            <div className="bg-white rounded-xl p-8 w-full max-w-md shadow-2xl transform scale-100 animate-scale-up">
                <div className="flex items-center justify-between mb-6 border-b pb-4">
                    <h2 className="text-xl font-bold text-gray-800">Scan to Pay</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                        aria-label="Close QR code"
                    >
                        <X className="h-7 w-7" />
                    </button>
                </div>

                <div className="text-center mb-6">
                    <p className="text-lg text-gray-700 font-semibold mb-2">
                        Amount: <span className="text-blue-600">₹{amount.toFixed(2)}</span>
                    </p>
                    <div className="relative w-56 h-56 mx-auto bg-white border-2 border-gray-200 rounded-lg flex items-center justify-center p-2 mb-4 shadow-inner">
                        {!isActive && seconds === 0 ? (
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white bg-opacity-90 rounded-lg">
                                <Clock className="h-16 w-16 text-red-500 mb-2" />
                                <p className="text-red-600 font-semibold">QR Expired!</p>
                                <button
                                    onClick={onClose}
                                    className="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                                >
                                    Try Again
                                </button>
                            </div>
                        ) : (
                            <QRCode
                                id="qr-code"
                                size={256}
                                style={{ height: "auto", maxWidth: "90%", width: "90%" }}
                                value={JSON.stringify(qrValue)}
                                viewBox={`0 0 256 256`}
                            />
                        )}
                    </div>
                    <div className="flex items-center justify-center gap-2 text-lg font-semibold text-blue-600 mb-4">
                        <Clock className="h-5 w-5" />
                        <span>Expires in: {formatTime()}</span>
                    </div>

                    <p className="text-sm text-gray-600 mb-2">
                        **Bank Account Details for Manual Transfer:**
                    </p>
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 mb-4">
                        <div className="flex justify-between items-center text-sm mb-1">
                            <span className="font-medium text-gray-700">Account Holder:</span>
                            <span className="font-mono text-gray-800">{account.accountHolder}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm mb-1">
                            <span className="font-medium text-gray-700">IFSC Code:</span>
                            <span className="font-mono text-gray-800">{account.ifscCode}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="font-medium text-gray-700">Account No:</span>
                            <span className="font-mono text-gray-800 break-all">{account.receiverServiceAccount}</span>
                            <button
                                onClick={() => onCopy(account.receiverServiceAccount)}
                                className="ml-2 text-blue-500 hover:text-blue-700 transition-colors"
                                aria-label="Copy account number"
                            >
                                <Copy className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col space-y-3">
                    <button
                        onClick={onConfirm}
                        className="w-full px-5 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all font-semibold text-lg"
                        disabled={!isActive}
                    >
                        I have paid (Confirm Payment)
                    </button>
                    <button
                        onClick={onClose}
                        className="w-full px-5 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-all font-semibold text-lg"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- Main Payment Component ---
const Payment = () => {

    // Mock amount for demo (you can change this)
    const amount = location.state?.amount || 0;;

    const [showQR, setShowQR] = useState(false);
    const [showRefModal, setShowRefModal] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState("pending");
    const [isConfirming, setIsConfirming] = useState(false);
    const [account] = useState(dummyAccount);

    // Timer hook for QR code validity - 10 minutes (600 seconds)
    const { seconds, formatTime, startTimer, stopTimer, isActive } = useTimer(
        600,
        () => {
            if (paymentStatus === "pending") {
                setPaymentStatus("timeout");
                setShowQR(false);
            }
        }
    );

    const loginAndGetToken = async () => {
        try {
            const response = await fetch("http://localhost:8001/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: "harshraj321@gmail.com",
                    password: "HarshRaj"
                })
            });

            if (!response.ok) throw new Error("Login failed");

            const data = await response.json();
            console.log("Logged in. Got token:", data.user.token);

            return data.user.token;
        } catch (err) {
            console.error("Login error:", err);
            return null;
        }
    };

    useEffect(() => {
        if (showQR) {
            startTimer();
        } else {
            stopTimer();
        }
    }, [showQR, startTimer, stopTimer]);

    const handleShowQR = () => {
        setPaymentStatus("pending");
        setShowQR(true);
    };

    const handleCloseQR = () => {
        setShowQR(false);
        stopTimer();
        if (paymentStatus === "pending") {
            setPaymentStatus("cancelled");
        }
    };

    const handlePaymentConfirmation = () => {
        setShowQR(false);
        setShowRefModal(true);
    };

    const handleRefModalClose = () => {
        setShowRefModal(false);
        setShowQR(true); // Show QR again if user cancels
    };

    const handleTransactionRefSubmit = async (transactionRef) => {
        setIsConfirming(true);
        setPaymentStatus("processing");
        stopTimer();

        try {
            const token = await loginAndGetToken();

            if (!token) {
                console.error("Could not login. Payment failed.");
                setPaymentStatus("failed");
                setShowRefModal(false);
                return;
            }

            const response = await fetch("http://localhost:8001/api/users/confirm", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    transactionReference: transactionRef.toLowerCase(),
                    amount: amount
                })
            });

            if (!response.ok) {
                throw new Error("Transaction confirmation failed");
            }

            const data = await response.json();
            console.log("Transaction confirmed:", data);

            setPaymentStatus("confirmed");
            setShowRefModal(false);

            setTimeout(() => {
                console.log("Navigating to dashboard with payment success");
                // navigate("/", { state: { paymentSuccess: true, amount } });
            }, 1500);

        } catch (error) {
            console.error("Payment confirmation error:", error);
            setPaymentStatus("failed");
            setShowRefModal(false);
        } finally {
            setIsConfirming(false);
        }
    };

    const handleCopyToClipboard = (text) => {
        navigator.clipboard.writeText(text)
            .then(() => alert("Copied to clipboard!"))
            .catch((err) => console.error("Failed to copy:", err));
    };

    // For demo purposes, we'll comment out the amount validation
    // if (amount <= 0) {
    //     return (
    //         <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 text-red-700 p-4">
    //             <XCircle className="h-16 w-16 mb-4" />
    //             <h1 className="text-2xl font-bold mb-2">Invalid Payment Amount</h1>
    //             <p className="text-lg text-center mb-6">
    //                 It looks like there's no amount specified for this payment. Please go back to the cart or product page.
    //             </p>
    //             <button
    //                 onClick={() => console.log("Navigate to cart")}
    //                 className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition font-semibold"
    //             >
    //                 Go to Cart
    //             </button>
    //         </div>
    //     );
    // }0) {
    //     return (
    //         <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 text-red-700 p-4">
    //             <XCircle className="h-16 w-16 mb-4" />
    //             <h1 className="text-2xl font-bold mb-2">Invalid Payment Amount</h1>
    //             <p className="text-lg text-center mb-6">
    //                 It looks like there's no amount specified for this payment. Please go back to the cart or product page.
    //             </p>
    //             <button
    //                 onClick={() => navigate('/cart')}
    //                 className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition font-semibold"
    //             >
    //                 Go to Cart
    //             </button>
    //         </div>
    //     );
    // }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
                <h1 className="text-3xl font-extrabold text-gray-800 mb-6">Complete Your Payment</h1>

                <p className="text-2xl font-bold text-blue-700 mb-6">
                    Amount Due: ₹{amount.toFixed(2)}
                </p>

                {paymentStatus === "pending" && (
                    <button
                        onClick={handleShowQR}
                        className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 font-semibold text-lg"
                    >
                        Show QR Code to Pay
                    </button>
                )}

                {paymentStatus === "processing" && (
                    <div className="flex items-center justify-center text-blue-600 font-semibold text-lg py-4">
                        <Clock className="h-6 w-6 mr-2 animate-spin" />
                        Processing your payment...
                    </div>
                )}

                {paymentStatus === "confirmed" && (
                    <div className="flex flex-col items-center justify-center text-green-600 font-semibold text-xl py-4">
                        <CheckCircle className="h-16 w-16 mb-3 animate-bounce-in" />
                        Payment Confirmed!
                        <p className="text-base text-gray-600 mt-2">Redirecting you to your dashboard shortly...</p>
                    </div>
                )}

                {paymentStatus === "failed" && (
                    <div className="flex flex-col items-center justify-center text-red-600 font-semibold text-xl py-4">
                        <XCircle className="h-16 w-16 mb-3 animate-shake" />
                        Payment Failed!
                        <p className="text-base text-gray-600 mt-2">Please try again or choose another method.</p>
                        <button
                            onClick={handleShowQR}
                            className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
                        >
                            Retry Payment
                        </button>
                    </div>
                )}

                {paymentStatus === "timeout" && (
                    <div className="flex flex-col items-center justify-center text-red-600 font-semibold text-xl py-4">
                        <Clock className="h-16 w-16 mb-3" />
                        Payment Timeout!
                        <p className="text-base text-gray-600 mt-2">The QR code expired.</p>
                        <button
                            onClick={handleShowQR}
                            className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
                        >
                            Try Again
                        </button>
                    </div>
                )}
            </div>

            {showQR && (
                <QRModal
                    account={account}
                    amount={amount}
                    onClose={handleCloseQR}
                    onConfirm={handlePaymentConfirmation}
                    timerData={{ seconds, formatTime, isActive }}
                    onCopy={handleCopyToClipboard}
                />
            )}

            {showRefModal && (
                <TransactionRefModal
                    onClose={handleRefModalClose}
                    onSubmit={handleTransactionRefSubmit}
                    isLoading={isConfirming}
                />
            )}
        </div>
    );
};

export default Payment;