'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Innovation, ConnectionRequest, VerificationStatus, InnovatorProfile } from '@/types/innovategram';
import { initialInnovations, mockConnectionRequests, mockInnovatorProfiles } from '@/data/mockInnovations';

interface InnovationsContextType {
  innovations: Innovation[];
  savedIds: string[];
  connectionRequests: ConnectionRequest[];
  isOnline: boolean;
  offlineDraftsCount: number;
  profiles: InnovatorProfile[];
  currentProfile: InnovatorProfile | null;
  addProfile: (profile: Omit<InnovatorProfile, 'id' | 'createdAt' | 'innovationIds'>) => InnovatorProfile;
  setCurrentProfile: (profile: InnovatorProfile | null) => void;
  updateProfile: (id: string, updates: Partial<InnovatorProfile>) => void;
  loginWithPhone: (phone: string) => InnovatorProfile | null;
  getInnovationsByProfile: (profile: InnovatorProfile) => Innovation[];
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
  const [savedIds, setSavedIds] = useState<string[]>(['KHJ-2026-001001', 'KHJ-2026-001005']);
  const [connectionRequests, setConnectionRequests] = useState<ConnectionRequest[]>(mockConnectionRequests);
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [offlineDrafts, setOfflineDrafts] = useState<any[]>([]);
  const [profiles, setProfiles] = useState<InnovatorProfile[]>(mockInnovatorProfiles);
  const [currentProfile, setCurrentProfileState] = useState<InnovatorProfile | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsOnline(navigator.onLine);
      const handleOnline = () => setIsOnline(true);
      const handleOffline = () => setIsOnline(false);
      window.addEventListener('online', handleOnline);
      window.addEventListener('offline', handleOffline);

      // Load stored profiles
      const storedProfiles = localStorage.getItem('khoj_profiles');
      if (storedProfiles) {
        try {
          const parsed = JSON.parse(storedProfiles);
          setProfiles([...parsed, ...mockInnovatorProfiles]);
        } catch (e) {
          console.error('Error loading stored profiles', e);
        }
      }

      // Load current logged in profile
      const storedCurrentProfileId = localStorage.getItem('khoj_current_profile_id');
      if (storedCurrentProfileId) {
        const found = [...(storedProfiles ? JSON.parse(storedProfiles) : []), ...mockInnovatorProfiles].find(
          (p: InnovatorProfile) => p.id === storedCurrentProfileId
        );
        if (found) {
          setCurrentProfileState(found);
        }
      }

