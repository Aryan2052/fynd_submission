import { motion } from "framer-motion";
import { useCartStore } from "../stores/useCartStore";
import { Link } from "react-router-dom";
import { MoveRight } from "lucide-react";
import { useState } from "react";

// import axios from "../lib/axios";

const OrderSummary = () => {
	const { total, subtotal, clearCart } = useCartStore();
	const [showModal, setShowModal] = useState(false);
	const [form, setForm] = useState({ name: "", address: "", phone: "" });
	const [error, setError] = useState("");
	const [success, setSuccess] = useState(false);

	const savings = subtotal - total;
	const formattedSubtotal = subtotal.toFixed(2);
	const formattedTotal = total.toFixed(2);
	const formattedSavings = savings.toFixed(2);

	const handleInput = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!form.name || !form.address || !form.phone) {
			setError("Please fill in all fields.");
			return;
		}
		setError("");
		setSuccess(true);
		clearCart();
	};

	return (
		<motion.div
			className='space-y-4 rounded-lg border border-gray-700 bg-gray-800 p-4 shadow-sm sm:p-6'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
		>
			<p className='text-xl font-semibold text-emerald-400'>Order summary</p>

			<div className='space-y-4'>
				<div className='space-y-2'>
					<dl className='flex items-center justify-between gap-4'>
						<dt className='text-base font-normal text-gray-300'>Original price</dt>
						<dd className='text-base font-medium text-white'>${formattedSubtotal}</dd>
					</dl>

					{savings > 0 && (
						<dl className='flex items-center justify-between gap-4'>
							<dt className='text-base font-normal text-gray-300'>Savings</dt>
							<dd className='text-base font-medium text-emerald-400'>-${formattedSavings}</dd>
						</dl>
					)}

					<dl className='flex items-center justify-between gap-4 border-t border-gray-600 pt-2'>
						<dt className='text-base font-bold text-white'>Total</dt>
						<dd className='text-base font-bold text-emerald-400'>${formattedTotal}</dd>
					</dl>
				</div>

				<motion.button
					className='flex w-full items-center justify-center rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-300'
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					onClick={() => setShowModal(true)}
				>
					Proceed to Checkout
				</motion.button>

				<div className='flex items-center justify-center gap-2'>
					<span className='text-sm font-normal text-gray-400'>or</span>
					<Link
						to='/'
						className='inline-flex items-center gap-2 text-sm font-medium text-emerald-400 underline hover:text-emerald-300 hover:no-underline'
					>
						Continue Shopping
						<MoveRight size={16} />
					</Link>
				</div>
			</div>

			{/* Simple Modal for Checkout */}
			{showModal && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
					<div className="bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-md">
						{success ? (
							<div className="text-center space-y-4">
								<p className="text-2xl font-bold text-emerald-400">Order placed successfully!</p>
								<p className="text-gray-300">Thank you for your purchase.</p>
								<button className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700" onClick={() => setShowModal(false)}>
									Close
								</button>
							</div>
						) : (
							<form onSubmit={handleSubmit} className="space-y-4">
								<h2 className="text-xl font-semibold text-white mb-2">Enter your details</h2>
								<input
									type="text"
									name="name"
									placeholder="Name"
									value={form.name}
									onChange={handleInput}
									className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none"
								/>
								<input
									type="text"
									name="address"
									placeholder="Address"
									value={form.address}
									onChange={handleInput}
									className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none"
								/>
								<input
									type="text"
									name="phone"
									placeholder="Phone Number"
									value={form.phone}
									onChange={handleInput}
									className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none"
								/>
								{error && <p className="text-red-400 text-sm">{error}</p>}
								<div className="flex gap-2 justify-end">
									<button type="button" className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600" onClick={() => setShowModal(false)}>
										Cancel
									</button>
									<button type="submit" className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700">
										Place Order
									</button>
								</div>
							</form>
						)}
					</div>
				</div>
			)}
		</motion.div>
	);
};
export default OrderSummary;