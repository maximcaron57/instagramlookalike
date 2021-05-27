import mongoose, { Document, Schema } from 'mongoose';
import {
  ComparablePost,
  postMaximumValues,
  Reaction,
  SavedPost,
  UserComment,
  userCommentMaximumValues,
} from '../types/posts';
import { FakeableDocument } from '../types/fakeable.document';
import { Notifications } from './notifications.model';

const ReactionsSchema = new Schema(
  {
    user: {
      type: String,
      required: [true, "can't be blank"],
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret): Reaction {
        return {
          user: ret.user,
          createdAt: ret.createdAt,
        };
      },
    },
  },
);

const CommentsSchema = new Schema(
  {
    user: {
      type: String,
      required: [true, "can't be blank"],
    },
    text: {
      type: String,
      required: [true, "can't be blank"],
      maxLength: [
        userCommentMaximumValues.text.length.value,
        userCommentMaximumValues.text.length.message,
      ],
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret): UserComment {
        return {
          user: ret.user,
          text: ret.text,
          createdAt: ret.createdAt,
        };
      },
    },
  },
);

const PostsSchema = new Schema(
  {
    reference: {
      type: String,
      required: [true, "can't be blank"],
    },
    thumbnail: {
      type: String,
    },
    description: {
      type: String,
      maxLength: [
        postMaximumValues.description.length.value,
        postMaximumValues.description.length.message,
      ],
    },
    hashtags: [{ type: String, lowercase: true }],
    usertags: [String],
    reactions: [ReactionsSchema],
    comments: [CommentsSchema],
    user: {
      type: String,
      required: [true, "can't be blank"],
    },
    fake: {
      type: Boolean,
      default: false,
    },
    comparableCreatedAt: String,
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret): SavedPost {
        return {
          id: ret._id,
          reference: ret.reference,
          thumbnail: ret.thumbnail,
          description: ret.description,
          hashtags: ret.hashtags,
          usertags: ret.usertags,
          reactions: ret.reactions,
          comments: ret.comments,
          user: ret.user,
          createdAt: ret.createdAt,
        };
      },
    },
  },
);

PostsSchema.pre<SavedPost & Document>(
  'deleteOne',
  { document: true },
  async function (next) {
    await Notifications.deleteMany({
      postId: this._id,
    }).exec();
    next();
  },
);

export const Posts = mongoose.model<
  SavedPost & ComparablePost & FakeableDocument & Document
>('Posts', PostsSchema);
