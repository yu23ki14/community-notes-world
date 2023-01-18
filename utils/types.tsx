type note = {
  noteId: string;
  noteAuthorParticipantId: string;
  currentStatus: string;
  createdAtMillis: number;
};

type noteText = {
  noteId: string;
  createdAtMillis: number;
  summary: string;
};

type rating = {
  helpfulnessLevel: string;
  createdAtMillis: number;
  noteId: string;
  helpful: string;
  notHelpful: string;
  raterParticipantId: string;
};

type author = {
  participantId: string;
  numberOfHelpfulNotes: number;
  notes?: Array<note>;
  noteExampleId?: string;
};

type noteTimeSeries = { [key: string]: number };
type ratingTimeSeries = { [key: string]: number };

type notes = Array<note>;

export type {
  note,
  author,
  notes,
  noteText,
  rating,
  noteTimeSeries,
  ratingTimeSeries,
};
