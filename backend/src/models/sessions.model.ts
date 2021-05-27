import mongoose, { Document, Schema } from 'mongoose';

const SESSION_LENGTH_SECONDS = 60 * 60;

export interface Session {
  token: string;
  startTime: Date;
  user: string;
}

const SessionsSchema: Schema = new Schema(
  {
    token: {
      type: String,
      required: [true, "can't be blank"],
    },
    startTime: {
      type: Date,
      required: [true, "can't be blank"],
      expires: SESSION_LENGTH_SECONDS,
    },
    user: {
      type: String,
      required: [true, "can't be blank"],
    },
  },
  {
    toJSON: {
      transform(doc, ret): Session {
        return {
          token: ret.token,
          startTime: ret.startTime,
          user: ret.user,
        };
      },
    },
  },
);

export const Sessions = mongoose.model<Session & Document>(
  'Sessions',
  SessionsSchema,
);
