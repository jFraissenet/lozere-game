export type team = {
  id: string;
  created_at?: string; // Present en base mais pas utilise, donc petit ?
  name: string;
  code?: string | null;
  unlocked: boolean | null;
  index: number | null;
};

export type param = {
  description: string | null;
  id: string;
  start_at: string | null;
  title: string | null;
};

export type gamers = {
  icon: string;
  usr_id: number;
  name: string;
  team_id: string;
};

export type defis = {
  description: string;
  id: string;
  title: string;
  used: number;
};

export type indice = {
  disable: boolean;
  id: string;
  indice_description: string;
  odr: number;
  team_mission_id: string;
  temp: string | null;
  unlocked: boolean;
};

export type missionsTeam = {
  id: string; // Mission id
  resolved: boolean;
  unlocked_at: string;
};

export type mission = {
  blocked_at: string | null;
  code?: string;
  description?: string | null;
  estimated_time?: number | null;
  id: string;
  resolved: boolean;
  solved_at: string | null;
  title: string;
  try: number;
  unlocked_at: string | null;
};

export type team_mission = {
  id: string;
  mission_id: string;
  order: number;
  team_id: string;
  temp: string | null;
  mission: mission;
  try: number;
};

export type team_mission_indice = {
  disable: boolean;
  id: string;
  indice_description: string;
  odr: number;
  team_mission_id: string;
  temp: string | null;
  unlocked: boolean;
};

export type team_mission_indice_defis = {
  active: boolean;
  defis_id: string;
  id: string;
  team_defied_id: string;
  team_mission_indice_id: string;
  temp: string | null;
  try: number;
  won: boolean | null;
};

export type indicesDefis = {
  team_mission_id: string;
  tmi_id: string;
  tmi_ord: number;
  tmi_unlocked: boolean;
  tmi_desc: string;
  tmi_disable: boolean;
  tmi_running: boolean;
  dfs: defis[];
  t_against: team[];
  inds_dfs: team_mission_indice_defis[];
};
