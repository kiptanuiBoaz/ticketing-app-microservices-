import mongoose from "mongoose";

//an interface that describes the propterties required  to create a n ew user
interface UserAttrs {
    email: string;
    password: string;
}

//interface that describes the properties that the user model has
interface UserModel extends mongoose.Model<any> {
    build(attrs: UserAttrs): any;
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


userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs);
};

const User = mongoose.model<any, UserModel>("User", userSchema);

export { User };