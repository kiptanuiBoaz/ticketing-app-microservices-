import mongoose from "mongoose";
import { Password } from "../services/password";

//an interface that describes the propterties required  to create a n ew user
interface UserAttrs {
    email: string;
    password: string;
}

//interface that describes the properties that the user model has
interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc;
}

//An interface that describes the properties that the User has
interface UserDoc extends mongoose.Document {
    email: string;
    password: string;
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }

});

//middleare to run before saving  user entry
userSchema.pre("save", async function (done) {
    if (this.isModified("password")) {
        // hashing the passowd using external class 
        const hashed = await Password.toHash(this.get("password"));
        this.set("password", hashed);
    }

    //asynchronous work dones
    done();
});


userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };