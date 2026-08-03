import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FaInbox, FaTrash, FaEnvelopeOpen, FaEnvelope, FaSyncAlt, FaUser, FaClock, FaTag } from 'react-icons/fa';
import { api } from '../../utils/api';

function AdminMessages() {
    const [messages, setMessages] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadMessages = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await api('/messages', { auth: true });
            setMessages(res.messages || []);
        } catch (e) {
            setError(e.message || 'Failed to load messages');
            setMessages([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { loadMessages(); }, [loadMessages]);

    const markRead = async (id) => {
        try {
            await api(`/messages/${id}/read`, { method: 'PATCH', auth: true });
            setMessages(prev => prev.map(m => m.id === id ? { ...m, read: true } : m));
        } catch (e) {
            alert('Failed to mark as read: ' + e.message);
        }
    };

    const remove = async (id) => {
        if (!window.confirm('Delete this message?')) return;
        try {
            await api(`/messages/${id}`, { method: 'DELETE', auth: true });
            setMessages(prev => prev.filter(m => m.id !== id));
        } catch (e) {
            alert('Failed to delete: ' + e.message);
        }
    };

    const unreadCount = messages ? messages.filter(m => !m.read).length : 0;

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <FaInbox className="text-orange-400" /> Messages
                    {unreadCount > 0 && (
                        <span className="px-2 py-0.5 bg-orange-500/20 text-orange-400 text-xs rounded-full font-medium">
                            {unreadCount} unread
                        </span>
                    )}
                </h2>
                <motion.button
                    onClick={loadMessages}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-4 py-2 bg-gray-700/50 border border-gray-600 text-white rounded-lg font-medium text-sm flex items-center gap-2 hover:bg-gray-700 transition-all"
                >
                    <FaSyncAlt className={`text-xs ${loading ? 'animate-spin' : ''}`} /> Refresh
                </motion.button>
            </div>

            {error && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                    {error}
                </div>
            )}

            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-700/50 flex items-center justify-between">
                    <h3 className="text-lg font-bold text-white">Inbox ({messages ? messages.length : 0})</h3>
                    <span className="text-xs text-gray-400">Contact form submissions</span>
                </div>

                {loading ? (
                    <div className="p-10 text-center text-gray-400 text-sm">Loading messages...</div>
                ) : !messages || messages.length === 0 ? (
                    <div className="p-12 text-center">
                        <FaInbox className="text-4xl text-gray-600 mx-auto mb-3" />
                        <p className="text-gray-400 text-sm">No messages yet. New form submissions will appear here.</p>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-700/50">
                        {messages.map((msg, idx) => (
                            <motion.div
                                key={msg.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className={`px-6 py-5 hover:bg-gray-700/20 transition-colors ${!msg.read ? 'bg-orange-500/5' : ''}`}
                            >
                                <div className="flex items-start gap-4">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${msg.read ? 'bg-gray-700 text-gray-400' : 'bg-orange-500/20 text-orange-400'}`}>
                                        {msg.read ? <FaEnvelopeOpen className="text-sm" /> : <FaEnvelope className="text-sm" />}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex flex-wrap items-center gap-2 mb-1">
                                            <h4 className="text-white font-semibold text-sm flex items-center gap-1.5">
                                                <FaUser className="text-orange-400 text-xs" />
                                                {msg.name}
                                            </h4>
                                            {!msg.read && (
                                                <span className="px-2 py-0.5 bg-orange-500/20 text-orange-400 text-[10px] rounded-full font-medium">New</span>
                                            )}
                                            <a href={`mailto:${msg.email}`} className="text-gray-400 text-xs hover:text-orange-400 transition-colors">
                                                {msg.email}
                                            </a>
                                        </div>

                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="px-2 py-0.5 bg-purple-500/20 text-purple-400 text-[10px] rounded font-medium flex items-center gap-1">
                                                <FaTag className="text-[9px]" /> {msg.title || 'General Inquiry'}
                                            </span>
                                            <span className="text-gray-500 text-xs flex items-center gap-1">
                                                <FaClock className="text-[10px]" /> {new Date(msg.createdAt).toLocaleString()}
                                            </span>
                                        </div>

                                        <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                                    </div>

                                    <div className="flex items-center gap-2 flex-shrink-0">
                                        {!msg.read && (
                                            <button
                                                onClick={() => markRead(msg.id)}
                                                className="w-8 h-8 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 flex items-center justify-center transition-all"
                                                title="Mark as read"
                                            >
                                                <FaEnvelopeOpen className="text-xs" />
                                            </button>
                                        )}
                                        <button
                                            onClick={() => remove(msg.id)}
                                            className="w-8 h-8 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 flex items-center justify-center transition-all"
                                            title="Delete"
                                        >
                                            <FaTrash className="text-xs" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </motion.div>
    );
}

export default AdminMessages;
