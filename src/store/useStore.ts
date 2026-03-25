import { create } from 'zustand';

export type TrustLevel = 1 | 2 | 3 | 4 | 5;

export interface Member {
  id: string;
  displayName: string;
  country: string;
  chapter: string;
  trustLevel: TrustLevel;
  verificationMethod: 'worldcoin' | 'vouching' | 'basic' | 'anonymous';
  stealthMode: boolean;
  joinedAt: string;
  blockchainId?: string;
}

export interface Vote {
  id: string;
  type: 'POLICY_VOTE' | 'LEADER_ELECTION' | 'RECALL_REFERENDUM' | 'MONTHLY_REFERENDUM' | 'AMENDMENT_VOTE';
  title: string;
  description: string;
  scope: 'local' | 'national' | 'global';
  status: 'active' | 'closed' | 'pending';
  endTime: string;
  yesCount: number;
  noCount: number;
  totalVoters: number;
  hasVoted: boolean;
  chapter: string;
}

export interface Leader {
  id: string;
  name: string;
  position: string;
  chapter: string;
  approvalRating: number;
  approvalTrend: 'rising' | 'falling' | 'stable';
  promisesKept: number;
  promisesBroken: number;
  promisesPending: number;
  termEnd: string;
  activeRecalls: number;
  photo?: string;
}

export interface Notification {
  id: string;
  type: string;
  message: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW' | 'URGENT';
  read: boolean;
  createdAt: string;
}

interface AppStore {
  // Auth
  member: Member | null;
  token: string | null;
  setMember: (member: Member) => void;
  setToken: (token: string) => void;
  logout: () => void;

  // Data
  votes: Vote[];
  leaders: Leader[];
  notifications: Notification[];
  partyStats: {
    totalMembers: number;
    countries: number;
    votesToday: number;
    activeRecalls: number;
  };

  setVotes: (votes: Vote[]) => void;
  setLeaders: (leaders: Leader[]) => void;
  setNotifications: (notifications: Notification[]) => void;
  setPartyStats: (stats: AppStore['partyStats']) => void;
  markNotificationRead: (id: string) => void;

  // UI
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const useStore = create<AppStore>((set) => ({
  member: null,
  token: null,
  setMember: (member) => set({ member }),
  setToken: (token) => set({ token }),
  logout: () => set({ member: null, token: null }),

  votes: [],
  leaders: [],
  notifications: [],
  partyStats: {
    totalMembers: 0,
    countries: 0,
    votesToday: 0,
    activeRecalls: 0,
  },

  setVotes: (votes) => set({ votes }),
  setLeaders: (leaders) => set({ leaders }),
  setNotifications: (notifications) => set({ notifications }),
  setPartyStats: (partyStats) => set({ partyStats }),
  markNotificationRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    })),

  activeTab: 'Dashboard',
  setActiveTab: (activeTab) => set({ activeTab }),
}));
