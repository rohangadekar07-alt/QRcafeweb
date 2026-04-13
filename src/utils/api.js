// src/utils/api.js
const API_URL = "http://localhost:5000/api";

const getToken = () => {
    if (typeof window !== "undefined") {
        return localStorage.getItem("token") || "";
    }
    return "";
};

const getHeaders = (hasBody = true) => {
    const headers = {};
    if (hasBody) headers["Content-Type"] = "application/json";
    const token = getToken();
    if (token) headers["Authorization"] = `Bearer ${token}`;
    return headers;
};

export const loginUser = async (email, password) => {
    const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to login");
    return data;
};

export const fetchMenu = async () => {
    const res = await fetch(`${API_URL}/menu`, { method: "GET" });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch menu");
    return data;
};

// Admin Menu Management
export const addMenuItem = async (item) => {
    const res = await fetch(`${API_URL}/menu`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(item)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    return data;
};

export const updateMenuItem = async (id, item) => {
    const res = await fetch(`${API_URL}/menu/${id}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(item)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    return data;
};

export const deleteMenuItem = async (id) => {
    const res = await fetch(`${API_URL}/menu/${id}`, {
        method: "DELETE",
        headers: getHeaders(false),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    return data;
};

export const placeOrder = async (tableId, items, totalAmount, paymentStatus = "paid") => {
    const res = await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({ tableId, items, totalAmount, paymentStatus })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    return data;
};

export const getOrders = async () => {
    const res = await fetch(`${API_URL}/orders`, {
        method: "GET",
        headers: getHeaders(false)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    return data;
};

export const updateOrderStatus = async (id, status) => {
    const res = await fetch(`${API_URL}/orders/${id}/status`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify({ status })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    return data;
};

export const getTables = async () => {
    const res = await fetch(`${API_URL}/tables`, {
        method: "GET",
        headers: getHeaders(false)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    return data;
};

export const generateTables = async () => {
    const res = await fetch(`${API_URL}/tables`, {
        method: "POST",
        headers: getHeaders(false),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    return data;
};

// Payment Integration
export const createPaymentOrder = async (amount) => {
    const res = await fetch(`${API_URL}/payments/create`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({ amount })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    return data;
};

export const verifyPayment = async (paymentData) => {
    const res = await fetch(`${API_URL}/payments/verify`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(paymentData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    return data;
};

// ─── Reservations ───────────────────────────────────────────────────────────

export const createReservation = async (payload) => {
    const res = await fetch(`${API_URL}/reservations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok) throw Object.assign(new Error(data.message), { conflict: data.conflict });
    return data;
};

export const getAllReservations = async () => {
    const res = await fetch(`${API_URL}/reservations`, {
        method: "GET",
        headers: getHeaders(false)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    return data;
};

export const cancelReservation = async (id) => {
    const res = await fetch(`${API_URL}/reservations/${id}/cancel`, {
        method: "PUT",
        headers: getHeaders(false)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    return data;
};

export const checkSlotAvailability = async (tableNumber, date, time) => {
    const params = new URLSearchParams({ tableNumber, date, time });
    const res = await fetch(`${API_URL}/reservations/check?${params}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    return data; // { available: true | false }
};

