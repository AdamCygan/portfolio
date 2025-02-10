import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  username: string;
  email: string;
  authentication: {
    password: string;
    salt?: string;
    sessionToken?: string;
  };
}

const UserSchema = new Schema<IUser>(
  {
    username: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    authentication: {
      password: { type: String, required: true, select: false },
      salt: { type: String, select: false },
      sessionToken: { type: String, select: false },
    },
  },
  { timestamps: true }
);

export const UserModel = mongoose.model<IUser>("User", UserSchema);

export const getUsers = async () => {
  try {
    return await UserModel.find().lean().exec();
  } catch (error) {
    throw error;
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    return await UserModel.findOne({ email })
      .select("+authentication.password +authentication.salt")
      .exec();
  } catch (error) {
    throw error;
  }
};

export const getUserBySessionToken = async (sessionToken: string) => {
  if (!sessionToken) {
    console.error("Session token is missing in getUserBySessionToken");
    return null;
  }

  try {
    const user = await UserModel.findOne({
      "authentication.sessionToken": sessionToken,
    })
      .select("+authentication")
      .exec();

    if (!user) {
      console.warn(`User not found for sessionToken: ${sessionToken}`);
    }
    return user;
  } catch (error) {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    return await UserModel.findByIdAndUpdate(id).exec();
  } catch (error) {
    throw error;
  }
};

export const createUser = async (values: Partial<IUser>) => {
  try {
    const user = new UserModel(values);
    await user.save();
    return user.toObject();
  } catch (error) {
    throw error;
  }
};

export const deleteUserById = async (id: string) => {
  try {
    return await UserModel.findOneAndDelete({ _id: id }).lean().exec();
  } catch (error) {
    throw error;
  }
};

export const updateUserById = async (id: string, values: Partial<IUser>) => {
  try {
    return await UserModel.findByIdAndUpdate(id, values, {
      new: true,
      runValidators: true,
    })
      .lean()
      .exec();
  } catch (error) {
    throw error;
  }
};
