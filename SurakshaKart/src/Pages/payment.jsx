import React, { useState, useEffect, useRef } from "react";
import QRCode from "react-qr-code";
import { X, Copy, CheckCircle, Clock, XCircle } from "lucide-react"; // Import more icons
import { useNavigate, useLocation } from "react-router-dom"; // Import useLocation

// --- Custom Hook for Timer (Abstraction) ---
const useTimer = (initialSeconds, onTimerEnd) => {
    const [seconds, setSeconds] = useState(initialSeconds);
    const timerRef = useRef(null);
    const [isActive, setIsActive] = useState(false);

    const startTimer = () => {
        setSeconds(initialSeconds);
        setIsActive(true);
    };

    const stopTimer = () => {
        clearInterval(timerRef.current);
        setIsActive(false);
    };

    useEffect(() => {
        if (isActive) {
            timerRef.current = setInterval(() => {
                setSeconds((prev) => {
                    if (prev <= 1) {
                        clearInterval(timerRef.current);
                        setIsActive(false);
                        onTimerEnd && onTimerEnd(); // Call callback when timer ends
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        } else {
            clearInterval(timerRef.current);
        }

        return () => clearInterval(timerRef.current);
    }, [isActive, initialSeconds, onTimerEnd]);

    const formatTime = () => {
        const m = String(Math.floor(seconds / 60)).padStart(2, "0");
        const s = String(seconds % 60).padStart(2, "0");
        return `${m}:${s}`;
    };

    return { seconds, formatTime, startTimer, stopTimer, isActive };
};

// --- Dummy Account Data ---
const dummyAccount = {
    accountHolder: "John Doe",
    ifscCode: "SBIN0001234",
    receiverServiceAccount: "1234567890",
};

// --- QR Code Modal Component ---
const QRModal = ({ account, amount, onClose, onConfirm, timerData, onCopy }) => {
    const { formatTime, seconds, isActive } = timerData;
    const qrValue = {
        receiverServiceAccount: account.receiverServiceAccount,
        url: `http://localhost:5174/transfer/${account.receiverServiceAccount}?amount=${amount}`, // Include amount in QR data
        gateway: "LinkSuraksha",
        amount: amount, // Explicitly add amount for clarity in QR data
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
                                    onClick={onClose} // Or a refresh QR function
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
                        disabled={!isActive} // Disable if QR expired
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
    const location = useLocation();
    const navigate = useNavigate();
    const amount = location.state?.amount || 0; // Get amount from location state

    const [showQR, setShowQR] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState("pending"); // 'pending', 'confirmed', 'failed', 'timeout'
    const [account] = useState(dummyAccount);

    // Timer hook for QR code validity
    const { seconds, formatTime, startTimer, stopTimer, isActive } = useTimer(
        600, // 10 minutes
        () => {
            // Callback when timer ends
            if (paymentStatus === "pending") {
                setPaymentStatus("timeout");
                setShowQR(false); // Close QR modal on timeout
            }
        }
    );

    useEffect(() => {
        if (showQR) {
            startTimer(); // Start timer when QR is shown
        } else {
            stopTimer(); // Stop timer when QR is hidden
        }
    }, [showQR, startTimer, stopTimer]); // Depend on showQR and timer control functions

    const handleShowQR = () => {
        setPaymentStatus("pending"); // Reset status when showing QR
        setShowQR(true);
    };

    const handleCloseQR = () => {
        setShowQR(false);
        stopTimer(); // Ensure timer stops if modal is closed manually
        if (paymentStatus === "pending") {
            setPaymentStatus("cancelled"); // Indicate that the payment was cancelled by user
        }
    };

    const handlePaymentConfirmation = async () => {
        setPaymentStatus("processing"); // Show processing state
        stopTimer(); // Stop the timer immediately upon confirmation attempt

        try {
            // Simulate API call for payment confirmation
            // Replace with actual API call to your backend
            await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate network delay

            const success = Math.random() > 0.1; // 90% chance of success for demonstration

            if (success) {
                setPaymentStatus("confirmed");
                setShowQR(false);
                // In a real app, you'd verify payment on backend, then redirect
                setTimeout(() => {
                    navigate("/dashboard", { state: { paymentSuccess: true, amount } });
                }, 1500); // Redirect after short delay
            } else {
                setPaymentStatus("failed");
                setShowQR(false);
                // Optionally show an error message
                // setTimeout(() => setPaymentStatus("pending"), 3000); // Allow retry after 3 seconds
            }
        } catch (error) {
            console.error("Payment confirmation error:", error);
            setPaymentStatus("failed");
            setShowQR(false);
        }
    };

    const handleCopyToClipboard = (text) => {
        navigator.clipboard.writeText(text)
            .then(() => alert("Copied to clipboard!"))
            .catch((err) => console.error("Failed to copy:", err));
    };

    if (amount <= 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 text-red-700 p-4">
                <XCircle className="h-16 w-16 mb-4" />
                <h1 className="text-2xl font-bold mb-2">Invalid Payment Amount</h1>
                <p className="text-lg text-center mb-6">
                    It looks like there's no amount specified for this payment. Please go back to the cart or product page.
                </p>
                <button
                    onClick={() => navigate('/cart')}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition font-semibold"
                >
                    Go to Cart
                </button>
            </div>
        );
    }

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
                        <p className="text-base text-gray-600 mt-2">The QR code expired. Please try again.</p>
                        <button
                            onClick={handleShowQR}
                            className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
                        >
                            Generate New QR
                        </button>
                    </div>
                )}

                {paymentStatus === "cancelled" && (
                    <div className="flex flex-col items-center justify-center text-orange-600 font-semibold text-xl py-4">
                        <XCircle className="h-16 w-16 mb-3" />
                        Payment Cancelled
                        <p className="text-base text-gray-600 mt-2">You closed the payment window.</p>
                        <button
                            onClick={handleShowQR}
                            className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
                        >
                            Try Payment Again
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
        </div>
    );
};

export default Payment;