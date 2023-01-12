type note = {
  noteId: string;
  noteAuthorParticipantId: string;
  currentStatus: string;
  createdAtMillis: number;
};

type rating = {
  helpfulnessLevel: string;
  createdAtMillis: number;
  noteId: string;
  helpful: string;
  notHelpful: string;
};

type author = {
  participantId: string;
  numberOfHelpfulNotes: number;
  notes?: Array<note>;
  noteExampleId?: string;
};

type noteTimeSeries = { [key: string]: note[] };
type ratingTimeSeries = { [key: string]: rating[] };

type notes = Array<note>;

export type { note, author, notes, rating, noteTimeSeries, ratingTimeSeries };
