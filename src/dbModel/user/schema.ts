import mongoose from "mongoose";
import bcrypt from "bcrypt";

export interface UserDocument extends mongoose.Document {
  email: string;
  name: string;
  key: string;
  keyExpiry: string;
  mobile?: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
    },
    name: { type: String, required: true },
    key: { type: String },
    keyExpiry: { type: String },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next: mongoose.HookNextFunction) {
  let user = this as UserDocument;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  // Random additional data
  const salt = await bcrypt.genSalt(11);

  const hash = await bcrypt.hashSync(user.password, salt);

  // Replace the password with the hash
  user.password = hash;

  return next();
});

// Used for logging in
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  return new Promise(async (resolve, reject) => {
    try {
      let user = this as UserDocument;

      const isMatch = await bcrypt.compare(candidatePassword, user.password);
      resolve(isMatch);
    } catch (error) {
      reject(error);
    }
  });
};

const User = mongoose.model<UserDocument>("User", UserSchema);

export default User;
