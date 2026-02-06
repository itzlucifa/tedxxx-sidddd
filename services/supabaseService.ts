import { supabase } from '../lib/supabase';

export interface GuessData {
  email: string;
  guess: string;
  timestamp: number;
}

export const submitGuessToSupabase = async (data: GuessData) => {
  try {
    const { error } = await supabase
      .from('theme_guesses')
      .insert([
        {
          email: data.email,
          guess: data.guess,
          timestamp: new Date(data.timestamp).toISOString(),
          created_at: new Date().toISOString()
        }
      ]);

    if (error) {
      console.error('Supabase error:', error);
      throw new Error(error.message);
    }

    return { success: true };
  } catch (error) {
    console.error('Error submitting guess:', error);
    throw error;
  }
};

export const getGuessesFromSupabase = async () => {
  try {
    const { data, error } = await supabase
      .from('theme_guesses')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error('Error fetching guesses:', error);
    throw error;
  }
};
