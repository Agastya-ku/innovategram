'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Innovation, ConnectionRequest, VerificationStatus, Sector, Stage } from '@/types/innovategram';
import { initialInnovations, mockConnectionRequests } from '@/data/mockInnovations';

interface InnovationsContextType {
  innovations: Innovation[];
  savedIds: string[];
  connectionRequests: ConnectionRequest[];
  isOnline: boolean;
  offlineDraftsCount: number;
  addInnovation: (innovation: Omit<Innovation, 'id' | 'submissionDate'>) => Promise<Innovation>;
  updateInnovationStatus: (id: string, status: VerificationStatus, notes?: string, reviewer?: string) => void;
  updateInnovationAI: (id: string, updates: Partial<Innovation>) => void;
  toggleSave: (id: string) => void;
  addConnectionRequest: (req: Omit<ConnectionRequest, 'id' | 'createdAt' | 'status'>) => void;
  getInnovationById: (id: string) => Innovation | undefined;
  syncOfflineDrafts: () => void;
}

const InnovationsContext = createContext<InnovationsContextType | undefined>(undefined);

export const InnovationsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [innovations, setInnovations] = useState<Innovation[]>(initialInnovations);
  const [savedIds, setSavedIds] = useState<string[]>(['IG-2026-001001', 'IG-2026-001005']);
  const [connectionRequests, setConnectionRequests] = useState<ConnectionRequest[]>(mockConnectionRequests);
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [offlineDrafts, setOfflineDrafts] = useState<any[]>([]);

  useEffect(() => {
    // Network listeners
    if (typeof window !== 'undefined') {
      setIsOnline(navigator.onLine);
      const handleOnline = () => setIsOnline(true);
      const handleOffline = () => setIsOnline(false);
      window.addEventListener('online', handleOnline);
      window.addEventListener('offline', handleOffline);

      // Load stored innovations from localStorage
      const stored = localStorage.getItem('innovategram_custom_innovations');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setInnovations([...parsed, ...initialInnovations]);
        } catch (e) {
          console.error('Error loading stored innovations', e);
        }
      }

      // Load saved IDs
      const storedSaved = localStorage.getItem('innovategram_saved');
      if (storedSaved) {
        try {
          setSavedIds(JSON.parse(storedSaved));
        } catch (e) {}
      }

      // Load offline drafts
      const storedDrafts = localStorage.getItem('innovategram_offline_drafts');
      if (storedDrafts) {
        try {
          setOfflineDrafts(JSON.parse(storedDrafts));
        } catch (e) {}
      }

      return () => {
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
      };
    }
  }, []);

  const addInnovation = async (item: Omit<Innovation, 'id' | 'submissionDate'>): Promise<Innovation> => {
    const newId = `IG-2026-00${1025 + Math.floor(Math.random() * 9000)}`;
    const today = new Date().toISOString().split('T')[0];

    const newRecord: Innovation = {
      ...item,
      id: newId,
      submissionDate: today,
    };

    if (!isOnline) {
      // Save offline draft
      const updatedDrafts = [...offlineDrafts, newRecord];
      setOfflineDrafts(updatedDrafts);
      localStorage.setItem('innovategram_offline_drafts', JSON.stringify(updatedDrafts));
      return newRecord;
    }

    const updated = [newRecord, ...innovations];
    setInnovations(updated);

    // Persist custom creations in localStorage
    if (typeof window !== 'undefined') {
      const customOnes = updated.filter(inv => !initialInnovations.some(init => init.id === inv.id));
      localStorage.setItem('innovategram_custom_innovations', JSON.stringify(customOnes));
    }

    return newRecord;
  };

  const syncOfflineDrafts = () => {
    if (offlineDrafts.length === 0) return;
    const updated = [...offlineDrafts, ...innovations];
    setInnovations(updated);
    setOfflineDrafts([]);
    localStorage.removeItem('innovategram_offline_drafts');
    const customOnes = updated.filter(inv => !initialInnovations.some(init => init.id === inv.id));
    localStorage.setItem('innovategram_custom_innovations', JSON.stringify(customOnes));
  };

  const updateInnovationStatus = (id: string, status: VerificationStatus, notes?: string, reviewer?: string) => {
    setInnovations(prev =>
      prev.map(item => {
        if (item.id === id) {
          return {
            ...item,
            status,
            verificationNotes: notes || item.verificationNotes,
            reviewedBy: reviewer || 'Institutional Review Board',
            reviewedAt: new Date().toISOString().split('T')[0]
          };
        }
        return item;
      })
    );
  };

  const updateInnovationAI = (id: string, updates: Partial<Innovation>) => {
    setInnovations(prev =>
      prev.map(item => {
        if (item.id === id) {
          return { ...item, ...updates };
        }
        return item;
      })
    );
  };

  const toggleSave = (id: string) => {
    setSavedIds(prev => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      if (typeof window !== 'undefined') {
        localStorage.setItem('innovategram_saved', JSON.stringify(next));
      }
      return next;
    });
  };

  const addConnectionRequest = (req: Omit<ConnectionRequest, 'id' | 'createdAt' | 'status'>) => {
    const newReq: ConnectionRequest = {
      ...req,
      id: `CR-2026-00${45 + connectionRequests.length}`,
      status: 'Pending Innovator Consent',
      createdAt: new Date().toISOString().split('T')[0]
    };
    setConnectionRequests(prev => [newReq, ...prev]);
  };

  const getInnovationById = (id: string) => {
    return innovations.find(item => item.id.toLowerCase() === id.toLowerCase());
  };

  return (
    <InnovationsContext.Provider
      value={{
        innovations,
        savedIds,
        connectionRequests,
        isOnline,
        offlineDraftsCount: offlineDrafts.length,
        addInnovation,
        updateInnovationStatus,
        updateInnovationAI,
        toggleSave,
        addConnectionRequest,
        getInnovationById,
        syncOfflineDrafts
      }}
    >
      {children}
    </InnovationsContext.Provider>
  );
};

export const useInnovations = () => {
  const context = useContext(InnovationsContext);
  if (!context) {
    throw new Error('useInnovations must be used within an InnovationsProvider');
  }
  return context;
};

