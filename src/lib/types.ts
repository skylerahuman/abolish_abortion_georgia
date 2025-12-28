export type Chamber = 'house' | 'senate';
export type Party = 'R' | 'D' | 'I';
export type Stance = 'sponsor' | 'cosponsor' | 'supporter' | 'opposed' | 'undecided' | 'target';

export interface LeadershipRole {
    title: string; // e.g., "Speaker of the House", "Judiciary Non-Civil Chair"
    priority: number; // 1 = Gatekeeper, 2 = Committee, 3 = Ally
}

export interface Legislator {
    id: string; // distinct id, e.g., "H-001" or slug
    name: string;
    chamber: Chamber;
    district: string;
    party: Party;
    email?: string;
    phone?: string;
    office?: string;
    image?: string;
    
    // Dynamic/Advocacy fields
    stance: Stance;
    roles: LeadershipRole[];
    committees: string[]; // IDs of committees they sit on
}

export interface Committee {
    id: string;
    name: string;
    chamber: Chamber;
    chairId: string;
    viceChairId?: string;
    secretaryId?: string;
    memberIds: string[];
}

export interface AdvocacyTarget {
    legislator: Legislator;
    reason: string; // "Your Representative", "Speaker of the House", "Committee Member"
    callScriptCode: string; // e.g., "SCRIPT_SPEAKER", "SCRIPT_SPONSOR"
}
