
export interface Friend {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  status: string;
}

export interface WheelOption {
  id: string;
  label: string;
  color: string;
}

export type AppTab = 'wheel' | 'settings' | 'profile';
