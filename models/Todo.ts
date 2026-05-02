import { MESSAGES } from "@/utils/messages";
import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: [3, MESSAGES.TITLE.MIN],
      maxlength: [100, MESSAGES.TITLE.MAX],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, MESSAGES.DESC.MAX_LENGTH],
    },
    completed: {
      type: Boolean,
      default: false,
    },
    priority: {
      type: String,
      enum: {
        values: [
          MESSAGES.PRIORITY.LOW,
          MESSAGES.PRIORITY.MEDIUM,
          MESSAGES.PRIORITY.HIGH,
        ],
        message: "{VALUE} is not a valid priority",
        // error: "urgent is not a valid priority" ← much more helpful
      },
      default: MESSAGES.PRIORITY.MEDIUM,
    },
  },
  {
    timestamps: true,
  },
);

export const Todo = mongoose.models.Todo || mongoose.model("Todo", TodoSchema);
