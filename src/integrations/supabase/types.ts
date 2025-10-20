export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      bookings: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          guest_name: string
          guest_email: string
          guest_phone: string
          check_in: string
          check_out: string
          room_id: string
          total_price: number
          status: 'pending' | 'confirmed' | 'checked_in' | 'checked_out' | 'cancelled'
          notes: string | null
          payment_status: 'pending' | 'paid' | 'refunded'
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          guest_name: string
          guest_email: string
          guest_phone: string
          check_in: string
          check_out: string
          room_id: string
          total_price: number
          status?: 'pending' | 'confirmed' | 'checked_in' | 'checked_out' | 'cancelled'
          notes?: string | null
          payment_status?: 'pending' | 'paid' | 'refunded'
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          guest_name?: string
          guest_email?: string
          guest_phone?: string
          check_in?: string
          check_out?: string
          room_id?: string
          total_price?: number
          status?: 'pending' | 'confirmed' | 'checked_in' | 'checked_out' | 'cancelled'
          notes?: string | null
          payment_status?: 'pending' | 'paid' | 'refunded'
        }
      }
      rooms: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          name: string
          description: string
          price_per_night: number
          max_guests: number
          amenities: string[]
          images: string[]
          is_available: boolean
          room_type: 'deluxe' | 'standard' | 'twin'
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          name: string
          description: string
          price_per_night: number
          max_guests: number
          amenities: string[]
          images: string[]
          is_available?: boolean
          room_type: 'deluxe' | 'standard' | 'twin'
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          name?: string
          description?: string
          price_per_night?: number
          max_guests?: number
          amenities?: string[]
          images?: string[]
          is_available?: boolean
          room_type?: 'deluxe' | 'standard' | 'twin'
        }
      }
      settings: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          site_title: string
          site_description: string
          contact_phone: string
          contact_email: string
          contact_address: string
          logo_url: string | null
          hero_image_url: string | null
          about_description: string
          facilities: string[]
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          site_title: string
          site_description: string
          contact_phone: string
          contact_email: string
          contact_address: string
          logo_url?: string | null
          hero_image_url?: string | null
          about_description: string
          facilities: string[]
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          site_title?: string
          site_description?: string
          contact_phone?: string
          contact_email?: string
          contact_address?: string
          logo_url?: string | null
          hero_image_url?: string | null
          about_description?: string
          facilities?: string[]
        }
      }
      admin_users: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          email: string
          name: string
          role: 'admin' | 'manager'
          is_active: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          email: string
          name: string
          role?: 'admin' | 'manager'
          is_active?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          email?: string
          name?: string
          role?: 'admin' | 'manager'
          is_active?: boolean
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      booking_status: 'pending' | 'confirmed' | 'checked_in' | 'checked_out' | 'cancelled'
      payment_status: 'pending' | 'paid' | 'refunded'
      room_type: 'deluxe' | 'standard' | 'twin'
      admin_role: 'admin' | 'manager'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