      // Load stored innovations from localStorage
      const stored = localStorage.getItem('khoj_custom_innovations') || localStorage.getItem('innovategram_custom_innovations');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setInnovations([...parsed, ...initialInnovations]);
        } catch (e) {
          console.error('Error loading stored innovations', e);
        }
      }

      // Load saved IDs
      const storedSaved = localStorage.getItem('khoj_saved') || localStorage.getItem('innovategram_saved');
      if (storedSaved) {
        try {
          setSavedIds(JSON.parse(storedSaved));
        } catch (e) {}
      }

      // Load offline drafts
      const storedDrafts = localStorage.getItem('khoj_offline_drafts') || localStorage.getItem('innovategram_offline_drafts');
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

  const setCurrentProfile = (profile: InnovatorProfile | null) => {
    setCurrentProfileState(profile);
    if (typeof window !== 'undefined') {
      if (profile) {
        localStorage.setItem('khoj_current_profile_id', profile.id);
      } else {
        localStorage.removeItem('khoj_current_profile_id');
      }
    }
  };

  const addProfile = (profileData: Omit<InnovatorProfile, 'id' | 'createdAt' | 'innovationIds'>): InnovatorProfile => {
    const newId = `KHJ-USR-00${1000 + profiles.length + 1}`;
    const today = new Date().toISOString().split('T')[0];

    const newProfile: InnovatorProfile = {
      ...profileData,
      id: newId,
      createdAt: today,
      innovationIds: []
    };

    const updated = [newProfile, ...profiles];
    setProfiles(updated);
    setCurrentProfile(newProfile);

    if (typeof window !== 'undefined') {
      const customOnes = updated.filter(p => !mockInnovatorProfiles.some(m => m.id === p.id));
      localStorage.setItem('khoj_profiles', JSON.stringify(customOnes));
    }

    return newProfile;
  };

  const updateProfile = (id: string, updates: Partial<InnovatorProfile>) => {
    setProfiles(prev => {
      const updated = prev.map(p => (p.id === id ? { ...p, ...updates } : p));
      if (typeof window !== 'undefined') {
        const customOnes = updated.filter(p => !mockInnovatorProfiles.some(m => m.id === p.id));
        localStorage.setItem('khoj_profiles', JSON.stringify(customOnes));
      }
      return updated;
    });

    if (currentProfile && currentProfile.id === id) {
      setCurrentProfileState(prev => (prev ? { ...prev, ...updates } : null));
    }
  };

  const loginWithPhone = (phoneInput: string): InnovatorProfile | null => {
    const cleanDigits = phoneInput.replace(/\D/g, '');
    const found = profiles.find(p => {
      const pClean = p.phone.replace(/\D/g, '');
      return pClean.endsWith(cleanDigits) || cleanDigits.endsWith(pClean);
    });

    if (found) {
      setCurrentProfile(found);
      return found;
    }
    return null;
  };

  const getInnovationsByProfile = (profile: InnovatorProfile): Innovation[] => {
    return innovations.filter(
      item =>
        (item.profileId && item.profileId === profile.id) ||
        (profile.innovationIds && profile.innovationIds.includes(item.id)) ||
        (item.innovatorName && item.innovatorName.toLowerCase().trim() === profile.fullName.toLowerCase().trim()) ||
        (profile.phone && item.innovatorPhone && item.innovatorPhone.replace(/\D/g, '') === profile.phone.replace(/\D/g, ''))
    );
  };

  const addInnovation = async (item: Omit<Innovation, 'id' | 'submissionDate'>): Promise<Innovation> => {
    const newId = `KHJ-2026-00${1025 + Math.floor(Math.random() * 9000)}`;
    const today = new Date().toISOString().split('T')[0];

    const newRecord: Innovation = {
      ...item,
      id: newId,
      submissionDate: today,
      profileId: item.profileId || currentProfile?.id
    };

    if (currentProfile) {
      // Link to current user profile
      updateProfile(currentProfile.id, {
        innovationIds: [...(currentProfile.innovationIds || []), newId]
      });
    }

    if (!isOnline) {
      const updatedDrafts = [...offlineDrafts, newRecord];
      setOfflineDrafts(updatedDrafts);
      localStorage.setItem('khoj_offline_drafts', JSON.stringify(updatedDrafts));
      return newRecord;
    }

    const updated = [newRecord, ...innovations];
    setInnovations(updated);

    if (typeof window !== 'undefined') {
      const customOnes = updated.filter(inv => !initialInnovations.some(init => init.id === inv.id));
      localStorage.setItem('khoj_custom_innovations', JSON.stringify(customOnes));
    }

    return newRecord;
  };

  const syncOfflineDrafts = () => {
    if (offlineDrafts.length === 0) return;
    const updated = [...offlineDrafts, ...innovations];
    setInnovations(updated);
    setOfflineDrafts([]);
    localStorage.removeItem('khoj_offline_drafts');
    const customOnes = updated.filter(inv => !initialInnovations.some(init => init.id === inv.id));
    localStorage.setItem('khoj_custom_innovations', JSON.stringify(customOnes));
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
        localStorage.setItem('khoj_saved', JSON.stringify(next));
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
        profiles,
        currentProfile,
        addProfile,
        setCurrentProfile,
        updateProfile,
        loginWithPhone,
        getInnovationsByProfile,
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
