export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      defis: {
        Row: {
          description: string;
          id: string;
          title: string | null;
          used: number | null;
        };
        Insert: {
          description?: string;
          id?: string;
          title?: string | null;
          used?: number | null;
        };
        Update: {
          description?: string;
          id?: string;
          title?: string | null;
          used?: number | null;
        };
        Relationships: [];
      };
      gamers: {
        Row: {
          icon: string;
          id: number;
          name: string;
          team_id: string;
        };
        Insert: {
          icon: string;
          id?: number;
          name: string;
          team_id: string;
        };
        Update: {
          icon?: string;
          id?: number;
          name?: string;
          team_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "gamers_team_id_fkey";
            columns: ["team_id"];
            isOneToOne: false;
            referencedRelation: "team";
            referencedColumns: ["id"];
          }
        ];
      };
      mission: {
        Row: {
          blocked_at: string | null;
          code: string;
          description: string | null;
          estimated_time: number | null;
          id: string;
          resolved: boolean;
          solved_at: string | null;
          title: string;
          try: number;
          unlocked_at: string | null;
        };
        Insert: {
          blocked_at?: string | null;
          code?: string;
          description?: string | null;
          estimated_time?: number | null;
          id?: string;
          resolved?: boolean;
          solved_at?: string | null;
          title?: string;
          try?: number;
          unlocked_at?: string | null;
        };
        Update: {
          blocked_at?: string | null;
          code?: string;
          description?: string | null;
          estimated_time?: number | null;
          id?: string;
          resolved?: boolean;
          solved_at?: string | null;
          title?: string;
          try?: number;
          unlocked_at?: string | null;
        };
        Relationships: [];
      };
      params: {
        Row: {
          description: string | null;
          id: string;
          start_at: string | null;
          title: string | null;
        };
        Insert: {
          description?: string | null;
          id?: string;
          start_at?: string | null;
          title?: string | null;
        };
        Update: {
          description?: string | null;
          id?: string;
          start_at?: string | null;
          title?: string | null;
        };
        Relationships: [];
      };
      team: {
        Row: {
          code: string | null;
          created_at: string;
          id: string;
          index: number | null;
          name: string | null;
          unlocked: boolean | null;
        };
        Insert: {
          code?: string | null;
          created_at?: string;
          id?: string;
          index?: number | null;
          name?: string | null;
          unlocked?: boolean | null;
        };
        Update: {
          code?: string | null;
          created_at?: string;
          id?: string;
          index?: number | null;
          name?: string | null;
          unlocked?: boolean | null;
        };
        Relationships: [];
      };
      team_mission: {
        Row: {
          id: string;
          mission_id: string;
          order: number;
          team_id: string;
          try: number;
          temp: string | null;
        };
        Insert: {
          id?: string;
          mission_id: string;
          order: number;
          team_id: string;
          temp?: string | null;
        };
        Update: {
          id?: string;
          mission_id?: string;
          order?: number;
          team_id?: string;
          temp?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "team_mission_mission_id_fkey";
            columns: ["mission_id"];
            isOneToOne: false;
            referencedRelation: "mission";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "team_mission_team_id_fkey";
            columns: ["team_id"];
            isOneToOne: false;
            referencedRelation: "team";
            referencedColumns: ["id"];
          }
        ];
      };
      team_mission_indice: {
        Row: {
          disable: boolean;
          id: string;
          indice_description: string;
          odr: number;
          team_mission_id: string;
          temp: string | null;
          unlocked: boolean;
        };
        Insert: {
          disable?: boolean;
          id?: string;
          indice_description?: string;
          odr?: number;
          team_mission_id: string;
          temp?: string | null;
          unlocked?: boolean;
        };
        Update: {
          disable?: boolean;
          id?: string;
          indice_description?: string;
          odr?: number;
          team_mission_id?: string;
          temp?: string | null;
          unlocked?: boolean;
        };
        Relationships: [
          {
            foreignKeyName: "team_mission_indice_team_mission_id_fkey";
            columns: ["team_mission_id"];
            isOneToOne: false;
            referencedRelation: "team_mission";
            referencedColumns: ["id"];
          }
        ];
      };
      team_mission_indice_defis: {
        Row: {
          active: boolean;
          defis_id: string;
          id: string;
          team_defied_id: string;
          team_mission_indice_id: string;
          temp: string | null;
          try: number;
          won: boolean | null;
        };
        Insert: {
          active?: boolean;
          defis_id: string;
          id?: string;
          team_defied_id: string;
          team_mission_indice_id: string;
          temp?: string | null;
          try?: number;
          won?: boolean;
        };
        Update: {
          active?: boolean;
          defis_id?: string;
          id?: string;
          team_defied_id?: string;
          team_mission_indice_id?: string;
          temp?: string | null;
          try?: number;
          won?: boolean;
        };
        Relationships: [
          {
            foreignKeyName: "team_mission_indice_defis_defis_id_fkey";
            columns: ["defis_id"];
            isOneToOne: false;
            referencedRelation: "defis";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "team_mission_indice_defis_team_defied_id_fkey";
            columns: ["team_defied_id"];
            isOneToOne: false;
            referencedRelation: "team";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "team_mission_indice_defis_team_mission_indice_id_fkey";
            columns: ["team_mission_indice_id"];
            isOneToOne: false;
            referencedRelation: "team_mission_indice";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      encryptcode: {
        Args: {
          code: string;
        };
        Returns: string;
      };
      gethelpbyteammission: {
        Args: {
          var_team_id: string;
          var_mission_id: string;
        };
        Returns: {
          team_mission_id: string;
          tmi_id: string;
          tmi_ord: number;
          tmi_unlocked: boolean;
          tmi_desc: string;
          tmi_disable: boolean;
          tmi_running: boolean;
          dfs: Json;
          t_against: Json;
          inds_dfs: Json;
        }[];
      };
      getmissionsbyteam: {
        Args: {
          var_team_id: string;
        };
        Returns: {
          id: string;
          resolved: boolean;
          unlocked_at: string;
        }[];
      };
      getteam: {
        Args: {
          var_id: string;
        };
        Returns: {
          id: string;
          name: string;
          index: number;
          unlocked: boolean;
        }[];
      };
      getteams: {
        Args: Record<PropertyKey, never>;
        Returns: {
          id: string;
          name: string;
          code: string;
          index: number;
          unlocked: boolean;
          codesize: number;
        }[];
      };
      getusers: {
        Args: Record<PropertyKey, never>;
        Returns: {
          usr_id: number;
          usr_name: string;
          team_id: string;
          icon: string;
          name: string;
        }[];
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never;
