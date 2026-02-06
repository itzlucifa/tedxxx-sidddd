export interface GuessSubmission {
  email: string;
  guess: string;
  timestamp: number;
}

export enum AppState {
  LOADING = 'LOADING',
  INTRO = 'INTRO',
  HINTS = 'HINTS',
  FORM = 'FORM',
  SUCCESS = 'SUCCESS'
}

export interface Hint {
  id: number;
  text: string;
  delay: number;
}
