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
  tweetId: string;
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

type tweetAuthor = {
  id: string;
  name: string;
  username: string;
  count: number;
  tweets: string[];
};

type userEnrollmentItem = {
  participantId: string;
  enrollmentState: string;
  timestampOfLastStateChange: string;
};

type noteTimeSeries = { [key: string]: number };
type ratingTimeSeries = { [key: string]: number };

type notes = Array<note>;

export type {
  author,
  tweetAuthor,
  note,
  notes,
  noteText,
  noteTimeSeries,
  rating,
  ratingTimeSeries,
  userEnrollmentItem,
};
