type note = {
  noteId: string;
  participantId: string;
  currentStatus: string;
  createdAtMillis: number;
};

type author = {
  participantId: string;
  numberOfHelpfulNotes: number;
  notes: Array<note>;
};

type notes = Array<note>;

export type { note, author, notes };
