export interface Database {
  public: {
    Tables: {
      lions: {
        Row: {
          id: number;
          name: string;
          part: string;
          badge: string | null;
          introduction: string | null;
          img_src: string | null;
          description: string | null;
          email: string | null;
          phone: string | null;
          website: string | null;
          skills: string[] | null;
          one_word: string | null;
          is_me: boolean;
          created_at: string;
        };
        Insert: {
          id?: number;
          name: string;
          part: string;
          badge?: string | null;
          introduction?: string | null;
          img_src?: string | null;
          description?: string | null;
          email?: string | null;
          phone?: string | null;
          website?: string | null;
          skills?: string[] | null;
          one_word?: string | null;
          is_me?: boolean;
          created_at?: string;
        };
        Update: {
          id?: number;
          name?: string;
          part?: string;
          badge?: string | null;
          introduction?: string | null;
          img_src?: string | null;
          description?: string | null;
          email?: string | null;
          phone?: string | null;
          website?: string | null;
          skills?: string[] | null;
          one_word?: string | null;
          is_me?: boolean;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

// 데이터베이스 Row 타입 별칭
export type LionRow = Database["public"]["Tables"]["lions"]["Row"];
export type LionInsert = Database["public"]["Tables"]["lions"]["Insert"];
