import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaSave, FaPlus, FaTimes, FaCog, FaDownload, FaUpload, FaTrash, FaLink, FaFileAlt } from 'react-icons/fa';
import { getSection, updateSection, resetAllData, exportData, importData } from '../../utils/portfolioData';

function AdminGeneral() {
    const [data, setData] = useState(null);
    const [saved, setSaved] = useState(false);
    const [importJson, setImportJson] = useState('');
    const [confirmReset, setConfirmReset] = useState(false);

    useEffect(() => { setData(getSection('general')); }, []);

    if (!data) return null;

    const handleSave = () => { updateSection('general', data); setSaved(true); setTimeout(() => setSaved(false), 2000); };

    const handleExport = () => {
        const json = exportData();
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'portfolio-backup.json';
        a.click();
        URL.revokeObjectURL(url);
    };

    const handleImport = () => {
        if (!importJson.trim()) return;
        const result = importData(importJson);
        if (result.success) {
            window.location.reload();
        } else {
            alert('Invalid JSON data');
        }
    };

    const handleReset = () => {
        if (confirmReset) {
            resetAllData();
            window.location.reload();
        } else {
            setConfirmReset(true);
            setTimeout(() => setConfirmReset(false), 5000);
        }
    };

    const handleFooterChange = (field, value) => {
        const footer = getSection('footer');
        updateSection('footer', { ...footer, [field]: value });
    };

    const inputClass = "w-full px-4 py-2.5 rounded-lg bg-gray-700/50 border border-gray-600 text-white text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all";

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white flex items-center gap-2"><FaCog className="text-orange-400" /> General Settings</h2>
                <motion.button onClick={handleSave} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    className={`px-5 py-2 rounded-lg font-medium text-sm flex items-center gap-2 ${saved ? 'bg-green-500/20 text-green-400' : 'bg-gradient-to-r from-orange-500 to-purple-500 text-white'}`}>
                    <FaSave /> {saved ? 'Saved!' : 'Save Changes'}
                </motion.button>
            </div>

            {/* SEO Settings */}
            <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6 space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2"><FaFileAlt className="text-orange-400 text-xs" /> SEO & Meta</h3>
                <div>
                    <label className="block text-[10px] text-gray-500 mb-1">Site Title</label>
                    <input value={data.siteTitle} onChange={(e) => setData({ ...data, siteTitle: e.target.value })} className={inputClass} />
                </div>
                <div>
                    <label className="block text-[10px] text-gray-500 mb-1">Meta Description</label>
                    <textarea value={data.metaDescription} onChange={(e) => setData({ ...data, metaDescription: e.target.value })} rows="2" className={`${inputClass} resize-none`} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-[10px] text-gray-500 mb-1">Theme Color</label>
                        <div className="flex gap-2">
                            <input type="color" value={data.themeColor} onChange={(e) => setData({ ...data, themeColor: e.target.value })} className="w-10 h-10 rounded cursor-pointer" />
                            <input value={data.themeColor} onChange={(e) => setData({ ...data, themeColor: e.target.value })} className={inputClass} />
                        </div>
                    </div>
                    <div>
                        <label className="block text-[10px] text-gray-500 mb-1">Default Dark Mode</label>
                        <button onClick={() => setData({ ...data, defaultDarkMode: !data.defaultDarkMode })}
                            className={`w-12 h-6 rounded-full transition-all mt-2 ${data.defaultDarkMode ? 'bg-orange-500' : 'bg-gray-600'}`}>
                            <div className={`w-5 h-5 rounded-full bg-white transition-transform ${data.defaultDarkMode ? 'translate-x-6' : 'translate-x-0.5'}`} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Footer Settings */}
            <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6 space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2"><FaLink className="text-orange-400 text-xs" /> Footer</h3>
                <div>
                    <label className="block text-[10px] text-gray-500 mb-1">Tagline</label>
                    <input defaultValue={getSection('footer').tagline} onBlur={(e) => handleFooterChange('tagline', e.target.value)} className={inputClass} />
                </div>
                <div>
                    <label className="block text-[10px] text-gray-500 mb-1">Description</label>
                    <textarea defaultValue={getSection('footer').description} onBlur={(e) => handleFooterChange('description', e.target.value)} rows="2" className={`${inputClass} resize-none`} />
                </div>
                <div>
                    <label className="block text-[10px] text-gray-500 mb-1">Copyright Name</label>
                    <input defaultValue={getSection('footer').copyright} onBlur={(e) => handleFooterChange('copyright', e.target.value)} className={inputClass} />
                </div>
            </div>

            {/* Data Management */}
            <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6 space-y-4">
                <h3 className="text-sm font-bold text-white">Data Management</h3>

                {/* Export */}
                <div className="flex items-center gap-3">
                    <motion.button onClick={handleExport} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                        className="px-4 py-2.5 bg-blue-500/20 text-blue-400 rounded-lg text-sm flex items-center gap-2 hover:bg-blue-500/30 transition-all">
                        <FaDownload /> Export All Data (JSON)
                    </motion.button>
                </div>

                {/* Import */}
                <div>
                    <label className="block text-[10px] text-gray-500 mb-1">Import Data (paste JSON)</label>
                    <textarea value={importJson} onChange={(e) => setImportJson(e.target.value)} rows="3" className={`${inputClass} resize-none font-mono text-xs`} placeholder='Paste portfolio JSON here...' />
                    <motion.button onClick={handleImport} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                        className="mt-2 px-4 py-2 bg-green-500/20 text-green-400 rounded-lg text-sm flex items-center gap-2 hover:bg-green-500/30 transition-all">
                        <FaUpload /> Import Data
                    </motion.button>
                </div>

                {/* Reset */}
                <div className="pt-3 border-t border-gray-700/50">
                    <motion.button onClick={handleReset} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                        className={`px-4 py-2.5 rounded-lg text-sm flex items-center gap-2 transition-all ${
                            confirmReset ? 'bg-red-500 text-white' : 'bg-red-500/10 text-red-400 hover:bg-red-500/20'
                        }`}>
                        <FaTrash /> {confirmReset ? 'Click again to confirm reset' : 'Reset All Data to Default'}
                    </motion.button>
                    {confirmReset && <p className="text-red-400/60 text-xs mt-1">This will reset all portfolio data. Click again to confirm.</p>}
                </div>
            </div>
        </motion.div>
    );
}

export default AdminGeneral;
