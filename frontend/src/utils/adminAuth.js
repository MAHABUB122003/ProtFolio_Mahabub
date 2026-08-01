import { api } from './api';

const ADMIN_KEY = 'portfolio_admin_session';
const ATTEMPTS_KEY = 'portfolio_login_attempts';
const LOCKOUT_KEY = 'portfolio_lockout';
const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes
const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes

function getAttempts() {
    const data = localStorage.getItem(ATTEMPTS_KEY);
    if (!data) return { count: 0, timestamps: [] };
    return JSON.parse(data);
}

function recordAttempt() {
    const attempts = getAttempts();
    const now = Date.now();
    const recent = attempts.timestamps.filter(t => now - t < LOCKOUT_DURATION);
    recent.push(now);
    const newCount = recent.length;
    localStorage.setItem(ATTEMPTS_KEY, JSON.stringify({ count: newCount, timestamps: recent }));
    return newCount;
}

function clearAttempts() {
    localStorage.removeItem(ATTEMPTS_KEY);
    localStorage.removeItem(LOCKOUT_KEY);
}

function isLocked() {
    const lockout = localStorage.getItem(LOCKOUT_KEY);
    if (!lockout) return false;
    const lockTime = JSON.parse(lockout);
    if (Date.now() - lockTime > LOCKOUT_DURATION) {
        localStorage.removeItem(LOCKOUT_KEY);
        localStorage.removeItem(ATTEMPTS_KEY);
        return false;
    }
    return true;
}

function getRemainingLockTime() {
    const lockout = localStorage.getItem(LOCKOUT_KEY);
    if (!lockout) return 0;
    const lockTime = JSON.parse(lockout);
    const remaining = LOCKOUT_DURATION - (Date.now() - lockTime);
    return remaining > 0 ? remaining : 0;
}

function lockAccount() {
    localStorage.setItem(LOCKOUT_KEY, JSON.stringify(Date.now()));
}

export async function loginUser(email, password) {
    if (isLocked()) {
        const remaining = getRemainingLockTime();
        const mins = Math.ceil(remaining / 60000);
        return { success: false, error: `Account locked. Try again in ${mins} minute${mins > 1 ? 's' : ''}.`, locked: true, remaining };
    }

    if (!email || !password) {
        return { success: false, error: 'Email and password are required' };
    }

    const attempts = getAttempts();
    if (attempts.count >= MAX_ATTEMPTS) {
        lockAccount();
        const remaining = getRemainingLockTime();
        const mins = Math.ceil(remaining / 60000);
        return { success: false, error: `Too many failed attempts. Locked for ${mins} minute${mins > 1 ? 's' : ''}.`, locked: true, remaining };
    }

    try {
        const res = await api('/auth/login', { method: 'POST', body: { email, password } });
        clearAttempts();

        const session = {
            email: res.user.email,
            name: res.user.name,
            loggedInAt: new Date().toISOString(),
            expiresAt: Date.now() + SESSION_TIMEOUT,
            token: res.token
        };
        localStorage.setItem(ADMIN_KEY, JSON.stringify(session));
        return { success: true, user: session };
    } catch (err) {
        if (err.status === 401 || err.status === 400) {
            const count = recordAttempt();
            const remaining = MAX_ATTEMPTS - count;
            if (count >= MAX_ATTEMPTS) {
                lockAccount();
                const lockRemaining = getRemainingLockTime();
                const mins = Math.ceil(lockRemaining / 60000);
                return { success: false, error: `Account locked for ${mins} minute${mins > 1 ? 's' : ''} due to too many failed attempts.`, locked: true, remaining: lockRemaining };
            }
            return { success: false, error: `Invalid credentials. ${remaining} attempt${remaining !== 1 ? 's' : ''} remaining.` };
        }
        return { success: false, error: err.message || 'Cannot reach the server. Please try again.' };
    }
}

export function logoutUser() {
    localStorage.removeItem(ADMIN_KEY);
}

export function getCurrentUser() {
    const session = localStorage.getItem(ADMIN_KEY);
    if (!session) return null;
    const data = JSON.parse(session);
    if (Date.now() > data.expiresAt) {
        localStorage.removeItem(ADMIN_KEY);
        return null;
    }
    return data;
}

export function isAuthenticated() {
    return getCurrentUser() !== null;
}

export function getLoginAttempts() {
    if (isLocked()) {
        return { locked: true, remaining: getRemainingLockTime() };
    }
    const attempts = getAttempts();
    return { locked: false, attempts: attempts.count, remaining: MAX_ATTEMPTS - attempts.count };
}

export function refreshSession() {
    const user = getCurrentUser();
    if (!user) return null;
    user.expiresAt = Date.now() + SESSION_TIMEOUT;
    localStorage.setItem(ADMIN_KEY, JSON.stringify(user));
    return user;
}
